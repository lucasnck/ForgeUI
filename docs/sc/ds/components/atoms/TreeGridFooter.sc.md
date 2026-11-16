---
title: "TreeGridFooter"
scope: "TreeGrid public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# TreeGridFooter

## Files

```text
features/showcase/examples/GridPartExamples.tsx (C)
design-system/components/atoms/TreeGridFooter/TreeGridFooter.tsx (C)
design-system/components/atoms/TreeGridFooter/TreeGridFooter.module.css (C)
design-system/components/atoms/TreeGridFooter/index.ts (C)
design-system/internal/treegrid/TreeGridContext.ts (C)
design-system/internal/treegrid/validateParts.ts (C)
design-system/index.ts (M)
features/showcase/examples/TreeGridFooter.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
design-system/components/atoms/TreeGridFooter/useTreeGridFooter.ts (C)
features/showcase-v2/components/TreeGridFooter/definition.ts (C)
features/showcase-v2/components/TreeGridFooter/TreeGridFooter.example.tsx (C)
features/showcase-v2/components/TreeGridFooter/useTreeGridFooterExample.ts (C)
features/showcase-v2/components/TreeGridFooter/usage-code.ts (C)
features/showcase-v2/components/TreeGrid/fixtures.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [tech-animations.sc.md](../../styles/animations/tech-motion-recipes.sc.md)
- [tech-collection-contracts.sc.md](../../types/tech-collection-contracts.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [TreeGrid.sc.md](../organisms/TreeGrid.sc.md)

## Contract

```tsx
import { TreeGrid, TreeGridBody, TreeGridFooter, TreeGridHeader } from "@forge-ui/web";
<TreeGrid label="Resources" nodes={[]} columns={columns} getNodeLabel={getNodeLabel}><TreeGridHeader hidden /><TreeGridBody hidden /><TreeGridFooter>Summary and actions</TreeGridFooter></TreeGrid>;
```

## Styles

```css
.root { composes: stack from "../../../styles/layout-components.module.css"; --stack-gap: var(--space-2); padding: var(--space-2); min-inline-size: var(--zero); color: var(--color-text-default); }

.root[hidden] { display: none; }
```

## Hooks

```tsx
"use client";
import { useTreeGridContext } from "../../../internal/treegrid/TreeGridContext";
import type { TreeGridFooterProps } from "./TreeGridFooter";
export function useTreeGridFooter(input: TreeGridFooterProps) { const { children, className, ...props } = input; useTreeGridContext(); return { props, className, children }; }
```

## Content

```tsx
"use client";
import type { ComponentPropsWithRef } from "react";
import { useTreeGridFooter } from "./useTreeGridFooter";
import styles from "./TreeGridFooter.module.css";
export interface TreeGridFooterProps extends ComponentPropsWithRef<"div"> {
}
export function TreeGridFooter(props: TreeGridFooterProps) { const view = useTreeGridFooter(props); return <div {...view.props} className={[styles.root, view.className].filter(Boolean).join(" ")}>{view.children}</div>; }
```

## Tests

- V2 TreeGridFooter contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Actual browser verification covers cell-only arrows, RTL bounds, accepted controlled collapse repairing descendant focus to the ancestor/current column without callbacks, and 12 locale/theme combinations preserving row count and one tab stop.

- `npm run test:overlays` verifies actual React SSR semantics and family guards.
- `npm run test:hooks` verifies keyboard control and focus repair; browser validation is separate.
- Disabled or unregistered items are skipped during the family’s documented keyboard traversal.
- Caller-prevented activation runs no owned selection/action and does not duplicate callbacks.
- Nested scopes and unmount cleanup preserve independent registration and stable relationship ids.

## Criteria

- [x] Given TreeGridFooter, Footer sits outside table and contains optional related pagination/summary/actions; it is not a table rowgroup or a live region by default.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Footer sits outside table and contains optional related pagination/summary/actions; it is not a table rowgroup or a live region by default.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] useTreeGridFooter is colocated with TreeGridFooter and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] V2 **TreeGridFooter contextual region**: Compose TreeGrid and required Body/Header for indexed nodes and columns. Footer shows visible/selected counts and an external expansion-reset action through accepted caller state; it does not invent grid paging or virtualization props. Link to the full owning composition.
- [x] The TreeGridFooter V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useTreeGridFooterExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] Contextual V2 collection data reuses the TreeGrid fixture module listed in Files; part pages do not create a second index/key sequence for the same records.
