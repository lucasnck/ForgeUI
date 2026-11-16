"use client";
import type { NativeWidgetItemProps, VisualProps } from "../../../types";
import { useListBoxItem } from "./useListBoxItem";
import styles from "./ListBoxItem.module.css";
export interface ListBoxItemProps extends NativeWidgetItemProps, VisualProps {
  value: string;
  label: string;
  disabled?: boolean;
}

export function ListBoxItem(input: ListBoxItemProps) {
  const {
    size,
    tone,
    appearance,
    shape,
    props,
    itemRef,
    label,
    className,
    blocked,
    selected,
    tabIndex,
    animated,
    handleFocus,
    handleKeyDown,
    handleClick,
  } = useListBoxItem(input);

  return (
    <li
      {...props}
      data-size={size}
      data-tone={tone}
      data-appearance={appearance}
      data-shape={shape}
      ref={itemRef}
      role="option"
      aria-selected={selected}
      aria-disabled={blocked || undefined}
      tabIndex={tabIndex}
      data-selected={selected || undefined}
      data-animated={animated}
      className={[styles.root, className].filter(Boolean).join(" ")}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
    >
      {label}
    </li>
  );
}
