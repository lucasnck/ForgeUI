"use client";

import { useStepperContext } from "../../../internal/stepper/StepperContext";
import type { StepperBodyProps } from "./StepperBody";

export function useStepperBody({ children, className, ...props }: StepperBodyProps) {
  useStepperContext();
  return { props, children, className };
}
