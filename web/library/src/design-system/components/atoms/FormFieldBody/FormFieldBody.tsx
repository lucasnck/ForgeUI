"use client";

import { cloneElement } from "react";
import type { ComponentPropsWithRef } from "react";
import { useFormFieldBody } from "./useFormFieldBody";
import styles from "./FormFieldBody.module.css";

export interface FormFieldBodyProps extends ComponentPropsWithRef<"div"> {}

export function FormFieldBody(props: FormFieldBodyProps) {
  const { props: bodyProps, className, control, attributes } = useFormFieldBody(props);

  return (
    <div {...bodyProps} className={[styles.root, className].filter(Boolean).join(" ")}>
      {cloneElement(control, attributes)}
    </div>
  );
}
