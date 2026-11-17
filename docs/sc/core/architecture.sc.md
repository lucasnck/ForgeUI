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
- **Consumer integration**: Git submodules are a separate future phase; no assumption that changes propagate automatically.

Dependency direction: showcase → public library → library types/styles. Shared tokens may be imported by web/app adapters only after their platform-agnostic contract is defined. All source copied from PraticarFront must be inventoried. Avoid duplicate React installations and application-owned providers. Examples and controls live only in showcase.
