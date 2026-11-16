"use client";
import type { ComponentPropsWithRef } from "react";
import { useTabPanel } from "./useTabPanel";
import styles from "./TabPanel.module.css";
export interface TabPanelProps extends ComponentPropsWithRef<"div"> {
  value: string;
}

export function TabPanel(input: TabPanelProps) {
  const { props, className, hidden, id, labelId, handleFocus, handleBlur } = useTabPanel(input);

  return (
    <div
      {...props}
      role="tabpanel"
      id={id}
      aria-labelledby={labelId}
      hidden={hidden}
      className={[styles.root, className].filter(Boolean).join(" ")}
      onFocusCapture={handleFocus}
      onBlurCapture={handleBlur}
    />
  );
}
