"use client";

import { useLayoutEffect, useRef } from "react";
import type { MouseEventHandler } from "react";
import { useStepperContext } from "../../../internal/stepper/StepperContext";
import type { StepperItemProps } from "./StepperItem";

export function useStepperItem({
  value,
  label,
  status = "pending",
  statusLabel,
  disabled = false,
  onClick,
  className,
  animated = true,
  children,
  ...props
}: StepperItemProps) {
  const { registerStep, requestStep, stepId, panelId, value: current } = useStepperContext();
  const buttonRef = useRef<HTMLButtonElement>(null);
  if (!label.trim()) throw new Error("StepperItem requires a nonempty label.");
  if (status !== "pending" && !statusLabel?.trim())
    throw new Error("A complete/error StepperItem requires a visible statusLabel.");
  useLayoutEffect(() => registerStep(value, disabled, buttonRef), [registerStep, value, disabled]);

  const handleClick: MouseEventHandler<HTMLLIElement> = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented && !disabled && buttonRef.current?.contains(event.target as Node))
      requestStep(value);
  };

  const statusId = status === "pending" ? undefined : stepId(value) + "-status";

  return {
    props,
    className,
    children,
    buttonRef,
    disabled,
    animated,
    label,
    status,
    statusLabel,
    statusId,
    selected: current === value,
    id: stepId(value),
    panel: panelId(value),
    handleClick,
  };
}
