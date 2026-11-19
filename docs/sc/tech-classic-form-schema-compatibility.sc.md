---
title: "Classic form schema compatibility"
scope: "Preserve typed field configuration and FormView with classic Zod 3 and Zod 4 schemas"
status: "PENDING"
type: "type"
ds-level: "none"
---

# Classic form schema compatibility

## Files

```text
web/library/src/support/forms/form-config.ts (M)
web/library/src/support/forms/form-config.types.ts (M)
web/library/src/design-system/components/organisms/Form/FormView/FormView.tsx (M)
```

## Dependencies

- [Form configuration](tech-form-config.sc.md)
- [Configuration types](tech-form-config-types.sc.md)

## Contract

Accept maps of classic Zod schemas with their public methods, independent of the changed core-only ZodRawShape alias in v4. Retain field-specific inferred inputs, validation, cloned defaults, rendering metadata and FormView resolver output generics. No runtime validation is removed.

## Tests

- Library and portal typecheck pass on the existing Zod 3 dependency.
- The same source typechecks in PraticarFront with Zod 4.6.7 and preserves field renderer inference and distinct parsed outputs.
- Form adapter and resolver regressions pass; preserve source before-images in the reconciliation ledger.

## Criteria

- [ ] Classic-schema constraints work on both versions.
- [ ] Existing defaults, validation and rendering contracts retained.
- [ ] Source provenance reconciled without overwriting baseline evidence.
