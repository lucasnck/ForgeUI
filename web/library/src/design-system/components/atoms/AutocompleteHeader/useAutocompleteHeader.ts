"use client";

import { useAutocompleteContext } from "../../../internal/autocomplete/AutocompleteContext";
import type { AutocompleteHeaderProps } from "./AutocompleteHeader";

export function useAutocompleteHeader({ children, className, ...props }: AutocompleteHeaderProps) {
  const field = useAutocompleteContext();

  return { field, props, children, className };
}
