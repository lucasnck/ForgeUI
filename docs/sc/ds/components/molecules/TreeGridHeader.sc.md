---
title: "TreeGridHeader"
scope: "TreeGrid public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# TreeGridHeader

## Files

```text
features/showcase/examples/GridPartExamples.tsx (C)
design-system/components/molecules/TreeGridHeader/TreeGridHeader.tsx (C)
design-system/components/molecules/TreeGridHeader/TreeGridHeader.module.css (C)
design-system/components/molecules/TreeGridHeader/index.ts (C)
design-system/internal/treegrid/TreeGridContext.ts (C)
design-system/internal/treegrid/validateParts.ts (C)
design-system/index.ts (M)
features/showcase/examples/TreeGridHeader.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
design-system/components/molecules/TreeGridHeader/useTreeGridHeader.ts (C)
features/showcase-v2/components/TreeGridHeader/definition.ts (C)
features/showcase-v2/components/TreeGridHeader/TreeGridHeader.example.tsx (C)
features/showcase-v2/components/TreeGridHeader/useTreeGridHeaderExample.ts (C)
features/showcase-v2/components/TreeGridHeader/usage-code.ts (C)
features/showcase-v2/components/TreeGrid/fixtures.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [tech-animations.sc.md](../../styles/animations/tech-motion-recipes.sc.md)
- [tech-collection-contracts.sc.md](../../types/tech-collection-contracts.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [TreeGrid.sc.md](../organisms/TreeGrid.sc.md)
- [TreeGridColumnHeader](../atoms/TreeGridColumnHeader.sc.md)

## Contract

```tsx
import { TreeGrid, TreeGridBody, TreeGridHeader } from "@forge-ui/web";
<TreeGrid label="Resources" nodes={[]} columns={columns} getNodeLabel={getNodeLabel}><TreeGridHeader /><TreeGridBody hidden /></TreeGrid>;
```

## Styles

```css
.root { min-inline-size: var(--zero); color: var(--color-text-default); }

.root[hidden] { display: none; }
```

## Hooks

```tsx
"use client";
import { useTreeGridContext } from "../../../internal/treegrid/TreeGridContext";
import type { TreeGridHeaderProps } from "./TreeGridHeader";
export function useTreeGridHeader(input: TreeGridHeaderProps) { const { children, className, ...props } = input; const grid = useTreeGridContext();
  return { props, className, children, grid }; }
```

## Content

```tsx
"use client";
import type { ComponentPropsWithRef } from "react";
import { TreeGridColumnHeader } from "../../atoms/TreeGridColumnHeader";
import { validateTreeGridHeaders } from "../../../internal/treegrid/validateParts";
import { useTreeGridHeader } from "./useTreeGridHeader";
import styles from "./TreeGridHeader.module.css";
export interface TreeGridHeaderProps extends ComponentPropsWithRef<"thead"> {
}
export function TreeGridHeader(props: TreeGridHeaderProps) { const view = useTreeGridHeader(props); return <thead {...view.props} role="rowgroup" className={[styles.root, view.className].filter(Boolean).join(" ")}><tr role="row">{view.children == null ? view.grid.columns.map(column => <TreeGridColumnHeader key={column.key} columnKey={column.key} label={column.header} />) : validateTreeGridHeaders(view.children, view.grid.columns.map(column => column.key), TreeGridColumnHeader)}</tr></thead>; }
```

## Tests

- V2 TreeGridHeader contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Actual browser verification covers cell-only arrows, RTL bounds, accepted controlled collapse repairing descendant focus to the ancestor/current column without callbacks, and 12 locale/theme combinations preserving row count and one tab stop.

- `npm run test:overlays` verifies actual React SSR semantics and family guards.
- `npm run test:hooks` verifies keyboard control and focus repair; browser validation is separate.
- Disabled or unregistered items are skipped during the family’s documented keyboard traversal.
- Caller-prevented activation runs no owned selection/action and does not duplicate callbacks.
- Nested scopes and unmount cleanup preserve independent registration and stable relationship ids.

## Criteria

- [x] Given TreeGridHeader, Header owns native table section hierarchy and maps only the canonical ColumnHeader parts; it must never put a generic div under table/tr.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Header owns native table section hierarchy and maps only the canonical ColumnHeader parts; it must never put a generic div under table/tr.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] useTreeGridHeader is colocated with TreeGridHeader and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] V2 **TreeGridHeader contextual region**: Render public TreeGrid with its required Body and Header from a real two-column schema using Header 1..2. Demonstrate the generated header/cell role through supported column sorting/navigation, without orphan columns, fabricated Heading children or private context. Link to the owner composition.
- [x] The TreeGridHeader V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useTreeGridHeaderExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] Contextual V2 collection data reuses the TreeGrid fixture module listed in Files; part pages do not create a second index/key sequence for the same records.
