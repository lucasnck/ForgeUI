---
title: "Tabs"
scope: "Aggregate scoped Tabs parts and consume DS-owned behavior; no duplicate item markup or hook state."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# Tabs

## Files

```text
design-system/components/molecules/Tabs/Tabs.tsx (C)
design-system/components/molecules/Tabs/Tabs.module.css (C)
design-system/components/molecules/Tabs/index.ts (C)
design-system/internal/tabs/TabsContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/Tabs.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
design-system/components/molecules/Tabs/useTabs.ts (C)
features/showcase-v2/components/Tabs/definition.ts (C)
features/showcase-v2/components/Tabs/Tabs.example.tsx (C)
features/showcase-v2/components/Tabs/useTabsExample.ts (C)
features/showcase-v2/components/Tabs/usage-code.ts (C)
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
- [Tab.sc.md](../atoms/Tab.sc.md)
- [TabPanel.sc.md](../atoms/TabPanel.sc.md)
- [TabsHeader.sc.md](../atoms/TabsHeader.sc.md)
- [Focus contracts](../../types/tech-focus-contracts.sc.md)

## Contract

```tsx
import { Tabs, TabsHeader, Tab, TabsBody, TabPanel, TabsFooter } from "@forge-ui/web";
<Tabs label="Details" defaultValue="summary"><TabsHeader><Tab value="summary">Summary</Tab><Tab value="history">History</Tab></TabsHeader><TabsBody><TabPanel value="summary">Summary content</TabPanel><TabPanel value="history">History content</TabPanel></TabsBody><TabsFooter>Common action</TabsFooter></Tabs>;
```

## Styles

```css
.root { composes: stack from "../../../styles/layout-components.module.css"; padding: var(--space-3); min-inline-size: var(--zero); }

