import { Children, Fragment, isValidElement } from "react";
import type { ReactNode } from "react";
import type { DataGridRowProps } from "../../components/molecules/DataGridRow";
import type { DataGridCellProps } from "../../components/atoms/DataGridCell";

export function validateDataGridParts<Props>(
  children: ReactNode,
  constructor: unknown,
  validate: (props: Props) => void,
) {
  Children.forEach(children, (child) => {
    if (child === null || child === undefined || typeof child === "boolean") return;
    if (!isValidElement<Props & { children?: ReactNode }>(child))
      throw new Error("Invalid DataGrid part");

    if (child.type === Fragment && child.key !== null) {
      validateDataGridParts(child.props.children, constructor, validate);
      return;
    }

    if (child.type !== constructor) throw new Error("Invalid DataGrid part");
    validate(child.props);
  });
}

export function validateDataGridRows(
  children: ReactNode,
  constructor: unknown,
  keys: readonly string[],
) {
  const seen = new Set<string>();
  validateDataGridParts<DataGridRowProps>(children, constructor, (props) => {
    if (!keys.includes(props.rowKey) || seen.has(props.rowKey))
      throw new Error("Invalid DataGrid row key");
    seen.add(props.rowKey);
  });
}

export function validateDataGridCells(
  children: ReactNode,
  constructor: unknown,
  rowKey: string,
  columnKeys: readonly string[],
) {
  const seen = new Set<string>();
  validateDataGridParts<DataGridCellProps>(children, constructor, (props) => {
    if (
      props.rowKey !== rowKey ||
      !columnKeys.includes(props.columnKey) ||
      seen.has(props.columnKey)
    )
      throw new Error("Invalid DataGrid cell identity");
    seen.add(props.columnKey);
  });
  if (seen.size !== columnKeys.length) throw new Error("DataGridRow requires each column once");
}
