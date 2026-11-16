"use client";
import { useTabsContext } from "../../../internal/tabs/TabsContext";
import type { TabsBodyProps } from "./TabsBody";

export function useTabsBody(input: TabsBodyProps) {
  useTabsContext();
  const { className, ...props } = input;

  return { props, className };
}
