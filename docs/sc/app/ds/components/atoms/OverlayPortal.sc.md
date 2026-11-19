---
title: "Flutter OverlayPortal"
scope: "Native app contract preserving the Web OverlayPortal capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "atoms"
---

# Flutter OverlayPortal

## Files

```text
components/forge_overlay_portal.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web OverlayPortal](../../../../ds/components/atoms/OverlayPortal.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeOverlayPortal(
  children: parts,
)
```

## Tests

### Native behavior

- Replace document-body portal with an explicitly scoped Flutter Overlay host while preserving the nearest ownership and accessibility context.
- Render caller content in the correct overlay layer; no document access or global application singleton.
- Remove entries/listeners on disposal and preserve focus, semantics, inherited theme and nested overlay order.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeOverlayPortal({Key? key, required List<Widget> children, Widget anchor = const SizedBox.shrink()})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | Required; no local initializer | `children: List<Widget>` | Preserve permitted canonical parts, child order and identity; no arbitrary descendant cloning. |

### Defaults and fixed forwarding

- No public-property initializer is owned locally; preserve inherited defaults from the shared baseline/delegated component rather than choosing a new native default.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/atoms/OverlayPortal.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/OverlayPortal/definition.ts): `basic`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Replace document-body portal with an explicitly scoped Flutter Overlay host while preserving the nearest ownership and accessibility context.
- [ ] Render caller content in the correct overlay layer; no document access or global application singleton.
- [ ] Remove entries/listeners on disposal and preserve focus, semantics, inherited theme and nested overlay order.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.

## Showcase verification checkpoint — 2026-11-17

The native showcase now exercises this API in its canonical composition. The [group validation report](../../../../../migration/FLUTTER-REMAINING-PREVIEWS-WAVE-8.md) records widget/snippet tests, compilation evidence and limits. This records preview coverage; it does not establish full Web parity or Android/iOS visual and assistive acceptance. Unverified Criteria remain PENDING.
