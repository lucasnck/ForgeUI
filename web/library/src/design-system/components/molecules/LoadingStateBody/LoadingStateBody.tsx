"use client";

import type { ComponentPropsWithRef } from "react";
import { Spinner } from "../../atoms/Spinner";
import { useLoadingStateBody } from "./useLoadingStateBody";
import styles from "./LoadingStateBody.module.css";

export interface LoadingStateBodyProps extends ComponentPropsWithRef<"div"> {}

export function LoadingStateBody(props: LoadingStateBodyProps) {
  const view = useLoadingStateBody(props);

  return (
    <div
      {...view.props}
      className={[styles.root, view.className].filter(Boolean).join(" ")}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-busy={undefined}
    >
      <Spinner decorative />
      <span>{view.context.label}</span>
      {view.children != null && <div className={styles.content}>{view.children}</div>}
    </div>
  );
}
