"use client";

import { useCardContext } from "../../../internal/card/CardContext";
import type { CardBodyProps } from "./CardBody";

export function useCardBody(input: CardBodyProps) {
  const { children, className, ...props } = input;
  const context = useCardContext();

  return { children, className, props, context };
}
