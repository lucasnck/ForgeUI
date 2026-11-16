"use client";
import { useId, useState } from "react";
import type { ChangeEvent } from "react";
import { useNativeRecipeOptions } from "../../ResourceExamples/useNativeRecipeOptions";

export function useNativeControlRecipesExample() {
  const id = useId();
  const options = useNativeRecipeOptions();
  const [disabled, setDisabled] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [value, setValue] = useState("");

  function change(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setValue(event.target.value);
  }

  return {
    ...options,
    id,
    disabled,
    setDisabled,
    invalid,
    setInvalid,
    fullWidth,
    setFullWidth,
    value,
    change,
  };
}
