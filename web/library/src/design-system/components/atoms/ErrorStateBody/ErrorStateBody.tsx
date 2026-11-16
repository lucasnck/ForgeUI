"use client";

import type { ComponentPropsWithRef } from "react";
import { useErrorStateBody } from "./useErrorStateBody";
import styles from "./ErrorStateBody.module.css";

export interface ErrorStateBodyProps extends ComponentPropsWithRef<"div"> {}

export function ErrorStateBody(props: ErrorStateBodyProps) {
  const view = useErrorStateBody(props);

  return (
    <div
      {...view.props}
      className={[styles.root, view.className].filter(Boolean).join(" ")}
      role={view.role}
      aria-live={view.context.announcement}
      aria-atomic={view.role ? true : undefined}
      aria-labelledby={view.context.titleId}
    >
      {view.children}
    </div>
  );
}
