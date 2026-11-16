---
title: "TreeItem"
scope: "Tree public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# TreeItem

## Files

```text
features/showcase/examples/TreePartExamples.tsx (C)
design-system/components/molecules/TreeItem/TreeItem.tsx (C)
design-system/components/molecules/TreeItem/TreeItem.module.css (C)
design-system/components/molecules/TreeItem/index.ts (C)
design-system/internal/tree/TreeContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/TreeItem.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
design-system/components/molecules/TreeItem/useTreeItem.ts (C)
features/showcase-v2/components/TreeItem/definition.ts (C)
features/showcase-v2/components/TreeItem/TreeItem.example.tsx (C)
features/showcase-v2/components/TreeItem/useTreeItemExample.ts (C)
features/showcase-v2/components/TreeItem/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [tech-animations.sc.md](../../styles/animations/tech-motion-recipes.sc.md)
- [tech-collection-contracts.sc.md](../../types/tech-collection-contracts.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [tech-tree-state.sc.md](../../hooks/tech-tree-state.sc.md)
- [Tree.sc.md](../organisms/Tree.sc.md)
- [TreeGroup](TreeGroup.sc.md)

## Contract

```tsx
import { Tree, TreeBody } from "@forge-ui/web";
<Tree label="Resources" nodes={[{ key: "guide", label: "Guide" }]}><TreeBody /></Tree>;
```

## Styles

```css
.root { composes: interactive from "../../../styles/interactive-components.module.css"; min-inline-size: var(--zero); }
.label { composes: stateFeedback from "../../../styles/motion-components.module.css"; display: block; padding: var(--space-2); border: var(--border-width-thin) var(--border-style-default) var(--color-transparent); }
.root[data-selected="true"] > .label { background: var(--color-surface-subtle); border-color: var(--color-border-default); }
.root[aria-disabled="true"] > .label { opacity: var(--opacity-disabled); }
@media (forced-colors: active) { .root[data-selected="true"] > .label { border-color: var(--color-system-highlight); } }
```

## Hooks

```tsx
"use client";
import { useRef, useLayoutEffect, useImperativeHandle } from "react";
import { useTreeContext } from "../../../internal/tree/TreeContext";
import type { TreeItemProps } from "./TreeItem";
export function useTreeItem(input: TreeItemProps) {
  const { node, level, position, siblingCount, ref, className, onFocus, onClick, onKeyDown, onPointerDown, ...props } = input;
  if ("children" in input && input.children != null) throw new Error("TreeItem owns its plain label and descendant group.");
  if ([level, position, siblingCount].some((value) => value !== undefined && (!Number.isInteger(value) || value < 1)) || (position !== undefined && siblingCount !== undefined && position > siblingCount)) throw new Error("TreeItem metadata must use positive valid sibling coordinates.");
  const tree = useTreeContext(); const itemRef = useRef<HTMLLIElement>(null);
  useImperativeHandle(ref, () => itemRef.current!, []);
  const visible = tree.visibleNodes.some((entry) => entry.node.key === node.key);
  const register = tree.focus.registerItem;
  useLayoutEffect(() => register({ id: node.key, ref: itemRef, textValue: node.label, disabled: !!node.disabled || !visible }), [register, node.key, node.label, node.disabled, visible]);
  const handleFocus: NonNullable<TreeItemProps["onFocus"]> = (event) => { onFocus?.(event); if (!event.defaultPrevented && event.target === event.currentTarget && !node.disabled) tree.focus.onItemFocus(node.key); };
  const handleClick: NonNullable<TreeItemProps["onClick"]> = (event) => { onClick?.(event); event.stopPropagation(); if (!event.defaultPrevented && !node.disabled) { itemRef.current?.focus(); tree.select(node.key); } };
  const handleKeyDown: NonNullable<TreeItemProps["onKeyDown"]> = (event) => { onKeyDown?.(event); event.stopPropagation(); if (!event.defaultPrevented) tree.onNodeKeyDown(event, node.key); };
  const handlePointerDown: NonNullable<TreeItemProps["onPointerDown"]> = (event) => { onPointerDown?.(event); if (!event.defaultPrevented && node.disabled && (event.target as Element).closest('[role="treeitem"]') === event.currentTarget) event.preventDefault(); };
  return { props, className, node, level, position, siblingCount, itemRef, selected: tree.selected === node.key, branch: !!node.children?.length, expanded: tree.isExpanded(node.key), tabIndex: tree.focus.tabIndex(node.key), animated: tree.animated, handleFocus, handleClick, handleKeyDown, handlePointerDown };
}
```

## Content

```tsx
"use client";
import type { NativeTreeItemProps, TreeNodeDescriptor } from "../../../types";
import { Text } from "../../atoms/Text";
import { TreeGroup } from "../TreeGroup";
import { useTreeItem } from "./useTreeItem";
import styles from "./TreeItem.module.css";
export interface TreeItemProps extends NativeTreeItemProps { node: TreeNodeDescriptor; level?: number; position?: number; siblingCount?: number; }
export function TreeItem(input: TreeItemProps) {
  const { props, className, node, level, position, siblingCount, itemRef, selected, branch, expanded, tabIndex, animated, handleFocus, handleClick, handleKeyDown, handlePointerDown } = useTreeItem(input);
  return <li {...props} ref={itemRef} role="treeitem" aria-label={node.label} aria-disabled={!!node.disabled} aria-level={level} aria-posinset={position} aria-setsize={siblingCount} aria-selected={selected} aria-expanded={branch ? expanded : undefined} tabIndex={tabIndex} data-selected={selected || undefined} className={[styles.root, className].filter(Boolean).join(" ")} onFocus={handleFocus} onClick={handleClick} onKeyDown={handleKeyDown} onPointerDown={handlePointerDown}><Text as="span" className={styles.label} data-animated={animated} weight={selected ? "semibold" : undefined}>{node.label}</Text>{branch && <TreeGroup parentKey={node.key} nodes={node.children!} level={(level ?? 1) + 1} />}</li>;
}
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

- [x] Given TreeItem, Item registers its li ref/text with root navigation and marks hidden descendants unavailable.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Local fields contract uses Required unless optional in Signature; constraints stated below.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Disabled node cannot be selected/expanded.
- [x] Nested child click/key events stop at the owning treeitem, so a child does not select an ancestor.
- [x] Only branches expose expanded state.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] useTreeItem is colocated with TreeItem and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] V2 **Generated tree nodes**: Demonstrate through real Tree nodes and TreeBody, with an indexed parent and two children; expansion/selection generates the part without orphan JSX or private context.
- [x] The TreeItem V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useTreeItemExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
