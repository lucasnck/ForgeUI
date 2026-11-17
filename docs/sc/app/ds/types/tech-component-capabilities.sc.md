---
title: "Flutter Component Capabilities"
scope: "Typed native equivalents of shared Web visual and spacing contracts"
status: "PENDING"
type: "type"
ds-level: "none"
---

# Flutter Component Capabilities

## Files

```text
types/component_capabilities.dart (C)
../forge_ui.dart (M)
../../test/component_capabilities_test.dart (C)
```

## Dependencies

- [Web capabilities](../../../ds/types/tech-component-capabilities.sc.md)
- [Flutter theme adapter](../../tech-flutter-theme-adapter.sc.md)
- [Cross-platform tokens](../../../ds/styles/tech-cross-platform-token-generation.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

final size = ForgeSize.md;
final appearance = ForgeAppearance.bordered;
```

## Content

```dart
enum ForgeSize { xs, sm, md, lg, xl }
enum ForgeTone {
  neutral, brand, success, warning, danger, info, inverse,
  sand, violet, forest, sky
}
enum ForgeAppearance { solid, soft, outlined, bordered, ghost, none }
enum ForgeShape { square, rounded, pill }
enum ForgeVariant { solid, soft, ghost, outline }
enum ForgeSpace { s0, s1, s2, s3, s4, s5, s6, s8, s10, s12, s16, s20 }
```

## Tests

- Accept all five sizes, eleven tones, six appearances, three shapes, four variants and twelve spaces; reject unsupported strings/types at analysis time.
- Verify appearance precedence, outline alias and compatibility bridge only when appearance/variant are absent.
- Verify runtime theme inheritance, normal/hover/pressed/focus/disabled/busy mappings and alias recipes without deleting enum values.
- Verify shared text scaling, directionality, touch targets and motion preferences; report portable-token gaps rather than silently using Material defaults.

## Criteria

- [x] Export shared enums once; widgets reuse them.
- [x] Preserve Web values and spacing keys exactly.
- [x] Resolve visual metrics, inherited foreground/shape and state feedback through canonical generated tokens/theme mappings.
- [x] Define native accessible hit areas separately from token-sized surfaces, without adjacent target collisions.
- [x] Do not add literal palettes, CSS/React dependencies or application preference/navigation behavior.

- [ ] Complete native interaction/contrast acceptance at the shared adapter before treating all platform feedback mappings as accepted.
