---
title: "DataGridCell"
scope: "DataGrid public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# DataGridCell

## Files




```text
features/showcase/examples/GridPartExamples.tsx (C)
design-system/components/atoms/DataGridCell/DataGridCell.tsx (C)
design-system/components/atoms/DataGridCell/useDataGridCell.ts (C)
design-system/components/atoms/DataGridCell/DataGridCell.module.css (C)
design-system/components/atoms/DataGridCell/index.ts (C)
design-system/internal/datagrid/DataGridContext.ts (C)
design-system/internal/datagrid/validateParts.ts (C)
design-system/index.ts (M)
features/showcase/examples/DataGridCell.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
../scripts/check-data-grid.cjs (C)
features/showcase-v2/components/DataGridCell/definition.ts (C)
features/showcase-v2/components/DataGridCell/DataGridCell.example.tsx (C)
features/showcase-v2/components/DataGridCell/useDataGridCellExample.ts (C)
features/showcase-v2/components/DataGridCell/usage-code.ts (C)
features/showcase-v2/components/DataGrid/data-grid.fixtures.ts (M)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
features/showcase-v2/model/form-grid-control-options.ts (C)
features/showcase-v2/model/showcase-v2-control-options.ts (M)
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
  composes: cell from "../../../styles/data-grid-components.module.css";
}
```

## Hooks





```tsx
import { useDataGridContext } from "../../../internal/datagrid/DataGridContext";
import type { DataGridCellProps } from "./DataGridCell";
export function useDataGridCell(input: DataGridCellProps) {
  const grid = useDataGridContext();
  const { rowKey, columnKey, rowHeader, children, className, ...props } = input;
  const column = grid.columns.find(column => column.key === columnKey);
  if (!column || !grid.rowKeys.includes(rowKey) || (rowHeader !== undefined && rowHeader !== Boolean(column.rowHeader))) throw new Error("Invalid DataGrid cell identity");
  const isRowHeader = Boolean(column.rowHeader);
  const headers = [grid.headerId(columnKey), !isRowHeader && grid.columns.some(item => item.rowHeader) ? grid.rowHeaderId(rowKey) : undefined].filter(Boolean).join(" ");
  return { grid, props, rowKey, columnKey, isRowHeader, headers, children, className };
}
```

## Content




```tsx
"use client";
import type { NativeTableCellProps } from "../../../types/collection-contracts";
export interface DataGridCellProps extends NativeTableCellProps { rowKey: string; columnKey: string; rowHeader?: boolean; }
import { useDataGridCell } from "./useDataGridCell";
import styles from "./DataGridCell.module.css";
export function DataGridCell(props: DataGridCellProps) {
  const view = useDataGridCell(props);
  return view.isRowHeader ? <th
    {...view.props}
    className={[styles.root, view.className].filter(Boolean).join(" ")}
    id={view.grid.rowHeaderId(view.rowKey)}
    scope="row"
    headers={view.headers}
  >{view.children}</th> : <td
    {...view.props}
    className={[styles.root, view.className].filter(Boolean).join(" ")}
    headers={view.headers}
  >{view.children}</td>;
}
```

## Tests

- V2 DataGridCell contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

## Criteria

- [x] Given DataGridCell, Cell renders th scope=row only for the designated row header, otherwise td associated with its column header.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Local fields contract uses Required unless optional in Signature; constraints stated below.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] useDataGridCell is colocated with DataGridCell and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] V2 **DataGridCell contextual region**: Demonstrate DataGridCell through actual DataGrid records/nodes and the public Header/Body render path, with three stable indexed records and two indexed columns. Exercise owner sort/selection/expansion applicable to this part, without orphan cells/rows or private context.
- [x] The DataGridCell V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useDataGridCellExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] Contextual V2 collection data reuses the DataGrid fixture module listed in Files; part pages do not create a second index/key sequence for the same records.
