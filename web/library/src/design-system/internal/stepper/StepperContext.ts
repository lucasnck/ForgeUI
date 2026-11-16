"use client";

import { createContext, useContext } from "react";
import type { RefObject } from "react";

export interface StepperContextValue {
  label: string;
  value: string;
  registerStep(
    value: string,
    disabled: boolean,
    ref: RefObject<HTMLButtonElement | null>,
  ): () => void;
  registerNavigation(ref: RefObject<HTMLElement | null>): () => void;
  requestStep(value: string): void;
  markPanelFocus(value: string, focused: boolean): void;
  stepId(value: string): string;
  panelId(value: string): string;
}
export const StepperContext = createContext<StepperContextValue | null>(null);

export function useStepperContext() {
  const context = useContext(StepperContext);
  if (!context) throw new Error("Stepper parts must be rendered inside Stepper.");
  return context;
}
