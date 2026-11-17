---
title: "Flutter EmailInput"
scope: "Native app contract preserving the Web EmailInput capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "molecules"
---

# Flutter EmailInput

## Files

```text
components/forge_email_input.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web EmailInput](../../../../ds/components/molecules/EmailInput.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)
- [App Input](../atoms/Input.sc.md)
- [App PopupListbox](PopupListbox.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeEmailInput(
  value: value,
  onValueChange: onValueChange,
  providers: providers,
)
```

## Tests

### Native behavior

- Use a controlled native email editor with caller-provided provider suggestions and an anchored completion list.
- Preserve value/onValueChange/providers/maxSuggestions=4, native email keyboard and invalid state.
- Completion respects selection/caret and IME, emits once and does not fetch provider lists or create a second selected-value channel.
- Preserve accessibility label/listboxLabel and caller refusal; native keyboard hints cannot replace validation.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeEmailInput({Key? key, required String value, required void Function(String) onValueChange, required List<String> providers, int maxSuggestions = 4, required String listboxLabel, TextEditingController? controller, FocusNode? focusNode, ForgeControlBinding? control, String? name, String? semanticLabel, String? placeholder, String? label, String? hint, String? error, String? pattern, String? validationMessage, ForgeFormBinding? form, bool disabled = false, bool readOnly = false, bool required = false, bool autofocus = false, bool fullWidth = true, bool animated = true, bool? invalid, int? minLength, int? maxLength, ForgeSize size = ForgeSize.md, ForgeTone tone = ForgeTone.neutral, ForgeAppearance appearance = ForgeAppearance.bordered, ForgeShape? shape, TextInputType? keyboardType, TextInputAction? textInputAction, Iterable<String>? autofillHints, void Function(bool)? onFocusChange, void Function()? onSubmitted})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `value` | `string` | Required; no local initializer | `value: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `onValueChange` | `(value: string) => void` | Required; no local initializer | `onValueChange: void Function(String)` | Same capability and value constraints; preserve source ownership and callback timing. |
| `providers` | `readonly string[]` | Required; no local initializer | `providers: List<String>` | Same capability and value constraints; preserve source ownership and callback timing. |
| `maxSuggestions` | `number` | Optional; `4` | `maxSuggestions: int` | Same capability and value constraints; preserve source ownership and callback timing. |
| `form` | `string` | Optional; no local initializer | `form: ForgeFormBinding` | Explicit native form association; no hidden HTML controls or ambient document lookup. |
| `title` | `string` | Optional; no local initializer | `tooltip: String` | Preserve visible component title; inherited native title maps to tooltip. |
| `pattern` | `string` | Optional; no local initializer | `pattern: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `step` | `number \| string` | Optional; no local initializer | `step: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `children` | `ReactNode` | Optional; no local initializer | `child: Widget?` | Compose caller Widgets; keep passive/action semantics and null-content behavior from source. |
| `autoFocus` | `boolean` | Optional; no local initializer | `autofocus: bool` | Native focus request, subordinate to modal/compound owner policy; no focus theft during updates. |
| `id` | `string` | Optional; no local initializer | `semanticId: String` | Stable owner-scoped semantic/test identity, not a DOM id. |
| `aria-describedby` | `string` | Optional; no local initializer | `descriptions: List<ForgeDescriptionBinding>` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-expanded` | `Booleanish` | Optional; no local initializer | `semanticExpanded: bool` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-invalid` | `boolean \| "false" \| "true" \| "grammar" \| "spelling"` | Optional; no local initializer | `semanticInvalid: ForgeInvalidState` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-label` | `string` | Optional; no local initializer | `semanticLabel: String` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-pressed` | `boolean \| "false" \| "mixed" \| "true"` | Optional; no local initializer | `semanticPressed: ForgeSemanticFlag` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `onCompositionEnd` | `CompositionEventHandler<T>` | Optional; no local initializer | `onCompositionEnd: ForgeCompositionListener` | Native editing/key interception with composing range and explicit cancellation; never model a DOM event or duplicate owned actions. |
| `onCompositionStart` | `CompositionEventHandler<T>` | Optional; no local initializer | `onCompositionStart: ForgeCompositionListener` | Native editing/key interception with composing range and explicit cancellation; never model a DOM event or duplicate owned actions. |
| `onFocus` | `FocusEventHandler<T>` | Optional; no local initializer | `onFocusChange: ValueChanged<bool>` | Native focus gain is true; preserve caller interception intent via the native focus/action binding. |
| `onBlur` | `FocusEventHandler<T>` | Optional; no local initializer | `onFocusChange: ValueChanged<bool>` | Native focus loss is false; retain blur/commit timing and no duplicate value callback. |
| `onInput` | `InputEventHandler<T>` | Optional; no local initializer | `onInput: ForgeInputInterceptor` | Native editing/key interception with composing range and explicit cancellation; never model a DOM event or duplicate owned actions. |
| `onKeyDown` | `KeyboardEventHandler<T>` | Optional; no local initializer | `onKeyDown: ForgeKeyInterceptor` | Native editing/key interception with composing range and explicit cancellation; never model a DOM event or duplicate owned actions. |
| `name` | `string` | Optional; no local initializer | `name: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `required` | `boolean` | Optional; no local initializer | `required: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
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
| `fullWidth` | `boolean` | Optional; no local initializer | `fullWidth: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `invalid` | `boolean` | Optional; no local initializer | `invalid: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `listboxLabel` | `string` | Optional; no local initializer | `listboxLabel: String` | Same capability and value constraints; preserve source ownership and callback timing. |

### Defaults and fixed forwarding

- Preserve `maxSuggestions = 4` observed in `web/library/src/design-system/components/molecules/EmailInput/useEmailInput.ts`.
- Source forwards `type="email"` to a rendered control. Preserve that control intent and the source spread/override precedence; it is not automatically a new public app parameter.
- Source forwards `inputMode="email"` to a rendered control. Preserve that control intent and the source spread/override precedence; it is not automatically a new public app parameter.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/molecules/EmailInput.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/EmailInput/definition.ts): `basic`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Use a controlled native email editor with caller-provided provider suggestions and an anchored completion list.
- [ ] Preserve value/onValueChange/providers/maxSuggestions=4, native email keyboard and invalid state.
- [ ] Completion respects selection/caret and IME, emits once and does not fetch provider lists or create a second selected-value channel.
- [ ] Preserve accessibility label/listboxLabel and caller refusal; native keyboard hints cannot replace validation.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.
