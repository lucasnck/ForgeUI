"use client";

import type { ComponentPropsWithRef } from "react";
import { useNavigationMenuHeader } from "./useNavigationMenuHeader";
import styles from "./NavigationMenuHeader.module.css";

export interface NavigationMenuHeaderProps extends ComponentPropsWithRef<"header"> {}

export function NavigationMenuHeader(input: NavigationMenuHeaderProps) {
  const { props, children, className } = useNavigationMenuHeader(input);

  return (
    <header {...props} className={[styles.root, className].filter(Boolean).join(" ")}>
      {children}
    </header>
  );
}
