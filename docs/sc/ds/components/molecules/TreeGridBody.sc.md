---
title: "TreeGridBody"
scope: "TreeGrid public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# TreeGridBody

## Files

```text
features/showcase/examples/GridPartExamples.tsx (C)
design-system/components/molecules/TreeGridBody/TreeGridBody.tsx (C)
design-system/components/molecules/TreeGridBody/TreeGridBody.module.css (C)
design-system/components/molecules/TreeGridBody/index.ts (C)
design-system/internal/treegrid/TreeGridContext.ts (C)
design-system/internal/treegrid/validateParts.ts (C)
design-system/index.ts (M)
features/showcase/examples/TreeGridBody.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
design-system/components/molecules/TreeGridBody/useTreeGridBody.ts (C)
features/showcase-v2/components/TreeGridBody/definition.ts (C)
features/showcase-v2/components/TreeGridBody/TreeGridBody.example.tsx (C)
features/showcase-v2/components/TreeGridBody/useTreeGridBodyExample.ts (C)
features/showcase-v2/components/TreeGridBody/usage-code.ts (C)
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
<TreeGrid label="Resources" nodes={nodes} columns={columns} getNodeLabel={getNodeLabel}><TreeGridHeader hidden /><TreeGridBody /></TreeGrid>;
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
import type { TreeGridBodyProps } from "./TreeGridBody";
export function useTreeGridBody(input: TreeGridBodyProps) { const { children, className, ...props } = input; const grid = useTreeGridContext(); return { props, className, children, grid }; }
```

## Content

```tsx
"use client";
import { TreeGridRow } from "../TreeGridRow";
import { TreeGridCell } from "../../atoms/TreeGridCell";
import type { ComponentPropsWithRef } from "react";
import { validateTreeGridRows } from "../../../internal/treegrid/validateParts";
import { useTreeGridBody } from "./useTreeGridBody";
import styles from "./TreeGridBody.module.css";
export interface TreeGridBodyProps extends ComponentPropsWithRef<"tbody"> {
}
export function TreeGridBody(props: TreeGridBodyProps) { const view = useTreeGridBody(props); return <tbody {...view.props} role="rowgroup" className={[styles.root, view.className].filter(Boolean).join(" ")}>{view.children === undefined ? view.grid.renderedRows : validateTreeGridRows(view.children, view.grid.rows.map(row => row.node.key), view.grid.columns.map(column => column.key), TreeGridRow, TreeGridCell)}</tbody>; }
```

## Tests

- V2 TreeGridBody contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Actual browser verification covers cell-only arrows, RTL bounds, accepted controlled collapse repairing descendant focus to the ancestor/current column without callbacks, and 12 locale/theme combinations preserving row count and one tab stop.

- `npm run test:overlays` verifies actual React SSR semantics and family guards.
- `npm run test:hooks` verifies keyboard control and focus repair; browser validation is separate.
- Disabled or unregistered items are skipped during the family’s documented keyboard traversal.
- Caller-prevented activation runs no owned selection/action and does not duplicate callbacks.
- Nested scopes and unmount cleanup preserve independent registration and stable relationship ids.

## Criteria

- [x] Given TreeGridBody, Body consumes root-computed typed row elements, not a generic record cast in React context.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Body consumes root-computed typed row elements, not a generic record cast in React context.
- [x] Root renderer always uses the public Row/Cell primitives.
- [x] Optional explicit Body children may override default rows only with those same valid public Row/Cell parts and matching root keys/columns.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] useTreeGridBody is colocated with TreeGridBody and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] V2 **TreeGridBody contextual region**: Render TreeGridBody through public TreeGrid with the minimum valid siblings. Show Text children="Children" or the actual owner-generated options/records, preserving required siblings and owner semantics. Hide/omit optional siblings only where allowed by the owner; link to the full TreeGrid composition.
- [x] The TreeGridBody V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useTreeGridBodyExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] Contextual V2 collection data reuses the TreeGrid fixture module listed in Files; part pages do not create a second index/key sequence for the same records.
