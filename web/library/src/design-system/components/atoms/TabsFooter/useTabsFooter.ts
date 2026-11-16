"use client";
import { useTabsContext } from "../../../internal/tabs/TabsContext";
import type { TabsFooterProps } from "./TabsFooter";

export function useTabsFooter(input: TabsFooterProps) {
  useTabsContext();
  const { className, ...props } = input;

  return { props, className };
}
