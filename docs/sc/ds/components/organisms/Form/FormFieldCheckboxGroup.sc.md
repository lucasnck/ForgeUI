---
title: "FormFieldCheckboxGroup"
scope: "CheckboxGroup composed with accessible field feedback and caller-owned React Hook Form state"
status: "DONE"
type: "component"
ds-level: "organisms"
---

# FormFieldCheckboxGroup

## Files

```text
design-system/components/organisms/Form/FormFieldCheckboxGroup/FormFieldCheckboxGroup.tsx (C)
design-system/components/organisms/Form/FormFieldCheckboxGroup/useFormFieldCheckboxGroup.ts (C)
design-system/components/organisms/Form/FormFieldCheckboxGroup/index.ts (C)
design-system/components/organisms/Form/index.ts (M)
design-system/index.ts (M)
design-system/types/form-field-organisms.ts (M)
design-system/types/index.ts (M)
design-system/types/forms.test.ts (M)
../scripts/check-form-field-adapters.cjs (C)
../scripts/fixtures/form-field-adapters.tsx (C)
../scripts/fixtures/form-adapter-upload.txt (C)
```

## Dependencies

- [CheckboxGroup](../../molecules/CheckboxGroup.sc.md)
- [FormField](../../molecules/FormField.sc.md)
- [Form registration types](../../../types/tech-form-field-organisms.sc.md)
- [React Hook Form integration](../../../../tech-react-hook-form.sc.md)

## Contract

```tsx
import { FormFieldCheckboxGroup } from "@forge-ui/web";

<FormFieldCheckboxGroup<{ value: readonly string[] }>
  name="value"
  label={fieldLabel}
  options={options}
/>;
```

## Hooks

```ts
"use client";
import { useId, useCallback } from "react";
import { useFormContext, useController } from "react-hook-form";
import type { FieldPathByValue, FieldValues } from "react-hook-form";

import type { FocusEvent, MouseEvent } from "react";
import type { FormFieldCheckboxGroupProps } from "./FormFieldCheckboxGroup";

export function useFormFieldCheckboxGroup<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, readonly string[]> = FieldPathByValue<
    TValues,
    readonly string[]
  >,
>({
  id,
  name,
  label,
  hint,
  error: displayedError,
  required,
  disabled: callerDisabled,
  options,
  readOnly,
  ...inputProps
}: FormFieldCheckboxGroupProps<TValues, TName>) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const methods = useFormContext<TValues>();
  if (!methods) throw new Error("FormFieldCheckboxGroup requires FormProvider.");
  const disabled = callerDisabled || methods.formState.disabled;
  const { field, fieldState } = useController({ control: methods.control, name, disabled });
  const value: unknown = field.value;
  const fieldRef = field.ref;
  const message =
    displayedError ??
    (typeof fieldState.error?.message === "string" ? fieldState.error.message : undefined);
  const invalid = Boolean(fieldState.error) || Boolean(displayedError);

  if (!Array.isArray(value) || value.some((key) => typeof key !== "string"))
    throw new Error("Selection groups require string-array defaults.");
  const describedBy =
    [
      ...new Set(
        [
          ...(inputProps["aria-describedby"]?.split(/\s+/).filter(Boolean) ?? []),
          hint ? controlId + "-hint" : "",
          message ? controlId + "-error" : "",
        ].filter(Boolean),
      ),
    ].join(" ") || undefined;
  const rootRef = useCallback(
    (node: HTMLFieldSetElement | null) => {
      fieldRef(
        node
          ? {
              focus() {
                node.querySelector<HTMLElement>('input[type="checkbox"]:not(:disabled)')?.focus();
              },
            }
          : null,
      );
    },
    [fieldRef],
  );

  function blur(event: FocusEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) field.onBlur();
  }

  function click(event: MouseEvent<HTMLFieldSetElement>) {
    inputProps.onClickCapture?.(event);
    if (readOnly) event.preventDefault();
  }

  function change(next: readonly string[]) {
    if (!readOnly && !disabled) field.onChange(next);
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
    options,
    readOnly,
    binding: {
      name: field.name,
      ref: rootRef,
      value,
      onValueChange: change,
      onBlur: blur,
      onClickCapture: click,
      "aria-describedby": describedBy,
    },
  };
}
```

## Content

```tsx
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
```

## Tests

- `npm run test:form-adapters`: real React Hook Form SSR composition, independent IDs, provider failures, native defaults and unsupported readonly modes.
- Valid nested readonly string[] field paths compile; unknown or incompatible paths and competing registration props fail typechecking.
- User changes update the field once; blur marks touched, invalid submit focuses the visible control, and an error without a message still sets invalid state.
- Initial defaults, reset, setValue, disabled submission and conditional unmount follow the provider policy without cross-form ID/value leakage.
- Verify the CheckboxGroup-specific value and interaction scenarios in the acceptance criteria, including SSR and a targeted browser check for the actual focus target and native/compound behavior.

## Criteria

- [x] Use one caller-owned FormProvider and preserve FormFieldInput's organization: a named generic Props interface, a colocated useFormFieldCheckboxGroup view hook called at the top of render, and existing DS presentation. No nested useForm, feature APIs or RHF imports in atoms/molecules.
- [x] Restrict name to FieldPathByValue for the declared form input type, including nested paths. Keep native/presentation adapter interfaces in design-system/types/form-field-organisms.ts, exported through the type barrel; component-local Props extend those canonical interfaces and FormFieldRegistrationProps.
- [x] Implement the useController channel for CheckboxGroup; the registered input type is `readonly string[]`.
- [x] Expose typed options from the canonical choice-option contract and bind one readonly string[] field with default []; use existing CheckboxGroup, ChoiceGroupBody and CheckboxGroupItem composition.
- [x] Use the primitive legend as the accessible group label rather than a label pointing to a fieldset. Existing FormField feedback can use its compound body/footer without a duplicate header; explicitly connect group/item descriptions to hint/error IDs.
- [x] Do not register each checkbox separately under the group name. Selection changes update the array once, preserve primitive option order/disabled semantics, and blur marks touched only when focus leaves the group.
- [x] Bridge RHF focus to the first enabled checkbox; fieldset ref alone is insufficient. For readonly, preserve values and guard changes with accessible readonly state rather than disabling the field or relying on an unsupported native fieldset prop.
- [x] RHF owns value/defaultValue, name, change/blur, disabled and registration ref. Do not expose competing channels or register the same field twice. Schema/resolver validation, transforms, localization and submission remain caller-owned.
- [x] Preserve exact-field errors, including invalid state without a string message and an explicitly supplied translated error. Merge external and mounted hint/error description IDs once; label the actual focus target or group and keep generated IDs independent between forms.
- [x] Forward RHF focus to the actual editable control or enabled option, never a hidden input, decorative wrapper or non-focusable fieldset. Reset, setValue, dirty/touched and conditional unmount follow the caller's RHF policy.
- [x] FormView integration uses the explicit renderer kind specified below and strictly typed per-kind metadata. Both form and fields modes preserve caller-owned submission and reject incompatible schema inputs at compile time. Use `kind="checkboxGroup"`.
- [x] Use existing visual recipes and primitive behavior without new CSS or popup/selection/mask implementations. Retain supported native and visual capabilities; do not spread unsupported readOnly or fullWidth props onto a primitive.
- [x] Support deterministic static rendering without browser globals at module evaluation. The component and renderer kind are exported and documented in the availability catalog after verification.
- [x] Format only task-touched supported files using .prettierrc.json and .prettierignore, apply ESLint fixes only to touched JS/TS files, rerun read-only formatting/lint checks, typechecks and relevant established form/control tests before DONE.

