"use client";

import { useFormPresentationContext } from "../../../internal/form/FormContext";
import type { FormBodyProps } from "./FormBody";

export function useFormBody({ children, className, ...props }: FormBodyProps) {
  const context = useFormPresentationContext();

  return { context, props, className, children };
}
