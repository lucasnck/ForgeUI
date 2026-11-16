"use client";

import type { PointerEvent } from "react";
import type { PopupListboxItemProps } from "./PopupListboxItem";

export function usePopupListboxItem({
  popup,
  index,
  label,
  onPointerDown,
  className,
  animated = true,
  ...props
}: PopupListboxItemProps) {
  function handlePointerDown(event: PointerEvent<HTMLLIElement>) {
    onPointerDown?.(event);
    if (event.defaultPrevented || !popup.isOpen) return;
    event.preventDefault();
    popup.acceptOption(index);
  }

  return { popup, index, label, props, className, animated, handlePointerDown };
}
