---
title: "Flutter ListBox"
scope: "Native app contract preserving the Web ListBox capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "organisms"
---

# Flutter ListBox

## Files

```text
components/forge_list_box.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web ListBox](../../../../ds/components/organisms/ListBox.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)
- [App ListBoxHeader](../atoms/ListBoxHeader.sc.md)
- [App ListBoxBody](../molecules/ListBoxBody.sc.md)
- [App ListBoxFooter](../atoms/ListBoxFooter.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeListBox(
  label: label,
  options: options,
  children: parts,
)
```

## Tests

### Native behavior

- Use a named native selection list preserving single/multiple modes, controlled/default keys and caller descriptors.
- Preserve label/options, selectionMode=single, disabled=false, invalid and animated=true with public regions.
- Keep controlled refusal, enabled-item traversal/typeahead, explicit empty fallback and unique option identities.
- Map name/form to native form registration rather than hidden inputs; preserve submitted selection values, disabled exclusion and reset defaults.
- Use touch selection and hardware keyboard parity without imposing a modal picker.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeListBox({Key? key, required String label, required List<ForgeChoiceOption> options, required List<Widget> children, List<String>? value, List<String> defaultValue = const [], void Function(List<String>)? onValueChange, ForgeSelectionMode selectionMode = ForgeSelectionMode.single, bool disabled = false, bool animated = true, bool? invalid, String? name, ForgeFormBinding? form})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `label` | `string` | Required; no local initializer | `label: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `options` | `readonly ListBoxOption[]` | Required; no local initializer | `options: List<ForgeListBoxOption>` | Same capability and value constraints; preserve source ownership and callback timing. |
| `selectionMode` | `SelectionMode` | Optional; `"single"` | `selectionMode: ForgeSelectionMode` | Same capability and value constraints; preserve source ownership and callback timing. |
| `disabled` | `boolean` | Optional; `false` | `disabled: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `name` | `string` | Optional; no local initializer | `name: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `form` | `string` | Optional; no local initializer | `form: ForgeFormBinding` | Explicit native form association; no hidden HTML controls or ambient document lookup. |
| `title` | `string` | Optional; no local initializer | `tooltip: String` | Preserve visible component title; inherited native title maps to tooltip. |
| `autoFocus` | `boolean` | Optional; no local initializer | `autofocus: bool` | Native focus request, subordinate to modal/compound owner policy; no focus theft during updates. |
| `id` | `string` | Optional; no local initializer | `semanticId: String` | Stable owner-scoped semantic/test identity, not a DOM id. |
| `aria-describedby` | `string` | Optional; no local initializer | `descriptions: List<ForgeDescriptionBinding>` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-expanded` | `Booleanish` | Optional; no local initializer | `semanticExpanded: bool` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-invalid` | `boolean \| "false" \| "true" \| "grammar" \| "spelling"` | Optional; no local initializer | `semanticInvalid: ForgeInvalidState` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-label` | `string` | Optional; no local initializer | `semanticLabel: String` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-pressed` | `boolean \| "false" \| "mixed" \| "true"` | Optional; no local initializer | `semanticPressed: ForgeSemanticFlag` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `children` | `ReactNode` | Required; no local initializer | `children: List<Widget>` | Preserve permitted canonical parts, child order and identity; no arbitrary descendant cloning. |
| `value` | `Value` | Optional; no local initializer | `value: Value` | Same capability and value constraints; preserve source ownership and callback timing. |
| `defaultValue` | `Value` | Optional; no local initializer | `defaultValue: Value` | Same capability and value constraints; preserve source ownership and callback timing. |
| `onValueChange` | `((value: readonly string[]) => void)` | Optional; no local initializer | `onValueChange: void Function(List<String>)` | Same capability and value constraints; preserve source ownership and callback timing. |
| `invalid` | `boolean` | Optional; no local initializer | `invalid: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `animated` | `boolean` | Optional; `true` | `animated: bool` | Same capability and value constraints; preserve source ownership and callback timing. |

### Defaults and fixed forwarding

- Preserve `selectionMode = "single"` observed in `web/library/src/design-system/components/organisms/ListBox/useListBox.ts`.
- Preserve `disabled = false` observed in `web/library/src/design-system/components/organisms/ListBox/useListBox.ts`.
- Preserve `animated = true` observed in `web/library/src/design-system/components/organisms/ListBox/useListBox.ts`.
- Source forwards `type="hidden"` to a rendered control. Preserve that control intent and the source spread/override precedence; it is not automatically a new public app parameter.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/organisms/ListBox.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/ListBox/definition.ts): `basic`, `filtered`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Use a named native selection list preserving single/multiple modes, controlled/default keys and caller descriptors.
- [ ] Preserve label/options, selectionMode=single, disabled=false, invalid and animated=true with public regions.
- [ ] Keep controlled refusal, enabled-item traversal/typeahead, explicit empty fallback and unique option identities.
- [ ] Map name/form to native form registration rather than hidden inputs; preserve submitted selection values, disabled exclusion and reset defaults.
- [ ] Use touch selection and hardware keyboard parity without imposing a modal picker.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.

## Showcase verification checkpoint — 2026-11-17

The native showcase now exercises this API in its canonical composition. The [group validation report](../../../../../migration/FLUTTER-COLLECTIONS-WAVE-7.md) records widget/snippet tests, compilation evidence and limits. This records preview coverage; it does not establish full Web parity or Android/iOS visual and assistive acceptance. Unverified Criteria remain PENDING.
