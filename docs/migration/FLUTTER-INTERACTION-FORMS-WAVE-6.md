# Flutter — interações, listas e formulários

## Escopo

Implementação dos próximos grupos por dependência, preservando o PraticarFront e as APIs públicas existentes:

- 26 entradas de catálogo em oito famílias: ChoiceGroup, CheckboxGroup, RadioGroup, Tabs, Toolbar, Disclosure, Collapse e Accordion, incluindo suas partes canônicas em contexto.
- 14 entradas em quatro famílias: List, Form, FormField e FormFieldInput, com cabeçalhos, corpos, rodapés e itens reais.
- Controles de cenário separados das propriedades Dart, estado controlado, recusa de solicitações, desabilitação, edição de modelos, validação, cancelamento de envio/reset e snippets completos.
- RadioGroup agora oferece navegação por setas, direção RTL, salto de membros desabilitados e uma entrada de tabulação. Notificações false não selecionam outro valor.
- FormField associa hint/error atuais à semântica do controle e expõe o estado inválido, preservando foco e valores.

Partes como TabPanel e FormFooter são demonstradas no proprietário correto. Esse inventário não representa componentes independentes adicionais nem aceite integral das SCs.

## Evidências em atualização

- Prévias de interação e snippets: 138 testes passaram, incluindo 320 pontos lógicos nos quatro temas.
- Regressões da biblioteca: testes de teclado do RadioGroup e semântica do FormField passaram; repetição integral no pipeline.
- Listas/formulários: snippets compilados e testes comportamentais incluídos no pipeline.
- Pipeline: [flutter-wave6-build.log](validation/flutter-wave6-build.log).
- [Plano consolidado](../../PLAN.md) e [relatório](FLUTTER-IMPLEMENTATION-REPORT.md).

O manifesto só recebe novas entradas após análise, testes e build Flutter Web aprovados. Aceite visual em navegador/dispositivos nativos continua pendente; as SCs permanecem PENDING onde seus critérios não foram comprovados.

## Checkpoint compilado

Pipeline aprovado: 117 testes na biblioteca, 569 no showcase e 108 prévias registradas. Contagens históricas desta etapa; consulte o relatório consolidado para o estado atual.
