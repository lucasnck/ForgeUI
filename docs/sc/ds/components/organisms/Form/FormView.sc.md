---
title: "FormView"
scope: "Configuration-driven RHF field composition while caller owns useForm and submission"
status: "DONE"
type: "component"
ds-level: "organisms"
---

# FormView

## Files

```text
design-system/components/organisms/Form/FormView/useFormView.ts (C)
design-system/components/organisms/Form/FormView/FormView.tsx (C)
design-system/components/organisms/Form/FormView/FormViewField.tsx (C)
design-system/components/organisms/Form/FormView/FormView.module.css (C)
design-system/components/organisms/Form/FormView/index.ts (C)
design-system/components/organisms/Form/index.ts (M)
design-system/index.ts (M)
design-system/types/form-field-organisms.ts (M)
design-system/types/forms.test.ts (M)
features/showcase/examples/FormAdapters.example.tsx (C)
features/showcase/examples/useFormAdaptersExample.ts (C)
features/showcase/model/showcase-registry.ts (M)
../scripts/check-form-field-adapters.cjs (C)
../scripts/fixtures/form-field-adapters.tsx (C)
../scripts/fixtures/form-adapter-upload.txt (C)
../package.json (M)
../.gitignore (M)
```

## Dependencies

- [FormFieldTextarea](FormFieldTextarea.sc.md)
- [FormFieldSwitch](FormFieldSwitch.sc.md)
- [FormFieldNumberInput](FormFieldNumberInput.sc.md)
- [FormFieldPercentageInput](FormFieldPercentageInput.sc.md)
- [FormFieldCurrencyInput](FormFieldCurrencyInput.sc.md)
- [FormFieldDateInput](FormFieldDateInput.sc.md)
- [FormFieldDateTimeInput](FormFieldDateTimeInput.sc.md)
- [FormFieldTimeInput](FormFieldTimeInput.sc.md)
- [FormFieldTelephoneInput](FormFieldTelephoneInput.sc.md)
- [FormFieldUrlInput](FormFieldUrlInput.sc.md)
- [FormFieldSearchInput](FormFieldSearchInput.sc.md)
- [FormFieldColorInput](FormFieldColorInput.sc.md)
- [FormFieldFileInput](FormFieldFileInput.sc.md)
- [FormFieldSlider](FormFieldSlider.sc.md)
- [FormFieldTaxIdInput](FormFieldTaxIdInput.sc.md)
- [FormFieldPostalCodeInput](FormFieldPostalCodeInput.sc.md)
- [FormFieldTokenInput](FormFieldTokenInput.sc.md)
- [FormFieldAutocomplete](FormFieldAutocomplete.sc.md)
- [FormFieldCombobox](FormFieldCombobox.sc.md)
- [FormFieldCheckboxGroup](FormFieldCheckboxGroup.sc.md)
- [FormFieldListBox](FormFieldListBox.sc.md)
- [FormFieldEmailInput](FormFieldEmailInput.sc.md)
- [Form configuration types](../../../../tech-form-config-types.sc.md)
- [FormFieldInput](FormFieldInput.sc.md)
- [FormFieldSelect](FormFieldSelect.sc.md)
- [FormFieldCheckbox](FormFieldCheckbox.sc.md)
- [FormFieldRadioGroup](FormFieldRadioGroup.sc.md)
- [FormFieldPasswordInput](FormFieldPasswordInput.sc.md)
- [FormFieldMaskedInput](FormFieldMaskedInput.sc.md)
- [FormFieldInternationalTelephoneInput](FormFieldInternationalTelephoneInput.sc.md)

## Contract

```tsx
import { FormView } from "@forge-ui/web";
<FormView config={formConfig} methods={methods} onSubmit={onSubmit} />;
```

## Hooks

