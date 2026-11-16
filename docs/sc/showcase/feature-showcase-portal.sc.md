---
title: "Forge UI — Showcase Portal"
scope: "Independent web portal for browsing, previewing, documenting and validating Forge UI components"
status: PENDING
type: feature
ds-level: none
---

# Showcase Portal

## Files

- (C) `showcase/portal/src/app/page.tsx`
- (C) `showcase/portal/src/components/ShowcaseClient.tsx`
- (C) `showcase/portal/src/app/portal.css`
- (C) `showcase/portal/package.json`
- (C) `showcase/portal/next.config.ts`

## Dependencies

- `docs/sc/web/feature-library-extraction.sc.md`

## Contract

- Display discoverable components grouped by Atomic Design level and supporting library category.
- Provide search, component selection, property controls, real rendered preview, usage snippets, behavior/semantic notes and source provenance.
- Allow light/dark/contrast theme selection independent of consumer identity, and demonstrate visual variants and states.
- Use only `@forge-ui/web` public exports, never duplicate implementation of example components.
- Keep the portal detached from Praticar auth, backend, and routes. The production app must build as an independent static Next export.
- Preserve original coverage over migration iterations; document the exact difference between the Praticar Showcase V2 registry and Forge UI.
- Future Flutter Web previews share catalog concepts, not React component source.
- Each public component URL has exactly one App Router page. The active `(catalog)/components/[slug]` route owns component previews; preserve superseded route sources outside `src/app` as non-routable migration references.

## Criteria

- [x] Portal source and interactive controls authored for 13 extracted atoms (6 initial + 7 in phase 2; runtime verification pending).
- [ ] `npm install`, typecheck and build completed successfully in the Forge UI workspace.
- [ ] Visual, responsive and accessibility inspection recorded.
- [ ] Original Showcase V2 coverage compared item by item with the new catalog.
- [ ] All compatible, prioritized original previews migrated or documented with explicit blockers.
- [ ] Flutter demonstrations integrated and platform behavior validated (future phase).
