"use client";

import { createContext, useContext } from "react";
import type { QueryInputContextValue } from "../query-input/QueryInputContext";

export const AutocompleteContext = createContext<QueryInputContextValue | null>(null);

export function useAutocompleteContext() {
  const context = useContext(AutocompleteContext);
  if (!context) throw new Error("Autocomplete parts require Autocomplete");
  return context;
}
