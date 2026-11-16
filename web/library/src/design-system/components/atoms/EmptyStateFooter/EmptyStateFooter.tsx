"use client";

import type { ComponentPropsWithRef } from "react";
import { useEmptyStateFooter } from "./useEmptyStateFooter";
import styles from "./EmptyStateFooter.module.css";

export interface EmptyStateFooterProps extends ComponentPropsWithRef<"footer"> {}

export function EmptyStateFooter(props: EmptyStateFooterProps) {
  const view = useEmptyStateFooter(props);

  return (
    <footer {...view.props} className={[styles.root, view.className].filter(Boolean).join(" ")}>
      {view.children}
    </footer>
  );
}
