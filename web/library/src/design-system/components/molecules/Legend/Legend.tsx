import type { HTMLAttributes } from "react";
import styles from "./Legend.module.css";

export interface LegendProps extends HTMLAttributes<HTMLLegendElement> {}

export function Legend({ children, className, ...props }: LegendProps) {
  return (
    <legend {...props} className={[styles.root, className].filter(Boolean).join(" ")}>
      {children}
    </legend>
  );
}
