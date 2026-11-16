"use client";

import type { ComponentPropsWithRef } from "react";
import { Label } from "../Label";
import { useFormFieldHeader } from "./useFormFieldHeader";
import styles from "./FormFieldHeader.module.css";

export interface FormFieldHeaderProps extends ComponentPropsWithRef<"label"> {}

export function FormFieldHeader(props: FormFieldHeaderProps) {
  const { context, props: labelProps, children, className } = useFormFieldHeader(props);

  return (
    <Label
      {...labelProps}
      htmlFor={context.controlId}
      className={[styles.root, className].filter(Boolean).join(" ")}
    >
      {children}
    </Label>
  );
}
