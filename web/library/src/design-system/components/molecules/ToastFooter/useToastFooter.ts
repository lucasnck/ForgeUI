"use client";
import { useToastContext } from "../../../internal/toast/ToastContext";
import type { ToastFooterProps } from "./ToastFooter";

export function useToastFooter(input: ToastFooterProps) {
  const { children, ...props } = input;
  const context = useToastContext();

  return { context, props, children };
}
