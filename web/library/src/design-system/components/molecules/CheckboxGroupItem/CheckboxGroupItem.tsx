"use client";

import type { LabelHTMLAttributes } from "react";
import { Checkbox } from "../../atoms/Checkbox";
import { useCheckboxGroupItem } from "./useCheckboxGroupItem";
import styles from "./CheckboxGroupItem.module.css";

export interface CheckboxGroupItemProps extends LabelHTMLAttributes<HTMLLabelElement> {
  value: string;
  label: string;
  disabled?: boolean;
}

export function CheckboxGroupItem(input: CheckboxGroupItemProps) {
  const {
    group,
    choice,
    props,
    label,
    value,
    disabled,
    inputId,
    describedBy,
    className,
    onChange,
    readOnly,
  } = useCheckboxGroupItem(input);

  return (
    <div className={styles.root}>
      <Checkbox
        id={inputId}
        name={group.name}
        value={value}
        checked={group.isChecked(value)}
        disabled={group.disabled || disabled}
        invalid={group.invalid ?? choice.invalid}
        aria-describedby={describedBy}
        data-choice-group={group.id}
        onChange={onChange}
        aria-readonly={readOnly}
      />
      <label {...props} htmlFor={inputId} className={className}>
        {label}
      </label>
    </div>
  );
}
