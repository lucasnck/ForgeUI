"use client";

import { useRef } from "react";
import { usePresence } from "../../../hooks/motion";
import type { PopupListboxProps } from "./PopupListbox";

export function usePopupListboxView<Item>({
  popup,
  items,
  getOptionLabel,
  getOptionKey,
  listboxLabel,
  animated = true,
  animationEffect = "scale",
}: PopupListboxProps<Item>) {
  const elementRef = useRef<HTMLUListElement>(null);
  const open = popup.isOpen && items.length > 0;
  const { present, phase, onTransitionEnd } = usePresence({
    open,
    elementRef,
    enabled: animated && animationEffect !== "none",
  });

  return {
    popup,
    items,
    getOptionLabel,
    getOptionKey,
    listboxLabel,
    animated,
    animationEffect,
    elementRef,
    open,
    present,
    phase,
    onTransitionEnd,
  };
}
