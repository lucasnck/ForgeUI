"use client";

import { useLoadingStateContext } from "../../../internal/loadingstate/LoadingStateContext";
import type { LoadingStateBodyProps } from "./LoadingStateBody";

export function useLoadingStateBody(input: LoadingStateBodyProps) {
  const { children, className, ...props } = input;
  const context = useLoadingStateContext();

  return { children, className, props, context };
}
