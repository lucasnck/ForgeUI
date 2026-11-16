---
title: "FormFieldFooter"
scope: "FormField compound part: FormFieldFooter. No independent family state machine."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# FormFieldFooter

## Files

```text
design-system/components/molecules/FormFieldFooter/FormFieldFooter.tsx (C)
design-system/components/molecules/FormFieldFooter/FormFieldFooter.module.css (C)
design-system/components/molecules/FormFieldFooter/index.ts (C)
design-system/internal/formfield/FormFieldContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/FormFieldFooter.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
design-system/components/molecules/FormFieldFooter/useFormFieldFooter.ts (C)
design-system/internal/formfield/field-control.ts (C)
../scripts/check-forms.cjs (C)
features/showcase-v2/components/FormFieldFooter/definition.ts (C)
features/showcase-v2/components/FormFieldFooter/FormFieldFooter.example.tsx (C)
features/showcase-v2/components/FormFieldFooter/useFormFieldFooterExample.ts (C)
features/showcase-v2/components/FormFieldFooter/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [FieldHint](../atoms/FieldHint.sc.md)
- [FieldError](../atoms/FieldError.sc.md)

## Contract

```tsx
import { FormField, FormFieldHeader, FormFieldBody, Input, FormFieldFooter } from "@forge-ui/web";
<FormField controlId="name" label="Name"><FormFieldHeader>Name</FormFieldHeader><FormFieldBody><Input /></FormFieldBody><FormFieldFooter hint="Hint" /></FormField>;
```

## Styles

```css
.root {
  composes: stack from "../../../styles/layout-components.module.css";
  --stack-gap: var(--space-1);
  min-inline-size: var(--zero);
}

.root[hidden] { display: none; }
```
## Hooks

```tsx
"use client";

import { useFormFieldContext } from "../../../internal/formfield/FormFieldContext";
import type { FormFieldFooterProps } from "./FormFieldFooter";

export function useFormFieldFooter({ hint, error, children, className, ...props }: FormFieldFooterProps) {
  const context = useFormFieldContext();
  return { context, props, hint, error, children, className, visible: Boolean(hint || error || (children !== undefined && children !== null && typeof children !== "boolean" && children !== "")) };
}
```
## Content

```tsx
"use client";

import type { ComponentPropsWithRef } from "react";
import { FieldHint } from "../../atoms/FieldHint";
import { FieldError } from "../../atoms/FieldError";
import { useFormFieldFooter } from "./useFormFieldFooter";
import styles from "./FormFieldFooter.module.css";

export interface FormFieldFooterProps extends ComponentPropsWithRef<"div"> {
  hint?: string;
  error?: string;
}

export function FormFieldFooter(props: FormFieldFooterProps) {
  const { context, props: footerProps, className, hint, error, children, visible } = useFormFieldFooter(props);
  if (!visible) return null;
  return <div {...footerProps} className={[styles.root, className].filter(Boolean).join(" ")} role={undefined} aria-live={undefined} aria-atomic={undefined}>
    {hint && <FieldHint id={context.hintId}>{hint}</FieldHint>}
    {error && <FieldError id={context.errorId}>{error}</FieldError>}
    {children}
  </div>;
}
```
## Tests

- V2 FormFieldFooter contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- The declared native or controlled value channel forwards one user change while prop updates emit no corrective callback.
- Caller-prevented and composing input does not trigger an owned selection/completion action.
- Two mounted instances preserve independent ids, descriptions and native submission values.

## Criteria

- [x] Given FormFieldFooter, Footer composes FieldHint/FieldError and registers their exact ids with the field context; missing/empty messages render no extra live region.
- [x] The children contract uses Native React content; only allowed semantic descendants.
- [x] The hint / error contract uses undefined; empty values render no message; root reads direct Footer props to derive ids and invalid state.
- [x] The Native attrs contract uses Forward to semantic owner; relationship/role attributes supplied by context take precedence.
- [x] The Missing region contract uses Owner omits it; no generated empty wrapper.
- [x] Footer composes FieldHint/FieldError and registers their exact ids with the field context; missing/empty messages render no extra live region.
- [x] Header/Body/Footer naming describes composition responsibility, not an automatic HTML landmark.
- [x] A semantic heading is explicit; do not introduce section landmarks for every item.
- [x] Use existing atom recipes when composing Button, Input, Checkbox, Radio, Heading or Tag.
- [x] No new tokens, size axis or timing constants.
- [x] State, callbacks, native form values and focus update immediately.
- [x] Preserve Header/Body/Footer hierarchy and mount/focus policy from that visual owner.
- [x] Optional sections do not fade independently.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.
- [x] useFormFieldFooter is colocated with FormFieldFooter and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase displays only this field region in its real public FormField owner, with required sibling regions hidden and native control/description relationships preserved.

- [x] V2 **FormFieldFooter contextual region**: Compose the real FormField/Header/Body and one Input, then FormFieldFooter hint="Hint" and error="Error" under caller controls. Verify generated aria-describedby/error ids and visibility without adding unrelated action buttons or a duplicate live region. Link to the full owning composition.
- [x] The FormFieldFooter V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useFormFieldFooterExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
