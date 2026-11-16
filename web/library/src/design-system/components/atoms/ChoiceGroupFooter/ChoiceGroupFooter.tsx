"use client";

import type { HTMLAttributes } from "react";
import { useChoiceGroupFooter } from "./useChoiceGroupFooter";
import styles from "./ChoiceGroupFooter.module.css";

export interface ChoiceGroupFooterProps extends HTMLAttributes<HTMLDivElement> {}

export function ChoiceGroupFooter(props: ChoiceGroupFooterProps) {
  const { context, children, className, nativeProps } = useChoiceGroupFooter(props);

  return (
    <div
      {...nativeProps}
      id={context.footerId}
      className={[styles.root, className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}
