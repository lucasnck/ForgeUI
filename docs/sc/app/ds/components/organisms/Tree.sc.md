---
title: "Flutter Tree"
scope: "Native app contract preserving the Web Tree capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "organisms"
---

# Flutter Tree

## Files

```text
components/forge_tree.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web Tree](../../../../ds/components/organisms/Tree.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)
- [App TreeHeader](../atoms/TreeHeader.sc.md)
- [App TreeBody](../molecules/TreeBody.sc.md)
- [App TreeFooter](../atoms/TreeFooter.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeTree(
  label: label,
  nodes: nodes,
  children: parts,
)
```

## Tests

### Native behavior

- Use a scoped native hierarchical tree with selection and expansion controlled independently; expose touch actions and visible-tree keyboard navigation.
- Preserve nodes/label/parts, optional nullable selection, expanded/default values and animated=true; distinguish omitted selection from controlled null.
- Validate stable keys and ancestry; navigation skips collapsed/disabled nodes and parent/child expansion follows the visible-tree contract.
- Accepted state emits one callback, rejected state stays authoritative and prop changes never synthesize selection events.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeTree({Key? key, required String label, required List<ForgeTreeNode> nodes, required List<Widget> children, ForgeProvided<String?>? value, String? defaultValue, void Function(String?)? onValueChange, List<String>? expandedValue, List<String> defaultExpandedValue = const [], void Function(List<String>)? onExpandedValueChange, bool animated = true})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `label` | `string` | Required; no local initializer | `label: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `nodes` | `readonly TreeNodeDescriptor[]` | Required; no local initializer | `nodes: List<ForgeTreeNodeDescriptor>` | Same capability and value constraints; preserve source ownership and callback timing. |
| `title` | `string` | Optional; no local initializer | `tooltip: String` | Preserve visible component title; inherited native title maps to tooltip. |
| `autoFocus` | `boolean` | Optional; no local initializer | `autofocus: bool` | Native focus request, subordinate to modal/compound owner policy; no focus theft during updates. |
| `id` | `string` | Optional; no local initializer | `semanticId: String` | Stable owner-scoped semantic/test identity, not a DOM id. |
| `aria-describedby` | `string` | Optional; no local initializer | `descriptions: List<ForgeDescriptionBinding>` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-expanded` | `Booleanish` | Optional; no local initializer | `semanticExpanded: bool` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-invalid` | `boolean \| "false" \| "true" \| "grammar" \| "spelling"` | Optional; no local initializer | `semanticInvalid: ForgeInvalidState` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-label` | `string` | Optional; no local initializer | `semanticLabel: String` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-pressed` | `boolean \| "false" \| "mixed" \| "true"` | Optional; no local initializer | `semanticPressed: ForgeSemanticFlag` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `children` | `ReactNode` | Required; no local initializer | `children: List<Widget>` | Preserve permitted canonical parts, child order and identity; no arbitrary descendant cloning. |
| `value` | `Value` | Optional; no local initializer | `value: Value` | Same capability and value constraints; preserve source ownership and callback timing. |
| `defaultValue` | `Value` | Optional; no local initializer | `defaultValue: Value` | Same capability and value constraints; preserve source ownership and callback timing. |
| `onValueChange` | `((value: string \| null) => void)` | Optional; no local initializer | `onValueChange: void Function(String?)` | Same capability and value constraints; preserve source ownership and callback timing. |
| `expandedValue` | `readonly string[]` | Optional; no local initializer | `expandedValue: List<String>` | Same capability and value constraints; preserve source ownership and callback timing. |
| `defaultExpandedValue` | `readonly string[]` | Optional; no local initializer | `defaultExpandedValue: List<String>` | Same capability and value constraints; preserve source ownership and callback timing. |
| `onExpandedValueChange` | `((value: readonly string[]) => void)` | Optional; no local initializer | `onExpandedValueChange: void Function(List<String>)` | Same capability and value constraints; preserve source ownership and callback timing. |
| `animated` | `boolean` | Optional; `true` | `animated: bool` | Same capability and value constraints; preserve source ownership and callback timing. |

### Defaults and fixed forwarding

- Preserve `animated = true` observed in `web/library/src/design-system/components/organisms/Tree/useTree.ts`.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/organisms/Tree.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/Tree/definition.ts): `basic`, `rejection`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Use a scoped native hierarchical tree with selection and expansion controlled independently; expose touch actions and visible-tree keyboard navigation.
- [ ] Preserve nodes/label/parts, optional nullable selection, expanded/default values and animated=true; distinguish omitted selection from controlled null.
- [ ] Validate stable keys and ancestry; navigation skips collapsed/disabled nodes and parent/child expansion follows the visible-tree contract.
- [ ] Accepted state emits one callback, rejected state stays authoritative and prop changes never synthesize selection events.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.

## Showcase verification checkpoint — 2026-11-17

The native showcase now exercises this API in its canonical composition. The [group validation report](../../../../../migration/FLUTTER-COLLECTIONS-WAVE-7.md) records widget/snippet tests, compilation evidence and limits. This records preview coverage; it does not establish full Web parity or Android/iOS visual and assistive acceptance. Unverified Criteria remain PENDING.
