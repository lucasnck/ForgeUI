---
title: "Flutter Tooltip"
scope: "Native app contract preserving the Web Tooltip capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "molecules"
---

# Flutter Tooltip

## Files

```text
components/forge_tooltip.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web Tooltip](../../../../ds/components/molecules/Tooltip.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeTooltip(
  content: content,
  triggerBuilder: triggerBuilder,
)
```

## Tests

### Native behavior

- Use native pointer-hover, keyboard-focus and long-press discovery for the same descriptive content; native long press adds touch discoverability, not action activation.
- Preserve content, one trigger child and open/defaultOpen=false/onOpenChange/animated=true.
- Associate description without replacing the trigger name or creating an interactive dialog; hide on dismissal/blur according to owner rules.
- Dispose timers/overlay on teardown and avoid duplicate announcements or accidental trigger activation during long press.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeTooltip({Key? key, required String content, required Widget child, bool? open, bool defaultOpen = false, bool animated = true, void Function(bool)? onOpenChange})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `content` | `string` | Required; no local initializer | `content: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `children` | `ReactElement<TooltipTriggerProps>` | Required; no local initializer | `triggerBuilder: ForgeTriggerBuilder` | Pass explicit native focus/action/semantic bindings to the single supplied control instead of cloning a React element; preserve its existing behavior. |
| `open` | `boolean` | Optional; no local initializer | `open: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `defaultOpen` | `boolean` | Optional; `false` | `defaultOpen: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `onOpenChange` | `((open: boolean) => void)` | Optional; no local initializer | `onOpenChange: void Function(bool)` | Same capability and value constraints; preserve source ownership and callback timing. |
| `animated` | `boolean` | Optional; `true` | `animated: bool` | Same capability and value constraints; preserve source ownership and callback timing. |

### Defaults and fixed forwarding

- Preserve `defaultOpen = false` observed in `web/library/src/design-system/components/molecules/Tooltip/useTooltip.ts`.
- Preserve `animated = true` observed in `web/library/src/design-system/components/molecules/Tooltip/useTooltip.ts`.
- Source forwards `role="tooltip"` to a rendered control. Preserve that control intent and the source spread/override precedence; it is not automatically a new public app parameter.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/molecules/Tooltip.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/Tooltip/definition.ts): `basic`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

### Native Flutter implementation (2026-11-18)

- Preserve the existing public `ForgeTooltip` widget contract and all shared tokens, semantics, focus/gesture behavior and user-owned resources.
- Use only `package:flutter/widgets.dart` and Forge-owned compositions; no Material/Cupertino import or Material rendering layer.
- `ForgeIcon` may inherit `IconTheme` as a native Flutter widget setting but uses Forge token fallback and its own SVG-like canvas geometry; `ForgeIconButton` delegates to the Forge-owned `ForgeAction` (legacy action backend migration remains a separate pending step); `ForgeTooltip` composes `ForgeSurface` directly, preserving its anchor, hover, focus, escape and semantics behavior.
- Native-source assertion is necessary but not sufficient: run `flutter analyze`, widget tests and visual/a11y inspection before marking this component `DONE`.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Use native pointer-hover, keyboard-focus and long-press discovery for the same descriptive content; native long press adds touch discoverability, not action activation.
- [ ] Preserve content, one trigger child and open/defaultOpen=false/onOpenChange/animated=true.
- [ ] Associate description without replacing the trigger name or creating an interactive dialog; hide on dismissal/blur according to owner rules.
- [ ] Dispose timers/overlay on teardown and avoid duplicate announcements or accidental trigger activation during long press.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.

## Showcase verification checkpoint — 2026-11-17

The native showcase now exercises this API in its canonical composition. The [group validation report](../../../../../migration/FLUTTER-REMAINING-PREVIEWS-WAVE-8.md) records widget/snippet tests, compilation evidence and limits. This records preview coverage; it does not establish full Web parity or Android/iOS visual and assistive acceptance. Unverified Criteria remain PENDING.
