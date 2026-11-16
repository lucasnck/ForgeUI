---
title: "ListPageTemplate"
scope: "Neutral filter, result and pagination composition for CRUD listings"
status: "PENDING"
type: "component"
ds-level: "templates"
---


# ListPageTemplate


## Files


```text
features/showcase-v2/components/ListPageTemplate/usage-code.ts (M)
features/showcase-v2/components/ListPageTemplate/definition.ts (M)
features/showcase-v2/components/ListPageTemplate/ListPageTemplate.example.tsx (C)
features/showcase-v2/components/ListPageTemplate/useListPageTemplateExample.ts (C)
design-system/components/templates/ListPageTemplate/ListPageTemplate.tsx (C)
design-system/components/templates/ListPageTemplate/ListPageTemplate.module.css (C)
design-system/components/templates/ListPageTemplate/index.ts (C)
design-system/index.ts (M)
features/showcase/examples/ListPageTemplate.example.tsx (C)
features/showcase/examples/useListPageTemplateExample.ts (C)
features/showcase/examples/PortalListPage.tsx (C)
features/showcase/examples/PortalPageFlow.module.css (C)
features/showcase/examples/portal-page-flow.ts (C)
../scripts/check-crud-home.cjs (M)
features/showcase/model/showcase-status.ts (M)
features/showcase/model/showcase-registry.ts (M)
```


## Dependencies


- [PageHeader](../molecules/PageHeader.sc.md)
- [Stack](../atoms/Stack.sc.md)
- [Collection contracts](../../types/tech-collection-contracts.sc.md)
- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [DataGrid](../organisms/DataGrid.sc.md)
- [ODataFilter](../organisms/ODataFilter.sc.md)
- [Pagination](../molecules/Pagination.sc.md)


## Contract


```tsx
import { ListPageTemplate } from "@forge-ui/web";
<ListPageTemplate titleId="records-title" pageTitle="Records" actions={createAction} filters={filterPanel} pagination={pagination}>
  {dataGrid}
</ListPageTemplate>;
```


## Styles


```css
.root {
  min-inline-size: var(--zero);
 
}
.root[hidden] {
  display: none;
 
}
.content {
  min-inline-size: var(--zero);
 
}
.layout {
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  gap: var(--space-3);
 
}
.aside {
  flex: var(--zero) var(--opacity-full) var(--length-32);
  min-inline-size: var(--zero);
 
}
.results {
  flex: var(--opacity-full) var(--opacity-full) var(--length-40);
  min-inline-size: var(--zero);
 
}
```


## Content


```tsx
import type { ReactNode } from "react";
import type { NativeSectionRootProps } from "../../../types/collection-contracts";
import { PageHeader, type PageHeaderContentProps } from "../../molecules/PageHeader";
import { Stack } from "../../atoms/Stack";
import styles from "./ListPageTemplate.module.css";
export interface ListPageTemplateProps extends NativeSectionRootProps, PageHeaderContentProps {
  children: ReactNode;
  filters?: ReactNode;
  pagination?: ReactNode;
}
export function ListPageTemplate({ titleId, pageTitle, description, identity, breadcrumb, actions, divider, children, className, filters, pagination, ...props }: ListPageTemplateProps) {
  return <Stack as="section" padding="3" gap="3" {...props} aria-labelledby={titleId} className={[styles.root, className].filter(Boolean).join(" ")}>
    <PageHeader titleId={titleId} pageTitle={pageTitle} description={description} identity={identity} breadcrumb={breadcrumb} actions={actions} divider={divider} />
    <div className={styles.layout}>
      {filters !== undefined && filters !== null && filters !== false && filters !== true && filters !== "" && <div className={styles.aside}>{filters}</div>}
      <Stack gap="2" className={styles.results}>
        <div className={styles.content}>{children}</div>
        {pagination !== undefined && pagination !== null && pagination !== false && pagination !== true && pagination !== "" && <div className={styles.content}>{pagination}</div>}
      </Stack>
    </div>
  </Stack>;
}
```


