---
title: "TagGroup"
scope: "Render a semantic wrapping list of Tag items"
status: "DONE"
type: "component"
ds-level: "molecules"
---

# TagGroup

## Files

```text
design-system/components/molecules/TagGroup/TagGroup.tsx (M)
design-system/components/molecules/TagGroup/TagGroup.module.css (M)
design-system/components/molecules/TagGroup/index.ts (M)
design-system/index.ts (M)
features/showcase/examples/TagGroup.example.tsx (M)
features/showcase/examples/control-variations.ts (M)
features/showcase/examples/useExampleCopy.ts (M)
features/showcase/examples/ShowcaseExamples.module.css (M)
features/showcase/model/showcase-registry.ts (M)
../scripts/check-design-system.cjs (M)
features/showcase-v2/components/TagGroup/definition.ts (C)
features/showcase-v2/components/TagGroup/TagGroup.example.tsx (C)
features/showcase-v2/components/TagGroup/useTagGroupExample.ts (C)
features/showcase-v2/components/TagGroup/usage-code.ts (C)
features/showcase-v2/model/collection-control-options.ts (C)
features/showcase-v2/model/showcase-v2-control-options.ts (M)
features/showcase-v2/components/TagGroup/fixtures.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [Tag](Tag.sc.md)
- [Native control recipes](../../styles/tech-native-control-recipes.sc.md)
- [Component capabilities](../../types/tech-component-capabilities.sc.md)

## Contract

```tsx
import { TagGroup } from "@forge-ui/web";
<TagGroup aria-label="Skills" items={skillTags}/>;
```

## Styles

```css
.root {
  composes: fullWidth from "../../../styles/full-width-components.module.css";
  display: flex;
  flex-wrap: wrap;
  inline-size: fit-content;
  max-inline-size: var(--size-full);
  gap: var(--space-1);
  margin: var(--zero);
  padding: var(--zero);
  list-style: none;
}
.item {
  min-inline-size: var(--zero);
  max-inline-size: var(--size-full);
}
```
## Content

```tsx
import { TagGroupItem } from "../TagGroupItem";
import type { TagProps } from "../Tag";
import type { ReactElement, ReactNode } from "react";
import type { NativeCollectionListProps } from "../../../types/compound-composition";
import type {
  ComponentFullWidthProps,
} from "../../../types/component-capabilities";

export interface TagGroupEntry extends TagProps {
  id: string;
}

export interface TagGroupProps extends NativeCollectionListProps, ComponentFullWidthProps {
  items?: readonly TagGroupEntry[];
  children?: ReactNode;
}
import styles from "./TagGroup.module.css";

export function TagGroup({
  className,
  items,
  children,
  fullWidth = true,
  ...props
}: TagGroupProps): ReactElement {
  if (items !== undefined && children !== undefined) throw new Error("TagGroup accepts either items or children, not both.");
  if (items === undefined && children === undefined) throw new Error("TagGroup requires items or list-item children.");
  if (items && new Set(items.map(item => item.id)).size !== items.length) throw new Error("TagGroup items require unique stable IDs.");
  return (
    <ul
      {...props}
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-full-width={fullWidth || undefined}
    >
      {items ? items.map(({ id, ...tag }) => <TagGroupItem key={id} className={styles.item} tag={{ ...tag, id }} />) : children}
    </ul>
  );
}
```
## Tests

- V2 Indexed tag removal: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

## Criteria

- [x] Empty/one/many items, widths, mixed child visuals, long wrapping labels and removable/disabled children are demonstrated.
- [x] Unique stable keys and ul/li semantics survive caller updates; items are never mutated.
- [x] Long items wrap in LTR/RTL and removal leaves focus recovery to caller.
- [x] Exactly one Molecule registration exists in Showcase; examples cover its supported public capabilities.
- [x] Lint, type, token and static-export checks pass; canonical interfaces/recipes are reused.
- [x] No selection engine, drag reordering, overflow counter or internal removal state.
- [x] The Defaults contract uses either items with unique stable IDs or explicit list-item children; each data item inherits its own TagProps.
- [x] The Constraint 1 contract uses fullWidth true; false uses intrinsic list width.
- [x] The Constraint 2 contract uses Empty items retains empty ul, without generated English empty message.
- [x] The Constraint 3 contract uses Native aria-label/aria-labelledby names group when context requires it.
- [x] The Constraint 4 contract uses No group-level tone/size/shape duplication or arrow-key composite widget.
- [x] Defaults are those in Signature.
- [x] TagGroupEntry names the data interface; TagGroupItem is the renderer. No new shared layout recipe required; Tag owns all child visual capabilities.
- [x] Caller restores focus after removing an action.

- [x] V2 **Indexed tag removal**: Compose three contextual tags with Children 1..3 and distinct remove labels; remove item 2 once and preserve keys/labels 1 and 3, then reset the original collection.
- [x] The TagGroup V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useTagGroupExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
