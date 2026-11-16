"use client";
import styles from "./ToastBody.module.css";
import type { ComponentPropsWithRef } from "react";
export interface ToastBodyProps extends ComponentPropsWithRef<"div"> {}
import { useToastBody } from "./useToastBody";

export function ToastBody(props: ToastBodyProps) {
  const view = useToastBody(props);

  return (
    <div
      {...view.props}
      aria-live="off"
      role={undefined}
      className={[styles.root, view.props.className].filter(Boolean).join(" ")}
    >
      {view.children}
    </div>
  );
}
