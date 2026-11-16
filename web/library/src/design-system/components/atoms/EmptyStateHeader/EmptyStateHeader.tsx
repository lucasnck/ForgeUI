"use client";

import type { ComponentPropsWithRef } from "react";
import { useEmptyStateHeader } from "./useEmptyStateHeader";
import styles from "./EmptyStateHeader.module.css";

export interface EmptyStateHeaderProps extends ComponentPropsWithRef<"header"> {}

export function EmptyStateHeader(props: EmptyStateHeaderProps) {
  const view = useEmptyStateHeader(props);

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
