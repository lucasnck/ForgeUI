"use client";
import { useState, useId } from "react";
import type { ChangeEvent } from "react";

export function useRangeRecipesExample() {
  const id = useId();
  const [value, setValue] = useState(40);
  const [disabled, setDisabled] = useState(false);

  function change(event: ChangeEvent<HTMLInputElement>) {
    setValue(Number(event.target.value));
  }

  return { id, value, change, disabled, setDisabled };
}
