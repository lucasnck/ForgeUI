"use client";

import type { ComponentPropsWithRef } from "react";
import { useNavigationMenuFooter } from "./useNavigationMenuFooter";
import styles from "./NavigationMenuFooter.module.css";

export interface NavigationMenuFooterProps extends ComponentPropsWithRef<"footer"> {}

export function NavigationMenuFooter(input: NavigationMenuFooterProps) {
  const { props, children, className } = useNavigationMenuFooter(input);

  return (
    <footer {...props} className={[styles.root, className].filter(Boolean).join(" ")}>
      {children}
    </footer>
  );
}
