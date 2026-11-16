import type { ComponentPropsWithRef, ReactNode } from "react";
import type { NativeModalRootProps } from "./modal";

export interface NativeSectionRootProps extends Omit<
  ComponentPropsWithRef<"section">,
  "children" | "defaultValue"
> {}

export interface NativeFormRootProps extends Omit<
  ComponentPropsWithRef<"form">,
  "children" | "action" | "method" | "target"
> {}

export interface NativeActionButtonProps extends Omit<ComponentPropsWithRef<"button">, "type"> {}

export interface NativeWidgetItemProps extends Omit<
  ComponentPropsWithRef<"li">,
  "role" | "tabIndex" | "aria-selected" | "aria-expanded"
> {}

export interface NativeTableCellProps extends Omit<
  ComponentPropsWithRef<"td">,
  "role" | "tabIndex" | "aria-rowindex" | "aria-colindex"
> {
  colSpan?: number;
  rowSpan?: number;
}

export interface NativeTreeGridCellProps extends Omit<NativeTableCellProps, "children"> {
  children: string;
}

export interface NativeTreeGridColumnHeaderProps extends Omit<
  ComponentPropsWithRef<"th">,
  "children" | "role" | "tabIndex" | "aria-sort"
> {}

export interface NativeTreeGridRowProps extends Omit<
  ComponentPropsWithRef<"tr">,
  "role" | "tabIndex" | "aria-expanded" | "aria-selected"
> {}

export interface NativeGridCellProps extends Omit<
  ComponentPropsWithRef<"div">,
  "role" | "tabIndex" | "aria-rowindex" | "aria-colindex"
> {}

export interface NativeAlertDialogRootProps extends Omit<
  NativeModalRootProps,
  "role" | "aria-describedby"
> {}

export type { SelectionMode } from "../../support/contracts/selection";

export type SortDirection = "ascending" | "descending";

export type AnnouncementPoliteness = "off" | "polite" | "assertive";

export type StepStatus = "pending" | "complete" | "error";

export interface DataGridSort {
  columnKey: string;
  direction: SortDirection;
}

export type DataGridAlignment = "start" | "center" | "end";

export interface DataGridColumn<Row> {
  key: string;
  header: string;
  renderCell(row: Row): ReactNode;
  sortable?: boolean;
  sortLabel?: string;
  rowHeader?: boolean;
  align?: DataGridAlignment;
}

export interface TreeNodeDescriptor {
  key: string;
  label: string;
  disabled?: boolean;
  children?: readonly TreeNodeDescriptor[];
}

export interface TreeGridNode<Row> {
  key: string;
  item: Row;
  children?: readonly TreeGridNode<Row>[];
}

export interface TreeGridColumn<Row> {
  key: string;
  header: string;
  getCellText(row: Row): string;
}

export interface ComponentTreeExpansionProps {
  expandedValue?: readonly string[];
  defaultExpandedValue?: readonly string[];
  onExpandedValueChange?(value: readonly string[]): void;
}
export type CollectionFocusEdge = "first" | "last";
