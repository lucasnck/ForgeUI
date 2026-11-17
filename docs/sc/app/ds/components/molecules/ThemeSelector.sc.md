---
title: "Flutter ThemeSelector"
scope: "Native app contract preserving the Web ThemeSelector capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "molecules"
---

# Flutter ThemeSelector

## Files

```text
components/forge_selectors.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web ThemeSelector](../../../../ds/components/molecules/ThemeSelector.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)
- [App Select](../atoms/Select.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeThemeSelector(
  value: value,
  options: options,
  onValueChange: onValueChange,
  label: label,
)
```

## Tests

### Native behavior

- Use a native controlled selector with the exact caller-provided supported preference values; do not persist preferences or change app providers implicitly.
- Preserve value/options/onValueChange/label/id/disabled/size, option order and validation of supported values.
- One accepted user selection emits one callback; prop updates, disabled actions and invalid options never fabricate preference changes.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeThemeSelector({Key? key, required ForgeThemeId value, required void Function(ForgeThemeId) onValueChange, required List<ForgeSelectorOption<ForgeThemeId>> options, required String label, bool disabled = false, ForgeSize size = ForgeSize.md})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `value` | `Value` | Required; no local initializer | `value: Value` | Same capability and value constraints; preserve source ownership and callback timing. |
| `options` | `readonly SelectorOption<Value>[]` | Required; no local initializer | `options: List<ForgeSelectorOption<Value>>` | Same capability and value constraints; preserve source ownership and callback timing. |
| `onValueChange` | `(value: Value) => void` | Required; no local initializer | `onValueChange: void Function(Value)` | Same capability and value constraints; preserve source ownership and callback timing. |
| `label` | `string` | Required; no local initializer | `label: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `id` | `string` | Optional; no local initializer | `semanticId: String` | Stable owner-scoped semantic/test identity, not a DOM id. |
| `disabled` | `boolean` | Optional; no local initializer | `disabled: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `size` | `ComponentSize` | Optional; no local initializer | `size: ForgeSize` | Same capability and value constraints; preserve source ownership and callback timing. |

### Defaults and fixed forwarding

- No public-property initializer is owned locally; preserve inherited defaults from the shared baseline/delegated component rather than choosing a new native default.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/molecules/ThemeSelector.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/ThemeSelector/definition.ts): `basic`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Use a native controlled selector with the exact caller-provided supported preference values; do not persist preferences or change app providers implicitly.
- [ ] Preserve value/options/onValueChange/label/id/disabled/size, option order and validation of supported values.
- [ ] One accepted user selection emits one callback; prop updates, disabled actions and invalid options never fabricate preference changes.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.
