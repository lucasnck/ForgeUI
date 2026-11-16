---
title: "TabsFooter"
scope: "Tabs compound part: TabsFooter. No independent family state machine."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# TabsFooter

## Files

```text
design-system/components/atoms/TabsFooter/TabsFooter.tsx (C)
design-system/components/atoms/TabsFooter/TabsFooter.module.css (C)
design-system/components/atoms/TabsFooter/index.ts (C)
design-system/internal/tabs/TabsContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/TabsFooter.example.tsx (M)
features/showcase/model/showcase-registry.ts (M)
design-system/components/atoms/TabsFooter/useTabsFooter.ts (C)
features/showcase-v2/components/TabsFooter/definition.ts (C)
features/showcase-v2/components/TabsFooter/TabsFooter.example.tsx (C)
features/showcase-v2/components/TabsFooter/useTabsFooterExample.ts (C)
features/showcase-v2/components/TabsFooter/usage-code.ts (C)
features/showcase-v2/model/collection-control-options.ts (C)
features/showcase-v2/model/showcase-v2-control-options.ts (M)
features/showcase-v2/components/Tabs/fixtures.ts (C)
features/showcase-v2/messages/useShowcaseV2Copy.ts (M)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [tech-roving-focus.sc.md](../../hooks/tech-roving-focus.sc.md)

## Contract

```tsx
import { Tabs, TabsHeader, Tab, TabsBody, TabPanel, TabsFooter } from "@forge-ui/web";
<Tabs label="Details"><TabsHeader hidden><Tab value="one">Overview</Tab></TabsHeader><TabsBody hidden><TabPanel value="one">Overview content</TabPanel></TabsBody><TabsFooter>Additional information</TabsFooter></Tabs>;
```

## Styles

```css
.root { composes: stack from "../../../styles/layout-components.module.css"; --stack-gap: var(--space-2); min-inline-size: var(--zero); }

.root[hidden] { display: none; }
```

## Hooks

```tsx
"use client";
import { useTabsContext } from "../../../internal/tabs/TabsContext";
import type { TabsFooterProps } from "./TabsFooter";
export function useTabsFooter(input: TabsFooterProps) {
  useTabsContext();
  const { className, ...props } = input;
  
  return { props, className,  };
}
```

## Content

```tsx
"use client";
import type { ComponentPropsWithRef } from "react";
import { useTabsFooter } from "./useTabsFooter";
import styles from "./TabsFooter.module.css";
export interface TabsFooterProps extends ComponentPropsWithRef<"div"> {}
export function TabsFooter(input: TabsFooterProps) {
  const { props, className,  } = useTabsFooter(input);
  return <div {...props}  className={[styles.root, className].filter(Boolean).join(" ")} />;
}
```

## Tests

- V2 TabsFooter contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- `npm run test:overlays` verifies real React SSR: first enabled selection, controlled unavailable fallback, one tab stop, mounted hidden panels and scoped parts. `npm run test:hooks` verifies accepted local selection and rejected controlled requests. Browser keyboard/focus coverage remains separate.

- Disabled or unregistered items are skipped during the family’s documented keyboard traversal.
- Caller-prevented activation runs no owned selection/action and does not duplicate callbacks.
- Nested scopes and unmount cleanup preserve independent registration and stable relationship ids.

## Criteria

- [x] Given TabsFooter, Footer remains outside hidden tab panels and contains optional common actions.
- [x] The children contract uses Native React content; only allowed semantic descendants.
- [x] The Native attrs contract uses Forward to semantic owner; relationship/role attributes supplied by context take precedence.
- [x] The Missing region contract uses Owner omits it; no generated empty wrapper.
- [x] Footer remains outside hidden tab panels and contains optional common actions.
- [x] Header/Body/Footer naming describes composition responsibility, not an automatic HTML landmark.
- [x] A semantic heading is explicit; do not introduce section landmarks for every item.
- [x] Use existing atom recipes when composing Button, Input, Checkbox, Radio, Heading or Tag.
- [x] No new tokens, size axis or timing constants.
- [x] State, callbacks, native form values and focus update immediately.
- [x] Preserve Header/Body/Footer hierarchy and mount/focus policy from that visual owner.
- [x] Optional sections do not fade independently.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.
- [x] useTabsFooter is colocated with TabsFooter and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] V2 **TabsFooter contextual region**: Compose Tabs with registered Tab/TabPanel pairs and required Header/Body. Footer shows the accepted active-panel summary and a caller-owned Next panel action using actual public controlled selection; preserve matching stable values and focus rules. Link to the full owning composition.
- [x] The TabsFooter V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useTabsFooterExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] Contextual V2 collection data reuses the Tabs fixture module listed in Files; part pages do not create a second index/key sequence for the same records.
