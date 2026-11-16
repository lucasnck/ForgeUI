"use client";

import { useImperativeHandle, useLayoutEffect, useRef } from "react";
import type { FocusEvent, PointerEvent } from "react";
import { useToastRegion } from "../../../hooks/notifications";
import type { ToastRegionProps } from "./ToastRegion";

export function useToastRegionView(input: ToastRegionProps) {
  const {
    renderToast,
    records,
    defaultRecords,
    onRecordsChange,
    fallbackRef,
    label,
    className,
    ref,
    onPointerEnter,
    onPointerLeave,
    onFocusCapture,
    onBlurCapture,
    ...props
  } = input;
  if (!label.trim()) throw new Error("ToastRegion requires a nonempty accessible label.");
  const rootRef = useRef<HTMLElement>(null);
  useImperativeHandle(ref, () => rootRef.current!, []);
  const queue = useToastRegion({
    records,
    defaultRecords,
    onRecordsChange,
    fallbackRef: fallbackRef ?? rootRef,
  });
  const { pause, resume } = queue;
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    // Removing content can skip native blur/leave events. Reconcile the next
    // queue snapshot before it inherits an obsolete interaction pause.
    if (root.contains(root.ownerDocument.activeElement)) pause("focus");
    else resume("focus");
    if (root.matches(":hover")) pause("hover");
    else resume("hover");
  }, [queue.records, pause, resume]);

  const handlePointerEnter = (event: PointerEvent<HTMLElement>) => {
    onPointerEnter?.(event);
    if (!event.defaultPrevented) queue.pause("hover");
  };

  const handlePointerLeave = (event: PointerEvent<HTMLElement>) => {
    onPointerLeave?.(event);
    if (!event.defaultPrevented) queue.resume("hover");
  };

  const handleFocusCapture = (event: FocusEvent<HTMLElement>) => {
    onFocusCapture?.(event);
    if (!event.defaultPrevented) queue.pause("focus");
  };

  const handleBlurCapture = (event: FocusEvent<HTMLElement>) => {
    onBlurCapture?.(event);
    if (!event.defaultPrevented && !event.currentTarget.contains(event.relatedTarget))
      queue.resume("focus");
  };

  const polite = queue.announcement?.messages
    .filter((message) => message.urgency === "normal")
    .map((message) => message.text)
    .join(" ");
  const assertive = queue.announcement?.messages
    .filter((message) => message.urgency === "urgent")
    .map((message) => message.text)
    .join(" ");

  return {
    renderToast,
    queue,
    polite,
    assertive,
    sequence: queue.announcement?.sequence,
    label,
    className,
    rootRef,
    props,
    handlePointerEnter,
    handlePointerLeave,
    handleFocusCapture,
    handleBlurCapture,
  };
}
