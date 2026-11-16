---
title: "Label"
scope: "Extract FormField label markup into a reusable native label"
status: "DONE"
type: "component"
ds-level: "atoms"
---

# Label

## Files

```text
design-system/components/atoms/Label/Label.tsx (M)
design-system/components/atoms/Label/Label.module.css (M)
design-system/components/atoms/Label/index.ts (M)
design-system/index.ts (M)
features/showcase/examples/Label.example.tsx (M)
features/showcase/examples/control-variations.ts (M)
features/showcase/examples/useExampleCopy.ts (M)
features/showcase/examples/ShowcaseExamples.module.css (M)
features/showcase/model/showcase-registry.ts (M)
../scripts/check-design-system.cjs (M)
features/showcase-v2/components/Label/definition.ts (C)
features/showcase-v2/components/Label/Label.example.tsx (C)
features/showcase-v2/components/Label/useLabelExample.ts (C)
features/showcase-v2/components/Label/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [Typography](../../styles/tech-typography.sc.md)
- [Typography contracts](../../types/tech-typography-contracts.sc.md)

## Contract

```tsx
import { Label } from "@forge-ui/web";
<Label htmlFor="email" required>Email</Label>;
```

## Styles

```css
.root {
  composes: text size tone weight from "../../../styles/text-components.module.css";
}
```

## Content

```tsx
import type { LabelHTMLAttributes, ReactElement } from "react";
import type { ComponentTextSizeProps, ComponentTextToneProps, ComponentFontWeightProps, } from "../../../types";
import styles from "./Label.module.css";
export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement>, ComponentTextSizeProps, ComponentTextToneProps, ComponentFontWeightProps {
  htmlFor: string;
  required?: boolean;
}
export function Label({ children, className, htmlFor, required = false, size = "md", tone = "default", weight = "semibold", ...props }: LabelProps): ReactElement {
  return (<label {...props} className={[styles.root, className].filter(Boolean).join(" ")} htmlFor={htmlFor} data-text-size={size} data-text-tone={tone} data-text-weight={weight}>
   {children}
   {required && <span aria-hidden="true"> *</span>}
  </label>);
}
```

## Tests

- V2 Connected field description: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

## Criteria

- [x] Clicking the label focuses its labelable control; marker creates no duplicate announcement.
- [x] All existing text sizes/tones/weights and required/optional variants are demonstrated.
- [x] Exactly one Atom registration exists in Showcase; examples cover its supported public capabilities.
- [x] Lint, type, token and static-export checks pass; canonical interfaces/recipes are reused.
- [x] Consumer owns localized content and native required validity; the visual marker does not modify the control.
- [x] The Defaults contract uses htmlFor required; size md, tone default, weight semibold, required false.
- [x] The Constraint 1 contract uses Native label attributes/ref remain inherited.
- [x] The Constraint 2 contract uses Explicit text size/tone/weight override defaults.
- [x] The Constraint 3 contract uses Children supplies visible text..
- [x] Defaults are those in Signature.
- [x] No duplicate label styles.
- [x] Native Option and pure layout/text primitives do not receive an invented animation axis.

- [x] V2 **Connected field description**: Compose the required Input/FormField or native fieldset context from this Contract; connect unique ids and show prop-name text, then verify label focus and hint/error relationships without duplicate announcements.
- [x] The Label V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useLabelExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
