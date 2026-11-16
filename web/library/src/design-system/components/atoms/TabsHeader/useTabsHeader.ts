"use client";
import { useImperativeHandle } from "react";
import { useTabsContext } from "../../../internal/tabs/TabsContext";
import type { TabsHeaderProps } from "./TabsHeader";

export function useTabsHeader(input: TabsHeaderProps) {
  const tabs = useTabsContext();
  const { className, ref, onKeyDown, ...props } = input;
  useImperativeHandle(ref, () => tabs.headerRef.current!, [tabs.headerRef]);

  const handleKeyDown: NonNullable<TabsHeaderProps["onKeyDown"]> = (event) => {
    onKeyDown?.(event);
    if (!event.defaultPrevented) tabs.focus.onKeyDown(event);
  };

  return {
    props,
    className,
    label: tabs.label,
    headerRef: tabs.headerRef,
    fallback: tabs.fallback,
    handleKeyDown,
  };
}
