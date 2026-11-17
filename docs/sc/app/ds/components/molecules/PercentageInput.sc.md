---
title: "Flutter PercentageInput"
scope: "Native app contract preserving the Web PercentageInput capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "molecules"
---

# Flutter PercentageInput

## Files

```text
components/forge_percentage_input.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web PercentageInput](../../../../ds/components/molecules/PercentageInput.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)
- [App InputGroup](InputGroup.sc.md)
- [App InputAddon](InputAddon.sc.md)
- [App NumberInput](NumberInput.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgePercentageInput()
```

## Tests

### Native behavior

- Keep NumberInput semantics with a decorative percentage addon; adapt the numeric keyboard without converting between percent and fractions.
- Preserve fullWidth=true, native value/defaultValue/onChange, min/max/step and explicit invalid precedence.
- Preserve source min=0/max=100/step=1 defaults and caller overrides, without converting percentages to fractions; keep the percentage suffix decorative and name any meaningful unit explicitly through the caller control label/description.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgePercentageInput({Key? key, double min = 0, double max = 100, double step = 1, String? value, String defaultValue = '', void Function(String)? onChanged, TextEditingController? controller, FocusNode? focusNode, ForgeControlBinding? control, String? name, String? semanticLabel, String? placeholder, String? label, String? hint, String? error, String? pattern, String? validationMessage, ForgeFormBinding? form, bool disabled = false, bool readOnly = false, bool required = false, bool autofocus = false, bool fullWidth = true, bool animated = true, bool? invalid, int? minLength, int? maxLength, ForgeSize size = ForgeSize.md, ForgeTone tone = ForgeTone.neutral, ForgeAppearance appearance = ForgeAppearance.bordered, ForgeShape? shape, TextInputType? keyboardType, TextInputAction? textInputAction, Iterable<String>? autofillHints, bool autocorrect = true, bool spellCheck = true, TextCapitalization capitalization = TextCapitalization.none, void Function(bool)? onFocusChange, void Function()? onSubmitted})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `form` | `string` | Optional; no local initializer | `form: ForgeFormBinding` | Explicit native form association; no hidden HTML controls or ambient document lookup. |
| `title` | `string` | Optional; no local initializer | `tooltip: String` | Preserve visible component title; inherited native title maps to tooltip. |
| `pattern` | `string` | Optional; no local initializer | `pattern: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `step` | `number \| string` | Optional; no local initializer | `step: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `defaultValue` | `string \| number \| readonly string[]` | Optional; no local initializer | `defaultValue: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `autoCapitalize` | `"off" \| "none" \| "on" \| "sentences" \| "words" \| "characters" \| (string & {})` | Optional; no local initializer | `autoCapitalize: TextCapitalization` | Map capitalization intent to native editing hints; unsupported custom browser strings are explicit platform limitations, not alternate validation. |
| `autoFocus` | `boolean` | Optional; no local initializer | `autofocus: bool` | Native focus request, subordinate to modal/compound owner policy; no focus theft during updates. |
| `id` | `string` | Optional; no local initializer | `semanticId: String` | Stable owner-scoped semantic/test identity, not a DOM id. |
| `spellCheck` | `Booleanish` | Optional; no local initializer | `spellCheck: bool` | Native spellcheck hint; normalize Web boolean-string representation without changing meaning. |
| `autoCorrect` | `string` | Optional; no local initializer | `autoCorrect: bool` | Native autocorrection setting, preserving off/on intent independently of validation. |
| `inputMode` | `"none" \| "text" \| "tel" \| "url" \| "email" \| "numeric" \| "decimal" \| "search"` | Optional; no local initializer | `inputMode: ForgeKeyboardHint` | Native keyboard hint only, never a replacement for type/value validation. |
| `aria-describedby` | `string` | Optional; no local initializer | `descriptions: List<ForgeDescriptionBinding>` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-expanded` | `Booleanish` | Optional; no local initializer | `semanticExpanded: bool` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-invalid` | `boolean \| "false" \| "true" \| "grammar" \| "spelling"` | Optional; no local initializer | `semanticInvalid: ForgeInvalidState` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-label` | `string` | Optional; no local initializer | `semanticLabel: String` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-pressed` | `boolean \| "false" \| "mixed" \| "true"` | Optional; no local initializer | `semanticPressed: ForgeSemanticFlag` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `onCompositionEnd` | `CompositionEventHandler<T>` | Optional; no local initializer | `onCompositionEnd: ForgeCompositionListener` | Native editing/key interception with composing range and explicit cancellation; never model a DOM event or duplicate owned actions. |
| `onCompositionStart` | `CompositionEventHandler<T>` | Optional; no local initializer | `onCompositionStart: ForgeCompositionListener` | Native editing/key interception with composing range and explicit cancellation; never model a DOM event or duplicate owned actions. |
| `onFocus` | `FocusEventHandler<T>` | Optional; no local initializer | `onFocusChange: ValueChanged<bool>` | Native focus gain is true; preserve caller interception intent via the native focus/action binding. |
| `onBlur` | `FocusEventHandler<T>` | Optional; no local initializer | `onFocusChange: ValueChanged<bool>` | Native focus loss is false; retain blur/commit timing and no duplicate value callback. |
| `onChange` | `ChangeEventHandler<T, HTMLInputElement>` | Optional; no local initializer | `onChanged: ValueChanged<String>` | Native value callback replacing browser event; preserve controlled/default ownership, exact canonical value and one user-change notification. |
| `onInput` | `InputEventHandler<T>` | Optional; no local initializer | `onInput: ForgeInputInterceptor` | Native editing/key interception with composing range and explicit cancellation; never model a DOM event or duplicate owned actions. |
| `onKeyDown` | `KeyboardEventHandler<T>` | Optional; no local initializer | `onKeyDown: ForgeKeyInterceptor` | Native editing/key interception with composing range and explicit cancellation; never model a DOM event or duplicate owned actions. |
| `name` | `string` | Optional; no local initializer | `name: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `value` | `string \| readonly string[] \| number` | Optional; no local initializer | `value: String` | Canonical native string edit channel; preserve intermediate drafts and distinguish zero/empty instead of coercing on each key. |
| `required` | `boolean` | Optional; no local initializer | `required: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `autoComplete` | `HTMLInputAutoCompleteAttribute` | Optional; no local initializer | `autoComplete: ForgeAutofillHints` | Translate the ordered Web autofill tokens to native autofill hints; report unsupported platform hints without inventing saved values. |
| `disabled` | `boolean` | Optional; no local initializer | `disabled: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `max` | `number \| string` | Optional; no local initializer | `max: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `maxLength` | `number` | Optional; no local initializer | `maxLength: int` | Same capability and value constraints; preserve source ownership and callback timing. |
| `min` | `number \| string` | Optional; no local initializer | `min: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `minLength` | `number` | Optional; no local initializer | `minLength: int` | Same capability and value constraints; preserve source ownership and callback timing. |
| `placeholder` | `string` | Optional; no local initializer | `placeholder: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `readOnly` | `boolean` | Optional; no local initializer | `readOnly: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `size` | `ComponentSize` | Optional; no local initializer | `size: ForgeSize` | Same capability and value constraints; preserve source ownership and callback timing. |
| `tone` | `ComponentTone` | Optional; no local initializer | `tone: ForgeTone` | Same capability and value constraints; preserve source ownership and callback timing. |
| `appearance` | `ComponentAppearance` | Optional; no local initializer | `appearance: ForgeAppearance` | Same capability and value constraints; preserve source ownership and callback timing. |
| `shape` | `ComponentShape` | Optional; no local initializer | `shape: ForgeShape` | Same capability and value constraints; preserve source ownership and callback timing. |
| `fullWidth` | `boolean` | Optional; `true` | `fullWidth: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `invalid` | `boolean` | Optional; no local initializer | `invalid: bool` | Same capability and value constraints; preserve source ownership and callback timing. |

### Defaults and fixed forwarding

- Preserve `fullWidth = true` observed in `web/library/src/design-system/components/molecules/PercentageInput/PercentageInput.tsx`.
- Source forwards `min=0` to a rendered control. Preserve that control intent and the source spread/override precedence; it is not automatically a new public app parameter.
- Source forwards `max=100` to a rendered control. Preserve that control intent and the source spread/override precedence; it is not automatically a new public app parameter.
- Source forwards `step=1` to a rendered control. Preserve that control intent and the source spread/override precedence; it is not automatically a new public app parameter.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/molecules/PercentageInput.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/PercentageInput/definition.ts): `basic`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Keep NumberInput semantics with a decorative percentage addon; adapt the numeric keyboard without converting between percent and fractions.
- [ ] Preserve fullWidth=true, native value/defaultValue/onChange, min/max/step and explicit invalid precedence.
- [ ] Preserve source min=0/max=100/step=1 defaults and caller overrides, without converting percentages to fractions; keep the percentage suffix decorative and name any meaningful unit explicitly through the caller control label/description.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.
