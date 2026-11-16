"use client";

import { useFormFieldContext } from "../../../internal/formfield/FormFieldContext";
import type { FormFieldFooterProps } from "./FormFieldFooter";

export function useFormFieldFooter({
  hint,
  error,
  children,
  className,
  ...props
}: FormFieldFooterProps) {
  const context = useFormFieldContext();

  return {
    context,
    props,
    hint,
    error,
    children,
    className,
    visible: Boolean(
      hint ||
      error ||
      (children !== undefined &&
        children !== null &&
        typeof children !== "boolean" &&
        children !== ""),
    ),
  };
}
