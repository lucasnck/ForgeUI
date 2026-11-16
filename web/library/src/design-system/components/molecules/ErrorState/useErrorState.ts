"use client";

import { useId } from "react";
import type { ErrorStateProps } from "./ErrorState";

export function useErrorState(input: ErrorStateProps) {
  const { children, className, announcement = "polite", ...props } = input;
  const titleId = useId();

  return { children, className, props, titleId, announcement };
}
