"use client";

import { useLoadingStateContext } from "../../../internal/loadingstate/LoadingStateContext";
import type { LoadingStateHeaderProps } from "./LoadingStateHeader";

export function useLoadingStateHeader(input: LoadingStateHeaderProps) {
  const { children, className, ...props } = input;
  const context = useLoadingStateContext();

  return { children, className, props, context };
}
