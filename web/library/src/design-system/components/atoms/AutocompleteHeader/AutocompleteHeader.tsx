"use client";

import type { LabelHTMLAttributes } from "react";
import { useAutocompleteHeader } from "./useAutocompleteHeader";
import styles from "./AutocompleteHeader.module.css";

export interface AutocompleteHeaderProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export function AutocompleteHeader(input: AutocompleteHeaderProps) {
  const { field, children, props, className } = useAutocompleteHeader(input);

  return (
    <label
      {...props}
      htmlFor={field.inputId}
      className={[styles.root, className].filter(Boolean).join(" ")}
    >
      {children}
    </label>
  );
}