.root[hidden] { display: none; }
```

## Hooks

```tsx
"use client";
import { useId, useLayoutEffect, useRef, useState } from "react";
import { useRovingFocus } from "../../../hooks/focus/useRovingFocus";
import type { TabIdentity } from "../../../internal/tabs/TabsContext";
import type { TabsProps } from "./Tabs";
export function useTabs(input: TabsProps, identities: readonly TabIdentity[]) {
  const { value, defaultValue, onValueChange, label, direction = "ltr", children, animated = true, className, ...props } = input;
  if (!label.trim()) throw new Error("Tabs requires a nonempty label.");
  const first = identities.find((item) => !item.disabled)?.value;
  const [local, setLocal] = useState(defaultValue ?? first);
  const supplied = value ?? local;
  const selected = identities.some((item) => item.value === supplied && !item.disabled) ? supplied : first;
  const generatedId = useId();
  const headerRef = useRef<HTMLDivElement>(null);
  const focusedPanel = useRef<string | null>(null);
  const previous = useRef(selected);
  const focus = useRovingFocus({ orientation: "horizontal", direction, loop: true, typeahead: false, initialId: selected, fallbackRef: headerRef });
  function repair(next: string | undefined) { if (next) focus.focus(next); else headerRef.current?.focus(); focusedPanel.current = null; }
  function select(next: string) {
    if (next === selected || !identities.some((item) => item.value === next && !item.disabled)) return;
    if (value === undefined) { if (focusedPanel.current === selected) repair(next); setLocal(next); }
    onValueChange?.(next);
  }
  useLayoutEffect(() => { if (previous.current !== selected && focusedPanel.current === previous.current) repair(selected); previous.current = selected; });
  return { children, props: { ...props, dir: direction }, className, context: {
    selected, select, focus, label, animated, headerRef, fallback: first === undefined,
    tabId: (key: string) => generatedId + "-tab-" + encodeURIComponent(key), panelId: (key: string) => generatedId + "-panel-" + encodeURIComponent(key),
    panelFocused: (key: string) => { focusedPanel.current = key; },
    panelBlurred: (key: string, related: EventTarget | null) => { if (related && focusedPanel.current === key) focusedPanel.current = null; },
  } };
}
```

## Content

```tsx
"use client";
import { Children, Fragment, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";
import type { NativeCollectionRootProps, ComponentChildrenProps, ComponentSelectionProps, ComponentAnimatedProps, NavigationDirection } from "../../../types";
import { collectCompoundParts } from "../../../helpers/compound";
import { TabsContext } from "../../../internal/tabs/TabsContext";
import type { TabIdentity } from "../../../internal/tabs/TabsContext";
import { TabsHeader } from "../../atoms/TabsHeader";
import { TabsBody } from "../../atoms/TabsBody";
import { TabsFooter } from "../../atoms/TabsFooter";
import { Tab } from "../../atoms/Tab";
import { TabPanel } from "../../atoms/TabPanel";
import { useTabs } from "./useTabs";
import styles from "./Tabs.module.css";
export interface TabsProps extends NativeCollectionRootProps, ComponentChildrenProps, ComponentSelectionProps<string>, ComponentAnimatedProps { label: string; direction?: NavigationDirection; }
function collect(children: ReactNode, constructor: typeof Tab | typeof TabPanel, values: TabIdentity[] = []) {
  Children.forEach(children, (child) => {
    if (child == null || typeof child === "boolean") return;
    if (!isValidElement<TabIdentity & { children?: ReactNode }>(child)) throw new Error("Invalid Tabs child.");
    if (child.type === Fragment && child.key !== null) { collect(child.props.children, constructor, values); return; }
    if (child.type !== constructor || !child.props.value.trim() || values.some((item) => item.value === child.props.value)) throw new Error("Tabs identities must be direct, nonempty and unique.");
    values.push({ value: child.props.value, disabled: child.props.disabled });
  });
  return values;
}
export function Tabs(input: TabsProps) {
  const parts = collectCompoundParts(input.children, { header: TabsHeader, body: TabsBody, footer: TabsFooter });
  const tabs = collect((parts.header as ReactElement<{ children: ReactNode }>).props.children, Tab);
  const panels = collect((parts.body as ReactElement<{ children: ReactNode }>).props.children, TabPanel);
  if (tabs.length !== panels.length || tabs.some((item) => !panels.some((panel) => panel.value === item.value))) throw new Error("Every Tab requires one corresponding TabPanel.");
  const { props, className, context } = useTabs(input, tabs);
  return <TabsContext value={context}><div {...props} className={[styles.root, className].filter(Boolean).join(" ")} data-gap="2">{parts.header}{parts.body}{parts.footer}</div></TabsContext>;
}
```

## Tests

- V2 Linked tab panels: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- `npm run test:overlays` verifies real React SSR: first enabled selection, controlled unavailable fallback, one tab stop, mounted hidden panels and scoped parts. `npm run test:hooks` verifies accepted local selection and rejected controlled requests. Browser keyboard/focus coverage remains separate.

- Disabled or unregistered items are skipped during the family’s documented keyboard traversal.
- Caller-prevented activation runs no owned selection/action and does not duplicate callbacks.
- Nested scopes and unmount cleanup preserve independent registration and stable relationship ids.

## Criteria

- [x] The children contract uses Explicit public parts; keyed fragments allowed; no arbitrary descendant cloning.
- [x] Header and Body are required; an absent optional Footer introduces no empty region.
- [x] The value / defaultValue contract uses undefined / first enabled Tab value.
- [x] The label / direction contract uses Required / ltr.
- [x] The activation contract uses Manual; never select on arrows.
- [x] Enter/Space click selects.
- [x] Default is supplied defaultValue or first enabled Tab in normalized direct Header children, determined during render for SSR, not registration timing.
- [x] Unknown/disabled controlled selection renders first enabled fallback without an effect callback.
- [x] Preserve mounted hidden panels; repair focus before hiding focused content.
- [x] Native select was considered but does not provide simultaneous tab/panel composition.
- [x] Public native attributes go to their semantic owner.
- [x] Normalize permitted direct parts/keyed fragments with private collectCompoundParts; it receives actual imported component identities, never displayName strings.
- [x] Forward caller events before owned handlers and respect defaultPrevented.
- [x] No new token family or motion is added.
- [x] State, callbacks, native form values and focus update immediately.
- [x] Preserve Header/Body/Footer hierarchy and mount/focus policy from that visual owner.
- [x] Optional sections do not fade independently.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.
- [x] useTabs is colocated with Tabs and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Token-backed root padding keeps tab controls, native paired panels and optional actions away from container edges.

- [x] V2 **Linked tab panels**: Compose three Tabs and matching TabPanels with public Header/Body/Footer, stable item-1..3 values and Children 1..3; supported navigation updates accepted selection and correct panel relationships.
- [x] The Tabs V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useTabsExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
