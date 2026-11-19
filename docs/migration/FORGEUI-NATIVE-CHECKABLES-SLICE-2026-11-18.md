# ForgeUI — controles nativos Checkbox, Radio e Switch (18/11/2026)

## Escopo e fluxo

Entrega incremental no `AiWorkspace/ForgeUI`, executada na ordem **sc-author → sc-implementer**. Foram atualizadas as SCs canônicas de `Checkbox`, `Radio` e `Switch` em `docs/sc/app/ds/components/atoms/` e criada a TECH `docs/sc/app/tech-native-checkables.sc.md` antes de escrever a implementação compartilhada.

## Código publicado no Google Drive

- `app/library/lib/src/components/forge_checkable.dart`: removidos `package:flutter/material.dart`, `Material`, `InkWell` e o símbolo `kMinInteractiveDimension`; preservados construtores e os contratos públicos de `ForgeCheckbox`, `ForgeRadio` e `ForgeSwitch`. Interação via `Focus` + `GestureDetector`, eventos de teclado por `KeyDownEvent`, suporte Enter/Espaço, `Semantics` de checked/toggled, controle de disabled, foco e callback.
- `app/library/test/forge_native_checkables_test.dart`: novos testes de widget para os quatro temas, toque, Enter/Espaço, comportamento controlado sem mutação local, desabilitado, Radio e Switch. **Não executados** por indisponibilidade de Flutter/Dart neste ambiente.
- `scripts/check-native-checkables.mjs`: verifica fronteira sem Material/Cupertino e presença de comportamento de foco, gestos, teclado, formulários e semântica.
- `scripts/test-native-checkables.mjs`: testes Node com três mutações negativas (import Material, InkWell, remoção da tecla Enter), além da fonte limpa.
- `package.json`: `npm run test:native-checkables` incluído no `check:cross-platform` existente, preservando os demais scripts.

## Evidências

- **PASS** `git apply --check` do patch original sobre o conteúdo exato da fonte do Drive anterior à alteração; arquivo resultante idêntico, byte a byte, à nova fonte enviada.
- **PASS** `node scripts/check-native-checkables.mjs` em estrutura de fonte isolada.
- **PASS** `node scripts/test-native-checkables.mjs`: fonte limpa aprovada; três mutações negativas foram rejeitadas; restauração aprovada.
- **PASS** `node --check` dos dois scripts Node.
- **NÃO EXECUTADO** `dart format`, `flutter analyze`, `flutter test`, build Android/iOS, validação de leitor de tela, paridade visual Web × Flutter e pipeline do repositório completo. Os testes Dart foram **escritos**, não executados.
- **SCs permanecem `PENDING`**. A compilação das 221 prévias Flutter do checkpoint anterior não certifica este código mais recente.

## Limites e próximos passos

- `48.0` dp substitui o valor equivalente de `kMinInteractiveDimension`; ainda falta criar ou reutilizar o token semântico de tamanho mínimo e comprovar a geometria real.
- Ainda existem imports e widgets Material em outras famílias e adaptadores; não anunciar independência global.
- Executar no checkout completo: `npm run test:native-checkables`, `dart format --output=none --set-exit-if-changed app/library/lib/src/components/forge_checkable.dart app/library/test/forge_native_checkables_test.dart`, `flutter analyze`, `flutter test`, `npm run check:cross-platform`, inspeção de teclado/acessibilidade e comparação visual nas plataformas.
- Revisar comportamento do grupo Radio e integração de formulário antes de aceitar paridade completa; o teste atual apenas cobre a ativação unitária.
- Nenhum commit/push Git e nenhuma atualização de `PraticarApp`, `PraticarFront` ou gitlink foram realizados nesta etapa.