## Tests


- Verify the named V2 preview composition, independent reset and link to its routed neutral demo.


- Render no filters, fixed left filter panel and caller-owned filter Popover action.
- Render wide DataGrid at narrow width, loading/empty/error results and disabled pending pagination without document overflow.


## Criteria


- [x] Template is a content section inside the existing application main; it adds no main, outer application banner/menu, router, provider or data request.
- [x] Header spacing and title/identity/actions reuse PageHeader. Root padding and region gaps use space-3 tokens; absent optional slots omit their wrappers.
- [x] Pure slots render the exact supplied children. Consumer supplies Skeleton, EmptyState, ErrorState and busy/status semantics for the affected regions rather than a template-owned async state machine.
- [x] Template accepts native section attributes/ref; aria-labelledby targets its caller-provided titleId. No new visual size/tone/appearance axis or empty view hook is introduced.
- [x] PageTransition wraps the changing template and SharedElement wraps known identity content; template does not import feature navigation or duplicate animation CSS.
- [x] Standalone Showcase renders the actual template in an isolated document under one ApplicationLayoutTemplate main; only the complete-flow example adds navigation and simulated requests.
- [x] Filters slot accepts the same ODataFilter as a fixed panel; dropdown/Popover placement is composed through caller actions and omits the fixed panel. No duplicate draft state is introduced by the template.
- [x] Pagination remains outside the result viewport so horizontal table scrolling does not hide its controls; one caller-owned pagination instance is rendered.
- [x] At narrow widths the fixed panel wraps above results; DataGrid retains its own bounded horizontal viewport without squeezing controls or overflowing the document.
- [x] List state and scroll are owned by the feature. Opening a record does not discard applied filters, pending drafts, sort, page/page size, selected record action or viewport snapshot.
- [x] Initial unknown results use row/cell skeleton geometry without focusable placeholder actions; background refresh preserves existing rows and signals busy without clearing them.
- [x] Standalone Showcase includes fixed filter, popup filter, no-filter and native empty/error/loading result compositions, not only a slot diagram.


- [x] The Records listing example composes ListPageTemplate with DataGrid, SearchInput and Pagination in supported slots, indexed records and caller-owned filtering/paging; item actions open prebuilt detail/edit routes.
- [x] V2 property/method/event/resource documentation matches the real template contract and identifies composition slots; the demo link opens the corresponding full-page route.
- [x] Full-page templates render in a landmark-safe preview or link to the separate demo instead of nesting main landmarks.
- [x] V2 examples use real public exports, local view hooks and deterministic fixtures; reset restores initial state and V1 remains unchanged.


- [x] Each V2 scenario includes minimal copyable TSX in the catalog format: public imports and direct JSX with valid owner/parts; application-owned values and callbacks remain external, without wrapper components, hook bodies or showcase dependencies.


- [x] The full V2 List route has a Home breadcrumb, known records title/icon/description shared from Home, explicit grid-row Details actions and Create. Create action text shares identity with its form heading; returning from Details retains filters, sort and page.

- [x] In actual list consumers, use a single visible `tone="brand" appearance="solid"` Create action; row-level Details is `tone="neutral" appearance="bordered"` or neutral text link, never a repeated brand/solid call to action.
- [x] Filter, Apply, Reset, Refresh, Retry and Pagination remain `tone="neutral"` with `appearance="bordered"` or `"ghost"` by visual priority. A justified supplementary shortcut may use `tone="sand" appearance="bordered"`, but never competes with Create.
- [ ] Render the real list template and V1/V2 routed examples without changing caller-owned slots, OData filter/sort/page state, selected row, request cancellation, loading and restored scroll/focus. Check narrow-screen wrapping and keyboard order.
- [ ] Validate color and focus in light, dark, contrast and forced-colors modes; run existing CRUD, showcase, typecheck, formatting and build checks before accepting the new hierarchy.
