"use client";

import type { HTMLAttributes } from "react";
import { useComboboxFooter } from "./useComboboxFooter";
import styles from "./ComboboxFooter.module.css";

export interface ComboboxFooterProps extends HTMLAttributes<HTMLDivElement> {}

export function ComboboxFooter(input: ComboboxFooterProps) {
  const { field, children, props, className } = useComboboxFooter(input);

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
