"use client";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type { FormFieldListBoxControlProps, FormFieldRegistrationProps } from "../../../../types";

export interface FormFieldListBoxProps<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, readonly string[]> = FieldPathByValue<
    TValues,
    readonly string[]
  >,
>
  extends FormFieldListBoxControlProps, FormFieldRegistrationProps<TValues, TName> {}

import { ListBox } from "../../../organisms/ListBox";
import { FieldHint } from "../../../atoms/FieldHint";
import { FieldError } from "../../../atoms/FieldError";
import { ListBoxBody } from "../../../molecules/ListBoxBody";
import { ListBoxFooter } from "../../../atoms/ListBoxFooter";

import { useFormFieldListBox } from "./useFormFieldListBox";

export function FormFieldListBox<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, readonly string[]> = FieldPathByValue<
    TValues,
    readonly string[]
  >,
>(props: FormFieldListBoxProps<TValues, TName>) {
  const view = useFormFieldListBox(props);

  return (
    <ListBox
      {...view.inputProps}
      {...view.binding}
      id={view.controlId}
      label={view.label}
      options={view.options}
      disabled={view.disabled}
      invalid={view.invalid}
    >
      <ListBoxBody />
      {(view.hint || view.message) && (
        <ListBoxFooter>
          {view.hint && <FieldHint id={view.controlId + "-hint"}>{view.hint}</FieldHint>}
          {view.message && <FieldError id={view.controlId + "-error"}>{view.message}</FieldError>}
        </ListBoxFooter>
      )}
    </ListBox>
  );
}
