---
title: "ListBody"
scope: "List public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# ListBody

## Files

```text
design-system/components/atoms/ListBody/ListBody.module.css (M)
features/showcase/examples/ListBody.example.tsx (M)
features/showcase/examples/useListExampleCopy.ts (C)
features/showcase/examples/ListExamples.module.css (C)
features/showcase/examples/ListContentExamples.tsx (C)
features/showcase-v2/components/ListBody/definition.ts (C)
features/showcase-v2/components/ListBody/ListBody.example.tsx (C)
features/showcase-v2/components/ListBody/useListBodyExample.ts (C)
features/showcase-v2/components/ListBody/usage-code.ts (C)
features/showcase-v2/components/List/fixtures.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [ListItem](ListItem.sc.md)
- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [tech-animations.sc.md](../../styles/animations/tech-motion-recipes.sc.md)
- [tech-collection-contracts.sc.md](../../types/tech-collection-contracts.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [List.sc.md](../molecules/List.sc.md)

## Contract

```tsx
import { List, ListBody, ListItem, Text } from "@forge-ui/web";

<List label="Results">
  <ListBody><ListItem><Text as="p">Lorem ipsum dolor sit amet.</Text></ListItem></ListBody>
</List>
```

## Styles

```css
.root {
  margin: var(--space-0);
  padding-inline-start: var(--space-3);
  min-inline-size: var(--zero);
  color: var(--color-text-default);
  overflow-wrap: anywhere;
}

.root > li + li {
  margin-block-start: var(--space-2);
}

.root[hidden] {
  display: none;
}
```

## Hooks

```ts
"use client";

import { useListContext } from "../../../internal/list/ListContext";
import type { ListBodyProps } from "./ListBody";

export function useListBody(input: ListBodyProps) {
  const { children, className, ...props } = input;
  const context = useListContext();
  return { children, className, props, context };
}
```

## Content

```tsx
"use client";

import { Children, Fragment, isValidElement } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { ListItem } from "../ListItem";
import { useListBody } from "./useListBody";
import styles from "./ListBody.module.css";

export interface ListBodyProps extends ComponentPropsWithRef<"ul"> {}

function validateItems(children: ReactNode): void {
  Children.forEach(children, (child) => {
    if (child === null || child === undefined || typeof child === "boolean") return;
    if (isValidElement<{ children?: ReactNode }>(child) && child.type === Fragment) {
      validateItems(child.props.children);
      return;
    }
    if (!isValidElement(child) || child.type !== ListItem) {
      throw new Error("ListBody accepts only ListItem children.");
    }
  });
}

export function ListBody(props: ListBodyProps) {
  const view = useListBody(props);
  validateItems(view.children);
  return (
    <ul
      {...view.props}
      className={[styles.root, view.className].filter(Boolean).join(" ")}
      aria-labelledby={view.context.titleId}
      aria-label={view.context.titleId ? undefined : view.context.label}
    >
      {view.children}
    </ul>
  );
}
```

## Tests

- V2 ListBody contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Server rendering forwards native attributes/classes and produces deterministic semantic regions.
- Missing required Body, duplicate/unknown regions and orphan contextual parts fail clearly.
- Optional Header/Footer add no empty wrapper; Header IDs stay scoped.

## Criteria

- [x] Given ListBody, Body owns ul; only ListItem li outputs are direct semantic children.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Body owns ul; only ListItem li outputs are direct semantic children.
- [x] Header/Footer remain outside the list.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] useListBody is colocated with ListBody and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required public family context and distinct content variations, without duplicating the complete-family preview.

- [x] Body-only previews show Lorem ipsum and image plus text exclusively inside real ListItem children of the native ul; Header and Footer are omitted.
- [x] Adjacent li children use --space-2 separation while preserving the native list marker indentation.
- [x] Dedicated example copy provides pt-BR, es and en without modifying the shared example dictionary or the DS public API.
- [x] Native hidden continues to hide required minimal context, including regions that compose a flex recipe.
- [x] Integrated visual verification confirms atomic isolation, native list hierarchy, spacing, image sizing and narrow-width layout in the running Showcase.

- [x] V2 **ListBody contextual region**: Render ListBody through public List with the minimum valid siblings. Show Text children="Children" or the actual owner-generated options/records, preserving required siblings and owner semantics. Hide/omit optional siblings only where allowed by the owner; link to the full List composition.
- [x] The ListBody V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useListBodyExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] Contextual V2 collection data reuses the List fixture module listed in Files; part pages do not create a second index/key sequence for the same records.
