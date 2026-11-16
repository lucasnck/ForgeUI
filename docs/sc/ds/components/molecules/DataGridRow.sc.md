---
title: "DataGridRow"
scope: "DataGrid public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# DataGridRow

## Files




```text
features/showcase/examples/GridPartExamples.tsx (C)
design-system/components/molecules/DataGridRow/DataGridRow.tsx (C)
design-system/components/molecules/DataGridRow/useDataGridRow.ts (C)
design-system/components/molecules/DataGridRow/DataGridRow.module.css (C)
design-system/components/molecules/DataGridRow/index.ts (C)
design-system/internal/datagrid/DataGridContext.ts (C)
design-system/internal/datagrid/validateParts.ts (C)
design-system/index.ts (M)
features/showcase/examples/DataGridRow.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
../scripts/check-data-grid.cjs (C)
features/showcase-v2/components/DataGridRow/definition.ts (C)
features/showcase-v2/components/DataGridRow/DataGridRow.example.tsx (C)
features/showcase-v2/components/DataGridRow/useDataGridRowExample.ts (C)
features/showcase-v2/components/DataGridRow/usage-code.ts (C)
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
  composes: row from "../../../styles/data-grid-components.module.css";
}
```

## Hooks




```tsx
import { useDataGridContext } from "../../../internal/datagrid/DataGridContext";
import type { DataGridRowProps } from "./DataGridRow";
export function useDataGridRow(input: DataGridRowProps) {
  const grid = useDataGridContext();
  const { rowKey, children, className, ...props } = input;
  if (!grid.rowKeys.includes(rowKey)) throw new Error("Invalid DataGrid row key");
  return { grid, props, rowKey, children, className };
}
```

## Content




```tsx
"use client";
import type { ComponentPropsWithRef } from "react";
import { DataGridCell } from "../../atoms/DataGridCell";
import { validateDataGridCells } from "../../../internal/datagrid/validateParts";
export interface DataGridRowProps extends ComponentPropsWithRef<"tr"> { rowKey: string; }
import { useDataGridRow } from "./useDataGridRow";
import styles from "./DataGridRow.module.css";
export function DataGridRow(props: DataGridRowProps) {
  const view = useDataGridRow(props);
  validateDataGridCells(view.children, DataGridCell, view.rowKey, view.grid.columns.map(column => column.key));
  return <tr
    {...view.props}
    id={view.grid.rowId(view.rowKey)}
    className={[styles.root, view.className].filter(Boolean).join(" ")}
  >{view.children}</tr>;
}
```

## Tests

- V2 DataGridRow contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

## Criteria

- [x] Given DataGridRow, Row is a native tr with stable keyed identity and explicit DataGridCell children.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Local fields contract uses Required unless optional in Signature; constraints stated below.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] useDataGridRow is colocated with DataGridRow and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] V2 **DataGridRow contextual region**: Demonstrate DataGridRow through actual DataGrid records/nodes and the public Header/Body render path, with three stable indexed records and two indexed columns. Exercise owner sort/selection/expansion applicable to this part, without orphan cells/rows or private context.
- [x] The DataGridRow V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useDataGridRowExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] Contextual V2 collection data reuses the DataGrid fixture module listed in Files; part pages do not create a second index/key sequence for the same records.
