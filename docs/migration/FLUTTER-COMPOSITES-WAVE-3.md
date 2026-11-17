# Forge UI Flutter — additional composites, wave 3 (2026-11-16)

SC-first: read existing Forge UI app parity SCs and corresponding Web source contracts before implementing. Existing SC statuses stay `PENDING`. No changes to PraticarFront, consumer integration, Git remotes or published packages.

## Added

- `ForgeTagGroup`, `ForgeTagGroupItem`, `ForgeTagGroupEntry`: native wrapping collection based on the actual `ForgeTagConfiguration`, with stable nonblank IDs, no automatic local removal, optional explicit children or items (never both), token-backed spacing and a named semantic region. Removal callback belongs to each Tag; caller owns the collection. FullWidth defaults true. No extra selection engine.
- `ForgePageHeader`: content-level header (not an AppBar), stable `titleId`, required title, optional identity/description/breadcrumb/actions, adaptive Wrap and existing ForgeHeading/ForgeText/ForgeDivider tokens. Divider defaults false.
- Public export in `app/library/lib/forge_ui.dart`; targeted widget tests `forge_tag_group_test.dart`, `forge_page_header_test.dart` cover ID and slot validation, caller-owned removal and action callbacks, optional layout and divider behavior.

## Verifications

| Gate | Result | Notes |
|---|---|---|
| Source structures, package exports, balanced delimiters | PASS (static) | No Dart toolchain required |
| Flutter analyze | NOT_RUN | SDK not installed in this environment |
| Flutter widget tests (new and existing) | NOT_RUN | SDK not installed in this environment |
| Flutter Web build and Showcase registration | NOT_RUN | No unverified manifest registration |
| Browser/Android/iOS behavior, visual/semantic parity | NOT_RUN | Requires runtime |

Existing 23 reported implementation entries are unchanged; these three are source-written but not counted as accepted. Remaining SCs cover other explicit-parts groups, overlays, data collections and templates. Full acceptance and 221/221 completion are not claimed.

## Next verification commands

```sh
cd app/library
flutter analyze
flutter test test/forge_tag_group_test.dart
flutter test test/forge_page_header_test.dart
flutter test test/forge_navigation_compounds_test.dart
flutter test
```
