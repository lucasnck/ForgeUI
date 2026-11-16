import type { ComponentPropsWithRef } from "react";
import styles from "./ApplicationLayoutBody.module.css";

export interface ApplicationLayoutBodyProps extends ComponentPropsWithRef<"main"> {}

export function ApplicationLayoutBody({
  children,
  className,
  ...props
}: ApplicationLayoutBodyProps) {
  return (
    <main {...props} className={[styles.root, className].filter(Boolean).join(" ")}>
      {children}
    </main>
  );
}
