"use client";

import type { ComponentPropsWithRef } from "react";
import { useCardHeader } from "./useCardHeader";
import styles from "./CardHeader.module.css";

export interface CardHeaderProps extends ComponentPropsWithRef<"header"> {}

export function CardHeader(props: CardHeaderProps) {
  const view = useCardHeader(props);

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
