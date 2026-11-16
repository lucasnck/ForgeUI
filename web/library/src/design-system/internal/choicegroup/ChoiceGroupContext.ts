"use client";

import { createContext, useContext } from "react";

export interface ChoiceGroupContextValue {
  legendId: string;
  footerId: string;
  describedBy?: string;
  invalid?: boolean;
}
export const ChoiceGroupContext = createContext<ChoiceGroupContextValue | null>(null);

export function useChoiceGroupContext() {
  const context = useContext(ChoiceGroupContext);
  if (!context) throw new Error("ChoiceGroup parts require ChoiceGroup");
  return context;
}
