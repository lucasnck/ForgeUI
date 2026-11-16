"use client";
import { useAccordion } from "../../../hooks/disclosure-group/useAccordion";
import type { AccordionProps } from "./Accordion";

export function useAccordionView(input: AccordionProps) {
  const {
    value,
    defaultValue,
    onValueChange,
    multiple,
    collapsible,
    disabled,
    level,
    animated = true,
    children,
    className,
    ...props
  } = input;
  const accordion = useAccordion({
    value,
    defaultValue,
    onValueChange,
    multiple,
    collapsible,
    disabled,
  });

  return { props, children, className, context: { ...accordion, level, animated } };
}
