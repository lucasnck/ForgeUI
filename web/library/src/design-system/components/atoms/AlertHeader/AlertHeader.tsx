"use client";

import type { ComponentPropsWithRef } from "react";
import { useAlertHeader } from "./useAlertHeader";
import styles from "./AlertHeader.module.css";

export interface AlertHeaderProps extends ComponentPropsWithRef<"header"> {}

export function AlertHeader(props: AlertHeaderProps) {
  const view = useAlertHeader(props);

  return (
    <header
      {...view.props}
      className={[styles.root, view.className].filter(Boolean).join(" ")}
      id={view.context.titleId}
    >
      {view.children}
    </header>
  );
}
