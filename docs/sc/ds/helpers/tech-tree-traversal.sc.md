---
title: "Tree traversal helpers"
scope: "Validate keyed presentation trees and derive visible preorder metadata"
status: "DONE"
type: "helper"
ds-level: "none"
---

# Tree traversal helpers

## Files

```text
design-system/helpers/tree.ts (C)
../scripts/fixtures/showcase-v2-contracts.ts (M)
../scripts/check-showcase-v2.cjs (M)
```

## Dependencies

- [Collection contracts](../types/tech-collection-contracts.sc.md)
- [Tree contracts](../types/tech-tree-contracts.sc.md)

## Contract

```ts
import { visibleTree } from "@/design-system/helpers/tree";
const visibleNodes = visibleTree(nodes, expanded);
```

## Content

```ts
import type { TreeNodeDescriptor } from "../types/collection-contracts";
import type { VisibleTreeNode } from "../types/tree";
export function indexTree(nodes: readonly TreeNodeDescriptor[]): ReadonlyMap<string, TreeNodeDescriptor> {
  const byKey = new Map<string, TreeNodeDescriptor>();
  const ancestors = new Set<TreeNodeDescriptor>();
  function visit(branch: readonly TreeNodeDescriptor[]): void {
    for (const node of branch) {
      if (ancestors.has(node))
        throw new Error("Tree cycle");
      if (!node.key || byKey.has(node.key))
        throw new Error("Invalid or duplicate tree key: " + node.key);
      byKey.set(node.key, node);
      ancestors.add(node);
      visit(node.children ?? []);
      ancestors.delete(node);
    }
  }
  visit(nodes);
  return byKey;
}
export function visibleTree(nodes: readonly TreeNodeDescriptor[], expanded: readonly string[]): readonly VisibleTreeNode[] {
  indexTree(nodes);
  const open = new Set(expanded);
  const result: VisibleTreeNode[] = [];
  function visit(branch: readonly TreeNodeDescriptor[], parentKey: string | null, level: number): void {
    branch.forEach((node, index) => {
      result.push({ node, parentKey, level, position: index + 1, siblingCount: branch.length });
      if (open.has(node.key))
        visit(node.children ?? [], node.key, level + 1);
    });
  }
  visit(nodes, null, 1);
  return result;
}
```

## Tests

- V2 Visible indexed traversal: verify valid/boundary input/output and minimal consumer code against the actual helper signature.

- `npm run test:helpers` verifies hidden-descendant validation, duplicate/blank keys, cycles, source identity and traversal metadata. Tree state/navigation consume these private helpers.

- Duplicate and empty keys and cyclic node references fail before traversal.
- Collapsed descendants are excluded while visible preorder remains stable.
- Parent, one-based level, sibling position and sibling count reflect source branches.
- Source nodes and expansion arrays remain unchanged.

## Criteria

- [x] Validation examines hidden descendants as well as visible nodes.
- [x] Traversal preserves source order and identity.
- [x] Helpers do not manage state, selection, focus or browser APIs.
- [x] The private helpers are consumed by the tree hooks.

- [x] V2 **Visible indexed traversal** is covered through the public Tree consumer examples and typed caller fixtures: Use actual visibleTree on the same stable depth-first indexed nodes as Tree/TreeGrid; expansion/collapse preserves identity, validates hierarchy boundaries and never replaces the public tree navigation engine.
- [x] V2 imports only the actual helper export or documented public helper subpath, keeps typed data valid and documents output ownership. No standalone helper route/kind, private dependency or duplicated implementation is introduced; this pending item is consumer acceptance, not loss of existing API availability.
