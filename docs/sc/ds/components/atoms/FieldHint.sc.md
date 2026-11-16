---
title: "FieldHint"
scope: "Extract FormField hint into a reusable paragraph Atom"
status: "DONE"
type: "component"
ds-level: "atoms"
---

# FieldHint

## Files

```text
design-system/components/static-components.contracts.test.ts (C)
../scripts/check-static-components.cjs (C)
design-system/components/atoms/FieldHint/FieldHint.tsx (M)
design-system/components/atoms/FieldHint/FieldHint.module.css (M)
design-system/components/atoms/FieldHint/index.ts (M)
design-system/index.ts (M)
features/showcase/examples/FieldHint.example.tsx (M)
features/showcase/examples/control-variations.ts (M)
features/showcase/examples/useExampleCopy.ts (M)
features/showcase/examples/ShowcaseExamples.module.css (M)
features/showcase/model/showcase-registry.ts (M)
../scripts/check-design-system.cjs (M)
features/showcase-v2/components/FieldHint/definition.ts (C)
features/showcase-v2/components/FieldHint/FieldHint.example.tsx (C)
features/showcase-v2/components/FieldHint/useFieldHintExample.ts (C)
features/showcase-v2/components/FieldHint/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [Typography](../../styles/tech-typography.sc.md)
- [Typography contracts](../../types/tech-typography-contracts.sc.md)

## Contract

```tsx
import { FieldHint } from "@forge-ui/web";
<FieldHint id="email-hint">Use your work email</FieldHint>;
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

export interface FieldHintProps
  extends HTMLAttributes<HTMLParagraphElement>, RefAttributes<HTMLParagraphElement>,
    ComponentTextSizeProps,
    ComponentTextToneProps,
    ComponentFontWeightProps {}
import styles from "./FieldHint.module.css";

export function FieldHint({
  children,
  className,
  size = "sm",
  tone = "muted",
  weight = "regular",
  ...props
}: FieldHintProps): ReactElement {
  return (
    <p
      {...props}
      className={[styles.root, className].filter(Boolean).join(" ")}
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

- [x] An input describing this ID exposes the correct text; long text wraps.
- [x] All existing text sizes/tones/weights and standalone/described-control compositions are demonstrated.
- [x] Exactly one Atom registration exists in Showcase; examples cover its supported public capabilities.
- [x] Lint, type, token and static-export checks pass; canonical interfaces/recipes are reused.
- [x] The Defaults contract uses size sm, tone muted, weight regular.
- [x] The Constraint 1 contract uses Native paragraph attributes/id/ref are inherited.
- [x] The Constraint 2 contract uses Consumer supplies a stable id and includes it in the control's aria-describedby.
- [x] The Constraint 3 contract uses No automatic live-region role..
- [x] Defaults are those in Signature.
- [x] No copied hint CSS; paragraph margins and typography come from the recipe.
- [x] Native Option and pure layout/text primitives do not receive an invented animation axis.

- [x] V2 **Connected field description**: Compose the required Input/FormField or native fieldset context from this Contract; connect unique ids and show prop-name text, then verify label focus and hint/error relationships without duplicate announcements.
- [x] The FieldHint V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useFieldHintExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
