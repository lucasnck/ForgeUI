---
title: "Forge UI — Start Here"
scope: "Navigation and working protocol for Forge UI SC authoring and implementation"
---

# Start Here

The canonical source is the Forge UI `PLAN.md`. Read `architecture.sc.md`, affected resource SC, and migration inventory; compare PraticarFront source when applicable. Follow **SC-first**: demand → SC `PENDING` → authorized implementation → verify → `DONE` only when criteria are proven. There is no `APPROVED` status gate.

| Work | Current owner |
| --- | --- |
| Library API, TS types, CSS Modules, tokens | `web/library/src/design-system/` |
| React/Next preview, controls, catalog and documentation | `showcase/portal/` |
| Future app components | `app/library/` (not yet implemented) |
| Source provenance and migration evidence | `docs/migration/` |

Resource specifications include title, scope, status, type and ds-level; declare meaningful criteria; do not copy a `DONE` status from PraticarFront without Forge UI verification. Library code imports no Praticar business features. Showcase can depend on library; library must not import showcase.

## One-command developer workflow

[One-command workflow](feature-one-command-workflow.sc.md) is the canonical contract for portable Node bootstrap, root workspace installation, `doctor`, `check` and starting the showcase. Read it before editing scripts or package-manager behavior.
