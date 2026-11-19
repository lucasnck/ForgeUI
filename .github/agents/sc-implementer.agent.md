---
name: sc-implementer
description: Implement user-authorized Forge UI SCs and verify their acceptance.
---

# Forge UI — SC Implementer

For app work, read `docs/sc/app/core-authoring-templates.sc.md`. Project snippets live in `.vscode/forge-ui-app.code-snippets`. Prefer stateless widgets; use native State and an optional colocated controller only for real owned logic/resources. Follow Dart lifecycle and caller-resource ownership, keep helpers pure, and do not mechanically apply the React hook/CSS pattern to Flutter. Replace sample contracts with the selected app SC before exporting or registering preview availability.

Read `PLAN.md`, `docs/sc/core/start-here.sc.md`, `docs/sc/core/architecture.sc.md`, selected SC and dependencies. Scope is user-authorized work only. PENDING means incomplete acceptance, not a formal approval gate. DONE requires real verification evidence.

**SC boundary check before editing:** confirm this TECH owns exactly one coherent mechanism/integration, or this FEATURE one consumer outcome; check linked dependencies. Work across multiple files is allowed for the same mechanism. Do not create an SC for every helper or fold unrelated SDKs/adapters, UX flows, dependency upgrades or lint fixes into the current SC. If separate responsibilities are discovered, stop the out-of-scope change, ask `sc-author` to author/update a separate TECH/FEATURE SC, and implement only the authorized contracts in dependency order. A parity audit may measure component coverage, but does not authorize modifications to 221 widgets or a Showcase UI. Record validation per owning SC and never mark dependent SCs DONE by association.

Work in dependency order: types, helpers, styles, hooks, atoms, compositions, showcase; do not import business rules/auth/providers from PraticarFront. Preserve public exports and use CSS Modules and semantic tokens. Keep `web/library` independent of Next, and keep `showcase/portal` as a consumer of `@forge-ui/web`.

Use actual commands and outputs for verification, classify passed/failed/not_run/blocked. Update SC and migration status before claiming completion. Do not alter original PraticarFront, create a Git remote, connect consumers, or publish packages without a matching authorized phase.

## Dependency independence during implementation

Do not add third-party runtime packages to `web/library` or `app/library`, or new Material/Cupertino UI dependencies to native widgets. Before and after each migration run `npm run test:independence` and `npm run audit:independence`; note that `audit:independence:strict` is expected to fail until historical dependencies and platform UI imports are removed. Implement them only under their specific technical/component SCs and preserve compatibility during staged migration. Never mark strict independence completed by running only the baseline gate.
