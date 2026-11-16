"use client";
import type { ComponentPropsWithRef } from "react";
import { useMenuHeader } from "./useMenuHeader";
import styles from "./MenuHeader.module.css";
export interface MenuHeaderProps extends ComponentPropsWithRef<"div"> {}

export function MenuHeader(input: MenuHeaderProps) {
  const { className, ...props } = useMenuHeader(input);

  return <div {...props} className={[styles.root, className].filter(Boolean).join(" ")} />;
}
