---
title: "TagGroupItem"
scope: "A semantic list item composing the existing Tag presentation and removal action. Excludes collection selection and duplicate tag behavior."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# TagGroupItem

## Files

```text
design-system/components/molecules/TagGroupItem/TagGroupItem.tsx (C)
design-system/components/molecules/TagGroupItem/TagGroupItem.module.css (C)
design-system/components/molecules/TagGroupItem/index.ts (C)
design-system/index.ts (M)
features/showcase/examples/TagGroupItem.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
features/showcase-v2/components/TagGroupItem/definition.ts (C)
features/showcase-v2/components/TagGroupItem/TagGroupItem.example.tsx (C)
features/showcase-v2/components/TagGroupItem/useTagGroupItemExample.ts (C)
features/showcase-v2/components/TagGroupItem/usage-code.ts (C)
features/showcase-v2/model/collection-control-options.ts (C)
features/showcase-v2/model/showcase-v2-control-options.ts (M)
features/showcase-v2/components/TagGroup/fixtures.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [Tag.sc.md](Tag.sc.md)

## Contract

```tsx
import { TagGroup, TagGroupItem } from "@forge-ui/web";
<TagGroup aria-label="Skills"><TagGroupItem tag={{ children: "Frontend", onRemove: removeTag, removeLabel: "Remove Frontend" }}/></TagGroup>;
```

## Styles

```css
.root {
  min-inline-size: var(--zero);
}
```
## Content

```tsx
import type { NativeTagGroupItemProps } from "../../../types/compound-composition";
import { Tag, type TagProps } from "../Tag";
import styles from "./TagGroupItem.module.css";

export interface TagGroupItemProps extends NativeTagGroupItemProps {
  tag: TagProps;
}

export function TagGroupItem({ className, tag, ...props }: TagGroupItemProps) {
  return <li {...props} className={[styles.root, className].filter(Boolean).join(" ")}><Tag {...tag} /></li>;
}
```
## Tests

- V2 Indexed tag removal: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

## Criteria

- [x] Given TagGroupItem, its li is inside a native ul/ol and its explicit tag props require no hidden context.
- [x] Given a remove action, existing Tag semantics/callbacks remain unchanged and fire once.
- [x] Given exports, the legacy data interface is renamed before the TagGroupItem function is introduced.
- [x] The tag contract uses Required; existing TagProps passed unchanged.
- [x] The children contract uses Do not use as a second tag content channel; tag.children owns content.
- [x] The item id contract uses Native li id independent from tag.id.
- [x] Root TagGroup owns ul semantics; Item owns li and delegates all visual/removal behavior to Tag.
- [x] No H/B/F is added to this inline tag composition.
- [x] State, callbacks, native form values and focus update immediately.
- [x] Preserve Header/Body/Footer hierarchy and mount/focus policy from that visual owner.
- [x] Optional sections do not fade independently.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.

- [x] V2 **Indexed tag removal**: Compose three contextual tags with Children 1..3 and distinct remove labels; remove item 2 once and preserve keys/labels 1 and 3, then reset the original collection.
- [x] The TagGroupItem V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useTagGroupItemExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] Contextual V2 collection data reuses the TagGroup fixture module listed in Files; part pages do not create a second index/key sequence for the same records.
