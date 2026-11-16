"use client";

import { createContext, useContext } from "react";
import type { AnnouncementPoliteness } from "../../types/collection-contracts";

export interface ErrorStateContextValue {
  titleId?: string;
  announcement: AnnouncementPoliteness;
}
export const ErrorStateContext = createContext<ErrorStateContextValue | null>(null);

export function useErrorStateContext() {
  const context = useContext(ErrorStateContext);
  if (!context) throw new Error("ErrorState parts must be rendered inside ErrorState.");
  return context;
}
