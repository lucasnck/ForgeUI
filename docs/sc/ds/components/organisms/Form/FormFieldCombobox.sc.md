---
title: "FormFieldCombobox"
scope: "Combobox composed with accessible field feedback and caller-owned React Hook Form state"
status: "DONE"
type: "component"
ds-level: "organisms"
---

# FormFieldCombobox

## Files

```text
design-system/components/organisms/Form/FormFieldCombobox/FormFieldCombobox.tsx (C)
design-system/components/organisms/Form/FormFieldCombobox/useFormFieldCombobox.ts (C)
design-system/components/organisms/Form/FormFieldCombobox/index.ts (C)
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

- [Combobox](../../molecules/Combobox.sc.md)
- [FormField](../../molecules/FormField.sc.md)
- [Form registration types](../../../types/tech-form-field-organisms.sc.md)
- [React Hook Form integration](../../../../tech-react-hook-form.sc.md)

## Contract

```tsx
import { FormFieldCombobox } from "@forge-ui/web";

<FormFieldCombobox<{ value: string | null }>
  name="value"
  label={fieldLabel}
  options={options}
  listboxLabel={suggestionsLabel}
/>;
```

## Hooks

```ts
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
```

## Content

```tsx
"use client";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type { FormFieldComboboxControlProps, FormFieldRegistrationProps } from "../../../../types";

export interface FormFieldComboboxProps<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string | null> = FieldPathByValue<TValues, string | null>,
>
  extends FormFieldComboboxControlProps, FormFieldRegistrationProps<TValues, TName> {}

import { FormField } from "../../../molecules/FormField";
import { Combobox } from "../../../molecules/Combobox";
import { ComboboxBody } from "../../../molecules/ComboboxBody";
import { useFormFieldCombobox } from "./useFormFieldCombobox";

export function FormFieldCombobox<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string | null> = FieldPathByValue<TValues, string | null>,
>(props: FormFieldComboboxProps<TValues, TName>) {
  const view = useFormFieldCombobox(props);

  return (
    <FormField controlId={view.controlId} label={view.label} hint={view.hint} error={view.message}>
      <Combobox
        {...view.inputProps}
        {...view.binding}
        id={view.controlId}
        disabled={view.disabled}
        invalid={view.invalid}
        aria-required={view.required || undefined}
      >
        <ComboboxBody />
      </Combobox>
    </FormField>
  );
}
```

## Tests

- `npm run test:form-adapters`: real React Hook Form SSR composition, independent IDs, provider failures, native defaults and unsupported readonly modes.
- Valid nested string | null field paths compile; unknown or incompatible paths and competing registration props fail typechecking.
- User changes update the field once; blur marks touched, invalid submit focuses the visible control, and an error without a message still sets invalid state.
- Initial defaults, reset, setValue, disabled submission and conditional unmount follow the provider policy without cross-form ID/value leakage.
- Verify the Combobox-specific value and interaction scenarios in the acceptance criteria, including SSR and a targeted browser check for the actual focus target and native/compound behavior.

## Criteria

- [x] Use one caller-owned FormProvider and preserve FormFieldInput's organization: a named generic Props interface, a colocated useFormFieldCombobox view hook called at the top of render, and existing DS presentation. No nested useForm, feature APIs or RHF imports in atoms/molecules.
- [x] Restrict name to FieldPathByValue for the declared form input type, including nested paths. Keep native/presentation adapter interfaces in design-system/types/form-field-organisms.ts, exported through the type barrel; component-local Props extend those canonical interfaces and FormFieldRegistrationProps.
- [x] Implement the useController channel for Combobox; the registered input type is `string | null`.
- [x] Bind selectedValue/onSelectionChange to the nullable string RHF field, default null. Keep query text in the colocated adapter view hook; it is presentation state, not a second registered field.
- [x] Compose ComboboxBody inside its existing owner and omit a competing header label by default. Resolve selected option labels from caller options for initial values, setValue and reset; programmatic changes do not emit a user change.
- [x] Typing away from a selection clears the registered selected value once through the primitive callback. A query without selection remains null; accepting an option stores its value, not its label.
- [x] Reset clears stale query/popup presentation; unresolved external selected keys remain in RHF without fabricated labels or automatic corrective callbacks. Options may arrive later; updating labels must preserve the key.
- [x] RHF owns value/defaultValue, name, change/blur, disabled and registration ref. Do not expose competing channels or register the same field twice. Schema/resolver validation, transforms, localization and submission remain caller-owned.
- [x] Preserve exact-field errors, including invalid state without a string message and an explicitly supplied translated error. Merge external and mounted hint/error description IDs once; label the actual focus target or group and keep generated IDs independent between forms.
- [x] Forward RHF focus to the actual editable control or enabled option, never a hidden input, decorative wrapper or non-focusable fieldset. Reset, setValue, dirty/touched and conditional unmount follow the caller's RHF policy.
- [x] FormView integration uses the explicit renderer kind specified below and strictly typed per-kind metadata. Both form and fields modes preserve caller-owned submission and reject incompatible schema inputs at compile time. Use `kind="combobox"`.
- [x] Use existing visual recipes and primitive behavior without new CSS or popup/selection/mask implementations. Retain supported native and visual capabilities; do not spread unsupported readOnly or fullWidth props onto a primitive.
- [x] Support deterministic static rendering without browser globals at module evaluation. The component and renderer kind are exported and documented in the availability catalog after verification.
- [x] Format only task-touched supported files using .prettierrc.json and .prettierignore, apply ESLint fixes only to touched JS/TS files, rerun read-only formatting/lint checks, typechecks and relevant established form/control tests before DONE.

