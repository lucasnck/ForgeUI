---
title: "FormFieldMaskedInput"
scope: "Masked input binding that keeps canonical form values independent of display masking"
status: "PENDING"
type: "component"
ds-level: "organisms"
---

# FormFieldMaskedInput

## Files

```text
design-system/components/organisms/Form/FormFieldMaskedInput/FormFieldMaskedInput.tsx (C)
design-system/components/organisms/Form/FormFieldMaskedInput/useFormFieldMaskedInput.ts (C)
design-system/components/organisms/Form/FormFieldMaskedInput/index.ts (C)
design-system/components/organisms/Form/index.ts (M)
design-system/index.ts (M)
design-system/types/form-field-organisms.ts (M)
design-system/types/forms.test.ts (M)
features/showcase/examples/FormAdapters.example.tsx (C)
features/showcase/examples/useFormAdaptersExample.ts (C)
features/showcase/model/showcase-registry.ts (M)
```

## Dependencies

- [FormField](../../molecules/FormField.sc.md)
- [RHF integration](../../../../tech-react-hook-form.sc.md)
- [Form registration types](../../../types/tech-form-field-organisms.sc.md)
- [MaskedInput](../../molecules/MaskedInput.sc.md)

## Contract

```tsx
import { FormFieldMaskedInput } from "@forge-ui/web";
<FormFieldMaskedInput name="fieldName" label="Field label" mask="000-00" />;
```

## Tests

- `node scripts/check-form-view.cjs`: real RHF adapters, SSR, field ordering, error relationships, reset, unregister and focus delegation.
- Showcase V1: default and alternate/error compositions registered.
- Four authentication forms render with exactly one native form in pt-BR, en and es; the token container retains submission ownership.
- Browser keyboard, hydration and visual verification remain pending.

- Mask editing, caret, parsing, reset, blur, invalid values, copy/paste and normalization.
- Type-safe nested FieldPath and invalid-path rejection.
- FormProvider absence, independent repeated instances, reset and conditional unmount.

## Criteria

- [x] Consumes the existing DS primitive and FormField without recreating visuals.
- [x] Integrates once with the caller-owned React Hook Form context; no nested useForm.
- [ ] Preserves accessible label, focus, hint/error relationships, keyboard behavior and native semantics.
- [x] Props and value channel match the actual existing primitive signature and RHF field type.
- [x] Builds in supported static/SSR rendering and does not access browser APIs during render.
- [x] Only touched supported files pass Prettier, ESLint, typechecking and relevant component tests.
