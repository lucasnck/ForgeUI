# Loaders originais — referência para migração progressiva

Snapshots literais do PraticarFront; **não compilados nem utilizados** no portal Forge UI nesta etapa. Eles referenciam centenas de demos ainda ausentes no repositório independente.

O adaptador `showcase/portal/src/features/showcase-v2/model/showcase-v2-live-loaders.ts` carrega 16 demos via adaptador e mais 5 com definições V2 originais adaptadas. Ao migrar mais demos, substituir progressivamente os loaders de referência, preservando lazy import, catálogo e testes de contrato.

Os arquivos `core-catalog-ds.sc.md` e `feature-showcase-v2-ds-coverage.sc.md` são **snapshots de referência**, não SCs já reconciliadas com os caminhos e status do Forge UI. Use a matriz gerada em `../COVERAGE.md` para o progresso real.
