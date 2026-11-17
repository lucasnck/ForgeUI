---
title: "Flutter InternationalTelephoneInput"
scope: "Native app contract preserving the Web InternationalTelephoneInput capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "molecules"
---

# Flutter InternationalTelephoneInput

## Files

```text
components/forge_international_telephone_input.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web InternationalTelephoneInput](../../../../ds/components/molecules/InternationalTelephoneInput.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)
- [App Select](../atoms/Select.sc.md)
- [App TelephoneInput](TelephoneInput.sc.md)
- [App InputGroup](InputGroup.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeInternationalTelephoneInput(
  value: value,
  onValueChange: onValueChange,
  locale: locale,
  countryLabel: countryLabel,
  internationalLabel: internationalLabel,
  invalidMessage: invalidMessage,
)
```

## Tests

### Native behavior

- Use a native phone editor with exact controlled country/number model and optional country selector; formatting does not certify reachability.
- Preserve value/onValueChange/onInputStateChange/locale/countryLabel/internationalLabel/invalidMessage and showCountrySelector=true.
- Validate countries/fixedCountry/defaultCountry consistency; support international paste, shared calling codes and significant national zeros without duplicated prefixes.
- Keep partial/invalid drafts and IME/caret; country changes emit one atomic controlled update and refused changes stay authoritative.
- Map canonical submitted value to native form registration; do not call contacts, telephony, geolocation or verification services.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeInternationalTelephoneInput({Key? key, required ForgePhoneInputValue value, required void Function(ForgePhoneInputValue) onValueChange, required ForgeLocale locale, required String countryLabel, required String internationalLabel, required String invalidMessage, void Function(ForgePhoneParseResult)? onInputStateChange, List<String>? countries, String? fixedCountry, String? defaultCountry, bool showCountrySelector = true, TextEditingController? controller, FocusNode? focusNode, ForgeControlBinding? control, String? name, String? semanticLabel, String? placeholder, String? label, String? hint, String? error, String? validationMessage, ForgeFormBinding? form, bool disabled = false, bool readOnly = false, bool required = false, bool autofocus = false, bool fullWidth = true, bool animated = true, bool? invalid, int? minLength, ForgeSize size = ForgeSize.md, ForgeTone tone = ForgeTone.neutral, ForgeAppearance appearance = ForgeAppearance.bordered, ForgeShape? shape, TextInputType? keyboardType, TextInputAction? textInputAction, Iterable<String>? autofillHints, bool autocorrect = true, bool spellCheck = true, TextCapitalization capitalization = TextCapitalization.none, void Function(bool)? onFocusChange, void Function()? onSubmitted})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `value` | `PhoneInputValue` | Required; no local initializer | `value: ForgePhoneInputValue` | Same capability and value constraints; preserve source ownership and callback timing. |
| `onValueChange` | `(value: PhoneInputValue) => void` | Required; no local initializer | `onValueChange: void Function(ForgePhoneInputValue)` | Same capability and value constraints; preserve source ownership and callback timing. |
| `onInputStateChange` | `((state: PhoneParseResult) => void)` | Optional; no local initializer | `onInputStateChange: void Function(ForgePhoneParseResult)` | Same capability and value constraints; preserve source ownership and callback timing. |
| `locale` | `Locale` | Required; no local initializer | `locale: ForgeLocale` | Same capability and value constraints; preserve source ownership and callback timing. |
| `countryLabel` | `string` | Required; no local initializer | `countryLabel: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `internationalLabel` | `string` | Required; no local initializer | `internationalLabel: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `invalidMessage` | `string` | Required; no local initializer | `invalidMessage: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `countries` | `readonly PhoneCountry[]` | Optional; no local initializer | `countries: List<String>` | Same capability and value constraints; preserve source ownership and callback timing. |
| `fixedCountry` | `PhoneCountry` | Optional; no local initializer | `fixedCountry: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `showCountrySelector` | `boolean` | Optional; `true` | `showCountrySelector: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `defaultCountry` | `PhoneCountry` | Optional; no local initializer | `defaultCountry: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `form` | `string` | Optional; no local initializer | `form: ForgeFormBinding` | Explicit native form association; no hidden HTML controls or ambient document lookup. |
| `title` | `string` | Optional; no local initializer | `tooltip: String` | Preserve visible component title; inherited native title maps to tooltip. |
| `step` | `number \| string` | Optional; no local initializer | `step: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `autoCapitalize` | `"off" \| "none" \| "on" \| "sentences" \| "words" \| "characters" \| (string & {})` | Optional; no local initializer | `autoCapitalize: TextCapitalization` | Map capitalization intent to native editing hints; unsupported custom browser strings are explicit platform limitations, not alternate validation. |
| `autoFocus` | `boolean` | Optional; no local initializer | `autofocus: bool` | Native focus request, subordinate to modal/compound owner policy; no focus theft during updates. |
| `id` | `string` | Optional; no local initializer | `semanticId: String` | Stable owner-scoped semantic/test identity, not a DOM id. |
| `spellCheck` | `Booleanish` | Optional; no local initializer | `spellCheck: bool` | Native spellcheck hint; normalize Web boolean-string representation without changing meaning. |
| `autoCorrect` | `string` | Optional; no local initializer | `autoCorrect: bool` | Native autocorrection setting, preserving off/on intent independently of validation. |
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

### Defaults and fixed forwarding

- Preserve `showCountrySelector = true` observed in `web/library/src/design-system/components/molecules/InternationalTelephoneInput/useInternationalTelephoneInput.ts`.
- Source forwards `type="hidden"` to a rendered control. Preserve that control intent and the source spread/override precedence; it is not automatically a new public app parameter.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/molecules/InternationalTelephoneInput.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/InternationalTelephoneInput/definition.ts): `basic`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Use a native phone editor with exact controlled country/number model and optional country selector; formatting does not certify reachability.
- [ ] Preserve value/onValueChange/onInputStateChange/locale/countryLabel/internationalLabel/invalidMessage and showCountrySelector=true.
- [ ] Validate countries/fixedCountry/defaultCountry consistency; support international paste, shared calling codes and significant national zeros without duplicated prefixes.
- [ ] Keep partial/invalid drafts and IME/caret; country changes emit one atomic controlled update and refused changes stay authoritative.
- [ ] Map canonical submitted value to native form registration; do not call contacts, telephony, geolocation or verification services.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.
