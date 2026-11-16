"use client";

import type { ChoiceOption } from "../../../types/selection-navigation";
import { useComboboxContext } from "../../../internal/combobox/ComboboxContext";
import type { ComboboxBodyProps } from "./ComboboxBody";

export function useComboboxBody({ children, className, ...props }: ComboboxBodyProps) {
  const field = useComboboxContext();

  function getOptionLabel(option: ChoiceOption) {
    return option.label;
  }

  return { field, children, className, props, getOptionLabel };
}
