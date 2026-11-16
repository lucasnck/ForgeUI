"use client";
import { createContext, useContext } from "react";
import type { AccordionContract, ComponentHeadingLevelProps } from "../../types";
export interface AccordionContextValue extends AccordionContract, ComponentHeadingLevelProps {
  animated: boolean;
}
export const AccordionContext = createContext<AccordionContextValue | null>(null);

export function useAccordionContext() {
  const value = useContext(AccordionContext);
  if (!value) throw new Error("AccordionItem must be inside Accordion.");
  return value;
}
