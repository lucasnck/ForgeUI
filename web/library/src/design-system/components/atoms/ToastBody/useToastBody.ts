"use client";
import { useToastContext } from "../../../internal/toast/ToastContext";
import type { ToastBodyProps } from "./ToastBody";

export function useToastBody(input: ToastBodyProps) {
  const { children, ...props } = input;
  const context = useToastContext();

  return { context, props, children };
}
