"use client";
import { createContext, useContext } from "react";
import type { RefObject } from "react";
import type { RovingFocusContract } from "../../types";
export interface TabIdentity {
  value: string;
  disabled?: boolean;
}
export interface TabsContextValue {
  selected?: string;
  select(value: string): void;
  focus: RovingFocusContract;
  label: string;
  animated: boolean;
  tabId(value: string): string;
  panelId(value: string): string;
  headerRef: RefObject<HTMLDivElement | null>;
  fallback: boolean;
  panelFocused(value: string): void;
  panelBlurred(value: string, related: EventTarget | null): void;
}
export const TabsContext = createContext<TabsContextValue | null>(null);

export function useTabsContext() {
  const value = useContext(TabsContext);
  if (!value) throw new Error("Tabs parts must be inside Tabs.");
  return value;
}
