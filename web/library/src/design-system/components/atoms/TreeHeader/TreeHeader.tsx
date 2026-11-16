"use client";
import type { ComponentPropsWithRef } from "react";
import { useTreeHeader } from "./useTreeHeader";
import styles from "./TreeHeader.module.css";
export interface TreeHeaderProps extends ComponentPropsWithRef<"div"> {}

export function TreeHeader(input: TreeHeaderProps) {
  const { className, ...props } = useTreeHeader(input);

  return <div {...props} className={[styles.root, className].filter(Boolean).join(" ")} />;
}
