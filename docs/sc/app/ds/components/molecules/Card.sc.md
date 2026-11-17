---
title: "Flutter Card"
scope: "Native app contract preserving the Web Card capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "molecules"
---

# Flutter Card

## Files

```text
components/forge_sections.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web Card](../../../../ds/components/molecules/Card.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)
- [App CardHeader](../atoms/CardHeader.sc.md)
- [App CardBody](../atoms/CardBody.sc.md)
- [App CardFooter](../atoms/CardFooter.sc.md)
- [App Surface](../atoms/Surface.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeCard(
  children: parts,
)
```

## Tests

### Native behavior

- Use passive native card composition with required Body/optional Header/Footer and independent child actions.
- Preserve elevation=raised/fullWidth=true/inherited shape and token-backed background/border/shadow.
- Nested actions retain individual keyboard/touch behavior; the card itself does not become clickable or a page landmark.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeCard({Key? key, required List<Widget> children, String? semanticLabel, ForgeElevation elevation = ForgeElevation.raised, ForgeShape? shape, bool fullWidth = true})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `elevation` | `ComponentElevation` | Optional; `"raised"` | `elevation: ForgeElevation` | Same capability and value constraints; preserve source ownership and callback timing. |
| `title` | `string` | Optional; no local initializer | `tooltip: String` | Preserve visible component title; inherited native title maps to tooltip. |
| `autoFocus` | `boolean` | Optional; no local initializer | `autofocus: bool` | Native focus request, subordinate to modal/compound owner policy; no focus theft during updates. |
| `id` | `string` | Optional; no local initializer | `semanticId: String` | Stable owner-scoped semantic/test identity, not a DOM id. |
| `aria-describedby` | `string` | Optional; no local initializer | `descriptions: List<ForgeDescriptionBinding>` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-expanded` | `Booleanish` | Optional; no local initializer | `semanticExpanded: bool` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-invalid` | `boolean \| "false" \| "true" \| "grammar" \| "spelling"` | Optional; no local initializer | `semanticInvalid: ForgeInvalidState` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-label` | `string` | Optional; no local initializer | `semanticLabel: String` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-pressed` | `boolean \| "false" \| "mixed" \| "true"` | Optional; no local initializer | `semanticPressed: ForgeSemanticFlag` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `children` | `ReactNode` | Required; no local initializer | `children: List<Widget>` | Preserve permitted canonical parts, child order and identity; no arbitrary descendant cloning. |
| `shape` | `ComponentShape` | Optional; no local initializer | `shape: ForgeShape` | Same capability and value constraints; preserve source ownership and callback timing. |
| `fullWidth` | `boolean` | Optional; `true` | `fullWidth: bool` | Same capability and value constraints; preserve source ownership and callback timing. |

### Defaults and fixed forwarding

- Preserve `elevation = "raised"` observed in `web/library/src/design-system/components/molecules/Card/useCard.ts`.
- Preserve `fullWidth = true` observed in `web/library/src/design-system/components/molecules/Card/useCard.ts`.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/molecules/Card.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/Card/definition.ts): `basic`, `body-only`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Use passive native card composition with required Body/optional Header/Footer and independent child actions.
- [ ] Preserve elevation=raised/fullWidth=true/inherited shape and token-backed background/border/shadow.
- [ ] Nested actions retain individual keyboard/touch behavior; the card itself does not become clickable or a page landmark.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.
