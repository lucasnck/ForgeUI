# ForgeUI — Wave 10: Slider Flutter nativo (18/11/2026)

## Scope

Continue the 221-component parity program after Wave 9. The project baseline
has **7 direct Material/Cupertino imports** under the Flutter source tree;
this wave targets only `ForgeSlider` (one file), so **6 remaining is the expected
post-change count**, not a freshly generated full-tree audit. No consumers or
Git remote are changed.

## Evidence

- Web source and Flutter Slider SC inspected; SC & TECH updated before publishing code.
- `forge_slider.dart` no longer imports Material or uses `SliderTheme` or `Slider`.
- Painted track/thumb with generated color, border/size tokens; minimum 48dp
  touch geometry outside visible track.
- Controlled value, default value, focus ownership, disabled/readOnly, keyboard
  arrow/Home/End and RTL, touch/drag, semantics increase/decrease, and form
  registration/reset retained in source.
- Static `node scripts/test-native-slider.mjs` and
  `node scripts/check-native-slider.mjs`: PASS on isolated target fixture,
  including four negative source mutations rejected.
- Flutter test file authored (`forge_native_slider_test.dart`), **not executed**.

## Non-acceptance / current constraints

- Flutter/Dart SDK is unavailable in this execution environment; therefore
  no Dart formatting, `flutter analyze`, widget test or Flutter build evidence.
- No browser/Android/iOS inspection, screen readers, or Web × Flutter pixel
  comparison. The current native double callback does not yet implement the
  entire Web string-value contract. SC stays `PENDING`.
- Wave 9's `native-independence-matrix.json` remains a historical snapshot;
  regenerate with `npm run audit:native-independence` from the full checkout.
- Theme token `ForgeThemeTokens` and legacy adapter still pull Material.
  Future focused slices: `Input`/`Select`, picker ports for color and date/time,
  theme scope/adapters, font-family assets, third-party phone parser.

## Local commands on complete checkout

```bash
npm run test:native-slider
npm run audit:native-independence
cd app/library
flutter analyze
flutter test test/forge_native_slider_test.dart
cd ../..
npm run check:cross-platform
```

Do not mark `Slider.sc.md` DONE without runtime + visual and accessibility
acceptance. Do not edit the PraticarFront or install this revision in a consumer
until its own validation and explicit integration work.
