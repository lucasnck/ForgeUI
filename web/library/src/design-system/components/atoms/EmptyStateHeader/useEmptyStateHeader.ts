"use client";

import { useEmptyStateContext } from "../../../internal/emptystate/EmptyStateContext";
import type { EmptyStateHeaderProps } from "./EmptyStateHeader";

export function useEmptyStateHeader(input: EmptyStateHeaderProps) {
  const { children, className, ...props } = input;
  const context = useEmptyStateContext();

  return { children, className, props, context };
}
