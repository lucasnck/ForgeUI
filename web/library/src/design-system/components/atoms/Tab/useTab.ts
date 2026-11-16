"use client";
import { useRef, useLayoutEffect, useImperativeHandle } from "react";
import { useTabsContext } from "../../../internal/tabs/TabsContext";
import type { TabProps } from "./Tab";

export function useTab(input: TabProps) {
  const {
    attached = false,
    value,
    disabled = false,
    children,
    onFocus,
    onClick,
    ref,
    className,
    ...props
  } = input;
  const tabs = useTabsContext();
  const tabRef = useRef<HTMLButtonElement>(null);
  useImperativeHandle(ref, () => tabRef.current!, []);
  const register = tabs.focus.registerItem;
  useLayoutEffect(
    () =>
      register({
        id: value,
        ref: tabRef,
        textValue: tabRef.current?.textContent ?? "",
        disabled,
      }),
    [register, value, children, disabled],
  );

  const handleFocus: NonNullable<TabProps["onFocus"]> = (event) => {
    onFocus?.(event);
    if (!event.defaultPrevented) tabs.focus.onItemFocus(value);
  };

  const handleClick: NonNullable<TabProps["onClick"]> = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented && !disabled) tabs.select(value);
  };

  return {
    attached,
    props,
    children,
    className,
    disabled,
    tabRef,
    id: tabs.tabId(value),
    panelId: tabs.panelId(value),
    selected: tabs.selected === value,
    tabIndex: tabs.focus.tabIndex(value),
    animated: tabs.animated,
    handleFocus,
    handleClick,
  };
}
