import type { ComponentPropsWithRef } from "react";
import styles from "./Option.module.css";
export interface OptionProps extends ComponentPropsWithRef<"option"> {
  value: string;
}

export function Option({ children, className, ...props }: OptionProps) {
  return (
    <option {...props} className={[styles.root, className].filter(Boolean).join(" ")}>
      {children}
    </option>
  );
}
