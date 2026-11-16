---
title: "DetailPageTemplate"
scope: "Record-detail composition with known identity header, information sections and optional secondary content"
status: "PENDING"
type: "component"
ds-level: "templates"
---

# DetailPageTemplate

## Files

```text
features/showcase-v2/components/DetailPageTemplate/usage-code.ts (M)
features/showcase-v2/components/DetailPageTemplate/definition.ts (M)
features/showcase-v2/components/DetailPageTemplate/DetailPageTemplate.example.tsx (C)
features/showcase-v2/components/DetailPageTemplate/useDetailPageTemplateExample.ts (C)
design-system/components/templates/DetailPageTemplate/DetailPageTemplate.tsx (C)
design-system/components/templates/DetailPageTemplate/DetailPageTemplate.module.css (C)
design-system/components/templates/DetailPageTemplate/index.ts (C)
design-system/index.ts (M)
features/showcase/examples/DetailPageTemplate.example.tsx (C)
features/showcase/examples/useDetailPageTemplateExample.ts (C)
features/showcase/examples/PortalDetailPage.tsx (C)
features/showcase/examples/usePortalDetailRequest.ts (C)
features/showcase/examples/portal-record-identity.ts (C)
features/showcase/examples/portal-page-flow.ts (M)
features/showcase/examples/usePortalHomeExample.ts (M)
features/showcase/examples/PortalHome.example.tsx (M)
features/showcase/examples/useDataGridRecords.tsx (M)
features/showcase/examples/useDataGridFilterPagination.ts (M)
features/showcase/examples/PortalPageFlow.module.css (M)
features/showcase/examples/crud-page-flow.messages.ts (M)
features/showcase/model/showcase-status.ts (M)
features/showcase/model/showcase-registry.ts (M)
features/showcase/components/TemplateShowcase/TemplateShowcaseDetail.tsx (M)
```

## Dependencies

- [PageHeader](../molecules/PageHeader.sc.md)
- [Stack](../atoms/Stack.sc.md)
- [Collection contracts](../../types/tech-collection-contracts.sc.md)
- [Design tokens](../../styles/tech-design-tokens.sc.md)

## Contract

```tsx
import { DetailPageTemplate } from "@forge-ui/web";
<DetailPageTemplate titleId="record-title" pageTitle={recordTitle} identity={recordImage} actions={detailActions} aside={secondaryInformation}>
  {detailSections}
</DetailPageTemplate>;
```

## Styles

```css
.root { min-inline-size: var(--zero); }
.root[hidden] { display: none; }
.content { min-inline-size: var(--zero); }
.layout { display: flex; flex-wrap: wrap; align-items: start; gap: var(--space-3); }
.aside { flex: var(--zero) var(--opacity-full) var(--length-32); min-inline-size: var(--zero); }
.results { flex: var(--opacity-full) var(--opacity-full) var(--length-40); min-inline-size: var(--zero); }
```

## Content

```tsx
import type { ReactNode } from "react";
import type { NativeSectionRootProps } from "../../../types/collection-contracts";
import { PageHeader, type PageHeaderContentProps } from "../../molecules/PageHeader";
import { Stack } from "../../atoms/Stack";
import styles from "./DetailPageTemplate.module.css";
export interface DetailPageTemplateProps extends NativeSectionRootProps, PageHeaderContentProps {
  children: ReactNode;
  aside?: ReactNode;
}
export function DetailPageTemplate({ titleId, pageTitle, description, identity, breadcrumb, actions, divider, children, className, aside, ...props }: DetailPageTemplateProps) {
  const hasAside = aside !== undefined && aside !== null && typeof aside !== "boolean" && aside !== "";
  return <Stack as="section" padding="3" gap="3" {...props} aria-labelledby={titleId} className={[styles.root, className].filter(Boolean).join(" ")}>
    <PageHeader titleId={titleId} pageTitle={pageTitle} description={description} identity={identity} breadcrumb={breadcrumb} actions={actions} divider={divider} />
    <div className={styles.layout}>
      <div className={styles.results}>{children}</div>
      {hasAside && <div className={styles.aside}>{aside}</div>}
    </div>
  </Stack>;
}
```

