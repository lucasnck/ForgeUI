---
title: "Typed Form Configuration"
scope: "Object-based field configuration deriving Zod schema, RHF defaults and view props"
status: "DONE"
type: "helper"
ds-level: "none"
---

# Typed Form Configuration

## Files

```text
../scripts/check-helpers.cjs (M)
lib/forms/form-config.ts (M)
lib/forms/index.ts (M)
```

## Dependencies

- [Form configuration types](tech-form-config-types.sc.md)

## Contract

```ts
import { defineFormConfig } from "../../web/library/src/support/forms";
const config = defineFormConfig(fields);
```

## Content

```ts
import { z } from "zod";
import type { FormConfig, FormFieldsConfig } from "./form-config.types";

export function defineFormConfig<TShape extends z.ZodRawShape>(
  fields: FormFieldsConfig<TShape>,
): FormConfig<TShape> {
  const shape: Record<string, z.ZodType> = {};
  const defaults: Record<string, unknown> = {};
  for (const [key, field] of Object.entries(fields)) {
    if (field.name !== key) {
      throw new Error("Form field keys and name literals must match.");
    }
    shape[key] = field.validation;
    defaults[key] = structuredClone(field.defaultValue);
  }
  return {
    fields,
    schema: z.object(shape as TShape),
    defaultValues: defaults as FormConfig<TShape>["defaultValues"],
  };
}
```

## Tests

- Existing flat forms retain schema and structured-clone behavior; kind metadata is returned without alteration.
- Field order is deterministic and invalid metadata fails the accompanying type fixtures.

- A mismatched name/key fails before configuration is returned.
- Empty defaults for required fields build successfully without running validation.
- Mutating a cloned default leaves the field declaration and a separately built configuration unchanged.
- Schema transforms retain raw input defaults and parsed output types.

## Criteria

- [x] `defineFormConfig` passes typed renderer metadata through the returned fields in declaration order without constructing rendered components.
- [x] The helper preserves Zod schema generation, cloned default values and existing input/output inference, including cross-field schemas owned by callers.
- [x] Existing callers continue to work through a documented migration path; the renderer change adds no hidden validation or runtime UI dependency.
- [x] Scoped formatting, linting, typechecks and helper tests pass before this full SC returns to DONE.

- [x] Field names are validated against keys without parsing defaults during configuration construction.
- [x] Schema shape and defaults derive from the same field entries.
- [x] Empty required defaults are accepted; the consumer validation lifecycle decides when errors appear.
- [x] Mutable defaults are cloned and cannot mutate the field declaration object.
- [x] The helper remains pure and imports no application components, infrastructure or transport.
