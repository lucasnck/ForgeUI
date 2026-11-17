---
title: "Flutter Button"
scope: "Full Web Button capability parity through native app actions and accessibility"
status: "PENDING"
type: "component"
ds-level: "atoms"
---

# Flutter Button

## Files

```text
components/forge_button.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Native action style resolution](../../helpers/tech-action-style.sc.md)

- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)

- [Shared Button](../../../../ds/components/atoms/Button.sc.md)
- [Flutter capabilities](../../types/tech-component-capabilities.sc.md)
- [Flutter Spinner](Spinner.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)

## Contract

```dart
import 'package:flutter/widgets.dart';
import 'package:forge_ui/forge_ui.dart';

ForgeButton(
  onPressed: save,
  child: const Text('Save'),
  size: ForgeSize.md,
  tone: ForgeTone.brand,
  appearance: ForgeAppearance.solid,
)
```

## Tests

- Cover every row of the app parity guide's Button mapping against actual Web source; no shared feature is omitted.
- Verify md/brand/inherited shape/solid defaults, loading/disabled/fullWidth false and optional child with explicit accessible naming.
- Exercise all visual values through shared mappings. Explicit appearance beats variant; explicit variant beats legacy outlined. outline maps to outlined.
- Preserve outlined-only callers; explicit variant solid overrides outlined=true.
- Verify disabled || loading || onPressed == null suppresses activation immediately; callbacks, focus and state never wait for animation.
- Verify one callback per pointer/supported keyboard activation, native traversal and non-disposal of caller FocusNode.
- Verify loading uses a decorative xs spinner and a single busy/loading semantic state; retain child unless loadingLabel is nonempty. Empty keeps child; whitespace follows Web Button truthiness.
- Verify semanticLabel overrides inferred child name without duplication; tooltip does not erase name.
- Verify finite-parent fullWidth, finite content-size under unbounded constraints, scaled text, directional padding and composed icon/text content.
- Verify theme-inherited shape updates and interrupted state changes; caller-owned submit/reset actions never trigger implicit validation/navigation/networking.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeButton({Key? key, void Function()? onPressed, Widget? child, ForgeSize size = ForgeSize.md, ForgeTone tone = ForgeTone.brand, ForgeAppearance? appearance, ForgeVariant? variant, ForgeShape? shape, bool fullWidth = false, bool disabled = false, bool loading = false, String? loadingLabel, String? semanticLabel, String? tooltip, FocusNode? focusNode, bool autofocus = false, void Function(bool)? onFocusChange, bool? outlined, ForgeButtonType type = ForgeButtonType.button, String? name, String? value})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `disabled` | `boolean` | Optional; no local initializer | `disabled: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `form` | `string` | Optional; no local initializer | `form: ForgeFormBinding` | Explicit native form association; no hidden HTML controls or ambient document lookup. |
| `name` | `string` | Optional; no local initializer | `name: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `type` | `"submit" \| "reset" \| "button"` | Optional; `"button"` | `onPressed: VoidCallback` | The caller explicitly invokes submit/reset through its native form binding in onPressed; no automatic HTML type behavior or extra formIntent parameter is added to Button. |
| `value` | `string \| readonly string[] \| number` | Optional; no local initializer | `value: String` | Native form submission value; preserve source scalar string serialization, distinct from checked/pressed/action state. |
| `autoFocus` | `boolean` | Optional; no local initializer | `autofocus: bool` | Native focus request, subordinate to modal/compound owner policy; no focus theft during updates. |
| `id` | `string` | Optional; no local initializer | `semanticId: String` | Stable owner-scoped semantic/test identity, not a DOM id. |
| `title` | `string` | Optional; no local initializer | `tooltip: String` | Preserve visible component title; inherited native title maps to tooltip. |
| `aria-describedby` | `string` | Optional; no local initializer | `descriptions: List<ForgeDescriptionBinding>` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-expanded` | `Booleanish` | Optional; no local initializer | `semanticExpanded: bool` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-invalid` | `boolean \| "false" \| "true" \| "grammar" \| "spelling"` | Optional; no local initializer | `semanticInvalid: ForgeInvalidState` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-label` | `string` | Optional; no local initializer | `semanticLabel: String` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-pressed` | `boolean \| "false" \| "mixed" \| "true"` | Optional; no local initializer | `semanticPressed: ForgeSemanticFlag` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `children` | `ReactNode` | Optional; no local initializer | `child: Widget?` | Compose caller Widgets; keep passive/action semantics and null-content behavior from source. |
| `onFocus` | `FocusEventHandler<T>` | Optional; no local initializer | `onFocusChange: ValueChanged<bool>` | Native focus gain is true; preserve caller interception intent via the native focus/action binding. |
| `onBlur` | `FocusEventHandler<T>` | Optional; no local initializer | `onFocusChange: ValueChanged<bool>` | Native focus loss is false; retain blur/commit timing and no duplicate value callback. |
| `onClick` | `MouseEventHandler<T>` | Optional; no local initializer | `onPressed: VoidCallback` | Native action callback, never a DOM MouseEvent; preserve one activation and consumer interception/cancellation through the native action binding. |
| `size` | `ComponentSize` | Optional; `"md"` | `size: ForgeSize` | Same capability and value constraints; preserve source ownership and callback timing. |
| `tone` | `ComponentTone` | Optional; `"brand"` | `tone: ForgeTone` | Same capability and value constraints; preserve source ownership and callback timing. |
| `appearance` | `ComponentAppearance` | Optional; no local initializer | `appearance: ForgeAppearance` | Same capability and value constraints; preserve source ownership and callback timing. |
| `shape` | `ComponentShape` | Optional; no local initializer | `shape: ForgeShape` | Same capability and value constraints; preserve source ownership and callback timing. |
| `fullWidth` | `boolean` | Optional; `false` | `fullWidth: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `loading` | `boolean` | Optional; `false` | `loading: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `loadingLabel` | `string` | Optional; no local initializer | `loadingLabel: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `variant` | `ComponentVariant` | Optional; `"solid"` | `variant: ForgeVariant` | Same capability and value constraints; preserve source ownership and callback timing. |

