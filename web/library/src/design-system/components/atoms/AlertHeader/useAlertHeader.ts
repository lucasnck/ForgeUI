"use client";

import { useAlertContext } from "../../../internal/alert/AlertContext";
import type { AlertHeaderProps } from "./AlertHeader";

export function useAlertHeader(input: AlertHeaderProps) {
  const { children, className, ...props } = input;
  const context = useAlertContext();

  return { children, className, props, context };
}