```ts
"use client";
import { useCallback, useEffect, useId, useRef } from "react";

export function useFormView(idPrefix?: string) {
  const generated = useId();
  const root = useRef<HTMLElement | null>(null);
  const setRoot = useCallback((node: HTMLElement | null) => {
    root.current = node;
  }, []);
  useEffect(() => {
    const node = root.current;
    const form = node?.closest("form");
    if (!node || !form) return;

    function guardDraft(event: Event) {
      const editor = Array.from(
        node!.querySelectorAll<HTMLInputElement>("input[data-form-draft]"),
      ).find((input) => !input.disabled && input.validity.customError);
      if (!editor) return;
      event.preventDefault();
      event.stopPropagation();
      editor.reportValidity();
      editor.focus();
    }

    form.addEventListener("submit", guardDraft, true);
    return () => form.removeEventListener("submit", guardDraft, true);
  });

  return { idPrefix: idPrefix ?? generated, rootRef: setRoot };
}
```

## Tests

- `npm run test:form-adapters`: all 22 added renderer kinds, provider failures, independent IDs and native defaults.
- `node scripts/check-form-view.cjs`: real RHF adapters, SSR, field ordering, error relationships, reset, unregister and focus delegation.
- Showcase V1: default and alternate/error compositions registered.
- Four authentication forms render with exactly one native form in pt-BR, en and es; the token container retains submission ownership.
- Browser keyboard, hydration and visual verification remain pending.

- Text, password, checkbox, select, radio, mask and phone render in configured order.
- Error focus, nested path errors, reset, conditional mounts, disabled and readOnly behavior.
- Caller-owned submit and async API errors, translated labels, keyboard and hydration tests.
- Field-only composition inside TokenChallenge does not create nested form or override the challenge-specific submit lifecycle.
- Missing renderer should fail deterministically; invalid field kind rejected at compile time.

## Criteria

