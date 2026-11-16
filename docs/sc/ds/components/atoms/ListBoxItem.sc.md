---
title: "ListBoxItem"
scope: "ListBox public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# ListBoxItem

## Files

```text
features/showcase/examples/useListBoxAtomicExample.ts (C)
design-system/components/atoms/ListBoxItem/ListBoxItem.tsx (C)
design-system/components/atoms/ListBoxItem/ListBoxItem.module.css (C)
design-system/components/atoms/ListBoxItem/index.ts (C)
design-system/internal/listbox/ListBoxContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/ListBoxItem.example.tsx (M)
features/showcase/examples/ListBox.example.tsx (M)
../scripts/check-hooks.cjs (M)
features/showcase/model/showcase-registry.ts (M)
design-system/components/atoms/ListBoxItem/useListBoxItem.ts (C)
features/showcase-v2/components/ListBoxItem/definition.ts (C)
features/showcase-v2/components/ListBoxItem/ListBoxItem.example.tsx (C)
features/showcase-v2/components/ListBoxItem/useListBoxItemExample.ts (C)
features/showcase-v2/components/ListBoxItem/usage-code.ts (C)
features/showcase-v2/components/ListBox/fixtures.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
features/showcase-v2/model/grid-list-control-options.ts (C)
features/showcase-v2/model/showcase-v2-control-options.ts (M)
features/showcase-v2/components/ListBox/useListBoxPreview.ts (C)
```

## Dependencies

- [Visual capabilities](../../types/tech-component-capabilities.sc.md)
- [Selection descriptors](../../types/tech-selection-navigation.sc.md)
- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [tech-animations.sc.md](../../styles/animations/tech-motion-recipes.sc.md)
- [tech-collection-contracts.sc.md](../../types/tech-collection-contracts.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [tech-listbox-state.sc.md](../../hooks/tech-listbox-state.sc.md)
- [ListBox.sc.md](../organisms/ListBox.sc.md)

## Contract

```tsx
import { ListBox, ListBoxBody } from "@forge-ui/web";
<ListBox label="Options" options={[{ value: "one", label: "First option", size: "md", tone: "brand", appearance: "ghost", shape: "rounded" }]}><ListBoxBody /></ListBox>;
```

## Styles

```css
.root { composes: interactive from "../../../styles/interactive-components.module.css"; composes: stateFeedback from "../../../styles/motion-components.module.css"; padding: var(--space-2); border: var(--border-width-thin) var(--border-style-default) var(--color-transparent); cursor: pointer; }
.root[data-selected="true"] { border-color: var(--color-border-default); background: var(--color-surface-subtle); font-weight: var(--font-weight-semibold); }
.root[aria-disabled="true"] { opacity: var(--opacity-disabled); cursor: not-allowed; }
@media (forced-colors: active) { .root[data-selected="true"] { border-color: var(--color-system-highlight); } }
```

## Animations

```text
stateFeedback
```

## Hooks

```tsx
"use client";
import { useRef, useLayoutEffect, useImperativeHandle } from "react";
import type { ComponentPropsWithRef } from "react";
import { useListBoxContext } from "../../../internal/listbox/ListBoxContext";
import type { ListBoxItemProps } from "./ListBoxItem";
export function useListBoxItem(input: ListBoxItemProps) {
  const { value, label, disabled = false, onFocus, onKeyDown, onClick, ref, className, children, ...props } = input;
  if (children != null || !label.trim()) throw new Error("ListBoxItem uses one plain nonempty label.");
  const list = useListBoxContext();
  const itemRef = useRef<HTMLLIElement>(null);
  useImperativeHandle(ref, () => itemRef.current!, []);
  const blocked = list.disabled || disabled;
  const register = list.focus.registerItem;
  useLayoutEffect(() => register({ id: value, ref: itemRef, textValue: label, disabled: blocked }), [register, value, label, blocked]);
  const handleFocus: NonNullable<ComponentPropsWithRef<"li">["onFocus"]> = (event) => { onFocus?.(event); if (!event.defaultPrevented && !blocked) list.focus.onItemFocus(value); };
  const handleKeyDown: NonNullable<ComponentPropsWithRef<"li">["onKeyDown"]> = (event) => { onKeyDown?.(event); if (!event.defaultPrevented) list.onOptionKeyDown(event, value); };
  const handleClick: NonNullable<ComponentPropsWithRef<"li">["onClick"]> = (event) => { onClick?.(event); if (!event.defaultPrevented && !blocked) list.select(value); };
  return { props, itemRef, label, className, blocked, selected: list.isSelected(value), tabIndex: list.focus.tabIndex(value), animated: list.animated, handleFocus, handleKeyDown, handleClick };
}
```

## Content

```tsx
"use client";
import type { NativeWidgetItemProps } from "../../../types";
import { useListBoxItem } from "./useListBoxItem";
import styles from "./ListBoxItem.module.css";
export interface ListBoxItemProps extends NativeWidgetItemProps { value: string; label: string; disabled?: boolean; }
export function ListBoxItem(input: ListBoxItemProps) {
  const { props, itemRef, label, className, blocked, selected, tabIndex, animated, handleFocus, handleKeyDown, handleClick } = useListBoxItem(input);
  return <li {...props} ref={itemRef} role="option" aria-selected={selected} aria-disabled={blocked || undefined} tabIndex={tabIndex} data-selected={selected || undefined} data-animated={animated} className={[styles.root, className].filter(Boolean).join(" ")} onFocus={handleFocus} onKeyDown={handleKeyDown} onClick={handleClick}>{label}</li>;
}
```

## Tests

- V2 Generated listbox item: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- `npm run test:overlays` verifies real React SSR: one listbox owner, canonical options, selected hidden values, named empty fallback and outside-family failure. Browser keyboard/FormData/reset acceptance remains separate.

- Disabled or unregistered items are skipped during the family’s documented keyboard traversal.
- Caller-prevented activation runs no owned selection/action and does not duplicate callbacks.
- Nested scopes and unmount cleanup preserve independent registration and stable relationship ids.

## Criteria

- [x] Given ListBoxItem, Plain visible option label only; no nested buttons/links.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Local fields contract uses Required unless optional in Signature; constraints stated below.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Disabled root/option prevent both keyboard and click acceptance.
- [x] Native focus is independent of aria-selected; selected style includes a border/weight cue separate from focus outline.
- [x] stateFeedback changes selected background/border without delaying focus/selection; forced colors show a visible outline/border.
- [x] useListBoxItem is colocated with ListBoxItem and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] V2 **Generated listbox item**: Use public ListBox options and ListBoxBody with Label 1..3 and stable values. Select an enabled item, skip a disabled one and observe owner selection/native form data; do not construct an orphan ListBoxItem or internal context.
- [x] The ListBoxItem V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useListBoxItemExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] Contextual V2 collection data reuses the ListBox fixture module listed in Files; part pages do not create a second index/key sequence for the same records.

- [x] V2 label edits the original-index option prefix. The disabled editor targets option 1 only; option 2 remains the disabled keyboard fixture. Generated item children/native events are not fabricated or injected.

- [x] ListBoxItem extends canonical VisualProps with md/brand/ghost/rounded defaults; ListBoxOption forwards size/tone/appearance/shape through ListBoxBody without leaking attributes or weakening option semantics.
- [x] V2 Properties edits all four visual axes through ListBoxOption descriptors; selected fill/border/weight remains distinct from focus, disabled items are skipped, reset restores defaults and the copyable snippet demonstrates the public configuration.
