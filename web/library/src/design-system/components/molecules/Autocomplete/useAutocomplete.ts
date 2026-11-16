"use client";

import { useId, useState } from "react";
import type { ChangeEvent, FocusEvent, KeyboardEvent } from "react";
import type { InputProps } from "../../atoms/Input";
import { usePopupListbox } from "../../../hooks/popup/usePopupListbox";
import type { AutocompleteProps } from "./Autocomplete";

export function useAutocomplete({
  options,
  query,
  onQueryChange,
  children,
  id,
  disabled,
  readOnly,
  onFocus,
  onBlur,
  onKeyDown,
  listboxLabel,
  ...attributes
}: AutocompleteProps) {
  const generatedId = useId();
  const inputId = id ?? "autocomplete-" + generatedId;
  const footerId = inputId + "-footer";
  const [acceptedQuery, setAcceptedQuery] = useState<string | null>(null);
  const [previousQuery, setPreviousQuery] = useState(query);

  if (previousQuery !== query) {
    setPreviousQuery(query);
    if (acceptedQuery !== query) setAcceptedQuery(null);
  }

  const enabledOptions = options.filter((option) => !option.disabled);
  const queryKey =
    query === acceptedQuery
      ? null
      : JSON.stringify([
          query,
          Boolean(disabled),
          Boolean(readOnly),
          enabledOptions.map((option) => [option.value, option.label]),
        ]);
  const popup = usePopupListbox({
    id: inputId,
    count: disabled || readOnly ? 0 : enabledOptions.length,
    queryKey,
    onAcceptOption(index) {
      const option = enabledOptions[index];
      if (!option || disabled || readOnly) return;
      setAcceptedQuery(option.label);
      onQueryChange(option.label);
    },
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (disabled || readOnly) return;
    const next = event.currentTarget.value;
    onQueryChange(next);
  }

  function handleFocus(event: FocusEvent<HTMLInputElement>) {
    onFocus?.(event);
    if (!event.defaultPrevented) popup.onFocus(event);
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    onBlur?.(event);
    if (!event.defaultPrevented) popup.onBlur(event);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    onKeyDown?.(event);
    if (!event.defaultPrevented) popup.onKeyDown(event);
  }

  const inputProps: InputProps = {
    ...attributes,
    id: inputId,
    disabled,
    readOnly,
    type: "text",
    value: query,
    ...popup.comboboxAttributes,
    "aria-autocomplete": "list",
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
  };

  return { children, inputId, footerId, inputProps, enabledOptions, popup, listboxLabel };
}
