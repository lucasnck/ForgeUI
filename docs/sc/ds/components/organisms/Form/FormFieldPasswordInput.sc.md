---
title: "FormFieldPasswordInput"
scope: "Password entry bound to RHF and FormField using existing PasswordInput"
status: "PENDING"
type: "component"
ds-level: "organisms"
---

# FormFieldPasswordInput

## Files

```text
design-system/components/organisms/Form/FormFieldPasswordInput/FormFieldPasswordInput.tsx (C)
design-system/components/organisms/Form/FormFieldPasswordInput/useFormFieldPasswordInput.ts (C)
design-system/components/organisms/Form/FormFieldPasswordInput/index.ts (C)
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
- [PasswordInput](../../molecules/PasswordInput.sc.md)

## Contract

```tsx
import { FormFieldPasswordInput } from "@forge-ui/web";
<FormFieldPasswordInput name="fieldName" label="Field label" revealLabel="Show password" concealLabel="Hide password" />;
```

## Tests

- `node scripts/check-form-view.cjs`: real RHF adapters, SSR, field ordering, error relationships, reset, unregister and focus delegation.
- Showcase V1: default and alternate/error compositions registered.
- Four authentication forms render with exactly one native form in pt-BR, en and es; the token container retains submission ownership.
- Browser keyboard, hydration and visual verification remain pending.

- Password visibility behavior remains owned by PasswordInput; reset, focus, error and native value registration.
- Type-safe nested FieldPath and invalid-path rejection.
- FormProvider absence, independent repeated instances, reset and conditional unmount.

## Criteria

- [x] Consumes the existing DS primitive and FormField without recreating visuals.
- [x] Integrates once with the caller-owned React Hook Form context; no nested useForm.
- [ ] Preserves accessible label, focus, hint/error relationships, keyboard behavior and native semantics.
- [x] Props and value channel match the actual existing primitive signature and RHF field type.
- [x] Builds in supported static/SSR rendering and does not access browser APIs during render.
- [x] Only touched supported files pass Prettier, ESLint, typechecking and relevant component tests.
