"use client";
import type { ComponentPropsWithRef } from "react";
import { useTreeFooter } from "./useTreeFooter";
import styles from "./TreeFooter.module.css";
export interface TreeFooterProps extends ComponentPropsWithRef<"div"> {}

export function TreeFooter(input: TreeFooterProps) {
  const { className, ...props } = useTreeFooter(input);

  return <div {...props} className={[styles.root, className].filter(Boolean).join(" ")} />;
}
