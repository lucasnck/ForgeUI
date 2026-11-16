"use client";
import type { ComponentPropsWithRef } from "react";
import { useTabsFooter } from "./useTabsFooter";
import styles from "./TabsFooter.module.css";
export interface TabsFooterProps extends ComponentPropsWithRef<"div"> {}

export function TabsFooter(input: TabsFooterProps) {
  const { props, className } = useTabsFooter(input);

  return <div {...props} className={[styles.root, className].filter(Boolean).join(" ")} />;
}
