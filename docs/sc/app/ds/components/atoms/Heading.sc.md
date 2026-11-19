---
title: "Flutter Heading"
scope: "Native app contract preserving the Web Heading capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "atoms"
---

# Flutter Heading

## Files

```text
components/forge_heading.dart (M)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web Heading](../../../../ds/components/atoms/Heading.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)
- [Native typography recipe](../../../tech-flutter-typography-recipe.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeHeading(
  level: level,
)
```

## Tests

### Native-library independence

- Render heading rank and token-backed typography through `widgets.dart` under `ForgeThemeScope`; preserve explicit heading levels, size override and semantics.
- Exercise the component in the shared native typography widget test. Dart SDK execution must be recorded, not assumed.

### Native behavior

- Use native heading semantics with the explicit level plus independent typography size/weight/tone.
- Preserve all heading-level and typography unions from the shared source; visual size never silently changes heading rank.
- Keep caller content and text scaling without automatic page-title focus or duplicate announcements.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeHeading({Key? key, required int level, String? text, Widget? child, ForgeTextSize? size, ForgeTextTone? tone, ForgeFontWeight? weight, String? semanticId, String? semanticLabel, List<ForgeDescriptionBinding> descriptions = const []})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `autoFocus` | `boolean` | Optional; no local initializer | `autofocus: bool` | Native focus request, subordinate to modal/compound owner policy; no focus theft during updates. |
| `id` | `string` | Optional; no local initializer | `semanticId: String` | Stable owner-scoped semantic/test identity, not a DOM id. |
| `title` | `string` | Optional; no local initializer | `tooltip: String` | Preserve visible component title; inherited native title maps to tooltip. |
| `aria-describedby` | `string` | Optional; no local initializer | `descriptions: List<ForgeDescriptionBinding>` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-expanded` | `Booleanish` | Optional; no local initializer | `semanticExpanded: bool` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-invalid` | `boolean \| "false" \| "true" \| "grammar" \| "spelling"` | Optional; no local initializer | `semanticInvalid: ForgeInvalidState` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-label` | `string` | Optional; no local initializer | `semanticLabel: String` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-pressed` | `boolean \| "false" \| "mixed" \| "true"` | Optional; no local initializer | `semanticPressed: ForgeSemanticFlag` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `children` | `ReactNode` | Optional; no local initializer | `child: Widget?` | Compose caller Widgets; keep passive/action semantics and null-content behavior from source. |
| `level` | `ComponentHeadingLevel` | Required; no local initializer | `level: int` | Same capability and value constraints; preserve source ownership and callback timing. |
| `size` | `ComponentTextSize` | Optional; no local initializer | `size: ForgeTextSize` | Same capability and value constraints; preserve source ownership and callback timing. |
| `weight` | `ComponentFontWeight` | Optional; no local initializer | `weight: ForgeFontWeight` | Same capability and value constraints; preserve source ownership and callback timing. |
| `tone` | `ComponentTextTone` | Optional; no local initializer | `tone: ForgeTextTone` | Same capability and value constraints; preserve source ownership and callback timing. |

### Defaults and fixed forwarding

- No public-property initializer is owned locally; preserve inherited defaults from the shared baseline/delegated component rather than choosing a new native default.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/atoms/Heading.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/Heading/definition.ts): `basic`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Native Flutter (no `MaterialApp`) rendering matches this component contract and remains independent of Material/Cupertino imports where owned; compile, semantics and visual evidence recorded before DONE.

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Use native heading semantics with the explicit level plus independent typography size/weight/tone.
- [ ] Preserve all heading-level and typography unions from the shared source; visual size never silently changes heading rank.
- [ ] Keep caller content and text scaling without automatic page-title focus or duplicate announcements.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.
