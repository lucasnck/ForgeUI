---
title: "FormFieldBody"
scope: "FormField compound part: FormFieldBody. No independent family state machine."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# FormFieldBody

## Files

```text
design-system/components/atoms/FormFieldBody/FormFieldBody.tsx (C)
design-system/components/atoms/FormFieldBody/FormFieldBody.module.css (C)
design-system/components/atoms/FormFieldBody/index.ts (C)
design-system/internal/formfield/FormFieldContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/FormFieldBody.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
design-system/components/atoms/FormFieldBody/useFormFieldBody.ts (C)
design-system/internal/formfield/field-control.ts (C)
../scripts/check-forms.cjs (C)
features/showcase-v2/components/FormFieldBody/definition.ts (C)
features/showcase-v2/components/FormFieldBody/FormFieldBody.example.tsx (C)
features/showcase-v2/components/FormFieldBody/useFormFieldBodyExample.ts (C)
features/showcase-v2/components/FormFieldBody/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)

## Contract

```tsx
import { FormField, FormFieldHeader, FormFieldBody, Input, FormFieldFooter } from "@forge-ui/web";
<FormField controlId="name" label="Name"><FormFieldHeader>Name</FormFieldHeader><FormFieldBody><Input /></FormFieldBody><FormFieldFooter hint="Hint" /></FormField>;
```

## Styles

```css
.root {
  min-inline-size: var(--zero);
}
```
## Hooks

```tsx
"use client";

import { Fragment, isValidElement } from "react";
import { useFormFieldContext } from "../../../internal/formfield/FormFieldContext";
import { fieldControlAttributes } from "../../../internal/formfield/field-control";
import type { FieldControlProps } from "../../../internal/formfield/field-control";
import type { FormFieldBodyProps } from "./FormFieldBody";

export function useFormFieldBody({ children, className, ...props }: FormFieldBodyProps) {
  const context = useFormFieldContext();
  if (!isValidElement<FieldControlProps>(children) || children.type === Fragment) throw new Error("FormFieldBody requires one id/ARIA-forwarding control.");
  return { props, className, control: children, attributes: fieldControlAttributes(children, context) };
}
```
## Content

```tsx
"use client";

import { cloneElement } from "react";
import type { ComponentPropsWithRef } from "react";
import { useFormFieldBody } from "./useFormFieldBody";
import styles from "./FormFieldBody.module.css";

export interface FormFieldBodyProps extends ComponentPropsWithRef<"div"> {}

export function FormFieldBody(props: FormFieldBodyProps) {
  const { props: bodyProps, className, control, attributes } = useFormFieldBody(props);
  return <div {...bodyProps} className={[styles.root, className].filter(Boolean).join(" ")}>{cloneElement(control, attributes)}</div>;
}
```
## Tests

- V2 FormFieldBody contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- The declared native or controlled value channel forwards one user change while prop updates emit no corrective callback.
- Caller-prevented and composing input does not trigger an owned selection/completion action.
- Two mounted instances preserve independent ids, descriptions and native submission values.

## Criteria

- [x] Given FormFieldBody, Body contains exactly one ref/id/ARIA-forwarding control and merges field descriptions at that explicit boundary, without arbitrary descendant traversal.
- [x] The children contract uses Native React content; only allowed semantic descendants.
- [x] The Native attrs contract uses Forward to semantic owner; relationship/role attributes supplied by context take precedence.
- [x] The Missing region contract uses Owner omits it; no generated empty wrapper.
- [x] Body contains exactly one ref/id/ARIA-forwarding control and merges field descriptions at that explicit boundary, without arbitrary descendant traversal.
- [x] Header/Body/Footer naming describes composition responsibility, not an automatic HTML landmark.
- [x] A semantic heading is explicit; do not introduce section landmarks for every item.
- [x] Use existing atom recipes when composing Button, Input, Checkbox, Radio, Heading or Tag.
- [x] No new tokens, size axis or timing constants.
- [x] State, callbacks, native form values and focus update immediately.
- [x] Preserve Header/Body/Footer hierarchy and mount/focus policy from that visual owner.
- [x] Optional sections do not fade independently.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.
- [x] useFormFieldBody is colocated with FormFieldBody and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase displays only this field region in its real public FormField owner, with required sibling regions hidden and native control/description relationships preserved.

- [x] V2 **FormFieldBody contextual region**: Render FormFieldBody through public FormField with the minimum valid siblings. Show Text children="Children" or the actual owner-generated options/records, preserving required siblings and owner semantics. Hide/omit optional siblings only where allowed by the owner; link to the full FormField composition.
- [x] The FormFieldBody V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useFormFieldBodyExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
