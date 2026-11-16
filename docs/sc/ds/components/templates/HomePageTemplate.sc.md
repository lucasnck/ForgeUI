---
title: "HomePageTemplate"
scope: "Neutral starting-page composition of shortcuts, summary and recent content"
status: "DONE"
type: "component"
ds-level: "templates"
---

# HomePageTemplate

## Files

```text
features/showcase-v2/components/HomePageTemplate/usage-code.ts (C)
features/showcase-v2/components/HomePageTemplate/definition.ts (C)
features/showcase-v2/components/HomePageTemplate/HomePageTemplate.example.tsx (C)
features/showcase-v2/components/HomePageTemplate/useHomePageTemplateExample.ts (C)
design-system/components/templates/HomePageTemplate/HomePageTemplate.tsx (C)
design-system/components/templates/HomePageTemplate/HomePageTemplate.module.css (C)
design-system/components/templates/HomePageTemplate/index.ts (C)
design-system/index.ts (M)
features/showcase/examples/HomePageTemplate.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
features/showcase/model/showcase-status.ts (M)
```

## Dependencies

- [PageHeader](../molecules/PageHeader.sc.md)
- [Stack](../atoms/Stack.sc.md)
- [Collection contracts](../../types/tech-collection-contracts.sc.md)
- [Design tokens](../../styles/tech-design-tokens.sc.md)

## Contract

```tsx
import { HomePageTemplate } from "@forge-ui/web";
<HomePageTemplate titleId="home-title" pageTitle="Overview" quickActions={shortcuts} summary={summary}>
  {recentRecords}
</HomePageTemplate>;
```

## Styles

```css
.root { min-inline-size: var(--zero); }
.root[hidden] { display: none; }
.content { min-inline-size: var(--zero); }
```

## Content

```tsx
import type { ReactNode } from "react";
import type { NativeSectionRootProps } from "../../../types/collection-contracts";
import { PageHeader, type PageHeaderContentProps } from "../../molecules/PageHeader";
import { Stack } from "../../atoms/Stack";
import styles from "./HomePageTemplate.module.css";
export interface HomePageTemplateProps extends NativeSectionRootProps, PageHeaderContentProps {
  children: ReactNode;
  quickActions?: ReactNode;
  summary?: ReactNode;
}
export function HomePageTemplate({ titleId, pageTitle, description, identity, breadcrumb, actions, divider, children, className, quickActions, summary, ...props }: HomePageTemplateProps) {
  return <Stack as="section" padding="3" gap="3" {...props} aria-labelledby={titleId} className={[styles.root, className].filter(Boolean).join(" ")}>
    <PageHeader titleId={titleId} pageTitle={pageTitle} description={description} identity={identity} breadcrumb={breadcrumb} actions={actions} divider={divider} />
    {quickActions !== undefined && quickActions !== null && quickActions !== false && quickActions !== true && quickActions !== "" && <div className={styles.content}>{quickActions}</div>}
    {summary !== undefined && summary !== null && summary !== false && summary !== true && summary !== "" && <div className={styles.content}>{summary}</div>}
    <div className={styles.content}>{children}</div>
  </Stack>;
}
```

## Tests

- Verify the named V2 preview composition, independent reset and link to its routed neutral demo.

- Render title plus recent records only, then shortcuts/summary/recent sections.
- Render each unresolved region independently using caller-supplied matching skeletons; retain available regions.

## Criteria

- [x] Template is a content section inside the existing application main; it adds no main, outer application banner/menu, router, provider or data request.
- [x] Header spacing and title/identity/actions reuse PageHeader. Root padding and region gaps use space-3 tokens; absent optional slots omit their wrappers.
- [x] Pure slots render the exact supplied children. Consumer supplies Skeleton, EmptyState, ErrorState and busy/status semantics for the affected regions rather than a template-owned async state machine.
- [x] Template accepts native section attributes/ref; aria-labelledby targets its caller-provided titleId. No new visual size/tone/appearance axis or empty view hook is introduced.
- [x] PageTransition wraps the changing template and SharedElement wraps known identity content; template does not import feature navigation or duplicate animation CSS.
- [x] Standalone Showcase renders the actual template in an isolated document under one ApplicationLayoutTemplate main; only the complete-flow example adds navigation and simulated requests.
- [x] No dashboard metric, business module, URL, icon or shortcut is hardcoded; caller owns ordered semantic links and section headings.
- [x] Home-to-list can share an available module title/icon supplied by the feature; absence of a corresponding destination uses the normal content transition.
- [x] Showcase includes a minimal starting page and a complete shortcut/summary/recent example with real native links/buttons and localized fixture copy.

- [x] The Overview example composes HomePageTemplate with public heading, text, link and button components in supported slots; navigation links open the neutral demo list/create routes.
- [x] V2 property/method/event/resource documentation matches the real template contract and identifies composition slots; the demo link opens the corresponding full-page route.
- [x] Full-page templates render in a landmark-safe preview or link to the separate demo instead of nesting main landmarks.
- [x] V2 examples use real public exports, local view hooks and deterministic fixtures; reset restores initial state and V1 remains unchanged.

- [x] Each V2 scenario includes minimal copyable TSX in the catalog format: public imports and direct JSX with valid owner/parts; application-owned values and callbacks remain external, without wrapper components, hook bodies or showcase dependencies.

- [x] The full V2 Home route composes localized breadcrumb/title/description, a records shortcut Card with title/icon/description shared into List, three fixture-derived number Cards and recent record Cards. Public templates and layout primitives own presentation.
