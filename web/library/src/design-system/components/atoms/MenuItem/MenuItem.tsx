"use client";
import type { NativeCollectionItemProps } from "../../../types";
import { Button } from "../Button";
import { useMenuItem } from "./useMenuItem";
import styles from "./MenuItem.module.css";
export interface MenuItemProps extends NativeCollectionItemProps {
  value: string;
  label: string;
  disabled?: boolean;
}

export function MenuItem(input: MenuItemProps) {
  const {
    props,
    className,
    label,
    disabled,
    itemRef,
    tabIndex,
    animated,
    handleFocus,
    handleClick,
  } = useMenuItem(input);

  return (
    <li
      {...props}
      role="none"
      className={[styles.root, className].filter(Boolean).join(" ")}
      onFocus={handleFocus}
      onClick={handleClick}
    >
      <Button
        ref={itemRef}
        type="button"
        role="menuitem"
        tone="neutral"
        appearance="ghost"
        disabled={disabled}
        tabIndex={tabIndex}
        data-animated={animated}
      >
        {label}
      </Button>
    </li>
  );
}
