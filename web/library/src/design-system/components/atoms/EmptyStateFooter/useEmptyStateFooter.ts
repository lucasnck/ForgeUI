"use client";

import { useEmptyStateContext } from "../../../internal/emptystate/EmptyStateContext";
import type { EmptyStateFooterProps } from "./EmptyStateFooter";

export function useEmptyStateFooter(input: EmptyStateFooterProps) {
  const { children, className, ...props } = input;
  const context = useEmptyStateContext();

  return { children, className, props, context };
}