### Defaults and fixed forwarding

- Preserve `fullWidth = false` observed in `web/library/src/design-system/components/atoms/Button/Button.tsx`.
- Preserve `loading = false` observed in `web/library/src/design-system/components/atoms/Button/Button.tsx`.
- Preserve `size = "md"` observed in `web/library/src/design-system/components/atoms/Button/Button.tsx`.
- Preserve `tone = "brand"` observed in `web/library/src/design-system/components/atoms/Button/Button.tsx`.
- Preserve `type = "button"` observed in `web/library/src/design-system/components/atoms/Button/Button.tsx`.
- Preserve `variant = "solid"` observed in `web/library/src/design-system/components/atoms/Button/Button.tsx`.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/atoms/Button.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/Button/definition.ts): `basic`, `crud-hierarchy`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [x] Add size, tone, appearance, shape, variant, fullWidth, disabled and loadingLabel alongside current child/onPressed/loading.
- [x] Preserve optional composition, Key, FocusNode, autofocus, onFocusChange, semanticLabel and tooltip as mapped.
- [x] Preserve every Web enum/default and state precedence using shared app capabilities.
- [x] Keep outlined only as a deprecated compatibility bridge after explicit appearance and variant.
- [x] Match Web recipes with generated tokens; Material defaults are not the visual contract.
- [ ] Preserve focus visibility, supported keyboard actions, busy feedback and native touch usability.
- [x] Preserve basic/crud-hierarchy scenarios through the showcase parity resource.
- [ ] Record representative runtime visual evidence before claiming parity; native acceptance remains pending until observed.
