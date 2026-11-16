"use client";

import { useFormPresentationContext } from "../../../internal/form/FormContext";
import type { FormHeaderProps } from "./FormHeader";

export function useFormHeader({ children, className, ...props }: FormHeaderProps) {
  const context = useFormPresentationContext();

  return { context, props, className, children };
}
