---
title: "FormFieldSlider"
scope: "Slider composed with accessible field feedback and caller-owned React Hook Form state"
status: "DONE"
type: "component"
ds-level: "organisms"
---

# FormFieldSlider

## Files

```text
design-system/components/organisms/Form/FormFieldSlider/FormFieldSlider.tsx (C)
design-system/components/organisms/Form/FormFieldSlider/useFormFieldSlider.ts (C)
design-system/components/organisms/Form/FormFieldSlider/index.ts (C)
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

- [Slider](../../molecules/Slider.sc.md)
- [FormField](../../molecules/FormField.sc.md)
- [Form registration types](../../../types/tech-form-field-organisms.sc.md)
- [React Hook Form integration](../../../../tech-react-hook-form.sc.md)

## Contract

```tsx
import { FormFieldSlider } from "@forge-ui/web";

<FormFieldSlider<{ value: number }>
  name="value"
  label={fieldLabel}
  min={0}
  max={100}
  step={1}
/>;
```

## Hooks

```ts
"use client";
import { useId } from "react";
import type { ChangeEvent } from "react";
import { useFormContext, useController } from "react-hook-form";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type { FormFieldSliderProps } from "./FormFieldSlider";

export function useFormFieldSlider<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, number> = FieldPathByValue<TValues, number>,
>({
  id,
  name,
  label,
  hint,
  error: displayedError,
  required,
  disabled: callerDisabled,
  ...inputProps
}: FormFieldSliderProps<TValues, TName>) {
  const generatedId = useId();
  const methods = useFormContext<TValues>();
  if (!methods) throw new Error("FormFieldSlider requires FormProvider.");
  const disabled = callerDisabled || methods.formState.disabled;
  const { field, fieldState } = useController({ control: methods.control, name, disabled });
  const value: unknown = field.value;
  if (typeof value !== "number" || !Number.isFinite(value))
    throw new Error("FormFieldSlider requires number defaults.");
  const error = fieldState.error;
  const message =
    displayedError ?? (typeof error?.message === "string" ? error.message : undefined);

  function change(event: ChangeEvent<HTMLInputElement>) {
    if (disabled || event.defaultPrevented) return;
    field.onChange(event.currentTarget.valueAsNumber);
  }

  return {
    controlId: id ?? generatedId,
    label,
    hint,
    required,
    disabled,
    message,
    invalid: Boolean(error) || Boolean(displayedError),
    inputProps,
    binding: { name: field.name, ref: field.ref, onBlur: field.onBlur, value, onChange: change },
  };
}
```

## Content

```tsx
"use client";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type { FormFieldSliderControlProps, FormFieldRegistrationProps } from "../../../../types";

export interface FormFieldSliderProps<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, number> = FieldPathByValue<TValues, number>,
>
  extends FormFieldSliderControlProps, FormFieldRegistrationProps<TValues, TName> {}

import { Slider } from "../../../molecules/Slider";

import { FormField } from "../../../molecules/FormField";
import { useFormFieldSlider } from "./useFormFieldSlider";

export function FormFieldSlider<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, number> = FieldPathByValue<TValues, number>,
>(props: FormFieldSliderProps<TValues, TName>) {
  const view = useFormFieldSlider(props);

  return (
    <FormField controlId={view.controlId} label={view.label} hint={view.hint} error={view.message}>
      <Slider
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
- Valid nested number field paths compile; unknown or incompatible paths and competing registration props fail typechecking.
- User changes update the field once; blur marks touched, invalid submit focuses the visible control, and an error without a message still sets invalid state.
- Initial defaults, reset, setValue, disabled submission and conditional unmount follow the provider policy without cross-form ID/value leakage.
- Verify the Slider-specific value and interaction scenarios in the acceptance criteria, including SSR and a targeted browser check for the actual focus target and native/compound behavior.

## Criteria

- [x] Use one caller-owned FormProvider and preserve FormFieldInput's organization: a named generic Props interface, a colocated useFormFieldSlider view hook called at the top of render, and existing DS presentation. No nested useForm, feature APIs or RHF imports in atoms/molecules.
- [x] Restrict name to FieldPathByValue for the declared form input type, including nested paths. Keep native/presentation adapter interfaces in design-system/types/form-field-organisms.ts, exported through the type barrel; component-local Props extend those canonical interfaces and FormFieldRegistrationProps.
- [x] Implement the useController channel for Slider; the registered input type is `number`.
- [x] Bind the native range value to a finite numeric RHF value; translate valueAsNumber once per user change and require an explicit finite default within configured bounds.
- [x] Preserve Slider min/max/step defaults and valueText accessibility. Never coerce an unset slider to zero or expose NaN.
- [x] NativeRangeInputProps deliberately excludes readOnly. Do not pass readOnly through the adapter; FormView must reject readOnly for an enabled slider field rather than silently disabling it or changing its submitted value.
- [x] RHF owns value/defaultValue, name, change/blur, disabled and registration ref. Do not expose competing channels or register the same field twice. Schema/resolver validation, transforms, localization and submission remain caller-owned.
- [x] Preserve exact-field errors, including invalid state without a string message and an explicitly supplied translated error. Merge external and mounted hint/error description IDs once; label the actual focus target or group and keep generated IDs independent between forms.
- [x] Forward RHF focus to the actual editable control or enabled option, never a hidden input, decorative wrapper or non-focusable fieldset. Reset, setValue, dirty/touched and conditional unmount follow the caller's RHF policy.
- [x] FormView integration uses the explicit renderer kind specified below and strictly typed per-kind metadata. Both form and fields modes preserve caller-owned submission and reject incompatible schema inputs at compile time. Use `kind="slider"`.
- [x] Use existing visual recipes and primitive behavior without new CSS or popup/selection/mask implementations. Retain supported native and visual capabilities; do not spread unsupported readOnly or fullWidth props onto a primitive.
- [x] Support deterministic static rendering without browser globals at module evaluation. The component and renderer kind are exported and documented in the availability catalog after verification.
- [x] Format only task-touched supported files using .prettierrc.json and .prettierignore, apply ESLint fixes only to touched JS/TS files, rerun read-only formatting/lint checks, typechecks and relevant established form/control tests before DONE.

