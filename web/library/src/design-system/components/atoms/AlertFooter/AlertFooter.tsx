"use client";

import type { ComponentPropsWithRef } from "react";
import { useAlertFooter } from "./useAlertFooter";
import styles from "./AlertFooter.module.css";

export interface AlertFooterProps extends ComponentPropsWithRef<"footer"> {}

export function AlertFooter(props: AlertFooterProps) {
  const view = useAlertFooter(props);

  return (
    <footer {...view.props} className={[styles.root, view.className].filter(Boolean).join(" ")}>
      {view.children}
    </footer>
  );
}
