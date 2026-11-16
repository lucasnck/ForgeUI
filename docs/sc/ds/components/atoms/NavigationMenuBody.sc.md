---
title: "NavigationMenuBody"
scope: "NavigationMenu public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# NavigationMenuBody

## Files

```text
features/showcase/examples/NavigationMenuPartExamples.tsx (C)
design-system/components/atoms/NavigationMenuBody/NavigationMenuBody.tsx (C)
design-system/components/atoms/NavigationMenuBody/NavigationMenuBody.module.css (C)
design-system/components/atoms/NavigationMenuBody/index.ts (C)
design-system/internal/navigationmenu/NavigationMenuContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/NavigationMenuBody.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
design-system/components/atoms/NavigationMenuBody/useNavigationMenuBody.ts (C)
../scripts/check-static-components.cjs (M)
features/showcase-v2/components/NavigationMenuBody/definition.ts (C)
features/showcase-v2/components/NavigationMenuBody/NavigationMenuBody.example.tsx (C)
features/showcase-v2/components/NavigationMenuBody/useNavigationMenuBodyExample.ts (C)
features/showcase-v2/components/NavigationMenuBody/usage-code.ts (C)
features/showcase-v2/components/NavigationMenu/fixtures.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [tech-animations.sc.md](../../styles/animations/tech-motion-recipes.sc.md)
- [tech-collection-contracts.sc.md](../../types/tech-collection-contracts.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [NavigationMenu.sc.md](../organisms/NavigationMenu.sc.md)

## Contract

```tsx
import { NavigationMenu, NavigationMenuBody, NavigationMenuItem } from "@forge-ui/web";
<NavigationMenu label="Navigation"><NavigationMenuBody><NavigationMenuItem label="Page" href="#page" /></NavigationMenuBody></NavigationMenu>;
```

## Styles

```css
.root {
  composes: stack from "../../../styles/layout-components.module.css";
  --stack-gap: var(--space-2);
  margin: var(--zero);
  padding: var(--zero);
  list-style: none;
  min-inline-size: var(--zero);
  color: var(--color-text-default);
  overflow-wrap: anywhere;
}

.root[hidden] {
  display: none;
}
```

## Hooks

```tsx
"use client";

import { useNavigationMenuContext } from "../../../internal/navigationmenu/NavigationMenuContext";
import type { NavigationMenuBodyProps } from "./NavigationMenuBody";

export function useNavigationMenuBody({ children, className, ...props }: NavigationMenuBodyProps) {
  useNavigationMenuContext();
  return { props, children, className };
}
```

## Content

```tsx
"use client";

import type { ComponentPropsWithRef } from "react";
import { validateNavigationItems } from "../../../internal/navigationmenu/validateNavigationItems";
import { NavigationMenuItem } from "../../molecules/NavigationMenuItem";
import { useNavigationMenuBody } from "./useNavigationMenuBody";
import styles from "./NavigationMenuBody.module.css";

export interface NavigationMenuBodyProps extends ComponentPropsWithRef<"ul"> {}

export function NavigationMenuBody(input: NavigationMenuBodyProps) {
  const { props, children, className } = useNavigationMenuBody(input);
  validateNavigationItems(children, NavigationMenuItem);
  return (
    <ul {...props} role={undefined} className={[styles.root, className].filter(Boolean).join(" ")}>
      {children}
    </ul>
  );
}
```

## Tests

- V2 NavigationMenuBody contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Server-render native nav/ul/li/link hierarchy, one current page and collapsed inert disclosure panels.
- Reject orphan parts, invalid wrappers, ambiguous group href/current and missing leaf href.
- In the browser, verify native Tab/Enter/Space, caller prevention, nested disclosure isolation and close-focus repair.
- Verify animated=false, reduced motion and localized/theme presentation in the browser.

## Criteria

- [x] Given NavigationMenuBody, Body renders native ul with NavigationMenuItem li outputs; links/disclosure triggers keep native keyboard behavior and no menu action role is added.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Body renders native ul with NavigationMenuItem li outputs; links/disclosure triggers keep native keyboard behavior and no menu action role is added.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] useNavigationMenuBody is colocated with NavigationMenuBody and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] V2 **NavigationMenuBody contextual region**: Render NavigationMenuBody through public NavigationMenu with the minimum valid siblings. Show Text children="Children" or the actual owner-generated options/records, preserving required siblings and owner semantics. Hide/omit optional siblings only where allowed by the owner; link to the full NavigationMenu composition.
- [x] The NavigationMenuBody V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useNavigationMenuBodyExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] Contextual V2 collection data reuses the NavigationMenu fixture module listed in Files; part pages do not create a second index/key sequence for the same records.
