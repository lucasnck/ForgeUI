---
title: "FormBody"
scope: "Form public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# FormBody

## Files

```text
design-system/components/atoms/FormBody/FormBody.module.css (M)
features/showcase/examples/FormBody.example.tsx (M)
features/showcase/examples/useFormAtomicExample.ts (C)
features/showcase/examples/FormAtomicExamples.module.css (C)
features/showcase-v2/components/FormBody/definition.ts (C)
features/showcase-v2/components/FormBody/FormBody.example.tsx (C)
features/showcase-v2/components/FormBody/useFormBodyExample.ts (C)
features/showcase-v2/components/FormBody/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
features/showcase-v2/model/form-grid-control-options.ts (C)
features/showcase-v2/model/showcase-v2-control-options.ts (M)
features/showcase-v2/components/Form/fixtures.ts (C)
features/showcase-v2/components/Form/useNativeFormExample.ts (C)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [Form](../organisms/Form.sc.md)

## Contract

```tsx
import { Form, FormHeader, FormBody, FormField, Input } from "@forge-ui/web";

<Form aria-label="Contact details" onValidSubmit={saveForm}>
  <FormHeader hidden />
  <FormBody>
    <FormField controlId="contact-name" label="Name"><Input name="name" required /></FormField>
    <FormField controlId="contact-email" label="Email"><Input name="email" type="email" required /></FormField>
  </FormBody>
</Form>
```

## Styles

```css
.root {
  composes: stack from "../../../styles/layout-components.module.css";
  --stack-gap: var(--space-2);
  min-inline-size: var(--zero);
  color: var(--color-text-default);
}

.root[hidden] {
  display: none;
}
```

## Hooks

```tsx
"use client";

import { useFormPresentationContext } from "../../../internal/form/FormContext";
import type { FormBodyProps } from "./FormBody";

export function useFormBody({ children, className, ...props }: FormBodyProps) {
  const context = useFormPresentationContext();
  return { context, props, className, children };
}
```

## Content

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { useFormBody } from "./useFormBody";
import styles from "./FormBody.module.css";

export interface FormBodyProps extends HTMLAttributes<HTMLDivElement> {}

export function FormBody(input: FormBodyProps) {
  const { context, props, className, children } = useFormBody(input);
  return (
    <div
      {...props}
      aria-busy={context.loading || undefined}
      className={[styles.root, className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}
```

## Tests

- V2 FormBody contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Require the scoped Form presentation context without a React Hook Form provider.
- Forward native attributes/classes and render no page Header/Footer landmarks.
- Scope busy feedback to Body and optional status feedback to the existing Footer only.
- Preserve required Header and Body identities in each public preview; hide unrelated required regions and never nest forms.

## Criteria

- [x] Given FormBody, Body scopes busy semantics to actual controls.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Body scopes busy semantics to actual controls.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] useFormBody is colocated with FormBody and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.


- [x] Showcase demonstrates this component independently with only the public Form context and supported content variations, without rendering the complete FormExample.

- [x] Body-only examples show labeled native name/email fields, Lorem ipsum and image plus text in separate minimal Form owners with the required Header hidden and optional Footer omitted.
- [x] Field names, required constraints, native email validation and autocomplete remain native; no second form manager or schema is introduced.
- [x] Flex regions honor native hidden through explicit CSS; parts use --space-2 gaps without duplicating root padding.
- [x] Dedicated atomic example copy covers pt-BR, es and en without modifying the shared example dictionary or DS public contracts.
- [x] Integrated verification confirms atomic isolation, spacing, narrow-width layout and preserved form interaction in the running Showcase.

- [x] V2 **FormBody contextual region**: Render FormBody through public Form with the minimum valid siblings. Show Text children="Children" or the actual owner-generated options/records, preserving required siblings and owner semantics. Hide/omit optional siblings only where allowed by the owner; link to the full Form composition.
- [x] The FormBody V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useFormBodyExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
