"use client";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type {
  FormFieldCheckboxGroupControlProps,
  FormFieldRegistrationProps,
} from "../../../../types";

export interface FormFieldCheckboxGroupProps<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, readonly string[]> = FieldPathByValue<
    TValues,
    readonly string[]
  >,
>
  extends FormFieldCheckboxGroupControlProps, FormFieldRegistrationProps<TValues, TName> {}

import { CheckboxGroup } from "../../../molecules/CheckboxGroup";
import { FieldHint } from "../../../atoms/FieldHint";
import { FieldError } from "../../../atoms/FieldError";
import { ChoiceGroupBody } from "../../../atoms/ChoiceGroupBody";
import { ChoiceGroupFooter } from "../../../atoms/ChoiceGroupFooter";
import { CheckboxGroupItem } from "../../../molecules/CheckboxGroupItem";

import { useFormFieldCheckboxGroup } from "./useFormFieldCheckboxGroup";

export function FormFieldCheckboxGroup<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, readonly string[]> = FieldPathByValue<
    TValues,
    readonly string[]
  >,
>(props: FormFieldCheckboxGroupProps<TValues, TName>) {
  const view = useFormFieldCheckboxGroup(props);

  return (
    <CheckboxGroup
      {...view.inputProps}
      {...view.binding}
      id={view.controlId}
      legend={view.label}
      disabled={view.disabled}
      invalid={view.invalid}
    >
      <ChoiceGroupBody>
        {view.options.map((option) => (
          <CheckboxGroupItem
            key={option.value}
            value={option.value}
            label={option.label}
            disabled={option.disabled}
            aria-readonly={view.readOnly || undefined}
          />
        ))}
      </ChoiceGroupBody>
      {(view.hint || view.message) && (
        <ChoiceGroupFooter>
          {view.hint && <FieldHint id={view.controlId + "-hint"}>{view.hint}</FieldHint>}
          {view.message && <FieldError id={view.controlId + "-error"}>{view.message}</FieldError>}
        </ChoiceGroupFooter>
      )}
    </CheckboxGroup>
  );
}
