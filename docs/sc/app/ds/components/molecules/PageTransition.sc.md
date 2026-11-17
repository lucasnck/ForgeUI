---
title: "Flutter PageTransition"
scope: "Native app contract preserving the Web PageTransition capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "molecules"
---

# Flutter PageTransition

## Files

```text
components/forge_page_transition.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web PageTransition](../../../../ds/components/molecules/PageTransition.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgePageTransition(
  child: content,
)
```

## Tests

### Native behavior

- Replace React ViewTransition with the app's scoped transition boundary/coordinator. Keep routing, readiness, focus and scroll restoration caller-owned.
- Identify source/destination by screen keys; keep screen content usable on direct entry and without animation.
- Latest navigation wins; interruptions clean up retained content and old semantic/focus participants without deferring committed state.
- Verify one targeted native route transition with source/destination, intent, readiness/loading and scroll policy; test reduced-motion/direct-entry fallbacks separately.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgePageTransition({Key? key, required Widget child, bool animated = true, Object? screenKey, ForgePageTransitionIntent? intent})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | Required; no local initializer | `child: Widget?` | Compose caller Widgets; keep passive/action semantics and null-content behavior from source. |
| `autoFocus` | `boolean` | Optional; no local initializer | `autofocus: bool` | Native focus request, subordinate to modal/compound owner policy; no focus theft during updates. |
| `id` | `string` | Optional; no local initializer | `semanticId: String` | Stable owner-scoped semantic/test identity, not a DOM id. |
| `title` | `string` | Optional; no local initializer | `tooltip: String` | Preserve visible component title; inherited native title maps to tooltip. |
| `aria-describedby` | `string` | Optional; no local initializer | `descriptions: List<ForgeDescriptionBinding>` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-expanded` | `Booleanish` | Optional; no local initializer | `semanticExpanded: bool` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-invalid` | `boolean \| "false" \| "true" \| "grammar" \| "spelling"` | Optional; no local initializer | `semanticInvalid: ForgeInvalidState` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-label` | `string` | Optional; no local initializer | `semanticLabel: String` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-pressed` | `boolean \| "false" \| "mixed" \| "true"` | Optional; no local initializer | `semanticPressed: ForgeSemanticFlag` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `animated` | `boolean` | Optional; `true` | `animated: bool` | Same capability and value constraints; preserve source ownership and callback timing. |

### Defaults and fixed forwarding

- Preserve `animated = true` observed in `web/library/src/design-system/components/molecules/PageTransition/PageTransition.tsx`.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/molecules/PageTransition.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/PageTransition/definition.ts): `basic`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Replace React ViewTransition with the app's scoped transition boundary/coordinator. Keep routing, readiness, focus and scroll restoration caller-owned.
- [ ] Identify source/destination by screen keys; keep screen content usable on direct entry and without animation.
- [ ] Latest navigation wins; interruptions clean up retained content and old semantic/focus participants without deferring committed state.
- [ ] Verify one targeted native route transition with source/destination, intent, readiness/loading and scroll policy; test reduced-motion/direct-entry fallbacks separately.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.
