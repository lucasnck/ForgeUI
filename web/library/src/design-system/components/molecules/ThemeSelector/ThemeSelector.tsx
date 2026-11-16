"use client";

import type { Theme } from "../../../types/preferences";
import type { SelectorProps } from "../../../types/component-capabilities";
import { Select } from "../../atoms/Select";
import { useThemeSelector } from "./useThemeSelector";
import styles from "./ThemeSelector.module.css";

export interface ThemeSelectorProps extends SelectorProps<Theme> {}

export function ThemeSelector(props: ThemeSelectorProps) {
  const { value, options, label, disabled, controlId, handleChange, size } =
    useThemeSelector(props);

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
