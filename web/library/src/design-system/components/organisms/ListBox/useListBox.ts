"use client";
import { useId, useRef, useEffect } from "react";
import { useListBoxState } from "../../../hooks/listbox/useListBoxState";
import type { ListBoxProps } from "./ListBox";

export function useListBox(input: ListBoxProps) {
  const {
    id,
    options,
    value,
    defaultValue,
    onValueChange,
    selectionMode = "single",
    disabled = false,
    label,
    children,
    name,
    form,
    invalid,
    animated = true,
    className,
    "aria-invalid": ariaInvalid,
    "aria-describedby": describedBy,
    ...props
  } = input;
  if (!label.trim() || options.some((option) => !option.label.trim()))
    throw new Error("ListBox requires nonempty labels.");
  const generatedId = useId();
  const bodyRef = useRef<HTMLUListElement>(null);
  const formControlRef = useRef<HTMLInputElement>(null);
  const state = useListBoxState({
    options,
    value,
    defaultValue,
    onValueChange,
    selectionMode,
    disabled,
    fallbackRef: bodyRef,
  });
  const resetRef = useRef(state.reset);
  useEffect(() => {
    resetRef.current = state.reset;
  });
  useEffect(() => {
    const associatedForm = formControlRef.current?.form;
    if (!associatedForm) return;

    const reset = (event: Event) => {
      queueMicrotask(() => {
        if (!event.defaultPrevented) resetRef.current();
      });
    };

    associatedForm.addEventListener("reset", reset);
    return () => associatedForm.removeEventListener("reset", reset);
  }, [name, form]);
  const selected = state.selected.filter((key) =>
    options.some((option) => option.value === key && !option.disabled),
  );

  return {
    props,
    children,
    className,
    selected,
    name,
    form,
    disabled,
    formControlRef,
    context: {
      ...state,
      bodyRef,
      label,
      options,
      selectionMode,
      disabled,
      invalid: invalid ?? ariaInvalid,
      listboxId: id ?? generatedId,
      describedBy,
      animated,
    },
  };
}
