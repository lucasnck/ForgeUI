"use client";

import type { ComponentPropsWithRef } from "react";
import { useLoadingStateHeader } from "./useLoadingStateHeader";
import styles from "./LoadingStateHeader.module.css";

export interface LoadingStateHeaderProps extends ComponentPropsWithRef<"header"> {}

export function LoadingStateHeader(props: LoadingStateHeaderProps) {
  const view = useLoadingStateHeader(props);

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
