"use client";
import styles from "./ToastFooter.module.css";
import type { ComponentPropsWithRef } from "react";
export interface ToastFooterProps extends ComponentPropsWithRef<"footer"> {}
import { useToastFooter } from "./useToastFooter";

export function ToastFooter(props: ToastFooterProps) {
  const view = useToastFooter(props);

  return (
    <footer
      {...view.props}
      aria-live="off"
      role={undefined}
      className={[styles.root, view.props.className].filter(Boolean).join(" ")}
    >
      {view.children}
    </footer>
  );
}
