import type { HTMLAttributes } from "react";
import styles from "./VisuallyHidden.module.css";

export interface VisuallyHiddenProps extends HTMLAttributes<HTMLSpanElement> {}

export function VisuallyHidden({ className, ...props }: VisuallyHiddenProps) {
  return <span {...props} className={[styles.root, className].filter(Boolean).join(" ")} />;
}
