"use client";
import { useAccordion } from "@forge-ui/web";
import { useDisclosureFixture } from "../useDisclosureFixture";

export function useAccordionResourceExample() {
  const fixture = useDisclosureFixture();
  const group = useAccordion({
    multiple: fixture.multiple,
    disabled: fixture.disabled,
    value: fixture.value,
    onValueChange: fixture.onValueChange,
  });

  return { ...fixture, group };
}
