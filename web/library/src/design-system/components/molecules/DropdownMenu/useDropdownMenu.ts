"use client";
import { useLayoutEffect, useRef, useImperativeHandle } from "react";
import { useCollapse } from "../../../hooks/collapse/useCollapse";
import { useOverlay } from "../../../hooks/overlay/useOverlay";
import { usePresence } from "../../../hooks/motion/usePresence";
import type { DropdownMenuProps } from "./DropdownMenu";
import type { CollectionFocusEdge } from "../../../types/collection-contracts";

function focusMenuPanel(panel: HTMLDivElement | null, preference: CollectionFocusEdge) {
  const nodes = [
    ...(panel?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)') ?? []),
  ].filter((node) => !node.closest("[hidden], [inert]") && node.getClientRects().length);
  (preference === "last" ? nodes.at(-1) : nodes[0])?.focus();
  if (!nodes.length) panel?.querySelector<HTMLElement>('[role="menu"]')?.focus();
}

export function useDropdownMenu(input: DropdownMenuProps) {
  const {
    open,
    defaultOpen,
    onOpenChange,
    disabled: rootDisabled = false,
    label,
    trigger,
    children,
    animated = true,
    animationEffect = "fade",
    className,
    onClick,
    onKeyDown,
    onBlurCapture,
    ...props
  } = input;
  if (!label.trim()) throw new Error("DropdownMenu requires a nonempty label.");
  const disabled = rootDisabled || !!(trigger?.props.disabled || trigger?.props.loading);
  const collapse = useCollapse({ open, defaultOpen, onOpenChange, disabled });
  useImperativeHandle(trigger?.props.ref, () => collapse.triggerRef.current!, [
    collapse.triggerRef,
  ]);
  const pendingClose = useRef(false);
  const preference = useRef<CollectionFocusEdge>("first");

  function dismiss() {
    if (pendingClose.current) return;
    pendingClose.current = true;
    collapse.requestOpen(false);
    queueMicrotask(() => {
      pendingClose.current = false;
    });
  }

  const overlay = useOverlay({
    open: collapse.open,
    triggerRef: collapse.triggerRef,
    panelRef: collapse.bodyRef,
    onEscape: dismiss,
    onOutside: dismiss,
  });
  const presence = usePresence({
    open: collapse.open,
    elementRef: collapse.bodyRef,
    enabled: animated && animationEffect !== "none",
  });

  const handleClick: NonNullable<DropdownMenuProps["onClick"]> = (event) => {
    onClick?.(event);

    if (!event.defaultPrevented && collapse.triggerRef.current?.contains(event.target as Node)) {
      preference.current = "first";
      collapse.toggle();
    }
  };

  const handleKeyDown: NonNullable<DropdownMenuProps["onKeyDown"]> = (event) => {
    onKeyDown?.(event);
    if (
      event.defaultPrevented ||
      disabled ||
      event.nativeEvent.isComposing ||
      event.ctrlKey ||
      event.altKey ||
      event.metaKey ||
      !collapse.triggerRef.current?.contains(event.target as Node) ||
      !["ArrowDown", "ArrowUp"].includes(event.key)
    )
      return;
    event.preventDefault();
    preference.current = event.key === "ArrowUp" ? "last" : "first";
    if (collapse.open) focusMenuPanel(collapse.bodyRef.current, preference.current);
    else collapse.requestOpen(true);
  };

  const handleBlurCapture: NonNullable<DropdownMenuProps["onBlurCapture"]> = (event) => {
    onBlurCapture?.(event);
    if (
      !event.defaultPrevented &&
      !pendingClose.current &&
      event.relatedTarget &&
      !event.currentTarget.contains(event.relatedTarget)
    )
      dismiss();
  };

  useLayoutEffect(() => {
    if (collapse.open) focusMenuPanel(collapse.bodyRef.current, preference.current);
  }, [collapse.open, collapse.bodyRef]);
  return {
    props,
    children,
    trigger,
    customTriggerProps: {
      ...collapse.triggerProps,
      disabled,
      ref: collapse.triggerRef,
      type: "button" as const,
      "aria-haspopup": "menu" as const,
    },
    className,
    label,
    animated,
    animationEffect,
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
    handleKeyDown,
    handleBlurCapture,
    context: { dismiss, overlay },
  };
}
