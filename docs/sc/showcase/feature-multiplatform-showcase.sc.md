---
title: "Multiplatform Showcase V2 Preview"
scope: "One Showcase V2 catalog with platform-specific React and Flutter implementations, code samples and embedded Flutter Web preview"
status: "PENDING"
type: "component"
ds-level: "none"
---

# Multiplatform Showcase V2 Preview

## Files

```text
../../../showcase/portal/src/features/showcase-v2/model/forge-platforms.ts (C)
../../../showcase/portal/src/features/showcase-v2/model/flutter-preview-index.ts (C)
../../../showcase/portal/src/features/showcase-v2/components/PlatformSwitcher/PlatformSwitcher.tsx (C)
../../../showcase/portal/src/features/showcase-v2/components/PlatformSwitcher/PlatformSwitcher.module.css (C)
../../../showcase/portal/src/features/showcase-v2/components/FlutterPreview/FlutterPreview.tsx (C)
../../../showcase/portal/src/features/showcase-v2/components/FlutterPreview/FlutterPreview.module.css (C)
../../../showcase/portal/src/features/showcase-v2/components/ShowcaseV2Entry.tsx (M)
../../../showcase/portal/src/features/showcase-v2/model/flutter-preview-manifest.json (C)
../../../scripts/build-flutter-preview.mjs (C)
../../../app/showcase_flutter/pubspec.yaml (C)
../../../app/showcase_flutter/lib/main.dart (C)
../../../app/showcase_flutter/web/index.html (C)
../../../app/showcase_flutter/web/flutter_bootstrap.js (C)
../../../app/showcase_flutter/lib/preview_bridge.dart (C)
../../../app/showcase_flutter/lib/preview_bridge_stub.dart (C)
../../../app/showcase_flutter/lib/preview_bridge_web.dart (C)
../../../app/showcase_flutter/lib/preview_settings.dart (C)
../../../app/showcase_flutter/test/preview_test.dart (C)
../../../app/showcase_flutter/assets/fonts/ (C)
../../../showcase/portal/src/features/showcase-v2/components/FlutterPreview/FlutterComponentShowcase.tsx (C)
../../../showcase/portal/src/features/showcase-v2/components/FlutterPreview/flutter-button-properties.ts (C)
../../../showcase/portal/src/features/showcase-v2/components/FlutterPreview/useFlutterPreview.ts (C)
../../../showcase/portal/src/features/showcase-v2/components/useShowcasePlatform.ts (C)
../../../showcase/portal/src/features/showcase-v2/components/ShowcaseV2Renderer/ShowcaseV2Renderer.tsx (M)
../../../showcase/portal/src/features/showcase-v2/components/ShowcaseV2Template/ShowcaseV2Template.tsx (M)
../../../showcase/portal/src/features/showcase-v2/components/ExamplePreview/ExamplePreview.tsx (M)
../../../showcase/portal/src/features/showcase-v2/components/FlutterPreview/FlutterScenarioControls.tsx (C)
../../../scripts/test-flutter-preview.mjs (C)
```

## Dependencies

- [Cross-platform token generation](../ds/styles/tech-cross-platform-token-generation.sc.md)
- [Flutter theme adapter](../app/tech-flutter-theme-adapter.sc.md)

## Contract

```tsx
<PlatformSwitcher value={platform} onChange={setPlatform} panelId="forge-platform-panel" />
```

```ts
export type ForgePlatform = "react" | "flutter";

export interface PlatformPreviewIndexEntry {
  componentSlug: string;
  platform: ForgePlatform;
  available: boolean;
  codeLanguage: "tsx" | "dart";
  previewPath?: string;
}
```

## Tests

- Platform tabs belong inside the shared ShowcaseV2Template header/container; changing platform keeps the component heading and the same preview/property layout.
- Flutter Button exposes only its real Dart API: child text, nullable onPressed, loading and outlined. Property edits update the running iframe through a versioned, same-origin, parent/source-validated JSON bridge without restarting Flutter; reset restarts the example and clears its counter.
- Dart snippets reflect the edited values and escape interpolation characters. Unsupported Flutter components show an unavailable state rather than React properties.
- Flutter engine/CanvasKit assets load locally, without a CDN or service-worker cache. Readiness is acknowledged by the Dart app after its first frame; loading, failures and retry are visible.
- The preview's Roboto regular/medium/bold fonts are bundled with their SDK-provided license; basic Portuguese labels do not require remote font downloads. This is preview configuration, not an imposed font for native consumers.

- On Windows, invoke the installed `flutter.bat` launcher through the native shell; a present SDK must not be reported missing merely because Node cannot execute a batch file directly.

- React tab continues rendering the existing approved live component demos without changed routes, public imports or interactions.
- Flutter tab loads only a compiled preview artifact from the matching component slug; absence of Flutter support shows a truthful unavailable state.
- Theme selection and documented token mappings are passed to the Flutter preview through a finite, validated communication contract; preview isolation does not permit arbitrary navigation or script injection.
- Keyboard, screen-reader labels, focus handling and mobile layout remain usable when switching tabs or when preview content fails to load.
- Verify copy snippets are genuine library consumption code for the selected platform, not Showcase implementation internals.

- Native fixture controls such as title/body text and consumer actions are shown separately from resolved public Dart constructor properties. Keep both inside the same ExampleScope so edits update the real preview and copyable code; components without a compiled preview still expose their documented public constructor read-only.

## Criteria

- [ ] Keep a single existing Next.js Showcase V2 navigation tree, component identity and shared documentation. Platform selection is inside each component detail; do not create a separate public Flutter documentation site.
- [ ] React preview is backward-compatible and remains the default until a real Flutter build is registered.
- [ ] Compile the Flutter demo for Flutter Web and embed the artifact in the current Showcase; only register an entry after the corresponding public Flutter widget, sample and build are proven.
- [ ] Isolate Flutter build and runtime dependencies from the React library and SSR route loading; loading the React preview does not eagerly download Flutter runtime assets.
- [ ] Match existing design tokens and theme names while documenting behaviors where platform defaults differ. Preview in a web browser does not substitute Android/iOS native verification.
- [ ] Preserve one canonical component specification per behavior; record React and Flutter implementation files/acceptance under the owning component SC as implementation work proceeds.
- [ ] Validate routing, static export/SSR, copyable Dart/TSX snippets, mobile layout, tab semantics and Flutter artifact loading with actual build/test results before `DONE`.
