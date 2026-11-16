# Forge UI — Showcase V2 parity matrix (incremental)

Baseline: `PraticarFront/src/features/showcase-v2/model/showcase-v2-index.ts` and `.../showcase-v2-resources.ts`. Original metadata stored without fabricated preview links at `showcase/portal/src/features/showcase-v2/catalog.ts`.

| Nível | Origem | Preview no Forge | Pendentes ou sem preview |
|---|---:|---:|---:|
| atoms | 115 | 13 | 102 |
| molecules | 86 | 0 | 86 |
| organisms | 14 | 0 | 14 |
| templates | 6 | 0 | 6 |

**Total:** 221 original component pages; 13 active preview routes. **Resources:** 33 entries, no preview routes migrated yet.

New library-only public export: `ShowcasePageTemplate`, adapted without edits from original source. Other newly added public DS components: Select, Container, Inline, Stack, Surface, SimpleGrid, Link.

Selection rule: only `status="preview"` appears as a working navigation link. `library-only` means a component may be imported from `@forge-ui/web` but does not yet have a dedicated V2 preview. `pending` means no runtime parity claim.

For the full per-item mapping, inspect `catalog.ts`; each entry carries the exact origin `specification` path, level and status.
