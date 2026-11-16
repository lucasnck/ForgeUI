---
title: "Forge UI — Showcase V2 original shell migration"
status: PARTIAL
type: feature
---

# Scope

Port original PraticarFront Showcase V2 shell, catalog and public DS building blocks to Forge UI. Preserve compositional ownership and accessibility; do not reimplement DS primitives inside the portal.

## Source files

- `PraticarFront/src/features/showcase-v2/components/ShowcaseV2Page/ShowcaseV2Page.tsx`
- `PraticarFront/src/features/showcase-v2/components/ShowcaseV2Navigation/ShowcaseV2Navigation.tsx`
- `PraticarFront/src/design-system/components/templates/ShowcasePageTemplate/`
- `PraticarFront/src/features/showcase-v2/model/showcase-v2-index.ts`

## Criteria

- [x] Original public ShowcasePageTemplate source and CSS available as `@forge-ui/web`.
- [x] Portal homepage reuses original overview hierarchy, navigation grouping, styles and responsive shell, adapted to Forge branding.
- [x] Catalog respects original slugs and only links to migrated demos.
- [x] Existing real @forge-ui/web demos can be accessed under the shell.
- [ ] Original V2 dynamic renderer, per-example controls, contract tables and named scenarios fully ported.
- [ ] Original V2 resource pages and all component categories migrated.
- [ ] Browser visual, keyboard and accessibility parity validated against original.
- [ ] Complete Next production build/typecheck passed.
