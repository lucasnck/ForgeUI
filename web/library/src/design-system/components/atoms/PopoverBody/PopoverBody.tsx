"use client";
import type { ComponentPropsWithRef } from "react";
import { usePopoverBody } from "./usePopoverBody";
import styles from "./PopoverBody.module.css";
export interface PopoverBodyProps extends ComponentPropsWithRef<"div"> {}

export function PopoverBody(input: PopoverBodyProps) {
  const { className, ...props } = usePopoverBody(input);

  return <div {...props} className={[styles.root, className].filter(Boolean).join(" ")} />;
}
