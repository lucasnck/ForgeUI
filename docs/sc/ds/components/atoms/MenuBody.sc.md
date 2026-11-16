---
title: "MenuBody"
scope: "Menu compound part: MenuBody. No independent family state machine."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# MenuBody

## Files

```text
features/showcase/examples/useMenuAtomicExample.ts (C)
design-system/components/atoms/MenuBody/MenuBody.tsx (C)
design-system/components/atoms/MenuBody/MenuBody.module.css (C)
design-system/components/atoms/MenuBody/index.ts (C)
design-system/internal/menu/MenuContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/MenuBody.example.tsx (M)
features/showcase/examples/Menu.example.tsx (M)
features/showcase/model/showcase-registry.ts (M)
design-system/components/atoms/MenuBody/useMenuBody.ts (C)
features/showcase-v2/components/MenuBody/definition.ts (C)
features/showcase-v2/components/MenuBody/MenuBody.example.tsx (C)
features/showcase-v2/components/MenuBody/useMenuBodyExample.ts (C)
features/showcase-v2/components/MenuBody/usage-code.ts (C)
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
import { Menu, MenuBody, MenuItem } from "@forge-ui/web";
<Menu label="Actions" onAction={runAction}><MenuBody><MenuItem value="download" label="Download"/></MenuBody></Menu>;
```

## Styles

```css
.root { composes: stack from "../../../styles/layout-components.module.css"; composes: interactive from "../../../styles/interactive-components.module.css"; list-style: none; margin: var(--zero); padding: var(--space-1); }

.root[hidden] { display: none; }
```

## Hooks

```tsx
"use client";
import { useImperativeHandle } from "react";
import { useMenuContext } from "../../../internal/menu/MenuContext";
import type { MenuBodyProps } from "./MenuBody";
export function useMenuBody(input: MenuBodyProps) {
  const { className, ref, onKeyDown, ...props } = input;
  const menu = useMenuContext();
  useImperativeHandle(ref, () => menu.bodyRef.current!, [menu.bodyRef]);
  const handleKeyDown: NonNullable<MenuBodyProps["onKeyDown"]> = (event) => {
    onKeyDown?.(event); if (event.defaultPrevented) return;
    menu.focus.onKeyDown(event);
  };
  return { props, className, bodyRef: menu.bodyRef, label: menu.label, fallback: menu.fallback, handleKeyDown };
}
```

## Content

```tsx
"use client";
import type { ComponentPropsWithRef } from "react";
import { useMenuBody } from "./useMenuBody";
import styles from "./MenuBody.module.css";
export interface MenuBodyProps extends ComponentPropsWithRef<"ul"> {}
export function MenuBody(input: MenuBodyProps) {
  const { props, className, bodyRef, label, fallback, handleKeyDown } = useMenuBody(input);
  return <ul {...props} ref={bodyRef} role="menu" aria-label={label} tabIndex={fallback ? 0 : undefined} className={[styles.root, className].filter(Boolean).join(" ")} onKeyDown={handleKeyDown} />;
}
```

## Tests

- V2 MenuBody contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- `npm run test:overlays` verifies real React SSR: scoped menu items, one enabled tab stop, omitted closed popup and one named nonmodal dialog panel. Real keyboard, pointer and focus acceptance remain separate.

- Disabled or unregistered items are skipped during the family’s documented keyboard traversal.
- Caller-prevented activation runs no owned selection/action and does not duplicate callbacks.
- Nested scopes and unmount cleanup preserve independent registration and stable relationship ids.

## Criteria

- [x] Given MenuBody, Body owns the list ul role=menu and its accessible label; only MenuItem components become direct semantic li children.
- [x] The children contract uses Native React content; only allowed semantic descendants.
- [x] The Native attrs contract uses Forward to semantic owner; relationship/role attributes supplied by context take precedence.
- [x] The required Body must be supplied; the owner rejects incomplete composition. Optional Header/Footer regions are omitted without generated empty wrappers.
- [x] Body owns the list ul role=menu and its accessible label; only MenuItem components become direct semantic li children.
- [x] Header/Body/Footer naming describes composition responsibility, not an automatic HTML landmark.
- [x] A semantic heading is explicit; do not introduce section landmarks for every item.
- [x] Use existing atom recipes when composing Button, Input, Checkbox, Radio, Heading or Tag.
- [x] No new tokens, size axis or timing constants.
- [x] State, callbacks, native form values and focus update immediately.
- [x] Preserve Header/Body/Footer hierarchy and mount/focus policy from that visual owner.
- [x] Optional sections do not fade independently.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.
- [x] useMenuBody is colocated with MenuBody and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] V2 **MenuBody contextual region**: Render MenuBody through public Menu with the minimum valid siblings. Show Text children="Children" or the actual owner-generated options/records, preserving required siblings and owner semantics. Hide/omit optional siblings only where allowed by the owner; link to the full Menu composition.
- [x] The MenuBody V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useMenuBodyExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] Contextual V2 collection data reuses the Menu fixture module listed in Files; part pages do not create a second index/key sequence for the same records.
