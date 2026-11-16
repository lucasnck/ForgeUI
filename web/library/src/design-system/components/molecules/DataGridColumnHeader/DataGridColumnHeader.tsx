"use client";
import type { NativeTableCellProps } from "../../../types/collection-contracts";
import { Button } from "../../atoms/Button";
import { Icon } from "../../atoms/Icon";
export interface DataGridColumnHeaderProps extends NativeTableCellProps {
  columnKey: string;
  label: string;
}
import { useDataGridColumnHeader } from "./useDataGridColumnHeader";
import styles from "./DataGridColumnHeader.module.css";

export function DataGridColumnHeader(props: DataGridColumnHeaderProps) {
  const view = useDataGridColumnHeader(props);

  return (
    <th
      {...view.props}
      scope="col"
      id={view.grid.headerId(view.columnKey)}
      className={[styles.root, view.className].filter(Boolean).join(" ")}
      aria-sort={
        view.grid.sort?.columnKey === view.columnKey ? view.grid.sort.direction : undefined
      }
      data-align={view.column.align}
    >
      {view.column.sortable ? (
        <Button
          appearance="none"
          className={styles.sortButton}
          aria-label={view.column.sortLabel}
          onClick={view.requestSort}
        >
          {view.label}
          <Icon
            name={
              view.grid.sort?.columnKey === view.columnKey &&
              view.grid.sort.direction === "descending"
                ? "sort-descending"
                : "sort-ascending"
            }
            size="inherit"
          />
        </Button>
      ) : (
        view.label
      )}
    </th>
  );
}
