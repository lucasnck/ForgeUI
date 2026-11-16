"use client";

import { useAccordionItemContext } from "../../../internal/accordion/AccordionItemContext";
import type { AccordionFooterProps } from "./AccordionFooter";

export function useAccordionFooter(input: AccordionFooterProps) {
  useAccordionItemContext();
  const { children, className, ...props } = input;

  return { children, className, props };
}
