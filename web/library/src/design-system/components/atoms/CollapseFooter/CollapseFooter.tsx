"use client";
import type { ComponentPropsWithRef } from "react";
import { useCollapseFooter } from "./useCollapseFooter";
import styles from "./CollapseFooter.module.css";
export interface CollapseFooterProps extends ComponentPropsWithRef<"div"> {}

export function CollapseFooter(input: CollapseFooterProps) {
  const { children, className, props } = useCollapseFooter(input);

  return (
    <div {...props} className={[styles.root, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
