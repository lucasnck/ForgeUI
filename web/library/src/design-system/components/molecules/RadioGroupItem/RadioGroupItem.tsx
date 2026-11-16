"use client";

import type { LabelHTMLAttributes } from "react";
import { Radio } from "../../atoms/Radio";
import { useRadioGroupItem } from "./useRadioGroupItem";
import styles from "./RadioGroupItem.module.css";

export interface RadioGroupItemProps extends LabelHTMLAttributes<HTMLLabelElement> {
  value: string;
  label: string;
  disabled?: boolean;
}

export function RadioGroupItem(input: RadioGroupItemProps) {
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
  } = useRadioGroupItem(input);

  return (
    <label
      {...props}
      htmlFor={inputId}
      className={[styles.root, className].filter(Boolean).join(" ")}
    >
      <Radio
        id={inputId}
        name={group.name}
        value={value}
        checked={group.isChecked(value)}
        disabled={group.disabled || disabled}
        invalid={group.invalid ?? choice.invalid}
        aria-describedby={describedBy}
        data-choice-group={group.id}
        onChange={onChange}
      />
      {label}
    </label>
  );
}
