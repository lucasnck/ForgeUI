---
title: "FormFieldTimeInput"
scope: "TimeInput composed with accessible field feedback and caller-owned React Hook Form state"
status: "DONE"
type: "component"
ds-level: "organisms"
---

# FormFieldTimeInput

## Files

```text
design-system/components/organisms/Form/FormFieldTimeInput/FormFieldTimeInput.tsx (C)
design-system/components/organisms/Form/FormFieldTimeInput/useFormFieldTimeInput.ts (C)
design-system/components/organisms/Form/FormFieldTimeInput/index.ts (C)
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

- [TimeInput](../../molecules/TimeInput.sc.md)
- [FormField](../../molecules/FormField.sc.md)
- [Form registration types](../../../types/tech-form-field-organisms.sc.md)
- [React Hook Form integration](../../../../tech-react-hook-form.sc.md)

## Contract

```tsx
import { FormFieldTimeInput } from "@forge-ui/web";

<FormFieldTimeInput<{ value: string }>
  name="value"
  label={fieldLabel}
/>;
```

## Hooks

```ts
"use client";
import { useId } from "react";

import { useFormContext, useFormState } from "react-hook-form";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type { FormFieldTimeInputProps } from "./FormFieldTimeInput";

export function useFormFieldTimeInput<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>({
  id,
  name,
  label,
  hint,
  error: displayedError,
  required,
  disabled: callerDisabled,
  ...inputProps
}: FormFieldTimeInputProps<TValues, TName>) {
  const generatedId = useId();
  const methods = useFormContext<TValues>();
  if (!methods) throw new Error("FormFieldTimeInput requires FormProvider.");
  const disabled = callerDisabled || methods.formState.disabled;
  const state = useFormState({ control: methods.control, name, exact: true });
  const { error } = methods.getFieldState(name, state);
  const registration = methods.register(name, { disabled });
  const defaultValue: unknown = methods.getValues(name);
  if (typeof defaultValue !== "string")
    throw new Error("Native text fields require string defaults.");
  const message =
    displayedError ?? (typeof error?.message === "string" ? error.message : undefined);

  return {
    controlId: id ?? generatedId,
    label,
    hint,
    required,
    disabled,
    message,
    invalid: Boolean(error) || Boolean(displayedError),
    inputProps,
    binding: { ...registration, defaultValue },
  };
}
```

## Content

```tsx
"use client";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type { FormFieldTimeInputControlProps, FormFieldRegistrationProps } from "../../../../types";

export interface FormFieldTimeInputProps<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>
  extends FormFieldTimeInputControlProps, FormFieldRegistrationProps<TValues, TName> {}

import { TimeInput } from "../../../molecules/TimeInput";

import { FormField } from "../../../molecules/FormField";
import { useFormFieldTimeInput } from "./useFormFieldTimeInput";

export function FormFieldTimeInput<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>(props: FormFieldTimeInputProps<TValues, TName>) {
  const view = useFormFieldTimeInput(props);

  return (
    <FormField controlId={view.controlId} label={view.label} hint={view.hint} error={view.message}>
      <TimeInput
        {...view.inputProps}
        {...view.binding}
        id={view.controlId}
        disabled={view.disabled}
        invalid={view.invalid}
        aria-required={view.required || undefined}
      />
    </FormField>
  );
}
```

## Tests

- `npm run test:form-adapters`: real React Hook Form SSR composition, independent IDs, provider failures, native defaults and unsupported readonly modes.
- Valid nested string field paths compile; unknown or incompatible paths and competing registration props fail typechecking.
- User changes update the field once; blur marks touched, invalid submit focuses the visible control, and an error without a message still sets invalid state.
- Initial defaults, reset, setValue, disabled submission and conditional unmount follow the provider policy without cross-form ID/value leakage.
- Verify the TimeInput-specific value and interaction scenarios in the acceptance criteria, including SSR and a targeted browser check for the actual focus target and native/compound behavior.

## Criteria

- [x] Use one caller-owned FormProvider and preserve FormFieldInput's organization: a named generic Props interface, a colocated useFormFieldTimeInput view hook called at the top of render, and existing DS presentation. No nested useForm, feature APIs or RHF imports in atoms/molecules.
- [x] Restrict name to FieldPathByValue for the declared form input type, including nested paths. Keep native/presentation adapter interfaces in design-system/types/form-field-organisms.ts, exported through the type barrel; component-local Props extend those canonical interfaces and FormFieldRegistrationProps.
- [x] Implement the register channel for TimeInput; the registered input type is `string`.
- [x] Store the native time string (including seconds when enabled by step) with default ""; do not convert it to Date or an elapsed duration.
- [x] Forward supported min/max/step without inventing timezone semantics; native picker interactions remain delegated to TimeInput.
- [x] RHF owns value/defaultValue, name, change/blur, disabled and registration ref. Do not expose competing channels or register the same field twice. Schema/resolver validation, transforms, localization and submission remain caller-owned.
- [x] Preserve exact-field errors, including invalid state without a string message and an explicitly supplied translated error. Merge external and mounted hint/error description IDs once; label the actual focus target or group and keep generated IDs independent between forms.
- [x] Forward RHF focus to the actual editable control or enabled option, never a hidden input, decorative wrapper or non-focusable fieldset. Reset, setValue, dirty/touched and conditional unmount follow the caller's RHF policy.
- [x] FormView integration uses the explicit renderer kind specified below and strictly typed per-kind metadata. Both form and fields modes preserve caller-owned submission and reject incompatible schema inputs at compile time. Use `kind="time"`.
- [x] Use existing visual recipes and primitive behavior without new CSS or popup/selection/mask implementations. Retain supported native and visual capabilities; do not spread unsupported readOnly or fullWidth props onto a primitive.
- [x] Support deterministic static rendering without browser globals at module evaluation. The component and renderer kind are exported and documented in the availability catalog after verification.
- [x] Format only task-touched supported files using .prettierrc.json and .prettierignore, apply ESLint fixes only to touched JS/TS files, rerun read-only formatting/lint checks, typechecks and relevant established form/control tests before DONE.

