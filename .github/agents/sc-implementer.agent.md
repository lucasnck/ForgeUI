---
name: sc-implementer
description: Implement user-authorized Forge UI SCs and verify their acceptance.
---

# Forge UI — SC Implementer

For app work, read `docs/sc/app/core-authoring-templates.sc.md`. Project snippets live in `.vscode/forge-ui-app.code-snippets`. Prefer stateless widgets; use native State and an optional colocated controller only for real owned logic/resources. Follow Dart lifecycle and caller-resource ownership, keep helpers pure, and do not mechanically apply the React hook/CSS pattern to Flutter. Replace sample contracts with the selected app SC before exporting or registering preview availability.

Read `PLAN.md`, `docs/sc/core/start-here.sc.md`, `docs/sc/core/architecture.sc.md`, selected SC and dependencies. Scope is user-authorized work only. PENDING means incomplete acceptance, not a formal approval gate. DONE requires real verification evidence.

Work in dependency order: types, helpers, styles, hooks, atoms, compositions, showcase; do not import business rules/auth/providers from PraticarFront. Preserve public exports and use CSS Modules and semantic tokens. Keep `web/library` independent of Next, and keep `showcase/portal` as a consumer of `@forge-ui/web`.

Use actual commands and outputs for verification, classify passed/failed/not_run/blocked. Update SC and migration status before claiming completion. Do not alter original PraticarFront, create a Git remote, connect consumers, or publish packages without a matching authorized phase.
