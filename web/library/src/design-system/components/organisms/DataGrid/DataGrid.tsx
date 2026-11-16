"use client";
import type { ReactNode } from "react";
import type {
  NativeCollectionRootProps,
  ComponentChildrenProps,
} from "../../../types/compound-composition";
import type {
  ComponentFullWidthProps,
  ComponentSizedProps,
} from "../../../types/component-capabilities";
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
export interface DataGridProps<Row>
  extends
    NativeCollectionRootProps,
    ComponentChildrenProps,
    ComponentFullWidthProps,
    ComponentSizedProps {
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
  const renderedRows = view.rows.length
    ? view.rows.map((row, index) => {
        const rowKey = view.keys[index];

        return (
          <DataGridRow key={rowKey} rowKey={rowKey}>
            {view.columns.map((column) => (
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
      })
    : view.emptyContent === undefined
      ? []
      : [
          <tr key="empty">
            <td colSpan={view.columns.length}>{view.emptyContent}</td>
          </tr>,
        ];
  const regions = collectCompoundParts(view.children, {
    header: DataGridHeader,
    body: DataGridBody,
    footer: DataGridFooter,
  });

  return (
    <DataGridContext
      value={{
        renderedRows,
        columns: view.columnMetadata,
        rowKeys: view.keys,
        sort: view.sort,
        requestSort: view.requestSort,
        headerId: view.headerId,
        rowId: view.rowId,
        rowHeaderId: view.rowHeaderId,
      }}
    >
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
          <table className={styles.table} aria-label={view.label}>
            {regions.header}
            {regions.body}
          </table>
        </div>
        {regions.footer}
      </div>
    </DataGridContext>
  );
}
