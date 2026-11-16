"use client";
import { useId, useState } from "react";
import type { ChangeEvent } from "react";
import { usePopupListbox } from "@forge-ui/web";
import { resourceOptions } from "../../ResourceExamples/fixtures";
import { useResourceExampleCopy } from "../../ResourceExamples/useResourceExampleCopy";

export function usePopupListboxResourceExample() {
  const id = useId();
  const [query, setQuery] = useState("");
  const [accepted, setAccepted] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const options = resourceOptions.filter(
    (item) => !item.disabled && item.label.toLowerCase().includes(query.toLowerCase()),
  );

  function change(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
    setAccepted(null);
  }

  function accept(index: number) {
    const option = options[index];

    if (option && !disabled && !readOnly) {
      setAccepted(option.value);
      setQuery(option.label);
    }
  }

  const popup = usePopupListbox({
    id,
    count: options.length,
    queryKey: accepted || disabled || readOnly ? null : query,
    onAcceptOption: accept,
  });
  const copy = useResourceExampleCopy();

  function clear() {
    setQuery("");
    setAccepted(null);
  }

  return {
    id,
    query,
    change,
    options,
    popup,
    accepted,
    copy,
    clear,
    disabled,
    setDisabled,
    readOnly,
    setReadOnly,
  };
}
