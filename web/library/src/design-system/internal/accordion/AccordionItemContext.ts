"use client";
import { createContext, useContext } from "react";
import type { CollapseContract } from "../../types/disclosure";
export const AccordionItemContext = createContext<CollapseContract | null>(null);

export function useAccordionItemContext() {
  const context = useContext(AccordionItemContext);
  if (!context) throw new Error("Accordion parts must be inside AccordionItem.");
  return context;
}
