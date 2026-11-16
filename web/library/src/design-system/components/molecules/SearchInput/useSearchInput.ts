"use client";

import { useEffect, useImperativeHandle, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import type { SearchInputProps } from "./SearchInput";

export function useSearchInput({
  clearLabel,
  value,
  defaultValue,
  onChange,
  disabled = false,
  readOnly = false,
  fullWidth = true,
  ref,
  ...props
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localValue, setLocalValue] = useState(() => String(defaultValue ?? ""));
  const displayValue = value === undefined ? localValue : String(value);
  useImperativeHandle(ref, () => inputRef.current!, []);
  useEffect(() => {
    const form = inputRef.current?.form;
    if (!form || value !== undefined) return;
    let active = true;
    const reset = (event: Event) =>
      queueMicrotask(() => {
        if (active && !event.defaultPrevented) setLocalValue(inputRef.current?.defaultValue ?? "");
      });
    form.addEventListener("reset", reset);

    return () => {
      active = false;
      form.removeEventListener("reset", reset);
    };
  }, [value]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const next = event.currentTarget.value;
    onChange?.(event);
    if (value === undefined) setLocalValue(next);
  }

  function clear() {
    const input = inputRef.current;
    if (!input || disabled || readOnly || !input.value) return;
    const setter = Object.getOwnPropertyDescriptor(
      input.ownerDocument.defaultView!.HTMLInputElement.prototype,
      "value",
    )?.set;
    setter?.call(input, "");
    input.dispatchEvent(new input.ownerDocument.defaultView!.Event("input", { bubbles: true }));
    input.focus();
  }

  return {
    inputRef,
    props,
    value,
    defaultValue,
    disabled,
    readOnly,
    fullWidth,
    clearLabel,
    showClear: Boolean(clearLabel && displayValue && !disabled && !readOnly),
    handleChange,
    clear,
  };
}
