"use client";

import type { AccordionContract, AccordionOptions } from "../../types/disclosure";
import { useDisclosureGroup } from "./useDisclosureGroup";

export function useAccordion(options: AccordionOptions = {}): AccordionContract {
  return useDisclosureGroup(options);
}
