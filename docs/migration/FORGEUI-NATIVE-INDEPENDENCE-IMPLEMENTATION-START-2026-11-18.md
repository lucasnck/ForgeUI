# ForgeUI — First implementation slice: native theme and dependency boundary

## Scope

SC-first: updated existing `tech-flutter-theme-adapter.sc.md`; created `tech-runtime-independence.sc.md`. This is **only the first implementation slice**, not a 221-widget Material removal.

## Changes persisted to Drive

- `app/library/lib/src/theme/forge_theme_scope.dart` — Forge-owned InheritedWidget boundary implemented with `widgets.dart`, resolves semantic tokens by theme ID.
- `app/library/lib/src/theme/forge_theme_tokens.dart` — `ForgeThemeTokens.of` prefers the Forge-owned scope, retaining temporary Material ThemeExtension fallback for legacy consumers.
- `app/library/lib/forge_ui.dart` — public export added.
- `app/library/test/forge_theme_scope_test.dart` — WidgetsApp smoke tests for theme selection/switching added, not run without Flutter SDK.
- `scripts/audit-runtime-independence.mjs` — production dependency scanner for React and Flutter; Material/Cupertino library import report and baseline/strict gates.
- `scripts/test-runtime-independence.mjs` — Node tests for dependency detection, drift and SDK imports.
- `docs/migration/validation/runtime-independence-baseline.json` — pre-existing runtime dependency exceptions; they are NOT accepted target architecture.
- `package.json` — reproducible commands integrated into `check:cross-platform`.
- ForgeUI `AGENTS.md`, SC architecture and agent instructions updated with zero-third-party-runtime target.

## Evidence

- `node scripts/test-runtime-independence.mjs`: PASS in staged local execution (7 groups of assertions).
- `node --check scripts/audit-runtime-independence.mjs`: PASS.
- Full source scan in Google Drive / local checkout: NOT RUN, because the full repository source tree is not mounted here; the new script runs against a complete checkout. No global Material-import count is claimed.
- `dart format`, `flutter analyze`, `flutter test`, Android/iOS and visual checks: NOT RUN / BLOCKED (Flutter SDK unavailable in this environment).
- Material-free native library: NOT YET. `ForgeThemeData`, `ForgeThemeTokens` fallback and component imports are still Material-based.
- Zero external packages: NOT YET. Existing React runtime packages are `@hookform/resolvers`, `libphonenumber-js`, `react-hook-form`, `zod`; Flutter uses `phone_numbers_parser`. Migrate under their individual SCs.

## Next steps

Run `npm run audit:independence` in a complete ForgeUI checkout; migrate theme and individual widget families from Material to Widgets, with targeted tests; separately replace phone parsing and form/validation dependencies. Do not change PraticarApp Git pin or PraticarFront/PraticarBack without their own SC/verification. All affected SCs remain PENDING.
