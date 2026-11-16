"use client";

import { useImperativeHandle, useRef } from "react";
import type { FocusEventHandler } from "react";
import { useStepperContext } from "../../../internal/stepper/StepperContext";
import type { StepperPanelProps } from "./StepperPanel";

export function useStepperPanel({
  value,
  children,
  className,
  ref,
  onFocusCapture,
  onBlurCapture,
  ...props
}: StepperPanelProps) {
  const { value: current, stepId, panelId, markPanelFocus } = useStepperContext();
  const panelRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => panelRef.current!, []);
  const hidden = current !== value;

  const handleFocus: FocusEventHandler<HTMLDivElement> = (event) => {
    onFocusCapture?.(event);
    if (!event.defaultPrevented) markPanelFocus(value, true);
  };

  const handleBlur: FocusEventHandler<HTMLDivElement> = (event) => {
    onBlurCapture?.(event);
    if (!hidden && !event.defaultPrevented)
      markPanelFocus(value, !!panelRef.current?.contains(event.relatedTarget));
  };

  return {
    props,
    children,
    className,
    panelRef,
    hidden,
    id: panelId(value),
    labelId: stepId(value),
    handleFocus,
    handleBlur,
  };
}
