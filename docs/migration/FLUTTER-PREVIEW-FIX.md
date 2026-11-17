# Flutter Button — preview and property integration

## Corrected behavior

- React/Flutter tabs render inside the existing ShowcaseV2Template article header and Container, with component title and description retained for both platforms.
- Flutter Button uses the existing preview Card, property DataGrid, reset and copy workflow. The editable properties reflect the actual ForgeButton API: Text child, callback enabled/null, loading and outlined. Unsupported components do not display misleading React properties in Flutter mode.
- Edits update the running Dart widget through a bounded JSON bridge, preserving the click counter. The bridge validates message type/version, component, property types, origin and parent/source window. No arbitrary navigation or code evaluation is exposed.
- The generated Dart snippet follows the edited values and escapes string interpolation. Reset recreates the example and clears its state.
- A first-frame readiness acknowledgement drives loading/error/retry UI. A standalone preview link is available.
- CanvasKit and Roboto fonts are local, with the font license included. Bootstrap and compiled Dart requests are versioned to bypass stale Flutter caches; the preview unregisters only its own former service-worker scope.
- A focus-restoration hook returns keyboard focus to the selected tab after switching implementations.

## Verification

- `npm run build:flutter-preview`: PASS. Both Flutter packages analyze without issues; two library tests and two preview tests pass; release compilation registers the verified Button artifact.
- Preview widget tests cover live label, outlined variant, theme, disabled/loading behavior, preserved click count and listener cleanup.
- `npm run test:flutter-preview`: PASS. Covers Dart snippet escaping/defaults, local CanvasKit/bootstrap configuration, versioned entrypoint, origin/source filtering and scoped worker cleanup.
- `npm run check`: PASS. Includes migration/store/structural/documentation checks, target audit, library/portal TypeScript, complete Next static build and cross-platform checks.
- Dart formatting: PASS for demo sources and tests.
- [HTTP verification](validation/flutter-ui-http.json): actual server-rendered tabs belong to the component article header; Button page, Flutter HTML/JS, CanvasKit WASM and Roboto font return 200 with appropriate MIME types.
- Logs: [Flutter](validation/flutter-ui-build.log), [integrated checks](validation/flutter-ui-check.log).

## Actual Chrome accessibility inspection

The existing Chrome window at `/components/button/` was inspected through native accessibility APIs. The React/Flutter tabs were children of the component article header, the Flutter panel contained the compiled preview, and all four property editors were present. Editing `child` to `Teste Flutter` updated the property value and the generated Dart snippet; the original `Salvar alterações` value was restored afterward.

Screenshot capture timed out, and coordinate-based interaction with the Flutter canvas was unavailable. Checkbox changes and actual canvas clicks are therefore covered by the Flutter widget tests, not claimed as manually verified browser interactions. Pixel-level inspection, Android/iOS and full React/Flutter visual parity remain pending. The Flutter widget set remains limited to Button.

No commit or push is included in this correction step. PraticarFront remains unchanged.
