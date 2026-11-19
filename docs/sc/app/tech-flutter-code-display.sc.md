---
title: "TECH — Flutter Dart snippet presentation"
scope: "Readable, source-faithful public Dart usage display in the Showcase without mutating compiled snippets or widget code"
status: "PENDING"
type: "helper"
ds-level: "none"
---

# Flutter Dart snippet presentation

## Files

```text
showcase/portal/src/features/showcase-v2/components/ExampleCode/format-dart-for-display.mjs (M)
showcase/portal/src/features/showcase-v2/components/ExampleCode/format-dart-for-display.d.mts (M)
showcase/portal/src/features/showcase-v2/components/ExamplePreview/ExamplePreview.tsx (M)
scripts/test-flutter-code-display.mjs (M)
```

## Contract

```ts
import { formatDartForDisplay } from "./format-dart-for-display.mjs";
const displayed = formatDartForDisplay(publicDartExample);
```

## Ownership

This TECH owns **only the presentation and copy fidelity of public Dart snippets**, not Flutter preview embedding, Dart compilation, component parity audits or library widgets. Preserve the original compilable usage, including imports and control flow. Generated bridge/state/fixture internals may not be misrepresented as a short public snippet; when a concise example does not exist, the feature reports that limitation instead of fabricating code. `dart format` is the authoritative source formatter; the display-only formatter is not a substitute.

## Tests

- Presentation preserves strings, interpolation, inline comments, nested/collection syntax, complete imports and expressions; never rewrites actual Dart source or generated preview bundles.
- Non-Dart and non-Forge code are unchanged; returned copy matches displayed code and never removes necessary public API arguments.
- Reject or flag generated/private bridge fixtures as copyable consumer recipes without a reviewed public expression.
- Run `node scripts/test-flutter-code-display.mjs` and portal typecheck/build, recording actual command results.

## Criteria

- [ ] Display/copy output stays semantically faithful for tested public Dart examples.
- [ ] No private bridge/fixture implementation is presented as the public widget API.
- [ ] Formatter and portal integration tests pass with recorded evidence.
