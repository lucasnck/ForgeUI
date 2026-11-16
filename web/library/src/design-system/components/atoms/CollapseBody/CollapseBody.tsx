"use client";
import type { ComponentPropsWithRef } from "react";
import { useCollapseBody } from "./useCollapseBody";
import styles from "./CollapseBody.module.css";
export interface CollapseBodyProps extends ComponentPropsWithRef<"div"> {}

export function CollapseBody(input: CollapseBodyProps) {
  const { children, className, props } = useCollapseBody(input);

  return (
    <div {...props} className={[styles.root, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
