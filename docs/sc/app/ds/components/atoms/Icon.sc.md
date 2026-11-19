---
title: "Flutter Icon"
scope: "Native app contract preserving the Web Icon capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "atoms"
---

# Flutter Icon

## Files

```text
components/forge_icon.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web Icon](../../../../ds/components/atoms/Icon.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeIcon(
  name: iconName,
)
```

## Tests

### Native behavior

- Render the original registry's vector paths/viewBox/stroke-or-fill through a native vector adapter, not a replacement icon font.
- Preserve every icon name and size including inherit; inherit foreground and preserve path order/geometry.
- Without label the icon is decorative/nonfocusable; with label expose one image name, not an action.
- Generate stable Dart enum names from source hyphenated names with a reversible serialized-name mapping.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeIcon({Key? key, required ForgeIconName name, ForgeIconSize? size, String? label, Color? color})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `name` | `IconName` | Required; no local initializer | `name: ForgeIconName` | Same capability and value constraints; preserve source ownership and callback timing. |
| `size` | `ComponentIconSize` | Optional; no local initializer | `size: ForgeIconSize` | Same capability and value constraints; preserve source ownership and callback timing. |
| `label` | `string` | Optional; no local initializer | `label: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `id` | `string` | Optional; no local initializer | `semanticId: String` | Stable owner-scoped semantic/test identity, not a DOM id. |
| `aria-describedby` | `string` | Optional; no local initializer | `descriptions: List<ForgeDescriptionBinding>` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-expanded` | `Booleanish` | Optional; no local initializer | `semanticExpanded: bool` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-invalid` | `boolean \| "false" \| "true" \| "grammar" \| "spelling"` | Optional; no local initializer | `semanticInvalid: ForgeInvalidState` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-label` | `string` | Optional; no local initializer | `semanticLabel: String` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-pressed` | `boolean \| "false" \| "mixed" \| "true"` | Optional; no local initializer | `semanticPressed: ForgeSemanticFlag` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `children` | `ReactNode` | Optional; no local initializer | Excluded | Source-owned geometry/image/placeholder content overrides inherited children; do not introduce an app child parameter. |

### Defaults and fixed forwarding

- No public-property initializer is owned locally; preserve inherited defaults from the shared baseline/delegated component rather than choosing a new native default.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/atoms/Icon.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/Icon/definition.ts): `icon-geometry`, `basic`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

### Native Flutter implementation (2026-11-18)

- Preserve the existing public `ForgeIcon` widget contract and all shared tokens, semantics, focus/gesture behavior and user-owned resources.
- Use only `package:flutter/widgets.dart` and Forge-owned compositions; no Material/Cupertino import or Material rendering layer.
- `ForgeIcon` may inherit `IconTheme` as a native Flutter widget setting but uses Forge token fallback and its own SVG-like canvas geometry; `ForgeIconButton` delegates to the Forge-owned `ForgeAction` (legacy action backend migration remains a separate pending step); `ForgeTooltip` composes `ForgeSurface` directly, preserving its anchor, hover, focus, escape and semantics behavior.
- Native-source assertion is necessary but not sufficient: run `flutter analyze`, widget tests and visual/a11y inspection before marking this component `DONE`.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Render the original registry's vector paths/viewBox/stroke-or-fill through a native vector adapter, not a replacement icon font.
- [ ] Preserve every icon name and size including inherit; inherit foreground and preserve path order/geometry.
- [ ] Without label the icon is decorative/nonfocusable; with label expose one image name, not an action.
- [ ] Generate stable Dart enum names from source hyphenated names with a reversible serialized-name mapping.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.
