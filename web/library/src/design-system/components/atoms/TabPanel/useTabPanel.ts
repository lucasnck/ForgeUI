"use client";
import { useTabsContext } from "../../../internal/tabs/TabsContext";
import type { TabPanelProps } from "./TabPanel";

export function useTabPanel(input: TabPanelProps) {
  const { value, onFocusCapture, onBlurCapture, className, ...props } = input;
  const tabs = useTabsContext();

  const handleFocus: NonNullable<TabPanelProps["onFocusCapture"]> = (event) => {
    onFocusCapture?.(event);
    if (!event.defaultPrevented) tabs.panelFocused(value);
  };

  const handleBlur: NonNullable<TabPanelProps["onBlurCapture"]> = (event) => {
    onBlurCapture?.(event);
    if (!event.defaultPrevented && !event.currentTarget.contains(event.relatedTarget))
      tabs.panelBlurred(value, event.relatedTarget);
  };

  return {
    props,
    className,
    hidden: tabs.selected !== value,
    id: tabs.panelId(value),
    labelId: tabs.tabId(value),
    handleFocus,
    handleBlur,
  };
}
