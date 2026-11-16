"use client";

import type { ComponentPropsWithRef } from "react";
import { useEmptyStateBody } from "./useEmptyStateBody";
import styles from "./EmptyStateBody.module.css";

export interface EmptyStateBodyProps extends ComponentPropsWithRef<"div"> {}

export function EmptyStateBody(props: EmptyStateBodyProps) {
  const view = useEmptyStateBody(props);

  return (
    <div {...view.props} className={[styles.root, view.className].filter(Boolean).join(" ")}>
      {view.children}
    </div>
  );
}
