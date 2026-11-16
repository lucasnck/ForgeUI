---
title: "FieldError"
scope: "Extract FormField error into a reusable paragraph Atom"
status: "DONE"
type: "component"
ds-level: "atoms"
---

# FieldError

## Files

```text
design-system/components/static-components.contracts.test.ts (C)
../scripts/check-static-components.cjs (C)
design-system/components/atoms/FieldError/FieldError.tsx (M)
design-system/components/atoms/FieldError/FieldError.module.css (M)
design-system/components/atoms/FieldError/index.ts (M)
design-system/index.ts (M)
features/showcase/examples/FieldError.example.tsx (M)
features/showcase/examples/control-variations.ts (M)
features/showcase/examples/useExampleCopy.ts (M)
features/showcase/examples/ShowcaseExamples.module.css (M)
features/showcase/model/showcase-registry.ts (M)
../scripts/check-design-system.cjs (M)
features/showcase-v2/components/FieldError/definition.ts (C)
features/showcase-v2/components/FieldError/FieldError.example.tsx (C)
features/showcase-v2/components/FieldError/useFieldErrorExample.ts (C)
features/showcase-v2/components/FieldError/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [Typography](../../styles/tech-typography.sc.md)
- [Typography contracts](../../types/tech-typography-contracts.sc.md)

## Contract

```tsx
import { FieldError } from "@forge-ui/web";
<FieldError id="email-error" announce={false}>Enter a valid email</FieldError>;
```

## Styles

```css
.root {
  composes: text size tone weight from "../../../styles/text-components.module.css";
}
```

## Content

```tsx
import type { HTMLAttributes, ReactElement, RefAttributes } from "react";
import type {
  ComponentTextSizeProps,
  ComponentTextToneProps,
  ComponentFontWeightProps,
} from "../../../types/typography";

export interface FieldErrorProps
  extends HTMLAttributes<HTMLParagraphElement>, RefAttributes<HTMLParagraphElement>,
    ComponentTextSizeProps,
    ComponentTextToneProps,
    ComponentFontWeightProps {
  announce?: boolean;
}
import styles from "./FieldError.module.css";

export function FieldError({
  children,
  className,
  role,
  announce = true,
  size = "sm",
  tone = "danger",
  weight = "regular",
  ...props
}: FieldErrorProps): ReactElement {
  return (
    <p
      {...props}
      className={[styles.root, className].filter(Boolean).join(" ")}
      role={role ?? (announce ? "alert" : undefined)}
      data-text-size={size}
      data-text-tone={tone}
      data-text-weight={weight}
    >
      {children}
    </p>
  );
}
```

## Tests

- V2 Connected field description: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

## Criteria

- [x] Description IDs and invalid-control state stay caller-owned; updates expose the intended message.
- [x] All existing text sizes/tones/weights, long messages and announce true/false are demonstrated without duplicate announcements.
- [x] Exactly one Atom registration exists in Showcase; examples cover its supported public capabilities.
- [x] Lint, type, token and static-export checks pass; canonical interfaces/recipes are reused.
- [x] Caller owns validation state and localized text; rendering the message does not set control invalidity.
- [x] The Defaults contract uses size sm, tone danger, weight regular, announce true.
- [x] The Constraint 2 contract uses announce=false adds no automatic role; consumer may own form-level live announcements.
- [x] The Constraint 3 contract uses Consumer supplies id for aria-describedby and omits empty messages..
- [x] Defaults are those in Signature.
- [x] No CSS in Integration or duplicated error selectors.
- [x] Native Option and pure layout/text primitives do not receive an invented animation axis.

- [x] V2 **Connected field description**: Compose the required Input/FormField or native fieldset context from this Contract; connect unique ids and show prop-name text, then verify label focus and hint/error relationships without duplicate announcements.
- [x] The FieldError V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useFieldErrorExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
