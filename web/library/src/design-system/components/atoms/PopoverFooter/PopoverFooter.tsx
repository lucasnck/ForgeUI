"use client";
import type { ComponentPropsWithRef } from "react";
import { usePopoverFooter } from "./usePopoverFooter";
import styles from "./PopoverFooter.module.css";
export interface PopoverFooterProps extends ComponentPropsWithRef<"div"> {
  divider?: boolean;
}

export function PopoverFooter(input: PopoverFooterProps) {
  const { className, divider = true, ...props } = usePopoverFooter(input);

  return (
    <div
      {...props}
      data-divider={divider}
      className={[styles.root, className].filter(Boolean).join(" ")}
    />
  );
}
