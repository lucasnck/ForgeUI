---
title: "Flutter PopupListbox"
scope: "Native app contract preserving the Web PopupListbox capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "molecules"
---

# Flutter PopupListbox

## Files

```text
components/forge_popup_listbox.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web PopupListbox](../../../../ds/components/molecules/PopupListbox.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)
- [App PopupListboxItem](../atoms/PopupListboxItem.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgePopupListbox(
  popup: popup,
  items: items,
  getOptionLabel: getOptionLabel,
)
```

## Tests

### Native behavior

- Use a native popup selection surface driven entirely by the supplied popup contract; keep anchor focus in the editor and expose active-option semantics.
- Closed or empty items render nothing; open populated lists preserve caller order and exactly one selection-list owner.
- Preserve popup/items/getOptionLabel/getOptionKey/listboxLabel/animated=true/animationEffect=scale; stable option ids map to native semantic identities.
- Active index determines the single active option; scrolling/repositioning does not steal editor focus or create a second query/open state.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgePopupListbox<T>({Key? key, required ForgePopupListboxController popup, required List<T> items, required String Function(T) getOptionLabel, String Function(T, int)? getOptionKey, required String listboxLabel, bool animated = true, ForgeAnimationEffect animationEffect = ForgeAnimationEffect.scale})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `popup` | `PopupListboxContract` | Required; no local initializer | `popup: ForgePopupListboxContract` | Same capability and value constraints; preserve source ownership and callback timing. |
| `items` | `readonly Item[]` | Required; no local initializer | `items: List<Item>` | Same capability and value constraints; preserve source ownership and callback timing. |
| `getOptionLabel` | `(item: Item) => string` | Required; no local initializer | `getOptionLabel: String Function(Item)` | Same capability and value constraints; preserve source ownership and callback timing. |
| `getOptionKey` | `((item: Item, index: number) => string)` | Optional; no local initializer | `getOptionKey: String Function(Item, num)` | Same capability and value constraints; preserve source ownership and callback timing. |
| `listboxLabel` | `string` | Optional; no local initializer | `listboxLabel: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `animationEffect` | `AnimationEffect` | Optional; `"scale"` | `animationEffect: ForgeAnimationEffect` | Same capability and value constraints; preserve source ownership and callback timing. |
| `animated` | `boolean` | Optional; `true` | `animated: bool` | Same capability and value constraints; preserve source ownership and callback timing. |

### Defaults and fixed forwarding

- Preserve `animated = true` observed in `web/library/src/design-system/components/molecules/PopupListbox/usePopupListboxView.ts`.
- Preserve `animationEffect = "scale"` observed in `web/library/src/design-system/components/molecules/PopupListbox/usePopupListboxView.ts`.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/molecules/PopupListbox.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/PopupListbox/definition.ts): `basic`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

### Native Flutter rendering (2026-11-18)

- `ForgePopupListbox` owns only its existing component behavior and uses `package:flutter/widgets.dart`, ForgeUI surfaces and semantic tokens without importing Material or Cupertino.
- Preserve current public constructor, controlled/uncontrolled state, action callbacks, focus management and accessibility semantics. Visual highlighting, panel labels and input suggestion ownership remain component-specific.
- Source-only acceptance is insufficient: Flutter compile/widget tests, platform accessibility and Web × Flutter screenshot comparison must pass before `DONE`.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Use a native popup selection surface driven entirely by the supplied popup contract; keep anchor focus in the editor and expose active-option semantics.
- [ ] Closed or empty items render nothing; open populated lists preserve caller order and exactly one selection-list owner.
- [ ] Preserve popup/items/getOptionLabel/getOptionKey/listboxLabel/animated=true/animationEffect=scale; stable option ids map to native semantic identities.
- [ ] Active index determines the single active option; scrolling/repositioning does not steal editor focus or create a second query/open state.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.

## Showcase verification checkpoint — 2026-11-17

The native showcase now exercises this API in its canonical composition. The [group validation report](../../../../../migration/FLUTTER-COLLECTIONS-WAVE-7.md) records widget/snippet tests, compilation evidence and limits. This records preview coverage; it does not establish full Web parity or Android/iOS visual and assistive acceptance. Unverified Criteria remain PENDING.
