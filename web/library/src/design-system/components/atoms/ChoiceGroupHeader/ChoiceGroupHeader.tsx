"use client";

import type { HTMLAttributes } from "react";
import { useChoiceGroupHeader } from "./useChoiceGroupHeader";
import styles from "./ChoiceGroupHeader.module.css";

export interface ChoiceGroupHeaderProps extends HTMLAttributes<HTMLLegendElement> {}

export function ChoiceGroupHeader(props: ChoiceGroupHeaderProps) {
  const { context, children, className, nativeProps } = useChoiceGroupHeader(props);

  return (
    <legend
      {...nativeProps}
      id={context.legendId}
      className={[styles.root, className].filter(Boolean).join(" ")}
    >
      {children}
    </legend>
  );
}
