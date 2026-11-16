"use client";

import { useId, type ChangeEvent } from "react";
import type { ThemeSelectorProps } from "./ThemeSelector";

export function useThemeSelector({
  value,
  options,
  onValueChange,
  label,
  id,
  disabled,
  size,
}: ThemeSelectorProps) {
  const generatedId = useId();
  const controlId = id ?? `theme-${generatedId}`;

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    if (disabled || event.defaultPrevented) return;
    const selected = options.find((option) => option.value === event.currentTarget.value);
    if (selected) onValueChange(selected.value);
  }

  return { size, value, options, label, disabled, controlId, handleChange };
}
