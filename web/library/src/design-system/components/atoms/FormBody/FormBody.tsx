"use client";

import type { HTMLAttributes } from "react";
import { useFormBody } from "./useFormBody";
import styles from "./FormBody.module.css";

export interface FormBodyProps extends HTMLAttributes<HTMLDivElement> {}

export function FormBody(input: FormBodyProps) {
  const { context, props, className, children } = useFormBody(input);

  return (
    <div
      {...props}
      aria-busy={context.loading || undefined}
      className={[styles.root, className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}
