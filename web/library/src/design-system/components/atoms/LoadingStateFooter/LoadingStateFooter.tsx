"use client";

import type { ComponentPropsWithRef } from "react";
import { useLoadingStateFooter } from "./useLoadingStateFooter";
import styles from "./LoadingStateFooter.module.css";

export interface LoadingStateFooterProps extends ComponentPropsWithRef<"footer"> {}

export function LoadingStateFooter(props: LoadingStateFooterProps) {
  const view = useLoadingStateFooter(props);

  return (
    <footer {...view.props} className={[styles.root, view.className].filter(Boolean).join(" ")}>
      {view.children}
    </footer>
  );
}
