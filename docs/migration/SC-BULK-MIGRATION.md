---
title: "Forge UI — Bulk source migration"
scope: "Local bulk extraction and reconciliation of the existing design system and Showcase V2"
status: PENDING
type: feature
ds-level: none
---

# SC — Extração integral e mecanizada do Forge UI

## Objetivo
Migrar os códigos reais do Design System, SCs e Showcase V2 do PraticarFront por cópia de diretório, substituindo o transporte manual arquivo a arquivo. Preservar a proveniência, os exemplos originais e as fronteiras da biblioteca React sem modificar a origem.

## Inputs
- `src/design-system/**` do PraticarFront: componentes, CSS Modules, helpers, hooks, estilos, tipos, tokens, assets, índices e testes.
- `src/features/showcase-v2/**` do PraticarFront: definições, exemplos, hooks, fixtures, catálogo, renderizadores e estilos.
- `docs/sc/ds/**` do PraticarFront: SCs canônicas, incluindo `components/organisms/Form`.

## Regras e invariantes
- Cópia binária/byte-equivalente como primeira etapa; não alterar imports relativos dentro de uma mesma árvore.
- Destino existente é preservado e registrado para reconciliação, não apagado ou sobrescrito sem análise.
- Traduzir `@/design-system` para caminhos locais na biblioteca e para `@forge-ui/web` no Showcase; aliases `@/features/showcase-v2` devem apontar ao próprio Showcase; demais aliases do PraticarFront são bloqueadores a reportar.
- Não traduzir import de código de negócio para um stub silencioso.
- Diferenciar `source-copied`, `import-adjusted`, `compile-ok`, `runtime-ok`, `parity-ok` em métricas.
- O PraticarFront, o `forge.ps1`, consumidores e Git remoto não são alterados.
- Local execution uses the complete sibling checkout. Preserve destination adaptations and reconcile shared infrastructure through library-owned contracts, formatting, preferences and form adapters; never introduce authentication or application business dependencies.
- Reports must hash the actual preserved destination separately from the proposed transformed source, and detect unresolved imports in the actual destination. Reject overlapping source/target trees and do not follow source symlinks.
- Keep a source hash inventory so verification can demonstrate the source trees were not modified.
- All component and template routes consume the complete source definition loader through `ShowcaseV2Entry`; resource routes consume `ShowcaseV2ResourceEntry`. A catalog entry is counted as wired only when its definition and public component implementation exist. Runtime and visual acceptance remain separate.
- Reconcile legacy SC paths as redirects to canonical `docs/sc/ds/components` specifications. Build the Forge catalog from its actual coverage matrix, preserving the original mixed application catalog as a before-image rather than importing Praticar business resources into the active Forge catalog.
- Typecheck the complete React library independently of Next, including its type-contract tests and explicit CSS Modules declarations. Root typecheck verifies both library and portal.
- Apply compatible security patch releases to the extracted portal when registry audit identifies a concrete vulnerable dependency; record before/after versions and rerun typecheck/build. Do not update the PraticarFront dependency declarations.
- The standard `check` command audits only local targets and must not require the original checkout. `audit:bulk` separately verifies original source hashes when the source checkout is available, without overwriting that evidence during target-only verification.

## Critérios de aceite
1. Manifesto completo com hashes, origem, destino, conflito, eventuais alterações e relatório de imports irresolvidos.
2. Todos os arquivos pertinentes do código-fonte disponível copiados/conciliados, sem perder a árvore original nem SCs.
3. Exports públicos/registry/V2 consistentes com implementações realmente presentes; adapter provisório identificado.
4. Verificações de import/sintaxe e, quando possível, `typecheck`, build, testes, browser/a11y.
5. `PLAN`, `STATUS`, cobertura e ZIP do Forge UI atualizados no Drive.

## Não objetivos
Reimplementar componentes que só existem como SC, portar Flutter já, publicar NPM ou modificar consumidores nesta migração.
