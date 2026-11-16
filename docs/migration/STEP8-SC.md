# Forge UI — Marco 8: eliminar adaptadores do Showcase V2

Status: DRAFT (SC-first, implementação e aceite pendentes)
Fonte: ForgeUI/docs/migration/STATUS.md, marco 7 (2026-11-14).

## Objetivo
Migrar as definições V2 originais dos 16 componentes já exportados que ainda usam demos adaptadas: Input, Textarea, Checkbox, Switch, Radio, Heading, Text, Label, Spinner, Divider, Icon, Badge, VisuallyHidden, Button, Card e DataGrid.

## Estratégia
1. Para cada componente, transportar `definition.ts`, fixture/example, hook de exemplo e `usage-code.ts` da origem, preservando os arquivos originais e registrando o hash.
2. Ajustar imports da origem para `@forge-ui/web` e adaptadores locais somente quando indispensável; não replicar componentes no portal.
3. Atualizar o lazy loader, manter o fallback do adaptador enquanto o original não estiver validado.
4. Atualizar a matriz por gerador; não alterar o total de 43 exports por portar somente demos.
5. Executar `npm run coverage`, `npm run verify:v2`, `npm run verify:docs`, typecheck e build. Sem dependências, registrar BLOCKED, sem declarar conclusão.

## Critérios de aceite
- Cada demo nova contém cenários nomeados, edição/reset e snippet coerente com API pública.
- Demos presentes no catálogo somente após sua integração no loader.
- 16 adaptadores removidos apenas quando todos os cenários funcionarem.
- Nenhuma alteração no PraticarFront, no bootstrap Windows, no Git remoto ou nos consumidores.
