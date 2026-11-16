"use client";

import type { ComponentPropsWithRef } from "react";
import { useCardFooter } from "./useCardFooter";
import styles from "./CardFooter.module.css";

export interface CardFooterProps extends ComponentPropsWithRef<"footer"> {}

export function CardFooter(props: CardFooterProps) {
  const view = useCardFooter(props);

  return (
    <footer {...view.props} className={[styles.root, view.className].filter(Boolean).join(" ")}>
      {view.children}
    </footer>
  );
}
