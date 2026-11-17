# Forge UI

Design system extraído do PraticarFront, com biblioteca React/TypeScript independente de Next e um portal de Showcase V2. A biblioteca Flutter possui tokens, temas e um primeiro Button com prévia Web compilada; os demais widgets permanecem pendentes.

## Executar

- Windows: `forge.cmd start`.
- macOS: `./forge.command start` ou `./forge.sh start`.
- Linux: `./forge.sh start`.

O launcher prepara Node.js e dependências pela raiz. Portal: http://localhost:3000. `npm run check` executa testes de migração/store, auditorias, tipos da biblioteca/portal e build. Consulte [execução local](docs/integration/local-setup.md).

## Estado atual

- 221 componentes com implementação, export público e definições originais ligadas ao portal.
- 33 páginas de recursos, incluindo hooks e estilos, e demonstrações completas de templates.
- 221 especificações de componentes e auditoria documental sem links internos quebrados.
- Tipos e build estático verificados; **paridade visual, testes interativos e acessibilidade ainda pendentes**.
- Next.js 16.4.6; permanece um alerta alto do npm no Zod 3, cuja correção requer migração para Zod 4.

Veja [status atual](docs/migration/STATUS.md), [cobertura por item](docs/migration/COVERAGE.md), [evidências](docs/migration/VALIDATION.md) e [plano](PLAN.md). O histórico anterior do README está preservado em [arquivo de migração](docs/migration/README-before-bulk.md).

## Organização

- `web/library/`: componentes, hooks, estilos, tipos e suporte genérico; API `@forge-ui/web`.
- `showcase/portal/`: catálogo, exemplos originais e fluxos de demonstração.
- `docs/sc/`: contratos, catálogos e templates; fluxo SC-first e agentes em `.github/agents/`.
- `docs/migration/`: proveniência, hashes, cobertura, reconciliações e conteúdo histórico preservado.
- `shared/tokens/`: definições canônicas e geração determinística de CSS/Dart.
- `app/library/`: biblioteca Flutter inicial; `app/showcase_flutter/` produz a prévia embutida no mesmo portal. Consulte a [validação multiplataforma](docs/migration/MULTIPLATFORM-IMPLEMENTATION.md).

## Limites

A extração usa o checkout local do PraticarFront e não o modifica. SCs da origem conservam seu status histórico; não certificam o aceite no Forge. Não houve publicação NPM, push Git ou integração de consumidores. O logo aprovado será fornecido pelo usuário. A integração por submódulo terá atualização deliberada das referências dos consumidores.
