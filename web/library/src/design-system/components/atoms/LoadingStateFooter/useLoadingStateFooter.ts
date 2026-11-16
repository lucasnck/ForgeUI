"use client";

import { useLoadingStateContext } from "../../../internal/loadingstate/LoadingStateContext";
import type { LoadingStateFooterProps } from "./LoadingStateFooter";

export function useLoadingStateFooter(input: LoadingStateFooterProps) {
  const { children, className, ...props } = input;
  const context = useLoadingStateContext();

  return { children, className, props, context };
}
