"use client";

import { useFormPresentationContext } from "../../../internal/form/FormContext";
import type { FormFooterProps } from "./FormFooter";

export function useFormFooter({ children, className, ...props }: FormFooterProps) {
  const context = useFormPresentationContext();

  return { context, props, className, children };
}
