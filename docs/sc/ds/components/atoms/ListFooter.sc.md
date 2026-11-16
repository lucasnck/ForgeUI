---
title: "ListFooter"
scope: "List public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# ListFooter

## Files

```text
design-system/components/atoms/ListFooter/ListFooter.module.css (M)
features/showcase/examples/ListFooter.example.tsx (M)
features/showcase/examples/useListExampleCopy.ts (C)
features/showcase/examples/ListExamples.module.css (C)
features/showcase/examples/ListContentExamples.tsx (C)
features/showcase-v2/components/ListFooter/definition.ts (C)
features/showcase-v2/components/ListFooter/ListFooter.example.tsx (C)
features/showcase-v2/components/ListFooter/useListFooterExample.ts (C)
features/showcase-v2/components/ListFooter/usage-code.ts (C)
features/showcase-v2/components/List/fixtures.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [tech-animations.sc.md](../../styles/animations/tech-motion-recipes.sc.md)
- [tech-collection-contracts.sc.md](../../types/tech-collection-contracts.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [List.sc.md](../molecules/List.sc.md)

## Contract

```tsx
import { Button, List, ListBody, ListFooter } from "@forge-ui/web";

<List label="Results">
  <ListBody hidden />
  <ListFooter><Button onClick={showDetails}>Show details</Button></ListFooter>
</List>
```

## Styles

```css
.root {
  composes: inline from "../../../styles/layout-components.module.css";
  --inline-gap: var(--space-2);
  --inline-wrap: wrap;
  min-inline-size: var(--zero);
  color: var(--color-text-default);
  overflow-wrap: anywhere;
}

.root[hidden] {
  display: none;
}
```

## Hooks

```ts
"use client";

import { useListContext } from "../../../internal/list/ListContext";
import type { ListFooterProps } from "./ListFooter";

export function useListFooter(input: ListFooterProps) {
  const { children, className, ...props } = input;
  const context = useListContext();
  return { children, className, props, context };
}
```

## Content

```tsx
"use client";

import type { ComponentPropsWithRef } from "react";
import { useListFooter } from "./useListFooter";
import styles from "./ListFooter.module.css";

export interface ListFooterProps extends ComponentPropsWithRef<"footer"> {}

export function ListFooter(props: ListFooterProps) {
  const view = useListFooter(props);
  return (
    <footer {...view.props} className={[styles.root, view.className].filter(Boolean).join(" ")} >
      {view.children}
    </footer>
  );
}
```

## Tests

- Footer composition uses the existing inline recipe through native `data-justify="between"` on ListFooter and its owned gap/wrap; do not nest a shrinking action row or add a DS justify prop. Minimal code preserves the same owner layout.

- V2 ListFooter contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Server rendering forwards native attributes/classes and produces deterministic semantic regions.
- Missing required Body, duplicate/unknown regions and orphan contextual parts fail clearly.
- Optional Header/Footer add no empty wrapper; Header IDs stay scoped.

## Criteria

- [x] Given ListFooter, Footer is a scoped List region; render optional caller actions/messages without adding a live role.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Footer is a scoped List region; render optional caller actions/messages without adding a live role.
- [x] No independent state store or route landmark is created.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] useListFooter is colocated with ListFooter and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required public family context and distinct content variations, without duplicating the complete-family preview.

- [x] Footer-only previews show summary text, actions and actions plus composed Divider with a real required hidden ListBody and no Header.
- [x] Example actions toggle local details through aria-expanded and aria-controls without fetching or mutating the list.
- [x] Dedicated example copy provides pt-BR, es and en without modifying the shared example dictionary or the DS public API.
- [x] Native hidden continues to hide required minimal context, including regions that compose a flex recipe.
- [x] Integrated visual verification confirms atomic isolation, native list hierarchy, spacing, image sizing and narrow-width layout in the running Showcase.

- [x] V2 **ListFooter contextual region**: Compose List and required Body with six stable indexed records. Footer shows visible-count feedback and a caller-owned Show more Button, initially revealing three records; showing the rest preserves original item labels and keys. Link to the full owning composition.
- [x] The ListFooter V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useListFooterExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] Contextual V2 collection data reuses the List fixture module listed in Files; part pages do not create a second index/key sequence for the same records.
