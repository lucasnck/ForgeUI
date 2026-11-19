---
title: "TECH — Full-catalog Flutter/React parity audit and evidence gate"
scope: "Cross-platform structural inventory and explicit signed-off evidence validation for the 221 public ForgeUI components"
status: "PENDING"
type: "helper"
ds-level: "none"
---

# Full-catalog Flutter/React parity audit

## Files

```text
scripts/audit-flutter-react-parity.mjs (M)
docs/migration/validation/flutter-react-parity-inventory.json (M)
docs/migration/validation/flutter-react-parity-evidence.json (C)
package.json (M)
```

## Contract

```bash
node scripts/audit-flutter-react-parity.mjs --check
node scripts/audit-flutter-react-parity.mjs --check --require-visual
```

## Ownership

This is **one technical capability: the reproducible audit and evidence gate**. It reads the existing public React and Flutter contracts, canonical scenario identifiers, the Dart API model, preview manifest and showcase catalog. It reports structural consistency and tracks manually reviewed visual/native/a11y evidence separately. It cannot fix or declare acceptance for a widget itself.

The user-facing cross-platform preview and its visual/scenario parity are owned by [App Showcase Parity](feature-showcase-parity.sc.md). Dart snippet formatting is owned by [Dart snippet presentation](tech-flutter-code-display.sc.md). The shared responsive Flutter preview surface and platform controls are owned by [Flutter preview surface](tech-flutter-preview-surface.sc.md). Fixes in the 221 underlying Dart widgets remain in their individual component SCs. No UI, Dart widget, theme, source app or consumer-pinning modification is authorized by this audit TECH.

## Tests

- Inventory exactly 221 distinct React/Flutter public API and manifest slugs and expected scenario identifiers, with a nonzero exit for unknown/duplicate/missing entries.
- Preserve generated structural inventory separately from reviewer-supplied evidence; regeneration must not overwrite manual review records.
- Validate evidence by slug, source hash, theme, scenario, exact visual/native/a11y status, reviewer and date; reject stale or incomplete signoffs, not count them as pass.
- Structural success must never be displayed as visual, behavioral, accessibility or Android/iOS success. `--require-visual` must fail until required review evidence exists.
- Run the root auditor under Node and record the command, exit code and report; missing Flutter or browser tools remain `not_run`/`blocked`, not `passed`.

## Criteria

- [ ] Full unique catalog + scenario inventory and source mapping verified without structural errors.
- [ ] Evidence schema and explicit review gate reject stale, missing or incomplete manual signoffs.
- [ ] Reports distinguish structural coverage from all unverified visual/native/accessibility conditions.
- [ ] Audit commands and results recorded; no widget or Showcase status inferred from this TECH.
