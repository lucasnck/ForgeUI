---
title: "TreeGroup"
scope: "Tree public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# TreeGroup

## Files

```text
features/showcase/examples/TreePartExamples.tsx (C)
design-system/components/molecules/TreeGroup/TreeGroup.tsx (C)
design-system/components/molecules/TreeGroup/TreeGroup.module.css (C)
design-system/components/molecules/TreeGroup/index.ts (C)
design-system/internal/tree/TreeContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/TreeGroup.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
design-system/components/molecules/TreeGroup/useTreeGroup.ts (C)
features/showcase-v2/components/TreeGroup/definition.ts (C)
features/showcase-v2/components/TreeGroup/TreeGroup.example.tsx (C)
features/showcase-v2/components/TreeGroup/useTreeGroupExample.ts (C)
features/showcase-v2/components/TreeGroup/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [tech-animations.sc.md](../../styles/animations/tech-motion-recipes.sc.md)
- [tech-collection-contracts.sc.md](../../types/tech-collection-contracts.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [tech-tree-state.sc.md](../../hooks/tech-tree-state.sc.md)
- [TreeItem.sc.md](TreeItem.sc.md)

## Contract

```tsx
import { Tree, TreeBody } from "@forge-ui/web";
<Tree label="Resources" nodes={[{ key: "root", label: "Resources", children: [{ key: "guide", label: "Guide" }] }]} defaultExpandedValue={["root"]}><TreeBody /></Tree>;
```

## Styles

```css
.root { list-style: none; margin: var(--zero); padding-block: var(--zero); padding-inline-start: var(--space-2); padding-inline-end: var(--zero); }
```

## Hooks

```tsx
"use client";
import { useTreeContext } from "../../../internal/tree/TreeContext";
import type { TreeGroupProps } from "./TreeGroup";
export function useTreeGroup(input: TreeGroupProps) { const { parentKey, nodes, level, className, ...props } = input; const tree = useTreeContext(); return { props, className, nodes, level, hidden: !tree.isExpanded(parentKey) }; }
```

## Content

```tsx
"use client";
import type { NativeCollectionListProps, TreeNodeDescriptor } from "../../../types";
import { TreeItem } from "../TreeItem";
import { useTreeGroup } from "./useTreeGroup";
import styles from "./TreeGroup.module.css";
export interface TreeGroupProps extends NativeCollectionListProps { parentKey: string; nodes: readonly TreeNodeDescriptor[]; level: number; }
export function TreeGroup(input: TreeGroupProps) { const { props, className, nodes, level, hidden } = useTreeGroup(input); return <ul {...props} role="group" hidden={hidden} className={[styles.root, className].filter(Boolean).join(" ")}>{nodes.map((node, index) => <TreeItem key={node.key} node={node} level={level} position={index + 1} siblingCount={nodes.length} />)}</ul>; }
```

## Tests

- V2 Generated tree nodes: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Actual browser verification covers nested branch arrows, skipped disabled nodes, collapsed descendant traversal, named all-disabled fallback, and an external Footer collapse that preserves Footer focus.

- `npm run test:overlays` verifies actual React SSR semantics and family guards.
- `npm run test:hooks` verifies keyboard control and focus repair; browser validation is separate.
- Disabled or unregistered items are skipped during the family’s documented keyboard traversal.
- Caller-prevented activation runs no owned selection/action and does not duplicate callbacks.
- Nested scopes and unmount cleanup preserve independent registration and stable relationship ids.

## Criteria

- [x] Given TreeGroup, Group is nested within its parent treeitem; metadata reflects supplied siblings even if closed.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Local fields contract uses Required unless optional in Signature; constraints stated below.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Root hook owns expansion/focus and cleanup; no second local useCollapse/group store.
- [x] Closing removes descendants from focus/traversal immediately.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] useTreeGroup is colocated with TreeGroup and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] V2 **Generated tree nodes**: Demonstrate through real Tree nodes and TreeBody, with an indexed parent and two children; expansion/selection generates the part without orphan JSX or private context.
- [x] The TreeGroup V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useTreeGroupExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
