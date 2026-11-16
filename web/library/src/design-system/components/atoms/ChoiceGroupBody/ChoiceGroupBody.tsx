"use client";

import type { HTMLAttributes } from "react";
import { useChoiceGroupBody } from "./useChoiceGroupBody";
import styles from "./ChoiceGroupBody.module.css";

export interface ChoiceGroupBodyProps extends HTMLAttributes<HTMLDivElement> {}

export function ChoiceGroupBody(props: ChoiceGroupBodyProps) {
  const { children, className, nativeProps } = useChoiceGroupBody(props);

  return (
    <div {...nativeProps} className={[styles.root, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
