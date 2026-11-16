"use client";

import type { ComponentPropsWithRef } from "react";
import { useAccordionFooter } from "./useAccordionFooter";
import styles from "./AccordionFooter.module.css";
export interface AccordionFooterProps extends ComponentPropsWithRef<"div"> {}

export function AccordionFooter(input: AccordionFooterProps) {
  const { children, className, props } = useAccordionFooter(input);

  return (
    <div {...props} className={[styles.root, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
