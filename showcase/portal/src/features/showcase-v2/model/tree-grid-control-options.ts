import type {
  TreeGridProps,
  TreeGridHeaderProps,
  TreeGridBodyProps,
  TreeGridFooterProps,
  TreeGridRowProps,
  TreeGridCellProps,
  TreeGridColumnHeaderProps,
} from "@forge-ui/web";
import type { TreeGridRecord } from "../components/TreeGrid/fixtures";
import type { PropertyEditors } from "../components/ExampleScope/example-store";
export const treeGridControlOptions = {
  TreeGrid: {
    label: { kind: "text" },
    direction: { kind: "select", options: ["ltr", "rtl"] },
    animated: { kind: "boolean" },
    title: { kind: "text" },
  },
  TreeGridHeader: { title: { kind: "text" } },
  TreeGridBody: { title: { kind: "text" } },
  TreeGridFooter: { children: { kind: "text" }, title: { kind: "text" } },
  TreeGridRow: { title: { kind: "text" } },
  TreeGridCell: { children: { kind: "text" }, title: { kind: "text" } },
  TreeGridColumnHeader: { label: { kind: "text" } },
} satisfies {
  TreeGrid: PropertyEditors<TreeGridProps<TreeGridRecord>>;
  TreeGridHeader: PropertyEditors<TreeGridHeaderProps>;
  TreeGridBody: PropertyEditors<TreeGridBodyProps>;
  TreeGridFooter: PropertyEditors<TreeGridFooterProps>;
  TreeGridRow: PropertyEditors<TreeGridRowProps>;
  TreeGridCell: PropertyEditors<TreeGridCellProps>;
  TreeGridColumnHeader: PropertyEditors<TreeGridColumnHeaderProps>;
};
