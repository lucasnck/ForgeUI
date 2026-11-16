"use client";

import { useId } from "react";
import type { ChoiceGroupProps } from "./ChoiceGroup";

export function useChoiceGroup({
  legend,
  invalid,
  gap = "2",
  padding,
  children,
  className,
  ...props
}: ChoiceGroupProps) {
  const id = useId();

  return {
    legend,
    invalid,
    gap,
    padding,
    children,
    className,
    props,
    footerId: id + "-description",
    legendId: id + "-legend",
  };
}
