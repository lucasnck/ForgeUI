"use client";
import styles from "./ToastHeader.module.css";
import type { ComponentPropsWithRef } from "react";
export interface ToastHeaderProps extends ComponentPropsWithRef<"header"> {}
import { useToastHeader } from "./useToastHeader";

export function ToastHeader(props: ToastHeaderProps) {
  const view = useToastHeader(props);

  return (
    <header
      {...view.props}
      aria-live="off"
      role={undefined}
      className={[styles.root, view.props.className].filter(Boolean).join(" ")}
    >
      {view.children}
    </header>
  );
}
