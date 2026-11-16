"use client";

import { useImperativeHandle, useLayoutEffect, useRef } from "react";
import { useStepperContext } from "../../../internal/stepper/StepperContext";
import type { StepperHeaderProps } from "./StepperHeader";

export function useStepperHeader({ children, className, ref, ...props }: StepperHeaderProps) {
  const { label, registerNavigation } = useStepperContext();
  const navigationRef = useRef<HTMLElement>(null);
  useImperativeHandle(ref, () => navigationRef.current!, []);
  useLayoutEffect(() => registerNavigation(navigationRef), [registerNavigation]);
  return { props, children, className, label, navigationRef };
}
