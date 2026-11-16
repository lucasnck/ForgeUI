"use client";

import type { HTMLAttributes } from "react";
import { Input } from "../../atoms/Input";
import { PopupListbox } from "../PopupListbox";
import { useComboboxBody } from "./useComboboxBody";
import styles from "./ComboboxBody.module.css";

export interface ComboboxBodyProps extends HTMLAttributes<HTMLDivElement> {}

export function ComboboxBody(input: ComboboxBodyProps) {
  const { field, children, className, props, getOptionLabel } = useComboboxBody(input);

  return (
    <div
      {...props}
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-full-width={(field.inputProps.fullWidth ?? true) || undefined}
    >
      <Input {...field.inputProps} />
      <PopupListbox
        popup={field.popup}
        items={field.enabledOptions}
        getOptionLabel={getOptionLabel}
        listboxLabel={field.listboxLabel}
      />
      {children}
    </div>
  );
}
