"use client";

import { useCardContext } from "../../../internal/card/CardContext";
import type { CardHeaderProps } from "./CardHeader";

export function useCardHeader(input: CardHeaderProps) {
  const { children, className, ...props } = input;
  const context = useCardContext();

  return { children, className, props, context };
}
