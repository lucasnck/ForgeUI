"use client";

import { createContext, useContext } from "react";
import type { QueryInputContextValue } from "../query-input/QueryInputContext";

export const ComboboxContext = createContext<QueryInputContextValue | null>(null);

export function useComboboxContext() {
  const context = useContext(ComboboxContext);
  if (!context) throw new Error("Combobox parts require Combobox");
  return context;
}
