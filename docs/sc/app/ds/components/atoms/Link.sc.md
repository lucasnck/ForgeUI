---
title: "Flutter Link"
scope: "Native app contract preserving the Web Link capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "atoms"
---

# Flutter Link

## Files

```text
components/forge_link.dart (M)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web Link](../../../../ds/components/atoms/Link.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeLink(
  child: content,
)
```

## Tests

### Native behavior

- Use native link semantics with exact href passed to an injected navigation/URL-launch adapter; never interpret every href as an internal route.
- Preserve target/rel/download intent where meaningful and explicitly classify browser tab/referrer mechanics as Web-only.
- Keep keyboard focus ring, link accessible name and caller cancellation; no automatic navigation at build time.
- Reject unsupported launch/download capabilities explicitly rather than silently changing destination or claiming browser behavior on device.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeLink({Key? key, String? href, Widget child = const SizedBox.shrink(), void Function()? onActivate, void Function(ForgeLaunchRequest)? launcher, String? target, String? rel, String? download, String? hrefLang, String? semanticLabel, FocusNode? focusNode})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `download` | `any` | Optional; no local initializer | `download: ForgeDownloadIntent` | Preserve destination/launch/download/language intent via injected navigation adapter; tab/referrer mechanics are explicitly Web-only. |
| `href` | `string` | Optional; no local initializer | `href: String` | Preserve destination/launch/download/language intent via injected navigation adapter; tab/referrer mechanics are explicitly Web-only. |
| `hrefLang` | `string` | Optional; no local initializer | `hrefLang: String` | Preserve destination/launch/download/language intent via injected navigation adapter; tab/referrer mechanics are explicitly Web-only. |
| `target` | `HTMLAttributeAnchorTarget` | Optional; no local initializer | `target: ForgeLaunchTarget` | Preserve destination/launch/download/language intent via injected navigation adapter; tab/referrer mechanics are explicitly Web-only. |
| `autoFocus` | `boolean` | Optional; no local initializer | `autofocus: bool` | Native focus request, subordinate to modal/compound owner policy; no focus theft during updates. |
| `id` | `string` | Optional; no local initializer | `semanticId: String` | Stable owner-scoped semantic/test identity, not a DOM id. |
| `title` | `string` | Optional; no local initializer | `tooltip: String` | Preserve visible component title; inherited native title maps to tooltip. |
| `rel` | `string` | Optional; no local initializer | `rel: String` | Preserve destination/launch/download/language intent via injected navigation adapter; tab/referrer mechanics are explicitly Web-only. |
| `aria-describedby` | `string` | Optional; no local initializer | `descriptions: List<ForgeDescriptionBinding>` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-expanded` | `Booleanish` | Optional; no local initializer | `semanticExpanded: bool` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-invalid` | `boolean \| "false" \| "true" \| "grammar" \| "spelling"` | Optional; no local initializer | `semanticInvalid: ForgeInvalidState` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-label` | `string` | Optional; no local initializer | `semanticLabel: String` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-pressed` | `boolean \| "false" \| "mixed" \| "true"` | Optional; no local initializer | `semanticPressed: ForgeSemanticFlag` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `children` | `ReactNode` | Optional; no local initializer | `child: Widget?` | Compose caller Widgets; keep passive/action semantics and null-content behavior from source. |
| `onFocus` | `FocusEventHandler<T>` | Optional; no local initializer | `onFocusChange: ValueChanged<bool>` | Native focus gain is true; preserve caller interception intent via the native focus/action binding. |
| `onBlur` | `FocusEventHandler<T>` | Optional; no local initializer | `onFocusChange: ValueChanged<bool>` | Native focus loss is false; retain blur/commit timing and no duplicate value callback. |
| `onClick` | `MouseEventHandler<T>` | Optional; no local initializer | `onActivate: VoidCallback` | Native action callback, never a DOM MouseEvent; preserve one activation and consumer interception/cancellation through the native action binding. |

### Defaults and fixed forwarding

- No public-property initializer is owned locally; preserve inherited defaults from the shared baseline/delegated component rather than choosing a new native default.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/atoms/Link.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/Link/definition.ts): `basic`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

### Native independence implementation (2026-11-18)

- **Owner:** `ForgeLink` only. No Material or Cupertino rendering imports; use Flutter SDK widgets, gestures, actions, focus, semantics and the existing Forge tokens.
- **Compatibility:** preserve all existing constructor fields and the public `forge_ui.dart` export. Maintain the consumer-owned adapters; never navigate or assume permission without explicit activation.
- **Verification:** source-boundary gate and targeted widget tests in `WidgetsApp` + `ForgeThemeScope`; retain `PENDING` until Flutter analyze, tests, keyboard, screen-reader and visual acceptance have actual recorded evidence.

- **Link checks:** one activation per pointer, keyboard Enter/Space or semantic tap; exact href, target, rel, download and hrefLang forwarding; focus indicator from Forge tokens, no default navigation or Material splash.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Use native link semantics with exact href passed to an injected navigation/URL-launch adapter; never interpret every href as an internal route.
- [ ] Preserve target/rel/download intent where meaningful and explicitly classify browser tab/referrer mechanics as Web-only.
- [ ] Keep keyboard focus ring, link accessible name and caller cancellation; no automatic navigation at build time.
- [ ] Reject unsupported launch/download capabilities explicitly rather than silently changing destination or claiming browser behavior on device.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.
