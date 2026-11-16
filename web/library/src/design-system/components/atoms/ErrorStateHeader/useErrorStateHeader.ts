"use client";

import { useErrorStateContext } from "../../../internal/errorstate/ErrorStateContext";
import type { ErrorStateHeaderProps } from "./ErrorStateHeader";

export function useErrorStateHeader(input: ErrorStateHeaderProps) {
  const { children, className, ...props } = input;
  const context = useErrorStateContext();

  return { children, className, props, context };
}
