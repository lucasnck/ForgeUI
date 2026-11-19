---
title: "Forge UI — Architecture"
scope: "Dependency boundaries and initial web library/showcase implementation"
---

# Architecture

- **Independent library**: `web/library/` is React/TypeScript and CSS Modules. Its public interface is `@forge-ui/web`; Next is not a dependency.
- **Showcase**: `showcase/portal/` is a Next.js application (version aligned with source declarations), importing the public library exports and CSS tokens. It is documentation/demo only, with no Praticar login, backend or business APIs.
- **App**: `app/library/` contains generated Dart tokens, theme adapters, shared visual enums, Button, Spinner and ButtonGroup. `app/showcase_flutter/` compiles their embedded previews for the existing portal; complete parity, other widgets and native/visual acceptance remain pending.
- **Tokens**: canonical definitions live in `shared/tokens/`. Generation preserves the approved CSS byte for byte and produces 184 portable Dart tokens across four themes. Browser-only values remain explicitly classified; visual root-size equivalence remains unverified.
- **SC-first**: new component, refactor or behavioral change starts as a specification; criteria and evidence govern statuses.
- **SC granularity**: one FEATURE covers one coherent consumer-facing outcome; each TECH covers one cohesive technical capability or integration, not a collection of unrelated frameworks/changes. A FEATURE can depend on multiple TECHs, but do not split a single adapter by method/file. Independent Web and Flutter adapters may each have their own TECH; shared token generation is another owner. The catalog parity audit owns evidence and checks only; Flutter widget corrections are governed by component SCs, Dart snippet formatting by its TECH, and the Flutter preview surface by its TECH. `docs/sc/core-template.sc.md` is authoritative for the decision rubric.
- **Consumer integration**: Git submodules are a separate future phase; no assumption that changes propagate automatically.

Dependency direction: showcase → public library → library types/styles. Shared tokens may be imported by web/app adapters only after their platform-agnostic contract is defined. All source copied from PraticarFront must be inventoried. Avoid duplicate React installations and application-owned providers. Examples and controls live only in showcase.

## Target architecture — Forge-owned UI

The public React library uses native React/DOM behavior and Forge-owned styles; the Flutter library uses Flutter rendering/widgets/semantics and `ForgeThemeScope`, not Material/Cupertino UI. Platform engines are allowed. All non-platform production runtime dependencies must be inventoried and migrated via separate TECH SCs, preserving verified behavior. A temporary `ForgeThemeData` Material compatibility adapter remains while individual widgets are migrated. `tech-runtime-independence.sc.md` owns the audit/gates; `tech-flutter-theme-adapter.sc.md` owns only theme distribution. Component SCs own their Material replacements, and the showcase feature owns demo hosting. Do not equate a structural gate with visual parity.
