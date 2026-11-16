"use client";

import { useCardContext } from "../../../internal/card/CardContext";
import type { CardFooterProps } from "./CardFooter";

export function useCardFooter(input: CardFooterProps) {
  const { children, className, ...props } = input;
  const context = useCardContext();

  return { children, className, props, context };
}
