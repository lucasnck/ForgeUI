"use client";

import { createContext } from "react";
import type { Theme, ThemePreference } from "./theme";

export interface ThemeContextValue {
  theme: ThemePreference;
  resolvedTheme: Theme;
  setTheme(theme: ThemePreference): void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
