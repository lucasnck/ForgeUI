import type { ComponentPropsWithRef } from "react";
import styles from "./ApplicationLayoutFooter.module.css";

export interface ApplicationLayoutFooterProps extends ComponentPropsWithRef<"footer"> {}

export function ApplicationLayoutFooter({
  children,
  className,
  ...props
}: ApplicationLayoutFooterProps) {
  return (
    <footer {...props} className={[styles.root, className].filter(Boolean).join(" ")}>
      {children}
    </footer>
  );
}
