---
title: "ListBoxBody"
scope: "ListBox public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# ListBoxBody

## Files

```text
features/showcase/examples/useListBoxAtomicExample.ts (C)
design-system/components/molecules/ListBoxBody/ListBoxBody.tsx (C)
design-system/components/molecules/ListBoxBody/ListBoxBody.module.css (C)
design-system/components/molecules/ListBoxBody/index.ts (C)
design-system/internal/listbox/ListBoxContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/ListBoxBody.example.tsx (M)
features/showcase/model/showcase-registry.ts (M)
design-system/components/molecules/ListBoxBody/useListBoxBody.ts (C)
features/showcase-v2/components/ListBoxBody/definition.ts (C)
features/showcase-v2/components/ListBoxBody/ListBoxBody.example.tsx (C)
features/showcase-v2/components/ListBoxBody/useListBoxBodyExample.ts (C)
features/showcase-v2/components/ListBoxBody/usage-code.ts (C)
features/showcase-v2/components/ListBox/fixtures.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
features/showcase-v2/model/grid-list-control-options.ts (C)
features/showcase-v2/model/showcase-v2-control-options.ts (M)
features/showcase-v2/components/ListBox/useListBoxPreview.ts (C)
```

## Dependencies

- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [tech-animations.sc.md](../../styles/animations/tech-motion-recipes.sc.md)
- [tech-collection-contracts.sc.md](../../types/tech-collection-contracts.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [ListBox.sc.md](../organisms/ListBox.sc.md)
- [ListBoxItem](../atoms/ListBoxItem.sc.md)

## Contract

```tsx
import { ListBox, ListBoxBody } from "@forge-ui/web";
<ListBox label="Options" options={[{ value: "one", label: "First option" }]}><ListBoxBody /></ListBox>;
```

## Styles

```css
.root { composes: stack from "../../../styles/layout-components.module.css"; composes: interactive from "../../../styles/interactive-components.module.css"; margin: var(--zero); padding: var(--zero); list-style: none; }

.root[hidden] { display: none; }
```

## Hooks

```tsx
"use client";
import { useImperativeHandle } from "react";
import { useListBoxContext } from "../../../internal/listbox/ListBoxContext";
import type { ListBoxBodyProps } from "./ListBoxBody";
export function useListBoxBody(input: ListBoxBodyProps) {
  const { ref, className, children: ignoredChildren, ...props } = input;
  if (ignoredChildren != null) throw new Error("ListBoxBody owns option rendering.");
  const list = useListBoxContext();
  useImperativeHandle(ref, () => list.bodyRef.current!, [list.bodyRef]);
  const fallback = !list.options.some((option) => !option.disabled) || list.disabled;
  return { props, className, bodyRef: list.bodyRef, options: list.options, id: list.listboxId, label: list.label, describedBy: list.describedBy, multiple: list.selectionMode === "multiple", invalid: list.invalid, fallback };
}
```

## Content

```tsx
"use client";
import type { ComponentPropsWithRef } from "react";
import { ListBoxItem } from "../../atoms/ListBoxItem";
import { useListBoxBody } from "./useListBoxBody";
import styles from "./ListBoxBody.module.css";
export interface ListBoxBodyProps extends ComponentPropsWithRef<"ul"> {}
export function ListBoxBody(input: ListBoxBodyProps) {
  const { props, className, bodyRef, options, id, label, describedBy, multiple, invalid, fallback } = useListBoxBody(input);
  return <ul {...props} ref={bodyRef} id={id} role="listbox" aria-label={label} aria-describedby={describedBy} aria-multiselectable={multiple || undefined} aria-invalid={invalid} tabIndex={fallback ? 0 : undefined} className={[styles.root, className].filter(Boolean).join(" ")}>{options.map((option) => <ListBoxItem key={option.value} value={option.value} label={option.label} disabled={option.disabled} />)}</ul>;
}
```

## Tests

- V2 ListBoxBody contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- `npm run test:overlays` verifies real React SSR: one listbox owner, canonical options, selected hidden values, named empty fallback and outside-family failure. Browser keyboard/FormData/reset acceptance remains separate.

- Disabled or unregistered items are skipped during the family’s documented keyboard traversal.
- Caller-prevented activation runs no owned selection/action and does not duplicate callbacks.
- Nested scopes and unmount cleanup preserve independent registration and stable relationship ids.

## Criteria

- [x] Given ListBoxBody, Body is the only listbox role owner; map canonical option parts.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Body is the only listbox role owner; map canonical option parts.
- [x] Header/Footer are outside role=listbox; no nested actions within options.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] useListBoxBody is colocated with ListBoxBody and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] V2 **ListBoxBody contextual region**: Render ListBoxBody through public ListBox with the minimum valid siblings. Show Text children="Children" or the actual owner-generated options/records, preserving required siblings and owner semantics. Hide/omit optional siblings only where allowed by the owner; link to the full ListBox composition.
- [x] The ListBoxBody V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useListBoxBodyExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] Contextual V2 collection data reuses the ListBox fixture module listed in Files; part pages do not create a second index/key sequence for the same records.

- [x] Public ListBoxOption descriptors forward canonical visual fields to generated ListBoxItem while existing ChoiceOption data remains assignable and selection/native form behavior stays intact.
