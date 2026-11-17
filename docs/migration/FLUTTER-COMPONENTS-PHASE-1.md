# Flutter components — first functional delivery

Button, Spinner and ButtonGroup now have real Dart implementations and compiled examples in the shared portal. The other 218 component contracts remain unimplemented in Flutter. All three complete parity SCs retain PENDING for remaining inherited-native mapping review and visual/native acceptance.

- Button: five sizes, eleven tones, six appearances, three shapes, four variant aliases, inherited theme shape, fullWidth, loading/loadingLabel, explicit disabled, optional child, semanticLabel, tooltip, FocusNode, autofocus and focus callback. Explicit appearance overrides variant; the deprecated outlined bridge resolves last. Loading/null callback/disabled block activation immediately.
- Spinner: source size tokens, inherited or explicit tone, animated/static and reduced-motion behavior, runtime validation of a named nondecorative status, decorative exclusion and animation cleanup.
- ButtonGroup: nonblank name, independent child actions, spacing/padding enums, finite fullWidth handling and native wrapping.
- Shared capability enums are public; the action style resolver is internal. Four-theme token-backed colors/metrics are reused rather than replaced by Material palettes. Native padded tap targets and native press feedback are deliberate app adaptations.
- The portal exposes real scalar property controls and copyable Dart snippets for these three widgets. FocusNode/onFocusChange and ButtonGroup children are documented typed fixtures rather than serialized objects.
- Button has basic and CRUD hierarchy scenarios. The primary stays brand/solid in the hierarchy; Edit uses sand/bordered, navigation/retry use neutral, and danger appears only in a caller-owned explicit confirmation. The example performs no data mutation.
- Build registration is gated by Flutter analysis, library tests, preview tests and actual Web compilation. Other component/platform pairs retain unavailable state.

## Verification

| Check | Result |
| --- | --- |
| Flutter library analysis | PASS, no issues |
| Flutter library tests | PASS, 15 tests |
| Flutter preview analysis | PASS, no issues |
| Flutter preview tests | PASS, 5 tests |
| Flutter release Web build | PASS; Button, Spinner and ButtonGroup registered |
| npm run typecheck | PASS, library and portal |
| npm run build | PASS, 297 static pages |
| node scripts/test-flutter-preview.mjs | PASS; schemas, Dart code, enum handling, local bootstrap and origin/source validation |
| npm run tokens:check | PASS; 184 portable tokens / 4 themes; original Web CSS hash unchanged |
| Local HTTP | PASS; three component routes, Flutter index, JS and CanvasKit WASM returned 200 |

[HTTP evidence](validation/flutter-components-phase1-http.json). The current verified release id is a720c960ac774b29. The compiled registry records the concrete build id in showcase/portal/src/features/showcase-v2/model/flutter-preview-manifest.json.

Tests cover action suppression, keyboard activation, borrowed focus ownership, loading label replacement, explicit naming, shape/appearance precedence, constrained/unbounded width, text scaling, native group wrapping and individual actions, named/decorative indicators, reduced motion and cleanup. Preview tests verify live enum/settings changes, preserved counters, malformed message rejection, three real widget routes and explicit destructive confirmation.

## Acceptance limits

No Android/iOS execution or manual browser/pixel acceptance is claimed. Token unit conversion still follows the existing 16px/rem assumption; a compilation or HTTP response does not certify visual parity.

The installed Flutter SDK has no usable aria-busy equivalent in this adapter. Button uses immediate disabled state and a single live semantic region containing its real label; the internal Spinner remains decorative. A named standalone Spinner uses one live region. The SDK's loadingSpinner semantic role triggered a debug framework assertion, so it is not used. This platform distinction is recorded rather than hidden behind a fabricated busy flag or duplicated announcement.

Complete inherited native/form/semantic-wrapper mappings and real platform/visual acceptance before marking the full contracts DONE. No Git commit/push, package publication or consumer integration was performed.

