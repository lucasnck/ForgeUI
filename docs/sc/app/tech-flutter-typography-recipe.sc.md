---
title: "TECH — Native Flutter Typography Recipe"
scope: "Token-backed typography and spacing primitives implemented with Flutter widgets/painting without Material or Cupertino imports"
status: "PENDING"
type: "style"
ds-level: "none"
---

# Native Flutter Typography Recipe

## Files

```text
../../../app/library/lib/src/theme/forge_primitive_style.dart (M)
../../../app/library/test/forge_native_typography_test.dart (C)
../../../scripts/check-native-typography.mjs (C)
../../../package.json (M)
```

## Dependencies

- [Flutter token theme adapter](tech-flutter-theme-adapter.sc.md)
- [Cross-platform token generation](../ds/styles/tech-cross-platform-token-generation.sc.md)

## Contract

```dart
import 'package:flutter/widgets.dart';
import 'package:forge_ui/forge_ui.dart';

ForgeThemeScope.forId(
  theme: ForgeThemeId.light,
  child: const ForgeText(text: 'Example'),
)
```

## Tests

- `forgeTextStyle`, `forgeSpace`, and `forgeRadius` use only Flutter widgets, painting and generated Forge tokens. Do not use Material typography defaults or duplicate color palettes.
- For all four Forge themes, consumer Text/Heading/Label/FieldHint/FieldError widgets resolve scoped token typography in `WidgetsApp` without `MaterialApp`.
- Preserve long-text wrapping, heading rank, control-focus label semantics, required markers and error announcement state.
- The source hygiene script rejects Material/Cupertino imports in this bounded typography family and checks that the divider no longer delegates to Material `Divider`.
- Record `node scripts/check-native-typography.mjs`, `dart format --output=none --set-exit-if-changed`, `flutter analyze` and targeted `flutter test` outcomes separately; do not claim Flutter tests if SDK is unavailable.

## Criteria

- [ ] Canonical font sizes, tones, weights, line-heights and spacing remain unchanged and come from the Forge token set.
- [ ] Text/Heading/Label/FieldHint/FieldError render with Flutter native widgets under `ForgeThemeScope`, with no direct Material or Cupertino import in the recipe/owned widgets.
- [ ] Typed consumer contracts and current public exports remain unchanged.
- [ ] Hygiene script and Flutter widget tests pass on the actual integrated workspace.
- [ ] Visual parity with React reviewed in corresponding component SCs before DONE.
