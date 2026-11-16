"use client";

import type { ComponentPropsWithRef } from "react";
import { useAccordionBody } from "./useAccordionBody";
import styles from "./AccordionBody.module.css";
export interface AccordionBodyProps extends ComponentPropsWithRef<"div"> {}

export function AccordionBody(input: AccordionBodyProps) {
  const { children, className, props } = useAccordionBody(input);

  return (
    <div {...props} className={[styles.root, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
