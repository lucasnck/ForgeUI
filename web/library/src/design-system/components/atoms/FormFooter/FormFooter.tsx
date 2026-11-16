"use client";

import type { HTMLAttributes } from "react";
import { useFormFooter } from "./useFormFooter";
import styles from "./FormFooter.module.css";

export interface FormFooterProps extends HTMLAttributes<HTMLDivElement> {}

export function FormFooter(input: FormFooterProps) {
  const { context, props, className, children } = useFormFooter(input);

  return (
    <div {...props} className={[styles.root, className].filter(Boolean).join(" ")}>
      {children}
      {context.loading && context.loadingLabel && <span role="status">{context.loadingLabel}</span>}
    </div>
  );
}
