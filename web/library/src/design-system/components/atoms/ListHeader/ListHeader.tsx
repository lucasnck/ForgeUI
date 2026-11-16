"use client";

import type { ComponentPropsWithRef } from "react";
import { useListHeader } from "./useListHeader";
import styles from "./ListHeader.module.css";

export interface ListHeaderProps extends ComponentPropsWithRef<"header"> {}

export function ListHeader(props: ListHeaderProps) {
  const view = useListHeader(props);

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
