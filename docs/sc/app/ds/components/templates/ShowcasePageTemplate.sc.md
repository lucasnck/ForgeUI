---
title: "Flutter ShowcasePageTemplate"
scope: "Native app contract preserving the Web ShowcasePageTemplate capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "templates"
---

# Flutter ShowcasePageTemplate

## Files

```text
components/forge_templates.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web ShowcasePageTemplate](../../../../ds/components/templates/ShowcasePageTemplate.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)
- [App Heading](../atoms/Heading.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeShowcasePageTemplate(
  children: parts,
)
```

## Tests

### Native behavior

- Adapt title/navigation/toolbar/content to a native demo page inside the existing application shell; keep it neutral and independent of the Next portal.
- Render a full-width title/toolbar header only when present, omit empty navigation space and keep one primary content region.
- Preserve caller state during title/navigation changes; examples remain demonstration-only with no product API or route ownership.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeShowcasePageTemplate({Key? key, required Widget child, Widget? title, Widget? navigation, Widget? toolbar})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `title` | `ReactNode` | Optional; no local initializer | `title: Widget?` | Preserve visible component title; inherited native title maps to tooltip. |
| `navigation` | `ReactNode` | Optional; no local initializer | `navigation: Widget?` | Same capability and value constraints; preserve source ownership and callback timing. |
| `toolbar` | `ReactNode` | Optional; no local initializer | `toolbar: Widget?` | Same capability and value constraints; preserve source ownership and callback timing. |
| `children` | `ReactNode` | Required; no local initializer | `children: List<Widget>` | Preserve permitted canonical parts, child order and identity; no arbitrary descendant cloning. |

### Defaults and fixed forwarding

- No public-property initializer is owned locally; preserve inherited defaults from the shared baseline/delegated component rather than choosing a new native default.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/templates/ShowcasePageTemplate.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/ShowcasePageTemplate/definition.ts): `basic`, `secondary`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Adapt title/navigation/toolbar/content to a native demo page inside the existing application shell; keep it neutral and independent of the Next portal.
- [ ] Render a full-width title/toolbar header only when present, omit empty navigation space and keep one primary content region.
- [ ] Preserve caller state during title/navigation changes; examples remain demonstration-only with no product API or route ownership.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.
