---
title: "FormFieldListBox"
scope: "ListBox composed with accessible field feedback and caller-owned React Hook Form state"
status: "DONE"
type: "component"
ds-level: "organisms"
---

# FormFieldListBox

## Files

```text
design-system/components/organisms/Form/FormFieldListBox/FormFieldListBox.tsx (C)
design-system/components/organisms/Form/FormFieldListBox/useFormFieldListBox.ts (C)
design-system/components/organisms/Form/FormFieldListBox/index.ts (C)
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

- [ListBox](../../organisms/ListBox.sc.md)
- [FormField](../../molecules/FormField.sc.md)
- [Form registration types](../../../types/tech-form-field-organisms.sc.md)
- [React Hook Form integration](../../../../tech-react-hook-form.sc.md)

## Contract

```tsx
import { FormFieldListBox } from "@forge-ui/web";

<FormFieldListBox<{ value: readonly string[] }>
  name="value"
  label={fieldLabel}
  options={options}
  selectionMode="multiple"
/>;
```

## Hooks

```ts
"use client";
import { useId, useCallback } from "react";
import { useFormContext, useController } from "react-hook-form";
import type { FieldPathByValue, FieldValues } from "react-hook-form";

import type { FocusEvent } from "react";
import type { FormFieldListBoxProps } from "./FormFieldListBox";

export function useFormFieldListBox<
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
  ...inputProps
}: FormFieldListBoxProps<TValues, TName>) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const methods = useFormContext<TValues>();
  if (!methods) throw new Error("FormFieldListBox requires FormProvider.");
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
    (node: HTMLElement | null) => {
      fieldRef(
        node
          ? {
              focus() {
                (
                  node.querySelector<HTMLElement>('[role="option"][tabindex="0"]') ??
                  node.querySelector<HTMLElement>('[role="option"]:not([aria-disabled="true"])') ??
                  node.querySelector<HTMLElement>('[role="listbox"]')
                )?.focus();
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
    binding: {
      name: field.name,
      ref: rootRef,
      value,
      onValueChange: field.onChange,
      onBlur: blur,
      "aria-describedby": describedBy,
    },
  };
}
```

## Content

```tsx
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
```

## Tests

- `npm run test:form-adapters`: real React Hook Form SSR composition, independent IDs, provider failures, native defaults and unsupported readonly modes.
- Valid nested readonly string[] field paths compile; unknown or incompatible paths and competing registration props fail typechecking.
- User changes update the field once; blur marks touched, invalid submit focuses the visible control, and an error without a message still sets invalid state.
- Initial defaults, reset, setValue, disabled submission and conditional unmount follow the provider policy without cross-form ID/value leakage.
- Verify the ListBox-specific value and interaction scenarios in the acceptance criteria, including SSR and a targeted browser check for the actual focus target and native/compound behavior.

## Criteria

- [x] Use one caller-owned FormProvider and preserve FormFieldInput's organization: a named generic Props interface, a colocated useFormFieldListBox view hook called at the top of render, and existing DS presentation. No nested useForm, feature APIs or RHF imports in atoms/molecules.
- [x] Restrict name to FieldPathByValue for the declared form input type, including nested paths. Keep native/presentation adapter interfaces in design-system/types/form-field-organisms.ts, exported through the type barrel; component-local Props extend those canonical interfaces and FormFieldRegistrationProps.
- [x] Implement the useController channel for ListBox; the registered input type is `readonly string[]`.
- [x] Bind one readonly string[] field with default [] in both single and multiple modes; single mode retains the array contract with at most one selected key. Do not silently switch the value shape based on mode.
- [x] Compose the existing ListBox and ListBoxBody. Use its own accessible label and connect feedback IDs to the focusable listbox body; FormField's label must not point to a decorative section or hidden submission input.
- [x] Bridge RHF focus to the active/enabled option or focusable listbox fallback. Hidden native inputs remain primitive-owned and are not separately registered with RHF.
- [x] Respect primitive filtering of disabled/unavailable options, preserve canonical keys on programmatic updates and emit no corrective callback on options changes. Let caller schema reject stale selections; do not silently drop saved keys from RHF.
- [x] ListBox has no native readOnly contract. Reject readOnly for enabled FormView listBox fields until a primitive-owned readonly selection contract exists; do not silently disable the field or duplicate its selection state machine.
- [x] RHF owns value/defaultValue, name, change/blur, disabled and registration ref. Do not expose competing channels or register the same field twice. Schema/resolver validation, transforms, localization and submission remain caller-owned.
- [x] Preserve exact-field errors, including invalid state without a string message and an explicitly supplied translated error. Merge external and mounted hint/error description IDs once; label the actual focus target or group and keep generated IDs independent between forms.
- [x] Forward RHF focus to the actual editable control or enabled option, never a hidden input, decorative wrapper or non-focusable fieldset. Reset, setValue, dirty/touched and conditional unmount follow the caller's RHF policy.
- [x] FormView integration uses the explicit renderer kind specified below and strictly typed per-kind metadata. Both form and fields modes preserve caller-owned submission and reject incompatible schema inputs at compile time. Use `kind="listBox"`.
- [x] Use existing visual recipes and primitive behavior without new CSS or popup/selection/mask implementations. Retain supported native and visual capabilities; do not spread unsupported readOnly or fullWidth props onto a primitive.
- [x] Support deterministic static rendering without browser globals at module evaluation. The component and renderer kind are exported and documented in the availability catalog after verification.
- [x] Format only task-touched supported files using .prettierrc.json and .prettierignore, apply ESLint fixes only to touched JS/TS files, rerun read-only formatting/lint checks, typechecks and relevant established form/control tests before DONE.

