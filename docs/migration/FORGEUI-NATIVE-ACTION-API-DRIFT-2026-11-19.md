# ForgeUI — diagnóstico de drift da API Flutter (19/11/2026)

## Sintoma

Captura do usuário: `flutter analyze` em `app/library` reportou 11 issues, incluindo getters não encontrados em `ForgeNativeActionRecipe` (`animationDuration`, `tapTargetSize`, `backgroundColor`, `side`) e `ForgeAppearance?` não atribuível a `ForgeAppearance`. Como o print corta o caminho dos arquivos e a lista completa, esses são apenas os erros visíveis; não alegar que os 11 foram corrigidos.

## Causa e fonte de verdade

O código verificado no Drive tem `ForgeNativeActionRecipe.duration`, `.height`, `.background`, `.border`/`.borderWidth` e `.decoration(...)`, usado em `forge_action.dart`. O valor de aparência é produzido por `resolveForgeAppearance(...)`, não anulável. Os nomes rejeitados no print não aparecem no consumidor atual do Drive. Portanto, o checkout local provavelmente contém versões desencontradas; é necessário comparar `git diff` antes de sincronizar.

## Correções aplicadas no Drive

- `scripts/check-native-actions.mjs`: substitui expectativa desatualizada `ButtonStyle` do helper legado pelo tipo `ForgeNativeActionRecipe`, valida membros declarados versus membros acessados, e valida aparência resolvida não nula.
- `scripts/test-native-actions.mjs`: 10 regressões negativas, inclusive quatro getters inexistentes e aparência anulável.
- `scripts/build-flutter-preview.mjs`: executa o preflight estático antes do `flutter analyze`, com diagnóstico de inconsistência.
- `forge_native_action_recipe.dart`: converte índice de `FontWeight.values` explicitamente para `int`, sem alterar escala.
- TECH, PLAN e STATUS atualizados; os nomes de API do `ForgeAction` não foram trocados nem foram adicionados aliases de compatibilidade que esconderiam o drift.

## Evidências e limites

`node scripts/check-native-actions.mjs`: PASS.
`node scripts/test-native-actions.mjs`: PASS com 10 injeções de erro detectadas.
**Não executados:** `flutter analyze`, `flutter test`, build Web, teste visual; a compilação do checkout Windows depende da sincronização dos arquivos e dos erros não exibidos no print.

Próximo passo local: revisar diferenças em `app/library/lib/src/components/internal/forge_action.dart` e `app/library/lib/src/theme/{forge_native_action_recipe.dart,forge_control_style.dart,forge_action_palette.dart}`, aplicar pacote selecionado com backup, executar `npm run test:native-actions`, `flutter analyze` e só depois `npm run build:flutter-preview`.
