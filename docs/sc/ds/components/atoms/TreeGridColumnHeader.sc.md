---
title: "TreeGridColumnHeader"
scope: "TreeGrid public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# TreeGridColumnHeader

## Files

```text
features/showcase/examples/GridPartExamples.tsx (C)
design-system/components/atoms/TreeGridColumnHeader/TreeGridColumnHeader.tsx (C)
design-system/components/atoms/TreeGridColumnHeader/TreeGridColumnHeader.module.css (C)
design-system/components/atoms/TreeGridColumnHeader/index.ts (C)
design-system/internal/treegrid/TreeGridContext.ts (C)
design-system/internal/treegrid/validateParts.ts (C)
design-system/index.ts (M)
design-system/types/tree-grid.contracts.test.ts (C)
features/showcase/examples/TreeGridColumnHeader.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
design-system/components/atoms/TreeGridColumnHeader/useTreeGridColumnHeader.ts (C)
features/showcase-v2/components/TreeGridColumnHeader/definition.ts (C)
features/showcase-v2/components/TreeGridColumnHeader/TreeGridColumnHeader.example.tsx (C)
features/showcase-v2/components/TreeGridColumnHeader/useTreeGridColumnHeaderExample.ts (C)
features/showcase-v2/components/TreeGridColumnHeader/usage-code.ts (C)
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

## Contract

```tsx
import { TreeGrid, TreeGridBody, TreeGridHeader } from "@forge-ui/web";
<TreeGrid label="Resources" nodes={[]} columns={columns} getNodeLabel={getNodeLabel}><TreeGridHeader /><TreeGridBody hidden /></TreeGrid>;
```

## Styles

```css
.root { padding: var(--space-2); text-align: start; min-inline-size: var(--zero); color: var(--color-text-default); }
```

## Hooks

```tsx
"use client";
import { useTreeGridContext } from "../../../internal/treegrid/TreeGridContext";
import type { TreeGridColumnHeaderProps } from "./TreeGridColumnHeader";
export function useTreeGridColumnHeader(input: TreeGridColumnHeaderProps) { const { columnKey, label, className, ...props } = input; const grid = useTreeGridContext(); if (!grid.columns.some(column => column.key === columnKey) || !label.trim() || ("children" in input && input.children != null)) throw new Error("TreeGridColumnHeader requires a root column and plain label."); return { props, className, columnKey, label, grid }; }
```

## Content

```tsx
"use client";
import type { NativeTreeGridColumnHeaderProps } from "../../../types";
import { useTreeGridColumnHeader } from "./useTreeGridColumnHeader";
import styles from "./TreeGridColumnHeader.module.css";
export interface TreeGridColumnHeaderProps extends NativeTreeGridColumnHeaderProps {
  columnKey: string;
  label: string;
}
export function TreeGridColumnHeader(props: TreeGridColumnHeaderProps) { const view = useTreeGridColumnHeader(props); return <th {...view.props} role="columnheader" scope="col" id={view.grid.headerId(view.columnKey)} tabIndex={undefined} className={[styles.root, view.className].filter(Boolean).join(" ")}>{view.label}</th>; }
```

## Tests

- V2 TreeGridColumnHeader contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Actual browser verification covers cell-only arrows, RTL bounds, accepted controlled collapse repairing descendant focus to the ancestor/current column without callbacks, and 12 locale/theme combinations preserving row count and one tab stop.

- `npm run test:overlays` verifies actual React SSR semantics and family guards.
- `npm run test:hooks` verifies keyboard control and focus repair; browser validation is separate.
- Disabled or unregistered items are skipped during the family’s documented keyboard traversal.
- Caller-prevented activation runs no owned selection/action and does not duplicate callbacks.
- Nested scopes and unmount cleanup preserve independent registration and stable relationship ids.

## Criteria

- [x] Given TreeGridColumnHeader, Native column header with columnheader role; no sorting/action/tabstop is promised in initial TreeGrid.
- [x] Native attributes forward to the column header; label owns its plain text content and context-owned role/id/ARIA fields take precedence.
- [x] The Local fields contract uses Required unless optional in Signature; constraints stated below.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Native column header with columnheader role; no sorting/action/tabstop is promised in initial TreeGrid.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] useTreeGridColumnHeader is colocated with TreeGridColumnHeader and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] V2 **TreeGridColumnHeader contextual region**: Render public TreeGrid with its required Body and Header from a real two-column schema using Header 1..2. Demonstrate the generated header/cell role through supported column sorting/navigation, without orphan columns, fabricated Heading children or private context. Link to the owner composition.
- [x] The TreeGridColumnHeader V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useTreeGridColumnHeaderExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] Contextual V2 collection data reuses the TreeGrid fixture module listed in Files; part pages do not create a second index/key sequence for the same records.
