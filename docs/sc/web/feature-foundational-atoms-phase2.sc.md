---
title: "Forge UI — Foundational Atoms Phase 2"
scope: "Migrate seven dependency-light PraticarFront atoms into the independent Forge UI React library and showcase"
status: PENDING
type: feature
ds-level: atom
---

# Foundational Atoms Phase 2

## Source and provenance

Copy, do not rewrite, these existing PraticarFront atoms from `src/design-system/components/atoms/`: `Textarea`, `Switch`, `Radio`, `Label`, `Divider`, `Heading`, and `VisuallyHidden`. Their original TSX and CSS Modules are preserved, apart from package-level index exports. The original project's source and repository must not be modified.

## Files

- (C) `web/library/src/design-system/components/atoms/{Textarea,Switch,Radio,Label,Divider,Heading,VisuallyHidden}/*`
- (C) `web/library/src/design-system/types/interactive-controls.ts`
- (C) `web/library/src/design-system/styles/interactive-primitives.module.css`
- (M) `web/library/src/index.ts`
- (M) `showcase/portal/src/components/ShowcaseClient.tsx`
- (M) `scripts/verify-workspace.mjs`
- (M) `docs/migration/STATUS.md`

## Dependencies

- `docs/sc/core/architecture.sc.md`
- `docs/sc/web/feature-library-extraction.sc.md`
- Existing types: `animation.ts`, `component-capabilities.ts`, `native-control-contracts.ts`, `typography.ts`.
- Existing shared CSS Modules: field controls, text, checkable, interactive, motion, shaped, and token styles.

## Contract

- Export each component and its public props through `@forge-ui/web` only; keep React as a peer dependency and exclude all Next, services, and Praticar business imports from library sources.
- Retain native HTML attributes, checked and disabled behavior, native input events, accessibility attributes, focus style, and semantic tokens as supplied in the source.
- Showcase demos use public exports, preserve interactive state for `Switch` and `Radio`, associate labels with form controls, and provide copyable examples with actual prop names.
- Show independently verifiable migration scope; do not label phase complete before installation/typecheck/build and visual inspection.
- Maintain source provenance and a running coverage list; do not infer the full original Showcase V2 coverage from this phase.

## Verification and acceptance

- [x] All seven source TSX/CSS files and required shared type/style files copied byte-for-byte (SHA-256 manifest generated).
- [x] Seven source-compatible public exports and their types in the package entry point.
- [x] Seven corresponding examples in the standalone showcase (browser interaction not yet verified).
- [x] Automated dependency-graph and file integrity check passes offline.
- [ ] Workspace install, typecheck and production build pass on a networked environment.
- [ ] Browser/keyboard/accessible-name and theme checks pass.
- [x] Original PraticarFront unchanged; consumers remain unintegrated.
