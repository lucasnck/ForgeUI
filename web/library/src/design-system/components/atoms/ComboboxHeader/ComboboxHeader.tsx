"use client";

import type { LabelHTMLAttributes } from "react";
import { useComboboxHeader } from "./useComboboxHeader";
import styles from "./ComboboxHeader.module.css";

export interface ComboboxHeaderProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export function ComboboxHeader(input: ComboboxHeaderProps) {
  const { field, children, props, className } = useComboboxHeader(input);

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
