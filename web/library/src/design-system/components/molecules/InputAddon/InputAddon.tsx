import type { HTMLAttributes } from "react";
import styles from "./InputAddon.module.css";

export interface InputAddonProps extends HTMLAttributes<HTMLSpanElement> {}

export function InputAddon({ children, className, ...props }: InputAddonProps) {
  return (
    <span {...props} className={[styles.root, className].filter(Boolean).join(" ")}>
      {children}
    </span>
  );
}
