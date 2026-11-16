"use client";

import { createContext, useContext } from "react";

export interface FormFieldContextValue {
  controlId: string;
  label: string;
  hintId: string;
  errorId: string;
  invalid: boolean;
  describedBy?: string;
}

export const FormFieldContext = createContext<FormFieldContextValue | null>(null);

export function useFormFieldContext(): FormFieldContextValue {
  const context = useContext(FormFieldContext);
  if (!context) throw new Error("FormField parts require FormField.");
  return context;
}
