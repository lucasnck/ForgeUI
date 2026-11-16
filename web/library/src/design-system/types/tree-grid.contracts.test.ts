import type {
  TreeGridProps,
  TreeGridCellProps,
  TreeGridRowProps,
  TreeGridColumnHeaderProps,
} from "../index";
type Accepts<Constraint, Value extends Constraint> = Value;
type Assert<Value extends true> = Value;
type Excludes<Shape, Key> = Key extends keyof Shape ? false : true;
export type PlainCell = Accepts<
  TreeGridCellProps,
  { rowKey: "root"; columnKey: "name"; children: "Resource" }
>;
export type RowHasNoTabStop = Assert<Excludes<TreeGridRowProps, "tabIndex">>;
export type RowHasNoExpansion = Assert<Excludes<TreeGridRowProps, "aria-expanded">>;
export type HeaderHasNoTabStop = Assert<Excludes<TreeGridColumnHeaderProps, "tabIndex">>;
export type HeaderHasNoSort = Assert<Excludes<TreeGridColumnHeaderProps, "aria-sort">>;
export type HeaderHasNoCompetingChildren = Assert<Excludes<TreeGridColumnHeaderProps, "children">>;
export type GenericGrid = Accepts<
  TreeGridProps<{ name: string }>,
  {
    label: "Resources";
    nodes: readonly { key: "root"; item: { name: "Resource" } }[];
    columns: readonly { key: "name"; header: "Name"; getCellText(row: { name: string }): string }[];
    getNodeLabel(row: { name: string }): string;
    children: null;
  }
>;
