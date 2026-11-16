"use client";
import type { ComponentPropsWithRef } from "react";
import { useMenuBody } from "./useMenuBody";
import styles from "./MenuBody.module.css";
export interface MenuBodyProps extends ComponentPropsWithRef<"ul"> {}

export function MenuBody(input: MenuBodyProps) {
  const { props, className, bodyRef, label, fallback, handleKeyDown } = useMenuBody(input);

  return (
    <ul
      {...props}
      ref={bodyRef}
      role="menu"
      aria-label={label}
      tabIndex={fallback ? 0 : undefined}
      className={[styles.root, className].filter(Boolean).join(" ")}
      onKeyDown={handleKeyDown}
    />
  );
}
