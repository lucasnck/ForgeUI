import type { TreeGridNode, TreeGridColumn, TreeNodeDescriptor } from "@forge-ui/web";
import { treeNodes } from "../Tree/fixtures";
import { listItems } from "../List/fixtures";
export interface TreeGridRecord {
  id: string;
  index: number;
  title: string;
  description: string;
}
export const records: readonly TreeGridRecord[] = listItems.map((item) => ({
  id: item.id,
  index: item.index,
  title: "Title " + item.index,
  description: "Description " + item.index,
}));

function project(nodes: readonly TreeNodeDescriptor[]): readonly TreeGridNode<TreeGridRecord>[] {
  return nodes.map((node) => ({
    key: node.key,
    item: records.find((record) => record.id === node.key)!,
    ...(node.children ? { children: project(node.children) } : {}),
  }));
}

export const treeGridNodes = project(treeNodes);
export const columns: readonly TreeGridColumn<TreeGridRecord>[] = [
  { key: "title", header: "Header 1", getCellText: (row) => row.title },
  {
    key: "description",
    header: "Header 2",
    getCellText: (row) => row.description,
  },
];

export function filterTreeGrid(
  nodes: readonly TreeGridNode<TreeGridRecord>[],
  query: string,
): readonly TreeGridNode<TreeGridRecord>[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return nodes;
  return nodes.flatMap((node) => {
    const children = filterTreeGrid(node.children ?? [], query);

    return node.item.title.toLowerCase().includes(needle)
      ? [node]
      : children.length
        ? [{ ...node, children }]
        : [];
  });
}

export function descriptorNodes(
  nodes: readonly TreeGridNode<TreeGridRecord>[],
): readonly TreeNodeDescriptor[] {
  return nodes.map((node) => ({
    key: node.key,
    label: node.item.title,
    ...(node.children ? { children: descriptorNodes(node.children) } : {}),
  }));
}

export function branchKeys(nodes: readonly TreeGridNode<TreeGridRecord>[]): readonly string[] {
  return nodes.flatMap((node) =>
    node.children?.length ? [node.key, ...branchKeys(node.children)] : [],
  );
}
