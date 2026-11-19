---
title: "Flutter Token Theme Adapter"
scope: "Flutter Forge-owned theme distribution and token adaptation without requiring Material as the visual design system"
status: "PENDING"
type: "helper"
ds-level: "none"
---

# Flutter Token Theme Adapter

## Files

```text
../../../app/library/lib/src/theme/forge_theme_scope.dart (C)
../../../app/library/lib/src/theme/forge_theme_tokens.dart (M)
../../../app/library/lib/src/theme/forge_theme_data.dart (M, later compatibility retirement)
../../../app/library/lib/forge_ui.dart (M)
../../../app/library/test/forge_theme_scope_test.dart (C)
```

## Dependencies

- [Cross-platform token generation](../ds/styles/tech-cross-platform-token-generation.sc.md)

## Contract

```dart
import 'package:flutter/widgets.dart';
import 'package:forge_ui/forge_ui.dart';

ForgeThemeScope(
  tokens: ForgeThemeTokens.fromId(ForgeThemeId.light),
  child: Text("Exemplo"),
);
```

## Ownership

This TECH owns one coherent capability: framework-native, Forge-owned theme distribution. It does not own generated token definitions, individual widget Material removal or Showcase host changes. `ForgeThemeScope` must use `widgets.dart` and `InheritedWidget`; switching light/dark/contrast/liquid-glass must notify dependents. ForgeThemeTokens.of(context) first resolves the Forge scope; a legacy Material ThemeExtension fallback remains temporarily during per-component migration. `ForgeThemeData` is the old Material adapter and is deprecated only after all consumers migrate. Do not imply the Flutter library is Material-free from adding the scope alone.

The canonical replacement for MaterialApp/Scaffold in the compiled Showcase is a separate feature/integration step, sequenced after widget migration and tests. Never change production UI appearance while introducing this compatibility bridge.

## Tests

- `WidgetsApp` with `ForgeThemeScope` works without a `MaterialApp` ancestor, and `ForgeThemeTokens.of` reads light/dark correctly.
- Updating the scope notifies dependents; unchanged tokens do not cause unnecessary notifications.
- Existing `MaterialApp` + ForgeThemeData compatibility remains functional.
- Run `dart format`, `flutter analyze`, and targeted `flutter test` before marking implementation complete; when Flutter is unavailable, record blocked.

## Criteria

- [ ] Scope compiles and provides all four themes without a MaterialApp ancestor.
- [ ] Legacy Material consumers continue to work until their individually owned SCs are migrated.
- [ ] Formatting, analyzer, widget tests and native checks have recorded evidence.
- [ ] Material imports, Material theme adapters and third-party library dependencies are removed only after independent tests and migrations, not as a drive-by change.
