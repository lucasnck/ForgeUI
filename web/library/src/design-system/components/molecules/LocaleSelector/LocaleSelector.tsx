"use client";

import type { Locale } from "../../../types/preferences";
import type { SelectorProps } from "../../../types/component-capabilities";
import { Select } from "../../atoms/Select";
import { useLocaleSelector } from "./useLocaleSelector";
import styles from "./LocaleSelector.module.css";

export interface LocaleSelectorProps extends SelectorProps<Locale> {}

export function LocaleSelector(props: LocaleSelectorProps) {
  const { value, options, label, disabled, controlId, handleChange, size } =
    useLocaleSelector(props);

  return (
    <label className={styles.root} htmlFor={controlId}>
      <span>{label}</span>
      <Select size={size} id={controlId} value={value} disabled={disabled} onChange={handleChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </label>
  );
}
