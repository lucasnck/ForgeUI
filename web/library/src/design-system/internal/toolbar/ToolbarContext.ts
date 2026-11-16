"use client";

import { createContext, useContext } from "react";
import type { RovingFocusContract } from "../../types/focus";

export const ToolbarContext = createContext<RovingFocusContract | null>(null);

export function useToolbarContext() {
  const context = useContext(ToolbarContext);
  if (!context) throw new Error("ToolbarItem must be rendered inside Toolbar.");
  return context;
}
