"use client";

import { useErrorStateContext } from "../../../internal/errorstate/ErrorStateContext";
import type { ErrorStateBodyProps } from "./ErrorStateBody";

export function useErrorStateBody(input: ErrorStateBodyProps) {
  const { children, className, ...props } = input;
  const context = useErrorStateContext();
  const role =
    context.announcement === "assertive"
      ? "alert"
      : context.announcement === "polite"
        ? "status"
        : undefined;

  return { children, className, props, context, role };
}