- [x] Implement each of the 21 additional adapter renderer kinds with exhaustive typed routing, distinct primitive composition and exact schema-input defaults. Keep the independently pending email kind and all existing renderer kinds; no generic Input fallback or casts that hide incompatible shapes.
- [x] For compound adapters preserve required owner/body composition, focus bridges, accessible group labels and caller-owned submission. Do not use hidden inputs as RHF focus targets or native submission serialization as the React Hook Form value channel.
- [x] Explicitly reject readOnly for enabled file, slider and listBox fields until their underlying primitive supports the required semantics; do not silently disable fields and omit their submitted values. This also applies when FormView readOnly is set globally. Normal form fields retain their supported readOnly behavior.
- [x] Protect noValidate form submission from CurrencyInput incomplete/invalid drafts even if the last committed MonetaryValue still passes schema validation. Keep draft validity separate from caller errors and do not invent a parallel money parser.
- [x] `kind="textarea"` renders FormFieldTextarea with `string` schema input and the exact presentation settings in its owning SC; cover reset, error focus, invalid-submit prevention and typed metadata consumption.
- [x] `kind="switch"` renders FormFieldSwitch with `boolean` schema input and the exact presentation settings in its owning SC; cover reset, error focus, invalid-submit prevention and typed metadata consumption.
- [x] `kind="number"` renders FormFieldNumberInput with `string` schema input and the exact presentation settings in its owning SC; cover reset, error focus, invalid-submit prevention and typed metadata consumption.
- [x] `kind="percentage"` renders FormFieldPercentageInput with `string` schema input and the exact presentation settings in its owning SC; cover reset, error focus, invalid-submit prevention and typed metadata consumption.
- [x] `kind="currency"` renders FormFieldCurrencyInput with `MonetaryValue` schema input and the exact presentation settings in its owning SC; cover reset, error focus, invalid-submit prevention and typed metadata consumption.
- [x] `kind="date"` renders FormFieldDateInput with `string` schema input and the exact presentation settings in its owning SC; cover reset, error focus, invalid-submit prevention and typed metadata consumption.
- [x] `kind="dateTime"` renders FormFieldDateTimeInput with `string` schema input and the exact presentation settings in its owning SC; cover reset, error focus, invalid-submit prevention and typed metadata consumption.
- [x] `kind="time"` renders FormFieldTimeInput with `string` schema input and the exact presentation settings in its owning SC; cover reset, error focus, invalid-submit prevention and typed metadata consumption.
- [x] `kind="telephone"` renders FormFieldTelephoneInput with `string` schema input and the exact presentation settings in its owning SC; cover reset, error focus, invalid-submit prevention and typed metadata consumption.
- [x] `kind="url"` renders FormFieldUrlInput with `string` schema input and the exact presentation settings in its owning SC; cover reset, error focus, invalid-submit prevention and typed metadata consumption.
- [x] `kind="search"` renders FormFieldSearchInput with `string` schema input and the exact presentation settings in its owning SC; cover reset, error focus, invalid-submit prevention and typed metadata consumption.
- [x] `kind="color"` renders FormFieldColorInput with `string` schema input and the exact presentation settings in its owning SC; cover reset, error focus, invalid-submit prevention and typed metadata consumption.
- [x] `kind="file"` renders FormFieldFileInput with `readonly File[]` schema input and the exact presentation settings in its owning SC; cover reset, error focus, invalid-submit prevention and typed metadata consumption.
- [x] `kind="slider"` renders FormFieldSlider with `number` schema input and the exact presentation settings in its owning SC; cover reset, error focus, invalid-submit prevention and typed metadata consumption.
- [x] `kind="taxId"` renders FormFieldTaxIdInput with `string` schema input and the exact presentation settings in its owning SC; cover reset, error focus, invalid-submit prevention and typed metadata consumption.
- [x] `kind="postalCode"` renders FormFieldPostalCodeInput with `string` schema input and the exact presentation settings in its owning SC; cover reset, error focus, invalid-submit prevention and typed metadata consumption.
- [x] `kind="token"` renders FormFieldTokenInput with `string` schema input and the exact presentation settings in its owning SC; cover reset, error focus, invalid-submit prevention and typed metadata consumption.
- [x] `kind="autocomplete"` renders FormFieldAutocomplete with `string` schema input and the exact presentation settings in its owning SC; cover reset, error focus, invalid-submit prevention and typed metadata consumption.
- [x] `kind="combobox"` renders FormFieldCombobox with `string | null` schema input and the exact presentation settings in its owning SC; cover reset, error focus, invalid-submit prevention and typed metadata consumption.
- [x] `kind="checkboxGroup"` renders FormFieldCheckboxGroup with `readonly string[]` schema input and the exact presentation settings in its owning SC; cover reset, error focus, invalid-submit prevention and typed metadata consumption.
- [x] `kind="listBox"` renders FormFieldListBox with `readonly string[]` schema input and the exact presentation settings in its owning SC; cover reset, error focus, invalid-submit prevention and typed metadata consumption.
- [x] Explicit kind="email" renders FormFieldEmailInput with typed providers/maxSuggestions metadata and translated listboxLabel; generic inputType="email" is not the dedicated email renderer. Preserve inputType compatibility for existing low-level consumers.
- [x] Form and fields modes preserve domain-suggestion keyboard handling, one RHF value channel, caller-owned submission, reset and error-focus behavior. Format/lint only touched supported files and run read-only checks, typechecking and targeted form checks for this extension.
- [x] Receives typed form config, caller-owned RHF methods and submit callback without calling useForm.
- [x] Supports Zod input/output differences without unsafe casts or loss of transformed outputs.
- [x] Uses an exhaustive typed field registry; unsupported component kinds fail explicitly.
- [x] Reuses registered FormField organisms and preserves field order, labels, translation and errors.
- [x] Preserves RHF unregister/reset semantics and does not change page business behavior.
- [x] Supports a caller-owned accessible submit/footer slot and a form-level error region.
- [x] Supports typed `mode="form"` (default) and `mode="fields"` (FormProvider context without a nested HTML form); existing confirmation/token flow retains its native form ownership.
- [x] Doesn't import feature API code; SSR/static rendering and focus behavior are verified.
- [x] Touched-file Prettier/ESLint/typecheck/tests pass before DONE.
