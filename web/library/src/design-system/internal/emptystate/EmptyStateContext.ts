"use client";

import { createContext, useContext } from "react";

export interface EmptyStateContextValue {
  titleId?: string;
}
export const EmptyStateContext = createContext<EmptyStateContextValue | null>(null);

export function useEmptyStateContext() {
  const context = useContext(EmptyStateContext);
  if (!context) throw new Error("EmptyState parts must be rendered inside EmptyState.");
  return context;
}
