"use client";
import type { ComponentPropsWithRef } from "react";
import { useMenuFooter } from "./useMenuFooter";
import styles from "./MenuFooter.module.css";
export interface MenuFooterProps extends ComponentPropsWithRef<"div"> {}

export function MenuFooter(input: MenuFooterProps) {
  const { className, ...props } = useMenuFooter(input);

  return <div {...props} className={[styles.root, className].filter(Boolean).join(" ")} />;
}
