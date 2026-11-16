"use client";
import { useId, useState } from "react";
import type { ChangeEvent } from "react";
import { useNativeRecipeOptions } from "../ResourceExamples/useNativeRecipeOptions";
import { useResourceExampleCopy } from "../ResourceExamples/useResourceExampleCopy";

export function useNativeFieldFixture(initialValue = "") {
  const id = useId();
  const visual = useNativeRecipeOptions();
  const copy = useResourceExampleCopy();
  const [value, setValue] = useState(initialValue);
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [changes, setChanges] = useState(0);
  const [lastEvent, setLastEvent] = useState("—");

  function change(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setValue(event.currentTarget.value);
    setChanges((v) => v + 1);
    setLastEvent("onChange");
  }

  function clear() {
    setValue(initialValue.startsWith("#") ? "#000000" : "");
    setLastEvent("clear");
  }

  return {
    ...visual,
    copy,
    id,
    value,
    setValue,
    disabled,
    setDisabled,
    readOnly,
    setReadOnly,
    invalid,
    setInvalid,
    fullWidth,
    setFullWidth,
    changes,
    lastEvent,
    change,
    clear,
  };
}
