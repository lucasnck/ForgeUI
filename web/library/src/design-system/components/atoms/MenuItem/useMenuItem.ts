"use client";
import { useRef, useLayoutEffect } from "react";
import { useMenuContext } from "../../../internal/menu/MenuContext";
import type { MenuItemProps } from "./MenuItem";

export function useMenuItem(input: MenuItemProps) {
  const { value, label, disabled = false, onClick, onFocus, className, children, ...props } = input;
  if (!label.trim() || children != null)
    throw new Error("MenuItem requires a nonempty plain label.");
  const menu = useMenuContext();
  const itemRef = useRef<HTMLButtonElement>(null);
  const register = menu.focus.registerItem;
  useLayoutEffect(
    () => register({ id: value, ref: itemRef, textValue: label, disabled }),
    [register, value, label, disabled],
  );

  const handleFocus: NonNullable<MenuItemProps["onFocus"]> = (event) => {
    onFocus?.(event);
    if (!event.defaultPrevented && !disabled) menu.focus.onItemFocus(value);
  };

  const handleClick: NonNullable<MenuItemProps["onClick"]> = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented && !disabled && itemRef.current?.contains(event.target as Node))
      menu.activate(value);
  };

  return {
    props,
    className,
    label,
    disabled,
    itemRef,
    tabIndex: menu.focus.tabIndex(value),
    animated: menu.animated,
    handleFocus,
    handleClick,
  };
}
