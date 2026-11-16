"use client";
import { useState, useId } from "react";
import type { ChangeEvent } from "react";

export function useMeterExample() {
  const id = useId();
  const [value, setValue] = useState(40);
  const [indeterminate, setIndeterminate] = useState(false);

  function changeValue(v: string) {
    setValue(Number(v));
  }

  function change(event: ChangeEvent<HTMLInputElement>) {
    setValue(Number(event.currentTarget.value));
  }

  return { id, value, indeterminate, setIndeterminate, changeValue, change };
}
