"use client";
import type { ComponentPropsWithRef } from "react";
import { useTabsHeader } from "./useTabsHeader";
import styles from "./TabsHeader.module.css";
export interface TabsHeaderProps extends ComponentPropsWithRef<"div"> {}

export function TabsHeader(input: TabsHeaderProps) {
  const { props, className, label, headerRef, fallback, handleKeyDown } = useTabsHeader(input);

  return (
    <div
      {...props}
      ref={headerRef}
      role="tablist"
      aria-label={label}
      tabIndex={fallback ? 0 : undefined}
      onKeyDown={handleKeyDown}
      className={[styles.root, className].filter(Boolean).join(" ")}
    />
  );
}
