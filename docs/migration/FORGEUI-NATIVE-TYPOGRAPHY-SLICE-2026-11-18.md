# ForgeUI — Native typography and divider migration (2026-11-18)

## Boundaries and workflow

`sc-author` phase: updated the six owning app component specs (`Text`, `Heading`, `Label`, `FieldHint`, `FieldError`, `Divider`) before editing their implementation; introduced `docs/sc/app/tech-flutter-typography-recipe.sc.md` as **one TECH for one native typography capability**. `sc-implementer` phase: implemented the scoped native source changes and structural regression tests. Existing ThemeData compatibility is deliberately retained.

## Drive source changes

- `app/library/lib/src/theme/forge_primitive_style.dart`: replaces the Material import with `package:flutter/widgets.dart`; preserves the typography, radius and spacing token algorithms.
- `app/library/lib/src/components/forge_text.dart`: uses native widgets for text, semantics and inherited typography, no direct Material import.
- `app/library/lib/src/components/forge_heading.dart`: uses native widgets while preserving heading levels and typography overrides.
- `app/library/lib/src/components/forge_label.dart`: uses native focus/gesture widgets without Material, preserving control-binding API.
- `app/library/lib/src/components/forge_divider.dart`: replaces Material `Divider` with token-painted `SizedBox` + `ColoredBox`, retains semantic label and no action/focus affordance.
- `app/library/test/forge_native_typography_test.dart`: new widget tests under `WidgetsApp` + `ForgeThemeScope`, covering all theme IDs, heading/text/hints/errors, divider color and label focus behavior.
- `scripts/check-native-typography.mjs`: new deterministic source-boundary test rejecting Material/Cupertino imports within these seven library source files and Material Divider delegation.
- Root `package.json`: adds `npm run test:native-typography` to the cross-platform checks.

`ForgeFieldHint` and `ForgeFieldError` were already based on native widgets and required no source changes; they are included in the tests and documentation. No unrelated component or consumer changes, no commits or pushes.

## Validation evidence

- **PASS** `node --check scripts/check-native-typography.mjs` (staged source subset).
- **PASS** `node scripts/check-native-typography.mjs` on seven fetched/current files staged in the same source paths (Material imports absent, ColoredBox divider present).
- **PASS negative**: deliberate injected `package:flutter/material.dart` import caused the checker to exit nonzero; the clean original file was restored and the test passed again.
- **NOT RUN** `flutter analyze`, `dart format`, `flutter test`, Flutter Web/Android/iOS build: Flutter/Dart executables not available here.
- **NOT VERIFIED** rendered screenshot and accessibility parity with React; widget tests authored, not executed. No SC marked DONE.
- **NOT VERIFIED** whole-repository Material-import or dependency count: requires a complete checkout. Current Material theme extension and many other widgets remain in the library; **zero-Material goal not complete**.

## Next implementation boundary

Run `npm run test:native-typography`, `dart format --output=none --set-exit-if-changed .`, `flutter analyze`, `flutter test` and React/Flutter visual comparisons in a full local checkout. Then migrate Material-backed interaction widgets (`ForgeLink`, buttons, checkables, menus) under their **individual component SCs** with keyboard/focus/semantic tests; separately replace the Flutter phone parser and React form/parser runtime dependencies under their own TECH SCs. Do not update the PraticarApp ForgeUI pin until a tested revision is committed and approved.
