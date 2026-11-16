"use client";

import type { ComponentPropsWithRef } from "react";
import { useAlertBody } from "./useAlertBody";
import styles from "./AlertBody.module.css";

export interface AlertBodyProps extends ComponentPropsWithRef<"div"> {}

export function AlertBody(props: AlertBodyProps) {
  const view = useAlertBody(props);

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
