"use client";

import { useLayoutEffect, useImperativeHandle, useRef } from "react";
import type { FocusEventHandler } from "react";
import { useToolbarContext } from "../../../internal/toolbar/ToolbarContext";
import type { ToolbarItemProps } from "./ToolbarItem";

export function useToolbarItem({
  itemKey,
  disabled,
  children,
  ref,
  onFocus,
  className,
  animated = true,
  ...props
}: ToolbarItemProps) {
  const { registerItem, onItemFocus, tabIndex: getTabIndex } = useToolbarContext();
  const buttonRef = useRef<HTMLButtonElement>(null);
  useImperativeHandle(ref, () => buttonRef.current!, []);
  useLayoutEffect(() => {
    if (
      buttonRef.current?.querySelector(
        "input, select, textarea, button, a[href], [role=slider], [role=radio], [role=toolbar], [tabindex]",
      )
    ) {
      throw new Error("ToolbarItem content must not contain nested interactive controls.");
    }

    return registerItem({
      id: itemKey,
      ref: buttonRef,
      textValue: buttonRef.current?.textContent ?? "",
      disabled,
    });
  }, [registerItem, itemKey, children, disabled]);

  const handleFocus: FocusEventHandler<HTMLButtonElement> = (event) => {
    onFocus?.(event);
    if (!event.defaultPrevented) onItemFocus(itemKey);
  };

  const tabIndex = getTabIndex(itemKey);

  return { tabIndex, buttonRef, disabled, children, className, animated, props, handleFocus };
}
