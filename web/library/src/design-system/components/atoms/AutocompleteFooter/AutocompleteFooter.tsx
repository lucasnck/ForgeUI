"use client";

import type { HTMLAttributes } from "react";
import { useAutocompleteFooter } from "./useAutocompleteFooter";
import styles from "./AutocompleteFooter.module.css";

export interface AutocompleteFooterProps extends HTMLAttributes<HTMLDivElement> {}

export function AutocompleteFooter(input: AutocompleteFooterProps) {
  const { field, children, props, className } = useAutocompleteFooter(input);

  return (
    <div
      {...props}
      id={field.footerId}
      className={[styles.root, className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}
