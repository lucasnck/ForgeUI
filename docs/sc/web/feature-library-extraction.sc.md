---
title: "Forge UI — Web Library Extraction"
scope: "Extract product-agnostic PraticarFront design system into an independent public React library"
status: PENDING
type: feature
ds-level: none
---

# Web Library Extraction

## Files

- (C) `web/library/package.json`
- (C) `web/library/src/index.ts`
- (C) `web/library/src/design-system/components/atoms/`
- (C) `web/library/src/design-system/types/`
- (C) `web/library/src/design-system/styles/`

## Contract

Use the original Atomic Design hierarchy and preserve exported prop interfaces, semantic tones, sizes, appearances, shapes, state and CSS Modules. No feature, infrastructure, authentication or Praticar-specific service imports inside the library. Keep the source intact; migrate by copy, record source paths, and establish a stable public entry. Shared React remains a peer dependency; Next belongs only to the showcase.

## Criteria

- [x] Bootstrap package, public API and 13 original atoms extracted by copy with original types and styles (source manifest for seven phase-2 atoms).
- [ ] Compile and verify extracted component and style dependencies.
- [ ] Map all imports external to the original `src/design-system`.
- [ ] Compare full exported library against original DS and migrate relevant helpers/hooks/types/components.
- [ ] Validate tests and documentation for all migrated resources.
