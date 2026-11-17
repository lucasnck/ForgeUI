---
title: "Flutter CheckboxGroup"
scope: "Native app contract preserving the Web CheckboxGroup capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "molecules"
---

# Flutter CheckboxGroup

## Files

```text
components/forge_choice_group.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web CheckboxGroup](../../../../ds/components/molecules/CheckboxGroup.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)
- [App ChoiceGroup](ChoiceGroup.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeCheckboxGroup(
  name: name,
  child: content,
)
```

## Tests

### Native behavior

- Use a native multi-selection group with typed form registration instead of repeated hidden HTML controls.
- Preserve name/legend/children/invalid/gap/padding and value/defaultValue/onValueChange; default collection is empty.
- Toggle one enabled key once, preserve controlled refusal and disabled group/item behavior, and restore defaults on reset.
- Keep descriptor identity/order and exact submitted collection; labels/descriptions remain scoped to one group.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeCheckboxGroup({Key? key, required String name, required List<Widget> children, String? legend, bool disabled = false, bool? invalid, ForgeFormBinding? form, ForgeSpace gap = ForgeSpace.s2, ForgeSpace padding = ForgeSpace.s0, List<String>? value, List<String> defaultValue = const [], void Function(List<String>)? onValueChange})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `name` | `string` | Required; no local initializer | `name: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `legend` | `string` | Optional; no local initializer | `legend: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `form` | `string` | Optional; no local initializer | `form: ForgeFormBinding` | Explicit native form association; no hidden HTML controls or ambient document lookup. |
| `title` | `string` | Optional; no local initializer | `tooltip: String` | Preserve visible component title; inherited native title maps to tooltip. |
| `autoFocus` | `boolean` | Optional; no local initializer | `autofocus: bool` | Native focus request, subordinate to modal/compound owner policy; no focus theft during updates. |
| `id` | `string` | Optional; no local initializer | `semanticId: String` | Stable owner-scoped semantic/test identity, not a DOM id. |
| `aria-describedby` | `string` | Optional; no local initializer | `descriptions: List<ForgeDescriptionBinding>` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-expanded` | `Booleanish` | Optional; no local initializer | `semanticExpanded: bool` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-invalid` | `boolean \| "false" \| "true" \| "grammar" \| "spelling"` | Optional; no local initializer | `semanticInvalid: ForgeInvalidState` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-label` | `string` | Optional; no local initializer | `semanticLabel: String` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-pressed` | `boolean \| "false" \| "mixed" \| "true"` | Optional; no local initializer | `semanticPressed: ForgeSemanticFlag` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `disabled` | `boolean` | Optional; `false` | `disabled: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `children` | `ReactNode` | Required; no local initializer | `child: Widget?` | Compose caller Widgets; keep passive/action semantics and null-content behavior from source. |
| `invalid` | `boolean` | Optional; no local initializer | `invalid: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `gap` | `ComponentSpace` | Optional; no local initializer | `gap: ForgeSpace` | Same capability and value constraints; preserve source ownership and callback timing. |
| `padding` | `ComponentSpace` | Optional; no local initializer | `padding: ForgeSpace` | Same capability and value constraints; preserve source ownership and callback timing. |
| `value` | `Value` | Optional; no local initializer | `value: Value` | Same capability and value constraints; preserve source ownership and callback timing. |
| `defaultValue` | `Value` | Optional; `[]` | `defaultValue: Value` | Same capability and value constraints; preserve source ownership and callback timing. |
| `onValueChange` | `((value: readonly string[]) => void)` | Optional; no local initializer | `onValueChange: void Function(List<String>)` | Same capability and value constraints; preserve source ownership and callback timing. |

### Defaults and fixed forwarding

- Preserve `defaultValue = []` observed in `web/library/src/design-system/components/molecules/CheckboxGroup/useCheckboxGroup.ts`.
- Preserve `disabled = false` observed in `web/library/src/design-system/components/molecules/CheckboxGroup/useCheckboxGroup.ts`.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/molecules/CheckboxGroup.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/CheckboxGroup/definition.ts): `basic`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Use a native multi-selection group with typed form registration instead of repeated hidden HTML controls.
- [ ] Preserve name/legend/children/invalid/gap/padding and value/defaultValue/onValueChange; default collection is empty.
- [ ] Toggle one enabled key once, preserve controlled refusal and disabled group/item behavior, and restore defaults on reset.
- [ ] Keep descriptor identity/order and exact submitted collection; labels/descriptions remain scoped to one group.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.
