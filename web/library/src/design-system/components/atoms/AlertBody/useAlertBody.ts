"use client";

import { useAlertContext } from "../../../internal/alert/AlertContext";
import type { AlertBodyProps } from "./AlertBody";

export function useAlertBody(input: AlertBodyProps) {
  const { children, className, ...props } = input;
  const context = useAlertContext();
  const role =
    context.announcement === "assertive"
      ? "alert"
      : context.announcement === "polite"
        ? "status"
        : undefined;

  return { children, className, props, context, role };
}