## Tests

- Verify the named V2 preview composition, independent reset and link to its routed neutral demo.

- Navigate from an available list identity into unloaded detail sections, then reveal matching response data.
- Enter details without cached identity, handle error/not-found and navigate back after the origin record was filtered out.

## Criteria

- [x] Template is a content section inside the existing application main; it adds no main, outer application banner/menu, router, provider or data request.
- [x] Header spacing and title/identity/actions reuse PageHeader. Root padding and region gaps use space-3 tokens; absent optional slots omit their wrappers.
- [x] Pure slots render the exact supplied children. Consumer supplies Skeleton, EmptyState, ErrorState and busy/status semantics for the affected regions rather than a template-owned async state machine.
- [x] Template accepts native section attributes/ref; aria-labelledby targets its caller-provided titleId. No new visual size/tone/appearance axis or empty view hook is introduced.
- [x] PageTransition wraps the changing template and SharedElement wraps known identity content; template does not import feature navigation or duplicate animation CSS.
- [x] Standalone Showcase renders the actual template in an isolated document under one ApplicationLayoutTemplate main; only the complete-flow example adds navigation and simulated requests.
- [x] Record title/image/status and detail labels are supplied by the feature; immutable identity is independent from translated label and current screen.
- [x] Trusted list identity may remain in the header while only unknown sections show Skeleton; a direct entry with no known identity uses unnamed skeletons and a stable accessible loading title.
- [x] Late missing/changed image or unknown title does not share an origin name until actual content exists; rejected/stale data cannot replace the active record.
- [x] Details-to-edit keeps known record header identity available; the read sections and fields may crossfade without morphing label/value blocks into native inputs.
- [x] Error/not-found content contains explicit retry/back recovery supplied by the feature while retaining only legitimate known identity.
- [x] Aside is optional and wraps below main detail content when space is insufficient; subsection headings start below the page title level.
- [x] Standalone Showcase includes title-only, image/status/actions, text plus image and partially loading/error detail compositions.

- [x] The Record details example composes DetailPageTemplate with public text, heading and button components in supported slots; Title 1 / Description 1 identify the fixture and edit/back actions target the matching demo routes.
- [x] V2 property/method/event/resource documentation matches the real template contract and identifies composition slots; the demo link opens the corresponding full-page route.
- [x] Full-page templates render in a landmark-safe preview or link to the separate demo instead of nesting main landmarks.
- [x] V2 examples use real public exports, local view hooks and deterministic fixtures; reset restores initial state and V1 remains unchanged.

- [x] Each V2 scenario includes minimal copyable TSX in the catalog format: public imports and direct JSX with valid owner/parts; application-owned values and callbacks remain external, without wrapper components, hook bodies or showcase dependencies.

- [x] The full V2 Details route presents the selected record identity/description shared from the grid or recent Card, a technical information Card, return-to-list action and Edit. Edit retains those identity participants without naming unknown records.

- [x] Detail-page Edit is a secondary action using `tone="sand" appearance="bordered"`, with `tone="neutral" appearance="bordered"` as a semantic fallback; it must not claim the list/form's primary blue emphasis merely because Button defaults to brand.
- [x] Back/Return to list use `tone="neutral" appearance="ghost"`; supplementary retry uses neutral bordered; an optional destructive operation stays `tone="danger"` and requires its existing confirmation and authorization flow.
- [ ] Preserve shared record identity, error/not-found recovery, details-to-edit navigation intent, loading skeleton, focus restoration, and browser transition behavior. Templates only render caller-supplied actions; never rewrite them.
- [ ] Review keyboard/focus and contrast across light/dark/contrast/forced-colors, full V2 routed flow, minimal copied snippet, and applicable tests/typecheck/build before completing this increment.
