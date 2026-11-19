---
title: "Flutter ODataFilterValue"
scope: "Native app contract preserving the Web ODataFilterValue capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "molecules"
---

# Flutter ODataFilterValue

## Files

```text
components/forge_o_data_filter.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web ODataFilterValue](../../../../ds/components/molecules/ODataFilterValue.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)
- [App Input](../atoms/Input.sc.md)
- [App Select](../atoms/Select.sc.md)
- [App NumberInput](NumberInput.sc.md)
- [App DateInput](DateInput.sc.md)
- [App TimeInput](TimeInput.sc.md)
- [App DateTimeInput](DateTimeInput.sc.md)
- [App SearchInput](SearchInput.sc.md)
- [App RadioGroup](RadioGroup.sc.md)
- [App RadioGroupItem](RadioGroupItem.sc.md)
- [App CheckboxGroup](CheckboxGroup.sc.md)
- [App CheckboxGroupItem](CheckboxGroupItem.sc.md)
- [App ChoiceGroupBody](../atoms/ChoiceGroupBody.sc.md)
- [App Combobox](Combobox.sc.md)
- [App ComboboxBody](ComboboxBody.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeODataFilterValue(
  field: field,
  value: value,
  onValueChange: onValueChange,
  label: label,
  labels: labels,
)
```

## Tests

### Native behavior

- Render the existing field/operator-dependent native editor; use decimal keyboard hints without coercing exact values.
- Preserve field/value/onValueChange/label/labels/operator/disabled/invalid and independently named between bounds.
- Only number-kind uses numeric conversion; GUID/decimal keep signs, zeros, incomplete text and null absence until Apply/serialization.
- Field/operator ownership stays with the condition; rejected updates retain caller value and clear/reset never invents a lookup request.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeODataFilterValue({Key? key, required ForgeODataFilterField field, required ForgeODataFilterValueData? value, required void Function(ForgeODataFilterValueData?) onValueChange, required String label, required ForgeODataFilterLabels labels, ForgeODataFilterOperator? operator, bool disabled = false, bool? invalid})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `field` | `ODataFilterField` | Required; no local initializer | `field: ForgeODataFilterField` | Same capability and value constraints; preserve source ownership and callback timing. |
| `value` | `ODataFilterValueData` | Required; no local initializer | `value: ForgeODataFilterValueData` | Same capability and value constraints; preserve source ownership and callback timing. |
| `onValueChange` | `(value: ODataFilterValueData) => void` | Required; no local initializer | `onValueChange: void Function(ForgeODataFilterValueData)` | Same capability and value constraints; preserve source ownership and callback timing. |
| `label` | `string` | Required; no local initializer | `label: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `labels` | `ODataFilterLabels` | Required; no local initializer | `labels: ForgeODataFilterLabels` | Same capability and value constraints; preserve source ownership and callback timing. |
| `operator` | `ODataFilterOperator` | Optional; no local initializer | `operator: ForgeODataFilterOperator` | Same capability and value constraints; preserve source ownership and callback timing. |
| `disabled` | `boolean` | Optional; no local initializer | `disabled: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `invalid` | `boolean` | Optional; no local initializer | `invalid: bool` | Same capability and value constraints; preserve source ownership and callback timing. |

### Defaults and fixed forwarding

- No public-property initializer is owned locally; preserve inherited defaults from the shared baseline/delegated component rather than choosing a new native default.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/molecules/ODataFilterValue.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/ODataFilterValue/definition.ts): `basic`, `exact`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Render the existing field/operator-dependent native editor; use decimal keyboard hints without coercing exact values.
- [ ] Preserve field/value/onValueChange/label/labels/operator/disabled/invalid and independently named between bounds.
- [ ] Only number-kind uses numeric conversion; GUID/decimal keep signs, zeros, incomplete text and null absence until Apply/serialization.
- [ ] Field/operator ownership stays with the condition; rejected updates retain caller value and clear/reset never invents a lookup request.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.

## Showcase verification checkpoint — 2026-11-17

The native showcase now exercises this API in its canonical composition. The [group validation report](../../../../../migration/FLUTTER-REMAINING-PREVIEWS-WAVE-8.md) records widget/snippet tests, compilation evidence and limits. This records preview coverage; it does not establish full Web parity or Android/iOS visual and assistive acceptance. Unverified Criteria remain PENDING.
