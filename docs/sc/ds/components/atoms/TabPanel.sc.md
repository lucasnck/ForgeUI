---
title: "TabPanel"
scope: "Tabs compound part: TabPanel. No independent family state machine."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# TabPanel

## Files

```text
design-system/components/atoms/TabPanel/TabPanel.tsx (C)
design-system/components/atoms/TabPanel/TabPanel.module.css (C)
design-system/components/atoms/TabPanel/index.ts (C)
design-system/internal/tabs/TabsContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/TabPanel.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
design-system/components/atoms/TabPanel/useTabPanel.ts (C)
features/showcase-v2/components/TabPanel/definition.ts (C)
features/showcase-v2/components/TabPanel/TabPanel.example.tsx (C)
features/showcase-v2/components/TabPanel/useTabPanelExample.ts (C)
features/showcase-v2/components/TabPanel/usage-code.ts (C)
features/showcase-v2/model/collection-control-options.ts (C)
features/showcase-v2/model/showcase-v2-control-options.ts (M)
features/showcase-v2/components/Tabs/fixtures.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [tech-roving-focus.sc.md](../../hooks/tech-roving-focus.sc.md)

## Contract

```tsx
import { Tabs, TabsHeader, Tab, TabsBody, TabPanel } from "@forge-ui/web";
<Tabs label="Details"><TabsHeader hidden><Tab value="one">Overview</Tab></TabsHeader><TabsBody><TabPanel value="one">Overview content</TabPanel></TabsBody></Tabs>;
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
import type { TabPanelProps } from "./TabPanel";
export function useTabPanel(input: TabPanelProps) {
  const { value, onFocusCapture, onBlurCapture, className, ...props } = input;
  const tabs = useTabsContext();
  const handleFocus: NonNullable<TabPanelProps["onFocusCapture"]> = (event) => { onFocusCapture?.(event); if (!event.defaultPrevented) tabs.panelFocused(value); };
  const handleBlur: NonNullable<TabPanelProps["onBlurCapture"]> = (event) => { onBlurCapture?.(event); if (!event.defaultPrevented && !event.currentTarget.contains(event.relatedTarget)) tabs.panelBlurred(value, event.relatedTarget); };
  return { props, className, hidden: tabs.selected !== value, id: tabs.panelId(value), labelId: tabs.tabId(value), handleFocus, handleBlur };
}
```

## Content

```tsx
"use client";
import type { ComponentPropsWithRef } from "react";
import { useTabPanel } from "./useTabPanel";
import styles from "./TabPanel.module.css";
export interface TabPanelProps extends ComponentPropsWithRef<"div"> { value: string; }
export function TabPanel(input: TabPanelProps) {
  const { props, className, hidden, id, labelId, handleFocus, handleBlur } = useTabPanel(input);
  return <div {...props} role="tabpanel" id={id} aria-labelledby={labelId} hidden={hidden} className={[styles.root, className].filter(Boolean).join(" ")} onFocusCapture={handleFocus} onBlurCapture={handleBlur} />;
}
```

## Tests

- V2 Linked tab panels: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- `npm run test:overlays` verifies real React SSR: first enabled selection, controlled unavailable fallback, one tab stop, mounted hidden panels and scoped parts. `npm run test:hooks` verifies accepted local selection and rejected controlled requests. Browser keyboard/focus coverage remains separate.

- Disabled or unregistered items are skipped during the family’s documented keyboard traversal.
- Caller-prevented activation runs no owned selection/action and does not duplicate callbacks.
- Nested scopes and unmount cleanup preserve independent registration and stable relationship ids.

## Criteria

- [x] Given TabPanel, Panel id matches its Tab aria-controls, uses role=tabpanel/aria-labelledby and hidden when not selected.
- [x] The children contract uses Native React content; only allowed semantic descendants.
- [x] The value contract uses Required stable item identity, unique within its root.
- [x] The Native attrs contract uses Forward to semantic owner; relationship/role attributes supplied by context take precedence.
- [x] The Missing region contract uses Owner omits it; no generated empty wrapper.
- [x] Panel id matches its Tab aria-controls, uses role=tabpanel/aria-labelledby and hidden when not selected.
- [x] Header/Body/Footer naming describes composition responsibility, not an automatic HTML landmark.
- [x] A semantic heading is explicit; do not introduce section landmarks for every item.
- [x] Use existing atom recipes when composing Button, Input, Checkbox, Radio, Heading or Tag.
- [x] No new tokens, size axis or timing constants.
- [x] State, callbacks, native form values and focus update immediately.
- [x] Preserve Header/Body/Footer hierarchy and mount/focus policy from that visual owner.
- [x] Optional sections do not fade independently.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.
- [x] useTabPanel is colocated with TabPanel and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] V2 **Linked tab panels**: Compose three Tabs and matching TabPanels with required public Header/Body and optional Footer, stable item-1..3 values and Children 1..3; supported navigation updates accepted selection and correct panel relationships.
- [x] The TabPanel V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useTabPanelExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] Contextual V2 collection data reuses the Tabs fixture module listed in Files; part pages do not create a second index/key sequence for the same records.
