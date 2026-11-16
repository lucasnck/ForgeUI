"use client";

import type { ChoiceOption } from "../../../types/selection-navigation";
import { useAutocompleteContext } from "../../../internal/autocomplete/AutocompleteContext";
import type { AutocompleteBodyProps } from "./AutocompleteBody";

export function useAutocompleteBody({ children, className, ...props }: AutocompleteBodyProps) {
  const field = useAutocompleteContext();

  function getOptionLabel(option: ChoiceOption) {
    return option.label;
  }

  return { field, children, className, props, getOptionLabel };
}
