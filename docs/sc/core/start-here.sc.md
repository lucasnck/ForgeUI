---
title: "Forge UI — Start Here"
scope: "Navigation and working protocol for Forge UI SC authoring and implementation"
---

# Start Here

The canonical source is the Forge UI `PLAN.md`. Read `architecture.sc.md`, affected resource SC, and migration inventory; compare PraticarFront source when applicable. Follow **SC-first**: demand → SC `PENDING` → authorized implementation → verify → `DONE` only when criteria are proven. Before authoring, apply the [FEATURE/TECH granularity rubric](../core-template.sc.md): one consumer outcome per FEATURE; one independently testable technical capability per TECH; reuse existing owners and create separate TECHs for separate integrations, without micro-SCs per method. There is no `APPROVED` status gate.

| Work | Current owner |
| --- | --- |
| Library API, TS types, CSS Modules, tokens | `web/library/src/design-system/` |
| React/Next preview, controls, catalog and documentation | `showcase/portal/` |
| Flutter tokens, themes, Button, Spinner and ButtonGroup | `app/library/`; complete parity, remaining widgets and native/visual acceptance pending |
| Source provenance and migration evidence | `docs/migration/` |

Resource specifications include title, scope, status, type and ds-level; declare meaningful criteria; do not copy a `DONE` status from PraticarFront without Forge UI verification. Library code imports no Praticar business features. Showcase can depend on library; library must not import showcase.

## One-command developer workflow

[One-command workflow](feature-one-command-workflow.sc.md) is the canonical contract for portable Node bootstrap, root workspace installation, `doctor`, `check` and starting the showcase. Read it before editing scripts or package-manager behavior.

## Web / app parity authoring

Use the [app authoring templates and editor snippets](../app/core-authoring-templates.sc.md) for native widgets, local controllers, pure helpers and app SCs.

Read the [app parity rules and property mappings](../app/core-web-app-parity.sc.md) and [app specification coverage](../app/core-app-parity-catalog.sc.md) before extending Flutter widgets. Preserve existing Web capabilities; proposed APIs remain PENDING until implementation and acceptance evidence.
