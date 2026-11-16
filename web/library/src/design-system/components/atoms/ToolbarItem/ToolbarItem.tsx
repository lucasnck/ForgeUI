"use client";

import type { NativeActionButtonProps } from "../../../types/collection-contracts";
import type { ComponentAnimatedProps } from "../../../types/animation";
import { Button } from "../Button";
import { useToolbarItem } from "./useToolbarItem";
import styles from "./ToolbarItem.module.css";

export interface ToolbarItemProps extends NativeActionButtonProps, ComponentAnimatedProps {
  itemKey: string;
}

export function ToolbarItem(input: ToolbarItemProps) {
  const { tabIndex, buttonRef, disabled, children, className, animated, props, handleFocus } =
    useToolbarItem(input);

  return (
    <Button
      {...props}
      ref={buttonRef}
      type="button"
      disabled={disabled}
      tabIndex={tabIndex}
      onFocus={handleFocus}
      tone="neutral"
      appearance="ghost"
      data-animated={animated}
      className={[styles.root, className].filter(Boolean).join(" ")}
    >
      {children}
    </Button>
  );
}
