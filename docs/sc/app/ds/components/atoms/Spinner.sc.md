---
title: "Flutter Spinner"
scope: "Native decorative and named loading feedback matching Web Spinner"
status: "PENDING"
type: "component"
ds-level: "atoms"
---

# Flutter Spinner

## Files

```text
components/forge_spinner.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Native action style resolution](../../helpers/tech-action-style.sc.md)

- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)

- [Web Spinner](../../../../ds/components/atoms/Spinner.sc.md)
- [Flutter capabilities](../../types/tech-component-capabilities.sc.md)
- [Loading indicators](../../../../ds/styles/tech-loading-indicators.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeSpinner(size: ForgeSize.md, decorative: false, label: 'Loading')
```

## Tests

- Verify size=md, tone=null/inherited foreground, animated=true, decorative=true and support for all shared sizes/tones.
- Reject missing/empty/whitespace label for nondecorative status including release behavior; decorative use needs none.
- Verify decorative semantics exclusion, one named status otherwise, no focus stop and no invented progress percentage.
- Verify animated=false/reduced motion stop rotation but retain feedback; animation work is cancelled/disposed on removal.
- Verify Button's xs spinner remains decorative with or without loadingLabel.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeSpinner({Key? key, ForgeSize size = ForgeSize.md, ForgeTone? tone, bool animated = true, bool decorative = true, String? label})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `decorative` | `boolean` | Optional; `true` | `decorative: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `label` | `string` | Optional; no local initializer | `label: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `autoFocus` | `boolean` | Optional; no local initializer | `autofocus: bool` | Native focus request, subordinate to modal/compound owner policy; no focus theft during updates. |
| `id` | `string` | Optional; no local initializer | `semanticId: String` | Stable owner-scoped semantic/test identity, not a DOM id. |
| `title` | `string` | Optional; no local initializer | `tooltip: String` | Preserve visible component title; inherited native title maps to tooltip. |
| `aria-describedby` | `string` | Optional; no local initializer | `descriptions: List<ForgeDescriptionBinding>` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-expanded` | `Booleanish` | Optional; no local initializer | `semanticExpanded: bool` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-invalid` | `boolean \| "false" \| "true" \| "grammar" \| "spelling"` | Optional; no local initializer | `semanticInvalid: ForgeInvalidState` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-label` | `string` | Optional; no local initializer | `semanticLabel: String` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-pressed` | `boolean \| "false" \| "mixed" \| "true"` | Optional; no local initializer | `semanticPressed: ForgeSemanticFlag` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `children` | `ReactNode` | Optional; no local initializer | `child: Widget?` | Compose caller Widgets; keep passive/action semantics and null-content behavior from source. |
| `size` | `ComponentSize` | Optional; `"md"` | `size: ForgeSize` | Same capability and value constraints; preserve source ownership and callback timing. |
| `tone` | `ComponentTone` | Optional; no local initializer | `tone: ForgeTone` | Same capability and value constraints; preserve source ownership and callback timing. |
| `animated` | `boolean` | Optional; `true` | `animated: bool` | Same capability and value constraints; preserve source ownership and callback timing. |

### Defaults and fixed forwarding

- Preserve `decorative = true` observed in `web/library/src/design-system/components/atoms/Spinner/Spinner.tsx`.
- Preserve `size = "md"` observed in `web/library/src/design-system/components/atoms/Spinner/Spinner.tsx`.
- Preserve `animated = true` observed in `web/library/src/design-system/components/atoms/Spinner/Spinner.tsx`.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/atoms/Spinner.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/Spinner/definition.ts): `basic`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [x] Expose size, tone, animated, decorative and label with Web-equivalent defaults/constraints.
- [x] Consume canonical geometry/size/stroke/duration mappings and inherited foreground.
- [x] Expose native status semantics without duplicate announcements or focus theft.
- [x] Preserve static feedback for motion opt-out/reduced motion.
- [x] Do not infer completion or mutate caller state.

- [ ] Complete applicable inherited native-property mappings and targeted visual/native status acceptance before claiming full parity. The current SDK uses a named live region; its loadingSpinner role asserts in debug and is not used.
