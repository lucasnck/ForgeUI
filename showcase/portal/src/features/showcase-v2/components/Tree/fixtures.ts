import type { TreeNodeDescriptor } from "@forge-ui/web";
import { listItems } from "../List/fixtures";
const indexed = listItems.map((item) => ({
  key: item.id,
  label: "Label " + item.index,
  disabled: item.index === 3,
}));
export const treeNodes: readonly TreeNodeDescriptor[] = [
  { ...indexed[0], children: [indexed[1], indexed[2]] },
  { ...indexed[3], children: [indexed[4], indexed[5]] },
];
export const branchNodes = treeNodes.slice(0, 1);
