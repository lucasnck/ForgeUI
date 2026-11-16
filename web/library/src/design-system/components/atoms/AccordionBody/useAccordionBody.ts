"use client";

import { useAccordionItemContext } from "../../../internal/accordion/AccordionItemContext";
import type { AccordionBodyProps } from "./AccordionBody";

export function useAccordionBody(input: AccordionBodyProps) {
  useAccordionItemContext();
  const { children, className, ...props } = input;

  return { children, className, props };
}
