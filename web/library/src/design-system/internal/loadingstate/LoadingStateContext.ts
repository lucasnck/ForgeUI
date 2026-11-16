"use client";

import { createContext, useContext } from "react";

export interface LoadingStateContextValue {
  titleId?: string;
  label: string;
}
export const LoadingStateContext = createContext<LoadingStateContextValue | null>(null);

export function useLoadingStateContext() {
  const context = useContext(LoadingStateContext);
  if (!context) throw new Error("LoadingState parts must be rendered inside LoadingState.");
  return context;
}
