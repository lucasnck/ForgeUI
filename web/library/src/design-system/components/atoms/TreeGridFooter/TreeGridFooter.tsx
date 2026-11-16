"use client";
import type { ComponentPropsWithRef } from "react";
import { useTreeGridFooter } from "./useTreeGridFooter";
import styles from "./TreeGridFooter.module.css";
export interface TreeGridFooterProps extends ComponentPropsWithRef<"div"> {}

export function TreeGridFooter(props: TreeGridFooterProps) {
  const view = useTreeGridFooter(props);

  return (
    <div {...view.props} className={[styles.root, view.className].filter(Boolean).join(" ")}>
      {view.children}
    </div>
  );
}
