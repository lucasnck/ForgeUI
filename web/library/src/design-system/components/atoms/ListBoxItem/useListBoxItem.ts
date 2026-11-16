"use client";
import { useRef, useLayoutEffect, useImperativeHandle } from "react";
import type { ComponentPropsWithRef } from "react";
import { useListBoxContext } from "../../../internal/listbox/ListBoxContext";
import type { ListBoxItemProps } from "./ListBoxItem";

export function useListBoxItem(input: ListBoxItemProps) {
  const {
    size = "md",
    tone = "brand",
    appearance = "ghost",
    shape = "rounded",
    value,
    label,
    disabled = false,
    onFocus,
    onKeyDown,
    onClick,
    ref,
    className,
    children,
    ...props
  } = input;
  if (children != null || !label.trim())
    throw new Error("ListBoxItem uses one plain nonempty label.");
  const list = useListBoxContext();
  const itemRef = useRef<HTMLLIElement>(null);
  useImperativeHandle(ref, () => itemRef.current!, []);
  const blocked = list.disabled || disabled;
  const register = list.focus.registerItem;
  useLayoutEffect(
    () =>
      register({
        id: value,
        ref: itemRef,
        textValue: label,
        disabled: blocked,
      }),
    [register, value, label, blocked],
  );

  const handleFocus: NonNullable<ComponentPropsWithRef<"li">["onFocus"]> = (event) => {
    onFocus?.(event);
    if (!event.defaultPrevented && !blocked) list.focus.onItemFocus(value);
  };

  const handleKeyDown: NonNullable<ComponentPropsWithRef<"li">["onKeyDown"]> = (event) => {
    onKeyDown?.(event);
    if (!event.defaultPrevented) list.onOptionKeyDown(event, value);
  };

  const handleClick: NonNullable<ComponentPropsWithRef<"li">["onClick"]> = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented && !blocked) list.select(value);
  };

  return {
    size,
    tone,
    appearance,
    shape,
    props,
    itemRef,
    label,
    className,
    blocked,
    selected: list.isSelected(value),
    tabIndex: list.focus.tabIndex(value),
    animated: list.animated,
    handleFocus,
    handleKeyDown,
    handleClick,
  };
}
