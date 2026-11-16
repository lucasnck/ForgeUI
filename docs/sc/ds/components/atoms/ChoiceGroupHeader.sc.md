---
title: "ChoiceGroupHeader"
scope: "ChoiceGroup compound part: ChoiceGroupHeader. No independent family state machine."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# ChoiceGroupHeader

## Files

```text
design-system/components/atoms/ChoiceGroupHeader/ChoiceGroupHeader.module.css (M)
features/showcase/examples/ChoiceGroupHeader.example.tsx (M)
features/showcase/examples/useChoiceGroupPreview.ts (C)
features/showcase-v2/components/ChoiceGroupHeader/definition.ts (C)
features/showcase-v2/components/ChoiceGroupHeader/ChoiceGroupHeader.example.tsx (C)
features/showcase-v2/components/ChoiceGroupHeader/useChoiceGroupHeaderExample.ts (C)
features/showcase-v2/components/ChoiceGroupHeader/usage-code.ts (C)
features/showcase-v2/model/collection-control-options.ts (C)
features/showcase-v2/model/showcase-v2-control-options.ts (M)
features/showcase-v2/components/ChoiceGroup/fixtures.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)

## Contract

```tsx
import { ChoiceGroup, ChoiceGroupHeader, ChoiceGroupBody } from "@forge-ui/web";
<ChoiceGroup><ChoiceGroupHeader>Preferences</ChoiceGroupHeader><ChoiceGroupBody hidden /></ChoiceGroup>;
```

## Styles

```css
.root {
  min-inline-size: var(--zero);
  padding: var(--space-2);
  overflow-wrap: anywhere;
  color: var(--color-text-default);
}

.root[hidden] {
  display: none;
}
```

## Hooks

```tsx
"use client";

import { useChoiceGroupContext } from "../../../internal/choicegroup/ChoiceGroupContext";
import type { ChoiceGroupHeaderProps } from "./ChoiceGroupHeader";

export function useChoiceGroupHeader({ children, className, ...nativeProps }: ChoiceGroupHeaderProps) {
  const context = useChoiceGroupContext();
  return { context, children, className, nativeProps };
}
```

## Content

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { useChoiceGroupHeader } from "./useChoiceGroupHeader";
import styles from "./ChoiceGroupHeader.module.css";

export interface ChoiceGroupHeaderProps extends HTMLAttributes<HTMLLegendElement> {}

export function ChoiceGroupHeader(props: ChoiceGroupHeaderProps) {
  const { context, children, className, nativeProps } = useChoiceGroupHeader(props);
  return <legend
    {...nativeProps}
    id={context.legendId}
    className={[styles.root, className].filter(Boolean).join(" ")}
  >{children}</legend>;
}
```

## Tests

- V2 ChoiceGroupHeader contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Require the scoped ChoiceGroup owner and preserve native region semantics.
- Verify exactly one first-child legend, stable optional Footer descriptions and isolated instance ids.
- Native attributes and caller content remain on their documented semantic owner.

## Criteria

- [x] Given ChoiceGroupHeader, Header is the first native legend child of fieldset; do not put it inside a layout div.
- [x] The children contract uses Native React content; only allowed semantic descendants.
- [x] The Native attrs contract uses Forward to semantic owner; relationship/role attributes supplied by context take precedence.
- [x] The Missing optional region contract uses Owner omits it; no generated empty wrapper. A convenience legend may replace Header; Body remains required.
- [x] Header is the first native legend child of fieldset; do not put it inside a layout div.
- [x] Header/Body/Footer naming describes composition responsibility, not an automatic HTML landmark.
- [x] A semantic heading is explicit; do not introduce section landmarks for every item.
- [x] Use existing atom recipes when composing Button, Input, Checkbox, Radio, Heading or Tag.
- [x] No new tokens, size axis or timing constants.
- [x] State, callbacks, native form values and focus update immediately.
- [x] Preserve Header/Body/Footer hierarchy and mount/focus policy from that visual owner.
- [x] Optional sections do not fade independently.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.
- [x] useChoiceGroupHeader is colocated with ChoiceGroupHeader and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase isolates text and icon-plus-text legends as the first fieldset child, with a hidden required Body and no Footer.

- [x] Hidden required parts remain display:none; visible parts retain tokenized inset and child spacing appropriate to native form composition.

- [x] V2 **ChoiceGroupHeader contextual region**: Render ChoiceGroupHeader through public ChoiceGroup with the minimum valid siblings. Use a real Heading or owner title slot with Children/Title text; any decorative icon has an aligned Inline gap="2" row outside heading text. Hide/omit optional siblings only where allowed by the owner; link to the full ChoiceGroup composition.
- [x] The ChoiceGroupHeader V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useChoiceGroupHeaderExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] Contextual V2 collection data reuses the ChoiceGroup fixture module listed in Files; part pages do not create a second index/key sequence for the same records.
