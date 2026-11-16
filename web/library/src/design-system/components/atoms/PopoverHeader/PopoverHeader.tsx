"use client";
import type { ComponentPropsWithRef } from "react";
import { usePopoverHeader } from "./usePopoverHeader";
import styles from "./PopoverHeader.module.css";
export interface PopoverHeaderProps extends ComponentPropsWithRef<"div"> {
  divider?: boolean;
}

export function PopoverHeader(input: PopoverHeaderProps) {
  const { className, divider = true, ...props } = usePopoverHeader(input);

  return (
    <div
      {...props}
      data-divider={divider}
      className={[styles.root, className].filter(Boolean).join(" ")}
    />
  );
}
