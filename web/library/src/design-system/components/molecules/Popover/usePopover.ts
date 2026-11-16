"use client";
import { useCallback, useImperativeHandle, useLayoutEffect, useRef } from "react";
import { useCollapse } from "../../../hooks/collapse/useCollapse";
import { useOverlay } from "../../../hooks/overlay/useOverlay";
import { usePresence } from "../../../hooks/motion/usePresence";
import type { PopoverProps } from "./Popover";

export function usePopover(input: PopoverProps) {
  const {
    open,
    defaultOpen,
    onOpenChange,
    trigger,
    triggerLabel,
    label,
    children,
    animated = true,
    animationEffect = "fade",
    onClick,
    onBlurCapture,
    className,
    ...props
  } = input;
  if (!triggerLabel.trim() || !label.trim())
    throw new Error("Popover requires nonempty trigger and panel names.");
  const collapse = useCollapse({
    open,
    defaultOpen,
    onOpenChange,
    disabled: !!(trigger?.props.disabled || trigger?.props.loading),
  });
  useImperativeHandle(trigger?.props.ref, () => collapse.triggerRef.current!, [
    collapse.triggerRef,
  ]);
  const outsideRequest = useRef(false);
  const branches = useRef(new Map<HTMLElement, number>());
  const overlay = useOverlay({
    open: collapse.open,
    triggerRef: collapse.triggerRef,
    panelRef: collapse.bodyRef,
    onEscape: () => collapse.requestOpen(false),
    onOutside: () => {
      outsideRequest.current = true;
      collapse.requestOpen(false);
      queueMicrotask(() => {
        outsideRequest.current = false;
      });
    },
  });
  const registerOverlayBranch = overlay.registerBranch;
  const registerBranch = useCallback(
    (element: HTMLElement) => {
      branches.current.set(element, (branches.current.get(element) ?? 0) + 1);
      const dispose = registerOverlayBranch(element);
      let disposed = false;

      return () => {
        if (disposed) return;
        disposed = true;
        const count = branches.current.get(element) ?? 0;
        if (count <= 1) branches.current.delete(element);
        else branches.current.set(element, count - 1);
        dispose();
      };
    },
    [registerOverlayBranch],
  );
  const presence = usePresence({
    open: collapse.open,
    elementRef: collapse.bodyRef,
    enabled: animated && animationEffect !== "none",
  });

  const handleClick: NonNullable<PopoverProps["onClick"]> = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented && collapse.triggerRef.current?.contains(event.target as Node))
      collapse.toggle();
  };

  const handleBlurCapture: NonNullable<PopoverProps["onBlurCapture"]> = (event) => {
    onBlurCapture?.(event);
    const next = event.relatedTarget;
    if (
      !event.defaultPrevented &&
      !outsideRequest.current &&
      next &&
      !event.currentTarget.contains(next) &&
      ![...branches.current.keys()].some((branch) => branch.contains(next))
    )
      collapse.requestOpen(false);
  };

  useLayoutEffect(() => {
    if (!collapse.open) return;
    const panel = collapse.bodyRef.current;
    const target = [
      ...(panel?.querySelectorAll<HTMLElement>(
        'button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex="0"]',
      ) ?? []),
    ].find((node) => !node.closest("[hidden], [inert]") && node.getClientRects().length);
    (target ?? panel)?.focus();
  }, [collapse.open, collapse.bodyRef]);
  return {
    props,
    children,
    className,
    trigger,
    triggerLabel,
    label,
    animated,
    animationEffect,
    customTriggerProps: {
      ...collapse.triggerProps,
      ref: collapse.triggerRef,
      type: "button" as const,
      "aria-haspopup": "dialog" as const,
    },
    triggerRef: collapse.triggerRef,
    triggerProps: collapse.triggerProps,
    panelRef: collapse.bodyRef,
    panelProps: {
      id: collapse.bodyProps.id,
      onFocusCapture: collapse.bodyProps.onFocusCapture,
      onBlurCapture: collapse.bodyProps.onBlurCapture,
    },
    acceptedOpen: collapse.open,
    present: presence.present,
    phase: presence.phase,
    onTransitionEnd: presence.onTransitionEnd,
    handleClick,
    handleBlurCapture,
    context: {
      open: collapse.open,
      requestOpen: collapse.requestOpen,
      overlay: {
        restoreTriggerFocus: overlay.restoreTriggerFocus,
        registerBranch,
      },
    },
  };
}
