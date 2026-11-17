---
title: "Flutter ApplicationLayoutTemplate"
scope: "Native app contract preserving the Web ApplicationLayoutTemplate capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "templates"
---

# Flutter ApplicationLayoutTemplate

## Files

```text
components/forge_templates.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web ApplicationLayoutTemplate](../../../../ds/components/templates/ApplicationLayoutTemplate.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)
- [App ApplicationLayoutHeader](../atoms/ApplicationLayoutHeader.sc.md)
- [App ApplicationLayoutBody](../atoms/ApplicationLayoutBody.sc.md)
- [App ApplicationLayoutFooter](../atoms/ApplicationLayoutFooter.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeApplicationLayoutTemplate(
  children: parts,
)
```

## Tests

### Native behavior

- Use one app-shell content owner with adaptive header/navigation/toolbar/footer slots, SafeArea and keyboard-inset cooperation. Do not instantiate a second MaterialApp, router or application provider.
- Render exactly one primary content semantic region, omit absent slots without gaps and preserve entered child state when shell preferences change.
- Keep mainId as a stable semantic/focus identity rather than HTML id; adapt sidebar to constrained width without inventing routes or dropping navigation.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeApplicationLayoutTemplate({Key? key, required Widget child, Widget? header, Widget? navigation, Widget? toolbar, Widget? footer, String mainId = 'main-content', ScrollController? scrollController})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `mainId` | `string` | Optional; `"main-content"` | `mainId: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `header` | `ReactNode` | Optional; no local initializer | `header: Widget?` | Same capability and value constraints; preserve source ownership and callback timing. |
| `navigation` | `ReactNode` | Optional; no local initializer | `navigation: Widget?` | Same capability and value constraints; preserve source ownership and callback timing. |
| `toolbar` | `ReactNode` | Optional; no local initializer | `toolbar: Widget?` | Same capability and value constraints; preserve source ownership and callback timing. |
| `footer` | `ReactNode` | Optional; no local initializer | `footer: Widget?` | Same capability and value constraints; preserve source ownership and callback timing. |
| `title` | `string` | Optional; no local initializer | `tooltip: String` | Preserve visible component title; inherited native title maps to tooltip. |
| `autoFocus` | `boolean` | Optional; no local initializer | `autofocus: bool` | Native focus request, subordinate to modal/compound owner policy; no focus theft during updates. |
| `id` | `string` | Optional; no local initializer | `semanticId: String` | Stable owner-scoped semantic/test identity, not a DOM id. |
| `aria-describedby` | `string` | Optional; no local initializer | `descriptions: List<ForgeDescriptionBinding>` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-expanded` | `Booleanish` | Optional; no local initializer | `semanticExpanded: bool` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-invalid` | `boolean \| "false" \| "true" \| "grammar" \| "spelling"` | Optional; no local initializer | `semanticInvalid: ForgeInvalidState` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-label` | `string` | Optional; no local initializer | `semanticLabel: String` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-pressed` | `boolean \| "false" \| "mixed" \| "true"` | Optional; no local initializer | `semanticPressed: ForgeSemanticFlag` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `children` | `ReactNode` | Required; no local initializer | `children: List<Widget>` | Preserve permitted canonical parts, child order and identity; no arbitrary descendant cloning. |

### Defaults and fixed forwarding

- Preserve `mainId = "main-content"` observed in `web/library/src/design-system/components/templates/ApplicationLayoutTemplate/ApplicationLayoutTemplate.tsx`.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/templates/ApplicationLayoutTemplate.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/ApplicationLayoutTemplate/definition.ts): `basic`, `secondary`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Use one app-shell content owner with adaptive header/navigation/toolbar/footer slots, SafeArea and keyboard-inset cooperation. Do not instantiate a second MaterialApp, router or application provider.
- [ ] Render exactly one primary content semantic region, omit absent slots without gaps and preserve entered child state when shell preferences change.
- [ ] Keep mainId as a stable semantic/focus identity rather than HTML id; adapt sidebar to constrained width without inventing routes or dropping navigation.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.
