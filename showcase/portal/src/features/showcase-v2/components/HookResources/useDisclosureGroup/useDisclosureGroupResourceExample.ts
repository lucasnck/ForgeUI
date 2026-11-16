"use client";
import { useDisclosureGroup } from "@forge-ui/web";
import { useDisclosureFixture } from "../useDisclosureFixture";

export function useDisclosureGroupResourceExample() {
  const fixture = useDisclosureFixture();
  const group = useDisclosureGroup({
    multiple: fixture.multiple,
    disabled: fixture.disabled,
    value: fixture.value,
    onValueChange: fixture.onValueChange,
  });

  return { ...fixture, group };
}
