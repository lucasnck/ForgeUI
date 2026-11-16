import { Children, Fragment, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";
import type { TreeGridRow } from "../../components/molecules/TreeGridRow";
import type { TreeGridRowProps } from "../../components/molecules/TreeGridRow";
import type { TreeGridCell } from "../../components/atoms/TreeGridCell";
import type { TreeGridCellProps } from "../../components/atoms/TreeGridCell";
import type { TreeGridColumnHeader } from "../../components/atoms/TreeGridColumnHeader";
import type { TreeGridColumnHeaderProps } from "../../components/atoms/TreeGridColumnHeader";

function elements(children: ReactNode): ReactElement[] {
  const result: ReactElement[] = [];
  Children.forEach(children, (child) => {
    if (child == null || typeof child === "boolean") return;
    if (!isValidElement(child)) throw new Error("TreeGrid requires public row and cell parts.");
    if (child.type === Fragment)
      result.push(...elements((child.props as { children?: ReactNode }).children));
    else result.push(child);
  });
  return result;
}

export function validateTreeGridCells(
  children: ReactNode,
  rowKey: string,
  columns: readonly string[],
  Cell: typeof TreeGridCell,
): ReactNode {
  const cells = elements(children);
  const seen = new Set<string>();

  for (const cell of cells) {
    if (cell.type !== Cell) throw new Error("TreeGridRow requires public TreeGridCell children.");
    const props = cell.props as TreeGridCellProps;
    if (
      props.rowKey !== rowKey ||
      props.columnKey !== columns[seen.size] ||
      seen.has(props.columnKey)
    )
      throw new Error("TreeGrid cells must match their root row and unique columns.");
    seen.add(props.columnKey);
  }

  if (seen.size !== columns.length) throw new Error("TreeGridRow requires every column once.");
  return children;
}

export function validateTreeGridRows(
  children: ReactNode,
  rows: readonly string[],
  columns: readonly string[],
  Row: typeof TreeGridRow,
  Cell: typeof TreeGridCell,
): ReactNode {
  const seen = new Set<string>();

  for (const row of elements(children)) {
    if (row.type !== Row) throw new Error("TreeGridBody requires public TreeGridRow children.");
    const props = row.props as TreeGridRowProps;
    if (props.rowKey !== rows[seen.size] || seen.has(props.rowKey))
      throw new Error("TreeGrid rows must match unique visible root keys.");
    seen.add(props.rowKey);
    validateTreeGridCells(props.children, props.rowKey, columns, Cell);
  }

  if (seen.size !== rows.length) throw new Error("TreeGridBody requires every visible row once.");
  return children;
}

export function validateTreeGridHeaders(
  children: ReactNode,
  columns: readonly string[],
  Header: typeof TreeGridColumnHeader,
): ReactNode {
  const seen = new Set<string>();

  for (const header of elements(children)) {
    if (header.type !== Header)
      throw new Error("TreeGridHeader requires public TreeGridColumnHeader children.");
    const props = header.props as TreeGridColumnHeaderProps;
    if (props.columnKey !== columns[seen.size] || seen.has(props.columnKey))
      throw new Error("TreeGrid headers must match unique root columns.");
    seen.add(props.columnKey);
  }

  if (seen.size !== columns.length) throw new Error("TreeGridHeader requires every column once.");
  return children;
}
