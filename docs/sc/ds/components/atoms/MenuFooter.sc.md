---
title: "MenuFooter"
scope: "Menu compound part: MenuFooter. No independent family state machine."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# MenuFooter

## Files

```text
features/showcase/examples/useMenuAtomicExample.ts (C)
design-system/components/atoms/MenuFooter/MenuFooter.tsx (C)
design-system/components/atoms/MenuFooter/MenuFooter.module.css (C)
design-system/components/atoms/MenuFooter/index.ts (C)
design-system/internal/menu/MenuContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/MenuFooter.example.tsx (M)
features/showcase/examples/Menu.example.tsx (M)
features/showcase/model/showcase-registry.ts (M)
design-system/components/atoms/MenuFooter/useMenuFooter.ts (C)
features/showcase-v2/components/MenuFooter/definition.ts (C)
features/showcase-v2/components/MenuFooter/MenuFooter.example.tsx (C)
features/showcase-v2/components/MenuFooter/useMenuFooterExample.ts (C)
features/showcase-v2/components/MenuFooter/usage-code.ts (C)
features/showcase-v2/components/Menu/fixtures.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [tech-roving-focus.sc.md](../../hooks/tech-roving-focus.sc.md)

## Contract

```tsx
import { Menu, MenuBody, MenuFooter } from "@forge-ui/web";
<Menu label="Actions" onAction={runAction}><MenuBody hidden /><MenuFooter>Additional information</MenuFooter></Menu>;
```

## Styles

```css
.root { min-inline-size: var(--zero); padding: var(--space-2); border-block-start: var(--border-width-thin) solid var(--color-border-default); }
```

## Hooks

```tsx
"use client";
import { useMenuContext } from "../../../internal/menu/MenuContext";
import type { MenuFooterProps } from "./MenuFooter";
export function useMenuFooter(input: MenuFooterProps) { useMenuContext(); return input; }
```

## Content

```tsx
"use client";
import type { ComponentPropsWithRef } from "react";
import { useMenuFooter } from "./useMenuFooter";
import styles from "./MenuFooter.module.css";
export interface MenuFooterProps extends ComponentPropsWithRef<"div"> {}
export function MenuFooter(input: MenuFooterProps) { const { className, ...props } = useMenuFooter(input); return <div {...props} className={[styles.root, className].filter(Boolean).join(" ")} />; }
```

## Tests

- V2 MenuFooter contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- `npm run test:overlays` verifies real React SSR: scoped menu items, one enabled tab stop, omitted closed popup and one named nonmodal dialog panel. Real keyboard, pointer and focus acceptance remain separate.

- Disabled or unregistered items are skipped during the family’s documented keyboard traversal.
- Caller-prevented activation runs no owned selection/action and does not duplicate callbacks.
- Nested scopes and unmount cleanup preserve independent registration and stable relationship ids.

## Criteria

- [x] Given MenuFooter, Footer is outside the role=menu interior; actions keep normal Tab behavior and do not join menu arrow navigation.
- [x] The children contract uses Native React content; only allowed semantic descendants.
- [x] The Native attrs contract uses Forward to semantic owner; relationship/role attributes supplied by context take precedence.
- [x] The Missing region contract uses Owner omits it; no generated empty wrapper.
- [x] Footer is outside the role=menu interior; actions keep normal Tab behavior and do not join menu arrow navigation.
- [x] Header/Body/Footer naming describes composition responsibility, not an automatic HTML landmark.
- [x] A semantic heading is explicit; do not introduce section landmarks for every item.
- [x] Use existing atom recipes when composing Button, Input, Checkbox, Radio, Heading or Tag.
- [x] No new tokens, size axis or timing constants.
- [x] State, callbacks, native form values and focus update immediately.
- [x] Preserve Header/Body/Footer hierarchy and mount/focus policy from that visual owner.
- [x] Optional sections do not fade independently.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.
- [x] useMenuFooter is colocated with MenuFooter and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] V2 **MenuFooter contextual region**: Compose Menu and required Body with indexed action items; Footer contains editable Text children="Children" as contextual help. Item activation feedback belongs to Menu onAction rather than invented footer selection controls. Link to the full owning composition.
- [x] The MenuFooter V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useMenuFooterExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] Contextual V2 collection data reuses the Menu fixture module listed in Files; part pages do not create a second index/key sequence for the same records.
