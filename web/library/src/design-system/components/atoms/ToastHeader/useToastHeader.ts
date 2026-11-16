"use client";
import { useToastContext } from "../../../internal/toast/ToastContext";
import type { ToastHeaderProps } from "./ToastHeader";

export function useToastHeader(input: ToastHeaderProps) {
  const { children, ...props } = input;
  const context = useToastContext();

  return { context, props, children };
}
