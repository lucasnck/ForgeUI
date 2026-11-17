---
title: "Native Platform Adapters"
scope: "Injected native runtime ports for overlays, focus, navigation, forms, files, maps and shared transitions"
status: "PENDING"
type: "helper"
ds-level: "none"
---

# Native Platform Adapters

## Files

```text
adapters/native_platform_adapters.dart (C)
../forge_ui.dart (M)
../../test/native_platform_adapters_test.dart (C)
```

## Dependencies

- [Native contracts](../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../tech-flutter-theme-adapter.sc.md)
- [Web map contracts](../../../ds/types/tech-map-contracts.sc.md)
- [Web focus contracts](../../../ds/types/tech-focus-contracts.sc.md)
- [Web transition contracts](../../../ds/types/tech-page-transition-contracts.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

final ForgeMapRenderer renderer = suppliedRenderer;
```

## Tests

- Overlay entries retain inherited theme and explicit owner scope, nested stacking, focus restoration and semantics; disposal removes entries/listeners once without an application-global singleton.
- System back/Escape/barrier interactions request owner dismissal with cancellation/refusal preserved; nested overlay events do not close an unrelated parent.
- Map mount receives a native viewport host and cancellation token rather than HTMLElement/AbortSignal; late handles are destroyed exactly once and native resize replaces ResizeObserver.
- Navigation/URL launch/download preserve destination and supported intent, expose unsupported capabilities truthfully and never infer routes from labels.
- File chooser distinguishes cancellation/accepted empty selection, returns ordered immutable metadata/content references and never requires a filesystem path.
- Native form registration handles names/typed paths, constraints, dirty/touched/errors, repeated values, submitter intent, disabled exclusion and reset; no implicit network submission.
- Shared-element/route coordination preserves scoped stable identity, latest-navigation wins, immediate state/focus, readiness and reduced-motion/direct-entry fallbacks.
- Supplied FocusNodes/controllers remain caller-owned; owned timers, observers, listeners and cancellation resources are released on replacement/disposal.

## Criteria

- [ ] Inject runtime adapters only where needed; no map SDK, navigation package, form-state package, file-picker plugin, paid service or permission request is chosen implicitly.
- [ ] Preserve public component intent and rejection paths with native runtime bindings rather than browser globals.
- [ ] Define provider-specific implementation/configuration separately; missing capability shows an explicit unavailable/failure state instead of a fake successful operation.
- [ ] Keep presentation widgets independent of feature APIs, storage, routing decisions and application providers.
- [ ] Record targeted integration evidence at each concrete adapter before claiming its capability; fake ports do not certify real maps, devices or system permissions.

