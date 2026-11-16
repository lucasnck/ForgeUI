---
title: "FormHeader"
scope: "Form public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# FormHeader

## Files

```text
design-system/components/atoms/FormHeader/FormHeader.module.css (M)
features/showcase/examples/FormHeader.example.tsx (M)
features/showcase/examples/useFormAtomicExample.ts (C)
features/showcase/examples/FormAtomicExamples.module.css (C)
features/showcase-v2/components/FormHeader/definition.ts (C)
features/showcase-v2/components/FormHeader/FormHeader.example.tsx (C)
features/showcase-v2/components/FormHeader/useFormHeaderExample.ts (C)
features/showcase-v2/components/FormHeader/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
features/showcase-v2/model/form-grid-control-options.ts (C)
features/showcase-v2/model/showcase-v2-control-options.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [Form](../organisms/Form.sc.md)

## Contract

```tsx
import { Form, FormBody, FormHeader, Heading } from "@forge-ui/web";

<Form aria-label="Contact details" onValidSubmit={saveForm}>
  <FormHeader><Heading level={4}>Contact details</Heading></FormHeader>
  <FormBody hidden />
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
import type { FormHeaderProps } from "./FormHeader";

export function useFormHeader({ children, className, ...props }: FormHeaderProps) {
  const context = useFormPresentationContext();
  return { context, props, className, children };
}
```

## Content

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { useFormHeader } from "./useFormHeader";
import styles from "./FormHeader.module.css";

export interface FormHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export function FormHeader(input: FormHeaderProps) {
  const { props, className, children } = useFormHeader(input);
  return (
    <div {...props} className={[styles.root, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
```

## Tests

- V2 FormHeader contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Require the scoped Form presentation context without a React Hook Form provider.
- Forward native attributes/classes and render no page Header/Footer landmarks.
- Scope busy feedback to Body and optional status feedback to the existing Footer only.
- Preserve required Header and Body identities in each public preview; hide unrelated required regions and never nest forms.

## Criteria

- [x] Given FormHeader, Header is a scoped Form region; provide visible title content with an explicit Heading where a semantic heading is needed.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Header is a scoped Form region; provide visible title content with an explicit Heading where a semantic heading is needed.
- [x] No independent state store or route landmark is created.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] useFormHeader is colocated with FormHeader and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.


- [x] Showcase demonstrates this component independently with only the public Form context and supported content variations, without rendering the complete FormExample.

- [x] Header-only examples show title and decorative icon plus title with Heading level=4; the required real FormBody is hidden and Footer omitted; the required-Body guard remains unchanged.
- [x] Flex regions honor native hidden through explicit CSS; parts use --space-2 gaps without duplicating root padding.
- [x] Dedicated atomic example copy covers pt-BR, es and en without modifying the shared example dictionary or DS public contracts.
- [x] Integrated verification confirms atomic isolation, spacing, narrow-width layout and preserved form interaction in the running Showcase.

- [x] V2 **FormHeader contextual region**: Render FormHeader through public Form with the minimum valid siblings. Use a real Heading or owner title slot with Children/Title text; any decorative icon has an aligned Inline gap="2" row outside heading text. Hide/omit optional siblings only where allowed by the owner; link to the full Form composition.
- [x] The FormHeader V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useFormHeaderExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.

- [x] The header-only V2 preview does not display submission counters for actions that are absent; Properties edits update the real Heading content and native title.
