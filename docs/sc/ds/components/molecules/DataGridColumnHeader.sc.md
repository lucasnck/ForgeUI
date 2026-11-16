---
title: "DataGridColumnHeader"
scope: "DataGrid public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# DataGridColumnHeader

## Files




```text
features/showcase/examples/GridPartExamples.tsx (C)
design-system/components/molecules/DataGridColumnHeader/DataGridColumnHeader.tsx (C)
design-system/components/molecules/DataGridColumnHeader/useDataGridColumnHeader.ts (C)
design-system/components/molecules/DataGridColumnHeader/DataGridColumnHeader.module.css (C)
design-system/components/molecules/DataGridColumnHeader/index.ts (C)
design-system/internal/datagrid/DataGridContext.ts (C)
design-system/internal/datagrid/validateParts.ts (C)
design-system/index.ts (M)
features/showcase/examples/DataGridColumnHeader.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
../scripts/check-data-grid.cjs (C)
features/showcase-v2/components/DataGridColumnHeader/definition.ts (C)
features/showcase-v2/components/DataGridColumnHeader/DataGridColumnHeader.example.tsx (C)
features/showcase-v2/components/DataGridColumnHeader/useDataGridColumnHeaderExample.ts (C)
features/showcase-v2/components/DataGridColumnHeader/usage-code.ts (C)
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
- [Button.sc.md](../atoms/Button.sc.md)

## Contract

```tsx
import { DataGrid, DataGridBody, DataGridHeader } from "@forge-ui/web";
<DataGrid label="Records" rows={[]} columns={columns} getRowKey={getRowKey}><DataGridHeader /><DataGridBody hidden /></DataGrid>;
```

## Styles




```css
.root {
  composes: columnHeader from "../../../styles/data-grid-components.module.css";
}

.sortButton {
  composes: sortButton from "../../../styles/data-grid-components.module.css";
}
```

## Hooks




```tsx
import { useDataGridContext } from "../../../internal/datagrid/DataGridContext";
import type { DataGridColumnHeaderProps } from "./DataGridColumnHeader";
export function useDataGridColumnHeader(input: DataGridColumnHeaderProps) {
  const grid = useDataGridContext();
  const { columnKey, label, children, className, ...props } = input;
  const column = grid.columns.find(column => column.key === columnKey);
  if (!column) throw new Error("Invalid DataGrid column key");
  if (children !== undefined && children !== null) throw new Error("DataGridColumnHeader uses label");
  function requestSort() { grid.requestSort(columnKey); }
  return { grid, column, columnKey, label, props, className, requestSort };
}
```

## Content




```tsx
"use client";
import type { NativeTableCellProps } from "../../../types/collection-contracts";
import { Button } from "../../atoms/Button";
import { Icon } from "../../atoms/Icon";
export interface DataGridColumnHeaderProps extends NativeTableCellProps { columnKey: string; label: string; }
import { useDataGridColumnHeader } from "./useDataGridColumnHeader";
import styles from "./DataGridColumnHeader.module.css";
export function DataGridColumnHeader(props: DataGridColumnHeaderProps) {
  const view = useDataGridColumnHeader(props);
  return <th
    {...view.props}
    scope="col"
    id={view.grid.headerId(view.columnKey)}
    className={[styles.root, view.className].filter(Boolean).join(" ")}
    aria-sort={view.grid.sort?.columnKey === view.columnKey ? view.grid.sort.direction : undefined}
    data-align={view.column.align}
  >{view.column.sortable ? <Button appearance="none" className={styles.sortButton} aria-label={view.column.sortLabel} onClick={view.requestSort}>
    {view.label}<Icon name={view.grid.sort?.columnKey === view.columnKey && view.grid.sort.direction === "descending" ? "sort-descending" : "sort-ascending"} size="inherit" />
  </Button> : view.label}</th>;
}
```

## Tests

- V2 DataGridColumnHeader contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

## Criteria

- [x] Given DataGridColumnHeader, Header cell composes a native th and optional Button.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Local fields contract uses Required unless optional in Signature; constraints stated below.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Header cell composes a native th and optional Button.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] useDataGridColumnHeader is colocated with DataGridColumnHeader and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] V2 **DataGridColumnHeader contextual region**: Render public DataGrid with its required Body and Header from a real two-column schema using Header 1..2. Demonstrate the generated header/cell role through supported column sorting/navigation, without orphan columns, fabricated Heading children or private context. Link to the owner composition.
- [x] The DataGridColumnHeader V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useDataGridColumnHeaderExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] Contextual V2 collection data reuses the DataGrid fixture module listed in Files; part pages do not create a second index/key sequence for the same records.

- [x] V2 label editing maps a prefix to the real column.header values; columnKey, arbitrary children and generated native cell attributes stay read-only rather than using an orphan header.
