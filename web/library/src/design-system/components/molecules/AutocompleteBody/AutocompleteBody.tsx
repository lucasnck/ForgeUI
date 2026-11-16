"use client";

import type { HTMLAttributes } from "react";
import { Input } from "../../atoms/Input";
import { PopupListbox } from "../PopupListbox";
import { useAutocompleteBody } from "./useAutocompleteBody";
import styles from "./AutocompleteBody.module.css";

export interface AutocompleteBodyProps extends HTMLAttributes<HTMLDivElement> {}

export function AutocompleteBody(input: AutocompleteBodyProps) {
  const { field, children, className, props, getOptionLabel } = useAutocompleteBody(input);

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
