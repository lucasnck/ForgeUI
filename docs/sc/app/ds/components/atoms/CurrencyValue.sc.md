---
title: "Flutter CurrencyValue"
scope: "Native app contract preserving the Web CurrencyValue capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "atoms"
---

# Flutter CurrencyValue

## Files

```text
components/forge_currency_value.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web CurrencyValue](../../../../ds/components/atoms/CurrencyValue.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)
- [App Text](Text.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeCurrencyValue(
  value: value,
  currency: currency,
  locale: locale,
)
```

## Tests

### Native behavior

- Use token-backed passive Text formatting with exact decimal-string/null money and explicit currency/locale; no floating-point conversion or currency conversion.
- Preserve emptyLabel=em dash, zero/negative values, currencyDisplay=code default and explicit symbol/narrowSymbol/name/useGrouping.
- Resolve signs/separators/spacing through the locale adapter while preserving precision; null is not zero.
- No input/picker/icon or automatic profit/loss color is added; keep typography and semantic intent.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeCurrencyValue({Key? key, required String? value, required String currency, required ForgeLocale locale, ForgeCurrencyDisplay currencyDisplay = ForgeCurrencyDisplay.code, bool useGrouping = true, String emptyLabel = '—', ForgeTextSize? size, ForgeTextTone? tone, ForgeFontWeight? weight, String? semanticLabel, String? semanticId, List<ForgeDescriptionBinding> descriptions = const [], ForgeTextSemanticRole semanticRole = ForgeTextSemanticRole.inline})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `value` | `MonetaryValue` | Required; no local initializer | `value: String?` | Same capability and value constraints; preserve source ownership and callback timing. |
| `emptyLabel` | `string` | Optional; `"—"` | `emptyLabel: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `as` | `TextElement` | Optional; no local initializer | `semanticRole: ForgeTextSemanticRole` | Native semantic/composition intent instead of an HTML tag; preserve text emphasis or structural intent without inventing app landmarks. |
| `title` | `string` | Optional; no local initializer | `tooltip: String` | Preserve visible component title; inherited native title maps to tooltip. |
| `autoFocus` | `boolean` | Optional; no local initializer | `autofocus: bool` | Native focus request, subordinate to modal/compound owner policy; no focus theft during updates. |
| `id` | `string` | Optional; no local initializer | `semanticId: String` | Stable owner-scoped semantic/test identity, not a DOM id. |
| `aria-describedby` | `string` | Optional; no local initializer | `descriptions: List<ForgeDescriptionBinding>` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-expanded` | `Booleanish` | Optional; no local initializer | `semanticExpanded: bool` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-invalid` | `boolean \| "false" \| "true" \| "grammar" \| "spelling"` | Optional; no local initializer | `semanticInvalid: ForgeInvalidState` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-label` | `string` | Optional; no local initializer | `semanticLabel: String` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-pressed` | `boolean \| "false" \| "mixed" \| "true"` | Optional; no local initializer | `semanticPressed: ForgeSemanticFlag` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `size` | `ComponentTextSize` | Optional; no local initializer | `size: ForgeTextSize` | Same capability and value constraints; preserve source ownership and callback timing. |
| `tone` | `ComponentTextTone` | Optional; no local initializer | `tone: ForgeTextTone` | Same capability and value constraints; preserve source ownership and callback timing. |
| `weight` | `ComponentFontWeight` | Optional; no local initializer | `weight: ForgeFontWeight` | Same capability and value constraints; preserve source ownership and callback timing. |
| `currency` | `CurrencyCode` | Required; no local initializer | `currency: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `locale` | `Locale` | Required; no local initializer | `locale: ForgeLocale` | Same capability and value constraints; preserve source ownership and callback timing. |
| `currencyDisplay` | `CurrencyDisplay` | Optional; no local initializer | `currencyDisplay: ForgeCurrencyDisplay` | Same capability and value constraints; preserve source ownership and callback timing. |
| `useGrouping` | `boolean` | Optional; no local initializer | `useGrouping: bool` | Same capability and value constraints; preserve source ownership and callback timing. |

### Defaults and fixed forwarding

- Preserve `emptyLabel = "—"` observed in `web/library/src/design-system/components/atoms/CurrencyValue/CurrencyValue.tsx`.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/atoms/CurrencyValue.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/CurrencyValue/definition.ts): `basic`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Use token-backed passive Text formatting with exact decimal-string/null money and explicit currency/locale; no floating-point conversion or currency conversion.
- [ ] Preserve emptyLabel=em dash, zero/negative values, currencyDisplay=code default and explicit symbol/narrowSymbol/name/useGrouping.
- [ ] Resolve signs/separators/spacing through the locale adapter while preserving precision; null is not zero.
- [ ] No input/picker/icon or automatic profit/loss color is added; keep typography and semantic intent.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.
