---
title: "Option"
scope: "Select compound part: Option. No independent family state machine."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# Option

## Files

```text
design-system/components/atoms/Option/Option.tsx (C)
design-system/components/atoms/Option/Option.module.css (C)
design-system/components/atoms/Option/index.ts (C)
design-system/index.ts (M)
features/showcase/examples/Option.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
features/showcase-v2/components/Option/definition.ts (C)
features/showcase-v2/components/Option/Option.example.tsx (C)
features/showcase-v2/components/Option/useOptionExample.ts (C)
features/showcase-v2/components/Option/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)

## Contract

```tsx
import { Select, Option } from "@forge-ui/web";
<Select aria-label="Preference"><Option value="first">First</Option></Select>;
```

## Styles

```css
.root {
  min-inline-size: var(--zero);
  padding: var(--space-2);
  color: var(--color-text-default);
}
```

## Content

```tsx
import type { ComponentPropsWithRef } from "react";
import styles from "./Option.module.css";
export interface OptionProps extends ComponentPropsWithRef<"option"> { value: string; }
export function Option({ children, className, ...props }: OptionProps) {
  return <option {...props} className={[styles.root, className].filter(Boolean).join(" ")}>{children}</option>;
}
```

## Tests

- V2 Indexed native selection: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Verify native option attributes/value/children/ref are forwarded without wrappers or motion capability.
- Verify native Select and selector adapters preserve Option semantics and native keyboard selection.

## Criteria

- [x] Given Option, Native option is a reusable atom for native Select and selector adapters.
- [x] The children contract uses Native React content; only allowed semantic descendants.
- [x] The value contract uses Required stable item identity, unique within its root.
- [x] The Native attrs contract uses Forward to semantic owner; relationship/role attributes supplied by context take precedence.
- [x] The Missing region contract uses Owner omits it; no generated empty wrapper.
- [x] Native option is a reusable atom for native Select and selector adapters.
- [x] Native select must receive Option components directly, with no region wrappers.
- [x] Header/Body/Footer naming describes composition responsibility, not an automatic HTML landmark.
- [x] A semantic heading is explicit; do not introduce section landmarks for every item.
- [x] Use existing atom recipes when composing Button, Input, Checkbox, Radio, Heading or Tag.
- [x] No new tokens, size axis or timing constants.
- [x] Native Option and pure layout/text primitives do not receive an invented animation axis.

- [x] V2 **Indexed native selection**: Compose Select/FormField with three Options labeled Children 1..3 and stable item-1..3 values; change selection and report native value while the contextual Option page links to Select.
- [x] The Option V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useOptionExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
