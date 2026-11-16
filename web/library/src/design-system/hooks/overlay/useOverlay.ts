"use client";

import { useCallback, useLayoutEffect, useRef } from "react";
import type { OverlayLayerContract, OverlayLayerOptions } from "../../types/overlay";

interface OverlayManager {
  layers: symbol[];
  consumedOutside: WeakSet<Event>;
  scrollOwners: Set<symbol>;
  previousScrollLock: string | undefined;
}

const managers = new WeakMap<Document, OverlayManager>();

function managerFor(document: Document): OverlayManager {
  let manager = managers.get(document);

  if (!manager) {
    manager = {
      layers: [],
      consumedOutside: new WeakSet(),
      scrollOwners: new Set(),
      previousScrollLock: undefined,
    };
    managers.set(document, manager);
  }

  return manager;
}

export function useOverlay(options: OverlayLayerOptions): OverlayLayerContract {
  const latest = useRef(options);
  const branches = useRef(new Map<HTMLElement, Set<symbol>>());
  useLayoutEffect(() => {
    latest.current = options;
  });

  useLayoutEffect(() => {
    if (!options.open) return;
    const ownerDocument =
      options.panelRef.current?.ownerDocument ??
      options.triggerRef.current?.ownerDocument ??
      document;
    const manager = managerFor(ownerDocument);
    const id = Symbol("overlay");
    manager.layers.push(id);

    if (options.lockScroll) {
      if (!manager.scrollOwners.size) {
        manager.previousScrollLock =
          ownerDocument.documentElement.getAttribute("data-overlay-scroll-locked") ?? undefined;
        ownerDocument.documentElement.setAttribute("data-overlay-scroll-locked", "true");
      }

      manager.scrollOwners.add(id);
    }

    const onEscape = (event: KeyboardEvent) => {
      const current = latest.current;
      if (
        manager.layers.at(-1) !== id ||
        !current.open ||
        current.nativeModal ||
        event.defaultPrevented ||
        event.isComposing ||
        event.key !== "Escape"
      )
        return;
      event.preventDefault();
      current.onEscape();
    };

    const onOutside = (event: PointerEvent) => {
      const current = latest.current;
      if (
        manager.layers.at(-1) !== id ||
        !current.open ||
        current.nativeModal ||
        event.defaultPrevented ||
        manager.consumedOutside.has(event)
      )
        return;
      const path = event.composedPath();
      const nodes = [
        current.triggerRef.current,
        current.panelRef.current,
        ...branches.current.keys(),
      ];
      const inside = nodes.some(
        (element) =>
          element &&
          path.some(
            (target) =>
              target === element ||
              (target instanceof ownerDocument.defaultView!.Node && element.contains(target)),
          ),
      );
      if (inside) return;
      manager.consumedOutside.add(event);
      current.onOutside();
    };

    ownerDocument.addEventListener("keydown", onEscape);
    ownerDocument.addEventListener("pointerdown", onOutside);

    return () => {
      ownerDocument.removeEventListener("keydown", onEscape);
      ownerDocument.removeEventListener("pointerdown", onOutside);
      const index = manager.layers.indexOf(id);
      if (index >= 0) manager.layers.splice(index, 1);

      if (options.lockScroll) {
        manager.scrollOwners.delete(id);

        if (!manager.scrollOwners.size) {
          if (manager.previousScrollLock === undefined) {
            ownerDocument.documentElement.removeAttribute("data-overlay-scroll-locked");
          } else {
            ownerDocument.documentElement.setAttribute(
              "data-overlay-scroll-locked",
              manager.previousScrollLock,
            );
          }
        }
      }
    };
  }, [options.open, options.nativeModal, options.lockScroll, options.panelRef, options.triggerRef]);

  const registerBranch = useCallback((element: HTMLElement) => {
    const id = Symbol("branch");
    let owners = branches.current.get(element);

    if (!owners) {
      owners = new Set();
      branches.current.set(element, owners);
    }

    owners.add(id);

    return () => {
      owners.delete(id);

      if (!owners.size && branches.current.get(element) === owners) {
        branches.current.delete(element);
      }
    };
  }, []);
  const restoreTriggerFocus = useCallback(() => {
    const trigger = latest.current.triggerRef.current;
    if (trigger?.isConnected) trigger.focus({ preventScroll: true });
  }, []);

  return { registerBranch, restoreTriggerFocus };
}
