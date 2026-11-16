import type { TreeProps, TreeHeaderProps, TreeBodyProps, TreeFooterProps } from "@forge-ui/web";
import type { PropertyEditors } from "../components/ExampleScope/example-store";
export const treeControlOptions = {
  Tree: {
    label: { kind: "text" },
    animated: { kind: "boolean" },
    title: { kind: "text" },
  },
  TreeHeader: { children: { kind: "text" }, title: { kind: "text" } },
  TreeBody: { title: { kind: "text" } },
  TreeFooter: { children: { kind: "text" }, title: { kind: "text" } },
  TreeItem: {},
  TreeGroup: {},
} satisfies {
  Tree: PropertyEditors<TreeProps>;
  TreeHeader: PropertyEditors<TreeHeaderProps>;
  TreeBody: PropertyEditors<TreeBodyProps>;
  TreeFooter: PropertyEditors<TreeFooterProps>;
  TreeItem: Record<string, never>;
  TreeGroup: Record<string, never>;
};
