# Validação da extração local

- Comando integrado: `npm run check` — PASS. Saída: [log completo](validation/bulk-check.log).
- Biblioteca React isolada: TypeScript com todos os arquivos TS/TSX, incluindo testes de contratos de tipos e declarações CSS próprias; sem dependência de Next.
- Portal: TypeScript e Next.js 16.4.6 build estático — PASS. Inclui todas as rotas do catálogo, recursos e demonstrações completas de templates.
- Migração: 2594 hashes da origem preservados; 2550 destinos das árvores principais presentes; zero imports `@/` de aplicação na AST. [Relatório](bulk-migration-audit.json).
- Documentação: [auditoria de links](SC-LINK-REPORT.md), zero referências relativas pendentes na seleção de SCs.
- Idempotência: inventário posterior encontrou zero arquivos a copiar e zero aliases bloqueados. Arquivos adaptados permanecem preservados; o teste de fixtures verifica conflitos e rejeição de origem/destino sobrepostos.
- Origem, bootstrap Windows, consumidores e Git remoto preservados.
- Browser/visual/interação/a11y: **não executados**, pois o acesso ao navegador local não está disponível nesta conversa. Não inferir paridade a partir de build, SSR ou resposta HTTP.
- Não há script de lint configurado neste workspace; lint não é apresentado como aprovado.
- Segurança: Next 16.4.0 substituído pelo patch 16.4.6. O alerta alto do Zod 3 continua pendente; a correção reportada pelo npm exige uma atualização maior. Não aplicar migração silenciosa de schemas.
- Drive e publicação remota: não executados nesta continuação local.

HTTP local: 10 rotas responderam 200, incluindo componentes, templates, recursos e fluxos de demo. Evidência: [HTTP smoke](validation/http-smoke.json). Isso não valida interação no navegador.
