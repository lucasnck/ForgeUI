"use client";

import { createContext, useContext } from "react";

export interface RadioGroupContextValue {
  id: string;
  name: string;
  selected: string;
  isChecked(key: string): boolean;
  disabled: boolean;
  invalid?: boolean;
}
export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export function useRadioGroupContext() {
  const context = useContext(RadioGroupContext);
  if (!context) throw new Error("RadioGroupItem requires RadioGroup");
  return context;
}
