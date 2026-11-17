# Forge UI Flutter — atoms and composites continuation (2026-11-16)

## Source and process

Workflow: `sc-author` -> existing app parity SC review (`PENDING`) -> `sc-implementer` -> static inspection. All changes are in ForgeUI. PraticarFront, remote Git, consumers and runtime preview manifests are unchanged.

## Atomic controls audit

- Inspected 54 current Flutter Dart component files against the generated portable token dictionary; direct literal `p.color()` / `p.number()` references had no missing token names.
- `ForgeCheckbox` uses `--color-checkable-brand-background`, which **does exist** in all four current generated themes. The older `check-test.log` showing its absence is a historical build mismatch, not a proven current source defect. No change to `forge_checkable.dart`.
- Existing app input sources and exports are present but runtime tests in this environment cannot establish acceptance. `InternationalTelephoneInput` still has no verified implementation and requires its country/number parsing contract and adapters.

## New compound group

- `ForgeBreadcrumb` + `ForgeBreadcrumbItem`: named trail, exactly one passive current item in last position, ancestor destinations required, consumer-owned link activation and wrapped layout.
- `ForgePagination`, `ForgePaginationItem`, `ForgePaginationEllipsis`: controlled page and bounds, canonical parts only, inert ellipses, disabled actions, current-page state and callback-first request with no internal page mutation or routing.
- The common package export `app/library/lib/forge_ui.dart` exposes the new files. No preview is registered until Flutter succeeds.
- `ForgeTabs` now uses the portable theme token `colorActionBrandBackground` for the selected tab indicator, instead of `Theme.of(context).colorScheme.primary`.
- New `app/library/test/forge_navigation_compounds_test.dart` covers root/part validation, consumer-owned breadcrumb activation, controlled page refusal, disabled requests, orphan items and portable checkbox token availability.

## Verification

| Check | Result | Basis |
| --- | --- | --- |
| Existing generated token mapping | PASS (static) | 54 local component sources; four-theme checkable token presence |
| Public new export, symbol presence, delimiter sanity | PASS (static) | Source inspection |
| Flutter analyzer | NOT_RUN | Flutter SDK missing |
| Flutter widget tests | NOT_RUN | Flutter SDK missing |
| Flutter Web preview build / registry | NOT_RUN | Does not qualify for registration |
| Android/iOS, browser and visual/parity | NOT_RUN | Requires real runtime |

**No app parity SC is marked DONE.** The official implemented count is unchanged. All five new owner/part components are `CODE_WRITTEN_PENDING_VALIDATION` and do not increase the verified/accepted count.

## Next executable gate

From the ForgeUI checkout with the Flutter SDK installed:

```sh
cd app/library
flutter analyze
flutter test test/forge_navigation_compounds_test.dart
flutter test test/navigation_test.dart
flutter test
```

Repair any failures without weakening assertions, run the Flutter Web preview builder, compare equivalent Showcase interactions and update the JSON + SCs with real outputs. After that, continue with the remaining complex compositions and native platform adapters. This checkpoint does not claim to complete all 221 contracts.
