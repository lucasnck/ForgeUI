---
title: "React Hook Form Integration"
scope: "React Hook Form dependency, provider ownership and form lifecycle"
status: "DONE"
type: "hook"
ds-level: "none"
---

# React Hook Form Integration

## Files

```text
features/showcase/components/ShowcaseForm/useShowcaseForm.ts (C)
../package.json (M)
../package-lock.json (M)
../scripts/check-forms.cjs (C)
```

## Dependencies

- [Form configuration](tech-form-config.sc.md)

## Contract

```ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const methods = useForm({ defaultValues, resolver: zodResolver(schema) });
```

## Content

```ts
"use client";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formConfig } from "./form";
import type { FormInput, FormResult } from "./form";

export function useShowcaseForm(onSubmit: SubmitHandler<FormResult>) {
  const submitting = useRef(false);
  const methods = useForm<FormInput, unknown, FormResult>({
    defaultValues: formConfig.defaultValues,
    resolver: zodResolver(formConfig.schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldUnregister: false,
    shouldFocusError: true,
  });
  const validateAndSubmit = methods.handleSubmit(async (data) => { await onSubmit(data); });
  const submit: ReturnType<typeof methods.handleSubmit> = async (event) => {
    if (submitting.current) {
      event?.preventDefault();
      return;
    }
    submitting.current = true;
    try {
      await validateAndSubmit(event);
    } finally {
      submitting.current = false;
    }
  };
  return { methods, submit };
}
```

## Tests

- Invalid input skips the supplied submit callback and focuses the first invalid mounted control.
- A transformed schema sends parsed output while defaults retain input types.
- Awaited submission keeps isSubmitting true until the callback settles.
- Reset, conditional unmount and disabled input follow the specified provider policy.

## Criteria

- [x] A compatible stable dependency is locked, and Architecture records the bounded DS integration decision.
- [x] A client form exposes its methods through a local FormProvider without a global provider or nested provider.
- [x] Invalid submission prevents the save callback and focuses the first invalid mounted control.
- [x] Zod issues appear as RHF field errors; cross-field issues use explicit field paths.
- [x] Schema transforms preserve raw input/default types and deliver parsed output to submission.
- [x] Awaited submission exposes pending state; feature-level controls prevent duplicate saves.
- [x] Reset, conditional removal and disabled-value behavior follow the explicit consumer policy.
- [x] Static export renders without browser access during module evaluation or server actions.
- [x] A local `FormProvider` exposes these methods to registered field organisms.
- [x] No business form is included.
- [x] RHF and Zod are consumed directly; the example view hook stays private to its component module and is absent from public application barrels.
- [x] The Provider contract uses Local to one feature-owned form; pass all `useForm` methods.
- [x] The `mode` / `reValidateMode` contract uses Explicit project baseline: `onSubmit` / `onChange`.
- [x] The `defaultValues` contract uses Feature supplies deterministic values; text fields start with empty strings, never undefined.
- [x] The `shouldUnregister` contract uses `false`; feature explicitly opts into removal for conditional fields.
- [x] The `shouldFocusError` contract uses `true`; each adapter must forward its ref to the actual focusable control.
- [x] The Native form contract uses `noValidate`; RHF owns displayed validation feedback.
- [x] The Validation contract uses Zod schema through zodResolver; no parallel register rules for the same constraints.
- [x] The Types contract uses useForm<z.input<typeof schema>, unknown, z.output<typeof schema>>; defaultValues use input types, submit receives parsed output.
- [x] The Cross-field rules contract uses Feature refines the composed object schema, assigning issue paths to the appropriate field.
- [x] The Zod defaults contract uses Do not replace explicit RHF defaultValues; parsing defaults are separate from mounted UI values.
- [x] The Submission contract uses Feature calls `handleSubmit`; asynchronous callback is awaited and duplicate submissions are blocked by the consumer.
- [x] The Server errors contract uses Feature maps verified errors through `setError`; no invented backend fields.
- [x] The Reset contract uses Explicit `reset(values)` after loading/editing or successful save according to feature policy.
- [x] The Disabled contract uses May omit a field from submitted values; use readOnly when the value must be retained.
- [x] Initial → edited → Control change → RHF stores the value and derives dirty state.
- [x] Untouched → touched → Control blur → RHF marks the field touched.
- [x] Ready → invalid → Invalid submit → Messages appear and the first invalid mounted control receives focus.
- [x] Invalid → valid → Change after submit → Error updates under `reValidateMode`.
- [x] Ready → submitting → settled → Valid submit / callback settles → `isSubmitting` covers the awaited operation; consumer controls pending UI.
- [x] Edited → reset → `reset(values)` → Values, defaults and state follow the library reset options selected by the feature.
