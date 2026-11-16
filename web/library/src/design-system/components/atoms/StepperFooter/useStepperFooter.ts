"use client";

import { useStepperContext } from "../../../internal/stepper/StepperContext";
import type { StepperFooterProps } from "./StepperFooter";

export function useStepperFooter({ children, className, ...props }: StepperFooterProps) {
  useStepperContext();
  return { props, children, className };
}
