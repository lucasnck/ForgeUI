// Generated from actual copyable native interaction snippets.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';
// Canonical parts are created by their native owner, not duplicated focus owners: DataGrid.
const snippetContracts0=<String,Map<String,Map<String,Object?>>>{"data-grid":{"label":{"kind":"text","defaultValue":"Registros","nonblank":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"empty":{"kind":"boolean","defaultValue":false},"fullWidth":{"kind":"boolean","defaultValue":true},"showBorders":{"kind":"boolean","defaultValue":true},"showColumnLines":{"kind":"boolean","defaultValue":false},"showRowLines":{"kind":"boolean","defaultValue":true},"rowAlternationEnabled":{"kind":"boolean","defaultValue":true},"size":{"kind":"select","options":["sm","md","lg"],"defaultValue":"md"}}};
const snippetFamilies0=<String,String>{"data-grid":"data-grid"};
class AdvancedSnippet0 extends StatefulWidget {final String slug='data-grid';final Map<String,Object?> properties=const {"label": "Registros", "acceptChanges": true, "empty": false, "fullWidth": true, "showBorders": true, "showColumnLines": false, "showRowLines": true, "rowAlternationEnabled": true, "size": "md"};const AdvancedSnippet0({super.key});@override State<AdvancedSnippet0> createState()=>_AdvancedSnippetState0();}
class _AdvancedSnippetState0 extends State<AdvancedSnippet0> {
  int requests = 0, screen = 0;
  String result = '';
  ForgeDataGridSort? sort;
  List<String> expanded = [];
  late ForgeODataFilterExpression expression;
  String get family => snippetFamilies0[widget.slug]!;
  Object? prop(String k) =>
      widget.properties[k] ??
      snippetContracts0[widget.slug]?[k]?['defaultValue'];
  String text(String k) => prop(k) as String;
  bool flag(String k) => prop(k) == true;
  T choice<T extends Enum>(String k, List<T> values) =>
      values.firstWhere((v) => v.name == prop(k));
  @override
  void initState() {
    super.initState();
    expanded = flag('expanded') ? ['parent'] : [];
    expression = ForgeODataFilterGroupData(
        id: 'root',
        operator: ForgeODataFilterConjunction.and,
        children: [
          createForgeODataFilterCondition(amount, 'amount-condition')
        ]);
  }

  @override
  void didUpdateWidget(covariant AdvancedSnippet0 old) {
    super.didUpdateWidget(old);
    if (old.properties['expanded'] != widget.properties['expanded'])
      expanded = flag('expanded') ? ['parent'] : [];
  }

  void event(String value) {
    setState(() {
      requests++;
      result = value;
    });
  }

  static const amount = ForgeODataFilterField(
      id: 'amount',
      path: 'Amount',
      label: 'Valor',
      kind: ForgeODataFilterKind.decimal,
      precision: 40,
      scale: 4);
  static const labels = ForgeODataFilterLabels(
      field: 'Campo',
      operator: 'Operador',
      value: 'Valor',
      remove: 'Remover',
      addCondition: 'Adicionar condição',
      addGroup: 'Adicionar grupo',
      group: 'Grupo',
      and: 'E',
      or: 'Ou',
      apply: 'Aplicar',
      clear: 'Limpar',
      cancel: 'Cancelar',
      all: 'Todos',
      yes: 'Sim',
      no: 'Não',
      minimum: 'Mínimo',
      maximum: 'Máximo',
      invalid: 'Expressão inválida',
      unsupported: 'Expressão não suportada no modo simples',
      operatorLabels: {
        ForgeODataFilterOperator.eq: 'Igual',
        ForgeODataFilterOperator.ne: 'Diferente',
        ForgeODataFilterOperator.contains: 'Contém',
        ForgeODataFilterOperator.startswith: 'Começa com',
        ForgeODataFilterOperator.endswith: 'Termina com',
        ForgeODataFilterOperator.gt: 'Maior',
        ForgeODataFilterOperator.ge: 'Maior ou igual',
        ForgeODataFilterOperator.lt: 'Menor',
        ForgeODataFilterOperator.le: 'Menor ou igual',
        ForgeODataFilterOperator.between: 'Entre',
        ForgeODataFilterOperator.inValues: 'Em'
      });
  Widget field() => const ForgeInput(semanticLabel: 'Conteúdo preservado');
  Widget action() => ForgeButton(
      onPressed: () => event('Ação do consumidor'),
      child: Text(text('actionLabel')));
  Widget grid() {
    final rows = flag('empty') ? <String>[] : ['Beta', 'Alpha', 'Gamma'];
    if (sort != null)
      rows.sort((a, b) => sort!.direction == ForgeSortDirection.ascending
          ? a.compareTo(b)
          : b.compareTo(a));
    return ForgeDataGrid<String>(
        label: text('label'),
        rows: rows,
        getRowKey: (r) => r,
        sort: sort,
        onSortChange: (v) {
          setState(() {
            requests++;
            if (flag('acceptChanges')) sort = v;
          });
        },
        emptyContent: const Text('Nenhum registro'),
        fullWidth: flag('fullWidth'),
        showBorders: flag('showBorders'),
        showColumnLines: flag('showColumnLines'),
        showRowLines: flag('showRowLines'),
        rowAlternationEnabled: flag('rowAlternationEnabled'),
        size: choice('size', ForgeSize.values),
        columns: [
          ForgeDataGridColumn(
              key: 'name',
              header: 'Nome',
              renderCell: Text.new,
              sortable: true,
              sortLabel: 'Ordenar nomes'),
          ForgeDataGridColumn(
              key: 'action',
              header: 'Ação',
              renderCell: (r) => ForgeButton(
                  onPressed: () => event(r), child: const Text('Selecionar')))
        ],
        children: const [
          ForgeDataGridHeader(),
          ForgeDataGridBody(),
          ForgeDataGridFooter(child: Text('Rodapé da tabela'))
        ]);
  }

  Widget treeGrid() => ForgeTreeGrid<String>(
      label: text('label'),
      nodes: [
        ForgeTreeGridNode(
            key: 'parent',
            item: 'Equipe',
            children: [ForgeTreeGridNode(key: 'child', item: 'Pessoa')])
      ],
      getNodeLabel: (r) => r,
      expandedValue: expanded,
      onExpandedValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expanded = v;
        });
      },
      direction: choice('direction', ForgeNavigationDirection.values),
      animated: flag('animated'),
      columns: [
        ForgeTreeGridColumn(key: 'name', header: 'Nome', getCellText: (r) => r),
        ForgeTreeGridColumn(
            key: 'detail',
            header: 'Detalhe',
            getCellText: (r) => r + ' — detalhe')
      ],
      children: const [
        ForgeTreeGridHeader(),
        ForgeTreeGridBody(),
        ForgeTreeGridFooter(child: Text('Rodapé da hierarquia'))
      ]);
  Widget template() {
    final title = Text(text('titleText')),
        body = Column(children: [Text(text('bodyText')), field()]);
    final optional = flag('showSlots');
    return switch (family) {
      'application-layout-template' => SizedBox(
          height: 420,
          child: ForgeApplicationLayoutTemplate(
              header: optional ? title : null,
              navigation: optional ? const Text('Navegação') : null,
              toolbar: optional ? action() : null,
              footer: optional ? const Text('Rodapé') : null,
              mainId: 'forge-demo-main',
              child: body)),
      'showcase-page-template' => ForgeShowcasePageTemplate(
          title: optional ? title : null,
          navigation: optional ? const Text('Catálogo') : null,
          toolbar: optional ? action() : null,
          child: body),
      'home-page' => ForgeHomePageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          quickActions: optional ? action() : null,
          summary: optional ? const Text('Resumo') : null,
          child: body),
      'list-page' => ForgeListPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          filters: optional ? const Text('Filtros') : null,
          pagination: optional ? const Text('Paginação do consumidor') : null,
          child: body),
      'detail-page' => ForgeDetailPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          aside: optional ? const Text('Informações complementares') : null,
          child: body),
      'form-page' => ForgeFormPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          notice: optional ? const Text('Aviso do formulário') : null,
          child: body),
      _ => throw StateError(family)
    };
  }

  Widget transition() => Column(children: [
        ForgeButton(
            onPressed: () => setState(() => screen++),
            child: const Text('Trocar tela')),
        ForgePageTransition(
            screenKey: screen,
            intent: choice('intent', ForgePageTransitionIntent.values),
            animated: flag('animated'),
            child: Text('Tela $screen'))
      ]);
  Widget shared(BuildContext context) => Column(children: [
        ForgeSharedElement(
            name: 'forge-demo-element',
            animated: flag('animated'),
            child: SizedBox(
                width: 240,
                height: 80,
                child: Material(
                    type: MaterialType.transparency,
                    child: Center(child: Text(text('titleText')))))),
        ForgeButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute<void>(
                builder: (context) => Scaffold(
                        body: SafeArea(
                            child: Column(children: [
                      ForgeSharedElement(
                          name: 'forge-demo-element',
                          animated: flag('animated'),
                          child: SizedBox(
                              width: 240,
                              height: 80,
                              child: Material(
                                  type: MaterialType.transparency,
                                  child:
                                      Center(child: Text(text('titleText')))))),
                      ForgeButton(
                          onPressed: () => Navigator.of(context).pop(),
                          child: const Text('Voltar'))
                    ]))))),
            child: const Text('Abrir destino'))
      ]);
  Widget map() => ForgeMapView(
      label: text('label'),
      description:
          'Demonstração esquemática sem navegação nem localização real',
      status: choice('status', ForgeMapViewStatus.values),
      scene: ForgeMapScene(markers: [
        ForgeMapMarker(
            id: 'origin',
            label: 'Origem',
            coordinate:
                const ForgeMapCoordinate(latitude: -23.55, longitude: -46.63),
            kind: ForgeMapMarkerKind.origin)
      ]),
      renderer: const ForgeSchematicMapRenderer(),
      labels: const ForgeMapViewLabelsData(
          loading: 'Carregando mapa',
          empty: 'Sem pontos',
          unavailable: 'Mapa indisponível',
          schematic: 'Mapa esquemático, sem navegação'),
      onRendererError: (e) => event('Falha do renderizador'));
  Widget odata() => ForgeODataFilter(
      mode: choice('mode', ForgeODataFilterMode.values),
      fields: const [amount],
      value: expression,
      onValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expression = v;
        });
      },
      onApply: (v, filter) => event(filter),
      onCancel: () => event('Cancelado'),
      labels: labels,
      disabled: flag('disabled'),
      actionsLayout:
          choice('actionsLayout', ForgeODataFilterActionsLayout.values));
  @override
  Widget build(BuildContext context) =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        switch (family) {
          'data-grid' => grid(),
          'tree-grid' => treeGrid(),
          'page-transition' => transition(),
          'shared-element' => shared(context),
          'map-view' => map(),
          'o-data-filter' => odata(),
          _ => template()
        },
        Text('Solicitações: $requests'),
        if (result.isNotEmpty) Text(result)
      ]);
}

// Canonical parts are created by their native owner, not duplicated focus owners: DataGridHeader.
const snippetContracts1=<String,Map<String,Map<String,Object?>>>{"data-grid-header":{"label":{"kind":"text","defaultValue":"Registros","nonblank":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"empty":{"kind":"boolean","defaultValue":false},"fullWidth":{"kind":"boolean","defaultValue":true},"showBorders":{"kind":"boolean","defaultValue":true},"showColumnLines":{"kind":"boolean","defaultValue":false},"showRowLines":{"kind":"boolean","defaultValue":true},"rowAlternationEnabled":{"kind":"boolean","defaultValue":true},"size":{"kind":"select","options":["sm","md","lg"],"defaultValue":"md"}}};
const snippetFamilies1=<String,String>{"data-grid-header":"data-grid"};
class AdvancedSnippet1 extends StatefulWidget {final String slug='data-grid-header';final Map<String,Object?> properties=const {"label": "Registros", "acceptChanges": true, "empty": false, "fullWidth": true, "showBorders": true, "showColumnLines": false, "showRowLines": true, "rowAlternationEnabled": true, "size": "md"};const AdvancedSnippet1({super.key});@override State<AdvancedSnippet1> createState()=>_AdvancedSnippetState1();}
class _AdvancedSnippetState1 extends State<AdvancedSnippet1> {
  int requests = 0, screen = 0;
  String result = '';
  ForgeDataGridSort? sort;
  List<String> expanded = [];
  late ForgeODataFilterExpression expression;
  String get family => snippetFamilies1[widget.slug]!;
  Object? prop(String k) =>
      widget.properties[k] ??
      snippetContracts1[widget.slug]?[k]?['defaultValue'];
  String text(String k) => prop(k) as String;
  bool flag(String k) => prop(k) == true;
  T choice<T extends Enum>(String k, List<T> values) =>
      values.firstWhere((v) => v.name == prop(k));
  @override
  void initState() {
    super.initState();
    expanded = flag('expanded') ? ['parent'] : [];
    expression = ForgeODataFilterGroupData(
        id: 'root',
        operator: ForgeODataFilterConjunction.and,
        children: [
          createForgeODataFilterCondition(amount, 'amount-condition')
        ]);
  }

  @override
  void didUpdateWidget(covariant AdvancedSnippet1 old) {
    super.didUpdateWidget(old);
    if (old.properties['expanded'] != widget.properties['expanded'])
      expanded = flag('expanded') ? ['parent'] : [];
  }

  void event(String value) {
    setState(() {
      requests++;
      result = value;
    });
  }

  static const amount = ForgeODataFilterField(
      id: 'amount',
      path: 'Amount',
      label: 'Valor',
      kind: ForgeODataFilterKind.decimal,
      precision: 40,
      scale: 4);
  static const labels = ForgeODataFilterLabels(
      field: 'Campo',
      operator: 'Operador',
      value: 'Valor',
      remove: 'Remover',
      addCondition: 'Adicionar condição',
      addGroup: 'Adicionar grupo',
      group: 'Grupo',
      and: 'E',
      or: 'Ou',
      apply: 'Aplicar',
      clear: 'Limpar',
      cancel: 'Cancelar',
      all: 'Todos',
      yes: 'Sim',
      no: 'Não',
      minimum: 'Mínimo',
      maximum: 'Máximo',
      invalid: 'Expressão inválida',
      unsupported: 'Expressão não suportada no modo simples',
      operatorLabels: {
        ForgeODataFilterOperator.eq: 'Igual',
        ForgeODataFilterOperator.ne: 'Diferente',
        ForgeODataFilterOperator.contains: 'Contém',
        ForgeODataFilterOperator.startswith: 'Começa com',
        ForgeODataFilterOperator.endswith: 'Termina com',
        ForgeODataFilterOperator.gt: 'Maior',
        ForgeODataFilterOperator.ge: 'Maior ou igual',
        ForgeODataFilterOperator.lt: 'Menor',
        ForgeODataFilterOperator.le: 'Menor ou igual',
        ForgeODataFilterOperator.between: 'Entre',
        ForgeODataFilterOperator.inValues: 'Em'
      });
  Widget field() => const ForgeInput(semanticLabel: 'Conteúdo preservado');
  Widget action() => ForgeButton(
      onPressed: () => event('Ação do consumidor'),
      child: Text(text('actionLabel')));
  Widget grid() {
    final rows = flag('empty') ? <String>[] : ['Beta', 'Alpha', 'Gamma'];
    if (sort != null)
      rows.sort((a, b) => sort!.direction == ForgeSortDirection.ascending
          ? a.compareTo(b)
          : b.compareTo(a));
    return ForgeDataGrid<String>(
        label: text('label'),
        rows: rows,
        getRowKey: (r) => r,
        sort: sort,
        onSortChange: (v) {
          setState(() {
            requests++;
            if (flag('acceptChanges')) sort = v;
          });
        },
        emptyContent: const Text('Nenhum registro'),
        fullWidth: flag('fullWidth'),
        showBorders: flag('showBorders'),
        showColumnLines: flag('showColumnLines'),
        showRowLines: flag('showRowLines'),
        rowAlternationEnabled: flag('rowAlternationEnabled'),
        size: choice('size', ForgeSize.values),
        columns: [
          ForgeDataGridColumn(
              key: 'name',
              header: 'Nome',
              renderCell: Text.new,
              sortable: true,
              sortLabel: 'Ordenar nomes'),
          ForgeDataGridColumn(
              key: 'action',
              header: 'Ação',
              renderCell: (r) => ForgeButton(
                  onPressed: () => event(r), child: const Text('Selecionar')))
        ],
        children: const [
          ForgeDataGridHeader(),
          ForgeDataGridBody(),
          ForgeDataGridFooter(child: Text('Rodapé da tabela'))
        ]);
  }

  Widget treeGrid() => ForgeTreeGrid<String>(
      label: text('label'),
      nodes: [
        ForgeTreeGridNode(
            key: 'parent',
            item: 'Equipe',
            children: [ForgeTreeGridNode(key: 'child', item: 'Pessoa')])
      ],
      getNodeLabel: (r) => r,
      expandedValue: expanded,
      onExpandedValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expanded = v;
        });
      },
      direction: choice('direction', ForgeNavigationDirection.values),
      animated: flag('animated'),
      columns: [
        ForgeTreeGridColumn(key: 'name', header: 'Nome', getCellText: (r) => r),
        ForgeTreeGridColumn(
            key: 'detail',
            header: 'Detalhe',
            getCellText: (r) => r + ' — detalhe')
      ],
      children: const [
        ForgeTreeGridHeader(),
        ForgeTreeGridBody(),
        ForgeTreeGridFooter(child: Text('Rodapé da hierarquia'))
      ]);
  Widget template() {
    final title = Text(text('titleText')),
        body = Column(children: [Text(text('bodyText')), field()]);
    final optional = flag('showSlots');
    return switch (family) {
      'application-layout-template' => SizedBox(
          height: 420,
          child: ForgeApplicationLayoutTemplate(
              header: optional ? title : null,
              navigation: optional ? const Text('Navegação') : null,
              toolbar: optional ? action() : null,
              footer: optional ? const Text('Rodapé') : null,
              mainId: 'forge-demo-main',
              child: body)),
      'showcase-page-template' => ForgeShowcasePageTemplate(
          title: optional ? title : null,
          navigation: optional ? const Text('Catálogo') : null,
          toolbar: optional ? action() : null,
          child: body),
      'home-page' => ForgeHomePageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          quickActions: optional ? action() : null,
          summary: optional ? const Text('Resumo') : null,
          child: body),
      'list-page' => ForgeListPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          filters: optional ? const Text('Filtros') : null,
          pagination: optional ? const Text('Paginação do consumidor') : null,
          child: body),
      'detail-page' => ForgeDetailPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          aside: optional ? const Text('Informações complementares') : null,
          child: body),
      'form-page' => ForgeFormPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          notice: optional ? const Text('Aviso do formulário') : null,
          child: body),
      _ => throw StateError(family)
    };
  }

  Widget transition() => Column(children: [
        ForgeButton(
            onPressed: () => setState(() => screen++),
            child: const Text('Trocar tela')),
        ForgePageTransition(
            screenKey: screen,
            intent: choice('intent', ForgePageTransitionIntent.values),
            animated: flag('animated'),
            child: Text('Tela $screen'))
      ]);
  Widget shared(BuildContext context) => Column(children: [
        ForgeSharedElement(
            name: 'forge-demo-element',
            animated: flag('animated'),
            child: SizedBox(
                width: 240,
                height: 80,
                child: Material(
                    type: MaterialType.transparency,
                    child: Center(child: Text(text('titleText')))))),
        ForgeButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute<void>(
                builder: (context) => Scaffold(
                        body: SafeArea(
                            child: Column(children: [
                      ForgeSharedElement(
                          name: 'forge-demo-element',
                          animated: flag('animated'),
                          child: SizedBox(
                              width: 240,
                              height: 80,
                              child: Material(
                                  type: MaterialType.transparency,
                                  child:
                                      Center(child: Text(text('titleText')))))),
                      ForgeButton(
                          onPressed: () => Navigator.of(context).pop(),
                          child: const Text('Voltar'))
                    ]))))),
            child: const Text('Abrir destino'))
      ]);
  Widget map() => ForgeMapView(
      label: text('label'),
      description:
          'Demonstração esquemática sem navegação nem localização real',
      status: choice('status', ForgeMapViewStatus.values),
      scene: ForgeMapScene(markers: [
        ForgeMapMarker(
            id: 'origin',
            label: 'Origem',
            coordinate:
                const ForgeMapCoordinate(latitude: -23.55, longitude: -46.63),
            kind: ForgeMapMarkerKind.origin)
      ]),
      renderer: const ForgeSchematicMapRenderer(),
      labels: const ForgeMapViewLabelsData(
          loading: 'Carregando mapa',
          empty: 'Sem pontos',
          unavailable: 'Mapa indisponível',
          schematic: 'Mapa esquemático, sem navegação'),
      onRendererError: (e) => event('Falha do renderizador'));
  Widget odata() => ForgeODataFilter(
      mode: choice('mode', ForgeODataFilterMode.values),
      fields: const [amount],
      value: expression,
      onValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expression = v;
        });
      },
      onApply: (v, filter) => event(filter),
      onCancel: () => event('Cancelado'),
      labels: labels,
      disabled: flag('disabled'),
      actionsLayout:
          choice('actionsLayout', ForgeODataFilterActionsLayout.values));
  @override
  Widget build(BuildContext context) =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        switch (family) {
          'data-grid' => grid(),
          'tree-grid' => treeGrid(),
          'page-transition' => transition(),
          'shared-element' => shared(context),
          'map-view' => map(),
          'o-data-filter' => odata(),
          _ => template()
        },
        Text('Solicitações: $requests'),
        if (result.isNotEmpty) Text(result)
      ]);
}

// Canonical parts are created by their native owner, not duplicated focus owners: DataGridBody.
const snippetContracts2=<String,Map<String,Map<String,Object?>>>{"data-grid-body":{"label":{"kind":"text","defaultValue":"Registros","nonblank":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"empty":{"kind":"boolean","defaultValue":false},"fullWidth":{"kind":"boolean","defaultValue":true},"showBorders":{"kind":"boolean","defaultValue":true},"showColumnLines":{"kind":"boolean","defaultValue":false},"showRowLines":{"kind":"boolean","defaultValue":true},"rowAlternationEnabled":{"kind":"boolean","defaultValue":true},"size":{"kind":"select","options":["sm","md","lg"],"defaultValue":"md"}}};
const snippetFamilies2=<String,String>{"data-grid-body":"data-grid"};
class AdvancedSnippet2 extends StatefulWidget {final String slug='data-grid-body';final Map<String,Object?> properties=const {"label": "Registros", "acceptChanges": true, "empty": false, "fullWidth": true, "showBorders": true, "showColumnLines": false, "showRowLines": true, "rowAlternationEnabled": true, "size": "md"};const AdvancedSnippet2({super.key});@override State<AdvancedSnippet2> createState()=>_AdvancedSnippetState2();}
class _AdvancedSnippetState2 extends State<AdvancedSnippet2> {
  int requests = 0, screen = 0;
  String result = '';
  ForgeDataGridSort? sort;
  List<String> expanded = [];
  late ForgeODataFilterExpression expression;
  String get family => snippetFamilies2[widget.slug]!;
  Object? prop(String k) =>
      widget.properties[k] ??
      snippetContracts2[widget.slug]?[k]?['defaultValue'];
  String text(String k) => prop(k) as String;
  bool flag(String k) => prop(k) == true;
  T choice<T extends Enum>(String k, List<T> values) =>
      values.firstWhere((v) => v.name == prop(k));
  @override
  void initState() {
    super.initState();
    expanded = flag('expanded') ? ['parent'] : [];
    expression = ForgeODataFilterGroupData(
        id: 'root',
        operator: ForgeODataFilterConjunction.and,
        children: [
          createForgeODataFilterCondition(amount, 'amount-condition')
        ]);
  }

  @override
  void didUpdateWidget(covariant AdvancedSnippet2 old) {
    super.didUpdateWidget(old);
    if (old.properties['expanded'] != widget.properties['expanded'])
      expanded = flag('expanded') ? ['parent'] : [];
  }

  void event(String value) {
    setState(() {
      requests++;
      result = value;
    });
  }

  static const amount = ForgeODataFilterField(
      id: 'amount',
      path: 'Amount',
      label: 'Valor',
      kind: ForgeODataFilterKind.decimal,
      precision: 40,
      scale: 4);
  static const labels = ForgeODataFilterLabels(
      field: 'Campo',
      operator: 'Operador',
      value: 'Valor',
      remove: 'Remover',
      addCondition: 'Adicionar condição',
      addGroup: 'Adicionar grupo',
      group: 'Grupo',
      and: 'E',
      or: 'Ou',
      apply: 'Aplicar',
      clear: 'Limpar',
      cancel: 'Cancelar',
      all: 'Todos',
      yes: 'Sim',
      no: 'Não',
      minimum: 'Mínimo',
      maximum: 'Máximo',
      invalid: 'Expressão inválida',
      unsupported: 'Expressão não suportada no modo simples',
      operatorLabels: {
        ForgeODataFilterOperator.eq: 'Igual',
        ForgeODataFilterOperator.ne: 'Diferente',
        ForgeODataFilterOperator.contains: 'Contém',
        ForgeODataFilterOperator.startswith: 'Começa com',
        ForgeODataFilterOperator.endswith: 'Termina com',
        ForgeODataFilterOperator.gt: 'Maior',
        ForgeODataFilterOperator.ge: 'Maior ou igual',
        ForgeODataFilterOperator.lt: 'Menor',
        ForgeODataFilterOperator.le: 'Menor ou igual',
        ForgeODataFilterOperator.between: 'Entre',
        ForgeODataFilterOperator.inValues: 'Em'
      });
  Widget field() => const ForgeInput(semanticLabel: 'Conteúdo preservado');
  Widget action() => ForgeButton(
      onPressed: () => event('Ação do consumidor'),
      child: Text(text('actionLabel')));
  Widget grid() {
    final rows = flag('empty') ? <String>[] : ['Beta', 'Alpha', 'Gamma'];
    if (sort != null)
      rows.sort((a, b) => sort!.direction == ForgeSortDirection.ascending
          ? a.compareTo(b)
          : b.compareTo(a));
    return ForgeDataGrid<String>(
        label: text('label'),
        rows: rows,
        getRowKey: (r) => r,
        sort: sort,
        onSortChange: (v) {
          setState(() {
            requests++;
            if (flag('acceptChanges')) sort = v;
          });
        },
        emptyContent: const Text('Nenhum registro'),
        fullWidth: flag('fullWidth'),
        showBorders: flag('showBorders'),
        showColumnLines: flag('showColumnLines'),
        showRowLines: flag('showRowLines'),
        rowAlternationEnabled: flag('rowAlternationEnabled'),
        size: choice('size', ForgeSize.values),
        columns: [
          ForgeDataGridColumn(
              key: 'name',
              header: 'Nome',
              renderCell: Text.new,
              sortable: true,
              sortLabel: 'Ordenar nomes'),
          ForgeDataGridColumn(
              key: 'action',
              header: 'Ação',
              renderCell: (r) => ForgeButton(
                  onPressed: () => event(r), child: const Text('Selecionar')))
        ],
        children: const [
          ForgeDataGridHeader(),
          ForgeDataGridBody(),
          ForgeDataGridFooter(child: Text('Rodapé da tabela'))
        ]);
  }

  Widget treeGrid() => ForgeTreeGrid<String>(
      label: text('label'),
      nodes: [
        ForgeTreeGridNode(
            key: 'parent',
            item: 'Equipe',
            children: [ForgeTreeGridNode(key: 'child', item: 'Pessoa')])
      ],
      getNodeLabel: (r) => r,
      expandedValue: expanded,
      onExpandedValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expanded = v;
        });
      },
      direction: choice('direction', ForgeNavigationDirection.values),
      animated: flag('animated'),
      columns: [
        ForgeTreeGridColumn(key: 'name', header: 'Nome', getCellText: (r) => r),
        ForgeTreeGridColumn(
            key: 'detail',
            header: 'Detalhe',
            getCellText: (r) => r + ' — detalhe')
      ],
      children: const [
        ForgeTreeGridHeader(),
        ForgeTreeGridBody(),
        ForgeTreeGridFooter(child: Text('Rodapé da hierarquia'))
      ]);
  Widget template() {
    final title = Text(text('titleText')),
        body = Column(children: [Text(text('bodyText')), field()]);
    final optional = flag('showSlots');
    return switch (family) {
      'application-layout-template' => SizedBox(
          height: 420,
          child: ForgeApplicationLayoutTemplate(
              header: optional ? title : null,
              navigation: optional ? const Text('Navegação') : null,
              toolbar: optional ? action() : null,
              footer: optional ? const Text('Rodapé') : null,
              mainId: 'forge-demo-main',
              child: body)),
      'showcase-page-template' => ForgeShowcasePageTemplate(
          title: optional ? title : null,
          navigation: optional ? const Text('Catálogo') : null,
          toolbar: optional ? action() : null,
          child: body),
      'home-page' => ForgeHomePageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          quickActions: optional ? action() : null,
          summary: optional ? const Text('Resumo') : null,
          child: body),
      'list-page' => ForgeListPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          filters: optional ? const Text('Filtros') : null,
          pagination: optional ? const Text('Paginação do consumidor') : null,
          child: body),
      'detail-page' => ForgeDetailPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          aside: optional ? const Text('Informações complementares') : null,
          child: body),
      'form-page' => ForgeFormPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          notice: optional ? const Text('Aviso do formulário') : null,
          child: body),
      _ => throw StateError(family)
    };
  }

  Widget transition() => Column(children: [
        ForgeButton(
            onPressed: () => setState(() => screen++),
            child: const Text('Trocar tela')),
        ForgePageTransition(
            screenKey: screen,
            intent: choice('intent', ForgePageTransitionIntent.values),
            animated: flag('animated'),
            child: Text('Tela $screen'))
      ]);
  Widget shared(BuildContext context) => Column(children: [
        ForgeSharedElement(
            name: 'forge-demo-element',
            animated: flag('animated'),
            child: SizedBox(
                width: 240,
                height: 80,
                child: Material(
                    type: MaterialType.transparency,
                    child: Center(child: Text(text('titleText')))))),
        ForgeButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute<void>(
                builder: (context) => Scaffold(
                        body: SafeArea(
                            child: Column(children: [
                      ForgeSharedElement(
                          name: 'forge-demo-element',
                          animated: flag('animated'),
                          child: SizedBox(
                              width: 240,
                              height: 80,
                              child: Material(
                                  type: MaterialType.transparency,
                                  child:
                                      Center(child: Text(text('titleText')))))),
                      ForgeButton(
                          onPressed: () => Navigator.of(context).pop(),
                          child: const Text('Voltar'))
                    ]))))),
            child: const Text('Abrir destino'))
      ]);
  Widget map() => ForgeMapView(
      label: text('label'),
      description:
          'Demonstração esquemática sem navegação nem localização real',
      status: choice('status', ForgeMapViewStatus.values),
      scene: ForgeMapScene(markers: [
        ForgeMapMarker(
            id: 'origin',
            label: 'Origem',
            coordinate:
                const ForgeMapCoordinate(latitude: -23.55, longitude: -46.63),
            kind: ForgeMapMarkerKind.origin)
      ]),
      renderer: const ForgeSchematicMapRenderer(),
      labels: const ForgeMapViewLabelsData(
          loading: 'Carregando mapa',
          empty: 'Sem pontos',
          unavailable: 'Mapa indisponível',
          schematic: 'Mapa esquemático, sem navegação'),
      onRendererError: (e) => event('Falha do renderizador'));
  Widget odata() => ForgeODataFilter(
      mode: choice('mode', ForgeODataFilterMode.values),
      fields: const [amount],
      value: expression,
      onValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expression = v;
        });
      },
      onApply: (v, filter) => event(filter),
      onCancel: () => event('Cancelado'),
      labels: labels,
      disabled: flag('disabled'),
      actionsLayout:
          choice('actionsLayout', ForgeODataFilterActionsLayout.values));
  @override
  Widget build(BuildContext context) =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        switch (family) {
          'data-grid' => grid(),
          'tree-grid' => treeGrid(),
          'page-transition' => transition(),
          'shared-element' => shared(context),
          'map-view' => map(),
          'o-data-filter' => odata(),
          _ => template()
        },
        Text('Solicitações: $requests'),
        if (result.isNotEmpty) Text(result)
      ]);
}

// Canonical parts are created by their native owner, not duplicated focus owners: DataGridRow.
const snippetContracts3=<String,Map<String,Map<String,Object?>>>{"data-grid-row":{"label":{"kind":"text","defaultValue":"Registros","nonblank":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"empty":{"kind":"boolean","defaultValue":false},"fullWidth":{"kind":"boolean","defaultValue":true},"showBorders":{"kind":"boolean","defaultValue":true},"showColumnLines":{"kind":"boolean","defaultValue":false},"showRowLines":{"kind":"boolean","defaultValue":true},"rowAlternationEnabled":{"kind":"boolean","defaultValue":true},"size":{"kind":"select","options":["sm","md","lg"],"defaultValue":"md"}}};
const snippetFamilies3=<String,String>{"data-grid-row":"data-grid"};
class AdvancedSnippet3 extends StatefulWidget {final String slug='data-grid-row';final Map<String,Object?> properties=const {"label": "Registros", "acceptChanges": true, "empty": false, "fullWidth": true, "showBorders": true, "showColumnLines": false, "showRowLines": true, "rowAlternationEnabled": true, "size": "md"};const AdvancedSnippet3({super.key});@override State<AdvancedSnippet3> createState()=>_AdvancedSnippetState3();}
class _AdvancedSnippetState3 extends State<AdvancedSnippet3> {
  int requests = 0, screen = 0;
  String result = '';
  ForgeDataGridSort? sort;
  List<String> expanded = [];
  late ForgeODataFilterExpression expression;
  String get family => snippetFamilies3[widget.slug]!;
  Object? prop(String k) =>
      widget.properties[k] ??
      snippetContracts3[widget.slug]?[k]?['defaultValue'];
  String text(String k) => prop(k) as String;
  bool flag(String k) => prop(k) == true;
  T choice<T extends Enum>(String k, List<T> values) =>
      values.firstWhere((v) => v.name == prop(k));
  @override
  void initState() {
    super.initState();
    expanded = flag('expanded') ? ['parent'] : [];
    expression = ForgeODataFilterGroupData(
        id: 'root',
        operator: ForgeODataFilterConjunction.and,
        children: [
          createForgeODataFilterCondition(amount, 'amount-condition')
        ]);
  }

  @override
  void didUpdateWidget(covariant AdvancedSnippet3 old) {
    super.didUpdateWidget(old);
    if (old.properties['expanded'] != widget.properties['expanded'])
      expanded = flag('expanded') ? ['parent'] : [];
  }

  void event(String value) {
    setState(() {
      requests++;
      result = value;
    });
  }

  static const amount = ForgeODataFilterField(
      id: 'amount',
      path: 'Amount',
      label: 'Valor',
      kind: ForgeODataFilterKind.decimal,
      precision: 40,
      scale: 4);
  static const labels = ForgeODataFilterLabels(
      field: 'Campo',
      operator: 'Operador',
      value: 'Valor',
      remove: 'Remover',
      addCondition: 'Adicionar condição',
      addGroup: 'Adicionar grupo',
      group: 'Grupo',
      and: 'E',
      or: 'Ou',
      apply: 'Aplicar',
      clear: 'Limpar',
      cancel: 'Cancelar',
      all: 'Todos',
      yes: 'Sim',
      no: 'Não',
      minimum: 'Mínimo',
      maximum: 'Máximo',
      invalid: 'Expressão inválida',
      unsupported: 'Expressão não suportada no modo simples',
      operatorLabels: {
        ForgeODataFilterOperator.eq: 'Igual',
        ForgeODataFilterOperator.ne: 'Diferente',
        ForgeODataFilterOperator.contains: 'Contém',
        ForgeODataFilterOperator.startswith: 'Começa com',
        ForgeODataFilterOperator.endswith: 'Termina com',
        ForgeODataFilterOperator.gt: 'Maior',
        ForgeODataFilterOperator.ge: 'Maior ou igual',
        ForgeODataFilterOperator.lt: 'Menor',
        ForgeODataFilterOperator.le: 'Menor ou igual',
        ForgeODataFilterOperator.between: 'Entre',
        ForgeODataFilterOperator.inValues: 'Em'
      });
  Widget field() => const ForgeInput(semanticLabel: 'Conteúdo preservado');
  Widget action() => ForgeButton(
      onPressed: () => event('Ação do consumidor'),
      child: Text(text('actionLabel')));
  Widget grid() {
    final rows = flag('empty') ? <String>[] : ['Beta', 'Alpha', 'Gamma'];
    if (sort != null)
      rows.sort((a, b) => sort!.direction == ForgeSortDirection.ascending
          ? a.compareTo(b)
          : b.compareTo(a));
    return ForgeDataGrid<String>(
        label: text('label'),
        rows: rows,
        getRowKey: (r) => r,
        sort: sort,
        onSortChange: (v) {
          setState(() {
            requests++;
            if (flag('acceptChanges')) sort = v;
          });
        },
        emptyContent: const Text('Nenhum registro'),
        fullWidth: flag('fullWidth'),
        showBorders: flag('showBorders'),
        showColumnLines: flag('showColumnLines'),
        showRowLines: flag('showRowLines'),
        rowAlternationEnabled: flag('rowAlternationEnabled'),
        size: choice('size', ForgeSize.values),
        columns: [
          ForgeDataGridColumn(
              key: 'name',
              header: 'Nome',
              renderCell: Text.new,
              sortable: true,
              sortLabel: 'Ordenar nomes'),
          ForgeDataGridColumn(
              key: 'action',
              header: 'Ação',
              renderCell: (r) => ForgeButton(
                  onPressed: () => event(r), child: const Text('Selecionar')))
        ],
        children: const [
          ForgeDataGridHeader(),
          ForgeDataGridBody(),
          ForgeDataGridFooter(child: Text('Rodapé da tabela'))
        ]);
  }

  Widget treeGrid() => ForgeTreeGrid<String>(
      label: text('label'),
      nodes: [
        ForgeTreeGridNode(
            key: 'parent',
            item: 'Equipe',
            children: [ForgeTreeGridNode(key: 'child', item: 'Pessoa')])
      ],
      getNodeLabel: (r) => r,
      expandedValue: expanded,
      onExpandedValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expanded = v;
        });
      },
      direction: choice('direction', ForgeNavigationDirection.values),
      animated: flag('animated'),
      columns: [
        ForgeTreeGridColumn(key: 'name', header: 'Nome', getCellText: (r) => r),
        ForgeTreeGridColumn(
            key: 'detail',
            header: 'Detalhe',
            getCellText: (r) => r + ' — detalhe')
      ],
      children: const [
        ForgeTreeGridHeader(),
        ForgeTreeGridBody(),
        ForgeTreeGridFooter(child: Text('Rodapé da hierarquia'))
      ]);
  Widget template() {
    final title = Text(text('titleText')),
        body = Column(children: [Text(text('bodyText')), field()]);
    final optional = flag('showSlots');
    return switch (family) {
      'application-layout-template' => SizedBox(
          height: 420,
          child: ForgeApplicationLayoutTemplate(
              header: optional ? title : null,
              navigation: optional ? const Text('Navegação') : null,
              toolbar: optional ? action() : null,
              footer: optional ? const Text('Rodapé') : null,
              mainId: 'forge-demo-main',
              child: body)),
      'showcase-page-template' => ForgeShowcasePageTemplate(
          title: optional ? title : null,
          navigation: optional ? const Text('Catálogo') : null,
          toolbar: optional ? action() : null,
          child: body),
      'home-page' => ForgeHomePageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          quickActions: optional ? action() : null,
          summary: optional ? const Text('Resumo') : null,
          child: body),
      'list-page' => ForgeListPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          filters: optional ? const Text('Filtros') : null,
          pagination: optional ? const Text('Paginação do consumidor') : null,
          child: body),
      'detail-page' => ForgeDetailPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          aside: optional ? const Text('Informações complementares') : null,
          child: body),
      'form-page' => ForgeFormPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          notice: optional ? const Text('Aviso do formulário') : null,
          child: body),
      _ => throw StateError(family)
    };
  }

  Widget transition() => Column(children: [
        ForgeButton(
            onPressed: () => setState(() => screen++),
            child: const Text('Trocar tela')),
        ForgePageTransition(
            screenKey: screen,
            intent: choice('intent', ForgePageTransitionIntent.values),
            animated: flag('animated'),
            child: Text('Tela $screen'))
      ]);
  Widget shared(BuildContext context) => Column(children: [
        ForgeSharedElement(
            name: 'forge-demo-element',
            animated: flag('animated'),
            child: SizedBox(
                width: 240,
                height: 80,
                child: Material(
                    type: MaterialType.transparency,
                    child: Center(child: Text(text('titleText')))))),
        ForgeButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute<void>(
                builder: (context) => Scaffold(
                        body: SafeArea(
                            child: Column(children: [
                      ForgeSharedElement(
                          name: 'forge-demo-element',
                          animated: flag('animated'),
                          child: SizedBox(
                              width: 240,
                              height: 80,
                              child: Material(
                                  type: MaterialType.transparency,
                                  child:
                                      Center(child: Text(text('titleText')))))),
                      ForgeButton(
                          onPressed: () => Navigator.of(context).pop(),
                          child: const Text('Voltar'))
                    ]))))),
            child: const Text('Abrir destino'))
      ]);
  Widget map() => ForgeMapView(
      label: text('label'),
      description:
          'Demonstração esquemática sem navegação nem localização real',
      status: choice('status', ForgeMapViewStatus.values),
      scene: ForgeMapScene(markers: [
        ForgeMapMarker(
            id: 'origin',
            label: 'Origem',
            coordinate:
                const ForgeMapCoordinate(latitude: -23.55, longitude: -46.63),
            kind: ForgeMapMarkerKind.origin)
      ]),
      renderer: const ForgeSchematicMapRenderer(),
      labels: const ForgeMapViewLabelsData(
          loading: 'Carregando mapa',
          empty: 'Sem pontos',
          unavailable: 'Mapa indisponível',
          schematic: 'Mapa esquemático, sem navegação'),
      onRendererError: (e) => event('Falha do renderizador'));
  Widget odata() => ForgeODataFilter(
      mode: choice('mode', ForgeODataFilterMode.values),
      fields: const [amount],
      value: expression,
      onValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expression = v;
        });
      },
      onApply: (v, filter) => event(filter),
      onCancel: () => event('Cancelado'),
      labels: labels,
      disabled: flag('disabled'),
      actionsLayout:
          choice('actionsLayout', ForgeODataFilterActionsLayout.values));
  @override
  Widget build(BuildContext context) =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        switch (family) {
          'data-grid' => grid(),
          'tree-grid' => treeGrid(),
          'page-transition' => transition(),
          'shared-element' => shared(context),
          'map-view' => map(),
          'o-data-filter' => odata(),
          _ => template()
        },
        Text('Solicitações: $requests'),
        if (result.isNotEmpty) Text(result)
      ]);
}

// Canonical parts are created by their native owner, not duplicated focus owners: DataGridColumnHeader.
const snippetContracts4=<String,Map<String,Map<String,Object?>>>{"data-grid-column-header":{"label":{"kind":"text","defaultValue":"Registros","nonblank":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"empty":{"kind":"boolean","defaultValue":false},"fullWidth":{"kind":"boolean","defaultValue":true},"showBorders":{"kind":"boolean","defaultValue":true},"showColumnLines":{"kind":"boolean","defaultValue":false},"showRowLines":{"kind":"boolean","defaultValue":true},"rowAlternationEnabled":{"kind":"boolean","defaultValue":true},"size":{"kind":"select","options":["sm","md","lg"],"defaultValue":"md"}}};
const snippetFamilies4=<String,String>{"data-grid-column-header":"data-grid"};
class AdvancedSnippet4 extends StatefulWidget {final String slug='data-grid-column-header';final Map<String,Object?> properties=const {"label": "Registros", "acceptChanges": true, "empty": false, "fullWidth": true, "showBorders": true, "showColumnLines": false, "showRowLines": true, "rowAlternationEnabled": true, "size": "md"};const AdvancedSnippet4({super.key});@override State<AdvancedSnippet4> createState()=>_AdvancedSnippetState4();}
class _AdvancedSnippetState4 extends State<AdvancedSnippet4> {
  int requests = 0, screen = 0;
  String result = '';
  ForgeDataGridSort? sort;
  List<String> expanded = [];
  late ForgeODataFilterExpression expression;
  String get family => snippetFamilies4[widget.slug]!;
  Object? prop(String k) =>
      widget.properties[k] ??
      snippetContracts4[widget.slug]?[k]?['defaultValue'];
  String text(String k) => prop(k) as String;
  bool flag(String k) => prop(k) == true;
  T choice<T extends Enum>(String k, List<T> values) =>
      values.firstWhere((v) => v.name == prop(k));
  @override
  void initState() {
    super.initState();
    expanded = flag('expanded') ? ['parent'] : [];
    expression = ForgeODataFilterGroupData(
        id: 'root',
        operator: ForgeODataFilterConjunction.and,
        children: [
          createForgeODataFilterCondition(amount, 'amount-condition')
        ]);
  }

  @override
  void didUpdateWidget(covariant AdvancedSnippet4 old) {
    super.didUpdateWidget(old);
    if (old.properties['expanded'] != widget.properties['expanded'])
      expanded = flag('expanded') ? ['parent'] : [];
  }

  void event(String value) {
    setState(() {
      requests++;
      result = value;
    });
  }

  static const amount = ForgeODataFilterField(
      id: 'amount',
      path: 'Amount',
      label: 'Valor',
      kind: ForgeODataFilterKind.decimal,
      precision: 40,
      scale: 4);
  static const labels = ForgeODataFilterLabels(
      field: 'Campo',
      operator: 'Operador',
      value: 'Valor',
      remove: 'Remover',
      addCondition: 'Adicionar condição',
      addGroup: 'Adicionar grupo',
      group: 'Grupo',
      and: 'E',
      or: 'Ou',
      apply: 'Aplicar',
      clear: 'Limpar',
      cancel: 'Cancelar',
      all: 'Todos',
      yes: 'Sim',
      no: 'Não',
      minimum: 'Mínimo',
      maximum: 'Máximo',
      invalid: 'Expressão inválida',
      unsupported: 'Expressão não suportada no modo simples',
      operatorLabels: {
        ForgeODataFilterOperator.eq: 'Igual',
        ForgeODataFilterOperator.ne: 'Diferente',
        ForgeODataFilterOperator.contains: 'Contém',
        ForgeODataFilterOperator.startswith: 'Começa com',
        ForgeODataFilterOperator.endswith: 'Termina com',
        ForgeODataFilterOperator.gt: 'Maior',
        ForgeODataFilterOperator.ge: 'Maior ou igual',
        ForgeODataFilterOperator.lt: 'Menor',
        ForgeODataFilterOperator.le: 'Menor ou igual',
        ForgeODataFilterOperator.between: 'Entre',
        ForgeODataFilterOperator.inValues: 'Em'
      });
  Widget field() => const ForgeInput(semanticLabel: 'Conteúdo preservado');
  Widget action() => ForgeButton(
      onPressed: () => event('Ação do consumidor'),
      child: Text(text('actionLabel')));
  Widget grid() {
    final rows = flag('empty') ? <String>[] : ['Beta', 'Alpha', 'Gamma'];
    if (sort != null)
      rows.sort((a, b) => sort!.direction == ForgeSortDirection.ascending
          ? a.compareTo(b)
          : b.compareTo(a));
    return ForgeDataGrid<String>(
        label: text('label'),
        rows: rows,
        getRowKey: (r) => r,
        sort: sort,
        onSortChange: (v) {
          setState(() {
            requests++;
            if (flag('acceptChanges')) sort = v;
          });
        },
        emptyContent: const Text('Nenhum registro'),
        fullWidth: flag('fullWidth'),
        showBorders: flag('showBorders'),
        showColumnLines: flag('showColumnLines'),
        showRowLines: flag('showRowLines'),
        rowAlternationEnabled: flag('rowAlternationEnabled'),
        size: choice('size', ForgeSize.values),
        columns: [
          ForgeDataGridColumn(
              key: 'name',
              header: 'Nome',
              renderCell: Text.new,
              sortable: true,
              sortLabel: 'Ordenar nomes'),
          ForgeDataGridColumn(
              key: 'action',
              header: 'Ação',
              renderCell: (r) => ForgeButton(
                  onPressed: () => event(r), child: const Text('Selecionar')))
        ],
        children: const [
          ForgeDataGridHeader(),
          ForgeDataGridBody(),
          ForgeDataGridFooter(child: Text('Rodapé da tabela'))
        ]);
  }

  Widget treeGrid() => ForgeTreeGrid<String>(
      label: text('label'),
      nodes: [
        ForgeTreeGridNode(
            key: 'parent',
            item: 'Equipe',
            children: [ForgeTreeGridNode(key: 'child', item: 'Pessoa')])
      ],
      getNodeLabel: (r) => r,
      expandedValue: expanded,
      onExpandedValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expanded = v;
        });
      },
      direction: choice('direction', ForgeNavigationDirection.values),
      animated: flag('animated'),
      columns: [
        ForgeTreeGridColumn(key: 'name', header: 'Nome', getCellText: (r) => r),
        ForgeTreeGridColumn(
            key: 'detail',
            header: 'Detalhe',
            getCellText: (r) => r + ' — detalhe')
      ],
      children: const [
        ForgeTreeGridHeader(),
        ForgeTreeGridBody(),
        ForgeTreeGridFooter(child: Text('Rodapé da hierarquia'))
      ]);
  Widget template() {
    final title = Text(text('titleText')),
        body = Column(children: [Text(text('bodyText')), field()]);
    final optional = flag('showSlots');
    return switch (family) {
      'application-layout-template' => SizedBox(
          height: 420,
          child: ForgeApplicationLayoutTemplate(
              header: optional ? title : null,
              navigation: optional ? const Text('Navegação') : null,
              toolbar: optional ? action() : null,
              footer: optional ? const Text('Rodapé') : null,
              mainId: 'forge-demo-main',
              child: body)),
      'showcase-page-template' => ForgeShowcasePageTemplate(
          title: optional ? title : null,
          navigation: optional ? const Text('Catálogo') : null,
          toolbar: optional ? action() : null,
          child: body),
      'home-page' => ForgeHomePageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          quickActions: optional ? action() : null,
          summary: optional ? const Text('Resumo') : null,
          child: body),
      'list-page' => ForgeListPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          filters: optional ? const Text('Filtros') : null,
          pagination: optional ? const Text('Paginação do consumidor') : null,
          child: body),
      'detail-page' => ForgeDetailPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          aside: optional ? const Text('Informações complementares') : null,
          child: body),
      'form-page' => ForgeFormPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          notice: optional ? const Text('Aviso do formulário') : null,
          child: body),
      _ => throw StateError(family)
    };
  }

  Widget transition() => Column(children: [
        ForgeButton(
            onPressed: () => setState(() => screen++),
            child: const Text('Trocar tela')),
        ForgePageTransition(
            screenKey: screen,
            intent: choice('intent', ForgePageTransitionIntent.values),
            animated: flag('animated'),
            child: Text('Tela $screen'))
      ]);
  Widget shared(BuildContext context) => Column(children: [
        ForgeSharedElement(
            name: 'forge-demo-element',
            animated: flag('animated'),
            child: SizedBox(
                width: 240,
                height: 80,
                child: Material(
                    type: MaterialType.transparency,
                    child: Center(child: Text(text('titleText')))))),
        ForgeButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute<void>(
                builder: (context) => Scaffold(
                        body: SafeArea(
                            child: Column(children: [
                      ForgeSharedElement(
                          name: 'forge-demo-element',
                          animated: flag('animated'),
                          child: SizedBox(
                              width: 240,
                              height: 80,
                              child: Material(
                                  type: MaterialType.transparency,
                                  child:
                                      Center(child: Text(text('titleText')))))),
                      ForgeButton(
                          onPressed: () => Navigator.of(context).pop(),
                          child: const Text('Voltar'))
                    ]))))),
            child: const Text('Abrir destino'))
      ]);
  Widget map() => ForgeMapView(
      label: text('label'),
      description:
          'Demonstração esquemática sem navegação nem localização real',
      status: choice('status', ForgeMapViewStatus.values),
      scene: ForgeMapScene(markers: [
        ForgeMapMarker(
            id: 'origin',
            label: 'Origem',
            coordinate:
                const ForgeMapCoordinate(latitude: -23.55, longitude: -46.63),
            kind: ForgeMapMarkerKind.origin)
      ]),
      renderer: const ForgeSchematicMapRenderer(),
      labels: const ForgeMapViewLabelsData(
          loading: 'Carregando mapa',
          empty: 'Sem pontos',
          unavailable: 'Mapa indisponível',
          schematic: 'Mapa esquemático, sem navegação'),
      onRendererError: (e) => event('Falha do renderizador'));
  Widget odata() => ForgeODataFilter(
      mode: choice('mode', ForgeODataFilterMode.values),
      fields: const [amount],
      value: expression,
      onValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expression = v;
        });
      },
      onApply: (v, filter) => event(filter),
      onCancel: () => event('Cancelado'),
      labels: labels,
      disabled: flag('disabled'),
      actionsLayout:
          choice('actionsLayout', ForgeODataFilterActionsLayout.values));
  @override
  Widget build(BuildContext context) =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        switch (family) {
          'data-grid' => grid(),
          'tree-grid' => treeGrid(),
          'page-transition' => transition(),
          'shared-element' => shared(context),
          'map-view' => map(),
          'o-data-filter' => odata(),
          _ => template()
        },
        Text('Solicitações: $requests'),
        if (result.isNotEmpty) Text(result)
      ]);
}

// Canonical parts are created by their native owner, not duplicated focus owners: DataGridCell.
const snippetContracts5=<String,Map<String,Map<String,Object?>>>{"data-grid-cell":{"label":{"kind":"text","defaultValue":"Registros","nonblank":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"empty":{"kind":"boolean","defaultValue":false},"fullWidth":{"kind":"boolean","defaultValue":true},"showBorders":{"kind":"boolean","defaultValue":true},"showColumnLines":{"kind":"boolean","defaultValue":false},"showRowLines":{"kind":"boolean","defaultValue":true},"rowAlternationEnabled":{"kind":"boolean","defaultValue":true},"size":{"kind":"select","options":["sm","md","lg"],"defaultValue":"md"}}};
const snippetFamilies5=<String,String>{"data-grid-cell":"data-grid"};
class AdvancedSnippet5 extends StatefulWidget {final String slug='data-grid-cell';final Map<String,Object?> properties=const {"label": "Registros", "acceptChanges": true, "empty": false, "fullWidth": true, "showBorders": true, "showColumnLines": false, "showRowLines": true, "rowAlternationEnabled": true, "size": "md"};const AdvancedSnippet5({super.key});@override State<AdvancedSnippet5> createState()=>_AdvancedSnippetState5();}
class _AdvancedSnippetState5 extends State<AdvancedSnippet5> {
  int requests = 0, screen = 0;
  String result = '';
  ForgeDataGridSort? sort;
  List<String> expanded = [];
  late ForgeODataFilterExpression expression;
  String get family => snippetFamilies5[widget.slug]!;
  Object? prop(String k) =>
      widget.properties[k] ??
      snippetContracts5[widget.slug]?[k]?['defaultValue'];
  String text(String k) => prop(k) as String;
  bool flag(String k) => prop(k) == true;
  T choice<T extends Enum>(String k, List<T> values) =>
      values.firstWhere((v) => v.name == prop(k));
  @override
  void initState() {
    super.initState();
    expanded = flag('expanded') ? ['parent'] : [];
    expression = ForgeODataFilterGroupData(
        id: 'root',
        operator: ForgeODataFilterConjunction.and,
        children: [
          createForgeODataFilterCondition(amount, 'amount-condition')
        ]);
  }

  @override
  void didUpdateWidget(covariant AdvancedSnippet5 old) {
    super.didUpdateWidget(old);
    if (old.properties['expanded'] != widget.properties['expanded'])
      expanded = flag('expanded') ? ['parent'] : [];
  }

  void event(String value) {
    setState(() {
      requests++;
      result = value;
    });
  }

  static const amount = ForgeODataFilterField(
      id: 'amount',
      path: 'Amount',
      label: 'Valor',
      kind: ForgeODataFilterKind.decimal,
      precision: 40,
      scale: 4);
  static const labels = ForgeODataFilterLabels(
      field: 'Campo',
      operator: 'Operador',
      value: 'Valor',
      remove: 'Remover',
      addCondition: 'Adicionar condição',
      addGroup: 'Adicionar grupo',
      group: 'Grupo',
      and: 'E',
      or: 'Ou',
      apply: 'Aplicar',
      clear: 'Limpar',
      cancel: 'Cancelar',
      all: 'Todos',
      yes: 'Sim',
      no: 'Não',
      minimum: 'Mínimo',
      maximum: 'Máximo',
      invalid: 'Expressão inválida',
      unsupported: 'Expressão não suportada no modo simples',
      operatorLabels: {
        ForgeODataFilterOperator.eq: 'Igual',
        ForgeODataFilterOperator.ne: 'Diferente',
        ForgeODataFilterOperator.contains: 'Contém',
        ForgeODataFilterOperator.startswith: 'Começa com',
        ForgeODataFilterOperator.endswith: 'Termina com',
        ForgeODataFilterOperator.gt: 'Maior',
        ForgeODataFilterOperator.ge: 'Maior ou igual',
        ForgeODataFilterOperator.lt: 'Menor',
        ForgeODataFilterOperator.le: 'Menor ou igual',
        ForgeODataFilterOperator.between: 'Entre',
        ForgeODataFilterOperator.inValues: 'Em'
      });
  Widget field() => const ForgeInput(semanticLabel: 'Conteúdo preservado');
  Widget action() => ForgeButton(
      onPressed: () => event('Ação do consumidor'),
      child: Text(text('actionLabel')));
  Widget grid() {
    final rows = flag('empty') ? <String>[] : ['Beta', 'Alpha', 'Gamma'];
    if (sort != null)
      rows.sort((a, b) => sort!.direction == ForgeSortDirection.ascending
          ? a.compareTo(b)
          : b.compareTo(a));
    return ForgeDataGrid<String>(
        label: text('label'),
        rows: rows,
        getRowKey: (r) => r,
        sort: sort,
        onSortChange: (v) {
          setState(() {
            requests++;
            if (flag('acceptChanges')) sort = v;
          });
        },
        emptyContent: const Text('Nenhum registro'),
        fullWidth: flag('fullWidth'),
        showBorders: flag('showBorders'),
        showColumnLines: flag('showColumnLines'),
        showRowLines: flag('showRowLines'),
        rowAlternationEnabled: flag('rowAlternationEnabled'),
        size: choice('size', ForgeSize.values),
        columns: [
          ForgeDataGridColumn(
              key: 'name',
              header: 'Nome',
              renderCell: Text.new,
              sortable: true,
              sortLabel: 'Ordenar nomes'),
          ForgeDataGridColumn(
              key: 'action',
              header: 'Ação',
              renderCell: (r) => ForgeButton(
                  onPressed: () => event(r), child: const Text('Selecionar')))
        ],
        children: const [
          ForgeDataGridHeader(),
          ForgeDataGridBody(),
          ForgeDataGridFooter(child: Text('Rodapé da tabela'))
        ]);
  }

  Widget treeGrid() => ForgeTreeGrid<String>(
      label: text('label'),
      nodes: [
        ForgeTreeGridNode(
            key: 'parent',
            item: 'Equipe',
            children: [ForgeTreeGridNode(key: 'child', item: 'Pessoa')])
      ],
      getNodeLabel: (r) => r,
      expandedValue: expanded,
      onExpandedValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expanded = v;
        });
      },
      direction: choice('direction', ForgeNavigationDirection.values),
      animated: flag('animated'),
      columns: [
        ForgeTreeGridColumn(key: 'name', header: 'Nome', getCellText: (r) => r),
        ForgeTreeGridColumn(
            key: 'detail',
            header: 'Detalhe',
            getCellText: (r) => r + ' — detalhe')
      ],
      children: const [
        ForgeTreeGridHeader(),
        ForgeTreeGridBody(),
        ForgeTreeGridFooter(child: Text('Rodapé da hierarquia'))
      ]);
  Widget template() {
    final title = Text(text('titleText')),
        body = Column(children: [Text(text('bodyText')), field()]);
    final optional = flag('showSlots');
    return switch (family) {
      'application-layout-template' => SizedBox(
          height: 420,
          child: ForgeApplicationLayoutTemplate(
              header: optional ? title : null,
              navigation: optional ? const Text('Navegação') : null,
              toolbar: optional ? action() : null,
              footer: optional ? const Text('Rodapé') : null,
              mainId: 'forge-demo-main',
              child: body)),
      'showcase-page-template' => ForgeShowcasePageTemplate(
          title: optional ? title : null,
          navigation: optional ? const Text('Catálogo') : null,
          toolbar: optional ? action() : null,
          child: body),
      'home-page' => ForgeHomePageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          quickActions: optional ? action() : null,
          summary: optional ? const Text('Resumo') : null,
          child: body),
      'list-page' => ForgeListPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          filters: optional ? const Text('Filtros') : null,
          pagination: optional ? const Text('Paginação do consumidor') : null,
          child: body),
      'detail-page' => ForgeDetailPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          aside: optional ? const Text('Informações complementares') : null,
          child: body),
      'form-page' => ForgeFormPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          notice: optional ? const Text('Aviso do formulário') : null,
          child: body),
      _ => throw StateError(family)
    };
  }

  Widget transition() => Column(children: [
        ForgeButton(
            onPressed: () => setState(() => screen++),
            child: const Text('Trocar tela')),
        ForgePageTransition(
            screenKey: screen,
            intent: choice('intent', ForgePageTransitionIntent.values),
            animated: flag('animated'),
            child: Text('Tela $screen'))
      ]);
  Widget shared(BuildContext context) => Column(children: [
        ForgeSharedElement(
            name: 'forge-demo-element',
            animated: flag('animated'),
            child: SizedBox(
                width: 240,
                height: 80,
                child: Material(
                    type: MaterialType.transparency,
                    child: Center(child: Text(text('titleText')))))),
        ForgeButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute<void>(
                builder: (context) => Scaffold(
                        body: SafeArea(
                            child: Column(children: [
                      ForgeSharedElement(
                          name: 'forge-demo-element',
                          animated: flag('animated'),
                          child: SizedBox(
                              width: 240,
                              height: 80,
                              child: Material(
                                  type: MaterialType.transparency,
                                  child:
                                      Center(child: Text(text('titleText')))))),
                      ForgeButton(
                          onPressed: () => Navigator.of(context).pop(),
                          child: const Text('Voltar'))
                    ]))))),
            child: const Text('Abrir destino'))
      ]);
  Widget map() => ForgeMapView(
      label: text('label'),
      description:
          'Demonstração esquemática sem navegação nem localização real',
      status: choice('status', ForgeMapViewStatus.values),
      scene: ForgeMapScene(markers: [
        ForgeMapMarker(
            id: 'origin',
            label: 'Origem',
            coordinate:
                const ForgeMapCoordinate(latitude: -23.55, longitude: -46.63),
            kind: ForgeMapMarkerKind.origin)
      ]),
      renderer: const ForgeSchematicMapRenderer(),
      labels: const ForgeMapViewLabelsData(
          loading: 'Carregando mapa',
          empty: 'Sem pontos',
          unavailable: 'Mapa indisponível',
          schematic: 'Mapa esquemático, sem navegação'),
      onRendererError: (e) => event('Falha do renderizador'));
  Widget odata() => ForgeODataFilter(
      mode: choice('mode', ForgeODataFilterMode.values),
      fields: const [amount],
      value: expression,
      onValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expression = v;
        });
      },
      onApply: (v, filter) => event(filter),
      onCancel: () => event('Cancelado'),
      labels: labels,
      disabled: flag('disabled'),
      actionsLayout:
          choice('actionsLayout', ForgeODataFilterActionsLayout.values));
  @override
  Widget build(BuildContext context) =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        switch (family) {
          'data-grid' => grid(),
          'tree-grid' => treeGrid(),
          'page-transition' => transition(),
          'shared-element' => shared(context),
          'map-view' => map(),
          'o-data-filter' => odata(),
          _ => template()
        },
        Text('Solicitações: $requests'),
        if (result.isNotEmpty) Text(result)
      ]);
}

// Canonical parts are created by their native owner, not duplicated focus owners: DataGridFooter.
const snippetContracts6=<String,Map<String,Map<String,Object?>>>{"data-grid-footer":{"label":{"kind":"text","defaultValue":"Registros","nonblank":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"empty":{"kind":"boolean","defaultValue":false},"fullWidth":{"kind":"boolean","defaultValue":true},"showBorders":{"kind":"boolean","defaultValue":true},"showColumnLines":{"kind":"boolean","defaultValue":false},"showRowLines":{"kind":"boolean","defaultValue":true},"rowAlternationEnabled":{"kind":"boolean","defaultValue":true},"size":{"kind":"select","options":["sm","md","lg"],"defaultValue":"md"}}};
const snippetFamilies6=<String,String>{"data-grid-footer":"data-grid"};
class AdvancedSnippet6 extends StatefulWidget {final String slug='data-grid-footer';final Map<String,Object?> properties=const {"label": "Registros", "acceptChanges": true, "empty": false, "fullWidth": true, "showBorders": true, "showColumnLines": false, "showRowLines": true, "rowAlternationEnabled": true, "size": "md"};const AdvancedSnippet6({super.key});@override State<AdvancedSnippet6> createState()=>_AdvancedSnippetState6();}
class _AdvancedSnippetState6 extends State<AdvancedSnippet6> {
  int requests = 0, screen = 0;
  String result = '';
  ForgeDataGridSort? sort;
  List<String> expanded = [];
  late ForgeODataFilterExpression expression;
  String get family => snippetFamilies6[widget.slug]!;
  Object? prop(String k) =>
      widget.properties[k] ??
      snippetContracts6[widget.slug]?[k]?['defaultValue'];
  String text(String k) => prop(k) as String;
  bool flag(String k) => prop(k) == true;
  T choice<T extends Enum>(String k, List<T> values) =>
      values.firstWhere((v) => v.name == prop(k));
  @override
  void initState() {
    super.initState();
    expanded = flag('expanded') ? ['parent'] : [];
    expression = ForgeODataFilterGroupData(
        id: 'root',
        operator: ForgeODataFilterConjunction.and,
        children: [
          createForgeODataFilterCondition(amount, 'amount-condition')
        ]);
  }

  @override
  void didUpdateWidget(covariant AdvancedSnippet6 old) {
    super.didUpdateWidget(old);
    if (old.properties['expanded'] != widget.properties['expanded'])
      expanded = flag('expanded') ? ['parent'] : [];
  }

  void event(String value) {
    setState(() {
      requests++;
      result = value;
    });
  }

  static const amount = ForgeODataFilterField(
      id: 'amount',
      path: 'Amount',
      label: 'Valor',
      kind: ForgeODataFilterKind.decimal,
      precision: 40,
      scale: 4);
  static const labels = ForgeODataFilterLabels(
      field: 'Campo',
      operator: 'Operador',
      value: 'Valor',
      remove: 'Remover',
      addCondition: 'Adicionar condição',
      addGroup: 'Adicionar grupo',
      group: 'Grupo',
      and: 'E',
      or: 'Ou',
      apply: 'Aplicar',
      clear: 'Limpar',
      cancel: 'Cancelar',
      all: 'Todos',
      yes: 'Sim',
      no: 'Não',
      minimum: 'Mínimo',
      maximum: 'Máximo',
      invalid: 'Expressão inválida',
      unsupported: 'Expressão não suportada no modo simples',
      operatorLabels: {
        ForgeODataFilterOperator.eq: 'Igual',
        ForgeODataFilterOperator.ne: 'Diferente',
        ForgeODataFilterOperator.contains: 'Contém',
        ForgeODataFilterOperator.startswith: 'Começa com',
        ForgeODataFilterOperator.endswith: 'Termina com',
        ForgeODataFilterOperator.gt: 'Maior',
        ForgeODataFilterOperator.ge: 'Maior ou igual',
        ForgeODataFilterOperator.lt: 'Menor',
        ForgeODataFilterOperator.le: 'Menor ou igual',
        ForgeODataFilterOperator.between: 'Entre',
        ForgeODataFilterOperator.inValues: 'Em'
      });
  Widget field() => const ForgeInput(semanticLabel: 'Conteúdo preservado');
  Widget action() => ForgeButton(
      onPressed: () => event('Ação do consumidor'),
      child: Text(text('actionLabel')));
  Widget grid() {
    final rows = flag('empty') ? <String>[] : ['Beta', 'Alpha', 'Gamma'];
    if (sort != null)
      rows.sort((a, b) => sort!.direction == ForgeSortDirection.ascending
          ? a.compareTo(b)
          : b.compareTo(a));
    return ForgeDataGrid<String>(
        label: text('label'),
        rows: rows,
        getRowKey: (r) => r,
        sort: sort,
        onSortChange: (v) {
          setState(() {
            requests++;
            if (flag('acceptChanges')) sort = v;
          });
        },
        emptyContent: const Text('Nenhum registro'),
        fullWidth: flag('fullWidth'),
        showBorders: flag('showBorders'),
        showColumnLines: flag('showColumnLines'),
        showRowLines: flag('showRowLines'),
        rowAlternationEnabled: flag('rowAlternationEnabled'),
        size: choice('size', ForgeSize.values),
        columns: [
          ForgeDataGridColumn(
              key: 'name',
              header: 'Nome',
              renderCell: Text.new,
              sortable: true,
              sortLabel: 'Ordenar nomes'),
          ForgeDataGridColumn(
              key: 'action',
              header: 'Ação',
              renderCell: (r) => ForgeButton(
                  onPressed: () => event(r), child: const Text('Selecionar')))
        ],
        children: const [
          ForgeDataGridHeader(),
          ForgeDataGridBody(),
          ForgeDataGridFooter(child: Text('Rodapé da tabela'))
        ]);
  }

  Widget treeGrid() => ForgeTreeGrid<String>(
      label: text('label'),
      nodes: [
        ForgeTreeGridNode(
            key: 'parent',
            item: 'Equipe',
            children: [ForgeTreeGridNode(key: 'child', item: 'Pessoa')])
      ],
      getNodeLabel: (r) => r,
      expandedValue: expanded,
      onExpandedValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expanded = v;
        });
      },
      direction: choice('direction', ForgeNavigationDirection.values),
      animated: flag('animated'),
      columns: [
        ForgeTreeGridColumn(key: 'name', header: 'Nome', getCellText: (r) => r),
        ForgeTreeGridColumn(
            key: 'detail',
            header: 'Detalhe',
            getCellText: (r) => r + ' — detalhe')
      ],
      children: const [
        ForgeTreeGridHeader(),
        ForgeTreeGridBody(),
        ForgeTreeGridFooter(child: Text('Rodapé da hierarquia'))
      ]);
  Widget template() {
    final title = Text(text('titleText')),
        body = Column(children: [Text(text('bodyText')), field()]);
    final optional = flag('showSlots');
    return switch (family) {
      'application-layout-template' => SizedBox(
          height: 420,
          child: ForgeApplicationLayoutTemplate(
              header: optional ? title : null,
              navigation: optional ? const Text('Navegação') : null,
              toolbar: optional ? action() : null,
              footer: optional ? const Text('Rodapé') : null,
              mainId: 'forge-demo-main',
              child: body)),
      'showcase-page-template' => ForgeShowcasePageTemplate(
          title: optional ? title : null,
          navigation: optional ? const Text('Catálogo') : null,
          toolbar: optional ? action() : null,
          child: body),
      'home-page' => ForgeHomePageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          quickActions: optional ? action() : null,
          summary: optional ? const Text('Resumo') : null,
          child: body),
      'list-page' => ForgeListPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          filters: optional ? const Text('Filtros') : null,
          pagination: optional ? const Text('Paginação do consumidor') : null,
          child: body),
      'detail-page' => ForgeDetailPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          aside: optional ? const Text('Informações complementares') : null,
          child: body),
      'form-page' => ForgeFormPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          notice: optional ? const Text('Aviso do formulário') : null,
          child: body),
      _ => throw StateError(family)
    };
  }

  Widget transition() => Column(children: [
        ForgeButton(
            onPressed: () => setState(() => screen++),
            child: const Text('Trocar tela')),
        ForgePageTransition(
            screenKey: screen,
            intent: choice('intent', ForgePageTransitionIntent.values),
            animated: flag('animated'),
            child: Text('Tela $screen'))
      ]);
  Widget shared(BuildContext context) => Column(children: [
        ForgeSharedElement(
            name: 'forge-demo-element',
            animated: flag('animated'),
            child: SizedBox(
                width: 240,
                height: 80,
                child: Material(
                    type: MaterialType.transparency,
                    child: Center(child: Text(text('titleText')))))),
        ForgeButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute<void>(
                builder: (context) => Scaffold(
                        body: SafeArea(
                            child: Column(children: [
                      ForgeSharedElement(
                          name: 'forge-demo-element',
                          animated: flag('animated'),
                          child: SizedBox(
                              width: 240,
                              height: 80,
                              child: Material(
                                  type: MaterialType.transparency,
                                  child:
                                      Center(child: Text(text('titleText')))))),
                      ForgeButton(
                          onPressed: () => Navigator.of(context).pop(),
                          child: const Text('Voltar'))
                    ]))))),
            child: const Text('Abrir destino'))
      ]);
  Widget map() => ForgeMapView(
      label: text('label'),
      description:
          'Demonstração esquemática sem navegação nem localização real',
      status: choice('status', ForgeMapViewStatus.values),
      scene: ForgeMapScene(markers: [
        ForgeMapMarker(
            id: 'origin',
            label: 'Origem',
            coordinate:
                const ForgeMapCoordinate(latitude: -23.55, longitude: -46.63),
            kind: ForgeMapMarkerKind.origin)
      ]),
      renderer: const ForgeSchematicMapRenderer(),
      labels: const ForgeMapViewLabelsData(
          loading: 'Carregando mapa',
          empty: 'Sem pontos',
          unavailable: 'Mapa indisponível',
          schematic: 'Mapa esquemático, sem navegação'),
      onRendererError: (e) => event('Falha do renderizador'));
  Widget odata() => ForgeODataFilter(
      mode: choice('mode', ForgeODataFilterMode.values),
      fields: const [amount],
      value: expression,
      onValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expression = v;
        });
      },
      onApply: (v, filter) => event(filter),
      onCancel: () => event('Cancelado'),
      labels: labels,
      disabled: flag('disabled'),
      actionsLayout:
          choice('actionsLayout', ForgeODataFilterActionsLayout.values));
  @override
  Widget build(BuildContext context) =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        switch (family) {
          'data-grid' => grid(),
          'tree-grid' => treeGrid(),
          'page-transition' => transition(),
          'shared-element' => shared(context),
          'map-view' => map(),
          'o-data-filter' => odata(),
          _ => template()
        },
        Text('Solicitações: $requests'),
        if (result.isNotEmpty) Text(result)
      ]);
}

// Canonical parts are created by their native owner, not duplicated focus owners: TreeGrid.
const snippetContracts7=<String,Map<String,Map<String,Object?>>>{"tree-grid":{"label":{"kind":"text","defaultValue":"Registros","nonblank":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"expanded":{"kind":"boolean","defaultValue":false},"direction":{"kind":"select","options":["ltr","rtl"],"defaultValue":"ltr"},"animated":{"kind":"boolean","defaultValue":true}}};
const snippetFamilies7=<String,String>{"tree-grid":"tree-grid"};
class AdvancedSnippet7 extends StatefulWidget {final String slug='tree-grid';final Map<String,Object?> properties=const {"label": "Registros", "acceptChanges": true, "expanded": false, "direction": "ltr", "animated": true};const AdvancedSnippet7({super.key});@override State<AdvancedSnippet7> createState()=>_AdvancedSnippetState7();}
class _AdvancedSnippetState7 extends State<AdvancedSnippet7> {
  int requests = 0, screen = 0;
  String result = '';
  ForgeDataGridSort? sort;
  List<String> expanded = [];
  late ForgeODataFilterExpression expression;
  String get family => snippetFamilies7[widget.slug]!;
  Object? prop(String k) =>
      widget.properties[k] ??
      snippetContracts7[widget.slug]?[k]?['defaultValue'];
  String text(String k) => prop(k) as String;
  bool flag(String k) => prop(k) == true;
  T choice<T extends Enum>(String k, List<T> values) =>
      values.firstWhere((v) => v.name == prop(k));
  @override
  void initState() {
    super.initState();
    expanded = flag('expanded') ? ['parent'] : [];
    expression = ForgeODataFilterGroupData(
        id: 'root',
        operator: ForgeODataFilterConjunction.and,
        children: [
          createForgeODataFilterCondition(amount, 'amount-condition')
        ]);
  }

  @override
  void didUpdateWidget(covariant AdvancedSnippet7 old) {
    super.didUpdateWidget(old);
    if (old.properties['expanded'] != widget.properties['expanded'])
      expanded = flag('expanded') ? ['parent'] : [];
  }

  void event(String value) {
    setState(() {
      requests++;
      result = value;
    });
  }

  static const amount = ForgeODataFilterField(
      id: 'amount',
      path: 'Amount',
      label: 'Valor',
      kind: ForgeODataFilterKind.decimal,
      precision: 40,
      scale: 4);
  static const labels = ForgeODataFilterLabels(
      field: 'Campo',
      operator: 'Operador',
      value: 'Valor',
      remove: 'Remover',
      addCondition: 'Adicionar condição',
      addGroup: 'Adicionar grupo',
      group: 'Grupo',
      and: 'E',
      or: 'Ou',
      apply: 'Aplicar',
      clear: 'Limpar',
      cancel: 'Cancelar',
      all: 'Todos',
      yes: 'Sim',
      no: 'Não',
      minimum: 'Mínimo',
      maximum: 'Máximo',
      invalid: 'Expressão inválida',
      unsupported: 'Expressão não suportada no modo simples',
      operatorLabels: {
        ForgeODataFilterOperator.eq: 'Igual',
        ForgeODataFilterOperator.ne: 'Diferente',
        ForgeODataFilterOperator.contains: 'Contém',
        ForgeODataFilterOperator.startswith: 'Começa com',
        ForgeODataFilterOperator.endswith: 'Termina com',
        ForgeODataFilterOperator.gt: 'Maior',
        ForgeODataFilterOperator.ge: 'Maior ou igual',
        ForgeODataFilterOperator.lt: 'Menor',
        ForgeODataFilterOperator.le: 'Menor ou igual',
        ForgeODataFilterOperator.between: 'Entre',
        ForgeODataFilterOperator.inValues: 'Em'
      });
  Widget field() => const ForgeInput(semanticLabel: 'Conteúdo preservado');
  Widget action() => ForgeButton(
      onPressed: () => event('Ação do consumidor'),
      child: Text(text('actionLabel')));
  Widget grid() {
    final rows = flag('empty') ? <String>[] : ['Beta', 'Alpha', 'Gamma'];
    if (sort != null)
      rows.sort((a, b) => sort!.direction == ForgeSortDirection.ascending
          ? a.compareTo(b)
          : b.compareTo(a));
    return ForgeDataGrid<String>(
        label: text('label'),
        rows: rows,
        getRowKey: (r) => r,
        sort: sort,
        onSortChange: (v) {
          setState(() {
            requests++;
            if (flag('acceptChanges')) sort = v;
          });
        },
        emptyContent: const Text('Nenhum registro'),
        fullWidth: flag('fullWidth'),
        showBorders: flag('showBorders'),
        showColumnLines: flag('showColumnLines'),
        showRowLines: flag('showRowLines'),
        rowAlternationEnabled: flag('rowAlternationEnabled'),
        size: choice('size', ForgeSize.values),
        columns: [
          ForgeDataGridColumn(
              key: 'name',
              header: 'Nome',
              renderCell: Text.new,
              sortable: true,
              sortLabel: 'Ordenar nomes'),
          ForgeDataGridColumn(
              key: 'action',
              header: 'Ação',
              renderCell: (r) => ForgeButton(
                  onPressed: () => event(r), child: const Text('Selecionar')))
        ],
        children: const [
          ForgeDataGridHeader(),
          ForgeDataGridBody(),
          ForgeDataGridFooter(child: Text('Rodapé da tabela'))
        ]);
  }

  Widget treeGrid() => ForgeTreeGrid<String>(
      label: text('label'),
      nodes: [
        ForgeTreeGridNode(
            key: 'parent',
            item: 'Equipe',
            children: [ForgeTreeGridNode(key: 'child', item: 'Pessoa')])
      ],
      getNodeLabel: (r) => r,
      expandedValue: expanded,
      onExpandedValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expanded = v;
        });
      },
      direction: choice('direction', ForgeNavigationDirection.values),
      animated: flag('animated'),
      columns: [
        ForgeTreeGridColumn(key: 'name', header: 'Nome', getCellText: (r) => r),
        ForgeTreeGridColumn(
            key: 'detail',
            header: 'Detalhe',
            getCellText: (r) => r + ' — detalhe')
      ],
      children: const [
        ForgeTreeGridHeader(),
        ForgeTreeGridBody(),
        ForgeTreeGridFooter(child: Text('Rodapé da hierarquia'))
      ]);
  Widget template() {
    final title = Text(text('titleText')),
        body = Column(children: [Text(text('bodyText')), field()]);
    final optional = flag('showSlots');
    return switch (family) {
      'application-layout-template' => SizedBox(
          height: 420,
          child: ForgeApplicationLayoutTemplate(
              header: optional ? title : null,
              navigation: optional ? const Text('Navegação') : null,
              toolbar: optional ? action() : null,
              footer: optional ? const Text('Rodapé') : null,
              mainId: 'forge-demo-main',
              child: body)),
      'showcase-page-template' => ForgeShowcasePageTemplate(
          title: optional ? title : null,
          navigation: optional ? const Text('Catálogo') : null,
          toolbar: optional ? action() : null,
          child: body),
      'home-page' => ForgeHomePageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          quickActions: optional ? action() : null,
          summary: optional ? const Text('Resumo') : null,
          child: body),
      'list-page' => ForgeListPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          filters: optional ? const Text('Filtros') : null,
          pagination: optional ? const Text('Paginação do consumidor') : null,
          child: body),
      'detail-page' => ForgeDetailPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          aside: optional ? const Text('Informações complementares') : null,
          child: body),
      'form-page' => ForgeFormPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          notice: optional ? const Text('Aviso do formulário') : null,
          child: body),
      _ => throw StateError(family)
    };
  }

  Widget transition() => Column(children: [
        ForgeButton(
            onPressed: () => setState(() => screen++),
            child: const Text('Trocar tela')),
        ForgePageTransition(
            screenKey: screen,
            intent: choice('intent', ForgePageTransitionIntent.values),
            animated: flag('animated'),
            child: Text('Tela $screen'))
      ]);
  Widget shared(BuildContext context) => Column(children: [
        ForgeSharedElement(
            name: 'forge-demo-element',
            animated: flag('animated'),
            child: SizedBox(
                width: 240,
                height: 80,
                child: Material(
                    type: MaterialType.transparency,
                    child: Center(child: Text(text('titleText')))))),
        ForgeButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute<void>(
                builder: (context) => Scaffold(
                        body: SafeArea(
                            child: Column(children: [
                      ForgeSharedElement(
                          name: 'forge-demo-element',
                          animated: flag('animated'),
                          child: SizedBox(
                              width: 240,
                              height: 80,
                              child: Material(
                                  type: MaterialType.transparency,
                                  child:
                                      Center(child: Text(text('titleText')))))),
                      ForgeButton(
                          onPressed: () => Navigator.of(context).pop(),
                          child: const Text('Voltar'))
                    ]))))),
            child: const Text('Abrir destino'))
      ]);
  Widget map() => ForgeMapView(
      label: text('label'),
      description:
          'Demonstração esquemática sem navegação nem localização real',
      status: choice('status', ForgeMapViewStatus.values),
      scene: ForgeMapScene(markers: [
        ForgeMapMarker(
            id: 'origin',
            label: 'Origem',
            coordinate:
                const ForgeMapCoordinate(latitude: -23.55, longitude: -46.63),
            kind: ForgeMapMarkerKind.origin)
      ]),
      renderer: const ForgeSchematicMapRenderer(),
      labels: const ForgeMapViewLabelsData(
          loading: 'Carregando mapa',
          empty: 'Sem pontos',
          unavailable: 'Mapa indisponível',
          schematic: 'Mapa esquemático, sem navegação'),
      onRendererError: (e) => event('Falha do renderizador'));
  Widget odata() => ForgeODataFilter(
      mode: choice('mode', ForgeODataFilterMode.values),
      fields: const [amount],
      value: expression,
      onValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expression = v;
        });
      },
      onApply: (v, filter) => event(filter),
      onCancel: () => event('Cancelado'),
      labels: labels,
      disabled: flag('disabled'),
      actionsLayout:
          choice('actionsLayout', ForgeODataFilterActionsLayout.values));
  @override
  Widget build(BuildContext context) =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        switch (family) {
          'data-grid' => grid(),
          'tree-grid' => treeGrid(),
          'page-transition' => transition(),
          'shared-element' => shared(context),
          'map-view' => map(),
          'o-data-filter' => odata(),
          _ => template()
        },
        Text('Solicitações: $requests'),
        if (result.isNotEmpty) Text(result)
      ]);
}

// Canonical parts are created by their native owner, not duplicated focus owners: TreeGridHeader.
const snippetContracts8=<String,Map<String,Map<String,Object?>>>{"tree-grid-header":{"label":{"kind":"text","defaultValue":"Registros","nonblank":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"expanded":{"kind":"boolean","defaultValue":false},"direction":{"kind":"select","options":["ltr","rtl"],"defaultValue":"ltr"},"animated":{"kind":"boolean","defaultValue":true}}};
const snippetFamilies8=<String,String>{"tree-grid-header":"tree-grid"};
class AdvancedSnippet8 extends StatefulWidget {final String slug='tree-grid-header';final Map<String,Object?> properties=const {"label": "Registros", "acceptChanges": true, "expanded": false, "direction": "ltr", "animated": true};const AdvancedSnippet8({super.key});@override State<AdvancedSnippet8> createState()=>_AdvancedSnippetState8();}
class _AdvancedSnippetState8 extends State<AdvancedSnippet8> {
  int requests = 0, screen = 0;
  String result = '';
  ForgeDataGridSort? sort;
  List<String> expanded = [];
  late ForgeODataFilterExpression expression;
  String get family => snippetFamilies8[widget.slug]!;
  Object? prop(String k) =>
      widget.properties[k] ??
      snippetContracts8[widget.slug]?[k]?['defaultValue'];
  String text(String k) => prop(k) as String;
  bool flag(String k) => prop(k) == true;
  T choice<T extends Enum>(String k, List<T> values) =>
      values.firstWhere((v) => v.name == prop(k));
  @override
  void initState() {
    super.initState();
    expanded = flag('expanded') ? ['parent'] : [];
    expression = ForgeODataFilterGroupData(
        id: 'root',
        operator: ForgeODataFilterConjunction.and,
        children: [
          createForgeODataFilterCondition(amount, 'amount-condition')
        ]);
  }

  @override
  void didUpdateWidget(covariant AdvancedSnippet8 old) {
    super.didUpdateWidget(old);
    if (old.properties['expanded'] != widget.properties['expanded'])
      expanded = flag('expanded') ? ['parent'] : [];
  }

  void event(String value) {
    setState(() {
      requests++;
      result = value;
    });
  }

  static const amount = ForgeODataFilterField(
      id: 'amount',
      path: 'Amount',
      label: 'Valor',
      kind: ForgeODataFilterKind.decimal,
      precision: 40,
      scale: 4);
  static const labels = ForgeODataFilterLabels(
      field: 'Campo',
      operator: 'Operador',
      value: 'Valor',
      remove: 'Remover',
      addCondition: 'Adicionar condição',
      addGroup: 'Adicionar grupo',
      group: 'Grupo',
      and: 'E',
      or: 'Ou',
      apply: 'Aplicar',
      clear: 'Limpar',
      cancel: 'Cancelar',
      all: 'Todos',
      yes: 'Sim',
      no: 'Não',
      minimum: 'Mínimo',
      maximum: 'Máximo',
      invalid: 'Expressão inválida',
      unsupported: 'Expressão não suportada no modo simples',
      operatorLabels: {
        ForgeODataFilterOperator.eq: 'Igual',
        ForgeODataFilterOperator.ne: 'Diferente',
        ForgeODataFilterOperator.contains: 'Contém',
        ForgeODataFilterOperator.startswith: 'Começa com',
        ForgeODataFilterOperator.endswith: 'Termina com',
        ForgeODataFilterOperator.gt: 'Maior',
        ForgeODataFilterOperator.ge: 'Maior ou igual',
        ForgeODataFilterOperator.lt: 'Menor',
        ForgeODataFilterOperator.le: 'Menor ou igual',
        ForgeODataFilterOperator.between: 'Entre',
        ForgeODataFilterOperator.inValues: 'Em'
      });
  Widget field() => const ForgeInput(semanticLabel: 'Conteúdo preservado');
  Widget action() => ForgeButton(
      onPressed: () => event('Ação do consumidor'),
      child: Text(text('actionLabel')));
  Widget grid() {
    final rows = flag('empty') ? <String>[] : ['Beta', 'Alpha', 'Gamma'];
    if (sort != null)
      rows.sort((a, b) => sort!.direction == ForgeSortDirection.ascending
          ? a.compareTo(b)
          : b.compareTo(a));
    return ForgeDataGrid<String>(
        label: text('label'),
        rows: rows,
        getRowKey: (r) => r,
        sort: sort,
        onSortChange: (v) {
          setState(() {
            requests++;
            if (flag('acceptChanges')) sort = v;
          });
        },
        emptyContent: const Text('Nenhum registro'),
        fullWidth: flag('fullWidth'),
        showBorders: flag('showBorders'),
        showColumnLines: flag('showColumnLines'),
        showRowLines: flag('showRowLines'),
        rowAlternationEnabled: flag('rowAlternationEnabled'),
        size: choice('size', ForgeSize.values),
        columns: [
          ForgeDataGridColumn(
              key: 'name',
              header: 'Nome',
              renderCell: Text.new,
              sortable: true,
              sortLabel: 'Ordenar nomes'),
          ForgeDataGridColumn(
              key: 'action',
              header: 'Ação',
              renderCell: (r) => ForgeButton(
                  onPressed: () => event(r), child: const Text('Selecionar')))
        ],
        children: const [
          ForgeDataGridHeader(),
          ForgeDataGridBody(),
          ForgeDataGridFooter(child: Text('Rodapé da tabela'))
        ]);
  }

  Widget treeGrid() => ForgeTreeGrid<String>(
      label: text('label'),
      nodes: [
        ForgeTreeGridNode(
            key: 'parent',
            item: 'Equipe',
            children: [ForgeTreeGridNode(key: 'child', item: 'Pessoa')])
      ],
      getNodeLabel: (r) => r,
      expandedValue: expanded,
      onExpandedValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expanded = v;
        });
      },
      direction: choice('direction', ForgeNavigationDirection.values),
      animated: flag('animated'),
      columns: [
        ForgeTreeGridColumn(key: 'name', header: 'Nome', getCellText: (r) => r),
        ForgeTreeGridColumn(
            key: 'detail',
            header: 'Detalhe',
            getCellText: (r) => r + ' — detalhe')
      ],
      children: const [
        ForgeTreeGridHeader(),
        ForgeTreeGridBody(),
        ForgeTreeGridFooter(child: Text('Rodapé da hierarquia'))
      ]);
  Widget template() {
    final title = Text(text('titleText')),
        body = Column(children: [Text(text('bodyText')), field()]);
    final optional = flag('showSlots');
    return switch (family) {
      'application-layout-template' => SizedBox(
          height: 420,
          child: ForgeApplicationLayoutTemplate(
              header: optional ? title : null,
              navigation: optional ? const Text('Navegação') : null,
              toolbar: optional ? action() : null,
              footer: optional ? const Text('Rodapé') : null,
              mainId: 'forge-demo-main',
              child: body)),
      'showcase-page-template' => ForgeShowcasePageTemplate(
          title: optional ? title : null,
          navigation: optional ? const Text('Catálogo') : null,
          toolbar: optional ? action() : null,
          child: body),
      'home-page' => ForgeHomePageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          quickActions: optional ? action() : null,
          summary: optional ? const Text('Resumo') : null,
          child: body),
      'list-page' => ForgeListPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          filters: optional ? const Text('Filtros') : null,
          pagination: optional ? const Text('Paginação do consumidor') : null,
          child: body),
      'detail-page' => ForgeDetailPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          aside: optional ? const Text('Informações complementares') : null,
          child: body),
      'form-page' => ForgeFormPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          notice: optional ? const Text('Aviso do formulário') : null,
          child: body),
      _ => throw StateError(family)
    };
  }

  Widget transition() => Column(children: [
        ForgeButton(
            onPressed: () => setState(() => screen++),
            child: const Text('Trocar tela')),
        ForgePageTransition(
            screenKey: screen,
            intent: choice('intent', ForgePageTransitionIntent.values),
            animated: flag('animated'),
            child: Text('Tela $screen'))
      ]);
  Widget shared(BuildContext context) => Column(children: [
        ForgeSharedElement(
            name: 'forge-demo-element',
            animated: flag('animated'),
            child: SizedBox(
                width: 240,
                height: 80,
                child: Material(
                    type: MaterialType.transparency,
                    child: Center(child: Text(text('titleText')))))),
        ForgeButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute<void>(
                builder: (context) => Scaffold(
                        body: SafeArea(
                            child: Column(children: [
                      ForgeSharedElement(
                          name: 'forge-demo-element',
                          animated: flag('animated'),
                          child: SizedBox(
                              width: 240,
                              height: 80,
                              child: Material(
                                  type: MaterialType.transparency,
                                  child:
                                      Center(child: Text(text('titleText')))))),
                      ForgeButton(
                          onPressed: () => Navigator.of(context).pop(),
                          child: const Text('Voltar'))
                    ]))))),
            child: const Text('Abrir destino'))
      ]);
  Widget map() => ForgeMapView(
      label: text('label'),
      description:
          'Demonstração esquemática sem navegação nem localização real',
      status: choice('status', ForgeMapViewStatus.values),
      scene: ForgeMapScene(markers: [
        ForgeMapMarker(
            id: 'origin',
            label: 'Origem',
            coordinate:
                const ForgeMapCoordinate(latitude: -23.55, longitude: -46.63),
            kind: ForgeMapMarkerKind.origin)
      ]),
      renderer: const ForgeSchematicMapRenderer(),
      labels: const ForgeMapViewLabelsData(
          loading: 'Carregando mapa',
          empty: 'Sem pontos',
          unavailable: 'Mapa indisponível',
          schematic: 'Mapa esquemático, sem navegação'),
      onRendererError: (e) => event('Falha do renderizador'));
  Widget odata() => ForgeODataFilter(
      mode: choice('mode', ForgeODataFilterMode.values),
      fields: const [amount],
      value: expression,
      onValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expression = v;
        });
      },
      onApply: (v, filter) => event(filter),
      onCancel: () => event('Cancelado'),
      labels: labels,
      disabled: flag('disabled'),
      actionsLayout:
          choice('actionsLayout', ForgeODataFilterActionsLayout.values));
  @override
  Widget build(BuildContext context) =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        switch (family) {
          'data-grid' => grid(),
          'tree-grid' => treeGrid(),
          'page-transition' => transition(),
          'shared-element' => shared(context),
          'map-view' => map(),
          'o-data-filter' => odata(),
          _ => template()
        },
        Text('Solicitações: $requests'),
        if (result.isNotEmpty) Text(result)
      ]);
}

// Canonical parts are created by their native owner, not duplicated focus owners: TreeGridBody.
const snippetContracts9=<String,Map<String,Map<String,Object?>>>{"tree-grid-body":{"label":{"kind":"text","defaultValue":"Registros","nonblank":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"expanded":{"kind":"boolean","defaultValue":false},"direction":{"kind":"select","options":["ltr","rtl"],"defaultValue":"ltr"},"animated":{"kind":"boolean","defaultValue":true}}};
const snippetFamilies9=<String,String>{"tree-grid-body":"tree-grid"};
class AdvancedSnippet9 extends StatefulWidget {final String slug='tree-grid-body';final Map<String,Object?> properties=const {"label": "Registros", "acceptChanges": true, "expanded": false, "direction": "ltr", "animated": true};const AdvancedSnippet9({super.key});@override State<AdvancedSnippet9> createState()=>_AdvancedSnippetState9();}
class _AdvancedSnippetState9 extends State<AdvancedSnippet9> {
  int requests = 0, screen = 0;
  String result = '';
  ForgeDataGridSort? sort;
  List<String> expanded = [];
  late ForgeODataFilterExpression expression;
  String get family => snippetFamilies9[widget.slug]!;
  Object? prop(String k) =>
      widget.properties[k] ??
      snippetContracts9[widget.slug]?[k]?['defaultValue'];
  String text(String k) => prop(k) as String;
  bool flag(String k) => prop(k) == true;
  T choice<T extends Enum>(String k, List<T> values) =>
      values.firstWhere((v) => v.name == prop(k));
  @override
  void initState() {
    super.initState();
    expanded = flag('expanded') ? ['parent'] : [];
    expression = ForgeODataFilterGroupData(
        id: 'root',
        operator: ForgeODataFilterConjunction.and,
        children: [
          createForgeODataFilterCondition(amount, 'amount-condition')
        ]);
  }

  @override
  void didUpdateWidget(covariant AdvancedSnippet9 old) {
    super.didUpdateWidget(old);
    if (old.properties['expanded'] != widget.properties['expanded'])
      expanded = flag('expanded') ? ['parent'] : [];
  }

  void event(String value) {
    setState(() {
      requests++;
      result = value;
    });
  }

  static const amount = ForgeODataFilterField(
      id: 'amount',
      path: 'Amount',
      label: 'Valor',
      kind: ForgeODataFilterKind.decimal,
      precision: 40,
      scale: 4);
  static const labels = ForgeODataFilterLabels(
      field: 'Campo',
      operator: 'Operador',
      value: 'Valor',
      remove: 'Remover',
      addCondition: 'Adicionar condição',
      addGroup: 'Adicionar grupo',
      group: 'Grupo',
      and: 'E',
      or: 'Ou',
      apply: 'Aplicar',
      clear: 'Limpar',
      cancel: 'Cancelar',
      all: 'Todos',
      yes: 'Sim',
      no: 'Não',
      minimum: 'Mínimo',
      maximum: 'Máximo',
      invalid: 'Expressão inválida',
      unsupported: 'Expressão não suportada no modo simples',
      operatorLabels: {
        ForgeODataFilterOperator.eq: 'Igual',
        ForgeODataFilterOperator.ne: 'Diferente',
        ForgeODataFilterOperator.contains: 'Contém',
        ForgeODataFilterOperator.startswith: 'Começa com',
        ForgeODataFilterOperator.endswith: 'Termina com',
        ForgeODataFilterOperator.gt: 'Maior',
        ForgeODataFilterOperator.ge: 'Maior ou igual',
        ForgeODataFilterOperator.lt: 'Menor',
        ForgeODataFilterOperator.le: 'Menor ou igual',
        ForgeODataFilterOperator.between: 'Entre',
        ForgeODataFilterOperator.inValues: 'Em'
      });
  Widget field() => const ForgeInput(semanticLabel: 'Conteúdo preservado');
  Widget action() => ForgeButton(
      onPressed: () => event('Ação do consumidor'),
      child: Text(text('actionLabel')));
  Widget grid() {
    final rows = flag('empty') ? <String>[] : ['Beta', 'Alpha', 'Gamma'];
    if (sort != null)
      rows.sort((a, b) => sort!.direction == ForgeSortDirection.ascending
          ? a.compareTo(b)
          : b.compareTo(a));
    return ForgeDataGrid<String>(
        label: text('label'),
        rows: rows,
        getRowKey: (r) => r,
        sort: sort,
        onSortChange: (v) {
          setState(() {
            requests++;
            if (flag('acceptChanges')) sort = v;
          });
        },
        emptyContent: const Text('Nenhum registro'),
        fullWidth: flag('fullWidth'),
        showBorders: flag('showBorders'),
        showColumnLines: flag('showColumnLines'),
        showRowLines: flag('showRowLines'),
        rowAlternationEnabled: flag('rowAlternationEnabled'),
        size: choice('size', ForgeSize.values),
        columns: [
          ForgeDataGridColumn(
              key: 'name',
              header: 'Nome',
              renderCell: Text.new,
              sortable: true,
              sortLabel: 'Ordenar nomes'),
          ForgeDataGridColumn(
              key: 'action',
              header: 'Ação',
              renderCell: (r) => ForgeButton(
                  onPressed: () => event(r), child: const Text('Selecionar')))
        ],
        children: const [
          ForgeDataGridHeader(),
          ForgeDataGridBody(),
          ForgeDataGridFooter(child: Text('Rodapé da tabela'))
        ]);
  }

  Widget treeGrid() => ForgeTreeGrid<String>(
      label: text('label'),
      nodes: [
        ForgeTreeGridNode(
            key: 'parent',
            item: 'Equipe',
            children: [ForgeTreeGridNode(key: 'child', item: 'Pessoa')])
      ],
      getNodeLabel: (r) => r,
      expandedValue: expanded,
      onExpandedValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expanded = v;
        });
      },
      direction: choice('direction', ForgeNavigationDirection.values),
      animated: flag('animated'),
      columns: [
        ForgeTreeGridColumn(key: 'name', header: 'Nome', getCellText: (r) => r),
        ForgeTreeGridColumn(
            key: 'detail',
            header: 'Detalhe',
            getCellText: (r) => r + ' — detalhe')
      ],
      children: const [
        ForgeTreeGridHeader(),
        ForgeTreeGridBody(),
        ForgeTreeGridFooter(child: Text('Rodapé da hierarquia'))
      ]);
  Widget template() {
    final title = Text(text('titleText')),
        body = Column(children: [Text(text('bodyText')), field()]);
    final optional = flag('showSlots');
    return switch (family) {
      'application-layout-template' => SizedBox(
          height: 420,
          child: ForgeApplicationLayoutTemplate(
              header: optional ? title : null,
              navigation: optional ? const Text('Navegação') : null,
              toolbar: optional ? action() : null,
              footer: optional ? const Text('Rodapé') : null,
              mainId: 'forge-demo-main',
              child: body)),
      'showcase-page-template' => ForgeShowcasePageTemplate(
          title: optional ? title : null,
          navigation: optional ? const Text('Catálogo') : null,
          toolbar: optional ? action() : null,
          child: body),
      'home-page' => ForgeHomePageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          quickActions: optional ? action() : null,
          summary: optional ? const Text('Resumo') : null,
          child: body),
      'list-page' => ForgeListPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          filters: optional ? const Text('Filtros') : null,
          pagination: optional ? const Text('Paginação do consumidor') : null,
          child: body),
      'detail-page' => ForgeDetailPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          aside: optional ? const Text('Informações complementares') : null,
          child: body),
      'form-page' => ForgeFormPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          notice: optional ? const Text('Aviso do formulário') : null,
          child: body),
      _ => throw StateError(family)
    };
  }

  Widget transition() => Column(children: [
        ForgeButton(
            onPressed: () => setState(() => screen++),
            child: const Text('Trocar tela')),
        ForgePageTransition(
            screenKey: screen,
            intent: choice('intent', ForgePageTransitionIntent.values),
            animated: flag('animated'),
            child: Text('Tela $screen'))
      ]);
  Widget shared(BuildContext context) => Column(children: [
        ForgeSharedElement(
            name: 'forge-demo-element',
            animated: flag('animated'),
            child: SizedBox(
                width: 240,
                height: 80,
                child: Material(
                    type: MaterialType.transparency,
                    child: Center(child: Text(text('titleText')))))),
        ForgeButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute<void>(
                builder: (context) => Scaffold(
                        body: SafeArea(
                            child: Column(children: [
                      ForgeSharedElement(
                          name: 'forge-demo-element',
                          animated: flag('animated'),
                          child: SizedBox(
                              width: 240,
                              height: 80,
                              child: Material(
                                  type: MaterialType.transparency,
                                  child:
                                      Center(child: Text(text('titleText')))))),
                      ForgeButton(
                          onPressed: () => Navigator.of(context).pop(),
                          child: const Text('Voltar'))
                    ]))))),
            child: const Text('Abrir destino'))
      ]);
  Widget map() => ForgeMapView(
      label: text('label'),
      description:
          'Demonstração esquemática sem navegação nem localização real',
      status: choice('status', ForgeMapViewStatus.values),
      scene: ForgeMapScene(markers: [
        ForgeMapMarker(
            id: 'origin',
            label: 'Origem',
            coordinate:
                const ForgeMapCoordinate(latitude: -23.55, longitude: -46.63),
            kind: ForgeMapMarkerKind.origin)
      ]),
      renderer: const ForgeSchematicMapRenderer(),
      labels: const ForgeMapViewLabelsData(
          loading: 'Carregando mapa',
          empty: 'Sem pontos',
          unavailable: 'Mapa indisponível',
          schematic: 'Mapa esquemático, sem navegação'),
      onRendererError: (e) => event('Falha do renderizador'));
  Widget odata() => ForgeODataFilter(
      mode: choice('mode', ForgeODataFilterMode.values),
      fields: const [amount],
      value: expression,
      onValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expression = v;
        });
      },
      onApply: (v, filter) => event(filter),
      onCancel: () => event('Cancelado'),
      labels: labels,
      disabled: flag('disabled'),
      actionsLayout:
          choice('actionsLayout', ForgeODataFilterActionsLayout.values));
  @override
  Widget build(BuildContext context) =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        switch (family) {
          'data-grid' => grid(),
          'tree-grid' => treeGrid(),
          'page-transition' => transition(),
          'shared-element' => shared(context),
          'map-view' => map(),
          'o-data-filter' => odata(),
          _ => template()
        },
        Text('Solicitações: $requests'),
        if (result.isNotEmpty) Text(result)
      ]);
}

// Canonical parts are created by their native owner, not duplicated focus owners: TreeGridRow.
const snippetContracts10=<String,Map<String,Map<String,Object?>>>{"tree-grid-row":{"label":{"kind":"text","defaultValue":"Registros","nonblank":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"expanded":{"kind":"boolean","defaultValue":false},"direction":{"kind":"select","options":["ltr","rtl"],"defaultValue":"ltr"},"animated":{"kind":"boolean","defaultValue":true}}};
const snippetFamilies10=<String,String>{"tree-grid-row":"tree-grid"};
class AdvancedSnippet10 extends StatefulWidget {final String slug='tree-grid-row';final Map<String,Object?> properties=const {"label": "Registros", "acceptChanges": true, "expanded": false, "direction": "ltr", "animated": true};const AdvancedSnippet10({super.key});@override State<AdvancedSnippet10> createState()=>_AdvancedSnippetState10();}
class _AdvancedSnippetState10 extends State<AdvancedSnippet10> {
  int requests = 0, screen = 0;
  String result = '';
  ForgeDataGridSort? sort;
  List<String> expanded = [];
  late ForgeODataFilterExpression expression;
  String get family => snippetFamilies10[widget.slug]!;
  Object? prop(String k) =>
      widget.properties[k] ??
      snippetContracts10[widget.slug]?[k]?['defaultValue'];
  String text(String k) => prop(k) as String;
  bool flag(String k) => prop(k) == true;
  T choice<T extends Enum>(String k, List<T> values) =>
      values.firstWhere((v) => v.name == prop(k));
  @override
  void initState() {
    super.initState();
    expanded = flag('expanded') ? ['parent'] : [];
    expression = ForgeODataFilterGroupData(
        id: 'root',
        operator: ForgeODataFilterConjunction.and,
        children: [
          createForgeODataFilterCondition(amount, 'amount-condition')
        ]);
  }

  @override
  void didUpdateWidget(covariant AdvancedSnippet10 old) {
    super.didUpdateWidget(old);
    if (old.properties['expanded'] != widget.properties['expanded'])
      expanded = flag('expanded') ? ['parent'] : [];
  }

  void event(String value) {
    setState(() {
      requests++;
      result = value;
    });
  }

  static const amount = ForgeODataFilterField(
      id: 'amount',
      path: 'Amount',
      label: 'Valor',
      kind: ForgeODataFilterKind.decimal,
      precision: 40,
      scale: 4);
  static const labels = ForgeODataFilterLabels(
      field: 'Campo',
      operator: 'Operador',
      value: 'Valor',
      remove: 'Remover',
      addCondition: 'Adicionar condição',
      addGroup: 'Adicionar grupo',
      group: 'Grupo',
      and: 'E',
      or: 'Ou',
      apply: 'Aplicar',
      clear: 'Limpar',
      cancel: 'Cancelar',
      all: 'Todos',
      yes: 'Sim',
      no: 'Não',
      minimum: 'Mínimo',
      maximum: 'Máximo',
      invalid: 'Expressão inválida',
      unsupported: 'Expressão não suportada no modo simples',
      operatorLabels: {
        ForgeODataFilterOperator.eq: 'Igual',
        ForgeODataFilterOperator.ne: 'Diferente',
        ForgeODataFilterOperator.contains: 'Contém',
        ForgeODataFilterOperator.startswith: 'Começa com',
        ForgeODataFilterOperator.endswith: 'Termina com',
        ForgeODataFilterOperator.gt: 'Maior',
        ForgeODataFilterOperator.ge: 'Maior ou igual',
        ForgeODataFilterOperator.lt: 'Menor',
        ForgeODataFilterOperator.le: 'Menor ou igual',
        ForgeODataFilterOperator.between: 'Entre',
        ForgeODataFilterOperator.inValues: 'Em'
      });
  Widget field() => const ForgeInput(semanticLabel: 'Conteúdo preservado');
  Widget action() => ForgeButton(
      onPressed: () => event('Ação do consumidor'),
      child: Text(text('actionLabel')));
  Widget grid() {
    final rows = flag('empty') ? <String>[] : ['Beta', 'Alpha', 'Gamma'];
    if (sort != null)
      rows.sort((a, b) => sort!.direction == ForgeSortDirection.ascending
          ? a.compareTo(b)
          : b.compareTo(a));
    return ForgeDataGrid<String>(
        label: text('label'),
        rows: rows,
        getRowKey: (r) => r,
        sort: sort,
        onSortChange: (v) {
          setState(() {
            requests++;
            if (flag('acceptChanges')) sort = v;
          });
        },
        emptyContent: const Text('Nenhum registro'),
        fullWidth: flag('fullWidth'),
        showBorders: flag('showBorders'),
        showColumnLines: flag('showColumnLines'),
        showRowLines: flag('showRowLines'),
        rowAlternationEnabled: flag('rowAlternationEnabled'),
        size: choice('size', ForgeSize.values),
        columns: [
          ForgeDataGridColumn(
              key: 'name',
              header: 'Nome',
              renderCell: Text.new,
              sortable: true,
              sortLabel: 'Ordenar nomes'),
          ForgeDataGridColumn(
              key: 'action',
              header: 'Ação',
              renderCell: (r) => ForgeButton(
                  onPressed: () => event(r), child: const Text('Selecionar')))
        ],
        children: const [
          ForgeDataGridHeader(),
          ForgeDataGridBody(),
          ForgeDataGridFooter(child: Text('Rodapé da tabela'))
        ]);
  }

  Widget treeGrid() => ForgeTreeGrid<String>(
      label: text('label'),
      nodes: [
        ForgeTreeGridNode(
            key: 'parent',
            item: 'Equipe',
            children: [ForgeTreeGridNode(key: 'child', item: 'Pessoa')])
      ],
      getNodeLabel: (r) => r,
      expandedValue: expanded,
      onExpandedValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expanded = v;
        });
      },
      direction: choice('direction', ForgeNavigationDirection.values),
      animated: flag('animated'),
      columns: [
        ForgeTreeGridColumn(key: 'name', header: 'Nome', getCellText: (r) => r),
        ForgeTreeGridColumn(
            key: 'detail',
            header: 'Detalhe',
            getCellText: (r) => r + ' — detalhe')
      ],
      children: const [
        ForgeTreeGridHeader(),
        ForgeTreeGridBody(),
        ForgeTreeGridFooter(child: Text('Rodapé da hierarquia'))
      ]);
  Widget template() {
    final title = Text(text('titleText')),
        body = Column(children: [Text(text('bodyText')), field()]);
    final optional = flag('showSlots');
    return switch (family) {
      'application-layout-template' => SizedBox(
          height: 420,
          child: ForgeApplicationLayoutTemplate(
              header: optional ? title : null,
              navigation: optional ? const Text('Navegação') : null,
              toolbar: optional ? action() : null,
              footer: optional ? const Text('Rodapé') : null,
              mainId: 'forge-demo-main',
              child: body)),
      'showcase-page-template' => ForgeShowcasePageTemplate(
          title: optional ? title : null,
          navigation: optional ? const Text('Catálogo') : null,
          toolbar: optional ? action() : null,
          child: body),
      'home-page' => ForgeHomePageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          quickActions: optional ? action() : null,
          summary: optional ? const Text('Resumo') : null,
          child: body),
      'list-page' => ForgeListPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          filters: optional ? const Text('Filtros') : null,
          pagination: optional ? const Text('Paginação do consumidor') : null,
          child: body),
      'detail-page' => ForgeDetailPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          aside: optional ? const Text('Informações complementares') : null,
          child: body),
      'form-page' => ForgeFormPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          notice: optional ? const Text('Aviso do formulário') : null,
          child: body),
      _ => throw StateError(family)
    };
  }

  Widget transition() => Column(children: [
        ForgeButton(
            onPressed: () => setState(() => screen++),
            child: const Text('Trocar tela')),
        ForgePageTransition(
            screenKey: screen,
            intent: choice('intent', ForgePageTransitionIntent.values),
            animated: flag('animated'),
            child: Text('Tela $screen'))
      ]);
  Widget shared(BuildContext context) => Column(children: [
        ForgeSharedElement(
            name: 'forge-demo-element',
            animated: flag('animated'),
            child: SizedBox(
                width: 240,
                height: 80,
                child: Material(
                    type: MaterialType.transparency,
                    child: Center(child: Text(text('titleText')))))),
        ForgeButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute<void>(
                builder: (context) => Scaffold(
                        body: SafeArea(
                            child: Column(children: [
                      ForgeSharedElement(
                          name: 'forge-demo-element',
                          animated: flag('animated'),
                          child: SizedBox(
                              width: 240,
                              height: 80,
                              child: Material(
                                  type: MaterialType.transparency,
                                  child:
                                      Center(child: Text(text('titleText')))))),
                      ForgeButton(
                          onPressed: () => Navigator.of(context).pop(),
                          child: const Text('Voltar'))
                    ]))))),
            child: const Text('Abrir destino'))
      ]);
  Widget map() => ForgeMapView(
      label: text('label'),
      description:
          'Demonstração esquemática sem navegação nem localização real',
      status: choice('status', ForgeMapViewStatus.values),
      scene: ForgeMapScene(markers: [
        ForgeMapMarker(
            id: 'origin',
            label: 'Origem',
            coordinate:
                const ForgeMapCoordinate(latitude: -23.55, longitude: -46.63),
            kind: ForgeMapMarkerKind.origin)
      ]),
      renderer: const ForgeSchematicMapRenderer(),
      labels: const ForgeMapViewLabelsData(
          loading: 'Carregando mapa',
          empty: 'Sem pontos',
          unavailable: 'Mapa indisponível',
          schematic: 'Mapa esquemático, sem navegação'),
      onRendererError: (e) => event('Falha do renderizador'));
  Widget odata() => ForgeODataFilter(
      mode: choice('mode', ForgeODataFilterMode.values),
      fields: const [amount],
      value: expression,
      onValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expression = v;
        });
      },
      onApply: (v, filter) => event(filter),
      onCancel: () => event('Cancelado'),
      labels: labels,
      disabled: flag('disabled'),
      actionsLayout:
          choice('actionsLayout', ForgeODataFilterActionsLayout.values));
  @override
  Widget build(BuildContext context) =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        switch (family) {
          'data-grid' => grid(),
          'tree-grid' => treeGrid(),
          'page-transition' => transition(),
          'shared-element' => shared(context),
          'map-view' => map(),
          'o-data-filter' => odata(),
          _ => template()
        },
        Text('Solicitações: $requests'),
        if (result.isNotEmpty) Text(result)
      ]);
}

// Canonical parts are created by their native owner, not duplicated focus owners: TreeGridColumnHeader.
const snippetContracts11=<String,Map<String,Map<String,Object?>>>{"tree-grid-column-header":{"label":{"kind":"text","defaultValue":"Registros","nonblank":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"expanded":{"kind":"boolean","defaultValue":false},"direction":{"kind":"select","options":["ltr","rtl"],"defaultValue":"ltr"},"animated":{"kind":"boolean","defaultValue":true}}};
const snippetFamilies11=<String,String>{"tree-grid-column-header":"tree-grid"};
class AdvancedSnippet11 extends StatefulWidget {final String slug='tree-grid-column-header';final Map<String,Object?> properties=const {"label": "Registros", "acceptChanges": true, "expanded": false, "direction": "ltr", "animated": true};const AdvancedSnippet11({super.key});@override State<AdvancedSnippet11> createState()=>_AdvancedSnippetState11();}
class _AdvancedSnippetState11 extends State<AdvancedSnippet11> {
  int requests = 0, screen = 0;
  String result = '';
  ForgeDataGridSort? sort;
  List<String> expanded = [];
  late ForgeODataFilterExpression expression;
  String get family => snippetFamilies11[widget.slug]!;
  Object? prop(String k) =>
      widget.properties[k] ??
      snippetContracts11[widget.slug]?[k]?['defaultValue'];
  String text(String k) => prop(k) as String;
  bool flag(String k) => prop(k) == true;
  T choice<T extends Enum>(String k, List<T> values) =>
      values.firstWhere((v) => v.name == prop(k));
  @override
  void initState() {
    super.initState();
    expanded = flag('expanded') ? ['parent'] : [];
    expression = ForgeODataFilterGroupData(
        id: 'root',
        operator: ForgeODataFilterConjunction.and,
        children: [
          createForgeODataFilterCondition(amount, 'amount-condition')
        ]);
  }

  @override
  void didUpdateWidget(covariant AdvancedSnippet11 old) {
    super.didUpdateWidget(old);
    if (old.properties['expanded'] != widget.properties['expanded'])
      expanded = flag('expanded') ? ['parent'] : [];
  }

  void event(String value) {
    setState(() {
      requests++;
      result = value;
    });
  }

  static const amount = ForgeODataFilterField(
      id: 'amount',
      path: 'Amount',
      label: 'Valor',
      kind: ForgeODataFilterKind.decimal,
      precision: 40,
      scale: 4);
  static const labels = ForgeODataFilterLabels(
      field: 'Campo',
      operator: 'Operador',
      value: 'Valor',
      remove: 'Remover',
      addCondition: 'Adicionar condição',
      addGroup: 'Adicionar grupo',
      group: 'Grupo',
      and: 'E',
      or: 'Ou',
      apply: 'Aplicar',
      clear: 'Limpar',
      cancel: 'Cancelar',
      all: 'Todos',
      yes: 'Sim',
      no: 'Não',
      minimum: 'Mínimo',
      maximum: 'Máximo',
      invalid: 'Expressão inválida',
      unsupported: 'Expressão não suportada no modo simples',
      operatorLabels: {
        ForgeODataFilterOperator.eq: 'Igual',
        ForgeODataFilterOperator.ne: 'Diferente',
        ForgeODataFilterOperator.contains: 'Contém',
        ForgeODataFilterOperator.startswith: 'Começa com',
        ForgeODataFilterOperator.endswith: 'Termina com',
        ForgeODataFilterOperator.gt: 'Maior',
        ForgeODataFilterOperator.ge: 'Maior ou igual',
        ForgeODataFilterOperator.lt: 'Menor',
        ForgeODataFilterOperator.le: 'Menor ou igual',
        ForgeODataFilterOperator.between: 'Entre',
        ForgeODataFilterOperator.inValues: 'Em'
      });
  Widget field() => const ForgeInput(semanticLabel: 'Conteúdo preservado');
  Widget action() => ForgeButton(
      onPressed: () => event('Ação do consumidor'),
      child: Text(text('actionLabel')));
  Widget grid() {
    final rows = flag('empty') ? <String>[] : ['Beta', 'Alpha', 'Gamma'];
    if (sort != null)
      rows.sort((a, b) => sort!.direction == ForgeSortDirection.ascending
          ? a.compareTo(b)
          : b.compareTo(a));
    return ForgeDataGrid<String>(
        label: text('label'),
        rows: rows,
        getRowKey: (r) => r,
        sort: sort,
        onSortChange: (v) {
          setState(() {
            requests++;
            if (flag('acceptChanges')) sort = v;
          });
        },
        emptyContent: const Text('Nenhum registro'),
        fullWidth: flag('fullWidth'),
        showBorders: flag('showBorders'),
        showColumnLines: flag('showColumnLines'),
        showRowLines: flag('showRowLines'),
        rowAlternationEnabled: flag('rowAlternationEnabled'),
        size: choice('size', ForgeSize.values),
        columns: [
          ForgeDataGridColumn(
              key: 'name',
              header: 'Nome',
              renderCell: Text.new,
              sortable: true,
              sortLabel: 'Ordenar nomes'),
          ForgeDataGridColumn(
              key: 'action',
              header: 'Ação',
              renderCell: (r) => ForgeButton(
                  onPressed: () => event(r), child: const Text('Selecionar')))
        ],
        children: const [
          ForgeDataGridHeader(),
          ForgeDataGridBody(),
          ForgeDataGridFooter(child: Text('Rodapé da tabela'))
        ]);
  }

  Widget treeGrid() => ForgeTreeGrid<String>(
      label: text('label'),
      nodes: [
        ForgeTreeGridNode(
            key: 'parent',
            item: 'Equipe',
            children: [ForgeTreeGridNode(key: 'child', item: 'Pessoa')])
      ],
      getNodeLabel: (r) => r,
      expandedValue: expanded,
      onExpandedValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expanded = v;
        });
      },
      direction: choice('direction', ForgeNavigationDirection.values),
      animated: flag('animated'),
      columns: [
        ForgeTreeGridColumn(key: 'name', header: 'Nome', getCellText: (r) => r),
        ForgeTreeGridColumn(
            key: 'detail',
            header: 'Detalhe',
            getCellText: (r) => r + ' — detalhe')
      ],
      children: const [
        ForgeTreeGridHeader(),
        ForgeTreeGridBody(),
        ForgeTreeGridFooter(child: Text('Rodapé da hierarquia'))
      ]);
  Widget template() {
    final title = Text(text('titleText')),
        body = Column(children: [Text(text('bodyText')), field()]);
    final optional = flag('showSlots');
    return switch (family) {
      'application-layout-template' => SizedBox(
          height: 420,
          child: ForgeApplicationLayoutTemplate(
              header: optional ? title : null,
              navigation: optional ? const Text('Navegação') : null,
              toolbar: optional ? action() : null,
              footer: optional ? const Text('Rodapé') : null,
              mainId: 'forge-demo-main',
              child: body)),
      'showcase-page-template' => ForgeShowcasePageTemplate(
          title: optional ? title : null,
          navigation: optional ? const Text('Catálogo') : null,
          toolbar: optional ? action() : null,
          child: body),
      'home-page' => ForgeHomePageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          quickActions: optional ? action() : null,
          summary: optional ? const Text('Resumo') : null,
          child: body),
      'list-page' => ForgeListPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          filters: optional ? const Text('Filtros') : null,
          pagination: optional ? const Text('Paginação do consumidor') : null,
          child: body),
      'detail-page' => ForgeDetailPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          aside: optional ? const Text('Informações complementares') : null,
          child: body),
      'form-page' => ForgeFormPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          notice: optional ? const Text('Aviso do formulário') : null,
          child: body),
      _ => throw StateError(family)
    };
  }

  Widget transition() => Column(children: [
        ForgeButton(
            onPressed: () => setState(() => screen++),
            child: const Text('Trocar tela')),
        ForgePageTransition(
            screenKey: screen,
            intent: choice('intent', ForgePageTransitionIntent.values),
            animated: flag('animated'),
            child: Text('Tela $screen'))
      ]);
  Widget shared(BuildContext context) => Column(children: [
        ForgeSharedElement(
            name: 'forge-demo-element',
            animated: flag('animated'),
            child: SizedBox(
                width: 240,
                height: 80,
                child: Material(
                    type: MaterialType.transparency,
                    child: Center(child: Text(text('titleText')))))),
        ForgeButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute<void>(
                builder: (context) => Scaffold(
                        body: SafeArea(
                            child: Column(children: [
                      ForgeSharedElement(
                          name: 'forge-demo-element',
                          animated: flag('animated'),
                          child: SizedBox(
                              width: 240,
                              height: 80,
                              child: Material(
                                  type: MaterialType.transparency,
                                  child:
                                      Center(child: Text(text('titleText')))))),
                      ForgeButton(
                          onPressed: () => Navigator.of(context).pop(),
                          child: const Text('Voltar'))
                    ]))))),
            child: const Text('Abrir destino'))
      ]);
  Widget map() => ForgeMapView(
      label: text('label'),
      description:
          'Demonstração esquemática sem navegação nem localização real',
      status: choice('status', ForgeMapViewStatus.values),
      scene: ForgeMapScene(markers: [
        ForgeMapMarker(
            id: 'origin',
            label: 'Origem',
            coordinate:
                const ForgeMapCoordinate(latitude: -23.55, longitude: -46.63),
            kind: ForgeMapMarkerKind.origin)
      ]),
      renderer: const ForgeSchematicMapRenderer(),
      labels: const ForgeMapViewLabelsData(
          loading: 'Carregando mapa',
          empty: 'Sem pontos',
          unavailable: 'Mapa indisponível',
          schematic: 'Mapa esquemático, sem navegação'),
      onRendererError: (e) => event('Falha do renderizador'));
  Widget odata() => ForgeODataFilter(
      mode: choice('mode', ForgeODataFilterMode.values),
      fields: const [amount],
      value: expression,
      onValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expression = v;
        });
      },
      onApply: (v, filter) => event(filter),
      onCancel: () => event('Cancelado'),
      labels: labels,
      disabled: flag('disabled'),
      actionsLayout:
          choice('actionsLayout', ForgeODataFilterActionsLayout.values));
  @override
  Widget build(BuildContext context) =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        switch (family) {
          'data-grid' => grid(),
          'tree-grid' => treeGrid(),
          'page-transition' => transition(),
          'shared-element' => shared(context),
          'map-view' => map(),
          'o-data-filter' => odata(),
          _ => template()
        },
        Text('Solicitações: $requests'),
        if (result.isNotEmpty) Text(result)
      ]);
}

// Canonical parts are created by their native owner, not duplicated focus owners: TreeGridCell.
const snippetContracts12=<String,Map<String,Map<String,Object?>>>{"tree-grid-cell":{"label":{"kind":"text","defaultValue":"Registros","nonblank":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"expanded":{"kind":"boolean","defaultValue":false},"direction":{"kind":"select","options":["ltr","rtl"],"defaultValue":"ltr"},"animated":{"kind":"boolean","defaultValue":true}}};
const snippetFamilies12=<String,String>{"tree-grid-cell":"tree-grid"};
class AdvancedSnippet12 extends StatefulWidget {final String slug='tree-grid-cell';final Map<String,Object?> properties=const {"label": "Registros", "acceptChanges": true, "expanded": false, "direction": "ltr", "animated": true};const AdvancedSnippet12({super.key});@override State<AdvancedSnippet12> createState()=>_AdvancedSnippetState12();}
class _AdvancedSnippetState12 extends State<AdvancedSnippet12> {
  int requests = 0, screen = 0;
  String result = '';
  ForgeDataGridSort? sort;
  List<String> expanded = [];
  late ForgeODataFilterExpression expression;
  String get family => snippetFamilies12[widget.slug]!;
  Object? prop(String k) =>
      widget.properties[k] ??
      snippetContracts12[widget.slug]?[k]?['defaultValue'];
  String text(String k) => prop(k) as String;
  bool flag(String k) => prop(k) == true;
  T choice<T extends Enum>(String k, List<T> values) =>
      values.firstWhere((v) => v.name == prop(k));
  @override
  void initState() {
    super.initState();
    expanded = flag('expanded') ? ['parent'] : [];
    expression = ForgeODataFilterGroupData(
        id: 'root',
        operator: ForgeODataFilterConjunction.and,
        children: [
          createForgeODataFilterCondition(amount, 'amount-condition')
        ]);
  }

  @override
  void didUpdateWidget(covariant AdvancedSnippet12 old) {
    super.didUpdateWidget(old);
    if (old.properties['expanded'] != widget.properties['expanded'])
      expanded = flag('expanded') ? ['parent'] : [];
  }

  void event(String value) {
    setState(() {
      requests++;
      result = value;
    });
  }

  static const amount = ForgeODataFilterField(
      id: 'amount',
      path: 'Amount',
      label: 'Valor',
      kind: ForgeODataFilterKind.decimal,
      precision: 40,
      scale: 4);
  static const labels = ForgeODataFilterLabels(
      field: 'Campo',
      operator: 'Operador',
      value: 'Valor',
      remove: 'Remover',
      addCondition: 'Adicionar condição',
      addGroup: 'Adicionar grupo',
      group: 'Grupo',
      and: 'E',
      or: 'Ou',
      apply: 'Aplicar',
      clear: 'Limpar',
      cancel: 'Cancelar',
      all: 'Todos',
      yes: 'Sim',
      no: 'Não',
      minimum: 'Mínimo',
      maximum: 'Máximo',
      invalid: 'Expressão inválida',
      unsupported: 'Expressão não suportada no modo simples',
      operatorLabels: {
        ForgeODataFilterOperator.eq: 'Igual',
        ForgeODataFilterOperator.ne: 'Diferente',
        ForgeODataFilterOperator.contains: 'Contém',
        ForgeODataFilterOperator.startswith: 'Começa com',
        ForgeODataFilterOperator.endswith: 'Termina com',
        ForgeODataFilterOperator.gt: 'Maior',
        ForgeODataFilterOperator.ge: 'Maior ou igual',
        ForgeODataFilterOperator.lt: 'Menor',
        ForgeODataFilterOperator.le: 'Menor ou igual',
        ForgeODataFilterOperator.between: 'Entre',
        ForgeODataFilterOperator.inValues: 'Em'
      });
  Widget field() => const ForgeInput(semanticLabel: 'Conteúdo preservado');
  Widget action() => ForgeButton(
      onPressed: () => event('Ação do consumidor'),
      child: Text(text('actionLabel')));
  Widget grid() {
    final rows = flag('empty') ? <String>[] : ['Beta', 'Alpha', 'Gamma'];
    if (sort != null)
      rows.sort((a, b) => sort!.direction == ForgeSortDirection.ascending
          ? a.compareTo(b)
          : b.compareTo(a));
    return ForgeDataGrid<String>(
        label: text('label'),
        rows: rows,
        getRowKey: (r) => r,
        sort: sort,
        onSortChange: (v) {
          setState(() {
            requests++;
            if (flag('acceptChanges')) sort = v;
          });
        },
        emptyContent: const Text('Nenhum registro'),
        fullWidth: flag('fullWidth'),
        showBorders: flag('showBorders'),
        showColumnLines: flag('showColumnLines'),
        showRowLines: flag('showRowLines'),
        rowAlternationEnabled: flag('rowAlternationEnabled'),
        size: choice('size', ForgeSize.values),
        columns: [
          ForgeDataGridColumn(
              key: 'name',
              header: 'Nome',
              renderCell: Text.new,
              sortable: true,
              sortLabel: 'Ordenar nomes'),
          ForgeDataGridColumn(
              key: 'action',
              header: 'Ação',
              renderCell: (r) => ForgeButton(
                  onPressed: () => event(r), child: const Text('Selecionar')))
        ],
        children: const [
          ForgeDataGridHeader(),
          ForgeDataGridBody(),
          ForgeDataGridFooter(child: Text('Rodapé da tabela'))
        ]);
  }

  Widget treeGrid() => ForgeTreeGrid<String>(
      label: text('label'),
      nodes: [
        ForgeTreeGridNode(
            key: 'parent',
            item: 'Equipe',
            children: [ForgeTreeGridNode(key: 'child', item: 'Pessoa')])
      ],
      getNodeLabel: (r) => r,
      expandedValue: expanded,
      onExpandedValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expanded = v;
        });
      },
      direction: choice('direction', ForgeNavigationDirection.values),
      animated: flag('animated'),
      columns: [
        ForgeTreeGridColumn(key: 'name', header: 'Nome', getCellText: (r) => r),
        ForgeTreeGridColumn(
            key: 'detail',
            header: 'Detalhe',
            getCellText: (r) => r + ' — detalhe')
      ],
      children: const [
        ForgeTreeGridHeader(),
        ForgeTreeGridBody(),
        ForgeTreeGridFooter(child: Text('Rodapé da hierarquia'))
      ]);
  Widget template() {
    final title = Text(text('titleText')),
        body = Column(children: [Text(text('bodyText')), field()]);
    final optional = flag('showSlots');
    return switch (family) {
      'application-layout-template' => SizedBox(
          height: 420,
          child: ForgeApplicationLayoutTemplate(
              header: optional ? title : null,
              navigation: optional ? const Text('Navegação') : null,
              toolbar: optional ? action() : null,
              footer: optional ? const Text('Rodapé') : null,
              mainId: 'forge-demo-main',
              child: body)),
      'showcase-page-template' => ForgeShowcasePageTemplate(
          title: optional ? title : null,
          navigation: optional ? const Text('Catálogo') : null,
          toolbar: optional ? action() : null,
          child: body),
      'home-page' => ForgeHomePageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          quickActions: optional ? action() : null,
          summary: optional ? const Text('Resumo') : null,
          child: body),
      'list-page' => ForgeListPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          filters: optional ? const Text('Filtros') : null,
          pagination: optional ? const Text('Paginação do consumidor') : null,
          child: body),
      'detail-page' => ForgeDetailPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          aside: optional ? const Text('Informações complementares') : null,
          child: body),
      'form-page' => ForgeFormPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          notice: optional ? const Text('Aviso do formulário') : null,
          child: body),
      _ => throw StateError(family)
    };
  }

  Widget transition() => Column(children: [
        ForgeButton(
            onPressed: () => setState(() => screen++),
            child: const Text('Trocar tela')),
        ForgePageTransition(
            screenKey: screen,
            intent: choice('intent', ForgePageTransitionIntent.values),
            animated: flag('animated'),
            child: Text('Tela $screen'))
      ]);
  Widget shared(BuildContext context) => Column(children: [
        ForgeSharedElement(
            name: 'forge-demo-element',
            animated: flag('animated'),
            child: SizedBox(
                width: 240,
                height: 80,
                child: Material(
                    type: MaterialType.transparency,
                    child: Center(child: Text(text('titleText')))))),
        ForgeButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute<void>(
                builder: (context) => Scaffold(
                        body: SafeArea(
                            child: Column(children: [
                      ForgeSharedElement(
                          name: 'forge-demo-element',
                          animated: flag('animated'),
                          child: SizedBox(
                              width: 240,
                              height: 80,
                              child: Material(
                                  type: MaterialType.transparency,
                                  child:
                                      Center(child: Text(text('titleText')))))),
                      ForgeButton(
                          onPressed: () => Navigator.of(context).pop(),
                          child: const Text('Voltar'))
                    ]))))),
            child: const Text('Abrir destino'))
      ]);
  Widget map() => ForgeMapView(
      label: text('label'),
      description:
          'Demonstração esquemática sem navegação nem localização real',
      status: choice('status', ForgeMapViewStatus.values),
      scene: ForgeMapScene(markers: [
        ForgeMapMarker(
            id: 'origin',
            label: 'Origem',
            coordinate:
                const ForgeMapCoordinate(latitude: -23.55, longitude: -46.63),
            kind: ForgeMapMarkerKind.origin)
      ]),
      renderer: const ForgeSchematicMapRenderer(),
      labels: const ForgeMapViewLabelsData(
          loading: 'Carregando mapa',
          empty: 'Sem pontos',
          unavailable: 'Mapa indisponível',
          schematic: 'Mapa esquemático, sem navegação'),
      onRendererError: (e) => event('Falha do renderizador'));
  Widget odata() => ForgeODataFilter(
      mode: choice('mode', ForgeODataFilterMode.values),
      fields: const [amount],
      value: expression,
      onValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expression = v;
        });
      },
      onApply: (v, filter) => event(filter),
      onCancel: () => event('Cancelado'),
      labels: labels,
      disabled: flag('disabled'),
      actionsLayout:
          choice('actionsLayout', ForgeODataFilterActionsLayout.values));
  @override
  Widget build(BuildContext context) =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        switch (family) {
          'data-grid' => grid(),
          'tree-grid' => treeGrid(),
          'page-transition' => transition(),
          'shared-element' => shared(context),
          'map-view' => map(),
          'o-data-filter' => odata(),
          _ => template()
        },
        Text('Solicitações: $requests'),
        if (result.isNotEmpty) Text(result)
      ]);
}

// Canonical parts are created by their native owner, not duplicated focus owners: TreeGridFooter.
const snippetContracts13=<String,Map<String,Map<String,Object?>>>{"tree-grid-footer":{"label":{"kind":"text","defaultValue":"Registros","nonblank":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"expanded":{"kind":"boolean","defaultValue":false},"direction":{"kind":"select","options":["ltr","rtl"],"defaultValue":"ltr"},"animated":{"kind":"boolean","defaultValue":true}}};
const snippetFamilies13=<String,String>{"tree-grid-footer":"tree-grid"};
class AdvancedSnippet13 extends StatefulWidget {final String slug='tree-grid-footer';final Map<String,Object?> properties=const {"label": "Registros", "acceptChanges": true, "expanded": false, "direction": "ltr", "animated": true};const AdvancedSnippet13({super.key});@override State<AdvancedSnippet13> createState()=>_AdvancedSnippetState13();}
class _AdvancedSnippetState13 extends State<AdvancedSnippet13> {
  int requests = 0, screen = 0;
  String result = '';
  ForgeDataGridSort? sort;
  List<String> expanded = [];
  late ForgeODataFilterExpression expression;
  String get family => snippetFamilies13[widget.slug]!;
  Object? prop(String k) =>
      widget.properties[k] ??
      snippetContracts13[widget.slug]?[k]?['defaultValue'];
  String text(String k) => prop(k) as String;
  bool flag(String k) => prop(k) == true;
  T choice<T extends Enum>(String k, List<T> values) =>
      values.firstWhere((v) => v.name == prop(k));
  @override
  void initState() {
    super.initState();
    expanded = flag('expanded') ? ['parent'] : [];
    expression = ForgeODataFilterGroupData(
        id: 'root',
        operator: ForgeODataFilterConjunction.and,
        children: [
          createForgeODataFilterCondition(amount, 'amount-condition')
        ]);
  }

  @override
  void didUpdateWidget(covariant AdvancedSnippet13 old) {
    super.didUpdateWidget(old);
    if (old.properties['expanded'] != widget.properties['expanded'])
      expanded = flag('expanded') ? ['parent'] : [];
  }

  void event(String value) {
    setState(() {
      requests++;
      result = value;
    });
  }

  static const amount = ForgeODataFilterField(
      id: 'amount',
      path: 'Amount',
      label: 'Valor',
      kind: ForgeODataFilterKind.decimal,
      precision: 40,
      scale: 4);
  static const labels = ForgeODataFilterLabels(
      field: 'Campo',
      operator: 'Operador',
      value: 'Valor',
      remove: 'Remover',
      addCondition: 'Adicionar condição',
      addGroup: 'Adicionar grupo',
      group: 'Grupo',
      and: 'E',
      or: 'Ou',
      apply: 'Aplicar',
      clear: 'Limpar',
      cancel: 'Cancelar',
      all: 'Todos',
      yes: 'Sim',
      no: 'Não',
      minimum: 'Mínimo',
      maximum: 'Máximo',
      invalid: 'Expressão inválida',
      unsupported: 'Expressão não suportada no modo simples',
      operatorLabels: {
        ForgeODataFilterOperator.eq: 'Igual',
        ForgeODataFilterOperator.ne: 'Diferente',
        ForgeODataFilterOperator.contains: 'Contém',
        ForgeODataFilterOperator.startswith: 'Começa com',
        ForgeODataFilterOperator.endswith: 'Termina com',
        ForgeODataFilterOperator.gt: 'Maior',
        ForgeODataFilterOperator.ge: 'Maior ou igual',
        ForgeODataFilterOperator.lt: 'Menor',
        ForgeODataFilterOperator.le: 'Menor ou igual',
        ForgeODataFilterOperator.between: 'Entre',
        ForgeODataFilterOperator.inValues: 'Em'
      });
  Widget field() => const ForgeInput(semanticLabel: 'Conteúdo preservado');
  Widget action() => ForgeButton(
      onPressed: () => event('Ação do consumidor'),
      child: Text(text('actionLabel')));
  Widget grid() {
    final rows = flag('empty') ? <String>[] : ['Beta', 'Alpha', 'Gamma'];
    if (sort != null)
      rows.sort((a, b) => sort!.direction == ForgeSortDirection.ascending
          ? a.compareTo(b)
          : b.compareTo(a));
    return ForgeDataGrid<String>(
        label: text('label'),
        rows: rows,
        getRowKey: (r) => r,
        sort: sort,
        onSortChange: (v) {
          setState(() {
            requests++;
            if (flag('acceptChanges')) sort = v;
          });
        },
        emptyContent: const Text('Nenhum registro'),
        fullWidth: flag('fullWidth'),
        showBorders: flag('showBorders'),
        showColumnLines: flag('showColumnLines'),
        showRowLines: flag('showRowLines'),
        rowAlternationEnabled: flag('rowAlternationEnabled'),
        size: choice('size', ForgeSize.values),
        columns: [
          ForgeDataGridColumn(
              key: 'name',
              header: 'Nome',
              renderCell: Text.new,
              sortable: true,
              sortLabel: 'Ordenar nomes'),
          ForgeDataGridColumn(
              key: 'action',
              header: 'Ação',
              renderCell: (r) => ForgeButton(
                  onPressed: () => event(r), child: const Text('Selecionar')))
        ],
        children: const [
          ForgeDataGridHeader(),
          ForgeDataGridBody(),
          ForgeDataGridFooter(child: Text('Rodapé da tabela'))
        ]);
  }

  Widget treeGrid() => ForgeTreeGrid<String>(
      label: text('label'),
      nodes: [
        ForgeTreeGridNode(
            key: 'parent',
            item: 'Equipe',
            children: [ForgeTreeGridNode(key: 'child', item: 'Pessoa')])
      ],
      getNodeLabel: (r) => r,
      expandedValue: expanded,
      onExpandedValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expanded = v;
        });
      },
      direction: choice('direction', ForgeNavigationDirection.values),
      animated: flag('animated'),
      columns: [
        ForgeTreeGridColumn(key: 'name', header: 'Nome', getCellText: (r) => r),
        ForgeTreeGridColumn(
            key: 'detail',
            header: 'Detalhe',
            getCellText: (r) => r + ' — detalhe')
      ],
      children: const [
        ForgeTreeGridHeader(),
        ForgeTreeGridBody(),
        ForgeTreeGridFooter(child: Text('Rodapé da hierarquia'))
      ]);
  Widget template() {
    final title = Text(text('titleText')),
        body = Column(children: [Text(text('bodyText')), field()]);
    final optional = flag('showSlots');
    return switch (family) {
      'application-layout-template' => SizedBox(
          height: 420,
          child: ForgeApplicationLayoutTemplate(
              header: optional ? title : null,
              navigation: optional ? const Text('Navegação') : null,
              toolbar: optional ? action() : null,
              footer: optional ? const Text('Rodapé') : null,
              mainId: 'forge-demo-main',
              child: body)),
      'showcase-page-template' => ForgeShowcasePageTemplate(
          title: optional ? title : null,
          navigation: optional ? const Text('Catálogo') : null,
          toolbar: optional ? action() : null,
          child: body),
      'home-page' => ForgeHomePageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          quickActions: optional ? action() : null,
          summary: optional ? const Text('Resumo') : null,
          child: body),
      'list-page' => ForgeListPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          filters: optional ? const Text('Filtros') : null,
          pagination: optional ? const Text('Paginação do consumidor') : null,
          child: body),
      'detail-page' => ForgeDetailPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          aside: optional ? const Text('Informações complementares') : null,
          child: body),
      'form-page' => ForgeFormPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          notice: optional ? const Text('Aviso do formulário') : null,
          child: body),
      _ => throw StateError(family)
    };
  }

  Widget transition() => Column(children: [
        ForgeButton(
            onPressed: () => setState(() => screen++),
            child: const Text('Trocar tela')),
        ForgePageTransition(
            screenKey: screen,
            intent: choice('intent', ForgePageTransitionIntent.values),
            animated: flag('animated'),
            child: Text('Tela $screen'))
      ]);
  Widget shared(BuildContext context) => Column(children: [
        ForgeSharedElement(
            name: 'forge-demo-element',
            animated: flag('animated'),
            child: SizedBox(
                width: 240,
                height: 80,
                child: Material(
                    type: MaterialType.transparency,
                    child: Center(child: Text(text('titleText')))))),
        ForgeButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute<void>(
                builder: (context) => Scaffold(
                        body: SafeArea(
                            child: Column(children: [
                      ForgeSharedElement(
                          name: 'forge-demo-element',
                          animated: flag('animated'),
                          child: SizedBox(
                              width: 240,
                              height: 80,
                              child: Material(
                                  type: MaterialType.transparency,
                                  child:
                                      Center(child: Text(text('titleText')))))),
                      ForgeButton(
                          onPressed: () => Navigator.of(context).pop(),
                          child: const Text('Voltar'))
                    ]))))),
            child: const Text('Abrir destino'))
      ]);
  Widget map() => ForgeMapView(
      label: text('label'),
      description:
          'Demonstração esquemática sem navegação nem localização real',
      status: choice('status', ForgeMapViewStatus.values),
      scene: ForgeMapScene(markers: [
        ForgeMapMarker(
            id: 'origin',
            label: 'Origem',
            coordinate:
                const ForgeMapCoordinate(latitude: -23.55, longitude: -46.63),
            kind: ForgeMapMarkerKind.origin)
      ]),
      renderer: const ForgeSchematicMapRenderer(),
      labels: const ForgeMapViewLabelsData(
          loading: 'Carregando mapa',
          empty: 'Sem pontos',
          unavailable: 'Mapa indisponível',
          schematic: 'Mapa esquemático, sem navegação'),
      onRendererError: (e) => event('Falha do renderizador'));
  Widget odata() => ForgeODataFilter(
      mode: choice('mode', ForgeODataFilterMode.values),
      fields: const [amount],
      value: expression,
      onValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expression = v;
        });
      },
      onApply: (v, filter) => event(filter),
      onCancel: () => event('Cancelado'),
      labels: labels,
      disabled: flag('disabled'),
      actionsLayout:
          choice('actionsLayout', ForgeODataFilterActionsLayout.values));
  @override
  Widget build(BuildContext context) =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        switch (family) {
          'data-grid' => grid(),
          'tree-grid' => treeGrid(),
          'page-transition' => transition(),
          'shared-element' => shared(context),
          'map-view' => map(),
          'o-data-filter' => odata(),
          _ => template()
        },
        Text('Solicitações: $requests'),
        if (result.isNotEmpty) Text(result)
      ]);
}

// Canonical parts are created by their native owner, not duplicated focus owners: ApplicationLayoutTemplate.
const snippetContracts14=<String,Map<String,Map<String,Object?>>>{"application-layout-template":{"titleText":{"kind":"text","defaultValue":"Página Forge","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo da página","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Executar ação","nonblank":true},"showSlots":{"kind":"boolean","defaultValue":true}}};
const snippetFamilies14=<String,String>{"application-layout-template":"application-layout-template"};
class AdvancedSnippet14 extends StatefulWidget {final String slug='application-layout-template';final Map<String,Object?> properties=const {"titleText": "Página Forge", "bodyText": "Conteúdo da página", "actionLabel": "Executar ação", "showSlots": true};const AdvancedSnippet14({super.key});@override State<AdvancedSnippet14> createState()=>_AdvancedSnippetState14();}
class _AdvancedSnippetState14 extends State<AdvancedSnippet14> {
  int requests = 0, screen = 0;
  String result = '';
  ForgeDataGridSort? sort;
  List<String> expanded = [];
  late ForgeODataFilterExpression expression;
  String get family => snippetFamilies14[widget.slug]!;
  Object? prop(String k) =>
      widget.properties[k] ??
      snippetContracts14[widget.slug]?[k]?['defaultValue'];
  String text(String k) => prop(k) as String;
  bool flag(String k) => prop(k) == true;
  T choice<T extends Enum>(String k, List<T> values) =>
      values.firstWhere((v) => v.name == prop(k));
  @override
  void initState() {
    super.initState();
    expanded = flag('expanded') ? ['parent'] : [];
    expression = ForgeODataFilterGroupData(
        id: 'root',
        operator: ForgeODataFilterConjunction.and,
        children: [
          createForgeODataFilterCondition(amount, 'amount-condition')
        ]);
  }

  @override
  void didUpdateWidget(covariant AdvancedSnippet14 old) {
    super.didUpdateWidget(old);
    if (old.properties['expanded'] != widget.properties['expanded'])
      expanded = flag('expanded') ? ['parent'] : [];
  }

  void event(String value) {
    setState(() {
      requests++;
      result = value;
    });
  }

  static const amount = ForgeODataFilterField(
      id: 'amount',
      path: 'Amount',
      label: 'Valor',
      kind: ForgeODataFilterKind.decimal,
      precision: 40,
      scale: 4);
  static const labels = ForgeODataFilterLabels(
      field: 'Campo',
      operator: 'Operador',
      value: 'Valor',
      remove: 'Remover',
      addCondition: 'Adicionar condição',
      addGroup: 'Adicionar grupo',
      group: 'Grupo',
      and: 'E',
      or: 'Ou',
      apply: 'Aplicar',
      clear: 'Limpar',
      cancel: 'Cancelar',
      all: 'Todos',
      yes: 'Sim',
      no: 'Não',
      minimum: 'Mínimo',
      maximum: 'Máximo',
      invalid: 'Expressão inválida',
      unsupported: 'Expressão não suportada no modo simples',
      operatorLabels: {
        ForgeODataFilterOperator.eq: 'Igual',
        ForgeODataFilterOperator.ne: 'Diferente',
        ForgeODataFilterOperator.contains: 'Contém',
        ForgeODataFilterOperator.startswith: 'Começa com',
        ForgeODataFilterOperator.endswith: 'Termina com',
        ForgeODataFilterOperator.gt: 'Maior',
        ForgeODataFilterOperator.ge: 'Maior ou igual',
        ForgeODataFilterOperator.lt: 'Menor',
        ForgeODataFilterOperator.le: 'Menor ou igual',
        ForgeODataFilterOperator.between: 'Entre',
        ForgeODataFilterOperator.inValues: 'Em'
      });
  Widget field() => const ForgeInput(semanticLabel: 'Conteúdo preservado');
  Widget action() => ForgeButton(
      onPressed: () => event('Ação do consumidor'),
      child: Text(text('actionLabel')));
  Widget grid() {
    final rows = flag('empty') ? <String>[] : ['Beta', 'Alpha', 'Gamma'];
    if (sort != null)
      rows.sort((a, b) => sort!.direction == ForgeSortDirection.ascending
          ? a.compareTo(b)
          : b.compareTo(a));
    return ForgeDataGrid<String>(
        label: text('label'),
        rows: rows,
        getRowKey: (r) => r,
        sort: sort,
        onSortChange: (v) {
          setState(() {
            requests++;
            if (flag('acceptChanges')) sort = v;
          });
        },
        emptyContent: const Text('Nenhum registro'),
        fullWidth: flag('fullWidth'),
        showBorders: flag('showBorders'),
        showColumnLines: flag('showColumnLines'),
        showRowLines: flag('showRowLines'),
        rowAlternationEnabled: flag('rowAlternationEnabled'),
        size: choice('size', ForgeSize.values),
        columns: [
          ForgeDataGridColumn(
              key: 'name',
              header: 'Nome',
              renderCell: Text.new,
              sortable: true,
              sortLabel: 'Ordenar nomes'),
          ForgeDataGridColumn(
              key: 'action',
              header: 'Ação',
              renderCell: (r) => ForgeButton(
                  onPressed: () => event(r), child: const Text('Selecionar')))
        ],
        children: const [
          ForgeDataGridHeader(),
          ForgeDataGridBody(),
          ForgeDataGridFooter(child: Text('Rodapé da tabela'))
        ]);
  }

  Widget treeGrid() => ForgeTreeGrid<String>(
      label: text('label'),
      nodes: [
        ForgeTreeGridNode(
            key: 'parent',
            item: 'Equipe',
            children: [ForgeTreeGridNode(key: 'child', item: 'Pessoa')])
      ],
      getNodeLabel: (r) => r,
      expandedValue: expanded,
      onExpandedValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expanded = v;
        });
      },
      direction: choice('direction', ForgeNavigationDirection.values),
      animated: flag('animated'),
      columns: [
        ForgeTreeGridColumn(key: 'name', header: 'Nome', getCellText: (r) => r),
        ForgeTreeGridColumn(
            key: 'detail',
            header: 'Detalhe',
            getCellText: (r) => r + ' — detalhe')
      ],
      children: const [
        ForgeTreeGridHeader(),
        ForgeTreeGridBody(),
        ForgeTreeGridFooter(child: Text('Rodapé da hierarquia'))
      ]);
  Widget template() {
    final title = Text(text('titleText')),
        body = Column(children: [Text(text('bodyText')), field()]);
    final optional = flag('showSlots');
    return switch (family) {
      'application-layout-template' => SizedBox(
          height: 420,
          child: ForgeApplicationLayoutTemplate(
              header: optional ? title : null,
              navigation: optional ? const Text('Navegação') : null,
              toolbar: optional ? action() : null,
              footer: optional ? const Text('Rodapé') : null,
              mainId: 'forge-demo-main',
              child: body)),
      'showcase-page-template' => ForgeShowcasePageTemplate(
          title: optional ? title : null,
          navigation: optional ? const Text('Catálogo') : null,
          toolbar: optional ? action() : null,
          child: body),
      'home-page' => ForgeHomePageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          quickActions: optional ? action() : null,
          summary: optional ? const Text('Resumo') : null,
          child: body),
      'list-page' => ForgeListPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          filters: optional ? const Text('Filtros') : null,
          pagination: optional ? const Text('Paginação do consumidor') : null,
          child: body),
      'detail-page' => ForgeDetailPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          aside: optional ? const Text('Informações complementares') : null,
          child: body),
      'form-page' => ForgeFormPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          notice: optional ? const Text('Aviso do formulário') : null,
          child: body),
      _ => throw StateError(family)
    };
  }

  Widget transition() => Column(children: [
        ForgeButton(
            onPressed: () => setState(() => screen++),
            child: const Text('Trocar tela')),
        ForgePageTransition(
            screenKey: screen,
            intent: choice('intent', ForgePageTransitionIntent.values),
            animated: flag('animated'),
            child: Text('Tela $screen'))
      ]);
  Widget shared(BuildContext context) => Column(children: [
        ForgeSharedElement(
            name: 'forge-demo-element',
            animated: flag('animated'),
            child: SizedBox(
                width: 240,
                height: 80,
                child: Material(
                    type: MaterialType.transparency,
                    child: Center(child: Text(text('titleText')))))),
        ForgeButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute<void>(
                builder: (context) => Scaffold(
                        body: SafeArea(
                            child: Column(children: [
                      ForgeSharedElement(
                          name: 'forge-demo-element',
                          animated: flag('animated'),
                          child: SizedBox(
                              width: 240,
                              height: 80,
                              child: Material(
                                  type: MaterialType.transparency,
                                  child:
                                      Center(child: Text(text('titleText')))))),
                      ForgeButton(
                          onPressed: () => Navigator.of(context).pop(),
                          child: const Text('Voltar'))
                    ]))))),
            child: const Text('Abrir destino'))
      ]);
  Widget map() => ForgeMapView(
      label: text('label'),
      description:
          'Demonstração esquemática sem navegação nem localização real',
      status: choice('status', ForgeMapViewStatus.values),
      scene: ForgeMapScene(markers: [
        ForgeMapMarker(
            id: 'origin',
            label: 'Origem',
            coordinate:
                const ForgeMapCoordinate(latitude: -23.55, longitude: -46.63),
            kind: ForgeMapMarkerKind.origin)
      ]),
      renderer: const ForgeSchematicMapRenderer(),
      labels: const ForgeMapViewLabelsData(
          loading: 'Carregando mapa',
          empty: 'Sem pontos',
          unavailable: 'Mapa indisponível',
          schematic: 'Mapa esquemático, sem navegação'),
      onRendererError: (e) => event('Falha do renderizador'));
  Widget odata() => ForgeODataFilter(
      mode: choice('mode', ForgeODataFilterMode.values),
      fields: const [amount],
      value: expression,
      onValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expression = v;
        });
      },
      onApply: (v, filter) => event(filter),
      onCancel: () => event('Cancelado'),
      labels: labels,
      disabled: flag('disabled'),
      actionsLayout:
          choice('actionsLayout', ForgeODataFilterActionsLayout.values));
  @override
  Widget build(BuildContext context) =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        switch (family) {
          'data-grid' => grid(),
          'tree-grid' => treeGrid(),
          'page-transition' => transition(),
          'shared-element' => shared(context),
          'map-view' => map(),
          'o-data-filter' => odata(),
          _ => template()
        },
        Text('Solicitações: $requests'),
        if (result.isNotEmpty) Text(result)
      ]);
}

// Canonical parts are created by their native owner, not duplicated focus owners: ApplicationLayoutHeader.
const snippetContracts15=<String,Map<String,Map<String,Object?>>>{"application-layout-header":{"titleText":{"kind":"text","defaultValue":"Página Forge","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo da página","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Executar ação","nonblank":true},"showSlots":{"kind":"boolean","defaultValue":true}}};
const snippetFamilies15=<String,String>{"application-layout-header":"application-layout-template"};
class AdvancedSnippet15 extends StatefulWidget {final String slug='application-layout-header';final Map<String,Object?> properties=const {"titleText": "Página Forge", "bodyText": "Conteúdo da página", "actionLabel": "Executar ação", "showSlots": true};const AdvancedSnippet15({super.key});@override State<AdvancedSnippet15> createState()=>_AdvancedSnippetState15();}
class _AdvancedSnippetState15 extends State<AdvancedSnippet15> {
  int requests = 0, screen = 0;
  String result = '';
  ForgeDataGridSort? sort;
  List<String> expanded = [];
  late ForgeODataFilterExpression expression;
  String get family => snippetFamilies15[widget.slug]!;
  Object? prop(String k) =>
      widget.properties[k] ??
      snippetContracts15[widget.slug]?[k]?['defaultValue'];
  String text(String k) => prop(k) as String;
  bool flag(String k) => prop(k) == true;
  T choice<T extends Enum>(String k, List<T> values) =>
      values.firstWhere((v) => v.name == prop(k));
  @override
  void initState() {
    super.initState();
    expanded = flag('expanded') ? ['parent'] : [];
    expression = ForgeODataFilterGroupData(
        id: 'root',
        operator: ForgeODataFilterConjunction.and,
        children: [
          createForgeODataFilterCondition(amount, 'amount-condition')
        ]);
  }

  @override
  void didUpdateWidget(covariant AdvancedSnippet15 old) {
    super.didUpdateWidget(old);
    if (old.properties['expanded'] != widget.properties['expanded'])
      expanded = flag('expanded') ? ['parent'] : [];
  }

  void event(String value) {
    setState(() {
      requests++;
      result = value;
    });
  }

  static const amount = ForgeODataFilterField(
      id: 'amount',
      path: 'Amount',
      label: 'Valor',
      kind: ForgeODataFilterKind.decimal,
      precision: 40,
      scale: 4);
  static const labels = ForgeODataFilterLabels(
      field: 'Campo',
      operator: 'Operador',
      value: 'Valor',
      remove: 'Remover',
      addCondition: 'Adicionar condição',
      addGroup: 'Adicionar grupo',
      group: 'Grupo',
      and: 'E',
      or: 'Ou',
      apply: 'Aplicar',
      clear: 'Limpar',
      cancel: 'Cancelar',
      all: 'Todos',
      yes: 'Sim',
      no: 'Não',
      minimum: 'Mínimo',
      maximum: 'Máximo',
      invalid: 'Expressão inválida',
      unsupported: 'Expressão não suportada no modo simples',
      operatorLabels: {
        ForgeODataFilterOperator.eq: 'Igual',
        ForgeODataFilterOperator.ne: 'Diferente',
        ForgeODataFilterOperator.contains: 'Contém',
        ForgeODataFilterOperator.startswith: 'Começa com',
        ForgeODataFilterOperator.endswith: 'Termina com',
        ForgeODataFilterOperator.gt: 'Maior',
        ForgeODataFilterOperator.ge: 'Maior ou igual',
        ForgeODataFilterOperator.lt: 'Menor',
        ForgeODataFilterOperator.le: 'Menor ou igual',
        ForgeODataFilterOperator.between: 'Entre',
        ForgeODataFilterOperator.inValues: 'Em'
      });
  Widget field() => const ForgeInput(semanticLabel: 'Conteúdo preservado');
  Widget action() => ForgeButton(
      onPressed: () => event('Ação do consumidor'),
      child: Text(text('actionLabel')));
  Widget grid() {
    final rows = flag('empty') ? <String>[] : ['Beta', 'Alpha', 'Gamma'];
    if (sort != null)
      rows.sort((a, b) => sort!.direction == ForgeSortDirection.ascending
          ? a.compareTo(b)
          : b.compareTo(a));
    return ForgeDataGrid<String>(
        label: text('label'),
        rows: rows,
        getRowKey: (r) => r,
        sort: sort,
        onSortChange: (v) {
          setState(() {
            requests++;
            if (flag('acceptChanges')) sort = v;
          });
        },
        emptyContent: const Text('Nenhum registro'),
        fullWidth: flag('fullWidth'),
        showBorders: flag('showBorders'),
        showColumnLines: flag('showColumnLines'),
        showRowLines: flag('showRowLines'),
        rowAlternationEnabled: flag('rowAlternationEnabled'),
        size: choice('size', ForgeSize.values),
        columns: [
          ForgeDataGridColumn(
              key: 'name',
              header: 'Nome',
              renderCell: Text.new,
              sortable: true,
              sortLabel: 'Ordenar nomes'),
          ForgeDataGridColumn(
              key: 'action',
              header: 'Ação',
              renderCell: (r) => ForgeButton(
                  onPressed: () => event(r), child: const Text('Selecionar')))
        ],
        children: const [
          ForgeDataGridHeader(),
          ForgeDataGridBody(),
          ForgeDataGridFooter(child: Text('Rodapé da tabela'))
        ]);
  }

  Widget treeGrid() => ForgeTreeGrid<String>(
      label: text('label'),
      nodes: [
        ForgeTreeGridNode(
            key: 'parent',
            item: 'Equipe',
            children: [ForgeTreeGridNode(key: 'child', item: 'Pessoa')])
      ],
      getNodeLabel: (r) => r,
      expandedValue: expanded,
      onExpandedValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expanded = v;
        });
      },
      direction: choice('direction', ForgeNavigationDirection.values),
      animated: flag('animated'),
      columns: [
        ForgeTreeGridColumn(key: 'name', header: 'Nome', getCellText: (r) => r),
        ForgeTreeGridColumn(
            key: 'detail',
            header: 'Detalhe',
            getCellText: (r) => r + ' — detalhe')
      ],
      children: const [
        ForgeTreeGridHeader(),
        ForgeTreeGridBody(),
        ForgeTreeGridFooter(child: Text('Rodapé da hierarquia'))
      ]);
  Widget template() {
    final title = Text(text('titleText')),
        body = Column(children: [Text(text('bodyText')), field()]);
    final optional = flag('showSlots');
    return switch (family) {
      'application-layout-template' => SizedBox(
          height: 420,
          child: ForgeApplicationLayoutTemplate(
              header: optional ? title : null,
              navigation: optional ? const Text('Navegação') : null,
              toolbar: optional ? action() : null,
              footer: optional ? const Text('Rodapé') : null,
              mainId: 'forge-demo-main',
              child: body)),
      'showcase-page-template' => ForgeShowcasePageTemplate(
          title: optional ? title : null,
          navigation: optional ? const Text('Catálogo') : null,
          toolbar: optional ? action() : null,
          child: body),
      'home-page' => ForgeHomePageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          quickActions: optional ? action() : null,
          summary: optional ? const Text('Resumo') : null,
          child: body),
      'list-page' => ForgeListPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          filters: optional ? const Text('Filtros') : null,
          pagination: optional ? const Text('Paginação do consumidor') : null,
          child: body),
      'detail-page' => ForgeDetailPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          aside: optional ? const Text('Informações complementares') : null,
          child: body),
      'form-page' => ForgeFormPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          notice: optional ? const Text('Aviso do formulário') : null,
          child: body),
      _ => throw StateError(family)
    };
  }

  Widget transition() => Column(children: [
        ForgeButton(
            onPressed: () => setState(() => screen++),
            child: const Text('Trocar tela')),
        ForgePageTransition(
            screenKey: screen,
            intent: choice('intent', ForgePageTransitionIntent.values),
            animated: flag('animated'),
            child: Text('Tela $screen'))
      ]);
  Widget shared(BuildContext context) => Column(children: [
        ForgeSharedElement(
            name: 'forge-demo-element',
            animated: flag('animated'),
            child: SizedBox(
                width: 240,
                height: 80,
                child: Material(
                    type: MaterialType.transparency,
                    child: Center(child: Text(text('titleText')))))),
        ForgeButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute<void>(
                builder: (context) => Scaffold(
                        body: SafeArea(
                            child: Column(children: [
                      ForgeSharedElement(
                          name: 'forge-demo-element',
                          animated: flag('animated'),
                          child: SizedBox(
                              width: 240,
                              height: 80,
                              child: Material(
                                  type: MaterialType.transparency,
                                  child:
                                      Center(child: Text(text('titleText')))))),
                      ForgeButton(
                          onPressed: () => Navigator.of(context).pop(),
                          child: const Text('Voltar'))
                    ]))))),
            child: const Text('Abrir destino'))
      ]);
  Widget map() => ForgeMapView(
      label: text('label'),
      description:
          'Demonstração esquemática sem navegação nem localização real',
      status: choice('status', ForgeMapViewStatus.values),
      scene: ForgeMapScene(markers: [
        ForgeMapMarker(
            id: 'origin',
            label: 'Origem',
            coordinate:
                const ForgeMapCoordinate(latitude: -23.55, longitude: -46.63),
            kind: ForgeMapMarkerKind.origin)
      ]),
      renderer: const ForgeSchematicMapRenderer(),
      labels: const ForgeMapViewLabelsData(
          loading: 'Carregando mapa',
          empty: 'Sem pontos',
          unavailable: 'Mapa indisponível',
          schematic: 'Mapa esquemático, sem navegação'),
      onRendererError: (e) => event('Falha do renderizador'));
  Widget odata() => ForgeODataFilter(
      mode: choice('mode', ForgeODataFilterMode.values),
      fields: const [amount],
      value: expression,
      onValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expression = v;
        });
      },
      onApply: (v, filter) => event(filter),
      onCancel: () => event('Cancelado'),
      labels: labels,
      disabled: flag('disabled'),
      actionsLayout:
          choice('actionsLayout', ForgeODataFilterActionsLayout.values));
  @override
  Widget build(BuildContext context) =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        switch (family) {
          'data-grid' => grid(),
          'tree-grid' => treeGrid(),
          'page-transition' => transition(),
          'shared-element' => shared(context),
          'map-view' => map(),
          'o-data-filter' => odata(),
          _ => template()
        },
        Text('Solicitações: $requests'),
        if (result.isNotEmpty) Text(result)
      ]);
}

// Canonical parts are created by their native owner, not duplicated focus owners: ApplicationLayoutBody.
const snippetContracts16=<String,Map<String,Map<String,Object?>>>{"application-layout-body":{"titleText":{"kind":"text","defaultValue":"Página Forge","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo da página","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Executar ação","nonblank":true},"showSlots":{"kind":"boolean","defaultValue":true}}};
const snippetFamilies16=<String,String>{"application-layout-body":"application-layout-template"};
class AdvancedSnippet16 extends StatefulWidget {final String slug='application-layout-body';final Map<String,Object?> properties=const {"titleText": "Página Forge", "bodyText": "Conteúdo da página", "actionLabel": "Executar ação", "showSlots": true};const AdvancedSnippet16({super.key});@override State<AdvancedSnippet16> createState()=>_AdvancedSnippetState16();}
class _AdvancedSnippetState16 extends State<AdvancedSnippet16> {
  int requests = 0, screen = 0;
  String result = '';
  ForgeDataGridSort? sort;
  List<String> expanded = [];
  late ForgeODataFilterExpression expression;
  String get family => snippetFamilies16[widget.slug]!;
  Object? prop(String k) =>
      widget.properties[k] ??
      snippetContracts16[widget.slug]?[k]?['defaultValue'];
  String text(String k) => prop(k) as String;
  bool flag(String k) => prop(k) == true;
  T choice<T extends Enum>(String k, List<T> values) =>
      values.firstWhere((v) => v.name == prop(k));
  @override
  void initState() {
    super.initState();
    expanded = flag('expanded') ? ['parent'] : [];
    expression = ForgeODataFilterGroupData(
        id: 'root',
        operator: ForgeODataFilterConjunction.and,
        children: [
          createForgeODataFilterCondition(amount, 'amount-condition')
        ]);
  }

  @override
  void didUpdateWidget(covariant AdvancedSnippet16 old) {
    super.didUpdateWidget(old);
    if (old.properties['expanded'] != widget.properties['expanded'])
      expanded = flag('expanded') ? ['parent'] : [];
  }

  void event(String value) {
    setState(() {
      requests++;
      result = value;
    });
  }

  static const amount = ForgeODataFilterField(
      id: 'amount',
      path: 'Amount',
      label: 'Valor',
      kind: ForgeODataFilterKind.decimal,
      precision: 40,
      scale: 4);
  static const labels = ForgeODataFilterLabels(
      field: 'Campo',
      operator: 'Operador',
      value: 'Valor',
      remove: 'Remover',
      addCondition: 'Adicionar condição',
      addGroup: 'Adicionar grupo',
      group: 'Grupo',
      and: 'E',
      or: 'Ou',
      apply: 'Aplicar',
      clear: 'Limpar',
      cancel: 'Cancelar',
      all: 'Todos',
      yes: 'Sim',
      no: 'Não',
      minimum: 'Mínimo',
      maximum: 'Máximo',
      invalid: 'Expressão inválida',
      unsupported: 'Expressão não suportada no modo simples',
      operatorLabels: {
        ForgeODataFilterOperator.eq: 'Igual',
        ForgeODataFilterOperator.ne: 'Diferente',
        ForgeODataFilterOperator.contains: 'Contém',
        ForgeODataFilterOperator.startswith: 'Começa com',
        ForgeODataFilterOperator.endswith: 'Termina com',
        ForgeODataFilterOperator.gt: 'Maior',
        ForgeODataFilterOperator.ge: 'Maior ou igual',
        ForgeODataFilterOperator.lt: 'Menor',
        ForgeODataFilterOperator.le: 'Menor ou igual',
        ForgeODataFilterOperator.between: 'Entre',
        ForgeODataFilterOperator.inValues: 'Em'
      });
  Widget field() => const ForgeInput(semanticLabel: 'Conteúdo preservado');
  Widget action() => ForgeButton(
      onPressed: () => event('Ação do consumidor'),
      child: Text(text('actionLabel')));
  Widget grid() {
    final rows = flag('empty') ? <String>[] : ['Beta', 'Alpha', 'Gamma'];
    if (sort != null)
      rows.sort((a, b) => sort!.direction == ForgeSortDirection.ascending
          ? a.compareTo(b)
          : b.compareTo(a));
    return ForgeDataGrid<String>(
        label: text('label'),
        rows: rows,
        getRowKey: (r) => r,
        sort: sort,
        onSortChange: (v) {
          setState(() {
            requests++;
            if (flag('acceptChanges')) sort = v;
          });
        },
        emptyContent: const Text('Nenhum registro'),
        fullWidth: flag('fullWidth'),
        showBorders: flag('showBorders'),
        showColumnLines: flag('showColumnLines'),
        showRowLines: flag('showRowLines'),
        rowAlternationEnabled: flag('rowAlternationEnabled'),
        size: choice('size', ForgeSize.values),
        columns: [
          ForgeDataGridColumn(
              key: 'name',
              header: 'Nome',
              renderCell: Text.new,
              sortable: true,
              sortLabel: 'Ordenar nomes'),
          ForgeDataGridColumn(
              key: 'action',
              header: 'Ação',
              renderCell: (r) => ForgeButton(
                  onPressed: () => event(r), child: const Text('Selecionar')))
        ],
        children: const [
          ForgeDataGridHeader(),
          ForgeDataGridBody(),
          ForgeDataGridFooter(child: Text('Rodapé da tabela'))
        ]);
  }

  Widget treeGrid() => ForgeTreeGrid<String>(
      label: text('label'),
      nodes: [
        ForgeTreeGridNode(
            key: 'parent',
            item: 'Equipe',
            children: [ForgeTreeGridNode(key: 'child', item: 'Pessoa')])
      ],
      getNodeLabel: (r) => r,
      expandedValue: expanded,
      onExpandedValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expanded = v;
        });
      },
      direction: choice('direction', ForgeNavigationDirection.values),
      animated: flag('animated'),
      columns: [
        ForgeTreeGridColumn(key: 'name', header: 'Nome', getCellText: (r) => r),
        ForgeTreeGridColumn(
            key: 'detail',
            header: 'Detalhe',
            getCellText: (r) => r + ' — detalhe')
      ],
      children: const [
        ForgeTreeGridHeader(),
        ForgeTreeGridBody(),
        ForgeTreeGridFooter(child: Text('Rodapé da hierarquia'))
      ]);
  Widget template() {
    final title = Text(text('titleText')),
        body = Column(children: [Text(text('bodyText')), field()]);
    final optional = flag('showSlots');
    return switch (family) {
      'application-layout-template' => SizedBox(
          height: 420,
          child: ForgeApplicationLayoutTemplate(
              header: optional ? title : null,
              navigation: optional ? const Text('Navegação') : null,
              toolbar: optional ? action() : null,
              footer: optional ? const Text('Rodapé') : null,
              mainId: 'forge-demo-main',
              child: body)),
      'showcase-page-template' => ForgeShowcasePageTemplate(
          title: optional ? title : null,
          navigation: optional ? const Text('Catálogo') : null,
          toolbar: optional ? action() : null,
          child: body),
      'home-page' => ForgeHomePageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          quickActions: optional ? action() : null,
          summary: optional ? const Text('Resumo') : null,
          child: body),
      'list-page' => ForgeListPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          filters: optional ? const Text('Filtros') : null,
          pagination: optional ? const Text('Paginação do consumidor') : null,
          child: body),
      'detail-page' => ForgeDetailPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          aside: optional ? const Text('Informações complementares') : null,
          child: body),
      'form-page' => ForgeFormPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          notice: optional ? const Text('Aviso do formulário') : null,
          child: body),
      _ => throw StateError(family)
    };
  }

  Widget transition() => Column(children: [
        ForgeButton(
            onPressed: () => setState(() => screen++),
            child: const Text('Trocar tela')),
        ForgePageTransition(
            screenKey: screen,
            intent: choice('intent', ForgePageTransitionIntent.values),
            animated: flag('animated'),
            child: Text('Tela $screen'))
      ]);
  Widget shared(BuildContext context) => Column(children: [
        ForgeSharedElement(
            name: 'forge-demo-element',
            animated: flag('animated'),
            child: SizedBox(
                width: 240,
                height: 80,
                child: Material(
                    type: MaterialType.transparency,
                    child: Center(child: Text(text('titleText')))))),
        ForgeButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute<void>(
                builder: (context) => Scaffold(
                        body: SafeArea(
                            child: Column(children: [
                      ForgeSharedElement(
                          name: 'forge-demo-element',
                          animated: flag('animated'),
                          child: SizedBox(
                              width: 240,
                              height: 80,
                              child: Material(
                                  type: MaterialType.transparency,
                                  child:
                                      Center(child: Text(text('titleText')))))),
                      ForgeButton(
                          onPressed: () => Navigator.of(context).pop(),
                          child: const Text('Voltar'))
                    ]))))),
            child: const Text('Abrir destino'))
      ]);
  Widget map() => ForgeMapView(
      label: text('label'),
      description:
          'Demonstração esquemática sem navegação nem localização real',
      status: choice('status', ForgeMapViewStatus.values),
      scene: ForgeMapScene(markers: [
        ForgeMapMarker(
            id: 'origin',
            label: 'Origem',
            coordinate:
                const ForgeMapCoordinate(latitude: -23.55, longitude: -46.63),
            kind: ForgeMapMarkerKind.origin)
      ]),
      renderer: const ForgeSchematicMapRenderer(),
      labels: const ForgeMapViewLabelsData(
          loading: 'Carregando mapa',
          empty: 'Sem pontos',
          unavailable: 'Mapa indisponível',
          schematic: 'Mapa esquemático, sem navegação'),
      onRendererError: (e) => event('Falha do renderizador'));
  Widget odata() => ForgeODataFilter(
      mode: choice('mode', ForgeODataFilterMode.values),
      fields: const [amount],
      value: expression,
      onValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expression = v;
        });
      },
      onApply: (v, filter) => event(filter),
      onCancel: () => event('Cancelado'),
      labels: labels,
      disabled: flag('disabled'),
      actionsLayout:
          choice('actionsLayout', ForgeODataFilterActionsLayout.values));
  @override
  Widget build(BuildContext context) =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        switch (family) {
          'data-grid' => grid(),
          'tree-grid' => treeGrid(),
          'page-transition' => transition(),
          'shared-element' => shared(context),
          'map-view' => map(),
          'o-data-filter' => odata(),
          _ => template()
        },
        Text('Solicitações: $requests'),
        if (result.isNotEmpty) Text(result)
      ]);
}

// Canonical parts are created by their native owner, not duplicated focus owners: ApplicationLayoutFooter.
const snippetContracts17=<String,Map<String,Map<String,Object?>>>{"application-layout-footer":{"titleText":{"kind":"text","defaultValue":"Página Forge","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo da página","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Executar ação","nonblank":true},"showSlots":{"kind":"boolean","defaultValue":true}}};
const snippetFamilies17=<String,String>{"application-layout-footer":"application-layout-template"};
class AdvancedSnippet17 extends StatefulWidget {final String slug='application-layout-footer';final Map<String,Object?> properties=const {"titleText": "Página Forge", "bodyText": "Conteúdo da página", "actionLabel": "Executar ação", "showSlots": true};const AdvancedSnippet17({super.key});@override State<AdvancedSnippet17> createState()=>_AdvancedSnippetState17();}
class _AdvancedSnippetState17 extends State<AdvancedSnippet17> {
  int requests = 0, screen = 0;
  String result = '';
  ForgeDataGridSort? sort;
  List<String> expanded = [];
  late ForgeODataFilterExpression expression;
  String get family => snippetFamilies17[widget.slug]!;
  Object? prop(String k) =>
      widget.properties[k] ??
      snippetContracts17[widget.slug]?[k]?['defaultValue'];
  String text(String k) => prop(k) as String;
  bool flag(String k) => prop(k) == true;
  T choice<T extends Enum>(String k, List<T> values) =>
      values.firstWhere((v) => v.name == prop(k));
  @override
  void initState() {
    super.initState();
    expanded = flag('expanded') ? ['parent'] : [];
    expression = ForgeODataFilterGroupData(
        id: 'root',
        operator: ForgeODataFilterConjunction.and,
        children: [
          createForgeODataFilterCondition(amount, 'amount-condition')
        ]);
  }

  @override
  void didUpdateWidget(covariant AdvancedSnippet17 old) {
    super.didUpdateWidget(old);
    if (old.properties['expanded'] != widget.properties['expanded'])
      expanded = flag('expanded') ? ['parent'] : [];
  }

  void event(String value) {
    setState(() {
      requests++;
      result = value;
    });
  }

  static const amount = ForgeODataFilterField(
      id: 'amount',
      path: 'Amount',
      label: 'Valor',
      kind: ForgeODataFilterKind.decimal,
      precision: 40,
      scale: 4);
  static const labels = ForgeODataFilterLabels(
      field: 'Campo',
      operator: 'Operador',
      value: 'Valor',
      remove: 'Remover',
      addCondition: 'Adicionar condição',
      addGroup: 'Adicionar grupo',
      group: 'Grupo',
      and: 'E',
      or: 'Ou',
      apply: 'Aplicar',
      clear: 'Limpar',
      cancel: 'Cancelar',
      all: 'Todos',
      yes: 'Sim',
      no: 'Não',
      minimum: 'Mínimo',
      maximum: 'Máximo',
      invalid: 'Expressão inválida',
      unsupported: 'Expressão não suportada no modo simples',
      operatorLabels: {
        ForgeODataFilterOperator.eq: 'Igual',
        ForgeODataFilterOperator.ne: 'Diferente',
        ForgeODataFilterOperator.contains: 'Contém',
        ForgeODataFilterOperator.startswith: 'Começa com',
        ForgeODataFilterOperator.endswith: 'Termina com',
        ForgeODataFilterOperator.gt: 'Maior',
        ForgeODataFilterOperator.ge: 'Maior ou igual',
        ForgeODataFilterOperator.lt: 'Menor',
        ForgeODataFilterOperator.le: 'Menor ou igual',
        ForgeODataFilterOperator.between: 'Entre',
        ForgeODataFilterOperator.inValues: 'Em'
      });
  Widget field() => const ForgeInput(semanticLabel: 'Conteúdo preservado');
  Widget action() => ForgeButton(
      onPressed: () => event('Ação do consumidor'),
      child: Text(text('actionLabel')));
  Widget grid() {
    final rows = flag('empty') ? <String>[] : ['Beta', 'Alpha', 'Gamma'];
    if (sort != null)
      rows.sort((a, b) => sort!.direction == ForgeSortDirection.ascending
          ? a.compareTo(b)
          : b.compareTo(a));
    return ForgeDataGrid<String>(
        label: text('label'),
        rows: rows,
        getRowKey: (r) => r,
        sort: sort,
        onSortChange: (v) {
          setState(() {
            requests++;
            if (flag('acceptChanges')) sort = v;
          });
        },
        emptyContent: const Text('Nenhum registro'),
        fullWidth: flag('fullWidth'),
        showBorders: flag('showBorders'),
        showColumnLines: flag('showColumnLines'),
        showRowLines: flag('showRowLines'),
        rowAlternationEnabled: flag('rowAlternationEnabled'),
        size: choice('size', ForgeSize.values),
        columns: [
          ForgeDataGridColumn(
              key: 'name',
              header: 'Nome',
              renderCell: Text.new,
              sortable: true,
              sortLabel: 'Ordenar nomes'),
          ForgeDataGridColumn(
              key: 'action',
              header: 'Ação',
              renderCell: (r) => ForgeButton(
                  onPressed: () => event(r), child: const Text('Selecionar')))
        ],
        children: const [
          ForgeDataGridHeader(),
          ForgeDataGridBody(),
          ForgeDataGridFooter(child: Text('Rodapé da tabela'))
        ]);
  }

  Widget treeGrid() => ForgeTreeGrid<String>(
      label: text('label'),
      nodes: [
        ForgeTreeGridNode(
            key: 'parent',
            item: 'Equipe',
            children: [ForgeTreeGridNode(key: 'child', item: 'Pessoa')])
      ],
      getNodeLabel: (r) => r,
      expandedValue: expanded,
      onExpandedValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expanded = v;
        });
      },
      direction: choice('direction', ForgeNavigationDirection.values),
      animated: flag('animated'),
      columns: [
        ForgeTreeGridColumn(key: 'name', header: 'Nome', getCellText: (r) => r),
        ForgeTreeGridColumn(
            key: 'detail',
            header: 'Detalhe',
            getCellText: (r) => r + ' — detalhe')
      ],
      children: const [
        ForgeTreeGridHeader(),
        ForgeTreeGridBody(),
        ForgeTreeGridFooter(child: Text('Rodapé da hierarquia'))
      ]);
  Widget template() {
    final title = Text(text('titleText')),
        body = Column(children: [Text(text('bodyText')), field()]);
    final optional = flag('showSlots');
    return switch (family) {
      'application-layout-template' => SizedBox(
          height: 420,
          child: ForgeApplicationLayoutTemplate(
              header: optional ? title : null,
              navigation: optional ? const Text('Navegação') : null,
              toolbar: optional ? action() : null,
              footer: optional ? const Text('Rodapé') : null,
              mainId: 'forge-demo-main',
              child: body)),
      'showcase-page-template' => ForgeShowcasePageTemplate(
          title: optional ? title : null,
          navigation: optional ? const Text('Catálogo') : null,
          toolbar: optional ? action() : null,
          child: body),
      'home-page' => ForgeHomePageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          quickActions: optional ? action() : null,
          summary: optional ? const Text('Resumo') : null,
          child: body),
      'list-page' => ForgeListPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          filters: optional ? const Text('Filtros') : null,
          pagination: optional ? const Text('Paginação do consumidor') : null,
          child: body),
      'detail-page' => ForgeDetailPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          aside: optional ? const Text('Informações complementares') : null,
          child: body),
      'form-page' => ForgeFormPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          notice: optional ? const Text('Aviso do formulário') : null,
          child: body),
      _ => throw StateError(family)
    };
  }

  Widget transition() => Column(children: [
        ForgeButton(
            onPressed: () => setState(() => screen++),
            child: const Text('Trocar tela')),
        ForgePageTransition(
            screenKey: screen,
            intent: choice('intent', ForgePageTransitionIntent.values),
            animated: flag('animated'),
            child: Text('Tela $screen'))
      ]);
  Widget shared(BuildContext context) => Column(children: [
        ForgeSharedElement(
            name: 'forge-demo-element',
            animated: flag('animated'),
            child: SizedBox(
                width: 240,
                height: 80,
                child: Material(
                    type: MaterialType.transparency,
                    child: Center(child: Text(text('titleText')))))),
        ForgeButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute<void>(
                builder: (context) => Scaffold(
                        body: SafeArea(
                            child: Column(children: [
                      ForgeSharedElement(
                          name: 'forge-demo-element',
                          animated: flag('animated'),
                          child: SizedBox(
                              width: 240,
                              height: 80,
                              child: Material(
                                  type: MaterialType.transparency,
                                  child:
                                      Center(child: Text(text('titleText')))))),
                      ForgeButton(
                          onPressed: () => Navigator.of(context).pop(),
                          child: const Text('Voltar'))
                    ]))))),
            child: const Text('Abrir destino'))
      ]);
  Widget map() => ForgeMapView(
      label: text('label'),
      description:
          'Demonstração esquemática sem navegação nem localização real',
      status: choice('status', ForgeMapViewStatus.values),
      scene: ForgeMapScene(markers: [
        ForgeMapMarker(
            id: 'origin',
            label: 'Origem',
            coordinate:
                const ForgeMapCoordinate(latitude: -23.55, longitude: -46.63),
            kind: ForgeMapMarkerKind.origin)
      ]),
      renderer: const ForgeSchematicMapRenderer(),
      labels: const ForgeMapViewLabelsData(
          loading: 'Carregando mapa',
          empty: 'Sem pontos',
          unavailable: 'Mapa indisponível',
          schematic: 'Mapa esquemático, sem navegação'),
      onRendererError: (e) => event('Falha do renderizador'));
  Widget odata() => ForgeODataFilter(
      mode: choice('mode', ForgeODataFilterMode.values),
      fields: const [amount],
      value: expression,
      onValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expression = v;
        });
      },
      onApply: (v, filter) => event(filter),
      onCancel: () => event('Cancelado'),
      labels: labels,
      disabled: flag('disabled'),
      actionsLayout:
          choice('actionsLayout', ForgeODataFilterActionsLayout.values));
  @override
  Widget build(BuildContext context) =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        switch (family) {
          'data-grid' => grid(),
          'tree-grid' => treeGrid(),
          'page-transition' => transition(),
          'shared-element' => shared(context),
          'map-view' => map(),
          'o-data-filter' => odata(),
          _ => template()
        },
        Text('Solicitações: $requests'),
        if (result.isNotEmpty) Text(result)
      ]);
}

// Canonical parts are created by their native owner, not duplicated focus owners: ShowcasePageTemplate.
const snippetContracts18=<String,Map<String,Map<String,Object?>>>{"showcase-page-template":{"titleText":{"kind":"text","defaultValue":"Página Forge","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo da página","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Executar ação","nonblank":true},"showSlots":{"kind":"boolean","defaultValue":true}}};
const snippetFamilies18=<String,String>{"showcase-page-template":"showcase-page-template"};
class AdvancedSnippet18 extends StatefulWidget {final String slug='showcase-page-template';final Map<String,Object?> properties=const {"titleText": "Página Forge", "bodyText": "Conteúdo da página", "actionLabel": "Executar ação", "showSlots": true};const AdvancedSnippet18({super.key});@override State<AdvancedSnippet18> createState()=>_AdvancedSnippetState18();}
class _AdvancedSnippetState18 extends State<AdvancedSnippet18> {
  int requests = 0, screen = 0;
  String result = '';
  ForgeDataGridSort? sort;
  List<String> expanded = [];
  late ForgeODataFilterExpression expression;
  String get family => snippetFamilies18[widget.slug]!;
  Object? prop(String k) =>
      widget.properties[k] ??
      snippetContracts18[widget.slug]?[k]?['defaultValue'];
  String text(String k) => prop(k) as String;
  bool flag(String k) => prop(k) == true;
  T choice<T extends Enum>(String k, List<T> values) =>
      values.firstWhere((v) => v.name == prop(k));
  @override
  void initState() {
    super.initState();
    expanded = flag('expanded') ? ['parent'] : [];
    expression = ForgeODataFilterGroupData(
        id: 'root',
        operator: ForgeODataFilterConjunction.and,
        children: [
          createForgeODataFilterCondition(amount, 'amount-condition')
        ]);
  }

  @override
  void didUpdateWidget(covariant AdvancedSnippet18 old) {
    super.didUpdateWidget(old);
    if (old.properties['expanded'] != widget.properties['expanded'])
      expanded = flag('expanded') ? ['parent'] : [];
  }

  void event(String value) {
    setState(() {
      requests++;
      result = value;
    });
  }

  static const amount = ForgeODataFilterField(
      id: 'amount',
      path: 'Amount',
      label: 'Valor',
      kind: ForgeODataFilterKind.decimal,
      precision: 40,
      scale: 4);
  static const labels = ForgeODataFilterLabels(
      field: 'Campo',
      operator: 'Operador',
      value: 'Valor',
      remove: 'Remover',
      addCondition: 'Adicionar condição',
      addGroup: 'Adicionar grupo',
      group: 'Grupo',
      and: 'E',
      or: 'Ou',
      apply: 'Aplicar',
      clear: 'Limpar',
      cancel: 'Cancelar',
      all: 'Todos',
      yes: 'Sim',
      no: 'Não',
      minimum: 'Mínimo',
      maximum: 'Máximo',
      invalid: 'Expressão inválida',
      unsupported: 'Expressão não suportada no modo simples',
      operatorLabels: {
        ForgeODataFilterOperator.eq: 'Igual',
        ForgeODataFilterOperator.ne: 'Diferente',
        ForgeODataFilterOperator.contains: 'Contém',
        ForgeODataFilterOperator.startswith: 'Começa com',
        ForgeODataFilterOperator.endswith: 'Termina com',
        ForgeODataFilterOperator.gt: 'Maior',
        ForgeODataFilterOperator.ge: 'Maior ou igual',
        ForgeODataFilterOperator.lt: 'Menor',
        ForgeODataFilterOperator.le: 'Menor ou igual',
        ForgeODataFilterOperator.between: 'Entre',
        ForgeODataFilterOperator.inValues: 'Em'
      });
  Widget field() => const ForgeInput(semanticLabel: 'Conteúdo preservado');
  Widget action() => ForgeButton(
      onPressed: () => event('Ação do consumidor'),
      child: Text(text('actionLabel')));
  Widget grid() {
    final rows = flag('empty') ? <String>[] : ['Beta', 'Alpha', 'Gamma'];
    if (sort != null)
      rows.sort((a, b) => sort!.direction == ForgeSortDirection.ascending
          ? a.compareTo(b)
          : b.compareTo(a));
    return ForgeDataGrid<String>(
        label: text('label'),
        rows: rows,
        getRowKey: (r) => r,
        sort: sort,
        onSortChange: (v) {
          setState(() {
            requests++;
            if (flag('acceptChanges')) sort = v;
          });
        },
        emptyContent: const Text('Nenhum registro'),
        fullWidth: flag('fullWidth'),
        showBorders: flag('showBorders'),
        showColumnLines: flag('showColumnLines'),
        showRowLines: flag('showRowLines'),
        rowAlternationEnabled: flag('rowAlternationEnabled'),
        size: choice('size', ForgeSize.values),
        columns: [
          ForgeDataGridColumn(
              key: 'name',
              header: 'Nome',
              renderCell: Text.new,
              sortable: true,
              sortLabel: 'Ordenar nomes'),
          ForgeDataGridColumn(
              key: 'action',
              header: 'Ação',
              renderCell: (r) => ForgeButton(
                  onPressed: () => event(r), child: const Text('Selecionar')))
        ],
        children: const [
          ForgeDataGridHeader(),
          ForgeDataGridBody(),
          ForgeDataGridFooter(child: Text('Rodapé da tabela'))
        ]);
  }

  Widget treeGrid() => ForgeTreeGrid<String>(
      label: text('label'),
      nodes: [
        ForgeTreeGridNode(
            key: 'parent',
            item: 'Equipe',
            children: [ForgeTreeGridNode(key: 'child', item: 'Pessoa')])
      ],
      getNodeLabel: (r) => r,
      expandedValue: expanded,
      onExpandedValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expanded = v;
        });
      },
      direction: choice('direction', ForgeNavigationDirection.values),
      animated: flag('animated'),
      columns: [
        ForgeTreeGridColumn(key: 'name', header: 'Nome', getCellText: (r) => r),
        ForgeTreeGridColumn(
            key: 'detail',
            header: 'Detalhe',
            getCellText: (r) => r + ' — detalhe')
      ],
      children: const [
        ForgeTreeGridHeader(),
        ForgeTreeGridBody(),
        ForgeTreeGridFooter(child: Text('Rodapé da hierarquia'))
      ]);
  Widget template() {
    final title = Text(text('titleText')),
        body = Column(children: [Text(text('bodyText')), field()]);
    final optional = flag('showSlots');
    return switch (family) {
      'application-layout-template' => SizedBox(
          height: 420,
          child: ForgeApplicationLayoutTemplate(
              header: optional ? title : null,
              navigation: optional ? const Text('Navegação') : null,
              toolbar: optional ? action() : null,
              footer: optional ? const Text('Rodapé') : null,
              mainId: 'forge-demo-main',
              child: body)),
      'showcase-page-template' => ForgeShowcasePageTemplate(
          title: optional ? title : null,
          navigation: optional ? const Text('Catálogo') : null,
          toolbar: optional ? action() : null,
          child: body),
      'home-page' => ForgeHomePageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          quickActions: optional ? action() : null,
          summary: optional ? const Text('Resumo') : null,
          child: body),
      'list-page' => ForgeListPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          filters: optional ? const Text('Filtros') : null,
          pagination: optional ? const Text('Paginação do consumidor') : null,
          child: body),
      'detail-page' => ForgeDetailPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          aside: optional ? const Text('Informações complementares') : null,
          child: body),
      'form-page' => ForgeFormPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          notice: optional ? const Text('Aviso do formulário') : null,
          child: body),
      _ => throw StateError(family)
    };
  }

  Widget transition() => Column(children: [
        ForgeButton(
            onPressed: () => setState(() => screen++),
            child: const Text('Trocar tela')),
        ForgePageTransition(
            screenKey: screen,
            intent: choice('intent', ForgePageTransitionIntent.values),
            animated: flag('animated'),
            child: Text('Tela $screen'))
      ]);
  Widget shared(BuildContext context) => Column(children: [
        ForgeSharedElement(
            name: 'forge-demo-element',
            animated: flag('animated'),
            child: SizedBox(
                width: 240,
                height: 80,
                child: Material(
                    type: MaterialType.transparency,
                    child: Center(child: Text(text('titleText')))))),
        ForgeButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute<void>(
                builder: (context) => Scaffold(
                        body: SafeArea(
                            child: Column(children: [
                      ForgeSharedElement(
                          name: 'forge-demo-element',
                          animated: flag('animated'),
                          child: SizedBox(
                              width: 240,
                              height: 80,
                              child: Material(
                                  type: MaterialType.transparency,
                                  child:
                                      Center(child: Text(text('titleText')))))),
                      ForgeButton(
                          onPressed: () => Navigator.of(context).pop(),
                          child: const Text('Voltar'))
                    ]))))),
            child: const Text('Abrir destino'))
      ]);
  Widget map() => ForgeMapView(
      label: text('label'),
      description:
          'Demonstração esquemática sem navegação nem localização real',
      status: choice('status', ForgeMapViewStatus.values),
      scene: ForgeMapScene(markers: [
        ForgeMapMarker(
            id: 'origin',
            label: 'Origem',
            coordinate:
                const ForgeMapCoordinate(latitude: -23.55, longitude: -46.63),
            kind: ForgeMapMarkerKind.origin)
      ]),
      renderer: const ForgeSchematicMapRenderer(),
      labels: const ForgeMapViewLabelsData(
          loading: 'Carregando mapa',
          empty: 'Sem pontos',
          unavailable: 'Mapa indisponível',
          schematic: 'Mapa esquemático, sem navegação'),
      onRendererError: (e) => event('Falha do renderizador'));
  Widget odata() => ForgeODataFilter(
      mode: choice('mode', ForgeODataFilterMode.values),
      fields: const [amount],
      value: expression,
      onValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expression = v;
        });
      },
      onApply: (v, filter) => event(filter),
      onCancel: () => event('Cancelado'),
      labels: labels,
      disabled: flag('disabled'),
      actionsLayout:
          choice('actionsLayout', ForgeODataFilterActionsLayout.values));
  @override
  Widget build(BuildContext context) =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        switch (family) {
          'data-grid' => grid(),
          'tree-grid' => treeGrid(),
          'page-transition' => transition(),
          'shared-element' => shared(context),
          'map-view' => map(),
          'o-data-filter' => odata(),
          _ => template()
        },
        Text('Solicitações: $requests'),
        if (result.isNotEmpty) Text(result)
      ]);
}

// Canonical parts are created by their native owner, not duplicated focus owners: HomePageTemplate.
const snippetContracts19=<String,Map<String,Map<String,Object?>>>{"home-page":{"titleText":{"kind":"text","defaultValue":"Página Forge","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo da página","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Executar ação","nonblank":true},"showSlots":{"kind":"boolean","defaultValue":true}}};
const snippetFamilies19=<String,String>{"home-page":"home-page"};
class AdvancedSnippet19 extends StatefulWidget {final String slug='home-page';final Map<String,Object?> properties=const {"titleText": "Página Forge", "bodyText": "Conteúdo da página", "actionLabel": "Executar ação", "showSlots": true};const AdvancedSnippet19({super.key});@override State<AdvancedSnippet19> createState()=>_AdvancedSnippetState19();}
class _AdvancedSnippetState19 extends State<AdvancedSnippet19> {
  int requests = 0, screen = 0;
  String result = '';
  ForgeDataGridSort? sort;
  List<String> expanded = [];
  late ForgeODataFilterExpression expression;
  String get family => snippetFamilies19[widget.slug]!;
  Object? prop(String k) =>
      widget.properties[k] ??
      snippetContracts19[widget.slug]?[k]?['defaultValue'];
  String text(String k) => prop(k) as String;
  bool flag(String k) => prop(k) == true;
  T choice<T extends Enum>(String k, List<T> values) =>
      values.firstWhere((v) => v.name == prop(k));
  @override
  void initState() {
    super.initState();
    expanded = flag('expanded') ? ['parent'] : [];
    expression = ForgeODataFilterGroupData(
        id: 'root',
        operator: ForgeODataFilterConjunction.and,
        children: [
          createForgeODataFilterCondition(amount, 'amount-condition')
        ]);
  }

  @override
  void didUpdateWidget(covariant AdvancedSnippet19 old) {
    super.didUpdateWidget(old);
    if (old.properties['expanded'] != widget.properties['expanded'])
      expanded = flag('expanded') ? ['parent'] : [];
  }

  void event(String value) {
    setState(() {
      requests++;
      result = value;
    });
  }

  static const amount = ForgeODataFilterField(
      id: 'amount',
      path: 'Amount',
      label: 'Valor',
      kind: ForgeODataFilterKind.decimal,
      precision: 40,
      scale: 4);
  static const labels = ForgeODataFilterLabels(
      field: 'Campo',
      operator: 'Operador',
      value: 'Valor',
      remove: 'Remover',
      addCondition: 'Adicionar condição',
      addGroup: 'Adicionar grupo',
      group: 'Grupo',
      and: 'E',
      or: 'Ou',
      apply: 'Aplicar',
      clear: 'Limpar',
      cancel: 'Cancelar',
      all: 'Todos',
      yes: 'Sim',
      no: 'Não',
      minimum: 'Mínimo',
      maximum: 'Máximo',
      invalid: 'Expressão inválida',
      unsupported: 'Expressão não suportada no modo simples',
      operatorLabels: {
        ForgeODataFilterOperator.eq: 'Igual',
        ForgeODataFilterOperator.ne: 'Diferente',
        ForgeODataFilterOperator.contains: 'Contém',
        ForgeODataFilterOperator.startswith: 'Começa com',
        ForgeODataFilterOperator.endswith: 'Termina com',
        ForgeODataFilterOperator.gt: 'Maior',
        ForgeODataFilterOperator.ge: 'Maior ou igual',
        ForgeODataFilterOperator.lt: 'Menor',
        ForgeODataFilterOperator.le: 'Menor ou igual',
        ForgeODataFilterOperator.between: 'Entre',
        ForgeODataFilterOperator.inValues: 'Em'
      });
  Widget field() => const ForgeInput(semanticLabel: 'Conteúdo preservado');
  Widget action() => ForgeButton(
      onPressed: () => event('Ação do consumidor'),
      child: Text(text('actionLabel')));
  Widget grid() {
    final rows = flag('empty') ? <String>[] : ['Beta', 'Alpha', 'Gamma'];
    if (sort != null)
      rows.sort((a, b) => sort!.direction == ForgeSortDirection.ascending
          ? a.compareTo(b)
          : b.compareTo(a));
    return ForgeDataGrid<String>(
        label: text('label'),
        rows: rows,
        getRowKey: (r) => r,
        sort: sort,
        onSortChange: (v) {
          setState(() {
            requests++;
            if (flag('acceptChanges')) sort = v;
          });
        },
        emptyContent: const Text('Nenhum registro'),
        fullWidth: flag('fullWidth'),
        showBorders: flag('showBorders'),
        showColumnLines: flag('showColumnLines'),
        showRowLines: flag('showRowLines'),
        rowAlternationEnabled: flag('rowAlternationEnabled'),
        size: choice('size', ForgeSize.values),
        columns: [
          ForgeDataGridColumn(
              key: 'name',
              header: 'Nome',
              renderCell: Text.new,
              sortable: true,
              sortLabel: 'Ordenar nomes'),
          ForgeDataGridColumn(
              key: 'action',
              header: 'Ação',
              renderCell: (r) => ForgeButton(
                  onPressed: () => event(r), child: const Text('Selecionar')))
        ],
        children: const [
          ForgeDataGridHeader(),
          ForgeDataGridBody(),
          ForgeDataGridFooter(child: Text('Rodapé da tabela'))
        ]);
  }

  Widget treeGrid() => ForgeTreeGrid<String>(
      label: text('label'),
      nodes: [
        ForgeTreeGridNode(
            key: 'parent',
            item: 'Equipe',
            children: [ForgeTreeGridNode(key: 'child', item: 'Pessoa')])
      ],
      getNodeLabel: (r) => r,
      expandedValue: expanded,
      onExpandedValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expanded = v;
        });
      },
      direction: choice('direction', ForgeNavigationDirection.values),
      animated: flag('animated'),
      columns: [
        ForgeTreeGridColumn(key: 'name', header: 'Nome', getCellText: (r) => r),
        ForgeTreeGridColumn(
            key: 'detail',
            header: 'Detalhe',
            getCellText: (r) => r + ' — detalhe')
      ],
      children: const [
        ForgeTreeGridHeader(),
        ForgeTreeGridBody(),
        ForgeTreeGridFooter(child: Text('Rodapé da hierarquia'))
      ]);
  Widget template() {
    final title = Text(text('titleText')),
        body = Column(children: [Text(text('bodyText')), field()]);
    final optional = flag('showSlots');
    return switch (family) {
      'application-layout-template' => SizedBox(
          height: 420,
          child: ForgeApplicationLayoutTemplate(
              header: optional ? title : null,
              navigation: optional ? const Text('Navegação') : null,
              toolbar: optional ? action() : null,
              footer: optional ? const Text('Rodapé') : null,
              mainId: 'forge-demo-main',
              child: body)),
      'showcase-page-template' => ForgeShowcasePageTemplate(
          title: optional ? title : null,
          navigation: optional ? const Text('Catálogo') : null,
          toolbar: optional ? action() : null,
          child: body),
      'home-page' => ForgeHomePageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          quickActions: optional ? action() : null,
          summary: optional ? const Text('Resumo') : null,
          child: body),
      'list-page' => ForgeListPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          filters: optional ? const Text('Filtros') : null,
          pagination: optional ? const Text('Paginação do consumidor') : null,
          child: body),
      'detail-page' => ForgeDetailPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          aside: optional ? const Text('Informações complementares') : null,
          child: body),
      'form-page' => ForgeFormPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          notice: optional ? const Text('Aviso do formulário') : null,
          child: body),
      _ => throw StateError(family)
    };
  }

  Widget transition() => Column(children: [
        ForgeButton(
            onPressed: () => setState(() => screen++),
            child: const Text('Trocar tela')),
        ForgePageTransition(
            screenKey: screen,
            intent: choice('intent', ForgePageTransitionIntent.values),
            animated: flag('animated'),
            child: Text('Tela $screen'))
      ]);
  Widget shared(BuildContext context) => Column(children: [
        ForgeSharedElement(
            name: 'forge-demo-element',
            animated: flag('animated'),
            child: SizedBox(
                width: 240,
                height: 80,
                child: Material(
                    type: MaterialType.transparency,
                    child: Center(child: Text(text('titleText')))))),
        ForgeButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute<void>(
                builder: (context) => Scaffold(
                        body: SafeArea(
                            child: Column(children: [
                      ForgeSharedElement(
                          name: 'forge-demo-element',
                          animated: flag('animated'),
                          child: SizedBox(
                              width: 240,
                              height: 80,
                              child: Material(
                                  type: MaterialType.transparency,
                                  child:
                                      Center(child: Text(text('titleText')))))),
                      ForgeButton(
                          onPressed: () => Navigator.of(context).pop(),
                          child: const Text('Voltar'))
                    ]))))),
            child: const Text('Abrir destino'))
      ]);
  Widget map() => ForgeMapView(
      label: text('label'),
      description:
          'Demonstração esquemática sem navegação nem localização real',
      status: choice('status', ForgeMapViewStatus.values),
      scene: ForgeMapScene(markers: [
        ForgeMapMarker(
            id: 'origin',
            label: 'Origem',
            coordinate:
                const ForgeMapCoordinate(latitude: -23.55, longitude: -46.63),
            kind: ForgeMapMarkerKind.origin)
      ]),
      renderer: const ForgeSchematicMapRenderer(),
      labels: const ForgeMapViewLabelsData(
          loading: 'Carregando mapa',
          empty: 'Sem pontos',
          unavailable: 'Mapa indisponível',
          schematic: 'Mapa esquemático, sem navegação'),
      onRendererError: (e) => event('Falha do renderizador'));
  Widget odata() => ForgeODataFilter(
      mode: choice('mode', ForgeODataFilterMode.values),
      fields: const [amount],
      value: expression,
      onValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expression = v;
        });
      },
      onApply: (v, filter) => event(filter),
      onCancel: () => event('Cancelado'),
      labels: labels,
      disabled: flag('disabled'),
      actionsLayout:
          choice('actionsLayout', ForgeODataFilterActionsLayout.values));
  @override
  Widget build(BuildContext context) =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        switch (family) {
          'data-grid' => grid(),
          'tree-grid' => treeGrid(),
          'page-transition' => transition(),
          'shared-element' => shared(context),
          'map-view' => map(),
          'o-data-filter' => odata(),
          _ => template()
        },
        Text('Solicitações: $requests'),
        if (result.isNotEmpty) Text(result)
      ]);
}

// Canonical parts are created by their native owner, not duplicated focus owners: ListPageTemplate.
const snippetContracts20=<String,Map<String,Map<String,Object?>>>{"list-page":{"titleText":{"kind":"text","defaultValue":"Página Forge","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo da página","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Executar ação","nonblank":true},"showSlots":{"kind":"boolean","defaultValue":true}}};
const snippetFamilies20=<String,String>{"list-page":"list-page"};
class AdvancedSnippet20 extends StatefulWidget {final String slug='list-page';final Map<String,Object?> properties=const {"titleText": "Página Forge", "bodyText": "Conteúdo da página", "actionLabel": "Executar ação", "showSlots": true};const AdvancedSnippet20({super.key});@override State<AdvancedSnippet20> createState()=>_AdvancedSnippetState20();}
class _AdvancedSnippetState20 extends State<AdvancedSnippet20> {
  int requests = 0, screen = 0;
  String result = '';
  ForgeDataGridSort? sort;
  List<String> expanded = [];
  late ForgeODataFilterExpression expression;
  String get family => snippetFamilies20[widget.slug]!;
  Object? prop(String k) =>
      widget.properties[k] ??
      snippetContracts20[widget.slug]?[k]?['defaultValue'];
  String text(String k) => prop(k) as String;
  bool flag(String k) => prop(k) == true;
  T choice<T extends Enum>(String k, List<T> values) =>
      values.firstWhere((v) => v.name == prop(k));
  @override
  void initState() {
    super.initState();
    expanded = flag('expanded') ? ['parent'] : [];
    expression = ForgeODataFilterGroupData(
        id: 'root',
        operator: ForgeODataFilterConjunction.and,
        children: [
          createForgeODataFilterCondition(amount, 'amount-condition')
        ]);
  }

  @override
  void didUpdateWidget(covariant AdvancedSnippet20 old) {
    super.didUpdateWidget(old);
    if (old.properties['expanded'] != widget.properties['expanded'])
      expanded = flag('expanded') ? ['parent'] : [];
  }

  void event(String value) {
    setState(() {
      requests++;
      result = value;
    });
  }

  static const amount = ForgeODataFilterField(
      id: 'amount',
      path: 'Amount',
      label: 'Valor',
      kind: ForgeODataFilterKind.decimal,
      precision: 40,
      scale: 4);
  static const labels = ForgeODataFilterLabels(
      field: 'Campo',
      operator: 'Operador',
      value: 'Valor',
      remove: 'Remover',
      addCondition: 'Adicionar condição',
      addGroup: 'Adicionar grupo',
      group: 'Grupo',
      and: 'E',
      or: 'Ou',
      apply: 'Aplicar',
      clear: 'Limpar',
      cancel: 'Cancelar',
      all: 'Todos',
      yes: 'Sim',
      no: 'Não',
      minimum: 'Mínimo',
      maximum: 'Máximo',
      invalid: 'Expressão inválida',
      unsupported: 'Expressão não suportada no modo simples',
      operatorLabels: {
        ForgeODataFilterOperator.eq: 'Igual',
        ForgeODataFilterOperator.ne: 'Diferente',
        ForgeODataFilterOperator.contains: 'Contém',
        ForgeODataFilterOperator.startswith: 'Começa com',
        ForgeODataFilterOperator.endswith: 'Termina com',
        ForgeODataFilterOperator.gt: 'Maior',
        ForgeODataFilterOperator.ge: 'Maior ou igual',
        ForgeODataFilterOperator.lt: 'Menor',
        ForgeODataFilterOperator.le: 'Menor ou igual',
        ForgeODataFilterOperator.between: 'Entre',
        ForgeODataFilterOperator.inValues: 'Em'
      });
  Widget field() => const ForgeInput(semanticLabel: 'Conteúdo preservado');
  Widget action() => ForgeButton(
      onPressed: () => event('Ação do consumidor'),
      child: Text(text('actionLabel')));
  Widget grid() {
    final rows = flag('empty') ? <String>[] : ['Beta', 'Alpha', 'Gamma'];
    if (sort != null)
      rows.sort((a, b) => sort!.direction == ForgeSortDirection.ascending
          ? a.compareTo(b)
          : b.compareTo(a));
    return ForgeDataGrid<String>(
        label: text('label'),
        rows: rows,
        getRowKey: (r) => r,
        sort: sort,
        onSortChange: (v) {
          setState(() {
            requests++;
            if (flag('acceptChanges')) sort = v;
          });
        },
        emptyContent: const Text('Nenhum registro'),
        fullWidth: flag('fullWidth'),
        showBorders: flag('showBorders'),
        showColumnLines: flag('showColumnLines'),
        showRowLines: flag('showRowLines'),
        rowAlternationEnabled: flag('rowAlternationEnabled'),
        size: choice('size', ForgeSize.values),
        columns: [
          ForgeDataGridColumn(
              key: 'name',
              header: 'Nome',
              renderCell: Text.new,
              sortable: true,
              sortLabel: 'Ordenar nomes'),
          ForgeDataGridColumn(
              key: 'action',
              header: 'Ação',
              renderCell: (r) => ForgeButton(
                  onPressed: () => event(r), child: const Text('Selecionar')))
        ],
        children: const [
          ForgeDataGridHeader(),
          ForgeDataGridBody(),
          ForgeDataGridFooter(child: Text('Rodapé da tabela'))
        ]);
  }

  Widget treeGrid() => ForgeTreeGrid<String>(
      label: text('label'),
      nodes: [
        ForgeTreeGridNode(
            key: 'parent',
            item: 'Equipe',
            children: [ForgeTreeGridNode(key: 'child', item: 'Pessoa')])
      ],
      getNodeLabel: (r) => r,
      expandedValue: expanded,
      onExpandedValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expanded = v;
        });
      },
      direction: choice('direction', ForgeNavigationDirection.values),
      animated: flag('animated'),
      columns: [
        ForgeTreeGridColumn(key: 'name', header: 'Nome', getCellText: (r) => r),
        ForgeTreeGridColumn(
            key: 'detail',
            header: 'Detalhe',
            getCellText: (r) => r + ' — detalhe')
      ],
      children: const [
        ForgeTreeGridHeader(),
        ForgeTreeGridBody(),
        ForgeTreeGridFooter(child: Text('Rodapé da hierarquia'))
      ]);
  Widget template() {
    final title = Text(text('titleText')),
        body = Column(children: [Text(text('bodyText')), field()]);
    final optional = flag('showSlots');
    return switch (family) {
      'application-layout-template' => SizedBox(
          height: 420,
          child: ForgeApplicationLayoutTemplate(
              header: optional ? title : null,
              navigation: optional ? const Text('Navegação') : null,
              toolbar: optional ? action() : null,
              footer: optional ? const Text('Rodapé') : null,
              mainId: 'forge-demo-main',
              child: body)),
      'showcase-page-template' => ForgeShowcasePageTemplate(
          title: optional ? title : null,
          navigation: optional ? const Text('Catálogo') : null,
          toolbar: optional ? action() : null,
          child: body),
      'home-page' => ForgeHomePageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          quickActions: optional ? action() : null,
          summary: optional ? const Text('Resumo') : null,
          child: body),
      'list-page' => ForgeListPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          filters: optional ? const Text('Filtros') : null,
          pagination: optional ? const Text('Paginação do consumidor') : null,
          child: body),
      'detail-page' => ForgeDetailPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          aside: optional ? const Text('Informações complementares') : null,
          child: body),
      'form-page' => ForgeFormPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          notice: optional ? const Text('Aviso do formulário') : null,
          child: body),
      _ => throw StateError(family)
    };
  }

  Widget transition() => Column(children: [
        ForgeButton(
            onPressed: () => setState(() => screen++),
            child: const Text('Trocar tela')),
        ForgePageTransition(
            screenKey: screen,
            intent: choice('intent', ForgePageTransitionIntent.values),
            animated: flag('animated'),
            child: Text('Tela $screen'))
      ]);
  Widget shared(BuildContext context) => Column(children: [
        ForgeSharedElement(
            name: 'forge-demo-element',
            animated: flag('animated'),
            child: SizedBox(
                width: 240,
                height: 80,
                child: Material(
                    type: MaterialType.transparency,
                    child: Center(child: Text(text('titleText')))))),
        ForgeButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute<void>(
                builder: (context) => Scaffold(
                        body: SafeArea(
                            child: Column(children: [
                      ForgeSharedElement(
                          name: 'forge-demo-element',
                          animated: flag('animated'),
                          child: SizedBox(
                              width: 240,
                              height: 80,
                              child: Material(
                                  type: MaterialType.transparency,
                                  child:
                                      Center(child: Text(text('titleText')))))),
                      ForgeButton(
                          onPressed: () => Navigator.of(context).pop(),
                          child: const Text('Voltar'))
                    ]))))),
            child: const Text('Abrir destino'))
      ]);
  Widget map() => ForgeMapView(
      label: text('label'),
      description:
          'Demonstração esquemática sem navegação nem localização real',
      status: choice('status', ForgeMapViewStatus.values),
      scene: ForgeMapScene(markers: [
        ForgeMapMarker(
            id: 'origin',
            label: 'Origem',
            coordinate:
                const ForgeMapCoordinate(latitude: -23.55, longitude: -46.63),
            kind: ForgeMapMarkerKind.origin)
      ]),
      renderer: const ForgeSchematicMapRenderer(),
      labels: const ForgeMapViewLabelsData(
          loading: 'Carregando mapa',
          empty: 'Sem pontos',
          unavailable: 'Mapa indisponível',
          schematic: 'Mapa esquemático, sem navegação'),
      onRendererError: (e) => event('Falha do renderizador'));
  Widget odata() => ForgeODataFilter(
      mode: choice('mode', ForgeODataFilterMode.values),
      fields: const [amount],
      value: expression,
      onValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expression = v;
        });
      },
      onApply: (v, filter) => event(filter),
      onCancel: () => event('Cancelado'),
      labels: labels,
      disabled: flag('disabled'),
      actionsLayout:
          choice('actionsLayout', ForgeODataFilterActionsLayout.values));
  @override
  Widget build(BuildContext context) =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        switch (family) {
          'data-grid' => grid(),
          'tree-grid' => treeGrid(),
          'page-transition' => transition(),
          'shared-element' => shared(context),
          'map-view' => map(),
          'o-data-filter' => odata(),
          _ => template()
        },
        Text('Solicitações: $requests'),
        if (result.isNotEmpty) Text(result)
      ]);
}

// Canonical parts are created by their native owner, not duplicated focus owners: DetailPageTemplate.
const snippetContracts21=<String,Map<String,Map<String,Object?>>>{"detail-page":{"titleText":{"kind":"text","defaultValue":"Página Forge","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo da página","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Executar ação","nonblank":true},"showSlots":{"kind":"boolean","defaultValue":true}}};
const snippetFamilies21=<String,String>{"detail-page":"detail-page"};
class AdvancedSnippet21 extends StatefulWidget {final String slug='detail-page';final Map<String,Object?> properties=const {"titleText": "Página Forge", "bodyText": "Conteúdo da página", "actionLabel": "Executar ação", "showSlots": true};const AdvancedSnippet21({super.key});@override State<AdvancedSnippet21> createState()=>_AdvancedSnippetState21();}
class _AdvancedSnippetState21 extends State<AdvancedSnippet21> {
  int requests = 0, screen = 0;
  String result = '';
  ForgeDataGridSort? sort;
  List<String> expanded = [];
  late ForgeODataFilterExpression expression;
  String get family => snippetFamilies21[widget.slug]!;
  Object? prop(String k) =>
      widget.properties[k] ??
      snippetContracts21[widget.slug]?[k]?['defaultValue'];
  String text(String k) => prop(k) as String;
  bool flag(String k) => prop(k) == true;
  T choice<T extends Enum>(String k, List<T> values) =>
      values.firstWhere((v) => v.name == prop(k));
  @override
  void initState() {
    super.initState();
    expanded = flag('expanded') ? ['parent'] : [];
    expression = ForgeODataFilterGroupData(
        id: 'root',
        operator: ForgeODataFilterConjunction.and,
        children: [
          createForgeODataFilterCondition(amount, 'amount-condition')
        ]);
  }

  @override
  void didUpdateWidget(covariant AdvancedSnippet21 old) {
    super.didUpdateWidget(old);
    if (old.properties['expanded'] != widget.properties['expanded'])
      expanded = flag('expanded') ? ['parent'] : [];
  }

  void event(String value) {
    setState(() {
      requests++;
      result = value;
    });
  }

  static const amount = ForgeODataFilterField(
      id: 'amount',
      path: 'Amount',
      label: 'Valor',
      kind: ForgeODataFilterKind.decimal,
      precision: 40,
      scale: 4);
  static const labels = ForgeODataFilterLabels(
      field: 'Campo',
      operator: 'Operador',
      value: 'Valor',
      remove: 'Remover',
      addCondition: 'Adicionar condição',
      addGroup: 'Adicionar grupo',
      group: 'Grupo',
      and: 'E',
      or: 'Ou',
      apply: 'Aplicar',
      clear: 'Limpar',
      cancel: 'Cancelar',
      all: 'Todos',
      yes: 'Sim',
      no: 'Não',
      minimum: 'Mínimo',
      maximum: 'Máximo',
      invalid: 'Expressão inválida',
      unsupported: 'Expressão não suportada no modo simples',
      operatorLabels: {
        ForgeODataFilterOperator.eq: 'Igual',
        ForgeODataFilterOperator.ne: 'Diferente',
        ForgeODataFilterOperator.contains: 'Contém',
        ForgeODataFilterOperator.startswith: 'Começa com',
        ForgeODataFilterOperator.endswith: 'Termina com',
        ForgeODataFilterOperator.gt: 'Maior',
        ForgeODataFilterOperator.ge: 'Maior ou igual',
        ForgeODataFilterOperator.lt: 'Menor',
        ForgeODataFilterOperator.le: 'Menor ou igual',
        ForgeODataFilterOperator.between: 'Entre',
        ForgeODataFilterOperator.inValues: 'Em'
      });
  Widget field() => const ForgeInput(semanticLabel: 'Conteúdo preservado');
  Widget action() => ForgeButton(
      onPressed: () => event('Ação do consumidor'),
      child: Text(text('actionLabel')));
  Widget grid() {
    final rows = flag('empty') ? <String>[] : ['Beta', 'Alpha', 'Gamma'];
    if (sort != null)
      rows.sort((a, b) => sort!.direction == ForgeSortDirection.ascending
          ? a.compareTo(b)
          : b.compareTo(a));
    return ForgeDataGrid<String>(
        label: text('label'),
        rows: rows,
        getRowKey: (r) => r,
        sort: sort,
        onSortChange: (v) {
          setState(() {
            requests++;
            if (flag('acceptChanges')) sort = v;
          });
        },
        emptyContent: const Text('Nenhum registro'),
        fullWidth: flag('fullWidth'),
        showBorders: flag('showBorders'),
        showColumnLines: flag('showColumnLines'),
        showRowLines: flag('showRowLines'),
        rowAlternationEnabled: flag('rowAlternationEnabled'),
        size: choice('size', ForgeSize.values),
        columns: [
          ForgeDataGridColumn(
              key: 'name',
              header: 'Nome',
              renderCell: Text.new,
              sortable: true,
              sortLabel: 'Ordenar nomes'),
          ForgeDataGridColumn(
              key: 'action',
              header: 'Ação',
              renderCell: (r) => ForgeButton(
                  onPressed: () => event(r), child: const Text('Selecionar')))
        ],
        children: const [
          ForgeDataGridHeader(),
          ForgeDataGridBody(),
          ForgeDataGridFooter(child: Text('Rodapé da tabela'))
        ]);
  }

  Widget treeGrid() => ForgeTreeGrid<String>(
      label: text('label'),
      nodes: [
        ForgeTreeGridNode(
            key: 'parent',
            item: 'Equipe',
            children: [ForgeTreeGridNode(key: 'child', item: 'Pessoa')])
      ],
      getNodeLabel: (r) => r,
      expandedValue: expanded,
      onExpandedValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expanded = v;
        });
      },
      direction: choice('direction', ForgeNavigationDirection.values),
      animated: flag('animated'),
      columns: [
        ForgeTreeGridColumn(key: 'name', header: 'Nome', getCellText: (r) => r),
        ForgeTreeGridColumn(
            key: 'detail',
            header: 'Detalhe',
            getCellText: (r) => r + ' — detalhe')
      ],
      children: const [
        ForgeTreeGridHeader(),
        ForgeTreeGridBody(),
        ForgeTreeGridFooter(child: Text('Rodapé da hierarquia'))
      ]);
  Widget template() {
    final title = Text(text('titleText')),
        body = Column(children: [Text(text('bodyText')), field()]);
    final optional = flag('showSlots');
    return switch (family) {
      'application-layout-template' => SizedBox(
          height: 420,
          child: ForgeApplicationLayoutTemplate(
              header: optional ? title : null,
              navigation: optional ? const Text('Navegação') : null,
              toolbar: optional ? action() : null,
              footer: optional ? const Text('Rodapé') : null,
              mainId: 'forge-demo-main',
              child: body)),
      'showcase-page-template' => ForgeShowcasePageTemplate(
          title: optional ? title : null,
          navigation: optional ? const Text('Catálogo') : null,
          toolbar: optional ? action() : null,
          child: body),
      'home-page' => ForgeHomePageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          quickActions: optional ? action() : null,
          summary: optional ? const Text('Resumo') : null,
          child: body),
      'list-page' => ForgeListPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          filters: optional ? const Text('Filtros') : null,
          pagination: optional ? const Text('Paginação do consumidor') : null,
          child: body),
      'detail-page' => ForgeDetailPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          aside: optional ? const Text('Informações complementares') : null,
          child: body),
      'form-page' => ForgeFormPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          notice: optional ? const Text('Aviso do formulário') : null,
          child: body),
      _ => throw StateError(family)
    };
  }

  Widget transition() => Column(children: [
        ForgeButton(
            onPressed: () => setState(() => screen++),
            child: const Text('Trocar tela')),
        ForgePageTransition(
            screenKey: screen,
            intent: choice('intent', ForgePageTransitionIntent.values),
            animated: flag('animated'),
            child: Text('Tela $screen'))
      ]);
  Widget shared(BuildContext context) => Column(children: [
        ForgeSharedElement(
            name: 'forge-demo-element',
            animated: flag('animated'),
            child: SizedBox(
                width: 240,
                height: 80,
                child: Material(
                    type: MaterialType.transparency,
                    child: Center(child: Text(text('titleText')))))),
        ForgeButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute<void>(
                builder: (context) => Scaffold(
                        body: SafeArea(
                            child: Column(children: [
                      ForgeSharedElement(
                          name: 'forge-demo-element',
                          animated: flag('animated'),
                          child: SizedBox(
                              width: 240,
                              height: 80,
                              child: Material(
                                  type: MaterialType.transparency,
                                  child:
                                      Center(child: Text(text('titleText')))))),
                      ForgeButton(
                          onPressed: () => Navigator.of(context).pop(),
                          child: const Text('Voltar'))
                    ]))))),
            child: const Text('Abrir destino'))
      ]);
  Widget map() => ForgeMapView(
      label: text('label'),
      description:
          'Demonstração esquemática sem navegação nem localização real',
      status: choice('status', ForgeMapViewStatus.values),
      scene: ForgeMapScene(markers: [
        ForgeMapMarker(
            id: 'origin',
            label: 'Origem',
            coordinate:
                const ForgeMapCoordinate(latitude: -23.55, longitude: -46.63),
            kind: ForgeMapMarkerKind.origin)
      ]),
      renderer: const ForgeSchematicMapRenderer(),
      labels: const ForgeMapViewLabelsData(
          loading: 'Carregando mapa',
          empty: 'Sem pontos',
          unavailable: 'Mapa indisponível',
          schematic: 'Mapa esquemático, sem navegação'),
      onRendererError: (e) => event('Falha do renderizador'));
  Widget odata() => ForgeODataFilter(
      mode: choice('mode', ForgeODataFilterMode.values),
      fields: const [amount],
      value: expression,
      onValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expression = v;
        });
      },
      onApply: (v, filter) => event(filter),
      onCancel: () => event('Cancelado'),
      labels: labels,
      disabled: flag('disabled'),
      actionsLayout:
          choice('actionsLayout', ForgeODataFilterActionsLayout.values));
  @override
  Widget build(BuildContext context) =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        switch (family) {
          'data-grid' => grid(),
          'tree-grid' => treeGrid(),
          'page-transition' => transition(),
          'shared-element' => shared(context),
          'map-view' => map(),
          'o-data-filter' => odata(),
          _ => template()
        },
        Text('Solicitações: $requests'),
        if (result.isNotEmpty) Text(result)
      ]);
}

// Canonical parts are created by their native owner, not duplicated focus owners: FormPageTemplate.
const snippetContracts22=<String,Map<String,Map<String,Object?>>>{"form-page":{"titleText":{"kind":"text","defaultValue":"Página Forge","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo da página","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Executar ação","nonblank":true},"showSlots":{"kind":"boolean","defaultValue":true}}};
const snippetFamilies22=<String,String>{"form-page":"form-page"};
class AdvancedSnippet22 extends StatefulWidget {final String slug='form-page';final Map<String,Object?> properties=const {"titleText": "Página Forge", "bodyText": "Conteúdo da página", "actionLabel": "Executar ação", "showSlots": true};const AdvancedSnippet22({super.key});@override State<AdvancedSnippet22> createState()=>_AdvancedSnippetState22();}
class _AdvancedSnippetState22 extends State<AdvancedSnippet22> {
  int requests = 0, screen = 0;
  String result = '';
  ForgeDataGridSort? sort;
  List<String> expanded = [];
  late ForgeODataFilterExpression expression;
  String get family => snippetFamilies22[widget.slug]!;
  Object? prop(String k) =>
      widget.properties[k] ??
      snippetContracts22[widget.slug]?[k]?['defaultValue'];
  String text(String k) => prop(k) as String;
  bool flag(String k) => prop(k) == true;
  T choice<T extends Enum>(String k, List<T> values) =>
      values.firstWhere((v) => v.name == prop(k));
  @override
  void initState() {
    super.initState();
    expanded = flag('expanded') ? ['parent'] : [];
    expression = ForgeODataFilterGroupData(
        id: 'root',
        operator: ForgeODataFilterConjunction.and,
        children: [
          createForgeODataFilterCondition(amount, 'amount-condition')
        ]);
  }

  @override
  void didUpdateWidget(covariant AdvancedSnippet22 old) {
    super.didUpdateWidget(old);
    if (old.properties['expanded'] != widget.properties['expanded'])
      expanded = flag('expanded') ? ['parent'] : [];
  }

  void event(String value) {
    setState(() {
      requests++;
      result = value;
    });
  }

  static const amount = ForgeODataFilterField(
      id: 'amount',
      path: 'Amount',
      label: 'Valor',
      kind: ForgeODataFilterKind.decimal,
      precision: 40,
      scale: 4);
  static const labels = ForgeODataFilterLabels(
      field: 'Campo',
      operator: 'Operador',
      value: 'Valor',
      remove: 'Remover',
      addCondition: 'Adicionar condição',
      addGroup: 'Adicionar grupo',
      group: 'Grupo',
      and: 'E',
      or: 'Ou',
      apply: 'Aplicar',
      clear: 'Limpar',
      cancel: 'Cancelar',
      all: 'Todos',
      yes: 'Sim',
      no: 'Não',
      minimum: 'Mínimo',
      maximum: 'Máximo',
      invalid: 'Expressão inválida',
      unsupported: 'Expressão não suportada no modo simples',
      operatorLabels: {
        ForgeODataFilterOperator.eq: 'Igual',
        ForgeODataFilterOperator.ne: 'Diferente',
        ForgeODataFilterOperator.contains: 'Contém',
        ForgeODataFilterOperator.startswith: 'Começa com',
        ForgeODataFilterOperator.endswith: 'Termina com',
        ForgeODataFilterOperator.gt: 'Maior',
        ForgeODataFilterOperator.ge: 'Maior ou igual',
        ForgeODataFilterOperator.lt: 'Menor',
        ForgeODataFilterOperator.le: 'Menor ou igual',
        ForgeODataFilterOperator.between: 'Entre',
        ForgeODataFilterOperator.inValues: 'Em'
      });
  Widget field() => const ForgeInput(semanticLabel: 'Conteúdo preservado');
  Widget action() => ForgeButton(
      onPressed: () => event('Ação do consumidor'),
      child: Text(text('actionLabel')));
  Widget grid() {
    final rows = flag('empty') ? <String>[] : ['Beta', 'Alpha', 'Gamma'];
    if (sort != null)
      rows.sort((a, b) => sort!.direction == ForgeSortDirection.ascending
          ? a.compareTo(b)
          : b.compareTo(a));
    return ForgeDataGrid<String>(
        label: text('label'),
        rows: rows,
        getRowKey: (r) => r,
        sort: sort,
        onSortChange: (v) {
          setState(() {
            requests++;
            if (flag('acceptChanges')) sort = v;
          });
        },
        emptyContent: const Text('Nenhum registro'),
        fullWidth: flag('fullWidth'),
        showBorders: flag('showBorders'),
        showColumnLines: flag('showColumnLines'),
        showRowLines: flag('showRowLines'),
        rowAlternationEnabled: flag('rowAlternationEnabled'),
        size: choice('size', ForgeSize.values),
        columns: [
          ForgeDataGridColumn(
              key: 'name',
              header: 'Nome',
              renderCell: Text.new,
              sortable: true,
              sortLabel: 'Ordenar nomes'),
          ForgeDataGridColumn(
              key: 'action',
              header: 'Ação',
              renderCell: (r) => ForgeButton(
                  onPressed: () => event(r), child: const Text('Selecionar')))
        ],
        children: const [
          ForgeDataGridHeader(),
          ForgeDataGridBody(),
          ForgeDataGridFooter(child: Text('Rodapé da tabela'))
        ]);
  }

  Widget treeGrid() => ForgeTreeGrid<String>(
      label: text('label'),
      nodes: [
        ForgeTreeGridNode(
            key: 'parent',
            item: 'Equipe',
            children: [ForgeTreeGridNode(key: 'child', item: 'Pessoa')])
      ],
      getNodeLabel: (r) => r,
      expandedValue: expanded,
      onExpandedValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expanded = v;
        });
      },
      direction: choice('direction', ForgeNavigationDirection.values),
      animated: flag('animated'),
      columns: [
        ForgeTreeGridColumn(key: 'name', header: 'Nome', getCellText: (r) => r),
        ForgeTreeGridColumn(
            key: 'detail',
            header: 'Detalhe',
            getCellText: (r) => r + ' — detalhe')
      ],
      children: const [
        ForgeTreeGridHeader(),
        ForgeTreeGridBody(),
        ForgeTreeGridFooter(child: Text('Rodapé da hierarquia'))
      ]);
  Widget template() {
    final title = Text(text('titleText')),
        body = Column(children: [Text(text('bodyText')), field()]);
    final optional = flag('showSlots');
    return switch (family) {
      'application-layout-template' => SizedBox(
          height: 420,
          child: ForgeApplicationLayoutTemplate(
              header: optional ? title : null,
              navigation: optional ? const Text('Navegação') : null,
              toolbar: optional ? action() : null,
              footer: optional ? const Text('Rodapé') : null,
              mainId: 'forge-demo-main',
              child: body)),
      'showcase-page-template' => ForgeShowcasePageTemplate(
          title: optional ? title : null,
          navigation: optional ? const Text('Catálogo') : null,
          toolbar: optional ? action() : null,
          child: body),
      'home-page' => ForgeHomePageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          quickActions: optional ? action() : null,
          summary: optional ? const Text('Resumo') : null,
          child: body),
      'list-page' => ForgeListPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          filters: optional ? const Text('Filtros') : null,
          pagination: optional ? const Text('Paginação do consumidor') : null,
          child: body),
      'detail-page' => ForgeDetailPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          aside: optional ? const Text('Informações complementares') : null,
          child: body),
      'form-page' => ForgeFormPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          notice: optional ? const Text('Aviso do formulário') : null,
          child: body),
      _ => throw StateError(family)
    };
  }

  Widget transition() => Column(children: [
        ForgeButton(
            onPressed: () => setState(() => screen++),
            child: const Text('Trocar tela')),
        ForgePageTransition(
            screenKey: screen,
            intent: choice('intent', ForgePageTransitionIntent.values),
            animated: flag('animated'),
            child: Text('Tela $screen'))
      ]);
  Widget shared(BuildContext context) => Column(children: [
        ForgeSharedElement(
            name: 'forge-demo-element',
            animated: flag('animated'),
            child: SizedBox(
                width: 240,
                height: 80,
                child: Material(
                    type: MaterialType.transparency,
                    child: Center(child: Text(text('titleText')))))),
        ForgeButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute<void>(
                builder: (context) => Scaffold(
                        body: SafeArea(
                            child: Column(children: [
                      ForgeSharedElement(
                          name: 'forge-demo-element',
                          animated: flag('animated'),
                          child: SizedBox(
                              width: 240,
                              height: 80,
                              child: Material(
                                  type: MaterialType.transparency,
                                  child:
                                      Center(child: Text(text('titleText')))))),
                      ForgeButton(
                          onPressed: () => Navigator.of(context).pop(),
                          child: const Text('Voltar'))
                    ]))))),
            child: const Text('Abrir destino'))
      ]);
  Widget map() => ForgeMapView(
      label: text('label'),
      description:
          'Demonstração esquemática sem navegação nem localização real',
      status: choice('status', ForgeMapViewStatus.values),
      scene: ForgeMapScene(markers: [
        ForgeMapMarker(
            id: 'origin',
            label: 'Origem',
            coordinate:
                const ForgeMapCoordinate(latitude: -23.55, longitude: -46.63),
            kind: ForgeMapMarkerKind.origin)
      ]),
      renderer: const ForgeSchematicMapRenderer(),
      labels: const ForgeMapViewLabelsData(
          loading: 'Carregando mapa',
          empty: 'Sem pontos',
          unavailable: 'Mapa indisponível',
          schematic: 'Mapa esquemático, sem navegação'),
      onRendererError: (e) => event('Falha do renderizador'));
  Widget odata() => ForgeODataFilter(
      mode: choice('mode', ForgeODataFilterMode.values),
      fields: const [amount],
      value: expression,
      onValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expression = v;
        });
      },
      onApply: (v, filter) => event(filter),
      onCancel: () => event('Cancelado'),
      labels: labels,
      disabled: flag('disabled'),
      actionsLayout:
          choice('actionsLayout', ForgeODataFilterActionsLayout.values));
  @override
  Widget build(BuildContext context) =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        switch (family) {
          'data-grid' => grid(),
          'tree-grid' => treeGrid(),
          'page-transition' => transition(),
          'shared-element' => shared(context),
          'map-view' => map(),
          'o-data-filter' => odata(),
          _ => template()
        },
        Text('Solicitações: $requests'),
        if (result.isNotEmpty) Text(result)
      ]);
}

// Canonical parts are created by their native owner, not duplicated focus owners: PageTransition.
const snippetContracts23=<String,Map<String,Map<String,Object?>>>{"page-transition":{"animated":{"kind":"boolean","defaultValue":true},"intent":{"kind":"select","options":["forward","back","replace","reveal","none"],"defaultValue":"forward"}}};
const snippetFamilies23=<String,String>{"page-transition":"page-transition"};
class AdvancedSnippet23 extends StatefulWidget {final String slug='page-transition';final Map<String,Object?> properties=const {"animated": true, "intent": "forward"};const AdvancedSnippet23({super.key});@override State<AdvancedSnippet23> createState()=>_AdvancedSnippetState23();}
class _AdvancedSnippetState23 extends State<AdvancedSnippet23> {
  int requests = 0, screen = 0;
  String result = '';
  ForgeDataGridSort? sort;
  List<String> expanded = [];
  late ForgeODataFilterExpression expression;
  String get family => snippetFamilies23[widget.slug]!;
  Object? prop(String k) =>
      widget.properties[k] ??
      snippetContracts23[widget.slug]?[k]?['defaultValue'];
  String text(String k) => prop(k) as String;
  bool flag(String k) => prop(k) == true;
  T choice<T extends Enum>(String k, List<T> values) =>
      values.firstWhere((v) => v.name == prop(k));
  @override
  void initState() {
    super.initState();
    expanded = flag('expanded') ? ['parent'] : [];
    expression = ForgeODataFilterGroupData(
        id: 'root',
        operator: ForgeODataFilterConjunction.and,
        children: [
          createForgeODataFilterCondition(amount, 'amount-condition')
        ]);
  }

  @override
  void didUpdateWidget(covariant AdvancedSnippet23 old) {
    super.didUpdateWidget(old);
    if (old.properties['expanded'] != widget.properties['expanded'])
      expanded = flag('expanded') ? ['parent'] : [];
  }

  void event(String value) {
    setState(() {
      requests++;
      result = value;
    });
  }

  static const amount = ForgeODataFilterField(
      id: 'amount',
      path: 'Amount',
      label: 'Valor',
      kind: ForgeODataFilterKind.decimal,
      precision: 40,
      scale: 4);
  static const labels = ForgeODataFilterLabels(
      field: 'Campo',
      operator: 'Operador',
      value: 'Valor',
      remove: 'Remover',
      addCondition: 'Adicionar condição',
      addGroup: 'Adicionar grupo',
      group: 'Grupo',
      and: 'E',
      or: 'Ou',
      apply: 'Aplicar',
      clear: 'Limpar',
      cancel: 'Cancelar',
      all: 'Todos',
      yes: 'Sim',
      no: 'Não',
      minimum: 'Mínimo',
      maximum: 'Máximo',
      invalid: 'Expressão inválida',
      unsupported: 'Expressão não suportada no modo simples',
      operatorLabels: {
        ForgeODataFilterOperator.eq: 'Igual',
        ForgeODataFilterOperator.ne: 'Diferente',
        ForgeODataFilterOperator.contains: 'Contém',
        ForgeODataFilterOperator.startswith: 'Começa com',
        ForgeODataFilterOperator.endswith: 'Termina com',
        ForgeODataFilterOperator.gt: 'Maior',
        ForgeODataFilterOperator.ge: 'Maior ou igual',
        ForgeODataFilterOperator.lt: 'Menor',
        ForgeODataFilterOperator.le: 'Menor ou igual',
        ForgeODataFilterOperator.between: 'Entre',
        ForgeODataFilterOperator.inValues: 'Em'
      });
  Widget field() => const ForgeInput(semanticLabel: 'Conteúdo preservado');
  Widget action() => ForgeButton(
      onPressed: () => event('Ação do consumidor'),
      child: Text(text('actionLabel')));
  Widget grid() {
    final rows = flag('empty') ? <String>[] : ['Beta', 'Alpha', 'Gamma'];
    if (sort != null)
      rows.sort((a, b) => sort!.direction == ForgeSortDirection.ascending
          ? a.compareTo(b)
          : b.compareTo(a));
    return ForgeDataGrid<String>(
        label: text('label'),
        rows: rows,
        getRowKey: (r) => r,
        sort: sort,
        onSortChange: (v) {
          setState(() {
            requests++;
            if (flag('acceptChanges')) sort = v;
          });
        },
        emptyContent: const Text('Nenhum registro'),
        fullWidth: flag('fullWidth'),
        showBorders: flag('showBorders'),
        showColumnLines: flag('showColumnLines'),
        showRowLines: flag('showRowLines'),
        rowAlternationEnabled: flag('rowAlternationEnabled'),
        size: choice('size', ForgeSize.values),
        columns: [
          ForgeDataGridColumn(
              key: 'name',
              header: 'Nome',
              renderCell: Text.new,
              sortable: true,
              sortLabel: 'Ordenar nomes'),
          ForgeDataGridColumn(
              key: 'action',
              header: 'Ação',
              renderCell: (r) => ForgeButton(
                  onPressed: () => event(r), child: const Text('Selecionar')))
        ],
        children: const [
          ForgeDataGridHeader(),
          ForgeDataGridBody(),
          ForgeDataGridFooter(child: Text('Rodapé da tabela'))
        ]);
  }

  Widget treeGrid() => ForgeTreeGrid<String>(
      label: text('label'),
      nodes: [
        ForgeTreeGridNode(
            key: 'parent',
            item: 'Equipe',
            children: [ForgeTreeGridNode(key: 'child', item: 'Pessoa')])
      ],
      getNodeLabel: (r) => r,
      expandedValue: expanded,
      onExpandedValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expanded = v;
        });
      },
      direction: choice('direction', ForgeNavigationDirection.values),
      animated: flag('animated'),
      columns: [
        ForgeTreeGridColumn(key: 'name', header: 'Nome', getCellText: (r) => r),
        ForgeTreeGridColumn(
            key: 'detail',
            header: 'Detalhe',
            getCellText: (r) => r + ' — detalhe')
      ],
      children: const [
        ForgeTreeGridHeader(),
        ForgeTreeGridBody(),
        ForgeTreeGridFooter(child: Text('Rodapé da hierarquia'))
      ]);
  Widget template() {
    final title = Text(text('titleText')),
        body = Column(children: [Text(text('bodyText')), field()]);
    final optional = flag('showSlots');
    return switch (family) {
      'application-layout-template' => SizedBox(
          height: 420,
          child: ForgeApplicationLayoutTemplate(
              header: optional ? title : null,
              navigation: optional ? const Text('Navegação') : null,
              toolbar: optional ? action() : null,
              footer: optional ? const Text('Rodapé') : null,
              mainId: 'forge-demo-main',
              child: body)),
      'showcase-page-template' => ForgeShowcasePageTemplate(
          title: optional ? title : null,
          navigation: optional ? const Text('Catálogo') : null,
          toolbar: optional ? action() : null,
          child: body),
      'home-page' => ForgeHomePageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          quickActions: optional ? action() : null,
          summary: optional ? const Text('Resumo') : null,
          child: body),
      'list-page' => ForgeListPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          filters: optional ? const Text('Filtros') : null,
          pagination: optional ? const Text('Paginação do consumidor') : null,
          child: body),
      'detail-page' => ForgeDetailPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          aside: optional ? const Text('Informações complementares') : null,
          child: body),
      'form-page' => ForgeFormPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          notice: optional ? const Text('Aviso do formulário') : null,
          child: body),
      _ => throw StateError(family)
    };
  }

  Widget transition() => Column(children: [
        ForgeButton(
            onPressed: () => setState(() => screen++),
            child: const Text('Trocar tela')),
        ForgePageTransition(
            screenKey: screen,
            intent: choice('intent', ForgePageTransitionIntent.values),
            animated: flag('animated'),
            child: Text('Tela $screen'))
      ]);
  Widget shared(BuildContext context) => Column(children: [
        ForgeSharedElement(
            name: 'forge-demo-element',
            animated: flag('animated'),
            child: SizedBox(
                width: 240,
                height: 80,
                child: Material(
                    type: MaterialType.transparency,
                    child: Center(child: Text(text('titleText')))))),
        ForgeButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute<void>(
                builder: (context) => Scaffold(
                        body: SafeArea(
                            child: Column(children: [
                      ForgeSharedElement(
                          name: 'forge-demo-element',
                          animated: flag('animated'),
                          child: SizedBox(
                              width: 240,
                              height: 80,
                              child: Material(
                                  type: MaterialType.transparency,
                                  child:
                                      Center(child: Text(text('titleText')))))),
                      ForgeButton(
                          onPressed: () => Navigator.of(context).pop(),
                          child: const Text('Voltar'))
                    ]))))),
            child: const Text('Abrir destino'))
      ]);
  Widget map() => ForgeMapView(
      label: text('label'),
      description:
          'Demonstração esquemática sem navegação nem localização real',
      status: choice('status', ForgeMapViewStatus.values),
      scene: ForgeMapScene(markers: [
        ForgeMapMarker(
            id: 'origin',
            label: 'Origem',
            coordinate:
                const ForgeMapCoordinate(latitude: -23.55, longitude: -46.63),
            kind: ForgeMapMarkerKind.origin)
      ]),
      renderer: const ForgeSchematicMapRenderer(),
      labels: const ForgeMapViewLabelsData(
          loading: 'Carregando mapa',
          empty: 'Sem pontos',
          unavailable: 'Mapa indisponível',
          schematic: 'Mapa esquemático, sem navegação'),
      onRendererError: (e) => event('Falha do renderizador'));
  Widget odata() => ForgeODataFilter(
      mode: choice('mode', ForgeODataFilterMode.values),
      fields: const [amount],
      value: expression,
      onValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expression = v;
        });
      },
      onApply: (v, filter) => event(filter),
      onCancel: () => event('Cancelado'),
      labels: labels,
      disabled: flag('disabled'),
      actionsLayout:
          choice('actionsLayout', ForgeODataFilterActionsLayout.values));
  @override
  Widget build(BuildContext context) =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        switch (family) {
          'data-grid' => grid(),
          'tree-grid' => treeGrid(),
          'page-transition' => transition(),
          'shared-element' => shared(context),
          'map-view' => map(),
          'o-data-filter' => odata(),
          _ => template()
        },
        Text('Solicitações: $requests'),
        if (result.isNotEmpty) Text(result)
      ]);
}

// Canonical parts are created by their native owner, not duplicated focus owners: SharedElement.
const snippetContracts24=<String,Map<String,Map<String,Object?>>>{"shared-element":{"animated":{"kind":"boolean","defaultValue":true},"titleText":{"kind":"text","defaultValue":"Elemento compartilhado","nonblank":true}}};
const snippetFamilies24=<String,String>{"shared-element":"shared-element"};
class AdvancedSnippet24 extends StatefulWidget {final String slug='shared-element';final Map<String,Object?> properties=const {"animated": true, "titleText": "Elemento compartilhado"};const AdvancedSnippet24({super.key});@override State<AdvancedSnippet24> createState()=>_AdvancedSnippetState24();}
class _AdvancedSnippetState24 extends State<AdvancedSnippet24> {
  int requests = 0, screen = 0;
  String result = '';
  ForgeDataGridSort? sort;
  List<String> expanded = [];
  late ForgeODataFilterExpression expression;
  String get family => snippetFamilies24[widget.slug]!;
  Object? prop(String k) =>
      widget.properties[k] ??
      snippetContracts24[widget.slug]?[k]?['defaultValue'];
  String text(String k) => prop(k) as String;
  bool flag(String k) => prop(k) == true;
  T choice<T extends Enum>(String k, List<T> values) =>
      values.firstWhere((v) => v.name == prop(k));
  @override
  void initState() {
    super.initState();
    expanded = flag('expanded') ? ['parent'] : [];
    expression = ForgeODataFilterGroupData(
        id: 'root',
        operator: ForgeODataFilterConjunction.and,
        children: [
          createForgeODataFilterCondition(amount, 'amount-condition')
        ]);
  }

  @override
  void didUpdateWidget(covariant AdvancedSnippet24 old) {
    super.didUpdateWidget(old);
    if (old.properties['expanded'] != widget.properties['expanded'])
      expanded = flag('expanded') ? ['parent'] : [];
  }

  void event(String value) {
    setState(() {
      requests++;
      result = value;
    });
  }

  static const amount = ForgeODataFilterField(
      id: 'amount',
      path: 'Amount',
      label: 'Valor',
      kind: ForgeODataFilterKind.decimal,
      precision: 40,
      scale: 4);
  static const labels = ForgeODataFilterLabels(
      field: 'Campo',
      operator: 'Operador',
      value: 'Valor',
      remove: 'Remover',
      addCondition: 'Adicionar condição',
      addGroup: 'Adicionar grupo',
      group: 'Grupo',
      and: 'E',
      or: 'Ou',
      apply: 'Aplicar',
      clear: 'Limpar',
      cancel: 'Cancelar',
      all: 'Todos',
      yes: 'Sim',
      no: 'Não',
      minimum: 'Mínimo',
      maximum: 'Máximo',
      invalid: 'Expressão inválida',
      unsupported: 'Expressão não suportada no modo simples',
      operatorLabels: {
        ForgeODataFilterOperator.eq: 'Igual',
        ForgeODataFilterOperator.ne: 'Diferente',
        ForgeODataFilterOperator.contains: 'Contém',
        ForgeODataFilterOperator.startswith: 'Começa com',
        ForgeODataFilterOperator.endswith: 'Termina com',
        ForgeODataFilterOperator.gt: 'Maior',
        ForgeODataFilterOperator.ge: 'Maior ou igual',
        ForgeODataFilterOperator.lt: 'Menor',
        ForgeODataFilterOperator.le: 'Menor ou igual',
        ForgeODataFilterOperator.between: 'Entre',
        ForgeODataFilterOperator.inValues: 'Em'
      });
  Widget field() => const ForgeInput(semanticLabel: 'Conteúdo preservado');
  Widget action() => ForgeButton(
      onPressed: () => event('Ação do consumidor'),
      child: Text(text('actionLabel')));
  Widget grid() {
    final rows = flag('empty') ? <String>[] : ['Beta', 'Alpha', 'Gamma'];
    if (sort != null)
      rows.sort((a, b) => sort!.direction == ForgeSortDirection.ascending
          ? a.compareTo(b)
          : b.compareTo(a));
    return ForgeDataGrid<String>(
        label: text('label'),
        rows: rows,
        getRowKey: (r) => r,
        sort: sort,
        onSortChange: (v) {
          setState(() {
            requests++;
            if (flag('acceptChanges')) sort = v;
          });
        },
        emptyContent: const Text('Nenhum registro'),
        fullWidth: flag('fullWidth'),
        showBorders: flag('showBorders'),
        showColumnLines: flag('showColumnLines'),
        showRowLines: flag('showRowLines'),
        rowAlternationEnabled: flag('rowAlternationEnabled'),
        size: choice('size', ForgeSize.values),
        columns: [
          ForgeDataGridColumn(
              key: 'name',
              header: 'Nome',
              renderCell: Text.new,
              sortable: true,
              sortLabel: 'Ordenar nomes'),
          ForgeDataGridColumn(
              key: 'action',
              header: 'Ação',
              renderCell: (r) => ForgeButton(
                  onPressed: () => event(r), child: const Text('Selecionar')))
        ],
        children: const [
          ForgeDataGridHeader(),
          ForgeDataGridBody(),
          ForgeDataGridFooter(child: Text('Rodapé da tabela'))
        ]);
  }

  Widget treeGrid() => ForgeTreeGrid<String>(
      label: text('label'),
      nodes: [
        ForgeTreeGridNode(
            key: 'parent',
            item: 'Equipe',
            children: [ForgeTreeGridNode(key: 'child', item: 'Pessoa')])
      ],
      getNodeLabel: (r) => r,
      expandedValue: expanded,
      onExpandedValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expanded = v;
        });
      },
      direction: choice('direction', ForgeNavigationDirection.values),
      animated: flag('animated'),
      columns: [
        ForgeTreeGridColumn(key: 'name', header: 'Nome', getCellText: (r) => r),
        ForgeTreeGridColumn(
            key: 'detail',
            header: 'Detalhe',
            getCellText: (r) => r + ' — detalhe')
      ],
      children: const [
        ForgeTreeGridHeader(),
        ForgeTreeGridBody(),
        ForgeTreeGridFooter(child: Text('Rodapé da hierarquia'))
      ]);
  Widget template() {
    final title = Text(text('titleText')),
        body = Column(children: [Text(text('bodyText')), field()]);
    final optional = flag('showSlots');
    return switch (family) {
      'application-layout-template' => SizedBox(
          height: 420,
          child: ForgeApplicationLayoutTemplate(
              header: optional ? title : null,
              navigation: optional ? const Text('Navegação') : null,
              toolbar: optional ? action() : null,
              footer: optional ? const Text('Rodapé') : null,
              mainId: 'forge-demo-main',
              child: body)),
      'showcase-page-template' => ForgeShowcasePageTemplate(
          title: optional ? title : null,
          navigation: optional ? const Text('Catálogo') : null,
          toolbar: optional ? action() : null,
          child: body),
      'home-page' => ForgeHomePageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          quickActions: optional ? action() : null,
          summary: optional ? const Text('Resumo') : null,
          child: body),
      'list-page' => ForgeListPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          filters: optional ? const Text('Filtros') : null,
          pagination: optional ? const Text('Paginação do consumidor') : null,
          child: body),
      'detail-page' => ForgeDetailPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          aside: optional ? const Text('Informações complementares') : null,
          child: body),
      'form-page' => ForgeFormPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          notice: optional ? const Text('Aviso do formulário') : null,
          child: body),
      _ => throw StateError(family)
    };
  }

  Widget transition() => Column(children: [
        ForgeButton(
            onPressed: () => setState(() => screen++),
            child: const Text('Trocar tela')),
        ForgePageTransition(
            screenKey: screen,
            intent: choice('intent', ForgePageTransitionIntent.values),
            animated: flag('animated'),
            child: Text('Tela $screen'))
      ]);
  Widget shared(BuildContext context) => Column(children: [
        ForgeSharedElement(
            name: 'forge-demo-element',
            animated: flag('animated'),
            child: SizedBox(
                width: 240,
                height: 80,
                child: Material(
                    type: MaterialType.transparency,
                    child: Center(child: Text(text('titleText')))))),
        ForgeButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute<void>(
                builder: (context) => Scaffold(
                        body: SafeArea(
                            child: Column(children: [
                      ForgeSharedElement(
                          name: 'forge-demo-element',
                          animated: flag('animated'),
                          child: SizedBox(
                              width: 240,
                              height: 80,
                              child: Material(
                                  type: MaterialType.transparency,
                                  child:
                                      Center(child: Text(text('titleText')))))),
                      ForgeButton(
                          onPressed: () => Navigator.of(context).pop(),
                          child: const Text('Voltar'))
                    ]))))),
            child: const Text('Abrir destino'))
      ]);
  Widget map() => ForgeMapView(
      label: text('label'),
      description:
          'Demonstração esquemática sem navegação nem localização real',
      status: choice('status', ForgeMapViewStatus.values),
      scene: ForgeMapScene(markers: [
        ForgeMapMarker(
            id: 'origin',
            label: 'Origem',
            coordinate:
                const ForgeMapCoordinate(latitude: -23.55, longitude: -46.63),
            kind: ForgeMapMarkerKind.origin)
      ]),
      renderer: const ForgeSchematicMapRenderer(),
      labels: const ForgeMapViewLabelsData(
          loading: 'Carregando mapa',
          empty: 'Sem pontos',
          unavailable: 'Mapa indisponível',
          schematic: 'Mapa esquemático, sem navegação'),
      onRendererError: (e) => event('Falha do renderizador'));
  Widget odata() => ForgeODataFilter(
      mode: choice('mode', ForgeODataFilterMode.values),
      fields: const [amount],
      value: expression,
      onValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expression = v;
        });
      },
      onApply: (v, filter) => event(filter),
      onCancel: () => event('Cancelado'),
      labels: labels,
      disabled: flag('disabled'),
      actionsLayout:
          choice('actionsLayout', ForgeODataFilterActionsLayout.values));
  @override
  Widget build(BuildContext context) =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        switch (family) {
          'data-grid' => grid(),
          'tree-grid' => treeGrid(),
          'page-transition' => transition(),
          'shared-element' => shared(context),
          'map-view' => map(),
          'o-data-filter' => odata(),
          _ => template()
        },
        Text('Solicitações: $requests'),
        if (result.isNotEmpty) Text(result)
      ]);
}

// Canonical parts are created by their native owner, not duplicated focus owners: MapView.
const snippetContracts25=<String,Map<String,Map<String,Object?>>>{"map-view":{"label":{"kind":"text","defaultValue":"Mapa de demonstração","nonblank":true},"status":{"kind":"select","options":["loading","ready","empty","unavailable"],"defaultValue":"ready"}}};
const snippetFamilies25=<String,String>{"map-view":"map-view"};
class AdvancedSnippet25 extends StatefulWidget {final String slug='map-view';final Map<String,Object?> properties=const {"label": "Mapa de demonstração", "status": "ready"};const AdvancedSnippet25({super.key});@override State<AdvancedSnippet25> createState()=>_AdvancedSnippetState25();}
class _AdvancedSnippetState25 extends State<AdvancedSnippet25> {
  int requests = 0, screen = 0;
  String result = '';
  ForgeDataGridSort? sort;
  List<String> expanded = [];
  late ForgeODataFilterExpression expression;
  String get family => snippetFamilies25[widget.slug]!;
  Object? prop(String k) =>
      widget.properties[k] ??
      snippetContracts25[widget.slug]?[k]?['defaultValue'];
  String text(String k) => prop(k) as String;
  bool flag(String k) => prop(k) == true;
  T choice<T extends Enum>(String k, List<T> values) =>
      values.firstWhere((v) => v.name == prop(k));
  @override
  void initState() {
    super.initState();
    expanded = flag('expanded') ? ['parent'] : [];
    expression = ForgeODataFilterGroupData(
        id: 'root',
        operator: ForgeODataFilterConjunction.and,
        children: [
          createForgeODataFilterCondition(amount, 'amount-condition')
        ]);
  }

  @override
  void didUpdateWidget(covariant AdvancedSnippet25 old) {
    super.didUpdateWidget(old);
    if (old.properties['expanded'] != widget.properties['expanded'])
      expanded = flag('expanded') ? ['parent'] : [];
  }

  void event(String value) {
    setState(() {
      requests++;
      result = value;
    });
  }

  static const amount = ForgeODataFilterField(
      id: 'amount',
      path: 'Amount',
      label: 'Valor',
      kind: ForgeODataFilterKind.decimal,
      precision: 40,
      scale: 4);
  static const labels = ForgeODataFilterLabels(
      field: 'Campo',
      operator: 'Operador',
      value: 'Valor',
      remove: 'Remover',
      addCondition: 'Adicionar condição',
      addGroup: 'Adicionar grupo',
      group: 'Grupo',
      and: 'E',
      or: 'Ou',
      apply: 'Aplicar',
      clear: 'Limpar',
      cancel: 'Cancelar',
      all: 'Todos',
      yes: 'Sim',
      no: 'Não',
      minimum: 'Mínimo',
      maximum: 'Máximo',
      invalid: 'Expressão inválida',
      unsupported: 'Expressão não suportada no modo simples',
      operatorLabels: {
        ForgeODataFilterOperator.eq: 'Igual',
        ForgeODataFilterOperator.ne: 'Diferente',
        ForgeODataFilterOperator.contains: 'Contém',
        ForgeODataFilterOperator.startswith: 'Começa com',
        ForgeODataFilterOperator.endswith: 'Termina com',
        ForgeODataFilterOperator.gt: 'Maior',
        ForgeODataFilterOperator.ge: 'Maior ou igual',
        ForgeODataFilterOperator.lt: 'Menor',
        ForgeODataFilterOperator.le: 'Menor ou igual',
        ForgeODataFilterOperator.between: 'Entre',
        ForgeODataFilterOperator.inValues: 'Em'
      });
  Widget field() => const ForgeInput(semanticLabel: 'Conteúdo preservado');
  Widget action() => ForgeButton(
      onPressed: () => event('Ação do consumidor'),
      child: Text(text('actionLabel')));
  Widget grid() {
    final rows = flag('empty') ? <String>[] : ['Beta', 'Alpha', 'Gamma'];
    if (sort != null)
      rows.sort((a, b) => sort!.direction == ForgeSortDirection.ascending
          ? a.compareTo(b)
          : b.compareTo(a));
    return ForgeDataGrid<String>(
        label: text('label'),
        rows: rows,
        getRowKey: (r) => r,
        sort: sort,
        onSortChange: (v) {
          setState(() {
            requests++;
            if (flag('acceptChanges')) sort = v;
          });
        },
        emptyContent: const Text('Nenhum registro'),
        fullWidth: flag('fullWidth'),
        showBorders: flag('showBorders'),
        showColumnLines: flag('showColumnLines'),
        showRowLines: flag('showRowLines'),
        rowAlternationEnabled: flag('rowAlternationEnabled'),
        size: choice('size', ForgeSize.values),
        columns: [
          ForgeDataGridColumn(
              key: 'name',
              header: 'Nome',
              renderCell: Text.new,
              sortable: true,
              sortLabel: 'Ordenar nomes'),
          ForgeDataGridColumn(
              key: 'action',
              header: 'Ação',
              renderCell: (r) => ForgeButton(
                  onPressed: () => event(r), child: const Text('Selecionar')))
        ],
        children: const [
          ForgeDataGridHeader(),
          ForgeDataGridBody(),
          ForgeDataGridFooter(child: Text('Rodapé da tabela'))
        ]);
  }

  Widget treeGrid() => ForgeTreeGrid<String>(
      label: text('label'),
      nodes: [
        ForgeTreeGridNode(
            key: 'parent',
            item: 'Equipe',
            children: [ForgeTreeGridNode(key: 'child', item: 'Pessoa')])
      ],
      getNodeLabel: (r) => r,
      expandedValue: expanded,
      onExpandedValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expanded = v;
        });
      },
      direction: choice('direction', ForgeNavigationDirection.values),
      animated: flag('animated'),
      columns: [
        ForgeTreeGridColumn(key: 'name', header: 'Nome', getCellText: (r) => r),
        ForgeTreeGridColumn(
            key: 'detail',
            header: 'Detalhe',
            getCellText: (r) => r + ' — detalhe')
      ],
      children: const [
        ForgeTreeGridHeader(),
        ForgeTreeGridBody(),
        ForgeTreeGridFooter(child: Text('Rodapé da hierarquia'))
      ]);
  Widget template() {
    final title = Text(text('titleText')),
        body = Column(children: [Text(text('bodyText')), field()]);
    final optional = flag('showSlots');
    return switch (family) {
      'application-layout-template' => SizedBox(
          height: 420,
          child: ForgeApplicationLayoutTemplate(
              header: optional ? title : null,
              navigation: optional ? const Text('Navegação') : null,
              toolbar: optional ? action() : null,
              footer: optional ? const Text('Rodapé') : null,
              mainId: 'forge-demo-main',
              child: body)),
      'showcase-page-template' => ForgeShowcasePageTemplate(
          title: optional ? title : null,
          navigation: optional ? const Text('Catálogo') : null,
          toolbar: optional ? action() : null,
          child: body),
      'home-page' => ForgeHomePageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          quickActions: optional ? action() : null,
          summary: optional ? const Text('Resumo') : null,
          child: body),
      'list-page' => ForgeListPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          filters: optional ? const Text('Filtros') : null,
          pagination: optional ? const Text('Paginação do consumidor') : null,
          child: body),
      'detail-page' => ForgeDetailPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          aside: optional ? const Text('Informações complementares') : null,
          child: body),
      'form-page' => ForgeFormPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          notice: optional ? const Text('Aviso do formulário') : null,
          child: body),
      _ => throw StateError(family)
    };
  }

  Widget transition() => Column(children: [
        ForgeButton(
            onPressed: () => setState(() => screen++),
            child: const Text('Trocar tela')),
        ForgePageTransition(
            screenKey: screen,
            intent: choice('intent', ForgePageTransitionIntent.values),
            animated: flag('animated'),
            child: Text('Tela $screen'))
      ]);
  Widget shared(BuildContext context) => Column(children: [
        ForgeSharedElement(
            name: 'forge-demo-element',
            animated: flag('animated'),
            child: SizedBox(
                width: 240,
                height: 80,
                child: Material(
                    type: MaterialType.transparency,
                    child: Center(child: Text(text('titleText')))))),
        ForgeButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute<void>(
                builder: (context) => Scaffold(
                        body: SafeArea(
                            child: Column(children: [
                      ForgeSharedElement(
                          name: 'forge-demo-element',
                          animated: flag('animated'),
                          child: SizedBox(
                              width: 240,
                              height: 80,
                              child: Material(
                                  type: MaterialType.transparency,
                                  child:
                                      Center(child: Text(text('titleText')))))),
                      ForgeButton(
                          onPressed: () => Navigator.of(context).pop(),
                          child: const Text('Voltar'))
                    ]))))),
            child: const Text('Abrir destino'))
      ]);
  Widget map() => ForgeMapView(
      label: text('label'),
      description:
          'Demonstração esquemática sem navegação nem localização real',
      status: choice('status', ForgeMapViewStatus.values),
      scene: ForgeMapScene(markers: [
        ForgeMapMarker(
            id: 'origin',
            label: 'Origem',
            coordinate:
                const ForgeMapCoordinate(latitude: -23.55, longitude: -46.63),
            kind: ForgeMapMarkerKind.origin)
      ]),
      renderer: const ForgeSchematicMapRenderer(),
      labels: const ForgeMapViewLabelsData(
          loading: 'Carregando mapa',
          empty: 'Sem pontos',
          unavailable: 'Mapa indisponível',
          schematic: 'Mapa esquemático, sem navegação'),
      onRendererError: (e) => event('Falha do renderizador'));
  Widget odata() => ForgeODataFilter(
      mode: choice('mode', ForgeODataFilterMode.values),
      fields: const [amount],
      value: expression,
      onValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expression = v;
        });
      },
      onApply: (v, filter) => event(filter),
      onCancel: () => event('Cancelado'),
      labels: labels,
      disabled: flag('disabled'),
      actionsLayout:
          choice('actionsLayout', ForgeODataFilterActionsLayout.values));
  @override
  Widget build(BuildContext context) =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        switch (family) {
          'data-grid' => grid(),
          'tree-grid' => treeGrid(),
          'page-transition' => transition(),
          'shared-element' => shared(context),
          'map-view' => map(),
          'o-data-filter' => odata(),
          _ => template()
        },
        Text('Solicitações: $requests'),
        if (result.isNotEmpty) Text(result)
      ]);
}

// Canonical parts are created by their native owner, not duplicated focus owners: ODataFilter.
const snippetContracts26=<String,Map<String,Map<String,Object?>>>{"odata-filter":{"acceptChanges":{"kind":"boolean","defaultValue":true},"disabled":{"kind":"boolean","defaultValue":false},"mode":{"kind":"select","options":["simple","advanced"],"defaultValue":"advanced"},"actionsLayout":{"kind":"select","options":["inline","stack"],"defaultValue":"inline"}}};
const snippetFamilies26=<String,String>{"odata-filter":"o-data-filter"};
class AdvancedSnippet26 extends StatefulWidget {final String slug='odata-filter';final Map<String,Object?> properties=const {"acceptChanges": true, "disabled": false, "mode": "advanced", "actionsLayout": "inline"};const AdvancedSnippet26({super.key});@override State<AdvancedSnippet26> createState()=>_AdvancedSnippetState26();}
class _AdvancedSnippetState26 extends State<AdvancedSnippet26> {
  int requests = 0, screen = 0;
  String result = '';
  ForgeDataGridSort? sort;
  List<String> expanded = [];
  late ForgeODataFilterExpression expression;
  String get family => snippetFamilies26[widget.slug]!;
  Object? prop(String k) =>
      widget.properties[k] ??
      snippetContracts26[widget.slug]?[k]?['defaultValue'];
  String text(String k) => prop(k) as String;
  bool flag(String k) => prop(k) == true;
  T choice<T extends Enum>(String k, List<T> values) =>
      values.firstWhere((v) => v.name == prop(k));
  @override
  void initState() {
    super.initState();
    expanded = flag('expanded') ? ['parent'] : [];
    expression = ForgeODataFilterGroupData(
        id: 'root',
        operator: ForgeODataFilterConjunction.and,
        children: [
          createForgeODataFilterCondition(amount, 'amount-condition')
        ]);
  }

  @override
  void didUpdateWidget(covariant AdvancedSnippet26 old) {
    super.didUpdateWidget(old);
    if (old.properties['expanded'] != widget.properties['expanded'])
      expanded = flag('expanded') ? ['parent'] : [];
  }

  void event(String value) {
    setState(() {
      requests++;
      result = value;
    });
  }

  static const amount = ForgeODataFilterField(
      id: 'amount',
      path: 'Amount',
      label: 'Valor',
      kind: ForgeODataFilterKind.decimal,
      precision: 40,
      scale: 4);
  static const labels = ForgeODataFilterLabels(
      field: 'Campo',
      operator: 'Operador',
      value: 'Valor',
      remove: 'Remover',
      addCondition: 'Adicionar condição',
      addGroup: 'Adicionar grupo',
      group: 'Grupo',
      and: 'E',
      or: 'Ou',
      apply: 'Aplicar',
      clear: 'Limpar',
      cancel: 'Cancelar',
      all: 'Todos',
      yes: 'Sim',
      no: 'Não',
      minimum: 'Mínimo',
      maximum: 'Máximo',
      invalid: 'Expressão inválida',
      unsupported: 'Expressão não suportada no modo simples',
      operatorLabels: {
        ForgeODataFilterOperator.eq: 'Igual',
        ForgeODataFilterOperator.ne: 'Diferente',
        ForgeODataFilterOperator.contains: 'Contém',
        ForgeODataFilterOperator.startswith: 'Começa com',
        ForgeODataFilterOperator.endswith: 'Termina com',
        ForgeODataFilterOperator.gt: 'Maior',
        ForgeODataFilterOperator.ge: 'Maior ou igual',
        ForgeODataFilterOperator.lt: 'Menor',
        ForgeODataFilterOperator.le: 'Menor ou igual',
        ForgeODataFilterOperator.between: 'Entre',
        ForgeODataFilterOperator.inValues: 'Em'
      });
  Widget field() => const ForgeInput(semanticLabel: 'Conteúdo preservado');
  Widget action() => ForgeButton(
      onPressed: () => event('Ação do consumidor'),
      child: Text(text('actionLabel')));
  Widget grid() {
    final rows = flag('empty') ? <String>[] : ['Beta', 'Alpha', 'Gamma'];
    if (sort != null)
      rows.sort((a, b) => sort!.direction == ForgeSortDirection.ascending
          ? a.compareTo(b)
          : b.compareTo(a));
    return ForgeDataGrid<String>(
        label: text('label'),
        rows: rows,
        getRowKey: (r) => r,
        sort: sort,
        onSortChange: (v) {
          setState(() {
            requests++;
            if (flag('acceptChanges')) sort = v;
          });
        },
        emptyContent: const Text('Nenhum registro'),
        fullWidth: flag('fullWidth'),
        showBorders: flag('showBorders'),
        showColumnLines: flag('showColumnLines'),
        showRowLines: flag('showRowLines'),
        rowAlternationEnabled: flag('rowAlternationEnabled'),
        size: choice('size', ForgeSize.values),
        columns: [
          ForgeDataGridColumn(
              key: 'name',
              header: 'Nome',
              renderCell: Text.new,
              sortable: true,
              sortLabel: 'Ordenar nomes'),
          ForgeDataGridColumn(
              key: 'action',
              header: 'Ação',
              renderCell: (r) => ForgeButton(
                  onPressed: () => event(r), child: const Text('Selecionar')))
        ],
        children: const [
          ForgeDataGridHeader(),
          ForgeDataGridBody(),
          ForgeDataGridFooter(child: Text('Rodapé da tabela'))
        ]);
  }

  Widget treeGrid() => ForgeTreeGrid<String>(
      label: text('label'),
      nodes: [
        ForgeTreeGridNode(
            key: 'parent',
            item: 'Equipe',
            children: [ForgeTreeGridNode(key: 'child', item: 'Pessoa')])
      ],
      getNodeLabel: (r) => r,
      expandedValue: expanded,
      onExpandedValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expanded = v;
        });
      },
      direction: choice('direction', ForgeNavigationDirection.values),
      animated: flag('animated'),
      columns: [
        ForgeTreeGridColumn(key: 'name', header: 'Nome', getCellText: (r) => r),
        ForgeTreeGridColumn(
            key: 'detail',
            header: 'Detalhe',
            getCellText: (r) => r + ' — detalhe')
      ],
      children: const [
        ForgeTreeGridHeader(),
        ForgeTreeGridBody(),
        ForgeTreeGridFooter(child: Text('Rodapé da hierarquia'))
      ]);
  Widget template() {
    final title = Text(text('titleText')),
        body = Column(children: [Text(text('bodyText')), field()]);
    final optional = flag('showSlots');
    return switch (family) {
      'application-layout-template' => SizedBox(
          height: 420,
          child: ForgeApplicationLayoutTemplate(
              header: optional ? title : null,
              navigation: optional ? const Text('Navegação') : null,
              toolbar: optional ? action() : null,
              footer: optional ? const Text('Rodapé') : null,
              mainId: 'forge-demo-main',
              child: body)),
      'showcase-page-template' => ForgeShowcasePageTemplate(
          title: optional ? title : null,
          navigation: optional ? const Text('Catálogo') : null,
          toolbar: optional ? action() : null,
          child: body),
      'home-page' => ForgeHomePageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          quickActions: optional ? action() : null,
          summary: optional ? const Text('Resumo') : null,
          child: body),
      'list-page' => ForgeListPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          filters: optional ? const Text('Filtros') : null,
          pagination: optional ? const Text('Paginação do consumidor') : null,
          child: body),
      'detail-page' => ForgeDetailPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          aside: optional ? const Text('Informações complementares') : null,
          child: body),
      'form-page' => ForgeFormPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          notice: optional ? const Text('Aviso do formulário') : null,
          child: body),
      _ => throw StateError(family)
    };
  }

  Widget transition() => Column(children: [
        ForgeButton(
            onPressed: () => setState(() => screen++),
            child: const Text('Trocar tela')),
        ForgePageTransition(
            screenKey: screen,
            intent: choice('intent', ForgePageTransitionIntent.values),
            animated: flag('animated'),
            child: Text('Tela $screen'))
      ]);
  Widget shared(BuildContext context) => Column(children: [
        ForgeSharedElement(
            name: 'forge-demo-element',
            animated: flag('animated'),
            child: SizedBox(
                width: 240,
                height: 80,
                child: Material(
                    type: MaterialType.transparency,
                    child: Center(child: Text(text('titleText')))))),
        ForgeButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute<void>(
                builder: (context) => Scaffold(
                        body: SafeArea(
                            child: Column(children: [
                      ForgeSharedElement(
                          name: 'forge-demo-element',
                          animated: flag('animated'),
                          child: SizedBox(
                              width: 240,
                              height: 80,
                              child: Material(
                                  type: MaterialType.transparency,
                                  child:
                                      Center(child: Text(text('titleText')))))),
                      ForgeButton(
                          onPressed: () => Navigator.of(context).pop(),
                          child: const Text('Voltar'))
                    ]))))),
            child: const Text('Abrir destino'))
      ]);
  Widget map() => ForgeMapView(
      label: text('label'),
      description:
          'Demonstração esquemática sem navegação nem localização real',
      status: choice('status', ForgeMapViewStatus.values),
      scene: ForgeMapScene(markers: [
        ForgeMapMarker(
            id: 'origin',
            label: 'Origem',
            coordinate:
                const ForgeMapCoordinate(latitude: -23.55, longitude: -46.63),
            kind: ForgeMapMarkerKind.origin)
      ]),
      renderer: const ForgeSchematicMapRenderer(),
      labels: const ForgeMapViewLabelsData(
          loading: 'Carregando mapa',
          empty: 'Sem pontos',
          unavailable: 'Mapa indisponível',
          schematic: 'Mapa esquemático, sem navegação'),
      onRendererError: (e) => event('Falha do renderizador'));
  Widget odata() => ForgeODataFilter(
      mode: choice('mode', ForgeODataFilterMode.values),
      fields: const [amount],
      value: expression,
      onValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expression = v;
        });
      },
      onApply: (v, filter) => event(filter),
      onCancel: () => event('Cancelado'),
      labels: labels,
      disabled: flag('disabled'),
      actionsLayout:
          choice('actionsLayout', ForgeODataFilterActionsLayout.values));
  @override
  Widget build(BuildContext context) =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        switch (family) {
          'data-grid' => grid(),
          'tree-grid' => treeGrid(),
          'page-transition' => transition(),
          'shared-element' => shared(context),
          'map-view' => map(),
          'o-data-filter' => odata(),
          _ => template()
        },
        Text('Solicitações: $requests'),
        if (result.isNotEmpty) Text(result)
      ]);
}

// Canonical parts are created by their native owner, not duplicated focus owners: ODataFilterCondition.
const snippetContracts27=<String,Map<String,Map<String,Object?>>>{"odata-filter-condition":{"acceptChanges":{"kind":"boolean","defaultValue":true},"disabled":{"kind":"boolean","defaultValue":false},"mode":{"kind":"select","options":["simple","advanced"],"defaultValue":"advanced"},"actionsLayout":{"kind":"select","options":["inline","stack"],"defaultValue":"inline"}}};
const snippetFamilies27=<String,String>{"odata-filter-condition":"o-data-filter"};
class AdvancedSnippet27 extends StatefulWidget {final String slug='odata-filter-condition';final Map<String,Object?> properties=const {"acceptChanges": true, "disabled": false, "mode": "advanced", "actionsLayout": "inline"};const AdvancedSnippet27({super.key});@override State<AdvancedSnippet27> createState()=>_AdvancedSnippetState27();}
class _AdvancedSnippetState27 extends State<AdvancedSnippet27> {
  int requests = 0, screen = 0;
  String result = '';
  ForgeDataGridSort? sort;
  List<String> expanded = [];
  late ForgeODataFilterExpression expression;
  String get family => snippetFamilies27[widget.slug]!;
  Object? prop(String k) =>
      widget.properties[k] ??
      snippetContracts27[widget.slug]?[k]?['defaultValue'];
  String text(String k) => prop(k) as String;
  bool flag(String k) => prop(k) == true;
  T choice<T extends Enum>(String k, List<T> values) =>
      values.firstWhere((v) => v.name == prop(k));
  @override
  void initState() {
    super.initState();
    expanded = flag('expanded') ? ['parent'] : [];
    expression = ForgeODataFilterGroupData(
        id: 'root',
        operator: ForgeODataFilterConjunction.and,
        children: [
          createForgeODataFilterCondition(amount, 'amount-condition')
        ]);
  }

  @override
  void didUpdateWidget(covariant AdvancedSnippet27 old) {
    super.didUpdateWidget(old);
    if (old.properties['expanded'] != widget.properties['expanded'])
      expanded = flag('expanded') ? ['parent'] : [];
  }

  void event(String value) {
    setState(() {
      requests++;
      result = value;
    });
  }

  static const amount = ForgeODataFilterField(
      id: 'amount',
      path: 'Amount',
      label: 'Valor',
      kind: ForgeODataFilterKind.decimal,
      precision: 40,
      scale: 4);
  static const labels = ForgeODataFilterLabels(
      field: 'Campo',
      operator: 'Operador',
      value: 'Valor',
      remove: 'Remover',
      addCondition: 'Adicionar condição',
      addGroup: 'Adicionar grupo',
      group: 'Grupo',
      and: 'E',
      or: 'Ou',
      apply: 'Aplicar',
      clear: 'Limpar',
      cancel: 'Cancelar',
      all: 'Todos',
      yes: 'Sim',
      no: 'Não',
      minimum: 'Mínimo',
      maximum: 'Máximo',
      invalid: 'Expressão inválida',
      unsupported: 'Expressão não suportada no modo simples',
      operatorLabels: {
        ForgeODataFilterOperator.eq: 'Igual',
        ForgeODataFilterOperator.ne: 'Diferente',
        ForgeODataFilterOperator.contains: 'Contém',
        ForgeODataFilterOperator.startswith: 'Começa com',
        ForgeODataFilterOperator.endswith: 'Termina com',
        ForgeODataFilterOperator.gt: 'Maior',
        ForgeODataFilterOperator.ge: 'Maior ou igual',
        ForgeODataFilterOperator.lt: 'Menor',
        ForgeODataFilterOperator.le: 'Menor ou igual',
        ForgeODataFilterOperator.between: 'Entre',
        ForgeODataFilterOperator.inValues: 'Em'
      });
  Widget field() => const ForgeInput(semanticLabel: 'Conteúdo preservado');
  Widget action() => ForgeButton(
      onPressed: () => event('Ação do consumidor'),
      child: Text(text('actionLabel')));
  Widget grid() {
    final rows = flag('empty') ? <String>[] : ['Beta', 'Alpha', 'Gamma'];
    if (sort != null)
      rows.sort((a, b) => sort!.direction == ForgeSortDirection.ascending
          ? a.compareTo(b)
          : b.compareTo(a));
    return ForgeDataGrid<String>(
        label: text('label'),
        rows: rows,
        getRowKey: (r) => r,
        sort: sort,
        onSortChange: (v) {
          setState(() {
            requests++;
            if (flag('acceptChanges')) sort = v;
          });
        },
        emptyContent: const Text('Nenhum registro'),
        fullWidth: flag('fullWidth'),
        showBorders: flag('showBorders'),
        showColumnLines: flag('showColumnLines'),
        showRowLines: flag('showRowLines'),
        rowAlternationEnabled: flag('rowAlternationEnabled'),
        size: choice('size', ForgeSize.values),
        columns: [
          ForgeDataGridColumn(
              key: 'name',
              header: 'Nome',
              renderCell: Text.new,
              sortable: true,
              sortLabel: 'Ordenar nomes'),
          ForgeDataGridColumn(
              key: 'action',
              header: 'Ação',
              renderCell: (r) => ForgeButton(
                  onPressed: () => event(r), child: const Text('Selecionar')))
        ],
        children: const [
          ForgeDataGridHeader(),
          ForgeDataGridBody(),
          ForgeDataGridFooter(child: Text('Rodapé da tabela'))
        ]);
  }

  Widget treeGrid() => ForgeTreeGrid<String>(
      label: text('label'),
      nodes: [
        ForgeTreeGridNode(
            key: 'parent',
            item: 'Equipe',
            children: [ForgeTreeGridNode(key: 'child', item: 'Pessoa')])
      ],
      getNodeLabel: (r) => r,
      expandedValue: expanded,
      onExpandedValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expanded = v;
        });
      },
      direction: choice('direction', ForgeNavigationDirection.values),
      animated: flag('animated'),
      columns: [
        ForgeTreeGridColumn(key: 'name', header: 'Nome', getCellText: (r) => r),
        ForgeTreeGridColumn(
            key: 'detail',
            header: 'Detalhe',
            getCellText: (r) => r + ' — detalhe')
      ],
      children: const [
        ForgeTreeGridHeader(),
        ForgeTreeGridBody(),
        ForgeTreeGridFooter(child: Text('Rodapé da hierarquia'))
      ]);
  Widget template() {
    final title = Text(text('titleText')),
        body = Column(children: [Text(text('bodyText')), field()]);
    final optional = flag('showSlots');
    return switch (family) {
      'application-layout-template' => SizedBox(
          height: 420,
          child: ForgeApplicationLayoutTemplate(
              header: optional ? title : null,
              navigation: optional ? const Text('Navegação') : null,
              toolbar: optional ? action() : null,
              footer: optional ? const Text('Rodapé') : null,
              mainId: 'forge-demo-main',
              child: body)),
      'showcase-page-template' => ForgeShowcasePageTemplate(
          title: optional ? title : null,
          navigation: optional ? const Text('Catálogo') : null,
          toolbar: optional ? action() : null,
          child: body),
      'home-page' => ForgeHomePageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          quickActions: optional ? action() : null,
          summary: optional ? const Text('Resumo') : null,
          child: body),
      'list-page' => ForgeListPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          filters: optional ? const Text('Filtros') : null,
          pagination: optional ? const Text('Paginação do consumidor') : null,
          child: body),
      'detail-page' => ForgeDetailPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          aside: optional ? const Text('Informações complementares') : null,
          child: body),
      'form-page' => ForgeFormPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          notice: optional ? const Text('Aviso do formulário') : null,
          child: body),
      _ => throw StateError(family)
    };
  }

  Widget transition() => Column(children: [
        ForgeButton(
            onPressed: () => setState(() => screen++),
            child: const Text('Trocar tela')),
        ForgePageTransition(
            screenKey: screen,
            intent: choice('intent', ForgePageTransitionIntent.values),
            animated: flag('animated'),
            child: Text('Tela $screen'))
      ]);
  Widget shared(BuildContext context) => Column(children: [
        ForgeSharedElement(
            name: 'forge-demo-element',
            animated: flag('animated'),
            child: SizedBox(
                width: 240,
                height: 80,
                child: Material(
                    type: MaterialType.transparency,
                    child: Center(child: Text(text('titleText')))))),
        ForgeButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute<void>(
                builder: (context) => Scaffold(
                        body: SafeArea(
                            child: Column(children: [
                      ForgeSharedElement(
                          name: 'forge-demo-element',
                          animated: flag('animated'),
                          child: SizedBox(
                              width: 240,
                              height: 80,
                              child: Material(
                                  type: MaterialType.transparency,
                                  child:
                                      Center(child: Text(text('titleText')))))),
                      ForgeButton(
                          onPressed: () => Navigator.of(context).pop(),
                          child: const Text('Voltar'))
                    ]))))),
            child: const Text('Abrir destino'))
      ]);
  Widget map() => ForgeMapView(
      label: text('label'),
      description:
          'Demonstração esquemática sem navegação nem localização real',
      status: choice('status', ForgeMapViewStatus.values),
      scene: ForgeMapScene(markers: [
        ForgeMapMarker(
            id: 'origin',
            label: 'Origem',
            coordinate:
                const ForgeMapCoordinate(latitude: -23.55, longitude: -46.63),
            kind: ForgeMapMarkerKind.origin)
      ]),
      renderer: const ForgeSchematicMapRenderer(),
      labels: const ForgeMapViewLabelsData(
          loading: 'Carregando mapa',
          empty: 'Sem pontos',
          unavailable: 'Mapa indisponível',
          schematic: 'Mapa esquemático, sem navegação'),
      onRendererError: (e) => event('Falha do renderizador'));
  Widget odata() => ForgeODataFilter(
      mode: choice('mode', ForgeODataFilterMode.values),
      fields: const [amount],
      value: expression,
      onValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expression = v;
        });
      },
      onApply: (v, filter) => event(filter),
      onCancel: () => event('Cancelado'),
      labels: labels,
      disabled: flag('disabled'),
      actionsLayout:
          choice('actionsLayout', ForgeODataFilterActionsLayout.values));
  @override
  Widget build(BuildContext context) =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        switch (family) {
          'data-grid' => grid(),
          'tree-grid' => treeGrid(),
          'page-transition' => transition(),
          'shared-element' => shared(context),
          'map-view' => map(),
          'o-data-filter' => odata(),
          _ => template()
        },
        Text('Solicitações: $requests'),
        if (result.isNotEmpty) Text(result)
      ]);
}

// Canonical parts are created by their native owner, not duplicated focus owners: ODataFilterGroup.
const snippetContracts28=<String,Map<String,Map<String,Object?>>>{"odata-filter-group":{"acceptChanges":{"kind":"boolean","defaultValue":true},"disabled":{"kind":"boolean","defaultValue":false},"mode":{"kind":"select","options":["simple","advanced"],"defaultValue":"advanced"},"actionsLayout":{"kind":"select","options":["inline","stack"],"defaultValue":"inline"}}};
const snippetFamilies28=<String,String>{"odata-filter-group":"o-data-filter"};
class AdvancedSnippet28 extends StatefulWidget {final String slug='odata-filter-group';final Map<String,Object?> properties=const {"acceptChanges": true, "disabled": false, "mode": "advanced", "actionsLayout": "inline"};const AdvancedSnippet28({super.key});@override State<AdvancedSnippet28> createState()=>_AdvancedSnippetState28();}
class _AdvancedSnippetState28 extends State<AdvancedSnippet28> {
  int requests = 0, screen = 0;
  String result = '';
  ForgeDataGridSort? sort;
  List<String> expanded = [];
  late ForgeODataFilterExpression expression;
  String get family => snippetFamilies28[widget.slug]!;
  Object? prop(String k) =>
      widget.properties[k] ??
      snippetContracts28[widget.slug]?[k]?['defaultValue'];
  String text(String k) => prop(k) as String;
  bool flag(String k) => prop(k) == true;
  T choice<T extends Enum>(String k, List<T> values) =>
      values.firstWhere((v) => v.name == prop(k));
  @override
  void initState() {
    super.initState();
    expanded = flag('expanded') ? ['parent'] : [];
    expression = ForgeODataFilterGroupData(
        id: 'root',
        operator: ForgeODataFilterConjunction.and,
        children: [
          createForgeODataFilterCondition(amount, 'amount-condition')
        ]);
  }

  @override
  void didUpdateWidget(covariant AdvancedSnippet28 old) {
    super.didUpdateWidget(old);
    if (old.properties['expanded'] != widget.properties['expanded'])
      expanded = flag('expanded') ? ['parent'] : [];
  }

  void event(String value) {
    setState(() {
      requests++;
      result = value;
    });
  }

  static const amount = ForgeODataFilterField(
      id: 'amount',
      path: 'Amount',
      label: 'Valor',
      kind: ForgeODataFilterKind.decimal,
      precision: 40,
      scale: 4);
  static const labels = ForgeODataFilterLabels(
      field: 'Campo',
      operator: 'Operador',
      value: 'Valor',
      remove: 'Remover',
      addCondition: 'Adicionar condição',
      addGroup: 'Adicionar grupo',
      group: 'Grupo',
      and: 'E',
      or: 'Ou',
      apply: 'Aplicar',
      clear: 'Limpar',
      cancel: 'Cancelar',
      all: 'Todos',
      yes: 'Sim',
      no: 'Não',
      minimum: 'Mínimo',
      maximum: 'Máximo',
      invalid: 'Expressão inválida',
      unsupported: 'Expressão não suportada no modo simples',
      operatorLabels: {
        ForgeODataFilterOperator.eq: 'Igual',
        ForgeODataFilterOperator.ne: 'Diferente',
        ForgeODataFilterOperator.contains: 'Contém',
        ForgeODataFilterOperator.startswith: 'Começa com',
        ForgeODataFilterOperator.endswith: 'Termina com',
        ForgeODataFilterOperator.gt: 'Maior',
        ForgeODataFilterOperator.ge: 'Maior ou igual',
        ForgeODataFilterOperator.lt: 'Menor',
        ForgeODataFilterOperator.le: 'Menor ou igual',
        ForgeODataFilterOperator.between: 'Entre',
        ForgeODataFilterOperator.inValues: 'Em'
      });
  Widget field() => const ForgeInput(semanticLabel: 'Conteúdo preservado');
  Widget action() => ForgeButton(
      onPressed: () => event('Ação do consumidor'),
      child: Text(text('actionLabel')));
  Widget grid() {
    final rows = flag('empty') ? <String>[] : ['Beta', 'Alpha', 'Gamma'];
    if (sort != null)
      rows.sort((a, b) => sort!.direction == ForgeSortDirection.ascending
          ? a.compareTo(b)
          : b.compareTo(a));
    return ForgeDataGrid<String>(
        label: text('label'),
        rows: rows,
        getRowKey: (r) => r,
        sort: sort,
        onSortChange: (v) {
          setState(() {
            requests++;
            if (flag('acceptChanges')) sort = v;
          });
        },
        emptyContent: const Text('Nenhum registro'),
        fullWidth: flag('fullWidth'),
        showBorders: flag('showBorders'),
        showColumnLines: flag('showColumnLines'),
        showRowLines: flag('showRowLines'),
        rowAlternationEnabled: flag('rowAlternationEnabled'),
        size: choice('size', ForgeSize.values),
        columns: [
          ForgeDataGridColumn(
              key: 'name',
              header: 'Nome',
              renderCell: Text.new,
              sortable: true,
              sortLabel: 'Ordenar nomes'),
          ForgeDataGridColumn(
              key: 'action',
              header: 'Ação',
              renderCell: (r) => ForgeButton(
                  onPressed: () => event(r), child: const Text('Selecionar')))
        ],
        children: const [
          ForgeDataGridHeader(),
          ForgeDataGridBody(),
          ForgeDataGridFooter(child: Text('Rodapé da tabela'))
        ]);
  }

  Widget treeGrid() => ForgeTreeGrid<String>(
      label: text('label'),
      nodes: [
        ForgeTreeGridNode(
            key: 'parent',
            item: 'Equipe',
            children: [ForgeTreeGridNode(key: 'child', item: 'Pessoa')])
      ],
      getNodeLabel: (r) => r,
      expandedValue: expanded,
      onExpandedValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expanded = v;
        });
      },
      direction: choice('direction', ForgeNavigationDirection.values),
      animated: flag('animated'),
      columns: [
        ForgeTreeGridColumn(key: 'name', header: 'Nome', getCellText: (r) => r),
        ForgeTreeGridColumn(
            key: 'detail',
            header: 'Detalhe',
            getCellText: (r) => r + ' — detalhe')
      ],
      children: const [
        ForgeTreeGridHeader(),
        ForgeTreeGridBody(),
        ForgeTreeGridFooter(child: Text('Rodapé da hierarquia'))
      ]);
  Widget template() {
    final title = Text(text('titleText')),
        body = Column(children: [Text(text('bodyText')), field()]);
    final optional = flag('showSlots');
    return switch (family) {
      'application-layout-template' => SizedBox(
          height: 420,
          child: ForgeApplicationLayoutTemplate(
              header: optional ? title : null,
              navigation: optional ? const Text('Navegação') : null,
              toolbar: optional ? action() : null,
              footer: optional ? const Text('Rodapé') : null,
              mainId: 'forge-demo-main',
              child: body)),
      'showcase-page-template' => ForgeShowcasePageTemplate(
          title: optional ? title : null,
          navigation: optional ? const Text('Catálogo') : null,
          toolbar: optional ? action() : null,
          child: body),
      'home-page' => ForgeHomePageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          quickActions: optional ? action() : null,
          summary: optional ? const Text('Resumo') : null,
          child: body),
      'list-page' => ForgeListPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          filters: optional ? const Text('Filtros') : null,
          pagination: optional ? const Text('Paginação do consumidor') : null,
          child: body),
      'detail-page' => ForgeDetailPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          aside: optional ? const Text('Informações complementares') : null,
          child: body),
      'form-page' => ForgeFormPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          notice: optional ? const Text('Aviso do formulário') : null,
          child: body),
      _ => throw StateError(family)
    };
  }

  Widget transition() => Column(children: [
        ForgeButton(
            onPressed: () => setState(() => screen++),
            child: const Text('Trocar tela')),
        ForgePageTransition(
            screenKey: screen,
            intent: choice('intent', ForgePageTransitionIntent.values),
            animated: flag('animated'),
            child: Text('Tela $screen'))
      ]);
  Widget shared(BuildContext context) => Column(children: [
        ForgeSharedElement(
            name: 'forge-demo-element',
            animated: flag('animated'),
            child: SizedBox(
                width: 240,
                height: 80,
                child: Material(
                    type: MaterialType.transparency,
                    child: Center(child: Text(text('titleText')))))),
        ForgeButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute<void>(
                builder: (context) => Scaffold(
                        body: SafeArea(
                            child: Column(children: [
                      ForgeSharedElement(
                          name: 'forge-demo-element',
                          animated: flag('animated'),
                          child: SizedBox(
                              width: 240,
                              height: 80,
                              child: Material(
                                  type: MaterialType.transparency,
                                  child:
                                      Center(child: Text(text('titleText')))))),
                      ForgeButton(
                          onPressed: () => Navigator.of(context).pop(),
                          child: const Text('Voltar'))
                    ]))))),
            child: const Text('Abrir destino'))
      ]);
  Widget map() => ForgeMapView(
      label: text('label'),
      description:
          'Demonstração esquemática sem navegação nem localização real',
      status: choice('status', ForgeMapViewStatus.values),
      scene: ForgeMapScene(markers: [
        ForgeMapMarker(
            id: 'origin',
            label: 'Origem',
            coordinate:
                const ForgeMapCoordinate(latitude: -23.55, longitude: -46.63),
            kind: ForgeMapMarkerKind.origin)
      ]),
      renderer: const ForgeSchematicMapRenderer(),
      labels: const ForgeMapViewLabelsData(
          loading: 'Carregando mapa',
          empty: 'Sem pontos',
          unavailable: 'Mapa indisponível',
          schematic: 'Mapa esquemático, sem navegação'),
      onRendererError: (e) => event('Falha do renderizador'));
  Widget odata() => ForgeODataFilter(
      mode: choice('mode', ForgeODataFilterMode.values),
      fields: const [amount],
      value: expression,
      onValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expression = v;
        });
      },
      onApply: (v, filter) => event(filter),
      onCancel: () => event('Cancelado'),
      labels: labels,
      disabled: flag('disabled'),
      actionsLayout:
          choice('actionsLayout', ForgeODataFilterActionsLayout.values));
  @override
  Widget build(BuildContext context) =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        switch (family) {
          'data-grid' => grid(),
          'tree-grid' => treeGrid(),
          'page-transition' => transition(),
          'shared-element' => shared(context),
          'map-view' => map(),
          'o-data-filter' => odata(),
          _ => template()
        },
        Text('Solicitações: $requests'),
        if (result.isNotEmpty) Text(result)
      ]);
}

// Canonical parts are created by their native owner, not duplicated focus owners: ODataFilterValue.
const snippetContracts29=<String,Map<String,Map<String,Object?>>>{"odata-filter-value":{"acceptChanges":{"kind":"boolean","defaultValue":true},"disabled":{"kind":"boolean","defaultValue":false},"mode":{"kind":"select","options":["simple","advanced"],"defaultValue":"advanced"},"actionsLayout":{"kind":"select","options":["inline","stack"],"defaultValue":"inline"}}};
const snippetFamilies29=<String,String>{"odata-filter-value":"o-data-filter"};
class AdvancedSnippet29 extends StatefulWidget {final String slug='odata-filter-value';final Map<String,Object?> properties=const {"acceptChanges": true, "disabled": false, "mode": "advanced", "actionsLayout": "inline"};const AdvancedSnippet29({super.key});@override State<AdvancedSnippet29> createState()=>_AdvancedSnippetState29();}
class _AdvancedSnippetState29 extends State<AdvancedSnippet29> {
  int requests = 0, screen = 0;
  String result = '';
  ForgeDataGridSort? sort;
  List<String> expanded = [];
  late ForgeODataFilterExpression expression;
  String get family => snippetFamilies29[widget.slug]!;
  Object? prop(String k) =>
      widget.properties[k] ??
      snippetContracts29[widget.slug]?[k]?['defaultValue'];
  String text(String k) => prop(k) as String;
  bool flag(String k) => prop(k) == true;
  T choice<T extends Enum>(String k, List<T> values) =>
      values.firstWhere((v) => v.name == prop(k));
  @override
  void initState() {
    super.initState();
    expanded = flag('expanded') ? ['parent'] : [];
    expression = ForgeODataFilterGroupData(
        id: 'root',
        operator: ForgeODataFilterConjunction.and,
        children: [
          createForgeODataFilterCondition(amount, 'amount-condition')
        ]);
  }

  @override
  void didUpdateWidget(covariant AdvancedSnippet29 old) {
    super.didUpdateWidget(old);
    if (old.properties['expanded'] != widget.properties['expanded'])
      expanded = flag('expanded') ? ['parent'] : [];
  }

  void event(String value) {
    setState(() {
      requests++;
      result = value;
    });
  }

  static const amount = ForgeODataFilterField(
      id: 'amount',
      path: 'Amount',
      label: 'Valor',
      kind: ForgeODataFilterKind.decimal,
      precision: 40,
      scale: 4);
  static const labels = ForgeODataFilterLabels(
      field: 'Campo',
      operator: 'Operador',
      value: 'Valor',
      remove: 'Remover',
      addCondition: 'Adicionar condição',
      addGroup: 'Adicionar grupo',
      group: 'Grupo',
      and: 'E',
      or: 'Ou',
      apply: 'Aplicar',
      clear: 'Limpar',
      cancel: 'Cancelar',
      all: 'Todos',
      yes: 'Sim',
      no: 'Não',
      minimum: 'Mínimo',
      maximum: 'Máximo',
      invalid: 'Expressão inválida',
      unsupported: 'Expressão não suportada no modo simples',
      operatorLabels: {
        ForgeODataFilterOperator.eq: 'Igual',
        ForgeODataFilterOperator.ne: 'Diferente',
        ForgeODataFilterOperator.contains: 'Contém',
        ForgeODataFilterOperator.startswith: 'Começa com',
        ForgeODataFilterOperator.endswith: 'Termina com',
        ForgeODataFilterOperator.gt: 'Maior',
        ForgeODataFilterOperator.ge: 'Maior ou igual',
        ForgeODataFilterOperator.lt: 'Menor',
        ForgeODataFilterOperator.le: 'Menor ou igual',
        ForgeODataFilterOperator.between: 'Entre',
        ForgeODataFilterOperator.inValues: 'Em'
      });
  Widget field() => const ForgeInput(semanticLabel: 'Conteúdo preservado');
  Widget action() => ForgeButton(
      onPressed: () => event('Ação do consumidor'),
      child: Text(text('actionLabel')));
  Widget grid() {
    final rows = flag('empty') ? <String>[] : ['Beta', 'Alpha', 'Gamma'];
    if (sort != null)
      rows.sort((a, b) => sort!.direction == ForgeSortDirection.ascending
          ? a.compareTo(b)
          : b.compareTo(a));
    return ForgeDataGrid<String>(
        label: text('label'),
        rows: rows,
        getRowKey: (r) => r,
        sort: sort,
        onSortChange: (v) {
          setState(() {
            requests++;
            if (flag('acceptChanges')) sort = v;
          });
        },
        emptyContent: const Text('Nenhum registro'),
        fullWidth: flag('fullWidth'),
        showBorders: flag('showBorders'),
        showColumnLines: flag('showColumnLines'),
        showRowLines: flag('showRowLines'),
        rowAlternationEnabled: flag('rowAlternationEnabled'),
        size: choice('size', ForgeSize.values),
        columns: [
          ForgeDataGridColumn(
              key: 'name',
              header: 'Nome',
              renderCell: Text.new,
              sortable: true,
              sortLabel: 'Ordenar nomes'),
          ForgeDataGridColumn(
              key: 'action',
              header: 'Ação',
              renderCell: (r) => ForgeButton(
                  onPressed: () => event(r), child: const Text('Selecionar')))
        ],
        children: const [
          ForgeDataGridHeader(),
          ForgeDataGridBody(),
          ForgeDataGridFooter(child: Text('Rodapé da tabela'))
        ]);
  }

  Widget treeGrid() => ForgeTreeGrid<String>(
      label: text('label'),
      nodes: [
        ForgeTreeGridNode(
            key: 'parent',
            item: 'Equipe',
            children: [ForgeTreeGridNode(key: 'child', item: 'Pessoa')])
      ],
      getNodeLabel: (r) => r,
      expandedValue: expanded,
      onExpandedValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expanded = v;
        });
      },
      direction: choice('direction', ForgeNavigationDirection.values),
      animated: flag('animated'),
      columns: [
        ForgeTreeGridColumn(key: 'name', header: 'Nome', getCellText: (r) => r),
        ForgeTreeGridColumn(
            key: 'detail',
            header: 'Detalhe',
            getCellText: (r) => r + ' — detalhe')
      ],
      children: const [
        ForgeTreeGridHeader(),
        ForgeTreeGridBody(),
        ForgeTreeGridFooter(child: Text('Rodapé da hierarquia'))
      ]);
  Widget template() {
    final title = Text(text('titleText')),
        body = Column(children: [Text(text('bodyText')), field()]);
    final optional = flag('showSlots');
    return switch (family) {
      'application-layout-template' => SizedBox(
          height: 420,
          child: ForgeApplicationLayoutTemplate(
              header: optional ? title : null,
              navigation: optional ? const Text('Navegação') : null,
              toolbar: optional ? action() : null,
              footer: optional ? const Text('Rodapé') : null,
              mainId: 'forge-demo-main',
              child: body)),
      'showcase-page-template' => ForgeShowcasePageTemplate(
          title: optional ? title : null,
          navigation: optional ? const Text('Catálogo') : null,
          toolbar: optional ? action() : null,
          child: body),
      'home-page' => ForgeHomePageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          quickActions: optional ? action() : null,
          summary: optional ? const Text('Resumo') : null,
          child: body),
      'list-page' => ForgeListPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          filters: optional ? const Text('Filtros') : null,
          pagination: optional ? const Text('Paginação do consumidor') : null,
          child: body),
      'detail-page' => ForgeDetailPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          aside: optional ? const Text('Informações complementares') : null,
          child: body),
      'form-page' => ForgeFormPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          notice: optional ? const Text('Aviso do formulário') : null,
          child: body),
      _ => throw StateError(family)
    };
  }

  Widget transition() => Column(children: [
        ForgeButton(
            onPressed: () => setState(() => screen++),
            child: const Text('Trocar tela')),
        ForgePageTransition(
            screenKey: screen,
            intent: choice('intent', ForgePageTransitionIntent.values),
            animated: flag('animated'),
            child: Text('Tela $screen'))
      ]);
  Widget shared(BuildContext context) => Column(children: [
        ForgeSharedElement(
            name: 'forge-demo-element',
            animated: flag('animated'),
            child: SizedBox(
                width: 240,
                height: 80,
                child: Material(
                    type: MaterialType.transparency,
                    child: Center(child: Text(text('titleText')))))),
        ForgeButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute<void>(
                builder: (context) => Scaffold(
                        body: SafeArea(
                            child: Column(children: [
                      ForgeSharedElement(
                          name: 'forge-demo-element',
                          animated: flag('animated'),
                          child: SizedBox(
                              width: 240,
                              height: 80,
                              child: Material(
                                  type: MaterialType.transparency,
                                  child:
                                      Center(child: Text(text('titleText')))))),
                      ForgeButton(
                          onPressed: () => Navigator.of(context).pop(),
                          child: const Text('Voltar'))
                    ]))))),
            child: const Text('Abrir destino'))
      ]);
  Widget map() => ForgeMapView(
      label: text('label'),
      description:
          'Demonstração esquemática sem navegação nem localização real',
      status: choice('status', ForgeMapViewStatus.values),
      scene: ForgeMapScene(markers: [
        ForgeMapMarker(
            id: 'origin',
            label: 'Origem',
            coordinate:
                const ForgeMapCoordinate(latitude: -23.55, longitude: -46.63),
            kind: ForgeMapMarkerKind.origin)
      ]),
      renderer: const ForgeSchematicMapRenderer(),
      labels: const ForgeMapViewLabelsData(
          loading: 'Carregando mapa',
          empty: 'Sem pontos',
          unavailable: 'Mapa indisponível',
          schematic: 'Mapa esquemático, sem navegação'),
      onRendererError: (e) => event('Falha do renderizador'));
  Widget odata() => ForgeODataFilter(
      mode: choice('mode', ForgeODataFilterMode.values),
      fields: const [amount],
      value: expression,
      onValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expression = v;
        });
      },
      onApply: (v, filter) => event(filter),
      onCancel: () => event('Cancelado'),
      labels: labels,
      disabled: flag('disabled'),
      actionsLayout:
          choice('actionsLayout', ForgeODataFilterActionsLayout.values));
  @override
  Widget build(BuildContext context) =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        switch (family) {
          'data-grid' => grid(),
          'tree-grid' => treeGrid(),
          'page-transition' => transition(),
          'shared-element' => shared(context),
          'map-view' => map(),
          'o-data-filter' => odata(),
          _ => template()
        },
        Text('Solicitações: $requests'),
        if (result.isNotEmpty) Text(result)
      ]);
}

// Canonical parts are created by their native owner, not duplicated focus owners: DataGrid.
const snippetContracts30=<String,Map<String,Map<String,Object?>>>{"data-grid":{"label":{"kind":"text","defaultValue":"Registros","nonblank":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"empty":{"kind":"boolean","defaultValue":false},"fullWidth":{"kind":"boolean","defaultValue":true},"showBorders":{"kind":"boolean","defaultValue":true},"showColumnLines":{"kind":"boolean","defaultValue":false},"showRowLines":{"kind":"boolean","defaultValue":true},"rowAlternationEnabled":{"kind":"boolean","defaultValue":true},"size":{"kind":"select","options":["sm","md","lg"],"defaultValue":"md"}}};
const snippetFamilies30=<String,String>{"data-grid":"data-grid"};
class AdvancedSnippet30 extends StatefulWidget {final String slug='data-grid';final Map<String,Object?> properties=const {"label": "Aspas ' barra \\ dólar \$ e\nnova linha", "acceptChanges": true, "empty": false, "fullWidth": true, "showBorders": true, "showColumnLines": false, "showRowLines": true, "rowAlternationEnabled": true, "size": "md"};const AdvancedSnippet30({super.key});@override State<AdvancedSnippet30> createState()=>_AdvancedSnippetState30();}
class _AdvancedSnippetState30 extends State<AdvancedSnippet30> {
  int requests = 0, screen = 0;
  String result = '';
  ForgeDataGridSort? sort;
  List<String> expanded = [];
  late ForgeODataFilterExpression expression;
  String get family => snippetFamilies30[widget.slug]!;
  Object? prop(String k) =>
      widget.properties[k] ??
      snippetContracts30[widget.slug]?[k]?['defaultValue'];
  String text(String k) => prop(k) as String;
  bool flag(String k) => prop(k) == true;
  T choice<T extends Enum>(String k, List<T> values) =>
      values.firstWhere((v) => v.name == prop(k));
  @override
  void initState() {
    super.initState();
    expanded = flag('expanded') ? ['parent'] : [];
    expression = ForgeODataFilterGroupData(
        id: 'root',
        operator: ForgeODataFilterConjunction.and,
        children: [
          createForgeODataFilterCondition(amount, 'amount-condition')
        ]);
  }

  @override
  void didUpdateWidget(covariant AdvancedSnippet30 old) {
    super.didUpdateWidget(old);
    if (old.properties['expanded'] != widget.properties['expanded'])
      expanded = flag('expanded') ? ['parent'] : [];
  }

  void event(String value) {
    setState(() {
      requests++;
      result = value;
    });
  }

  static const amount = ForgeODataFilterField(
      id: 'amount',
      path: 'Amount',
      label: 'Valor',
      kind: ForgeODataFilterKind.decimal,
      precision: 40,
      scale: 4);
  static const labels = ForgeODataFilterLabels(
      field: 'Campo',
      operator: 'Operador',
      value: 'Valor',
      remove: 'Remover',
      addCondition: 'Adicionar condição',
      addGroup: 'Adicionar grupo',
      group: 'Grupo',
      and: 'E',
      or: 'Ou',
      apply: 'Aplicar',
      clear: 'Limpar',
      cancel: 'Cancelar',
      all: 'Todos',
      yes: 'Sim',
      no: 'Não',
      minimum: 'Mínimo',
      maximum: 'Máximo',
      invalid: 'Expressão inválida',
      unsupported: 'Expressão não suportada no modo simples',
      operatorLabels: {
        ForgeODataFilterOperator.eq: 'Igual',
        ForgeODataFilterOperator.ne: 'Diferente',
        ForgeODataFilterOperator.contains: 'Contém',
        ForgeODataFilterOperator.startswith: 'Começa com',
        ForgeODataFilterOperator.endswith: 'Termina com',
        ForgeODataFilterOperator.gt: 'Maior',
        ForgeODataFilterOperator.ge: 'Maior ou igual',
        ForgeODataFilterOperator.lt: 'Menor',
        ForgeODataFilterOperator.le: 'Menor ou igual',
        ForgeODataFilterOperator.between: 'Entre',
        ForgeODataFilterOperator.inValues: 'Em'
      });
  Widget field() => const ForgeInput(semanticLabel: 'Conteúdo preservado');
  Widget action() => ForgeButton(
      onPressed: () => event('Ação do consumidor'),
      child: Text(text('actionLabel')));
  Widget grid() {
    final rows = flag('empty') ? <String>[] : ['Beta', 'Alpha', 'Gamma'];
    if (sort != null)
      rows.sort((a, b) => sort!.direction == ForgeSortDirection.ascending
          ? a.compareTo(b)
          : b.compareTo(a));
    return ForgeDataGrid<String>(
        label: text('label'),
        rows: rows,
        getRowKey: (r) => r,
        sort: sort,
        onSortChange: (v) {
          setState(() {
            requests++;
            if (flag('acceptChanges')) sort = v;
          });
        },
        emptyContent: const Text('Nenhum registro'),
        fullWidth: flag('fullWidth'),
        showBorders: flag('showBorders'),
        showColumnLines: flag('showColumnLines'),
        showRowLines: flag('showRowLines'),
        rowAlternationEnabled: flag('rowAlternationEnabled'),
        size: choice('size', ForgeSize.values),
        columns: [
          ForgeDataGridColumn(
              key: 'name',
              header: 'Nome',
              renderCell: Text.new,
              sortable: true,
              sortLabel: 'Ordenar nomes'),
          ForgeDataGridColumn(
              key: 'action',
              header: 'Ação',
              renderCell: (r) => ForgeButton(
                  onPressed: () => event(r), child: const Text('Selecionar')))
        ],
        children: const [
          ForgeDataGridHeader(),
          ForgeDataGridBody(),
          ForgeDataGridFooter(child: Text('Rodapé da tabela'))
        ]);
  }

  Widget treeGrid() => ForgeTreeGrid<String>(
      label: text('label'),
      nodes: [
        ForgeTreeGridNode(
            key: 'parent',
            item: 'Equipe',
            children: [ForgeTreeGridNode(key: 'child', item: 'Pessoa')])
      ],
      getNodeLabel: (r) => r,
      expandedValue: expanded,
      onExpandedValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expanded = v;
        });
      },
      direction: choice('direction', ForgeNavigationDirection.values),
      animated: flag('animated'),
      columns: [
        ForgeTreeGridColumn(key: 'name', header: 'Nome', getCellText: (r) => r),
        ForgeTreeGridColumn(
            key: 'detail',
            header: 'Detalhe',
            getCellText: (r) => r + ' — detalhe')
      ],
      children: const [
        ForgeTreeGridHeader(),
        ForgeTreeGridBody(),
        ForgeTreeGridFooter(child: Text('Rodapé da hierarquia'))
      ]);
  Widget template() {
    final title = Text(text('titleText')),
        body = Column(children: [Text(text('bodyText')), field()]);
    final optional = flag('showSlots');
    return switch (family) {
      'application-layout-template' => SizedBox(
          height: 420,
          child: ForgeApplicationLayoutTemplate(
              header: optional ? title : null,
              navigation: optional ? const Text('Navegação') : null,
              toolbar: optional ? action() : null,
              footer: optional ? const Text('Rodapé') : null,
              mainId: 'forge-demo-main',
              child: body)),
      'showcase-page-template' => ForgeShowcasePageTemplate(
          title: optional ? title : null,
          navigation: optional ? const Text('Catálogo') : null,
          toolbar: optional ? action() : null,
          child: body),
      'home-page' => ForgeHomePageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          quickActions: optional ? action() : null,
          summary: optional ? const Text('Resumo') : null,
          child: body),
      'list-page' => ForgeListPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          filters: optional ? const Text('Filtros') : null,
          pagination: optional ? const Text('Paginação do consumidor') : null,
          child: body),
      'detail-page' => ForgeDetailPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          aside: optional ? const Text('Informações complementares') : null,
          child: body),
      'form-page' => ForgeFormPageTemplate(
          titleId: 'forge-demo-title',
          pageTitle: title,
          notice: optional ? const Text('Aviso do formulário') : null,
          child: body),
      _ => throw StateError(family)
    };
  }

  Widget transition() => Column(children: [
        ForgeButton(
            onPressed: () => setState(() => screen++),
            child: const Text('Trocar tela')),
        ForgePageTransition(
            screenKey: screen,
            intent: choice('intent', ForgePageTransitionIntent.values),
            animated: flag('animated'),
            child: Text('Tela $screen'))
      ]);
  Widget shared(BuildContext context) => Column(children: [
        ForgeSharedElement(
            name: 'forge-demo-element',
            animated: flag('animated'),
            child: SizedBox(
                width: 240,
                height: 80,
                child: Material(
                    type: MaterialType.transparency,
                    child: Center(child: Text(text('titleText')))))),
        ForgeButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute<void>(
                builder: (context) => Scaffold(
                        body: SafeArea(
                            child: Column(children: [
                      ForgeSharedElement(
                          name: 'forge-demo-element',
                          animated: flag('animated'),
                          child: SizedBox(
                              width: 240,
                              height: 80,
                              child: Material(
                                  type: MaterialType.transparency,
                                  child:
                                      Center(child: Text(text('titleText')))))),
                      ForgeButton(
                          onPressed: () => Navigator.of(context).pop(),
                          child: const Text('Voltar'))
                    ]))))),
            child: const Text('Abrir destino'))
      ]);
  Widget map() => ForgeMapView(
      label: text('label'),
      description:
          'Demonstração esquemática sem navegação nem localização real',
      status: choice('status', ForgeMapViewStatus.values),
      scene: ForgeMapScene(markers: [
        ForgeMapMarker(
            id: 'origin',
            label: 'Origem',
            coordinate:
                const ForgeMapCoordinate(latitude: -23.55, longitude: -46.63),
            kind: ForgeMapMarkerKind.origin)
      ]),
      renderer: const ForgeSchematicMapRenderer(),
      labels: const ForgeMapViewLabelsData(
          loading: 'Carregando mapa',
          empty: 'Sem pontos',
          unavailable: 'Mapa indisponível',
          schematic: 'Mapa esquemático, sem navegação'),
      onRendererError: (e) => event('Falha do renderizador'));
  Widget odata() => ForgeODataFilter(
      mode: choice('mode', ForgeODataFilterMode.values),
      fields: const [amount],
      value: expression,
      onValueChange: (v) {
        setState(() {
          requests++;
          if (flag('acceptChanges')) expression = v;
        });
      },
      onApply: (v, filter) => event(filter),
      onCancel: () => event('Cancelado'),
      labels: labels,
      disabled: flag('disabled'),
      actionsLayout:
          choice('actionsLayout', ForgeODataFilterActionsLayout.values));
  @override
  Widget build(BuildContext context) =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        switch (family) {
          'data-grid' => grid(),
          'tree-grid' => treeGrid(),
          'page-transition' => transition(),
          'shared-element' => shared(context),
          'map-view' => map(),
          'o-data-filter' => odata(),
          _ => template()
        },
        Text('Solicitações: $requests'),
        if (result.isNotEmpty) Text(result)
      ]);
}

Widget host(Widget child)=>MaterialApp(theme:ForgeThemeData.light(),home:Scaffold(body:SingleChildScrollView(child:SizedBox(width:320,child:child))));
void main(){
testWidgets('copyable interaction data-grid 0',(t)async{await t.pumpWidget(host(const AdvancedSnippet0()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction data-grid-header 1',(t)async{await t.pumpWidget(host(const AdvancedSnippet1()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction data-grid-body 2',(t)async{await t.pumpWidget(host(const AdvancedSnippet2()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction data-grid-row 3',(t)async{await t.pumpWidget(host(const AdvancedSnippet3()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction data-grid-column-header 4',(t)async{await t.pumpWidget(host(const AdvancedSnippet4()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction data-grid-cell 5',(t)async{await t.pumpWidget(host(const AdvancedSnippet5()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction data-grid-footer 6',(t)async{await t.pumpWidget(host(const AdvancedSnippet6()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction tree-grid 7',(t)async{await t.pumpWidget(host(const AdvancedSnippet7()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction tree-grid-header 8',(t)async{await t.pumpWidget(host(const AdvancedSnippet8()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction tree-grid-body 9',(t)async{await t.pumpWidget(host(const AdvancedSnippet9()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction tree-grid-row 10',(t)async{await t.pumpWidget(host(const AdvancedSnippet10()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction tree-grid-column-header 11',(t)async{await t.pumpWidget(host(const AdvancedSnippet11()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction tree-grid-cell 12',(t)async{await t.pumpWidget(host(const AdvancedSnippet12()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction tree-grid-footer 13',(t)async{await t.pumpWidget(host(const AdvancedSnippet13()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction application-layout-template 14',(t)async{await t.pumpWidget(host(const AdvancedSnippet14()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction application-layout-header 15',(t)async{await t.pumpWidget(host(const AdvancedSnippet15()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction application-layout-body 16',(t)async{await t.pumpWidget(host(const AdvancedSnippet16()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction application-layout-footer 17',(t)async{await t.pumpWidget(host(const AdvancedSnippet17()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction showcase-page-template 18',(t)async{await t.pumpWidget(host(const AdvancedSnippet18()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction home-page 19',(t)async{await t.pumpWidget(host(const AdvancedSnippet19()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction list-page 20',(t)async{await t.pumpWidget(host(const AdvancedSnippet20()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction detail-page 21',(t)async{await t.pumpWidget(host(const AdvancedSnippet21()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction form-page 22',(t)async{await t.pumpWidget(host(const AdvancedSnippet22()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction page-transition 23',(t)async{await t.pumpWidget(host(const AdvancedSnippet23()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction shared-element 24',(t)async{await t.pumpWidget(host(const AdvancedSnippet24()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction map-view 25',(t)async{await t.pumpWidget(host(const AdvancedSnippet25()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction odata-filter 26',(t)async{await t.pumpWidget(host(const AdvancedSnippet26()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction odata-filter-condition 27',(t)async{await t.pumpWidget(host(const AdvancedSnippet27()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction odata-filter-group 28',(t)async{await t.pumpWidget(host(const AdvancedSnippet28()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction odata-filter-value 29',(t)async{await t.pumpWidget(host(const AdvancedSnippet29()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction data-grid 30',(t)async{await t.pumpWidget(host(const AdvancedSnippet30()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
}
