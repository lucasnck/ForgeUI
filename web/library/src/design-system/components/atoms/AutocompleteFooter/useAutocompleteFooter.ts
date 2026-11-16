"use client";

import { useAutocompleteContext } from "../../../internal/autocomplete/AutocompleteContext";
import type { AutocompleteFooterProps } from "./AutocompleteFooter";

export function useAutocompleteFooter({ children, className, ...props }: AutocompleteFooterProps) {
  const field = useAutocompleteContext();

  return { field, props, children, className };
}
