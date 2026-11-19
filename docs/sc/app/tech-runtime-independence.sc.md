---
title: "TECH — Runtime UI dependency boundary"
scope: "Detect and prevent third-party runtime dependencies in ForgeUI's React and Flutter libraries, independently of showcase/dev tooling"
status: "PENDING"
type: "helper"
ds-level: "none"
---

# Runtime dependency boundary

## Files

```text
scripts/audit-runtime-independence.mjs (C)
scripts/test-runtime-independence.mjs (C)
docs/migration/validation/runtime-independence-baseline.json (C)
docs/migration/validation/runtime-independence-report.json (C)
package.json (M)
```

## Dependencies

None. This TECH audits library dependencies; it does not implement widgets, theme adaptation or UI features.

## Contract

```bash
npm run audit:independence
npm run audit:independence:strict
npm run test:independence
```

## Tests

- Analyze actual production `dependencies` from `web/library/package.json` and `app/library/pubspec.yaml` separately; React/ReactDOM peer dependencies and Flutter SDK are permitted frameworks.
- Detect Material/Cupertino library source imports separately from third-party runtime packages; neither is an external package but neither may become a hidden ForgeUI visual dependency.
- Baseline mode accepts only already inventoried runtime packages. Any addition, disappearance or unexplained difference fails review (removals require an intentional baseline edit).
- Strict mode fails until there are no third-party production dependencies and no Material/Cupertino imports under the Flutter public library source.
- Dev/test, the Showcase portal and application consumers are outside this TECH's runtime restriction. No dependency is silently removed or rewritten by the audit.
- Unit tests verify allowlist, strict failures, YAML parsing of SDK declarations and material import detection.

## Criteria

- [ ] Reproducible runtime audit with baseline, nonzero strict gate and machine-readable inventory.
- [ ] Every current exception recorded with an owning migration SC; no declaration of runtime independence while exceptions exist.
- [ ] Strict gate passes only after authorized, independently specified dependency replacements and widget migrations.
