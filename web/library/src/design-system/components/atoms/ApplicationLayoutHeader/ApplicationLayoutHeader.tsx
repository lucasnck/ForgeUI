import type { ComponentPropsWithRef } from "react";
import styles from "./ApplicationLayoutHeader.module.css";

export interface ApplicationLayoutHeaderProps extends ComponentPropsWithRef<"header"> {}

export function ApplicationLayoutHeader({
  children,
  className,
  ...props
}: ApplicationLayoutHeaderProps) {
  return (
    <header {...props} className={[styles.root, className].filter(Boolean).join(" ")}>
      {children}
    </header>
  );
}
