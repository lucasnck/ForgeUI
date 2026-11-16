"use client";

import type { ComponentPropsWithRef } from "react";
import { FieldHint } from "../../atoms/FieldHint";
import { FieldError } from "../../atoms/FieldError";
import { useFormFieldFooter } from "./useFormFieldFooter";
import styles from "./FormFieldFooter.module.css";

export interface FormFieldFooterProps extends ComponentPropsWithRef<"div"> {
  hint?: string;
  error?: string;
}

export function FormFieldFooter(props: FormFieldFooterProps) {
  const {
    context,
    props: footerProps,
    className,
    hint,
    error,
    children,
    visible,
  } = useFormFieldFooter(props);
  if (!visible) return null;
  return (
    <div
      {...footerProps}
      className={[styles.root, className].filter(Boolean).join(" ")}
      role={undefined}
      aria-live={undefined}
      aria-atomic={undefined}
    >
      {hint && <FieldHint id={context.hintId}>{hint}</FieldHint>}
      {error && <FieldError id={context.errorId}>{error}</FieldError>}
      {children}
    </div>
  );
}
