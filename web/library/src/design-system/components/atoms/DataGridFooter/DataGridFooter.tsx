"use client";
import type { ComponentPropsWithRef } from "react";
export interface DataGridFooterProps extends ComponentPropsWithRef<"footer"> {}
import { useDataGridFooter } from "./useDataGridFooter";
import styles from "./DataGridFooter.module.css";

export function DataGridFooter(props: DataGridFooterProps) {
  const view = useDataGridFooter(props);

  return (
    <footer {...view.props} className={[styles.root, view.className].filter(Boolean).join(" ")}>
      {view.children}
    </footer>
  );
}
