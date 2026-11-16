"use client";
import styles from "./ModalFooter.module.css";
import type { ComponentPropsWithRef } from "react";
export interface ModalFooterProps extends ComponentPropsWithRef<"div"> {
  divider?: boolean;
}
import { useModalFooter } from "./useModalFooter";

export function ModalFooter(props: ModalFooterProps) {
  const view = useModalFooter(props);

  return (
    <div
      {...view.props}
      className={[styles.root, view.props.className].filter(Boolean).join(" ")}
      data-divider={view.divider}
    >
      {view.children}
    </div>
  );
}
