"use client";

import { useComboboxContext } from "../../../internal/combobox/ComboboxContext";
import type { ComboboxHeaderProps } from "./ComboboxHeader";

export function useComboboxHeader({ children, className, ...props }: ComboboxHeaderProps) {
  const field = useComboboxContext();

  return { field, props, children, className };
}
