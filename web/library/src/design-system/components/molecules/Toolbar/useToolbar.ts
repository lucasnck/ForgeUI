"use client";

import { useImperativeHandle, useRef } from "react";
import type { KeyboardEventHandler } from "react";
import { useRovingFocus } from "../../../hooks/focus/useRovingFocus";
import type { ToolbarProps } from "./Toolbar";

export function useToolbar(
  {
    label,
    children,
    orientation = "horizontal",
    direction = "ltr",
    onKeyDown,
    ref,
    className,
    ...props
  }: ToolbarProps,
  initialId?: string,
) {
  if (!label.trim()) throw new Error("Toolbar requires a nonempty label.");
  const rootRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => rootRef.current!, []);
  const focus = useRovingFocus({
    orientation,
    direction,
    loop: true,
    typeahead: false,
    initialId,
    fallbackRef: rootRef,
  });

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    onKeyDown?.(event);
    if (!event.defaultPrevented) focus.onKeyDown(event);
  };

  return {
    label,
    children,
    orientation,
    direction,
    className,
    props,
    rootRef,
    focus,
    handleKeyDown,
  };
}
