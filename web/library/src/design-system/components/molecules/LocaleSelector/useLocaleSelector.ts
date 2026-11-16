"use client";

import { useId, type ChangeEvent } from "react";
import type { LocaleSelectorProps } from "./LocaleSelector";

export function useLocaleSelector({
  value,
  options,
  onValueChange,
  label,
  id,
  disabled,
  size,
}: LocaleSelectorProps) {
  const generatedId = useId();
  const controlId = id ?? `locale-${generatedId}`;

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    if (disabled || event.defaultPrevented) return;
    const selected = options.find((option) => option.value === event.currentTarget.value);
    if (selected) onValueChange(selected.value);
  }

  return { size, value, options, label, disabled, controlId, handleChange };
}
