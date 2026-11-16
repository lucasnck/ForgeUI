"use client";

import { createContext, useContext } from "react";

export interface FormContextValue {
  loading: boolean;
  loadingLabel?: string;
}
export const FormContext = createContext<FormContextValue | null>(null);

export function useFormPresentationContext() {
  const context = useContext(FormContext);
  if (!context) throw new Error("Form parts require Form");
  return context;
}
