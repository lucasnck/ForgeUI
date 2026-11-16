---
title: "FormFieldFileInput"
scope: "FileInput composed with accessible field feedback and caller-owned React Hook Form state"
status: "DONE"
type: "component"
ds-level: "organisms"
---

# FormFieldFileInput

## Files

```text
design-system/components/organisms/Form/FormFieldFileInput/FormFieldFileInput.tsx (C)
design-system/components/organisms/Form/FormFieldFileInput/useFormFieldFileInput.ts (C)
design-system/components/organisms/Form/FormFieldFileInput/index.ts (C)
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

- [FileInput](../../molecules/FileInput.sc.md)
- [FormField](../../molecules/FormField.sc.md)
- [Form registration types](../../../types/tech-form-field-organisms.sc.md)
- [React Hook Form integration](../../../../tech-react-hook-form.sc.md)

## Contract

```tsx
import { FormFieldFileInput } from "@forge-ui/web";

<FormFieldFileInput<{ value: readonly File[] }>
  name="value"
  label={fieldLabel}
  multiple
  accept="image/*"
/>;
```

## Hooks

```ts
"use client";
import { useId, useCallback, useLayoutEffect, useRef } from "react";
import { useFormContext, useController } from "react-hook-form";
import type { FieldPathByValue, FieldValues } from "react-hook-form";

import type { FormFieldFileInputProps } from "./FormFieldFileInput";

export function useFormFieldFileInput<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, readonly File[]> = FieldPathByValue<
    TValues,
    readonly File[]
  >,
>({
  id,
  name,
  label,
  hint,
  error: displayedError,
  required,
  disabled: callerDisabled,
  ...inputProps
}: FormFieldFileInputProps<TValues, TName>) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const methods = useFormContext<TValues>();
  if (!methods) throw new Error("FormFieldFileInput requires FormProvider.");
  const disabled = callerDisabled || methods.formState.disabled;
  const { field, fieldState } = useController({ control: methods.control, name, disabled });
  const value: unknown = field.value;
  const fieldRef = field.ref;
  const message =
    displayedError ??
    (typeof fieldState.error?.message === "string" ? fieldState.error.message : undefined);
  const invalid = Boolean(fieldState.error) || Boolean(displayedError);

  if (!Array.isArray(value)) throw new Error("File fields require array defaults.");
  const input = useRef<HTMLInputElement | null>(null);
  const setRef = useCallback(
    (node: HTMLInputElement | null) => {
      input.current = node;
      fieldRef(node);
    },
    [fieldRef],
  );
  useLayoutEffect(() => {
    const node = input.current;
    if (!node) return;

    if (value.length === 0) {
      node.value = "";
      return;
    }

    const selected = Array.from(node.files ?? []);
    if (value.length !== selected.length || value.some((file, index) => file !== selected[index]))
      throw new Error("File fields cannot restore a nonempty browser selection programmatically.");
  }, [value]);

  return {
    controlId,
    label,
    hint,
    message,
    invalid,
    required,
    disabled,
    inputProps,
    binding: { name: field.name, ref: setRef, onFilesChange: field.onChange, onBlur: field.onBlur },
  };
}
```

## Content

```tsx
"use client";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type { FormFieldFileInputControlProps, FormFieldRegistrationProps } from "../../../../types";

export interface FormFieldFileInputProps<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, readonly File[]> = FieldPathByValue<
    TValues,
    readonly File[]
  >,
>
  extends FormFieldFileInputControlProps, FormFieldRegistrationProps<TValues, TName> {}

import { FormField } from "../../../molecules/FormField";
import { FileInput } from "../../../molecules/FileInput";
import { useFormFieldFileInput } from "./useFormFieldFileInput";

export function FormFieldFileInput<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, readonly File[]> = FieldPathByValue<
    TValues,
    readonly File[]
  >,
>(props: FormFieldFileInputProps<TValues, TName>) {
  const view = useFormFieldFileInput(props);

  return (
    <FormField controlId={view.controlId} label={view.label} hint={view.hint} error={view.message}>
      <FileInput
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
- Valid nested readonly File[] field paths compile; unknown or incompatible paths and competing registration props fail typechecking.
- User changes update the field once; blur marks touched, invalid submit focuses the visible control, and an error without a message still sets invalid state.
- Initial defaults, reset, setValue, disabled submission and conditional unmount follow the provider policy without cross-form ID/value leakage.
- Verify the FileInput-specific value and interaction scenarios in the acceptance criteria, including SSR and a targeted browser check for the actual focus target and native/compound behavior.

## Criteria

- [x] Use one caller-owned FormProvider and preserve FormFieldInput's organization: a named generic Props interface, a colocated useFormFieldFileInput view hook called at the top of render, and existing DS presentation. No nested useForm, feature APIs or RHF imports in atoms/molecules.
- [x] Restrict name to FieldPathByValue for the declared form input type, including nested paths. Keep native/presentation adapter interfaces in design-system/types/form-field-organisms.ts, exported through the type barrel; component-local Props extend those canonical interfaces and FormFieldRegistrationProps.
- [x] Implement the useController channel for FileInput; the registered input type is `readonly File[]`.
- [x] Use an array-of-File RHF input with default []; FileInput remains uncontrolled and receives no value/defaultValue. Send onFilesChange to RHF once; do not also register an onChange value channel.
- [x] Reset to [] clears the actual native input using value="" through the adapter ref. Browser security prevents restoring a nonempty selection with setValue/reset: support empty resets only and fail explicitly on nonempty programmatic replacement, leaving valid user selections intact.
- [x] Forward accept/multiple, but file type/size/count validation is schema-owned and no upload/network request runs in the DS. Cancellation must not manufacture a change; compare selection/clear outcomes with the browser's native events.
- [x] Disabled follows RHF submission semantics. Native file inputs have no readOnly mode; FormView must reject readOnly for an enabled file field rather than silently disabling it and changing submitted values. Do not access File/FileList constructors during SSR.
- [x] RHF owns value/defaultValue, name, change/blur, disabled and registration ref. Do not expose competing channels or register the same field twice. Schema/resolver validation, transforms, localization and submission remain caller-owned.
- [x] Preserve exact-field errors, including invalid state without a string message and an explicitly supplied translated error. Merge external and mounted hint/error description IDs once; label the actual focus target or group and keep generated IDs independent between forms.
- [x] Forward RHF focus to the actual editable control or enabled option, never a hidden input, decorative wrapper or non-focusable fieldset. Reset, setValue, dirty/touched and conditional unmount follow the caller's RHF policy.
- [x] FormView integration uses the explicit renderer kind specified below and strictly typed per-kind metadata. Both form and fields modes preserve caller-owned submission and reject incompatible schema inputs at compile time. Use `kind="file"`.
- [x] Use existing visual recipes and primitive behavior without new CSS or popup/selection/mask implementations. Retain supported native and visual capabilities; do not spread unsupported readOnly or fullWidth props onto a primitive.
- [x] Support deterministic static rendering without browser globals at module evaluation. The component and renderer kind are exported and documented in the availability catalog after verification.
- [x] Format only task-touched supported files using .prettierrc.json and .prettierignore, apply ESLint fixes only to touched JS/TS files, rerun read-only formatting/lint checks, typechecks and relevant established form/control tests before DONE.

