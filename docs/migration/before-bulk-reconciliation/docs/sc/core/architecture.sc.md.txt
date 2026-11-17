---
title: "Forge UI — Architecture"
scope: "Dependency boundaries and initial web library/showcase implementation"
---

# Architecture

- **Independent library**: `web/library/` is React/TypeScript and CSS Modules. Its public interface is `@forge-ui/web`; Next is not a dependency.
- **Showcase**: `showcase/portal/` is a Next.js application (version aligned with source declarations), importing the public library exports and CSS tokens. It is documentation/demo only, with no Praticar login, backend or business APIs.
- **App**: `app/library/` reserves Flutter work and is intentionally not implemented.
- **Tokens**: keep current semantic CSS tokens in web; document cross-platform token extraction before trying to generate Flutter equivalents.
- **SC-first**: new component, refactor or behavioral change starts as a specification; criteria and evidence govern statuses.
- **Consumer integration**: Git submodules are a separate future phase; no assumption that changes propagate automatically.

Dependency direction: showcase → public library → library types/styles. Shared tokens may be imported by web/app adapters only after their platform-agnostic contract is defined. All source copied from PraticarFront must be inventoried. Avoid duplicate React installations and application-owned providers. Examples and controls live only in showcase.
