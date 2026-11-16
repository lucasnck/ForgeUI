---
title: "DataGridHeader"
scope: "DataGrid public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# DataGridHeader

## Files




```text
features/showcase/examples/GridPartExamples.tsx (C)
design-system/components/molecules/DataGridHeader/DataGridHeader.tsx (C)
design-system/components/molecules/DataGridHeader/useDataGridHeader.ts (C)
design-system/components/molecules/DataGridHeader/DataGridHeader.module.css (C)
design-system/components/molecules/DataGridHeader/index.ts (C)
design-system/internal/datagrid/DataGridContext.ts (C)
design-system/internal/datagrid/validateParts.ts (C)
design-system/index.ts (M)
features/showcase/examples/DataGridHeader.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
../scripts/check-data-grid.cjs (C)
features/showcase-v2/components/DataGridHeader/definition.ts (C)
features/showcase-v2/components/DataGridHeader/DataGridHeader.example.tsx (C)
features/showcase-v2/components/DataGridHeader/useDataGridHeaderExample.ts (C)
features/showcase-v2/components/DataGridHeader/usage-code.ts (C)
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
- [DataGridColumnHeader](DataGridColumnHeader.sc.md)

## Contract

```tsx
import { DataGrid, DataGridBody, DataGridHeader } from "@forge-ui/web";
<DataGrid label="Records" rows={[]} columns={columns} getRowKey={getRowKey}><DataGridHeader /><DataGridBody hidden /></DataGrid>;
```

## Styles




```css
.root {
  composes: header from "../../../styles/data-grid-components.module.css";
}

.root[hidden] { display: none; }
```

## Hooks




```tsx
import { useDataGridContext } from "../../../internal/datagrid/DataGridContext";
import type { DataGridHeaderProps } from "./DataGridHeader";
export function useDataGridHeader(input: DataGridHeaderProps) {
  const grid = useDataGridContext();
  const { children, className, ...props } = input;
  if (children !== undefined && children !== null) throw new Error("DataGridHeader owns column headers");
  return { grid, props, className };
}
```

## Content




```tsx
"use client";
import type { ComponentPropsWithRef } from "react";
import { DataGridColumnHeader } from "../DataGridColumnHeader";
export interface DataGridHeaderProps extends ComponentPropsWithRef<"thead"> {}
import { useDataGridHeader } from "./useDataGridHeader";
import styles from "./DataGridHeader.module.css";
export function DataGridHeader(props: DataGridHeaderProps) {
  const view = useDataGridHeader(props);
  return <thead {...view.props} className={[styles.root, view.className].filter(Boolean).join(" ")}><tr>{view.grid.columns.map(column => <DataGridColumnHeader
    key={column.key}
    columnKey={column.key}
    label={column.header}
  />)}</tr></thead>;
}
```

## Tests

- V2 DataGridHeader contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

## Criteria

- [x] Given DataGridHeader, Header owns native table section hierarchy and maps only the canonical ColumnHeader parts; it must never put a generic div under table/tr.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Header owns native table section hierarchy and maps only the canonical ColumnHeader parts; it must never put a generic div under table/tr.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] useDataGridHeader is colocated with DataGridHeader and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] V2 **DataGridHeader contextual region**: Render public DataGrid with its required Body and Header from a real two-column schema using Header 1..2. Demonstrate the generated header/cell role through supported column sorting/navigation, without orphan columns, fabricated Heading children or private context. Link to the owner composition.
- [x] The DataGridHeader V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useDataGridHeaderExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] Contextual V2 collection data reuses the DataGrid fixture module listed in Files; part pages do not create a second index/key sequence for the same records.
