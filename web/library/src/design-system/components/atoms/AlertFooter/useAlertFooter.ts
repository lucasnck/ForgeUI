"use client";

import { useAlertContext } from "../../../internal/alert/AlertContext";
import type { AlertFooterProps } from "./AlertFooter";

export function useAlertFooter(input: AlertFooterProps) {
  const { children, className, ...props } = input;
  const context = useAlertContext();

  return { children, className, props, context };
}
