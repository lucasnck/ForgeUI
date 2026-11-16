---
title: "PopupListboxItem"
scope: "PopupListbox compound part: PopupListboxItem. No independent family state machine."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# PopupListboxItem

## Files

```text
design-system/components/atoms/PopupListboxItem/PopupListboxItem.tsx (C)
design-system/components/atoms/PopupListboxItem/PopupListboxItem.module.css (C)
design-system/components/atoms/PopupListboxItem/index.ts (C)
../scripts/check-query-inputs.cjs (C)
design-system/index.ts (M)
features/showcase/examples/PopupListboxItem.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
design-system/components/atoms/PopupListboxItem/usePopupListboxItem.ts (C)
features/showcase-v2/components/PopupListboxItem/definition.ts (C)
features/showcase-v2/components/PopupListboxItem/PopupListboxItem.example.tsx (C)
features/showcase-v2/components/PopupListboxItem/usePopupListboxItemExample.ts (C)
features/showcase-v2/components/PopupListboxItem/usage-code.ts (C)
features/showcase-v2/components/PopupListbox/fixtures.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [Animation contracts](../../types/tech-animation-contracts.sc.md)
- [Popup recipes](../../styles/tech-popup-recipes.sc.md)
- [Motion recipes](../../styles/animations/tech-motion-recipes.sc.md)
- [Popup contracts](../../types/tech-popup-types.sc.md)

## Contract

```tsx
import { PopupListboxItem } from "@forge-ui/web";
<ul {...popup.listboxAttributes}><PopupListboxItem popup={popup} index={0} label="First option"/></ul>;
```

## Styles

```css
.root {
  composes: option from "../../../styles/popup-components.module.css";
  composes: stateFeedback from "../../../styles/motion-components.module.css";
  transition-property: opacity;
}
```

## Animations

```text
stateFeedback
```

## Hooks

```tsx
"use client";

import type { PointerEvent } from "react";
import type { PopupListboxItemProps } from "./PopupListboxItem";

export function usePopupListboxItem({ popup, index, label, onPointerDown, className, animated = true, ...props }: PopupListboxItemProps) {

  function handlePointerDown(event: PointerEvent<HTMLLIElement>) {
    onPointerDown?.(event);
    if (event.defaultPrevented || !popup.isOpen) return;
    event.preventDefault();
    popup.acceptOption(index);
  }
  return { popup, index, label, props, className, animated, handlePointerDown };
}
```

## Content

```tsx
"use client";


import type { NativePopupListboxItemProps, PopupListboxContract } from "../../../types/popup";
import type { ComponentAnimatedProps } from "../../../types/animation";
import { usePopupListboxItem } from "./usePopupListboxItem";
import styles from "./PopupListboxItem.module.css";

export interface PopupListboxItemProps extends NativePopupListboxItemProps, ComponentAnimatedProps {
  popup: PopupListboxContract;
  index: number;
  label: string;
}

export function PopupListboxItem(input: PopupListboxItemProps) {
  const { popup, index, label, props, className, animated, handlePointerDown } = usePopupListboxItem(input);
  return <li {...props} {...popup.optionAttributes(index)} className={[styles.root, className].filter(Boolean).join(" ")} data-animated={animated} onPointerDown={handlePointerDown}>{label}</li>;
}
```

## Tests

- V2 Public popup adapter: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Item forwards native classes and owns popup option id/role/selection; label is plain string and does not allocate another popup.
- Caller pointer handler runs first; cancellation or a closed popup prevents acceptance.
- Colors switch atomically at active/hover changes; only supported opacity feedback can transition, avoiding mismatched text/background frames.

## Criteria

- [x] Given PopupListboxItem, Item is a plain noninteractive role=option element and consumes explicit popup/index rather than constructing a popup.
- [x] The label contract uses a required plain string; children are excluded by the canonical native item contract.
- [x] The Native attrs contract uses Forward to semantic owner; relationship/role attributes supplied by context take precedence.
- [x] The Missing region contract uses Owner omits it; no generated empty wrapper.
- [x] Empty/closed list semantics remain with PopupListbox; no H/B/F wrappers are inserted inside ul role=listbox.
- [x] Header/Body/Footer naming describes composition responsibility, not an automatic HTML landmark.
- [x] A semantic heading is explicit; do not introduce section landmarks for every item.
- [x] Use existing atom recipes when composing Button, Input, Checkbox, Radio, Heading or Tag.
- [x] No new tokens, size axis or timing constants.
- [x] State, callbacks, native form values and focus update immediately.
- [x] inactive ↔ active/selected → Active-descendant attributes and foreground/background change together immediately; supported opacity feedback uses stateFeedback and --motion-fast / --ease-standard.
- [x] Use only the item states supported by its owning contract.
- [x] Native focus and aria-selected/current/expanded/activedescendant update immediately; arrow navigation never waits for motion.
- [x] The item does not allocate a presence/selection clock.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.

- [x] V2 **Public popup adapter**: Use the real usePopupListbox hook, returned trigger/listbox attributes and five indexed items; navigate enabled options and accept one value without importing internal context.
- [x] The PopupListboxItem V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. usePopupListboxItemExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] Contextual V2 collection data reuses the PopupListbox fixture module listed in Files; part pages do not create a second index/key sequence for the same records.
