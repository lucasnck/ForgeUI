"use client";

import type { ComponentPropsWithRef } from "react";
import { useListFooter } from "./useListFooter";
import styles from "./ListFooter.module.css";

export interface ListFooterProps extends ComponentPropsWithRef<"footer"> {}

export function ListFooter(props: ListFooterProps) {
  const view = useListFooter(props);

  return (
    <footer {...view.props} className={[styles.root, view.className].filter(Boolean).join(" ")}>
      {view.children}
    </footer>
  );
}
