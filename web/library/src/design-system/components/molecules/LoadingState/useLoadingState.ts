"use client";

import { useId } from "react";
import type { LoadingStateProps } from "./LoadingState";

export function useLoadingState(input: LoadingStateProps) {
  const { children, className, label, ...props } = input;
  const titleId = useId();
  if (!label.trim()) throw new Error("LoadingState requires a localized label.");
  return { children, className, props, titleId, label };
}
