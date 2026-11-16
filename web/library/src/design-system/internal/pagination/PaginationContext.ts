"use client";

import { createContext, useContext } from "react";

export interface PaginationContextValue {
  page: number;
  pageCount: number;
  disabled: boolean;
  requestPage(page: number): void;
}

export const PaginationContext = createContext<PaginationContextValue | null>(null);

export function usePaginationContext() {
  const value = useContext(PaginationContext);
  if (!value) throw new Error("PaginationItem must be rendered inside Pagination.");
  return value;
}
