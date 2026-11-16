"use client";

import type { ComponentPropsWithRef } from "react";
import { collectStepperChildren } from "../../../internal/stepper/collectStepperChildren";
import { StepperPanel } from "../StepperPanel";
import { useStepperBody } from "./useStepperBody";
import styles from "./StepperBody.module.css";

export interface StepperBodyProps extends ComponentPropsWithRef<"div"> {}

export function StepperBody(input: StepperBodyProps) {
  const { props, children, className } = useStepperBody(input);
  collectStepperChildren(children, StepperPanel, "StepperBody");
  return (
    <div {...props} className={[styles.root, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
