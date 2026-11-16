"use client";
import { useState, useId } from "react";
import type { ChangeEvent } from "react";
import { useNativeRecipeOptions } from "../../ResourceExamples/useNativeRecipeOptions";

export function useInteractiveRecipesExample() {
  const id = useId();
  const options = useNativeRecipeOptions();
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);

  function change(event: ChangeEvent<HTMLInputElement>) {
    setChecked(event.target.checked);
  }

  return { ...options, id, checked, disabled, setDisabled, change };
}
