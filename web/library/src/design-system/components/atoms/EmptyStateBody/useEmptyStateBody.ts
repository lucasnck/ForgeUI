"use client";

import { useEmptyStateContext } from "../../../internal/emptystate/EmptyStateContext";
import type { EmptyStateBodyProps } from "./EmptyStateBody";

export function useEmptyStateBody(input: EmptyStateBodyProps) {
  const { children, className, ...props } = input;
  const context = useEmptyStateContext();

  return { children, className, props, context };
}
