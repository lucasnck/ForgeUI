"use client";

import type { ComponentPropsWithRef } from "react";
import { useStepperPanel } from "./useStepperPanel";
import styles from "./StepperPanel.module.css";

export interface StepperPanelProps extends ComponentPropsWithRef<"div"> {
  value: string;
}

export function StepperPanel(input: StepperPanelProps) {
  const { props, children, className, panelRef, hidden, id, labelId, handleFocus, handleBlur } =
    useStepperPanel(input);

  return (
    <div
      {...props}
      ref={panelRef}
      id={id}
      aria-labelledby={labelId}
      hidden={hidden}
      onFocusCapture={handleFocus}
      onBlurCapture={handleBlur}
      className={[styles.root, className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}
