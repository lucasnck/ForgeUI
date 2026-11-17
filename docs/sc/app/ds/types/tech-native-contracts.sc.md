---
title: "Native API and Model Contracts"
scope: "Shared Dart equivalents of Web structural models, native bindings and controlled-value presence"
status: "PENDING"
type: "type"
ds-level: "none"
---

# Native API and Model Contracts

## Files

```text
types/native_contracts.dart (C)
types/native_models.dart (C)
../forge_ui.dart (M)
../../test/native_contracts_test.dart (C)
```

## Dependencies

- [App capabilities](tech-component-capabilities.sc.md)
- [Web compound composition](../../../ds/types/tech-compound-composition.sc.md)
- [Web collection contracts](../../../ds/types/tech-collection-contracts.sc.md)
- [Web native controls](../../../ds/types/tech-native-control-contracts.sc.md)
- [Web typography](../../../ds/types/tech-typography-contracts.sc.md)
- [Web layout](../../../ds/types/tech-layout-contracts.sc.md)
- [Web money](../../../ds/types/tech-money-contracts.sc.md)
- [Web phone](../../../ds/types/tech-phone-contracts.sc.md)
- [Web OData](../../../ds/types/tech-odata-filter-contracts.sc.md)
- [Web map](../../../ds/types/tech-map-contracts.sc.md)
- [Web tree](../../../ds/types/tech-tree-contracts.sc.md)
- [Web notifications](../../../ds/types/tech-notification-contracts.sc.md)
- [Web popup](../../../ds/types/tech-popup-types.sc.md)
- [Web modal](../../../ds/types/tech-modal-contracts.sc.md)
- [Web range](../../../ds/types/tech-range-contracts.sc.md)
- [Web forms registration](../../../ds/types/tech-form-field-organisms.sc.md)
- [Web icon geometry](../../../ds/types/tech-icon-geometry.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

const controlledEmpty = ForgeProvided<String?>(null);
```

## Content

```dart
final class ForgeProvided<T> {
  const ForgeProvided(this.value);
  final T value;
}
```

## Tests

- Verify every proposed named model in the component traceability data against its canonical source record/alias/union; preserve fields, tag values, generic relationships, optionality, nulls, bounds and serialization.
- Distinguish omitted controlled values from explicit null using ForgeProvided; reject controlled/uncontrolled switching where the shared owner forbids it.
- Preserve exact money and OData decimal strings, GUID validation, phone country/number states, acyclic tree descriptors and immutable typed generic row/column builders.
- Cover all typography sizes xs through 7xl, six text tones, four weights, heading levels 1..6, container narrow/wide, layout alignment/justify/breakpoint/ratio/elevation, icon sizes including inherit, animation none/fade/scale and supported preference values without conflating their enums.
- Native trigger builders receive action/focus/semantic bindings; description/control/form bindings preserve scoped ownership, cancellation and cleanup.
- Native form data preserves repeated names/order, submitter intent and selected-file descriptors, excluding disabled fields. Typed field paths preserve nested-value registration and error ownership without accepting arbitrary nonexistent paths as type-safe.
- Preserve mixed pressed state and diagnostic invalid states without reducing them to false; semantic state cannot override a context-owned role/value.
- Reject missing required fields, unsupported discriminants/enum values and unsafe dynamic record casts at analysis/runtime boundaries as applicable.

## Criteria

- [ ] Expose proposed native models and bindings only after their full source-compatible contracts are implemented; do not export opaque placeholders.
- [ ] All component property matrices resolve to typed Dart values or explicit native platform bindings, with no dependency on React/DOM.
- [ ] Shared canonical structures remain the semantic source; Dart classes/typedefs/sealed variants adapt representation without inventing business semantics.
- [ ] Preserve required-nullable versus optional presence, exact scalar precision and callback cardinality.
- [ ] Retain icon registry geometry/names and reversible serialized-name mapping; hyphenated names receive legal Dart identifiers without collisions.
- [ ] Primitive visual/type unions are defined once and reused; no independent model copies per component.

