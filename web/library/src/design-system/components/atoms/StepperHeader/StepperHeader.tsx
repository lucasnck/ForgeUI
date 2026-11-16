"use client";

import type { ComponentPropsWithRef } from "react";
import { collectStepperChildren } from "../../../internal/stepper/collectStepperChildren";
import { StepperItem } from "../../molecules/StepperItem";
import { useStepperHeader } from "./useStepperHeader";
import styles from "./StepperHeader.module.css";

export interface StepperHeaderProps extends ComponentPropsWithRef<"nav"> {}

export function StepperHeader(input: StepperHeaderProps) {
  const { props, children, className, label, navigationRef } = useStepperHeader(input);
  collectStepperChildren(children, StepperItem, "StepperHeader");
  return (
    <nav
      {...props}
      role={undefined}
      className={[styles.root, className].filter(Boolean).join(" ")}
      aria-label={label}
      ref={navigationRef}
      tabIndex={-1}
    >
      <ol className={styles.list}>{children}</ol>
    </nav>
  );
}
