"use client";
import type { ComponentPropsWithRef } from "react";
import { ListBoxItem } from "../../atoms/ListBoxItem";
import { useListBoxBody } from "./useListBoxBody";
import styles from "./ListBoxBody.module.css";
export interface ListBoxBodyProps extends ComponentPropsWithRef<"ul"> {}

export function ListBoxBody(input: ListBoxBodyProps) {
  const {
    props,
    className,
    bodyRef,
    options,
    id,
    label,
    describedBy,
    multiple,
    invalid,
    fallback,
  } = useListBoxBody(input);

  return (
    <ul
      {...props}
      ref={bodyRef}
      id={id}
      role="listbox"
      aria-label={label}
      aria-describedby={describedBy}
      aria-multiselectable={multiple || undefined}
      aria-invalid={invalid}
      tabIndex={fallback ? 0 : undefined}
      className={[styles.root, className].filter(Boolean).join(" ")}
    >
      {options.map((option) => (
        <ListBoxItem
          key={option.value}
          value={option.value}
          label={option.label}
          disabled={option.disabled}
          size={option.size}
          tone={option.tone}
          appearance={option.appearance}
          shape={option.shape}
        />
      ))}
    </ul>
  );
}
