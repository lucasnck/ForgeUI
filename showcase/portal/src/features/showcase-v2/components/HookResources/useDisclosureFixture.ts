"use client";
import { useId, useState } from "react";

export function useDisclosureFixture() {
  const namespace = useId();
  const [multiple, setMultiple] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [acceptChanges, setAcceptChanges] = useState(true);
  const [value, setValue] = useState<readonly string[]>([]);

  function onValueChange(next: readonly string[]) {
    if (acceptChanges) setValue(next);
  }

  return {
    namespace,
    multiple,
    setMultiple,
    disabled,
    setDisabled,
    acceptChanges,
    setAcceptChanges,
    value,
    onValueChange,
  };
}
