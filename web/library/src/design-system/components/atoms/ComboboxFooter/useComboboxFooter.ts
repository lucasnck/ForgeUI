"use client";

import { useComboboxContext } from "../../../internal/combobox/ComboboxContext";
import type { ComboboxFooterProps } from "./ComboboxFooter";

export function useComboboxFooter({ children, className, ...props }: ComboboxFooterProps) {
  const field = useComboboxContext();

  return { field, props, children, className };
}
