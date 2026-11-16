---
title: "List"
scope: "Presentation-only List with explicit public parts and caller-owned data/actions."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# List

## Files

```text
design-system/components/molecules/List/List.module.css (M)
features/showcase/examples/List.example.tsx (M)
features/showcase/examples/useListExampleCopy.ts (C)
features/showcase/examples/ListExamples.module.css (C)
features/showcase/examples/ListContentExamples.tsx (C)
features/showcase-v2/components/List/definition.ts (C)
features/showcase-v2/components/List/List.example.tsx (C)
features/showcase-v2/components/List/useListExample.ts (C)
features/showcase-v2/components/List/usage-code.ts (C)
features/showcase-v2/components/List/fixtures.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Compound part collection](../../helpers/tech-compound-parts.sc.md)
- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [tech-animations.sc.md](../../styles/animations/tech-motion-recipes.sc.md)
- [tech-collection-contracts.sc.md](../../types/tech-collection-contracts.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [ListHeader](../atoms/ListHeader.sc.md)
- [ListBody](../atoms/ListBody.sc.md)
- [ListFooter](../atoms/ListFooter.sc.md)

## Contract

```tsx
import { Heading, List, ListHeader, ListBody, ListItem, ListFooter, Text } from "@forge-ui/web";

<List>
  <ListHeader><Heading level={4}>Results</Heading></ListHeader>
  <ListBody><ListItem>First result</ListItem><ListItem>Second result</ListItem></ListBody>
  <ListFooter><Text as="p">Two results available</Text></ListFooter>
</List>
```

## Styles

```css
.root {
  composes: stack from "../../../styles/layout-components.module.css";
  min-inline-size: var(--zero);
  padding: var(--space-3);
  color: var(--color-text-default);
}

.root[hidden] {
  display: none;
}
```

## Hooks

```ts
"use client";

import { useId } from "react";
import type { ListProps } from "./List";

export function useList(input: ListProps) {
  const { children, className, label, ...props } = input;
  const titleId = useId();
  return { children, className, props, titleId, label };
}
```

## Content

```ts
"use client";

import { createContext, useContext } from "react";

export interface ListContextValue { titleId?: string; label?: string; }
export const ListContext = createContext<ListContextValue | null>(null);

export function useListContext() {
  const context = useContext(ListContext);
  if (!context) throw new Error("List parts must be rendered inside List.");
  return context;
}
```

```tsx
"use client";

import type { NativeSectionRootProps } from "../../../types/collection-contracts";
import type { ComponentChildrenProps } from "../../../types/compound-composition";
import { collectCompoundParts } from "../../../helpers/compound";
import { ListContext } from "../../../internal/list/ListContext";
import { ListHeader } from "../../atoms/ListHeader";
import { ListBody } from "../../atoms/ListBody";
import { ListFooter } from "../../atoms/ListFooter";
import { useList } from "./useList";
import styles from "./List.module.css";

export interface ListProps extends NativeSectionRootProps, ComponentChildrenProps {
  label?: string;
}

export function List(props: ListProps) {
  const view = useList(props);
  const parts = collectCompoundParts(view.children, { header: ListHeader, body: ListBody, footer: ListFooter }, ["body"]);
  return (
    <ListContext value={{ titleId: parts.header ? view.titleId : undefined, label: view.label }}>
      <section
        {...view.props}
        className={[styles.root, view.className].filter(Boolean).join(" ")}
        data-gap="2"
        aria-labelledby={parts.header ? view.titleId : undefined}
        aria-label={parts.header ? undefined : view.label}
      >
        {parts.header}
        {parts.body}
        {parts.footer}
      </section>
    </ListContext>
  );
}
```

## Tests

- Footer composition uses the existing inline recipe through native `data-justify="end"` on ListFooter and its owned gap/wrap; do not nest a shrinking action row or add a DS justify prop. Minimal code preserves the same owner layout.

- V2 Indexed content list: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Server rendering forwards native attributes/classes and produces deterministic semantic regions.
- Missing required Body, duplicate/unknown regions and orphan contextual parts fail clearly.
- Optional Header/Footer add no empty wrapper; Header IDs stay scoped.

## Criteria

- [x] Given custom item content, native ul/li hierarchy is preserved and no listbox role is added.
- [x] The label contract uses undefined; visible Header or label when region naming is useful.
- [x] The children contract uses One Body and optional Header/Footer.
- [x] Empty Body is a valid empty list; caller may replace it with EmptyState.
- [x] Use data-gap="2" on the owned stack.
- [x] Semantic child controls reuse existing Button/Input/Surface recipes; do not copy their palette or sizing selectors.

- [x] Root owns --space-3 padding and existing --space-2 region gaps; no Card surface, selection state or listbox semantics are introduced.
- [x] Complete and empty-list examples remain in the root entry; empty content is represented by an empty native ul and an optional sibling Footer message.
- [x] Dedicated example copy provides pt-BR, es and en without modifying the shared example dictionary or the DS public API.
- [x] Native hidden continues to hide required minimal context, including regions that compose a flex recipe.
- [x] Integrated visual verification confirms atomic isolation, native list hierarchy, spacing, image sizing and narrow-width layout in the running Showcase.

- [x] V2 **Indexed content list**: Compose ListHeader/Body/Footer with three ListItems, Heading/Text and a local action; caller-owned filtering preserves Children 1..3 and can show empty content without adding unsupported List props.
- [x] The List V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useListExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
