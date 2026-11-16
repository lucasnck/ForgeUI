"use client";

import type { ComponentPropsWithRef } from "react";
import { useErrorStateHeader } from "./useErrorStateHeader";
import styles from "./ErrorStateHeader.module.css";

export interface ErrorStateHeaderProps extends ComponentPropsWithRef<"header"> {}

export function ErrorStateHeader(props: ErrorStateHeaderProps) {
  const view = useErrorStateHeader(props);

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
