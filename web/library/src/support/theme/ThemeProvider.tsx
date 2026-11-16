"use client";

import type { ReactNode } from "react";
import type { ThemePreference } from "./theme";
import { ThemeContext } from "./context";
import { useThemeProvider } from "./useThemeProvider";

export type { ThemeContextValue } from "./context";
export { useTheme } from "./useTheme";

export interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemePreference;
  storageKey?: string;
}

export function ThemeProvider(props: ThemeProviderProps) {
  const view = useThemeProvider(props);

  return <ThemeContext.Provider value={view.value}>{view.children}</ThemeContext.Provider>;
}
