"use client";

import type { ComponentPropsWithRef } from "react";
import { useStepperFooter } from "./useStepperFooter";
import styles from "./StepperFooter.module.css";

export interface StepperFooterProps extends ComponentPropsWithRef<"div"> {}

export function StepperFooter(input: StepperFooterProps) {
  const { props, children, className } = useStepperFooter(input);

  return (
    <div {...props} className={[styles.root, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
