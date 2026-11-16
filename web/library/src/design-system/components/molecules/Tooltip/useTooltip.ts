"use client";
import { useId, useRef, useState, useLayoutEffect, useImperativeHandle } from "react";
import type { MouseEvent, FocusEvent, KeyboardEvent } from "react";
import { useOverlay } from "../../../hooks/overlay/useOverlay";
import { usePresence } from "../../../hooks/motion/usePresence";
import type { TooltipProps } from "./Tooltip";
type Activity = { trigger: boolean; surface: boolean; focused: boolean; dismissed: boolean };

export function useTooltip({
  children,
  content,
  open,
  defaultOpen = false,
  onOpenChange,
  animated = true,
}: TooltipProps) {
  if (!content.trim()) throw new Error("Tooltip requires nonempty supplementary text.");
  const tooltipId = useId();
  const triggerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLSpanElement>(null);
  useImperativeHandle(children.props.ref, () => triggerRef.current!, []);
  useLayoutEffect(() => {
    if (!triggerRef.current?.ownerDocument || typeof triggerRef.current.matches !== "function")
      throw new Error("Tooltip requires an enabled ref-forwarding DOM trigger.");
  }, []);
  const [localOpen, setLocalOpen] = useState(defaultOpen);
  const visible = open ?? localOpen;
  const accepted = useRef(visible);
  const requested = useRef(visible);
  const [activity, setActivity] = useState<Activity>({
    trigger: false,
    surface: false,
    focused: false,
    dismissed: false,
  });
  const latestActivity = useRef(activity);
  useLayoutEffect(() => {
    if (accepted.current !== visible) requested.current = visible;
    accepted.current = visible;
  }, [visible]);

  function requestOpen(next: boolean) {
    if (next === accepted.current) {
      requested.current = next;
      return;
    }

    if (next === requested.current) return;
    requested.current = next;

    if (open === undefined) {
      accepted.current = next;
      setLocalOpen(next);
    }

    onOpenChange?.(next);
  }

  function update(patch: Partial<Activity>) {
    const next = { ...latestActivity.current, ...patch };
    if (!next.trigger && !next.surface && !next.focused) next.dismissed = false;
    latestActivity.current = next;
    setActivity(next);
    requestOpen(!next.dismissed && (next.trigger || next.surface || next.focused));
  }

  function dismiss() {
    const next = { ...latestActivity.current, dismissed: true };
    latestActivity.current = next;
    setActivity(next);
    requestOpen(false);
  }

  useOverlay({ open: visible, triggerRef, panelRef, onEscape: dismiss, onOutside: dismiss });
  const presence = usePresence({ open: visible, elementRef: panelRef, enabled: animated });

  function enabled(element: HTMLElement) {
    return !element.matches(":disabled, [aria-disabled='true']");
  }

  const handleMouseEnter = (event: MouseEvent<HTMLElement>) => {
    children.props.onMouseEnter?.(event);
    if (!event.defaultPrevented && enabled(event.currentTarget)) update({ trigger: true });
  };

  const handleMouseLeave = (event: MouseEvent<HTMLElement>) => {
    children.props.onMouseLeave?.(event);
    if (!event.defaultPrevented)
      update({
        trigger: false,
        surface: !!panelRef.current?.contains(event.relatedTarget as Node | null),
      });
  };

  const handleFocus = (event: FocusEvent<HTMLElement>) => {
    children.props.onFocus?.(event);
    if (!event.defaultPrevented && enabled(event.currentTarget)) update({ focused: true });
  };

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    children.props.onBlur?.(event);
    if (!event.defaultPrevented && !event.currentTarget.contains(event.relatedTarget))
      update({ focused: false });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    children.props.onKeyDown?.(event);

    if (
      !event.defaultPrevented &&
      visible &&
      event.key === "Escape" &&
      !event.nativeEvent.isComposing &&
      !event.ctrlKey &&
      !event.altKey &&
      !event.metaKey
    ) {
      event.preventDefault();
      dismiss();
    }
  };

  const handleSurfaceEnter = () => {
    if (visible) update({ surface: true });
  };

  const handleSurfaceLeave = (event: MouseEvent<HTMLSpanElement>) =>
    update({
      surface: false,
      trigger: !!triggerRef.current?.contains(event.relatedTarget as Node | null),
    });
  const description =
    [
      ...new Set([
        ...(children.props["aria-describedby"]?.split(/\s+/).filter(Boolean) ?? []),
        ...(visible ? [tooltipId] : []),
      ]),
    ].join(" ") || undefined;

  return {
    children,
    content,
    tooltipId,
    panelRef,
    visible,
    animated,
    focused: activity.focused,
    present: presence.present,
    phase: presence.phase,
    onTransitionEnd: presence.onTransitionEnd,
    triggerProps: {
      ref: triggerRef,
      "aria-describedby": description,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
    },
    handleSurfaceEnter,
    handleSurfaceLeave,
  };
}
