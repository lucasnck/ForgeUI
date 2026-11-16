---
title: "Tree state and navigation hooks"
scope: "Own presentation-tree expansion, visible traversal and selection for Tree/TreeGrid, with tree focus navigation as a reusable adapter."
status: "DONE"
type: "hook"
ds-level: "none"
---

# Tree state and navigation hooks


## Files

```text
features/showcase-v2/components/HookResources/tree.shared.tsx (C)
features/showcase-v2/components/HookResources/useTreeFixture.ts (C)
design-system/hooks/tree/useTreeState.ts (C)
design-system/hooks/tree/useTreeNavigation.ts (C)
design-system/hooks/tree/index.ts (C)
design-system/index.ts (M)
features/showcase-v2/components/HookResources/useTreeState/definition.ts (C)
features/showcase-v2/components/HookResources/useTreeState/useTreeState.example.tsx (C)
features/showcase-v2/components/HookResources/useTreeState/useTreeStateResourceExample.ts (C)
features/showcase-v2/components/HookResources/useTreeState/usage-code.ts (C)
features/showcase-v2/components/HookResources/useTreeNavigation/definition.ts (C)
features/showcase-v2/components/HookResources/useTreeNavigation/useTreeNavigation.example.tsx (C)
features/showcase-v2/components/HookResources/useTreeNavigation/useTreeNavigationResourceExample.ts (C)
features/showcase-v2/components/HookResources/useTreeNavigation/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-resources.ts (M)
features/showcase-v2/model/showcase-v2-resource-loaders.ts (M)
```

## Dependencies

- [Tree traversal helpers](../helpers/tech-tree-traversal.sc.md)
- [Roving focus](tech-roving-focus.sc.md)
- [Tree contracts](../types/tech-tree-contracts.sc.md)

## Contract

```tsx
import { useTreeNavigation } from "@forge-ui/web";
const { visibleNodes, onNodeKeyDown } = useTreeNavigation({ nodes, expandedValue, onExpandedValueChange, value, onValueChange });
```

## Content

```ts
"use client";
import { useState } from "react";

import { indexTree, visibleTree } from "../../helpers/tree";

import type { TreeStateContract, TreeStateOptions } from "../../types/tree";
export function useTreeState(options: TreeStateOptions): TreeStateContract {
  const [localSelected, setLocalSelected] = useState<string | null>(options.defaultValue ?? null);
  const [localExpanded, setLocalExpanded] = useState<readonly string[]>(options.defaultExpandedValue ?? []);
  const selected = options.value === undefined ? localSelected : options.value;
  const expanded = options.expandedValue ?? localExpanded;
  const byKey = indexTree(options.nodes);
  const visibleNodes = visibleTree(options.nodes, expanded);
  function setExpanded(key: string, open: boolean) {
    const node = byKey.get(key);
    if (!node?.children?.length || node.disabled || expanded.includes(key) === open)
      return;
    const next = open ? [...expanded, key] : expanded.filter(value => value !== key);
    if (options.expandedValue === undefined)
      setLocalExpanded(next);
    options.onExpandedValueChange?.(next);
  }
  function select(key: string) {
    const node = byKey.get(key);
    if (!node || node.disabled || selected === key)
      return;
    if (options.value === undefined)
      setLocalSelected(key);
    options.onValueChange?.(key);
  }
  return { selected, expanded, visibleNodes, isExpanded: key => expanded.includes(key), setExpanded, select };
}
```

## Tests

- V2 Controlled tree data state: verify its observable state, actual public contract, reset and complete copied code.
- V2 Hierarchical focus traversal: verify its observable state, actual public contract, reset and complete copied code.

- `npm run test:hooks` verifies scoped keyboard/state/rejection behavior; DS typecheck passes. Real browser fixtures verify single tab stops, disabled-item skipping, selection/focus separation, controlled rejection and focus repair under accepted external changes.

- Controlled selection and expansion can be rejected without optimistic state.
- A leaf cannot expand and disabled nodes ignore requests.
- Collapsing an ancestor repairs descendant focus before hiding it.
- Left and Right implement hierarchy without changing selection.
- Enter and Space select without expanding; IME and prevented events are ignored.
- TreeGrid can use tree state without inheriting tree DOM focus.

## Criteria

- [x] Given collapsing parent A, descendants leave traversal and focus returns to A if needed.
- [x] Given a leaf, requesting expansion is ignored and no aria-expanded is exposed.
- [x] The value / defaultValue contract uses undefined / null.
- [x] The expandedValue / defaultExpandedValue contract uses undefined / [].
- [x] The Traversal contract uses Preorder of visible nodes; stable keys and metadata; branch children are caller data.
- [x] Validate duplicate keys/cycles before traversal. useTreeState has no DOM focus; TreeGrid adapts its data and uses grid navigation separately. useTreeNavigation composes vertical nonwrapping roving focus with typeahead.
- [x] Enter/Space select without automatic expansion.
- [x] No multiselect or drag/drop in this version.
- [x] RTL text is supported without inventing undocumented alternative hierarchy keys.

- [x] V2 **Controlled tree data state**: Use real indexed parent/child nodes and supported selection/expansion options; accept/reject controlled changes and show selected/expanded keys plus stable visible-node identity.
- [x] V2 **Hierarchical focus traversal**: Bind the actual navigation contract to semantic tree markup for the same depth-first indexed nodes; traverse/expand/collapse and remove a focused descendant, observing canonical focus repair and callback arguments.
- [x] Each selected V2 resource has exactly two primary sections: dynamic example and Contract. Hooks document actual Parameters/Returns; styles document real classes/attributes/token dependencies. Do not render Usage/resources or Related examples.
- [x] The preview uses actual public behavior/recipes, stable indexed fixture strings where repeated, colocated view logic and reset cleanup. Copy shows minimal public consumption (hook call inside caller context or real CSS/CSS-module application), with no wrapper/state implementation or duplicated resource engine. Register only after type, behavior and relevant visual acceptance is delivered.
