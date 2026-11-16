"use client";
import styles from "./ModalBody.module.css";
import type { ComponentPropsWithRef } from "react";
export interface ModalBodyProps extends ComponentPropsWithRef<"div"> {}
import { useModalBody } from "./useModalBody";

export function ModalBody(props: ModalBodyProps) {
  const view = useModalBody(props);

  return (
    <div {...view.props} className={[styles.root, view.props.className].filter(Boolean).join(" ")}>
      {view.children}
    </div>
  );
}
