---
title: "Flutter Combobox"
scope: "Native app contract preserving the Web Combobox capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "molecules"
---

# Flutter Combobox

## Files

```text
components/forge_query_input.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web Combobox](../../../../ds/components/molecules/Combobox.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)
- [App ComboboxHeader](../atoms/ComboboxHeader.sc.md)
- [App ComboboxBody](ComboboxBody.sc.md)
- [App ComboboxFooter](../atoms/ComboboxFooter.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeCombobox(
  options: options,
  query: query,
  onQueryChange: onQueryChange,
  selectedValue: selectedValue,
  onSelectionChange: onSelectionChange,
  children: parts,
)
```

## Tests

### Native behavior

- Use a native editable field and anchored options overlay while keeping query and selectedValue as separate controlled channels.
- Typing changes query only; selecting/clearing requests the documented selection/query changes once and preserves rejected controlled state.
- Preserve options order, disabled-option behavior, composition/caret and supplied listboxLabel.
- Link visible label and only mounted footer descriptions; never replace the editable contract with a noneditable picker or implicit API lookup.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeCombobox({Key? key, required List<ForgeChoiceOption> options, required String query, required void Function(String) onQueryChange, required String? selectedValue, required void Function(String?) onSelectionChange, required String listboxLabel, required List<Widget> children, TextEditingController? controller, FocusNode? focusNode, ForgeControlBinding? control, String? name, String? semanticLabel, String? placeholder, String? label, String? hint, String? error, String? pattern, String? validationMessage, ForgeFormBinding? form, bool disabled = false, bool readOnly = false, bool required = false, bool autofocus = false, bool fullWidth = true, bool animated = true, bool? invalid, int? minLength, int? maxLength, ForgeSize size = ForgeSize.md, ForgeTone tone = ForgeTone.neutral, ForgeAppearance appearance = ForgeAppearance.bordered, ForgeShape? shape, TextInputType? keyboardType, TextInputAction? textInputAction, Iterable<String>? autofillHints, bool autocorrect = true, bool spellCheck = true, TextCapitalization capitalization = TextCapitalization.none, void Function(bool)? onFocusChange, void Function()? onSubmitted})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `options` | `readonly ChoiceOption[]` | Required; no local initializer | `options: List<ForgeChoiceOption>` | Same capability and value constraints; preserve source ownership and callback timing. |
| `query` | `string` | Required; no local initializer | `query: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `onQueryChange` | `(query: string) => void` | Required; no local initializer | `onQueryChange: void Function(String)` | Same capability and value constraints; preserve source ownership and callback timing. |
| `selectedValue` | `string \| null` | Required; no local initializer | `selectedValue: String?` | Same capability and value constraints; preserve source ownership and callback timing. |
| `onSelectionChange` | `(value: string \| null) => void` | Required; no local initializer | `onSelectionChange: void Function(String?)` | Same capability and value constraints; preserve source ownership and callback timing. |
| `form` | `string` | Optional; no local initializer | `form: ForgeFormBinding` | Explicit native form association; no hidden HTML controls or ambient document lookup. |
| `title` | `string` | Optional; no local initializer | `tooltip: String` | Preserve visible component title; inherited native title maps to tooltip. |
| `autoFocus` | `boolean` | Optional; no local initializer | `autofocus: bool` | Native focus request, subordinate to modal/compound owner policy; no focus theft during updates. |
| `id` | `string` | Optional; no local initializer | `semanticId: String` | Stable owner-scoped semantic/test identity, not a DOM id. |
| `aria-describedby` | `string` | Optional; no local initializer | `descriptions: List<ForgeDescriptionBinding>` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-expanded` | `Booleanish` | Optional; no local initializer | `semanticExpanded: bool` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-invalid` | `boolean \| "false" \| "true" \| "grammar" \| "spelling"` | Optional; no local initializer | `semanticInvalid: ForgeInvalidState` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-label` | `string` | Optional; no local initializer | `semanticLabel: String` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-pressed` | `boolean \| "false" \| "mixed" \| "true"` | Optional; no local initializer | `semanticPressed: ForgeSemanticFlag` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `name` | `string` | Optional; no local initializer | `name: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `required` | `boolean` | Optional; no local initializer | `required: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `disabled` | `boolean` | Optional; no local initializer | `disabled: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `readOnly` | `boolean` | Optional; no local initializer | `readOnly: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `size` | `ComponentSize` | Optional; no local initializer | `size: ForgeSize` | Same capability and value constraints; preserve source ownership and callback timing. |
| `tone` | `ComponentTone` | Optional; no local initializer | `tone: ForgeTone` | Same capability and value constraints; preserve source ownership and callback timing. |
| `appearance` | `ComponentAppearance` | Optional; no local initializer | `appearance: ForgeAppearance` | Same capability and value constraints; preserve source ownership and callback timing. |
| `shape` | `ComponentShape` | Optional; no local initializer | `shape: ForgeShape` | Same capability and value constraints; preserve source ownership and callback timing. |
| `fullWidth` | `boolean` | Optional; no local initializer | `fullWidth: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `invalid` | `boolean` | Optional; no local initializer | `invalid: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `listboxLabel` | `string` | Optional; no local initializer | `listboxLabel: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `children` | `ReactNode` | Required; no local initializer | `children: List<Widget>` | Preserve permitted canonical parts, child order and identity; no arbitrary descendant cloning. |

### Defaults and fixed forwarding

- No public-property initializer is owned locally; preserve inherited defaults from the shared baseline/delegated component rather than choosing a new native default.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/molecules/Combobox.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/Combobox/definition.ts): `basic`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Use a native editable field and anchored options overlay while keeping query and selectedValue as separate controlled channels.
- [ ] Typing changes query only; selecting/clearing requests the documented selection/query changes once and preserves rejected controlled state.
- [ ] Preserve options order, disabled-option behavior, composition/caret and supplied listboxLabel.
- [ ] Link visible label and only mounted footer descriptions; never replace the editable contract with a noneditable picker or implicit API lookup.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.
