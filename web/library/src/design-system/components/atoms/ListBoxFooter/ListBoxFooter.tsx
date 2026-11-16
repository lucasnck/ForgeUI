"use client";
import type { ComponentPropsWithRef } from "react";
import { useListBoxFooter } from "./useListBoxFooter";
import styles from "./ListBoxFooter.module.css";
export interface ListBoxFooterProps extends ComponentPropsWithRef<"div"> {}

export function ListBoxFooter(input: ListBoxFooterProps) {
  const { className, ...props } = useListBoxFooter(input);

  return <div {...props} className={[styles.root, className].filter(Boolean).join(" ")} />;
}
