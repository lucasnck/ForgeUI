---
title: "TECH — Flutter native independence inventory and import-only slice"
scope: "Audit 221 canonical Flutter contracts and remove Material-only pass-through imports without changing public APIs or Web-defined visuals"
status: "PENDING"
type: "helper"
ds-level: "none"
---

# Flutter independent runtime — wave 9

## Source of truth

- `docs/sc/app/reference/native-component-api.json` and `docs/sc/app/reference/component-contracts.json`: 221 Flutter exports and 221 Web→Flutter proposed contracts; `status=PENDING` means not homologated.
- `shared/tokens/{schema,primitives,semantic,themes}.json`: colors, spacing, typography, shapes, motion and themes.
- Each Web component source/CSS Module and its SC remains the normative design specification. Flutter may adapt focus, text input, scrolling, gestures, touch targets and operating-system services **without** changing public intent, visual palette or defaults.
- Flutter SDK `widgets`, `painting`, `rendering`, `services`, `semantics` are permitted. `material.dart`, `cupertino.dart`, and independent third-party production packages are **not** the desired target state.

## Deliverables and files

- `scripts/audit-native-independence.mjs` (new), `scripts/test-native-independence.mjs` (new): recursive source graph, Dart import inventory, 221-entry matrix, runtime package inventory and strict boundary check.
- `docs/migration/validation/native-independence-matrix.json` (generated): each contract's Dart source, direct and transitive Material/Cupertino dependencies, source presence and **unverified** parity status. A source/export alone never qualifies a component as DONE.
- Import-only changes, only when source genuinely uses no Material behavior: `app/library/lib/src/components/internal/configured_input.dart`, `app/library/lib/src/helpers/schematic_map_renderer.dart`, `app/library/lib/src/components/forge_o_data_filter.dart`.
- `app/library/lib/src/components/forge_modal.dart`: remove the sole transparent Material wrapper, retain overlay, semantic and focus hierarchy, drawing and exact Forge theme tokens.
- `package.json`, `PLAN.md`, `STATUS.md`, and an immutable migration report.

## Non-regression constraints

1. Do not rename or remove any Flutter public constructor parameter; do not alter default values or Web-to-mobile mapping. No fake/placeholder components.
2. Use only existing Forge token values for color, surface, border, radius, font weight, space, motion and size. Avoid introducing raw fallback style values.
3. Preserve controlled state, validation, forms, callbacks, navigation/focus semantics, keyboard, RTL, reduced motion and accessible labels.
4. Existing Material adapters and widgets are recorded as debt, not renamed or removed as a bulk blind codemod. Specifically, `ForgeThemeData`, `ForgeThemeTokens`, `ForgeSelect`, `ForgeInput`, `ForgeSlider`, `ForgeColorInput`, `ForgeTemporalInput` and `ForgeControlStyle` require separately scoped implementation/tests.
5. Exclude dev/test-only imports from the production count. Keep source graph and exception ownership explicit. Do not equate zero imports with successful runtime compilation or visual parity.

## Criteria

- [ ] Produce auditable entry for all 221 documented contracts with no missing source files.
- [ ] No new Material/Cupertino import; reduced count matches manifest after the small native slice.
- [ ] Static/negative tests pass and generated report is reproducible.
- [ ] Run Dart formatting, `flutter analyze`, widget tests, Android/iOS and visual/accessibility regression on a complete checkout before marking SCs DONE.
- [ ] Continue family-by-family implementation until strict gate is clean and 221 visual/behavioral SC acceptances are backed by tests.
