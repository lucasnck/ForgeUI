---
title: "Flutter IconButton"
scope: "Named icon-only actions preserving Web visual and loading capabilities"
status: "PENDING"
type: "component"
ds-level: "molecules"
---

# Flutter IconButton

## Files

```text
components/forge_icon_button.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)

- [Web IconButton](../../../../ds/components/molecules/IconButton.sc.md)
- [Web Icon](../../../../ds/components/atoms/Icon.sc.md)
- [Flutter Button](../atoms/Button.sc.md)
- [Flutter capabilities](../../types/tech-component-capabilities.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeIconButton(
  icon: ForgeIconName.close,
  label: 'Close',
  onPressed: close,
  appearance: ForgeAppearance.ghost,
)
```

## Tests

- Reject blank label independent of tooltip; preserve one action name and decorative icon semantics.
- Verify required icon/label, nullable onPressed, md/brand/solid defaults, inherited shape, nullable appearance and loading/disabled false.
- Exercise shared visual values and Button precedence; square visible surface uses control height and zero icon-only content padding.
- Verify loading hides icon and shows spinner; nonblank loadingLabel replaces accessible name only, otherwise label remains, including whitespace-only loadingLabel.
- Verify icon name/geometry from the original registry and inherited foreground; no duplicate icon announcement.
- Verify Key/focus/autofocus/onFocusChange/tooltip; reject child/fullWidth absent from Web IconButton.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeIconButton({Key? key, required ForgeIconName icon, required String label, required void Function()? onPressed, ForgeSize size = ForgeSize.md, ForgeTone tone = ForgeTone.brand, ForgeAppearance? appearance, ForgeVariant? variant, ForgeShape? shape, bool loading = false, bool disabled = false, bool autofocus = false, String? loadingLabel, String? tooltip, FocusNode? focusNode, void Function(bool)? onFocusChange})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `icon` | `IconName` | Required; no local initializer | `icon: ForgeIconName` | Same capability and value constraints; preserve source ownership and callback timing. |
| `form` | `string` | Optional; no local initializer | `form: ForgeFormBinding` | Explicit native form association; no hidden HTML controls or ambient document lookup. |
| `title` | `string` | Optional; no local initializer | `tooltip: String` | Preserve visible component title; inherited native title maps to tooltip. |
| `autoFocus` | `boolean` | Optional; no local initializer | `autofocus: bool` | Native focus request, subordinate to modal/compound owner policy; no focus theft during updates. |
| `id` | `string` | Optional; no local initializer | `semanticId: String` | Stable owner-scoped semantic/test identity, not a DOM id. |
| `aria-describedby` | `string` | Optional; no local initializer | `descriptions: List<ForgeDescriptionBinding>` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-expanded` | `Booleanish` | Optional; no local initializer | `semanticExpanded: bool` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-invalid` | `boolean \| "false" \| "true" \| "grammar" \| "spelling"` | Optional; no local initializer | `semanticInvalid: ForgeInvalidState` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-label` | `string` | Optional; no local initializer | `semanticLabel: String` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-pressed` | `boolean \| "false" \| "mixed" \| "true"` | Optional; no local initializer | `semanticPressed: ForgeSemanticFlag` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `onFocus` | `FocusEventHandler<T>` | Optional; no local initializer | `onFocusChange: ValueChanged<bool>` | Native focus gain is true; preserve caller interception intent via the native focus/action binding. |
| `onBlur` | `FocusEventHandler<T>` | Optional; no local initializer | `onFocusChange: ValueChanged<bool>` | Native focus loss is false; retain blur/commit timing and no duplicate value callback. |
| `onClick` | `MouseEventHandler<T>` | Optional; no local initializer | `onPressed: VoidCallback` | Native action callback, never a DOM MouseEvent; preserve one activation and consumer interception/cancellation through the native action binding. |
| `name` | `string` | Optional; no local initializer | `name: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `type` | `"submit" \| "reset" \| "button"` | Optional; no local initializer | `onPressed: VoidCallback` | The caller explicitly invokes submit/reset through its native form binding in onPressed; no automatic HTML type behavior or extra formIntent parameter is added to Button. |
| `value` | `string \| readonly string[] \| number` | Optional; no local initializer | `value: String` | Native form submission value; preserve source scalar string serialization, distinct from checked/pressed/action state. |
| `disabled` | `boolean` | Optional; no local initializer | `disabled: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `label` | `string` | Required; no local initializer | `label: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `size` | `ComponentSize` | Optional; `"md"` | `size: ForgeSize` | Same capability and value constraints; preserve source ownership and callback timing. |
| `tone` | `ComponentTone` | Optional; `"brand"` | `tone: ForgeTone` | Same capability and value constraints; preserve source ownership and callback timing. |
| `appearance` | `ComponentAppearance` | Optional; no local initializer | `appearance: ForgeAppearance` | Same capability and value constraints; preserve source ownership and callback timing. |
| `shape` | `ComponentShape` | Optional; no local initializer | `shape: ForgeShape` | Same capability and value constraints; preserve source ownership and callback timing. |
| `loading` | `boolean` | Optional; `false` | `loading: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `loadingLabel` | `string` | Optional; no local initializer | `loadingLabel: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `variant` | `ComponentVariant` | Optional; `"solid"` | `variant: ForgeVariant` | Same capability and value constraints; preserve source ownership and callback timing. |

### Defaults and fixed forwarding

- Preserve `loading = false` observed in `web/library/src/design-system/components/molecules/IconButton/IconButton.tsx`.
- Preserve `size = "md"` observed in `web/library/src/design-system/components/molecules/IconButton/IconButton.tsx`.
- Preserve `tone = "brand"` observed in `web/library/src/design-system/components/molecules/IconButton/IconButton.tsx`.
- Preserve `variant = "solid"` observed in `web/library/src/design-system/components/molecules/IconButton/IconButton.tsx`.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/molecules/IconButton.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/IconButton/definition.ts): `basic`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Preserve icon, label, all visual capabilities, loading/loadingLabel, disabled and native actions/focus.
- [ ] Specify and provide typed icon-name/geometry adaptation from the existing registry before accepting parity; no Material glyph substitution.
- [ ] Disable activation for disabled/loading/null callback.
- [ ] Preserve Button content-replacement versus IconButton accessible-name-replacement distinction.
- [ ] Preserve caller-selected hierarchy and token-sized surface with native hit-area accommodation.
