"use client";
import { useState } from "react";
import { useNativeRecipeOptions } from "../ResourceExamples/useNativeRecipeOptions";
import { useId } from "react";
import type { ChangeEvent } from "react";

export function useCheckboxExample() {
  const id = useId();
  const options = useNativeRecipeOptions();
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [changes, setChanges] = useState(0);

  function change(event: ChangeEvent<HTMLInputElement>) {
    setChecked(event.currentTarget.checked);
    setChanges((v) => v + 1);
  }

  return { ...options, id, checked, disabled, setDisabled, changes, change };
}
