---
title: "InputAddon"
scope: "Render noninteractive adjacent explanatory text in an InputGroup slot. Excludes inset field chrome, label replacement and actions."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# InputAddon

## Files

```text
design-system/index.ts (M)
design-system/components/molecules/InputAddon/index.ts (C)
design-system/components/molecules/InputAddon/InputAddon.module.css (C)
design-system/components/molecules/InputAddon/InputAddon.tsx (C)
features/showcase/examples/InputAddon.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
../scripts/check-inputs.cjs (C)
features/showcase-v2/components/InputAddon/definition.ts (C)
features/showcase-v2/components/InputAddon/InputAddon.example.tsx (C)
features/showcase-v2/components/InputAddon/useInputAddonExample.ts (C)
features/showcase-v2/components/InputAddon/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [InputGroup.sc.md](InputGroup.sc.md)

## Contract

```tsx
import { InputGroup, InputAddon, Input } from "@forge-ui/web";
<InputGroup trailing={<InputAddon id="duration-unit">minutes</InputAddon>}><Input aria-label="Duration" aria-describedby="duration-unit"/></InputGroup>;
```

## Styles

```css
.root {
  display: inline-flex;
  align-items: center;
  padding-inline: var(--space-2);
  color: var(--color-text-muted);
}
```

## Content

```tsx
import type { HTMLAttributes } from "react";
import styles from "./InputAddon.module.css";

export interface InputAddonProps extends HTMLAttributes<HTMLSpanElement> {}

export function InputAddon({ children, className, ...props }: InputAddonProps) {
  return <span {...props} className={[styles.root, className].filter(Boolean).join(" ")}>{children}</span>;
}
```

## Tests

- V2 Composed input actions: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Render native markup without browser globals and verify no role or keyboard behavior is introduced.
- Preserve the native id and caller content without adding control semantics.

## Criteria

- [x] Given the public props, rendering and callbacks follow the defaults and constraints above; unsupported channels are not added.
- [x] Verify: The addon is not focusable and introduces no role.
- [x] Verify: Meaningful units must be connected using aria-describedby on the actual control.
- [x] Verify: Do not rely on FormField to forward an id through InputGroup; the consumer sets control attributes explicitly.
- [x] Text and focus consume canonical semantic tokens and recipes; shared contrast and forced-color fallbacks are owned by the token/style specifications.
- [x] The owned layout accommodates caller content; preference changes do not reset caller-owned values.
- [x] Given reduced motion, no required interaction depends on animation; no document/window access occurs during module evaluation or static rendering.
- [x] The children contract uses Native optional content; Text or noninteractive content only.
- [x] The aria-hidden contract uses undefined; Set true only for redundant decoration.
- [x] The id contract uses undefined; Required when the control references this explanation.
- [x] The addon is not focusable and introduces no role.
- [x] Do not rely on FormField to forward an id through InputGroup; the consumer sets control attributes explicitly.
- [x] No new tokens, shared recipe or visual value union is introduced by this component.
- [x] Use current semantic token overrides for themes; caller supplies locale text and the component inherits direction.
- [x] Native Option and pure layout/text primitives do not receive an invented animation axis.

- [x] V2 **Composed input actions**: Compose InputGroup/Input/InputAddon with a named trailing clear action; preserve ids/descriptions, independent event feedback and alignment with the input rather than the label/control group.
- [x] The InputAddon V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useInputAddonExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
