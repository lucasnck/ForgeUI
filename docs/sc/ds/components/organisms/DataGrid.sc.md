---
title: "DataGrid"
scope: "Presentation-only DataGrid with explicit public parts and caller-owned data/actions."
status: "DONE"
type: "component"
ds-level: "organisms"
---

# DataGrid


## Files




```text
features/showcase-v2/components/DataGrid/usage-code.ts (C)
features/showcase-v2/components/DataGrid/definition.ts (C)
features/showcase-v2/components/DataGrid/DataGrid.example.tsx (C)
features/showcase-v2/components/DataGrid/useDataGridExample.ts (C)
features/showcase-v2/components/DataGrid/data-grid.fixtures.ts (C)
features/showcase/examples/DataGridRecordsExamples.tsx (C)
features/showcase/examples/DataGridRecordsExamples.module.css (C)
features/showcase/examples/useDataGridRecords.tsx (C)
features/showcase/examples/useDataGridRecordsCopy.ts (C)
features/showcase/examples/data-grid-records.ts (C)
features/showcase/examples/DataGridFilterPagination.example.tsx (C)
features/showcase/examples/useDataGridFilterPagination.ts (C)
features/showcase/examples/evaluate-record-filter.ts (C)
features/showcase/examples/useODataFilterExample.ts (C)
design-system/components/organisms/DataGrid/DataGrid.tsx (C)
design-system/components/organisms/DataGrid/useDataGrid.ts (C)
design-system/components/organisms/DataGrid/DataGrid.module.css (C)
design-system/components/organisms/DataGrid/index.ts (C)
design-system/internal/datagrid/DataGridContext.ts (C)
design-system/internal/datagrid/validateParts.ts (C)
design-system/index.ts (M)
features/showcase/examples/DataGrid.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
../scripts/check-data-grid.cjs (C)
```

## Dependencies

- [Data grid recipes](../../styles/tech-data-grid-components.sc.md)
- [ODataFilter](ODataFilter.sc.md)
- [Pagination](../molecules/Pagination.sc.md)

- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [tech-animations.sc.md](../../styles/animations/tech-motion-recipes.sc.md)
- [tech-collection-contracts.sc.md](../../types/tech-collection-contracts.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [Button.sc.md](../atoms/Button.sc.md)
- [Native control recipes](../../styles/tech-native-control-recipes.sc.md)
- [Component capabilities](../../types/tech-component-capabilities.sc.md)
- [DataGridRow](../molecules/DataGridRow.sc.md)
- [DataGridCell](../atoms/DataGridCell.sc.md)

## Contract

```tsx
import { DataGrid, DataGridHeader, DataGridBody, DataGridFooter } from "@forge-ui/web";
<DataGrid label="Records" rows={[{ id: "1", name: "First" }]} getRowKey={(row) => row.id} columns={[{ key: "name", header: "Name", renderCell: (row) => row.name }]}><DataGridHeader /><DataGridBody /><DataGridFooter>Summary</DataGridFooter></DataGrid>;
```

## Styles




```css
.root {
  composes: grid from "../../../styles/data-grid-components.module.css";
}

.viewport {
  composes: viewport from "../../../styles/data-grid-components.module.css";
}
.table {
  composes: table from "../../../styles/data-grid-components.module.css";
}
```

## Hooks




```tsx
import { useId } from "react";
import type { DataGridProps } from "./DataGrid";
export function useDataGrid<Row>({ label, rows, columns, getRowKey, sort = null, onSortChange, emptyContent, fullWidth = true, size = "md", showBorders = true, showColumnLines = false, showRowLines = true, rowAlternationEnabled = true, children, className, ...props }: DataGridProps<Row>) {
  const id = useId();
  if (!columns.length || columns.some(column => !column.key.trim()) || new Set(columns.map(column => column.key)).size !== columns.length) throw new Error("Invalid grid columns");
  if (columns.filter(column => column.rowHeader).length > 1) throw new Error("Only one row header is supported");
  if (columns.some(column => column.sortable && (!column.sortLabel?.trim() || !onSortChange))) throw new Error("Sortable columns require a label and callback");
  if (sort && !columns.some(column => column.key === sort.columnKey && column.sortable)) throw new Error("Invalid sorted column");
  const keys = rows.map(getRowKey);
  if (keys.some(key => !key.trim()) || new Set(keys).size !== keys.length) throw new Error("Invalid row keys");
  function requestSort(key: string) {
    if (!columns.find(column => column.key === key)?.sortable) return;
    onSortChange?.({ columnKey: key, direction: sort?.columnKey === key && sort.direction === "ascending" ? "descending" : "ascending" });
  }
  const headerId = (key: string) => id + "-header-" + encodeURIComponent(key);
  const rowId = (key: string) => id + "-row-" + encodeURIComponent(key);
  const rowHeaderId = (key: string) => id + "-row-header-" + encodeURIComponent(key);
  const columnMetadata = columns.map(({ key, header, rowHeader, sortable, sortLabel, align }) => ({ key, header, rowHeader, sortable, sortLabel, align }));
  return { label, rows, columns, keys, sort, emptyContent, fullWidth, size, showBorders, showColumnLines, showRowLines, rowAlternationEnabled, children, className, props, requestSort, headerId, rowId, rowHeaderId, columnMetadata };
}
```

## Content




```tsx
"use client";
import type { ReactNode } from "react";
import type { NativeCollectionRootProps, ComponentChildrenProps } from "../../../types/compound-composition";
import type { ComponentFullWidthProps, ComponentSizedProps } from "../../../types/component-capabilities";
import type { DataGridColumn, DataGridSort } from "../../../types/collection-contracts";
import { DataGridContext } from "../../../internal/datagrid/DataGridContext";
import { collectCompoundParts } from "../../../helpers/compound";
import { DataGridHeader } from "../../molecules/DataGridHeader";
import { DataGridBody } from "../../molecules/DataGridBody";
import { DataGridRow } from "../../molecules/DataGridRow";
import { DataGridCell } from "../../atoms/DataGridCell";
import { DataGridFooter } from "../../atoms/DataGridFooter";
import { useDataGrid } from "./useDataGrid";
import styles from "./DataGrid.module.css";
export interface DataGridProps<Row> extends NativeCollectionRootProps, ComponentChildrenProps, ComponentFullWidthProps, ComponentSizedProps {
  label: string;
  rows: readonly Row[];
  columns: readonly DataGridColumn<Row>[];
  getRowKey(row: Row): string;
  sort?: DataGridSort | null;
  onSortChange?(sort: DataGridSort): void;
  emptyContent?: ReactNode;
  showBorders?: boolean;
  showColumnLines?: boolean;
  showRowLines?: boolean;
  rowAlternationEnabled?: boolean;
}
export function DataGrid<Row>(props: DataGridProps<Row>) {
  const view = useDataGrid(props);
  const renderedRows = view.rows.length ? view.rows.map((row, index) => {
    const rowKey = view.keys[index];
    return (
      <DataGridRow key={rowKey} rowKey={rowKey}>
        {view.columns.map(column => (
          <DataGridCell
            key={column.key}
            rowKey={rowKey}
            columnKey={column.key}
            rowHeader={column.rowHeader}
            data-align={column.align}
          >
            {column.renderCell(row)}
          </DataGridCell>
        ))}
      </DataGridRow>
    );
  }) : view.emptyContent === undefined ? [] : [<tr key="empty"><td colSpan={view.columns.length}>{view.emptyContent}</td></tr>];
  const regions = collectCompoundParts(view.children, { header: DataGridHeader, body: DataGridBody, footer: DataGridFooter });
  return (
    <DataGridContext value={{
      renderedRows,
      columns: view.columnMetadata,
      rowKeys: view.keys,
      sort: view.sort,
      requestSort: view.requestSort,
      headerId: view.headerId,
      rowId: view.rowId,
      rowHeaderId: view.rowHeaderId,
    }}>
      <div
        {...view.props}
        className={[styles.root, view.className].filter(Boolean).join(" ")}
        data-full-width={view.fullWidth || undefined}
        data-size={view.size}
        data-borders={view.showBorders}
        data-column-lines={view.showColumnLines}
        data-row-lines={view.showRowLines}
        data-alternating={view.rowAlternationEnabled}
      >
        <div className={styles.viewport} tabIndex={0} role="region" aria-label={view.label}>
          <table className={styles.table} aria-label={view.label}>{regions.header}{regions.body}</table>
        </div>
        {regions.footer}
      </div>
    </DataGridContext>
  );
}
```

## Tests

- V2 Sortable collection and Filtered paginated collection are distinct named functional scenarios.
- Sorting, filtering and paging retain original Title N / Description N labels and stable keys; reset restores fixtures and settings.

- Duplicate row/column keys, no columns and more than one row header are rejected.
- Sortable columns require a localized sort label and request sort without mutating caller rows.
- Column header names and row-header semantics remain associated with each cell.
- Compile caller Row inference, string row keys and native cell refs/events; reject unknown row fields, numeric keys and cell tabIndex.
- Explicit Body overrides accept only public Row/Cell parts with known row/column keys and each column once.
- Empty content spans all columns, optional Footer is outside table and absent Footer emits no wrapper.

## Criteria

- [x] Given sort activation, callback runs once and input rows remain unmutated.
- [x] Given custom action cells, native keyboard behavior remains; plain cells are not added to Tab order.
- [x] The label / rows / columns / getRowKey contract uses Required; stable unique row/column keys.
- [x] The sort / onSortChange contract uses null / undefined; callback required if any column is sortable.
- [x] The fullWidth / emptyContent contract uses true / undefined.
- [x] Initial contract is a native accessible table with optional sortable header buttons, not an ARIA keyboard grid.
- [x] Header renders thead/column headers; Body renders public DataGridRow/DataGridCell for every row; Footer is outside table. aria-sort exists on the current sorted column only; header activation requests ascending then descending and never reorders caller rows.
- [x] EmptyContent, when supplied, renders a semantic body row with one correctly spanned cell.
- [x] No paging, row selection, editing, column resizing, virtualization or forced two-dimensional cell focus in this version.
- [x] No generic React context assertion or duplicate cached dataset is required.
- [x] The grid exposes five canonical sizes, optional outer/row/column borders and alternating rows through one family recipe.
- [x] A bounded keyboard-focusable horizontal viewport contains the native table on narrow screens; footer remains outside that viewport.
- [x] Sort controls show direction and preserve native focus/callback semantics; paging and filtering remain caller-owned.
- [x] Semantic child controls reuse existing Button/Input/Surface recipes; do not copy their palette or sizing selectors.
- [x] Columns are nonempty with unique keys and at most one rowHeader; sortable columns require sortLabel.

- [x] Column sort labels are supplied by the consumer locale and all row/column identifiers are nonempty and unique.

- [x] Showcase includes Id, Name, Description, Data, Date, Time, DateTime, Boolean and working example actions.
- [x] A composed example uses page-owned records with ODataFilter in a fixed aside or IconButton Popover, then sorting and Pagination; Apply resets page, incomplete drafts preserve results, cancel preserves the applied expression and empty results remain usable.
- [x] V2 has at least two named use scenarios; size, borders and tone variants alone do not satisfy this requirement.
- [x] Sortable collection composes DataGrid, DataGridHeader, DataGridBody and DataGridFooter with sortable columns, 12 deterministic records and observable onSortChange feedback; caller state supplies ordered rows.
- [x] Filtered paginated collection composes the same public grid parts with SearchInput, Pagination and Text. A five-row page size gives three pages; caller state filters Title N strings, resets to page one after filter changes, slices rows and reports visible/total counts.
- [x] Fixture records use stable id values item-1 through item-12, title="Title N" and description="Description N"; repeated column headers use "Header 1" and "Header 2", with matching localized sort labels.
- [x] Filtering supports matching and no-result states through emptyContent; indexed labels and getRowKey remain stable across sorting, pagination and reset.
- [x] Properties reflect actual label/rows/columns/getRowKey/sort/onSortChange/emptyContent and visual-line options; resources explicitly identify filtering and pagination as caller composition, not built-in DataGrid APIs.
- [x] No native selection capability is claimed or invented. No custom imperative methods are documented without an actual public contract.
- [x] The colocated view hook owns caller settings and feedback; each named example resets independently and V1 remains intact.

- [x] Each V2 scenario includes minimal copyable TSX in the catalog format: public imports and direct JSX with valid owner/parts; application-owned values and callbacks remain external, without wrapper components, hook bodies or showcase dependencies.
