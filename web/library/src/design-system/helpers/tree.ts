import type { TreeNodeDescriptor } from "../types/collection-contracts";
import type { VisibleTreeNode } from "../types/tree";

export function indexTree(
  nodes: readonly TreeNodeDescriptor[],
): ReadonlyMap<string, TreeNodeDescriptor> {
  const byKey = new Map<string, TreeNodeDescriptor>();
  const ancestors = new Set<TreeNodeDescriptor>();

  function visit(branch: readonly TreeNodeDescriptor[]): void {
    for (const node of branch) {
      if (ancestors.has(node)) throw new Error("Tree cycle: " + node.key);

      if (!node.key.trim() || byKey.has(node.key)) {
        throw new Error("Invalid or duplicate tree key: " + node.key);
      }

      byKey.set(node.key, node);
      ancestors.add(node);
      visit(node.children ?? []);
      ancestors.delete(node);
    }
  }

  visit(nodes);
  return byKey;
}

export function visibleTree(
  nodes: readonly TreeNodeDescriptor[],
  expanded: readonly string[],
): readonly VisibleTreeNode[] {
  indexTree(nodes);
  const open = new Set(expanded);
  const result: VisibleTreeNode[] = [];

  function visit(
    branch: readonly TreeNodeDescriptor[],
    parentKey: string | null,
    level: number,
  ): void {
    branch.forEach((node, index) => {
      result.push({
        node,
        parentKey,
        level,
        position: index + 1,
        siblingCount: branch.length,
      });
      if (open.has(node.key)) visit(node.children ?? [], node.key, level + 1);
    });
  }

  visit(nodes, null, 1);
  return result;
}
