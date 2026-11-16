"use client";

import type { ComponentPropsWithRef } from "react";
import { useErrorStateFooter } from "./useErrorStateFooter";
import styles from "./ErrorStateFooter.module.css";

export interface ErrorStateFooterProps extends ComponentPropsWithRef<"footer"> {}

export function ErrorStateFooter(props: ErrorStateFooterProps) {
  const view = useErrorStateFooter(props);

  return (
    <footer {...view.props} className={[styles.root, view.className].filter(Boolean).join(" ")}>
      {view.children}
    </footer>
  );
}
