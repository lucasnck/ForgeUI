"use client";

import { useFormFieldContext } from "../../../internal/formfield/FormFieldContext";
import type { FormFieldHeaderProps } from "./FormFieldHeader";

export function useFormFieldHeader({ children, className, ...props }: FormFieldHeaderProps) {
  const context = useFormFieldContext();

  return { context, props, className, children: children ?? context.label };
}
