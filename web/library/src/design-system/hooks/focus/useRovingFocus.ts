"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type {
  FocusItemRegistration,
  RovingFocusContract,
  RovingFocusOptions,
} from "../../types/focus";

function ordered(items: Iterable<FocusItemRegistration>): FocusItemRegistration[] {
  return [...items]
    .filter((item) => !item.disabled && item.ref.current?.isConnected)
    .sort((left, right) => {
      const position = left.ref.current!.compareDocumentPosition(right.ref.current!);

      return position & 4 ? -1 : position & 2 ? 1 : 0;
    });
}

export function useRovingFocus({
  orientation,
  direction = "ltr",
  loop = true,
  typeahead = false,
  initialId,
  fallbackRef,
}: RovingFocusOptions): RovingFocusContract {
  const registry = useRef(new Map<string, FocusItemRegistration>());
  const [activeId, setActiveId] = useState<string | null>(initialId ?? null);
  const currentId = useRef(activeId);
  const initial = useRef(initialId);
  const focusedId = useRef<string | null>(null);
  const interactionStarted = useRef(false);
  const prefix = useRef("");
  const lastOrder = useRef<readonly string[]>([]);
  const generation = useRef(0);
  const alive = useRef(true);

  const updateActive = useCallback((id: string | null): void => {
    currentId.current = id;
    setActiveId(id);
  }, []);

  const registerItem = useCallback(
    (item: FocusItemRegistration) => {
      if (!item.id.trim() || registry.current.has(item.id)) {
        throw new Error("Focus item ids must be nonempty and unique: " + item.id);
      }

      registry.current.set(item.id, item);
      const enabled = ordered(registry.current.values());
      lastOrder.current = enabled.map((entry) => entry.id);

      if (!interactionStarted.current) {
        const preferred = enabled.find((entry) => entry.id === initial.current);
        updateActive(preferred?.id ?? enabled[0]?.id ?? null);
      }

      return () => {
        if (registry.current.get(item.id) !== item) return;
        registry.current.delete(item.id);
        const currentGeneration = generation.current;
        const priorOrder = lastOrder.current;
        // Metadata re-registration can happen in this same commit. Repair only
        // after that commit, without a navigation timer or a stale unmount task.
        queueMicrotask(() => {
          if (!alive.current || generation.current !== currentGeneration) return;
          const replacement = registry.current.get(item.id);
          if (replacement && !replacement.disabled && replacement.ref.current?.isConnected) return;
          if (currentId.current !== item.id) return;
          const remaining = ordered(registry.current.values());
          const position = Math.max(0, priorOrder.indexOf(item.id));
          const nextId = [
            ...priorOrder.slice(position + 1),
            ...priorOrder.slice(0, position).reverse(),
          ].find((id) => remaining.some((entry) => entry.id === id));
          const next = remaining.find((entry) => entry.id === nextId) ?? remaining[0];
          updateActive(next?.id ?? null);

          if (focusedId.current === item.id) {
            if (next) next.ref.current?.focus();
            else fallbackRef?.current?.focus();
            focusedId.current = next?.id ?? null;
          }
        });
      };
    },
    [fallbackRef, updateActive],
  );

  function focus(id: string): void {
    const item = ordered(registry.current.values()).find((entry) => entry.id === id);
    if (!item) return;
    interactionStarted.current = true;
    lastOrder.current = ordered(registry.current.values()).map((entry) => entry.id);
    item.ref.current?.focus();
    focusedId.current = id;
    updateActive(id);
  }

  function onKeyDown(event: KeyboardEvent<HTMLElement>): void {
    if (
      event.defaultPrevented ||
      event.nativeEvent.isComposing ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey
    )
      return;
    const items = ordered(registry.current.values());
    if (!items.length) return;
    const forward =
      orientation === "vertical" ? "ArrowDown" : direction === "rtl" ? "ArrowLeft" : "ArrowRight";
    const backward =
      orientation === "vertical" ? "ArrowUp" : direction === "rtl" ? "ArrowRight" : "ArrowLeft";
    let target: FocusItemRegistration | undefined;

    if (event.key === "Home") target = items[0];
    else if (event.key === "End") target = items.at(-1);
    else if (event.key === forward || event.key === backward) {
      const current = items.findIndex((item) => item.id === currentId.current);
      const next =
        current < 0
          ? event.key === forward
            ? 0
            : items.length - 1
          : current + (event.key === forward ? 1 : -1);
      const index = loop
        ? (next + items.length) % items.length
        : Math.max(0, Math.min(next, items.length - 1));
      target = items[index];
      prefix.current = "";
    } else if (typeahead && event.key.length === 1 && event.key !== " ") {
      const character = event.key.toLocaleLowerCase();
      prefix.current += character;

      if ([...prefix.current].every((value) => value === character)) {
        prefix.current = character;
      }

      const query = prefix.current;
      const current = items.findIndex((item) => item.id === currentId.current);
      const candidates = [...items.slice(current + 1), ...items.slice(0, current + 1)];
      target = candidates.find((item) => item.textValue.toLocaleLowerCase().startsWith(query));
    }

    if (target) {
      if (event.key === "Home" || event.key === "End") prefix.current = "";
      event.preventDefault();
      focus(target.id);
    }
  }

  useEffect(() => {
    alive.current = true;
    ++generation.current;
    const ownerDocument = [...registry.current.values()][0]?.ref.current?.ownerDocument ?? document;

    const onFocusIn = (event: FocusEvent) => {
      const item = [...registry.current.values()].find((entry) =>
        entry.ref.current?.contains(event.target as Node),
      );

      if (!item) {
        prefix.current = "";
        focusedId.current = null;
      }
    };

    ownerDocument.addEventListener("focusin", onFocusIn);

    return () => {
      alive.current = false;
      ownerDocument.removeEventListener("focusin", onFocusIn);
    };
  }, []);

  return {
    activeId,
    registerItem,
    tabIndex: (id) => (id === activeId ? 0 : -1),
    isEnabled: (id) => ordered(registry.current.values()).some((item) => item.id === id),
    onItemFocus: (id) => {
      const item = registry.current.get(id);
      if (!item || item.disabled || !item.ref.current?.isConnected) return;
      interactionStarted.current = true;
      focusedId.current = id;
      lastOrder.current = ordered(registry.current.values()).map((item) => item.id);
      updateActive(id);
    },
    focus,
    focusFirst: () => {
      const item = ordered(registry.current.values())[0];
      if (item) focus(item.id);
    },
    focusLast: () => {
      const item = ordered(registry.current.values()).at(-1);
      if (item) focus(item.id);
    },
    onKeyDown,
  };
}
