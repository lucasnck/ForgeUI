"use client";

import { useId } from "react";
import type { AlertProps } from "./Alert";

export function useAlert(input: AlertProps) {
  const { children, className, announcement = "polite", ...props } = input;
  const titleId = useId();

  return { children, className, props, titleId, announcement };
}
