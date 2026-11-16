"use client";

import { useContext } from "react";
import { ThemeContext } from "./context";
import type { ThemeContextValue } from "./context";

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("useTheme must be used within ThemeProvider");
  return value;
}
