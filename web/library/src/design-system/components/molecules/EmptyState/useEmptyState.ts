"use client";

import { useId } from "react";
import type { EmptyStateProps } from "./EmptyState";

export function useEmptyState(input: EmptyStateProps) {
  const { children, className, ...props } = input;
  const titleId = useId();

  return { children, className, props, titleId };
}
