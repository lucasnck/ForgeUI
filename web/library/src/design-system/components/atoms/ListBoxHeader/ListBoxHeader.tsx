"use client";
import type { ComponentPropsWithRef } from "react";
import { useListBoxHeader } from "./useListBoxHeader";
import styles from "./ListBoxHeader.module.css";
export interface ListBoxHeaderProps extends ComponentPropsWithRef<"div"> {}

export function ListBoxHeader(input: ListBoxHeaderProps) {
  const { className, ...props } = useListBoxHeader(input);

  return <div {...props} className={[styles.root, className].filter(Boolean).join(" ")} />;
}
