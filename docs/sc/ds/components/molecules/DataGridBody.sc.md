---
title: "DataGridBody"
scope: "DataGrid public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# DataGridBody

## Files




```text
features/showcase/examples/GridPartExamples.tsx (C)
design-system/components/molecules/DataGridBody/DataGridBody.tsx (C)
design-system/components/molecules/DataGridBody/useDataGridBody.ts (C)
design-system/components/molecules/DataGridBody/DataGridBody.module.css (C)
design-system/components/molecules/DataGridBody/index.ts (C)
design-system/internal/datagrid/DataGridContext.ts (C)
design-system/internal/datagrid/validateParts.ts (C)
design-system/index.ts (M)
features/showcase/examples/DataGridBody.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
../scripts/check-data-grid.cjs (C)
features/showcase-v2/components/DataGridBody/definition.ts (C)
features/showcase-v2/components/DataGridBody/DataGridBody.example.tsx (C)
features/showcase-v2/components/DataGridBody/useDataGridBodyExample.ts (C)
features/showcase-v2/components/DataGridBody/usage-code.ts (C)
features/showcase-v2/components/DataGrid/data-grid.fixtures.ts (M)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
features/showcase-v2/model/grid-list-control-options.ts (C)
features/showcase-v2/model/showcase-v2-control-options.ts (M)
features/showcase-v2/components/DataGrid/useGridPartExample.ts (C)
```

## Dependencies

- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [tech-animations.sc.md](../../styles/animations/tech-motion-recipes.sc.md)
- [tech-collection-contracts.sc.md](../../types/tech-collection-contracts.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [DataGrid.sc.md](../organisms/DataGrid.sc.md)

## Contract

```tsx
import { DataGrid, DataGridBody, DataGridHeader } from "@forge-ui/web";
<DataGrid label="Records" rows={rows} columns={columns} getRowKey={getRowKey}><DataGridHeader hidden /><DataGridBody /></DataGrid>;
```

## Styles




```css
.root {
  min-inline-size: var(--zero);
  color: var(--color-text-default);
}

.root[hidden] { display: none; }
```

## Hooks




```tsx
import { useDataGridContext } from "../../../internal/datagrid/DataGridContext";
import type { DataGridBodyProps } from "./DataGridBody";
export function useDataGridBody(input: DataGridBodyProps) {
  const grid = useDataGridContext();
  const { children, className, ...props } = input;
  return { grid, props, children, className };
}
```

## Content




```tsx
"use client";
import type { ComponentPropsWithRef } from "react";
import { DataGridRow } from "../DataGridRow";
import { validateDataGridRows } from "../../../internal/datagrid/validateParts";
export interface DataGridBodyProps extends ComponentPropsWithRef<"tbody"> {}
import { useDataGridBody } from "./useDataGridBody";
import styles from "./DataGridBody.module.css";
export function DataGridBody(props: DataGridBodyProps) {
  const view = useDataGridBody(props);
  if (view.children !== undefined && view.children !== null) validateDataGridRows(view.children, DataGridRow, view.grid.rowKeys);
  return <tbody {...view.props} className={[styles.root, view.className].filter(Boolean).join(" ")}>{view.children ?? view.grid.renderedRows}</tbody>;
}
```

## Tests

- V2 DataGridBody contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

## Criteria

- [x] Given DataGridBody, Body consumes root-computed typed row elements, not a generic record cast in React context.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Body consumes root-computed typed row elements, not a generic record cast in React context.
- [x] Root renderer always uses the public Row/Cell primitives.
- [x] Optional explicit Body children may override default rows only with those same valid public Row/Cell parts and matching root keys/columns.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] useDataGridBody is colocated with DataGridBody and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] V2 **DataGridBody contextual region**: Render DataGridBody through public DataGrid with the minimum valid siblings. Show Text children="Children" or the actual owner-generated options/records, preserving required siblings and owner semantics. Hide/omit optional siblings only where allowed by the owner; link to the full DataGrid composition.
- [x] The DataGridBody V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useDataGridBodyExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] Contextual V2 collection data reuses the DataGrid fixture module listed in Files; part pages do not create a second index/key sequence for the same records.
