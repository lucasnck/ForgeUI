"use client";

import { useEmailInput } from "./useEmailInput";
import type { ReactElement } from "react";
import type {
  ComponentFullWidthProps,
  ComponentInvalidProps,
  VisualProps,
} from "../../../types/component-capabilities";
import type { ComponentPopupProps } from "../../../types/popup";
import type { NativeEmailInputProps } from "../../../types/native-control-contracts";
import { Input } from "../../atoms/Input";
import { PopupListbox } from "../PopupListbox";
import styles from "./EmailInput.module.css";

export interface EmailInputProps
  extends
    NativeEmailInputProps,
    VisualProps,
    ComponentFullWidthProps,
    ComponentInvalidProps,
    ComponentPopupProps {
  value: string;
  onValueChange: (value: string) => void;
  providers: readonly string[];
  maxSuggestions?: number;
}

export function EmailInput(input: EmailInputProps): ReactElement {
  const {
    props,
    controlId,
    value,
    suggestion,
    popup,
    listboxLabel,
    onChange,
    onFocus,
    onBlur,
    onKeyDown,
  } = useEmailInput(input);

  return (
    <div className={styles.root}>
      <Input
        {...props}
        id={controlId}
        type="email"
        inputMode="email"
        autoComplete="email"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        value={value}
        {...popup.comboboxAttributes}
        aria-autocomplete="list"
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <PopupListbox
        popup={popup}
        items={suggestion?.domains ?? []}
        getOptionLabel={(domain) => "@" + domain}
        listboxLabel={listboxLabel}
      />
    </div>
  );
}
