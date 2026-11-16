import type { HTMLAttributes, RefAttributes } from "react";
import styles from "./Divider.module.css";

export interface DividerProps extends HTMLAttributes<HTMLHRElement>, RefAttributes<HTMLHRElement> {}

export function Divider({ className, ...props }: DividerProps) {
  return <hr {...props} className={[styles.root, className].filter(Boolean).join(" ")} />;
}
