---
title: "ForgeUI Flutter — Native checkable controls"
type: "tech"
status: "PENDING"
platform: "flutter"
owner: "app/library/lib/src/components/forge_checkable.dart"
components:
  - Checkbox
  - Radio
  - Switch
---

# Native Checkables — TECH SC

## Contexto
O arquivo `forge_checkable.dart` centraliza as APIs públicas de `ForgeCheckbox`, `ForgeRadio` e `ForgeSwitch`. A implementação anterior depende de `Material`, `InkWell` e `kMinInteractiveDimension`. O objetivo é preservar os contratos enquanto substituímos a camada de interação por primitivas Flutter de `widgets.dart` e `services.dart`.

## Requisitos de contrato
- Preservar todos os construtores e parâmetros existentes, além dos exports públicos atuais.
- Respeitar `checked`, `defaultChecked`, `onChanged`, `disabled`, `required`, `invalid`, `form`, `name`, `value`, `focusNode`, `autofocus` e `fullWidth`.
- Preservar os estados controlado e não controlado, reset do formulário, validação requerida e radio pertencente ao grupo.
- Expor `Semantics.checked` nos checkbox/radio e `Semantics.toggled` no switch, incluindo estado `disabled`, `focused` e ação de acessibilidade.
- Suportar clique/toque e ativação por Enter/Espaço, exatamente uma alternância por ação, sem ativar quando desabilitado.
- O alvo de toque deve manter pelo menos 48 dp (compatibilidade atual); documentar a futura migração para token semântico sem modificar geometria neste recorte.
- Não introduzir dependência Material/Cupertino na implementação; usar apenas classes do SDK Flutter e tokens existentes do ForgeUI.
- Respeitar `MediaQuery.disableAnimations` e a opção `animated` já implementada.

## Critérios de aceite
- [ ] Código fonte editado sem imports Material/Cupertino, `Material(` ou `InkWell(`.
- [ ] `dart format` e `flutter analyze` aprovados na árvore real.
- [ ] Widget tests para toque, Enter, Espaço, foco, disabled e estado controlado/não controlado, em todos os 4 temas.
- [ ] Tests do formulário, reset, validação requerida, mensagens semânticas e redução de movimento.
- [ ] Inspeção de teclado, leitor de tela e hit target em Android e iOS.
- [ ] Paridade observável Web x Flutter aprovada.

Não marcar as SCs de `Checkbox`, `Radio` e `Switch` como `DONE` antes das evidências. O patch local é uma proposta de implementação; não é aceite de dispositivo, commit ou publicação Git.
