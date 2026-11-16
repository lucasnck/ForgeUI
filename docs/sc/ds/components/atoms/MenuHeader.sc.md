---
title: "MenuHeader"
scope: "Menu compound part: MenuHeader. No independent family state machine."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# MenuHeader

## Files

```text
features/showcase/examples/useMenuAtomicExample.ts (C)
design-system/components/atoms/MenuHeader/MenuHeader.tsx (C)
design-system/components/atoms/MenuHeader/MenuHeader.module.css (C)
design-system/components/atoms/MenuHeader/index.ts (C)
design-system/internal/menu/MenuContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/MenuHeader.example.tsx (M)
features/showcase/examples/Menu.example.tsx (M)
features/showcase/model/showcase-registry.ts (M)
design-system/components/atoms/MenuHeader/useMenuHeader.ts (C)
features/showcase-v2/components/MenuHeader/definition.ts (C)
features/showcase-v2/components/MenuHeader/MenuHeader.example.tsx (C)
features/showcase-v2/components/MenuHeader/useMenuHeaderExample.ts (C)
features/showcase-v2/components/MenuHeader/usage-code.ts (C)
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
import { Menu, MenuBody, MenuHeader } from "@forge-ui/web";
<Menu label="Actions" onAction={runAction}><MenuHeader>Actions</MenuHeader><MenuBody hidden /></Menu>;
```

## Styles

```css
.root { min-inline-size: var(--zero); padding: var(--space-2); border-block-end: var(--border-width-thin) solid var(--color-border-default); }
```

## Hooks

```tsx
"use client";
import { useMenuContext } from "../../../internal/menu/MenuContext";
import type { MenuHeaderProps } from "./MenuHeader";
export function useMenuHeader(input: MenuHeaderProps) { useMenuContext(); return input; }
```

## Content

```tsx
"use client";
import type { ComponentPropsWithRef } from "react";
import { useMenuHeader } from "./useMenuHeader";
import styles from "./MenuHeader.module.css";
export interface MenuHeaderProps extends ComponentPropsWithRef<"div"> {}
export function MenuHeader(input: MenuHeaderProps) { const { className, ...props } = useMenuHeader(input); return <div {...props} className={[styles.root, className].filter(Boolean).join(" ")} />; }
```

## Tests

- V2 MenuHeader contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- `npm run test:overlays` verifies real React SSR: scoped menu items, one enabled tab stop, omitted closed popup and one named nonmodal dialog panel. Real keyboard, pointer and focus acceptance remain separate.

- Disabled or unregistered items are skipped during the family’s documented keyboard traversal.
- Caller-prevented activation runs no owned selection/action and does not duplicate callbacks.
- Nested scopes and unmount cleanup preserve independent registration and stable relationship ids.

## Criteria

- [x] Given MenuHeader, Header is outside MenuBody role=menu; it is not a selectable menu item.
- [x] The children contract uses Native React content; only allowed semantic descendants.
- [x] The Native attrs contract uses Forward to semantic owner; relationship/role attributes supplied by context take precedence.
- [x] The Missing region contract uses Owner omits it; no generated empty wrapper.
- [x] Header is outside MenuBody role=menu; it is not a selectable menu item.
- [x] Header/Body/Footer naming describes composition responsibility, not an automatic HTML landmark.
- [x] A semantic heading is explicit; do not introduce section landmarks for every item.
- [x] Use existing atom recipes when composing Button, Input, Checkbox, Radio, Heading or Tag.
- [x] No new tokens, size axis or timing constants.
- [x] State, callbacks, native form values and focus update immediately.
- [x] Preserve Header/Body/Footer hierarchy and mount/focus policy from that visual owner.
- [x] Optional sections do not fade independently.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.
- [x] useMenuHeader is colocated with MenuHeader and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] V2 **MenuHeader contextual region**: Render MenuHeader through public Menu with the minimum valid siblings. Use a real Heading or owner title slot with Children/Title text; any decorative icon has an aligned Inline gap="2" row outside heading text. Hide/omit optional siblings only where allowed by the owner; link to the full Menu composition.
- [x] The MenuHeader V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useMenuHeaderExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] Contextual V2 collection data reuses the Menu fixture module listed in Files; part pages do not create a second index/key sequence for the same records.
