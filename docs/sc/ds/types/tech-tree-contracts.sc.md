---
title: "Tree contracts"
scope: "Tree contracts shared value and capability contracts"
status: "DONE"
type: "type"
ds-level: "none"
---

# Tree contracts

## Files

```text
design-system/types/contracts.test.ts (C)
design-system/types/behavior-contracts.test.ts (C)
design-system/types/forms.test.ts (C)
design-system/types/tree.ts (C)
design-system/types/index.ts (C)
design-system/index.ts (M)
../scripts/fixtures/showcase-v2-contracts.ts (M)
```

## Dependencies

- [Collection, feedback and form contracts](tech-collection-contracts.sc.md)
- [Compound component composition](tech-compound-composition.sc.md)
- [Focus contracts](tech-focus-contracts.sc.md)

## Contract

```ts
import type { VisibleTreeNode } from "@forge-ui/web";
type Contract = VisibleTreeNode;
```

## Content

```ts
import type {
  KeyboardEvent,
  RefObject,
} from "react";
import type {
  TreeNodeDescriptor,
  ComponentTreeExpansionProps,
  NativeWidgetItemProps,
} from "./collection-contracts";
import type {
  ComponentSelectionProps,
} from "./compound-composition";
import type {
  RovingFocusContract,
} from "./focus";

export interface VisibleTreeNode {
  node: TreeNodeDescriptor;
  parentKey: string | null;
  level: number;
  position: number;
  siblingCount: number;
}

export interface TreeStateOptions extends ComponentSelectionProps<string | null>, ComponentTreeExpansionProps {
  nodes: readonly TreeNodeDescriptor[];
  fallbackRef?: RefObject<HTMLElement | null>;
}

export interface TreeStateContract {
  selected: string | null;
  expanded: readonly string[];
  visibleNodes: readonly VisibleTreeNode[];
  isExpanded(key: string): boolean;
  setExpanded(key: string, expanded: boolean): void;
  select(key: string): void;
}

export interface TreeNavigationContract extends TreeStateContract {
  focus: RovingFocusContract;
  onNodeKeyDown(event: KeyboardEvent<HTMLElement>, key: string): void;
}

export interface NativeTreeItemProps extends Omit<NativeWidgetItemProps, "children"> {}
```

## Tests

- V2 Consumer snippets for Tree, TreeGrid, useTreeState retain actual signature/shape and reject unsupported values without advertising an unimplemented standalone page.

- Compile keyed nodes, readonly expansion keys, nullable single selection and visible-node metadata.
- Reject numeric keys, array selection values and incomplete traversal metadata.
- Compile the state-only and navigation contracts without requiring DOM focus for tree state.

## Criteria

- [x] Each shared declaration has one canonical owner and remains exported through @/design-system.

- [x] V2 typed usage fixtures cover Tree, TreeGrid, useTreeState: Typed hierarchical nodes, depth-first stable keys and accepted expansion. Include an accepted public consumption and a rejected unsupported value/shape for each relevant union/interface boundary, using the actual source types rather than a second local declaration.
- [x] V2 typed fixtures identify this canonical source; any existing consuming Properties/Contract references the same owner; native inherited members remain delegated and repeated fixture labels keep stable one-based identity where applicable. Types have no invented runtime methods, independent visual page or new resource kind. The accepted and rejected consumer fixtures use the available canonical exports.
