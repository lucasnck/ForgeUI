---
title: "Flutter Progress"
scope: "Native app contract preserving the Web Progress capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "atoms"
---

# Flutter Progress

## Files

```text
components/forge_progress.dart (M)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web Progress](../../../../ds/components/atoms/Progress.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)
- [App VisuallyHidden](VisuallyHidden.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeProgress(
  label: label,
)
```

## Tests

### Native behavior

- Use native progress semantics backed by actual normalized values, with a distinct indeterminate state and no simulated work.
- Preserve optional value/max and required label, md/brand/fullWidth=true/animated=true.
- Zero is determinate; absent value is indeterminate. Normalize under/over-range/nonfinite inputs exactly as source and avoid invented percentages.
- ProgressBar additionally preserves localized valueText; visual caption and semantic value agree without a second live announcement.
- Values update immediately, without smoothing timers or completion-event dependence; reduced motion retains meaningful feedback.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeProgress({Key? key, double? value, double? max, required String label, String? valueText, ForgeSize size = ForgeSize.md, ForgeTone tone = ForgeTone.brand, bool fullWidth = true, bool animated = true})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `title` | `string` | Optional; no local initializer | `tooltip: String` | Preserve visible component title; inherited native title maps to tooltip. |
| `autoFocus` | `boolean` | Optional; no local initializer | `autofocus: bool` | Native focus request, subordinate to modal/compound owner policy; no focus theft during updates. |
| `id` | `string` | Optional; no local initializer | `semanticId: String` | Stable owner-scoped semantic/test identity, not a DOM id. |
| `aria-describedby` | `string` | Optional; no local initializer | `descriptions: List<ForgeDescriptionBinding>` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-expanded` | `Booleanish` | Optional; no local initializer | `semanticExpanded: bool` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-invalid` | `boolean \| "false" \| "true" \| "grammar" \| "spelling"` | Optional; no local initializer | `semanticInvalid: ForgeInvalidState` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-label` | `string` | Optional; no local initializer | `semanticLabel: String` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-pressed` | `boolean \| "false" \| "mixed" \| "true"` | Optional; no local initializer | `semanticPressed: ForgeSemanticFlag` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `value` | `number` | Optional; no local initializer | `value: num` | Same capability and value constraints; preserve source ownership and callback timing. |
| `max` | `number` | Optional; no local initializer | `max: num` | Same capability and value constraints; preserve source ownership and callback timing. |
| `label` | `string` | Required; no local initializer | `label: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `size` | `ComponentSize` | Optional; `"md"` | `size: ForgeSize` | Same capability and value constraints; preserve source ownership and callback timing. |
| `tone` | `ComponentTone` | Optional; `"brand"` | `tone: ForgeTone` | Same capability and value constraints; preserve source ownership and callback timing. |
| `fullWidth` | `boolean` | Optional; `true` | `fullWidth: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `animated` | `boolean` | Optional; `true` | `animated: bool` | Same capability and value constraints; preserve source ownership and callback timing. |

### Defaults and fixed forwarding

- Preserve `size = "md"` observed in `web/library/src/design-system/components/atoms/Progress/Progress.tsx`.
- Preserve `tone = "brand"` observed in `web/library/src/design-system/components/atoms/Progress/Progress.tsx`.
- Preserve `fullWidth = true` observed in `web/library/src/design-system/components/atoms/Progress/Progress.tsx`.
- Preserve `animated = true` observed in `web/library/src/design-system/components/atoms/Progress/Progress.tsx`.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/atoms/Progress.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/Progress/definition.ts): `basic`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

### Native independence implementation (2026-11-18)

- **Owner:** `ForgeProgress` only. No Material or Cupertino rendering imports; use Flutter SDK widgets, gestures, actions, focus, semantics and the existing Forge tokens.
- **Compatibility:** preserve all existing constructor fields and the public `forge_ui.dart` export. Maintain the consumer-owned adapters; never navigate or assume permission without explicit activation.
- **Verification:** source-boundary gate and targeted widget tests in `WidgetsApp` + `ForgeThemeScope`; retain `PENDING` until Flutter analyze, tests, keyboard, screen-reader and visual acceptance have actual recorded evidence.

- **Progress checks:** determinate zero and bounds, explicit indeterminate state, values/semantics consistency, token-backed fill and track, reduced-motion mode, reuse by ForgeMeter and ForgeProgressBar, and no Material LinearProgressIndicator.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Use native progress semantics backed by actual normalized values, with a distinct indeterminate state and no simulated work.
- [ ] Preserve optional value/max and required label, md/brand/fullWidth=true/animated=true.
- [ ] Zero is determinate; absent value is indeterminate. Normalize under/over-range/nonfinite inputs exactly as source and avoid invented percentages.
- [ ] ProgressBar additionally preserves localized valueText; visual caption and semantic value agree without a second live announcement.
- [ ] Values update immediately, without smoothing timers or completion-event dependence; reduced motion retains meaningful feedback.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.
