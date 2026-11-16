"use client";
import type { NativeCompoundTriggerProps } from "../../../types";
import { useCollapseHeader } from "./useCollapseHeader";
import styles from "./CollapseHeader.module.css";
export interface CollapseHeaderProps extends NativeCompoundTriggerProps {}

export function CollapseHeader(input: CollapseHeaderProps) {
  const { animated, children, className, props, triggerProps, handleClick, ref } =
    useCollapseHeader(input);

  return (
    <button
      {...props}
      {...triggerProps}
      ref={ref}
      type="button"
      data-animated={animated}
      onClick={handleClick}
      className={[styles.root, className].filter(Boolean).join(" ")}
    >
      {children}
    </button>
  );
}
