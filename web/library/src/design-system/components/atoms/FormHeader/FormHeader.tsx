"use client";

import type { HTMLAttributes } from "react";
import { useFormHeader } from "./useFormHeader";
import styles from "./FormHeader.module.css";

export interface FormHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export function FormHeader(input: FormHeaderProps) {
  const { props, className, children } = useFormHeader(input);

  return (
    <div {...props} className={[styles.root, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
