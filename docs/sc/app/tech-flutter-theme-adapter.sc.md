---
title: "Flutter Token Theme Adapter"
scope: "Flutter ThemeData and widget-level token adaptation from generated shared token values without importing Web or Showcase modules"
status: "PENDING"
type: "helper"
ds-level: "none"
---

# Flutter Token Theme Adapter

## Files

```text
../../../app/library/pubspec.yaml (C)
../../../app/library/lib/forge_ui.dart (C)
../../../app/library/lib/src/theme/forge_theme_data.dart (C)
../../../app/library/lib/src/theme/forge_theme_tokens.dart (C)
../../../app/library/test/forge_theme_data_test.dart (C)
```

## Dependencies

- [Cross-platform token generation](../ds/styles/tech-cross-platform-token-generation.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

final theme = ForgeThemeData.light();
```

## Tests

- Resolve token-backed light, dark and contrast ColorScheme, typography and shape values in widget tests.
- Verify non-portable liquid-glass properties use documented Flutter platform fallbacks without changing shared semantic colors.
- Verify dynamic text scaling, high-contrast accessibility and platform brightness preference when enabled by the consuming app.
- Ensure Flutter packages do not import React, Next.js, CSS source files or Showcase source, and do not duplicate token literal palettes.

## Criteria

- [ ] Expose a public Flutter theme adapter consuming generated Dart tokens, not hand-maintained colors or spacing.
- [ ] Preserve Web semantics in the Flutter mapping while retaining platform-appropriate widgets and behavior; common names do not imply identical implementation trees.
- [ ] Support explicit light/dark/contrast/liquid-glass theme selection with documented platform exceptions and accessible fallbacks.
- [ ] Keep platform preference persistence owned by consumers; the library does not read or modify application storage implicitly.
- [ ] Verify representative widget appearance and runtime theme switching in Flutter tests. `flutter analyze`, targeted tests and formatting must pass with recorded results before `DONE`.
- [ ] Do not declare widgets or preview availability merely because theme generation succeeds.
