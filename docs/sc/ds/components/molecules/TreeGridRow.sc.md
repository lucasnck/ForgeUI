---
title: "TreeGridRow"
scope: "TreeGrid public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# TreeGridRow

## Files

```text
features/showcase/examples/GridPartExamples.tsx (C)
design-system/components/molecules/TreeGridRow/TreeGridRow.tsx (C)
design-system/components/molecules/TreeGridRow/TreeGridRow.module.css (C)
design-system/components/molecules/TreeGridRow/index.ts (C)
design-system/internal/treegrid/TreeGridContext.ts (C)
design-system/internal/treegrid/validateParts.ts (C)
design-system/index.ts (M)
design-system/types/tree-grid.contracts.test.ts (C)
features/showcase/examples/TreeGridRow.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
design-system/components/molecules/TreeGridRow/useTreeGridRow.ts (C)
features/showcase-v2/components/TreeGridRow/definition.ts (C)
features/showcase-v2/components/TreeGridRow/TreeGridRow.example.tsx (C)
features/showcase-v2/components/TreeGridRow/useTreeGridRowExample.ts (C)
features/showcase-v2/components/TreeGridRow/usage-code.ts (C)
features/showcase-v2/components/TreeGrid/fixtures.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [tech-animations.sc.md](../../styles/animations/tech-motion-recipes.sc.md)
- [tech-collection-contracts.sc.md](../../types/tech-collection-contracts.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [tech-grid-navigation.sc.md](../../hooks/tech-grid-navigation.sc.md)
- [tech-tree-state.sc.md](../../hooks/tech-tree-state.sc.md)
- [TreeGrid.sc.md](../organisms/TreeGrid.sc.md)

## Contract

```tsx
import { TreeGrid, TreeGridBody, TreeGridHeader } from "@forge-ui/web";
<TreeGrid label="Resources" nodes={nodes} columns={columns} getNodeLabel={getNodeLabel}><TreeGridHeader hidden /><TreeGridBody /></TreeGrid>;
```

## Styles

```css
.root { min-inline-size: var(--zero); color: var(--color-text-default); }
```

## Hooks

```tsx
"use client";
import { useTreeGridContext } from "../../../internal/treegrid/TreeGridContext";
import type { TreeGridRowProps } from "./TreeGridRow";
export function useTreeGridRow(input: TreeGridRowProps) { const { rowKey, children, className, ...props } = input; const grid = useTreeGridContext(); const row = grid.rows.find(entry => entry.node.key === rowKey); if (!row) throw new Error("TreeGridRow requires a visible root key."); return { props, className, children, row, columns: grid.columns.map(column => column.key) }; }
```

## Content

```tsx
"use client";
import { TreeGridCell } from "../../atoms/TreeGridCell";
import type { NativeTreeGridRowProps } from "../../../types";
import { validateTreeGridCells } from "../../../internal/treegrid/validateParts";
import { useTreeGridRow } from "./useTreeGridRow";
import styles from "./TreeGridRow.module.css";
export interface TreeGridRowProps extends NativeTreeGridRowProps {
  rowKey: string;
}
export function TreeGridRow(props: TreeGridRowProps) { const view = useTreeGridRow(props); return <tr {...view.props} role="row" tabIndex={undefined} aria-level={view.row.level} aria-posinset={view.row.position} aria-setsize={view.row.siblingCount} className={[styles.root, view.className].filter(Boolean).join(" ")}>{validateTreeGridCells(view.children, view.row.node.key, view.columns, TreeGridCell)}</tr>; }
```

## Tests

- V2 TreeGridRow contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Actual browser verification covers cell-only arrows, RTL bounds, accepted controlled collapse repairing descendant focus to the ancestor/current column without callbacks, and 12 locale/theme combinations preserving row count and one tab stop.

- `npm run test:overlays` verifies actual React SSR semantics and family guards.
- `npm run test:hooks` verifies keyboard control and focus repair; browser validation is separate.
- Disabled or unregistered items are skipped during the family’s documented keyboard traversal.
- Caller-prevented activation runs no owned selection/action and does not duplicate callbacks.
- Nested scopes and unmount cleanup preserve independent registration and stable relationship ids.

## Criteria

- [x] Given TreeGridRow, Row is a native tr role=row containing explicit grid cells; it has no tabindex.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Local fields contract uses Required unless optional in Signature; constraints stated below.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] useTreeGridRow is colocated with TreeGridRow and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] V2 **TreeGridRow contextual region**: Demonstrate TreeGridRow through actual TreeGrid records/nodes and the public Header/Body render path, with three stable indexed records and two indexed columns. Exercise owner sort/selection/expansion applicable to this part, without orphan cells/rows or private context.
- [x] The TreeGridRow V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useTreeGridRowExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] Contextual V2 collection data reuses the TreeGrid fixture module listed in Files; part pages do not create a second index/key sequence for the same records.
