# ForgeUI — Onda 9: inventário dos 221 contratos e redução de Material

Data: 18/11/2026. Fonte: `AiWorkspace/ForgeUI` no Google Drive; código Flutter de produção lido do repositório de arquivos do Drive nesta passagem. **Não equivale a build nativo concluído.**

## Escopo e implementação

Após as TECH SCs `docs/sc/app/tech-native-platform-boundary-wave9.sc.md` e `docs/sc/app/tech-native-select-recipe.sc.md`, foi preparado o incremento nativo dos seguintes arquivos, preservando os construtores, tokens, cores, tamanhos, pesos, defaults e contratos públicos:

- `app/library/lib/src/components/internal/configured_input.dart`: import Flutter `widgets.dart` em vez de `material.dart`; mantém `services.dart` para edição/entrada.
- `app/library/lib/src/helpers/schematic_map_renderer.dart`: pintura de mapa, semântica, escala tipográfica e cores Forge permanecem idênticas; import substituído por `widgets.dart`.
- `app/library/lib/src/components/forge_o_data_filter.dart`: passa a importar `widgets.dart` e `services.dart`; mantém configurações de tipo de entrada, callbacks e composições.
- `app/library/lib/src/components/forge_modal.dart`: remove o único `Material(type: MaterialType.transparency)` que envolvia `ForgePresence`; `Builder` preserva a árvore de overlay/foco/semântica e deixa a superfície visual a cargo de `ForgeSurface` e tokens, como antes.
- `app/library/lib/src/theme/forge_control_style.dart` e `components/forge_select.dart`: a antiga receita Material usada apenas para resolver a cor de fundo foi substituída pela receita nativa `ForgeNativeActionRecipe.background` já compartilhada com Button/IconButton; a API do Select, estados e tokens permanecem iguais. O restante da implementação de Select ainda depende de Material.

## Auditoria geral (não apenas as quatro mudanças)

Matriz gerada a partir de `native-component-api.json`, `component-contracts.json`, fontes Dart e `pubspec.yaml`, com um registro por contrato:

| Métrica | Resultado da inspeção estática |
| --- | ---: |
| Contratos Web e Flutter esperados | 221 / 221 |
| Arquivos Dart verificados no snapshot do Drive | 128 |
| Fontes e símbolos Dart ausentes dos contratos | 0 |
| Imports relativos sem destino | 0 |
| Arquivos de produção com import direto de Material/Cupertino | 12 → 7 |
| Contratos com import direto na sua fonte | 7 |
| Contratos com dependência Material/Cupertino transitiva | 146 |
| Dependências externas runtime declaradas no Flutter | `phone_numbers_parser` |
| Fonte DM Sans gerada como token Dart | Não |
| Base rem=16px confirmada | Não (`rootFontSizeVerified=false`) |

A contagem transitiva mostra impacto **compartilhado**, não prova que 146 classes sejam visualmente Material. O strict gate permanece falhando enquanto houver qualquer exceção. O alcance de 221 refere-se aos contratos registrados, **não** ao aceite funcional/visual.

## Testes efetivamente executados

- PASS: `node --check scripts/audit-native-independence.mjs`.
- PASS: `node --check scripts/test-native-independence.mjs`.
- PASS: `node scripts/audit-native-independence.mjs --check --max-platform-imports=7 --write-report` no snapshot reconstruído dos arquivos do Drive.
- PASS: `node scripts/test-native-independence.mjs`: contagem de 221, integração de source graph, testes negativos com import `material.dart`, `cupertino.dart` e import relativo inexistente.
- **NÃO EXECUTADO:** `dart format`, `flutter analyze`, `flutter test`, builds Android/iOS, comparação visual contra CSS da Web, leitores de tela e smoke test dos 221 cenários em dispositivo. Não há Dart/Flutter SDK disponível nesta execução.

## Pendente para independência total

1. Migrar `forge_input.dart` e o controle Material restante em `forge_select.dart` com equivalência de teclado, formulários, overlays, estados e tokens da Web. O helper de estilo legado já utiliza a receita nativa, mas o Select em si ainda importa Material.
2. Migrar `forge_slider.dart`, `forge_color_input.dart` e `forge_temporal_input.dart` com primitivas nativas, validação local, internacionalização e gestos.
3. Migrar a camada temática `ForgeThemeTokens`/`ForgeThemeData` e o host Flutter sem quebrar os consumidores Material legados antes de haver compatibilidade isolada.
4. Substituir `phone_numbers_parser` sob TECH própria que preserve regras internacionais e casos-limite.
5. Resolver fonte/escala DM Sans e `rem`, verificar visualmente 4 temas (light/dark/contrast/liquid-glass), responsividade, touch targets, RTL, alto contraste e movimento reduzido.
6. Rodar `npm run audit:native-independence:strict` e testes Flutter/Android/iOS no checkout completo, sem exceções, antes de marcar SCs DONE.

Nenhuma modificação em PraticarFront, PraticarApp, Git remoto ou submódulos. As SCs continuam PENDING.
