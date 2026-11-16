"use client";
import { useId, useEffect, useState } from "react";
import { useFormContext, useController } from "react-hook-form";
import type { FieldPathByValue, FieldValues } from "react-hook-form";

import type { FormFieldComboboxProps } from "./FormFieldCombobox";

export function useFormFieldCombobox<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string | null> = FieldPathByValue<TValues, string | null>,
>({
  id,
  name,
  label,
  hint,
  error: displayedError,
  required,
  disabled: callerDisabled,
  options,
  ...inputProps
}: FormFieldComboboxProps<TValues, TName>) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const methods = useFormContext<TValues>();
  if (!methods) throw new Error("FormFieldCombobox requires FormProvider.");
  const disabled = callerDisabled || methods.formState.disabled;
  const { field, fieldState } = useController({ control: methods.control, name, disabled });
  const value: unknown = field.value;
  const message =
    displayedError ??
    (typeof fieldState.error?.message === "string" ? fieldState.error.message : undefined);
  const invalid = Boolean(fieldState.error) || Boolean(displayedError);

  if (value !== null && typeof value !== "string")
    throw new Error("Combobox fields require nullable string defaults.");
  const selectedValue: string | null = value;
  const [draft, setDraft] = useState({ selected: selectedValue, query: "", editing: false });
  const current = draft.selected === value ? draft : { selected: value, query: "", editing: false };
  if (draft.selected !== value) setDraft(current);
  const query = current.editing
    ? current.query
    : (options.find((option) => option.value === value)?.label ?? "");
  const { subscribe, getValues } = methods;
  useEffect(
    () =>
      subscribe({
        formState: { values: true },
        callback: (state) => {
          if (!state.name) setDraft({ selected: getValues(name), query: "", editing: false });
        },
      }),
    [subscribe, getValues, name],
  );

  function queryChange(query: string) {
    setDraft({ selected: selectedValue, query, editing: true });
  }

  function selectionChange(selected: string | null) {
    setDraft((previous) => ({
      selected,
      query: selected === null ? previous.query : "",
      editing: selected === null,
    }));
    field.onChange(selected);
  }

  return {
    controlId,
    label,
    hint,
    message,
    invalid,
    required,
    disabled,
    inputProps,
    binding: {
      name: field.name,
      ref: field.ref,
      selectedValue: value,
      onSelectionChange: selectionChange,
      query,
      onQueryChange: queryChange,
      onBlur: field.onBlur,
      options,
    },
  };
}
