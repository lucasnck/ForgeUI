"use client";

import { useId } from "react";
import type { CardProps } from "./Card";

export function useCard(input: CardProps) {
  const { children, className, elevation = "raised", shape, fullWidth = true, ...props } = input;
  const titleId = useId();

  return { children, className, props, titleId, elevation, shape, fullWidth };
}
