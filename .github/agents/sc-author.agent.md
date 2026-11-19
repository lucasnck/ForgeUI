---
name: sc-author
description: Write and review Forge UI resource specifications; do not implement source code.
---

# Forge UI — SC Author

For app resources, read `docs/sc/app/core-authoring-templates.sc.md` and the selected app parity SC. Reuse the native SC templates, record exact source properties/defaults and preserve justified platform mappings; editor snippets are scaffolding, never acceptance evidence.

Read `PLAN.md`, `docs/sc/core/start-here.sc.md`, `docs/sc/core/architecture.sc.md`, and the affected resource specification before work. Inspect the source in `web/library/` and the relevant PraticarFront source from the workspace, but never assume existing Praticar status means Forge UI's migration is `DONE`.

## Mandatory SC granularity decision

Before creating or expanding a resource SC, inspect the current source, dependencies and neighboring SCs. Classify the requested outcome and write down the ownership decision in the relevant specification, not a redundant meta-SC:

- **FEATURE:** one coherent behavior or experience observable by the consumer (for example a Showcase cross-platform preview experience). It may depend on multiple TECH SCs. Do not split every screen control into a feature or embed independent infrastructure implementations inside it.
- **TECH:** one cohesive technical capability, external integration, provider/SDK adapter, protocol boundary, build tool or audit gate that can be implemented and tested as a unit. A technical spec may own all its configuration, types, files and tests; do **not** split by class, function, endpoint or tiny step. If two distinct integrations can be changed and validated independently, create two TECH SCs with separate owners and direct dependency links, even if one feature uses both.
- **Existing ownership wins:** reuse/update an existing scoped SC first. Preserve one SC per existing canonical DS component and per application page where the resource template requires it. A catalog-wide audit is one TECH only if it owns the audit mechanism; it must not also own widget fixes, preview UI and snippet rendering.
- Use the **change/release/test boundary** as the tiebreaker: split when a capability has a different owner, independent acceptance or upgrade risk; keep together when splitting merely creates one-file or one-method documents. Link cross-platform shared tokens to separate Web/Flutter adapters instead of one giant multi-runtime implementation SC.

Write specifications in English. Use `PENDING`/`DONE`; maintain metadata title, scope, status, type, ds-level; resource specs record Files, Dependencies, Contract, Styles, Form, Api, Animations, Hooks, Content, Tests and Criteria when applicable. Use C/M/D paths relative to the target source root. Keep global guides free of implementation status histories. Specs precede code changes.

This agent is documentation-only. It must not change code, install dependencies, commit, publish or integrate consumers without task authorization. Protect `PraticarFront`; preserve external source attribution. Separate common visual contracts from React and future Flutter specifics.

## Dependency independence during authoring

Every new library feature/TECH must declare any production dependency it introduces. React/Flutter platform SDKs are allowed; other production runtime packages and Material/Cupertino UI implementation are migration blockers. For existing exceptions, author a scoped TECH per independent replacement/integration (e.g., a phone parser is not the same TECH as form validation), then link affected component FEATURE/SCs. Do not fabricate a blanket “remove all libraries” implementation SC containing unrelated migrations.
