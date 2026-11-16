"use client";
import { DisclosurePreview } from "../disclosure.shared";
import { useAccordionResourceExample } from "./useAccordionResourceExample";

export function UseAccordionExample() {
  const view = useAccordionResourceExample();

  return <DisclosurePreview {...view} />;
}
