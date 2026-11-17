---
title: "Flutter FormFieldInput"
scope: "Native app contract preserving the Web FormFieldInput capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "organisms"
---

# Flutter FormFieldInput

## Files

```text
components/forge_form_field_input.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web FormFieldInput](../../../../ds/components/organisms/Form/FormFieldInput.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeFormFieldInput(
  name: name,
  label: label,
)
```

## Tests

### Native behavior

- Replace React Hook Form registration with an injected typed native form adapter and FormField/Input composition; never require RHF or a browser form.
- Keep name, label, hint, error override, required=false, inputType=text and all shared visuals; register once with the nearest typed form owner.
- Typing/blur update values/dirty/touched once, nested field paths retain typed identity and unregister/dispose preserves the configured owner policy.
- Explicit displayed error overrides provider message while validity still comes from field state; effective disabled includes form owner disabled.
- Fail clearly outside the required registration provider; submission returns the named value without introducing network/persistence behavior.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeFormFieldInput<T>({Key? key, required ForgeFieldPath<T> name, required String label, ForgeTypedFormController<T>? formController, ForgeInputKind inputType = ForgeInputKind.text, String? controlId, void Function(String)? onChanged, TextEditingController? controller, FocusNode? focusNode, ForgeControlBinding? control, String? semanticLabel, String? placeholder, String? hint, String? error, String? pattern, String? validationMessage, bool disabled = false, bool readOnly = false, bool required = false, bool autofocus = false, bool fullWidth = true, bool animated = true, bool? invalid, int? minLength, int? maxLength, ForgeSize size = ForgeSize.md, ForgeTone tone = ForgeTone.neutral, ForgeAppearance appearance = ForgeAppearance.bordered, ForgeShape? shape, TextInputType? keyboardType, TextInputAction? textInputAction, Iterable<String>? autofillHints, bool autocorrect = true, bool spellCheck = true, TextCapitalization capitalization = TextCapitalization.none, void Function(bool)? onFocusChange, void Function()? onSubmitted})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `inputType` | `FormTextInputType` | Optional; `"text"` | `inputType: ForgeTextInputType` | Same capability and value constraints; preserve source ownership and callback timing. |
| `form` | `string` | Optional; no local initializer | `form: ForgeFormBinding` | Explicit native form association; no hidden HTML controls or ambient document lookup. |
| `title` | `string` | Optional; no local initializer | `tooltip: String` | Preserve visible component title; inherited native title maps to tooltip. |
| `pattern` | `string` | Optional; no local initializer | `pattern: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `step` | `number \| string` | Optional; no local initializer | `step: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `autoCapitalize` | `"off" \| "none" \| "on" \| "sentences" \| "words" \| "characters" \| (string & {})` | Optional; no local initializer | `autoCapitalize: TextCapitalization` | Map capitalization intent to native editing hints; unsupported custom browser strings are explicit platform limitations, not alternate validation. |
| `autoFocus` | `boolean` | Optional; no local initializer | `autofocus: bool` | Native focus request, subordinate to modal/compound owner policy; no focus theft during updates. |
| `id` | `string` | Optional; no local initializer | `semanticId: String` | Stable owner-scoped semantic/test identity, not a DOM id. |
| `spellCheck` | `Booleanish` | Optional; no local initializer | `spellCheck: bool` | Native spellcheck hint; normalize Web boolean-string representation without changing meaning. |
| `autoCorrect` | `string` | Optional; no local initializer | `autoCorrect: bool` | Native autocorrection setting, preserving off/on intent independently of validation. |
| `inputMode` | `"none" \| "text" \| "tel" \| "url" \| "email" \| "numeric" \| "decimal" \| "search"` | Optional; no local initializer | `inputMode: ForgeKeyboardHint` | Native keyboard hint only, never a replacement for type/value validation. |
| `aria-describedby` | `string` | Optional; no local initializer | `descriptions: List<ForgeDescriptionBinding>` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-expanded` | `Booleanish` | Optional; no local initializer | `semanticExpanded: bool` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-label` | `string` | Optional; no local initializer | `semanticLabel: String` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-pressed` | `boolean \| "false" \| "mixed" \| "true"` | Optional; no local initializer | `semanticPressed: ForgeSemanticFlag` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `onCompositionEnd` | `CompositionEventHandler<T>` | Optional; no local initializer | `onCompositionEnd: ForgeCompositionListener` | Native editing/key interception with composing range and explicit cancellation; never model a DOM event or duplicate owned actions. |
| `onCompositionStart` | `CompositionEventHandler<T>` | Optional; no local initializer | `onCompositionStart: ForgeCompositionListener` | Native editing/key interception with composing range and explicit cancellation; never model a DOM event or duplicate owned actions. |
| `onFocus` | `FocusEventHandler<T>` | Optional; no local initializer | `onFocusChange: ValueChanged<bool>` | Native focus gain is true; preserve caller interception intent via the native focus/action binding. |
| `onInput` | `InputEventHandler<T>` | Optional; no local initializer | `onInput: ForgeInputInterceptor` | Native editing/key interception with composing range and explicit cancellation; never model a DOM event or duplicate owned actions. |
| `onKeyDown` | `KeyboardEventHandler<T>` | Optional; no local initializer | `onKeyDown: ForgeKeyInterceptor` | Native editing/key interception with composing range and explicit cancellation; never model a DOM event or duplicate owned actions. |
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
| `fullWidth` | `boolean` | Optional; no local initializer | `fullWidth: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `name` | `TName` | Required; no local initializer | `name: ForgeFieldPath<TValues>` | Typed native form field path; preserve nested registration, dirty/touched/error ownership. |
| `label` | `string` | Required; no local initializer | `label: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `hint` | `string` | Optional; no local initializer | `hint: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `error` | `string` | Optional; no local initializer | `error: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `required` | `boolean` | Optional; `false` | `required: bool` | Same capability and value constraints; preserve source ownership and callback timing. |

### Defaults and fixed forwarding

- Preserve `required = false` observed in `web/library/src/design-system/components/organisms/Form/FormFieldInput/useFormFieldInput.ts`.
- Preserve `inputType = "text"` observed in `web/library/src/design-system/components/organisms/Form/FormFieldInput/useFormFieldInput.ts`.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/organisms/Form/FormFieldInput.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/FormFieldInput/definition.ts): `basic`, `conditional`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Replace React Hook Form registration with an injected typed native form adapter and FormField/Input composition; never require RHF or a browser form.
- [ ] Keep name, label, hint, error override, required=false, inputType=text and all shared visuals; register once with the nearest typed form owner.
- [ ] Typing/blur update values/dirty/touched once, nested field paths retain typed identity and unregister/dispose preserves the configured owner policy.
- [ ] Explicit displayed error overrides provider message while validity still comes from field state; effective disabled includes form owner disabled.
- [ ] Fail clearly outside the required registration provider; submission returns the named value without introducing network/persistence behavior.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.
