"use client";

import { createContext, useContext } from "react";

export interface CheckboxGroupContextValue {
  id: string;
  name: string;
  selected: readonly string[];
  isChecked(key: string): boolean;
  disabled: boolean;
  invalid?: boolean;
}
export const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null);

export function useCheckboxGroupContext() {
  const context = useContext(CheckboxGroupContext);
  if (!context) throw new Error("CheckboxGroupItem requires CheckboxGroup");
  return context;
}
