---
title: "Tree"
scope: "Presentation-only Tree with explicit public parts and caller-owned data/actions."
status: "DONE"
type: "component"
ds-level: "organisms"
---

# Tree

## Files

```text
design-system/components/organisms/Tree/Tree.tsx (C)
design-system/components/organisms/Tree/Tree.module.css (C)
design-system/components/organisms/Tree/index.ts (C)
design-system/internal/tree/TreeContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/Tree.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
design-system/components/organisms/Tree/useTree.ts (C)
features/showcase-v2/components/Tree/definition.ts (C)
features/showcase-v2/components/Tree/Tree.example.tsx (C)
features/showcase-v2/components/Tree/useTreeExample.ts (C)
features/showcase-v2/components/Tree/usage-code.ts (C)
features/showcase-v2/components/Tree/fixtures.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [tech-animations.sc.md](../../styles/animations/tech-motion-recipes.sc.md)
- [tech-collection-contracts.sc.md](../../types/tech-collection-contracts.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [tech-tree-state.sc.md](../../hooks/tech-tree-state.sc.md)

## Contract

```tsx
import { Tree, TreeHeader, TreeBody, TreeFooter } from "@forge-ui/web";
<Tree label="Resources" nodes={[{ key: "root", label: "Resources", children: [{ key: "guide", label: "Guide" }] }]}><TreeHeader>Resources</TreeHeader><TreeBody /><TreeFooter>Choose a resource</TreeFooter></Tree>;
```

## Styles

```css
.root { composes: stack from "../../../styles/layout-components.module.css"; min-inline-size: var(--zero); color: var(--color-text-default); }
```

## Animations

```text
stateFeedback
```

## Hooks

```tsx
"use client";
import { useRef } from "react";
import { useTreeNavigation } from "../../../hooks/tree/useTreeNavigation";
import { indexTree } from "../../../helpers/tree";
import type { TreeProps } from "./Tree";
export function useTree(input: TreeProps) {
  const { nodes, value, defaultValue, onValueChange, expandedValue, defaultExpandedValue, onExpandedValueChange, label, children, animated = true, className, ...props } = input;
  if (!label.trim() || [...indexTree(nodes).values()].some((node) => !node.label.trim())) throw new Error("Tree requires nonempty plain labels.");
  const bodyRef = useRef<HTMLUListElement>(null);
  const tree = useTreeNavigation({ nodes, value, defaultValue, onValueChange, expandedValue, defaultExpandedValue, onExpandedValueChange, fallbackRef: bodyRef });
  return { props, children, className, context: { ...tree, label, nodes, bodyRef, fallback: !tree.visibleNodes.some((entry) => !entry.node.disabled), animated } };
}
```

## Content

```tsx
"use client";
import type { NativeSectionRootProps, ComponentChildrenProps, ComponentSelectionProps, ComponentTreeExpansionProps, ComponentAnimatedProps, TreeNodeDescriptor } from "../../../types";
import { TreeContext } from "../../../internal/tree/TreeContext";
import { collectCompoundParts } from "../../../helpers/compound";
import { TreeHeader } from "../../atoms/TreeHeader";
import { TreeBody } from "../../molecules/TreeBody";
import { TreeFooter } from "../../atoms/TreeFooter";
import { useTree } from "./useTree";
import styles from "./Tree.module.css";
export interface TreeProps extends NativeSectionRootProps, ComponentChildrenProps, ComponentSelectionProps<string | null>, ComponentTreeExpansionProps, ComponentAnimatedProps { label: string; nodes: readonly TreeNodeDescriptor[]; }
export function Tree(input: TreeProps) {
  const { props, children, className, context } = useTree(input);
  const parts = collectCompoundParts(children, { header: TreeHeader, body: TreeBody, footer: TreeFooter }, ["body"]);
  return <TreeContext value={context}><section {...props} className={[styles.root, className].filter(Boolean).join(" ")} data-gap="2">{parts.header}{parts.body}{parts.footer}</section></TreeContext>;
}
```

## Tests

- V2 Hierarchical selection: verify the specified actions/outcome, reset and agreement with its minimal copyable code.
- V2 Controlled expansion rejection: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Actual browser verification covers nested branch arrows, skipped disabled nodes, collapsed descendant traversal, named all-disabled fallback, and an external Footer collapse that preserves Footer focus.

- `npm run test:overlays` verifies actual React SSR semantics and family guards.
- `npm run test:hooks` verifies keyboard control and focus repair; browser validation is separate.
- Disabled or unregistered items are skipped during the family’s documented keyboard traversal.
- Caller-prevented activation runs no owned selection/action and does not duplicate callbacks.
- Nested scopes and unmount cleanup preserve independent registration and stable relationship ids.

## Criteria

- [x] Given expansion/collapse, visible keyboard traversal matches current hierarchy without focus on hidden descendants.
- [x] The label / nodes contract uses Required unique acyclic descriptors.
- [x] The value / defaultValue contract uses undefined / null.
- [x] The expandedValue / defaultExpandedValue contract uses undefined / [].
- [x] Body renders ul role=tree and canonical TreeItem/TreeGroup recursion.
- [x] Header/Footer stay outside the tree interior.
- [x] Root is a named focus fallback when no enabled node exists.
- [x] No nested widget content in item labels, multiselect, remote lazy loading, drag/drop or virtual window by default.
- [x] Use data-gap="2" on the owned stack.
- [x] Semantic child controls reuse existing Button/Input/Surface recipes; do not copy their palette or sizing selectors.
- [x] Optional presence enhancement needs explicit inert group retention, not a second hierarchy store.
- [x] useTree is colocated with Tree and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] V2 **Hierarchical selection**: Compose TreeHeader/Body/Footer with two parents and indexed children, stable keys and deterministic depth-first text. Expand/collapse, navigate/select a child and display actual selection/expanded keys without orphan node markup.
- [x] V2 **Controlled expansion rejection**: Use an independent controlled tree with a selected descendant and external expansion controls. Reject one requested change, then accept collapse; accepted props stay authoritative and the canonical tree repairs descendant focus.
- [x] The Tree V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useTreeExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] V2 supporting fixture **Visible indexed traversal** in the Tree example uses the actual [helper contract](../../helpers/tech-tree-traversal.sc.md): Use actual visibleTree on the same stable depth-first indexed nodes as Tree/TreeGrid; expansion/collapse preserves identity, validates hierarchy boundaries and never replaces the public tree navigation engine. Computed output is an explicit typed-fixture exception to generic Children text; it is not a new prop or helper page.

- [x] In the rejection scenario, the external Collapse Button prevents pointer focus transfer before setting accepted expansion props; collapsing while a descendant owns focus demonstrates canonical repair to its visible ancestor. Keyboard activation retains native button focus behavior.
