"use client";
import type { ComponentPropsWithRef } from "react";
import { useTabsBody } from "./useTabsBody";
import styles from "./TabsBody.module.css";
export interface TabsBodyProps extends ComponentPropsWithRef<"div"> {}

export function TabsBody(input: TabsBodyProps) {
  const { props, className } = useTabsBody(input);

  return <div {...props} className={[styles.root, className].filter(Boolean).join(" ")} />;
}
