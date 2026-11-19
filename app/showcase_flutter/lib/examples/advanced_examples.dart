import 'package:flutter/material.dart';
import 'package:forge_ui/forge_ui.dart';
import 'advanced_contracts.dart';

class ForgeAdvancedExample extends StatefulWidget {
  final String slug;
  final Map<String, Object?> properties;
  const ForgeAdvancedExample(
      {super.key, required this.slug, this.properties = const {}});
  @override
  State<ForgeAdvancedExample> createState() => _AdvancedState();
}

class _AdvancedState extends State<ForgeAdvancedExample> {
  int requests = 0, screen = 0;
  String result = '';
  ForgeDataGridSort? sort;
  List<String> expanded = [];
  late ForgeODataFilterExpression expression;
  String get family => advancedFamilies[widget.slug]!;
  Object? prop(String k) =>
      widget.properties[k] ??
      advancedContracts[widget.slug]?[k]?['defaultValue'];
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
  void didUpdateWidget(covariant ForgeAdvancedExample old) {
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
