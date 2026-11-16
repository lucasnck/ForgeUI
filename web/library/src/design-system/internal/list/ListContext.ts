"use client";

import { createContext, useContext } from "react";

export interface ListContextValue {
  titleId?: string;
  label?: string;
}
export const ListContext = createContext<ListContextValue | null>(null);

export function useListContext() {
  const context = useContext(ListContext);
  if (!context) throw new Error("List parts must be rendered inside List.");
  return context;
}
