"use client";

import { useErrorStateContext } from "../../../internal/errorstate/ErrorStateContext";
import type { ErrorStateFooterProps } from "./ErrorStateFooter";

export function useErrorStateFooter(input: ErrorStateFooterProps) {
  const { children, className, ...props } = input;
  const context = useErrorStateContext();

  return { children, className, props, context };
}
