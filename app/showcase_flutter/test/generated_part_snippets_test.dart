// Generated from actual copyable native interaction snippets.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';
// CardHeader is demonstrated inside its canonical owner. Data-driven owners create their public items.
const snippetContracts0=<String,Map<String,Map<String,Object?>>>{"card-header":{"label":{"kind":"text","defaultValue":"Exemplo de composição","nonblank":true},"titleText":{"kind":"text","defaultValue":"Título","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Executar","nonblank":true}}};
const snippetFamilies0=<String,String>{"card-header":"card"};
class PartSnippet0 extends StatefulWidget{final String slug='card-header';final Map<String,Object?> properties=const {"label": "Exemplo de composição", "titleText": "Título", "bodyText": "Conteúdo", "actionLabel": "Executar"};const PartSnippet0({super.key});@override State<PartSnippet0> createState()=>_PartSnippetState0();}
class _PartSnippetState0 extends State<PartSnippet0> {
  int actions = 0, page = 5;
  bool removed = false;
  String get family => snippetFamilies0[widget.slug]!;
  String text(String k) =>
      (widget.properties[k] ?? snippetContracts0[widget.slug]?[k]?['defaultValue'])
          as String;
  void act() {
    setState(() => actions++);
  }

  Widget action() =>
      ForgeButton(onPressed: act, child: Text(text('actionLabel')));
  Widget composition() => switch (family) {
        'card' => ForgeCard(children: [
            ForgeCardHeader(child: Text(text('titleText'))),
            ForgeCardBody(child: Text(text('bodyText'))),
            ForgeCardFooter(child: action())
          ]),
        'alert' => ForgeAlert(children: [
            ForgeAlertHeader(child: Text(text('titleText'))),
            ForgeAlertBody(child: Text(text('bodyText'))),
            ForgeAlertFooter(child: action())
          ]),
        'empty-state' => ForgeEmptyState(children: [
            ForgeEmptyStateHeader(child: Text(text('titleText'))),
            ForgeEmptyStateBody(child: Text(text('bodyText'))),
            ForgeEmptyStateFooter(child: action())
          ]),
        'error-state' => ForgeErrorState(children: [
            ForgeErrorStateHeader(child: Text(text('titleText'))),
            ForgeErrorStateBody(child: Text(text('bodyText'))),
            ForgeErrorStateFooter(child: action())
          ]),
        'loading-state' => ForgeLoadingState(label: text('label'), children: [
            ForgeLoadingStateHeader(child: Text(text('titleText'))),
            ForgeLoadingStateBody(child: Text(text('bodyText'))),
            ForgeLoadingStateFooter(child: action())
          ]),
        'breadcrumb' => ForgeBreadcrumb(label: text('label'), children: [
            ForgeBreadcrumbItem(
                href: '/catalog',
                onActivate: act,
                child: Text(text('actionLabel'))),
            ForgeBreadcrumbItem(current: true, child: Text(text('titleText')))
          ]),
        'pagination' => ForgePagination(
              label: text('label'),
              page: page,
              pageCount: 9,
              onPageChange: (p) => setState(() {
                    page = p;
                    actions++;
                  }),
              children: [
                const ForgePaginationItem(page: 1, label: 'Página 1'),
                if (page > 2) const ForgePaginationEllipsis(),
                if (page > 1 && page < 9)
                  ForgePaginationItem(page: page, label: 'Página $page'),
                if (page < 8) const ForgePaginationEllipsis(),
                const ForgePaginationItem(page: 9, label: 'Página 9')
              ]),
        'tag-group' => Column(children: [
            ForgeTagGroup(label: text('label'), items: [
              if (!removed)
                ForgeTagGroupEntry(
                    id: 'forge',
                    tag: ForgeTagConfiguration(
                        text: text('titleText'),
                        removeLabel: text('actionLabel'),
                        onRemove: () => setState(() {
                              removed = true;
                              actions++;
                            })))
            ]),
            if (removed)
              ForgeButton(
                  onPressed: () => setState(() => removed = false),
                  child: const Text('Restaurar tag'))
          ]),
        _ => throw StateError(family)
      };
  @override
  Widget build(BuildContext context) => Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [composition(), Text('Ações: $actions')]);
}

// CardBody is demonstrated inside its canonical owner. Data-driven owners create their public items.
const snippetContracts1=<String,Map<String,Map<String,Object?>>>{"card-body":{"label":{"kind":"text","defaultValue":"Exemplo de composição","nonblank":true},"titleText":{"kind":"text","defaultValue":"Título","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Executar","nonblank":true}}};
const snippetFamilies1=<String,String>{"card-body":"card"};
class PartSnippet1 extends StatefulWidget{final String slug='card-body';final Map<String,Object?> properties=const {"label": "Exemplo de composição", "titleText": "Título", "bodyText": "Conteúdo", "actionLabel": "Executar"};const PartSnippet1({super.key});@override State<PartSnippet1> createState()=>_PartSnippetState1();}
class _PartSnippetState1 extends State<PartSnippet1> {
  int actions = 0, page = 5;
  bool removed = false;
  String get family => snippetFamilies1[widget.slug]!;
  String text(String k) =>
      (widget.properties[k] ?? snippetContracts1[widget.slug]?[k]?['defaultValue'])
          as String;
  void act() {
    setState(() => actions++);
  }

  Widget action() =>
      ForgeButton(onPressed: act, child: Text(text('actionLabel')));
  Widget composition() => switch (family) {
        'card' => ForgeCard(children: [
            ForgeCardHeader(child: Text(text('titleText'))),
            ForgeCardBody(child: Text(text('bodyText'))),
            ForgeCardFooter(child: action())
          ]),
        'alert' => ForgeAlert(children: [
            ForgeAlertHeader(child: Text(text('titleText'))),
            ForgeAlertBody(child: Text(text('bodyText'))),
            ForgeAlertFooter(child: action())
          ]),
        'empty-state' => ForgeEmptyState(children: [
            ForgeEmptyStateHeader(child: Text(text('titleText'))),
            ForgeEmptyStateBody(child: Text(text('bodyText'))),
            ForgeEmptyStateFooter(child: action())
          ]),
        'error-state' => ForgeErrorState(children: [
            ForgeErrorStateHeader(child: Text(text('titleText'))),
            ForgeErrorStateBody(child: Text(text('bodyText'))),
            ForgeErrorStateFooter(child: action())
          ]),
        'loading-state' => ForgeLoadingState(label: text('label'), children: [
            ForgeLoadingStateHeader(child: Text(text('titleText'))),
            ForgeLoadingStateBody(child: Text(text('bodyText'))),
            ForgeLoadingStateFooter(child: action())
          ]),
        'breadcrumb' => ForgeBreadcrumb(label: text('label'), children: [
            ForgeBreadcrumbItem(
                href: '/catalog',
                onActivate: act,
                child: Text(text('actionLabel'))),
            ForgeBreadcrumbItem(current: true, child: Text(text('titleText')))
          ]),
        'pagination' => ForgePagination(
              label: text('label'),
              page: page,
              pageCount: 9,
              onPageChange: (p) => setState(() {
                    page = p;
                    actions++;
                  }),
              children: [
                const ForgePaginationItem(page: 1, label: 'Página 1'),
                if (page > 2) const ForgePaginationEllipsis(),
                if (page > 1 && page < 9)
                  ForgePaginationItem(page: page, label: 'Página $page'),
                if (page < 8) const ForgePaginationEllipsis(),
                const ForgePaginationItem(page: 9, label: 'Página 9')
              ]),
        'tag-group' => Column(children: [
            ForgeTagGroup(label: text('label'), items: [
              if (!removed)
                ForgeTagGroupEntry(
                    id: 'forge',
                    tag: ForgeTagConfiguration(
                        text: text('titleText'),
                        removeLabel: text('actionLabel'),
                        onRemove: () => setState(() {
                              removed = true;
                              actions++;
                            })))
            ]),
            if (removed)
              ForgeButton(
                  onPressed: () => setState(() => removed = false),
                  child: const Text('Restaurar tag'))
          ]),
        _ => throw StateError(family)
      };
  @override
  Widget build(BuildContext context) => Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [composition(), Text('Ações: $actions')]);
}

// CardFooter is demonstrated inside its canonical owner. Data-driven owners create their public items.
const snippetContracts2=<String,Map<String,Map<String,Object?>>>{"card-footer":{"label":{"kind":"text","defaultValue":"Exemplo de composição","nonblank":true},"titleText":{"kind":"text","defaultValue":"Título","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Executar","nonblank":true}}};
const snippetFamilies2=<String,String>{"card-footer":"card"};
class PartSnippet2 extends StatefulWidget{final String slug='card-footer';final Map<String,Object?> properties=const {"label": "Exemplo de composição", "titleText": "Título", "bodyText": "Conteúdo", "actionLabel": "Executar"};const PartSnippet2({super.key});@override State<PartSnippet2> createState()=>_PartSnippetState2();}
class _PartSnippetState2 extends State<PartSnippet2> {
  int actions = 0, page = 5;
  bool removed = false;
  String get family => snippetFamilies2[widget.slug]!;
  String text(String k) =>
      (widget.properties[k] ?? snippetContracts2[widget.slug]?[k]?['defaultValue'])
          as String;
  void act() {
    setState(() => actions++);
  }

  Widget action() =>
      ForgeButton(onPressed: act, child: Text(text('actionLabel')));
  Widget composition() => switch (family) {
        'card' => ForgeCard(children: [
            ForgeCardHeader(child: Text(text('titleText'))),
            ForgeCardBody(child: Text(text('bodyText'))),
            ForgeCardFooter(child: action())
          ]),
        'alert' => ForgeAlert(children: [
            ForgeAlertHeader(child: Text(text('titleText'))),
            ForgeAlertBody(child: Text(text('bodyText'))),
            ForgeAlertFooter(child: action())
          ]),
        'empty-state' => ForgeEmptyState(children: [
            ForgeEmptyStateHeader(child: Text(text('titleText'))),
            ForgeEmptyStateBody(child: Text(text('bodyText'))),
            ForgeEmptyStateFooter(child: action())
          ]),
        'error-state' => ForgeErrorState(children: [
            ForgeErrorStateHeader(child: Text(text('titleText'))),
            ForgeErrorStateBody(child: Text(text('bodyText'))),
            ForgeErrorStateFooter(child: action())
          ]),
        'loading-state' => ForgeLoadingState(label: text('label'), children: [
            ForgeLoadingStateHeader(child: Text(text('titleText'))),
            ForgeLoadingStateBody(child: Text(text('bodyText'))),
            ForgeLoadingStateFooter(child: action())
          ]),
        'breadcrumb' => ForgeBreadcrumb(label: text('label'), children: [
            ForgeBreadcrumbItem(
                href: '/catalog',
                onActivate: act,
                child: Text(text('actionLabel'))),
            ForgeBreadcrumbItem(current: true, child: Text(text('titleText')))
          ]),
        'pagination' => ForgePagination(
              label: text('label'),
              page: page,
              pageCount: 9,
              onPageChange: (p) => setState(() {
                    page = p;
                    actions++;
                  }),
              children: [
                const ForgePaginationItem(page: 1, label: 'Página 1'),
                if (page > 2) const ForgePaginationEllipsis(),
                if (page > 1 && page < 9)
                  ForgePaginationItem(page: page, label: 'Página $page'),
                if (page < 8) const ForgePaginationEllipsis(),
                const ForgePaginationItem(page: 9, label: 'Página 9')
              ]),
        'tag-group' => Column(children: [
            ForgeTagGroup(label: text('label'), items: [
              if (!removed)
                ForgeTagGroupEntry(
                    id: 'forge',
                    tag: ForgeTagConfiguration(
                        text: text('titleText'),
                        removeLabel: text('actionLabel'),
                        onRemove: () => setState(() {
                              removed = true;
                              actions++;
                            })))
            ]),
            if (removed)
              ForgeButton(
                  onPressed: () => setState(() => removed = false),
                  child: const Text('Restaurar tag'))
          ]),
        _ => throw StateError(family)
      };
  @override
  Widget build(BuildContext context) => Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [composition(), Text('Ações: $actions')]);
}

// AlertHeader is demonstrated inside its canonical owner. Data-driven owners create their public items.
const snippetContracts3=<String,Map<String,Map<String,Object?>>>{"alert-header":{"label":{"kind":"text","defaultValue":"Exemplo de composição","nonblank":true},"titleText":{"kind":"text","defaultValue":"Título","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Executar","nonblank":true}}};
const snippetFamilies3=<String,String>{"alert-header":"alert"};
class PartSnippet3 extends StatefulWidget{final String slug='alert-header';final Map<String,Object?> properties=const {"label": "Exemplo de composição", "titleText": "Título", "bodyText": "Conteúdo", "actionLabel": "Executar"};const PartSnippet3({super.key});@override State<PartSnippet3> createState()=>_PartSnippetState3();}
class _PartSnippetState3 extends State<PartSnippet3> {
  int actions = 0, page = 5;
  bool removed = false;
  String get family => snippetFamilies3[widget.slug]!;
  String text(String k) =>
      (widget.properties[k] ?? snippetContracts3[widget.slug]?[k]?['defaultValue'])
          as String;
  void act() {
    setState(() => actions++);
  }

  Widget action() =>
      ForgeButton(onPressed: act, child: Text(text('actionLabel')));
  Widget composition() => switch (family) {
        'card' => ForgeCard(children: [
            ForgeCardHeader(child: Text(text('titleText'))),
            ForgeCardBody(child: Text(text('bodyText'))),
            ForgeCardFooter(child: action())
          ]),
        'alert' => ForgeAlert(children: [
            ForgeAlertHeader(child: Text(text('titleText'))),
            ForgeAlertBody(child: Text(text('bodyText'))),
            ForgeAlertFooter(child: action())
          ]),
        'empty-state' => ForgeEmptyState(children: [
            ForgeEmptyStateHeader(child: Text(text('titleText'))),
            ForgeEmptyStateBody(child: Text(text('bodyText'))),
            ForgeEmptyStateFooter(child: action())
          ]),
        'error-state' => ForgeErrorState(children: [
            ForgeErrorStateHeader(child: Text(text('titleText'))),
            ForgeErrorStateBody(child: Text(text('bodyText'))),
            ForgeErrorStateFooter(child: action())
          ]),
        'loading-state' => ForgeLoadingState(label: text('label'), children: [
            ForgeLoadingStateHeader(child: Text(text('titleText'))),
            ForgeLoadingStateBody(child: Text(text('bodyText'))),
            ForgeLoadingStateFooter(child: action())
          ]),
        'breadcrumb' => ForgeBreadcrumb(label: text('label'), children: [
            ForgeBreadcrumbItem(
                href: '/catalog',
                onActivate: act,
                child: Text(text('actionLabel'))),
            ForgeBreadcrumbItem(current: true, child: Text(text('titleText')))
          ]),
        'pagination' => ForgePagination(
              label: text('label'),
              page: page,
              pageCount: 9,
              onPageChange: (p) => setState(() {
                    page = p;
                    actions++;
                  }),
              children: [
                const ForgePaginationItem(page: 1, label: 'Página 1'),
                if (page > 2) const ForgePaginationEllipsis(),
                if (page > 1 && page < 9)
                  ForgePaginationItem(page: page, label: 'Página $page'),
                if (page < 8) const ForgePaginationEllipsis(),
                const ForgePaginationItem(page: 9, label: 'Página 9')
              ]),
        'tag-group' => Column(children: [
            ForgeTagGroup(label: text('label'), items: [
              if (!removed)
                ForgeTagGroupEntry(
                    id: 'forge',
                    tag: ForgeTagConfiguration(
                        text: text('titleText'),
                        removeLabel: text('actionLabel'),
                        onRemove: () => setState(() {
                              removed = true;
                              actions++;
                            })))
            ]),
            if (removed)
              ForgeButton(
                  onPressed: () => setState(() => removed = false),
                  child: const Text('Restaurar tag'))
          ]),
        _ => throw StateError(family)
      };
  @override
  Widget build(BuildContext context) => Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [composition(), Text('Ações: $actions')]);
}

// AlertBody is demonstrated inside its canonical owner. Data-driven owners create their public items.
const snippetContracts4=<String,Map<String,Map<String,Object?>>>{"alert-body":{"label":{"kind":"text","defaultValue":"Exemplo de composição","nonblank":true},"titleText":{"kind":"text","defaultValue":"Título","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Executar","nonblank":true}}};
const snippetFamilies4=<String,String>{"alert-body":"alert"};
class PartSnippet4 extends StatefulWidget{final String slug='alert-body';final Map<String,Object?> properties=const {"label": "Exemplo de composição", "titleText": "Título", "bodyText": "Conteúdo", "actionLabel": "Executar"};const PartSnippet4({super.key});@override State<PartSnippet4> createState()=>_PartSnippetState4();}
class _PartSnippetState4 extends State<PartSnippet4> {
  int actions = 0, page = 5;
  bool removed = false;
  String get family => snippetFamilies4[widget.slug]!;
  String text(String k) =>
      (widget.properties[k] ?? snippetContracts4[widget.slug]?[k]?['defaultValue'])
          as String;
  void act() {
    setState(() => actions++);
  }

  Widget action() =>
      ForgeButton(onPressed: act, child: Text(text('actionLabel')));
  Widget composition() => switch (family) {
        'card' => ForgeCard(children: [
            ForgeCardHeader(child: Text(text('titleText'))),
            ForgeCardBody(child: Text(text('bodyText'))),
            ForgeCardFooter(child: action())
          ]),
        'alert' => ForgeAlert(children: [
            ForgeAlertHeader(child: Text(text('titleText'))),
            ForgeAlertBody(child: Text(text('bodyText'))),
            ForgeAlertFooter(child: action())
          ]),
        'empty-state' => ForgeEmptyState(children: [
            ForgeEmptyStateHeader(child: Text(text('titleText'))),
            ForgeEmptyStateBody(child: Text(text('bodyText'))),
            ForgeEmptyStateFooter(child: action())
          ]),
        'error-state' => ForgeErrorState(children: [
            ForgeErrorStateHeader(child: Text(text('titleText'))),
            ForgeErrorStateBody(child: Text(text('bodyText'))),
            ForgeErrorStateFooter(child: action())
          ]),
        'loading-state' => ForgeLoadingState(label: text('label'), children: [
            ForgeLoadingStateHeader(child: Text(text('titleText'))),
            ForgeLoadingStateBody(child: Text(text('bodyText'))),
            ForgeLoadingStateFooter(child: action())
          ]),
        'breadcrumb' => ForgeBreadcrumb(label: text('label'), children: [
            ForgeBreadcrumbItem(
                href: '/catalog',
                onActivate: act,
                child: Text(text('actionLabel'))),
            ForgeBreadcrumbItem(current: true, child: Text(text('titleText')))
          ]),
        'pagination' => ForgePagination(
              label: text('label'),
              page: page,
              pageCount: 9,
              onPageChange: (p) => setState(() {
                    page = p;
                    actions++;
                  }),
              children: [
                const ForgePaginationItem(page: 1, label: 'Página 1'),
                if (page > 2) const ForgePaginationEllipsis(),
                if (page > 1 && page < 9)
                  ForgePaginationItem(page: page, label: 'Página $page'),
                if (page < 8) const ForgePaginationEllipsis(),
                const ForgePaginationItem(page: 9, label: 'Página 9')
              ]),
        'tag-group' => Column(children: [
            ForgeTagGroup(label: text('label'), items: [
              if (!removed)
                ForgeTagGroupEntry(
                    id: 'forge',
                    tag: ForgeTagConfiguration(
                        text: text('titleText'),
                        removeLabel: text('actionLabel'),
                        onRemove: () => setState(() {
                              removed = true;
                              actions++;
                            })))
            ]),
            if (removed)
              ForgeButton(
                  onPressed: () => setState(() => removed = false),
                  child: const Text('Restaurar tag'))
          ]),
        _ => throw StateError(family)
      };
  @override
  Widget build(BuildContext context) => Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [composition(), Text('Ações: $actions')]);
}

// AlertFooter is demonstrated inside its canonical owner. Data-driven owners create their public items.
const snippetContracts5=<String,Map<String,Map<String,Object?>>>{"alert-footer":{"label":{"kind":"text","defaultValue":"Exemplo de composição","nonblank":true},"titleText":{"kind":"text","defaultValue":"Título","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Executar","nonblank":true}}};
const snippetFamilies5=<String,String>{"alert-footer":"alert"};
class PartSnippet5 extends StatefulWidget{final String slug='alert-footer';final Map<String,Object?> properties=const {"label": "Exemplo de composição", "titleText": "Título", "bodyText": "Conteúdo", "actionLabel": "Executar"};const PartSnippet5({super.key});@override State<PartSnippet5> createState()=>_PartSnippetState5();}
class _PartSnippetState5 extends State<PartSnippet5> {
  int actions = 0, page = 5;
  bool removed = false;
  String get family => snippetFamilies5[widget.slug]!;
  String text(String k) =>
      (widget.properties[k] ?? snippetContracts5[widget.slug]?[k]?['defaultValue'])
          as String;
  void act() {
    setState(() => actions++);
  }

  Widget action() =>
      ForgeButton(onPressed: act, child: Text(text('actionLabel')));
  Widget composition() => switch (family) {
        'card' => ForgeCard(children: [
            ForgeCardHeader(child: Text(text('titleText'))),
            ForgeCardBody(child: Text(text('bodyText'))),
            ForgeCardFooter(child: action())
          ]),
        'alert' => ForgeAlert(children: [
            ForgeAlertHeader(child: Text(text('titleText'))),
            ForgeAlertBody(child: Text(text('bodyText'))),
            ForgeAlertFooter(child: action())
          ]),
        'empty-state' => ForgeEmptyState(children: [
            ForgeEmptyStateHeader(child: Text(text('titleText'))),
            ForgeEmptyStateBody(child: Text(text('bodyText'))),
            ForgeEmptyStateFooter(child: action())
          ]),
        'error-state' => ForgeErrorState(children: [
            ForgeErrorStateHeader(child: Text(text('titleText'))),
            ForgeErrorStateBody(child: Text(text('bodyText'))),
            ForgeErrorStateFooter(child: action())
          ]),
        'loading-state' => ForgeLoadingState(label: text('label'), children: [
            ForgeLoadingStateHeader(child: Text(text('titleText'))),
            ForgeLoadingStateBody(child: Text(text('bodyText'))),
            ForgeLoadingStateFooter(child: action())
          ]),
        'breadcrumb' => ForgeBreadcrumb(label: text('label'), children: [
            ForgeBreadcrumbItem(
                href: '/catalog',
                onActivate: act,
                child: Text(text('actionLabel'))),
            ForgeBreadcrumbItem(current: true, child: Text(text('titleText')))
          ]),
        'pagination' => ForgePagination(
              label: text('label'),
              page: page,
              pageCount: 9,
              onPageChange: (p) => setState(() {
                    page = p;
                    actions++;
                  }),
              children: [
                const ForgePaginationItem(page: 1, label: 'Página 1'),
                if (page > 2) const ForgePaginationEllipsis(),
                if (page > 1 && page < 9)
                  ForgePaginationItem(page: page, label: 'Página $page'),
                if (page < 8) const ForgePaginationEllipsis(),
                const ForgePaginationItem(page: 9, label: 'Página 9')
              ]),
        'tag-group' => Column(children: [
            ForgeTagGroup(label: text('label'), items: [
              if (!removed)
                ForgeTagGroupEntry(
                    id: 'forge',
                    tag: ForgeTagConfiguration(
                        text: text('titleText'),
                        removeLabel: text('actionLabel'),
                        onRemove: () => setState(() {
                              removed = true;
                              actions++;
                            })))
            ]),
            if (removed)
              ForgeButton(
                  onPressed: () => setState(() => removed = false),
                  child: const Text('Restaurar tag'))
          ]),
        _ => throw StateError(family)
      };
  @override
  Widget build(BuildContext context) => Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [composition(), Text('Ações: $actions')]);
}

// EmptyStateHeader is demonstrated inside its canonical owner. Data-driven owners create their public items.
const snippetContracts6=<String,Map<String,Map<String,Object?>>>{"empty-state-header":{"label":{"kind":"text","defaultValue":"Exemplo de composição","nonblank":true},"titleText":{"kind":"text","defaultValue":"Título","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Executar","nonblank":true}}};
const snippetFamilies6=<String,String>{"empty-state-header":"empty-state"};
class PartSnippet6 extends StatefulWidget{final String slug='empty-state-header';final Map<String,Object?> properties=const {"label": "Exemplo de composição", "titleText": "Título", "bodyText": "Conteúdo", "actionLabel": "Executar"};const PartSnippet6({super.key});@override State<PartSnippet6> createState()=>_PartSnippetState6();}
class _PartSnippetState6 extends State<PartSnippet6> {
  int actions = 0, page = 5;
  bool removed = false;
  String get family => snippetFamilies6[widget.slug]!;
  String text(String k) =>
      (widget.properties[k] ?? snippetContracts6[widget.slug]?[k]?['defaultValue'])
          as String;
  void act() {
    setState(() => actions++);
  }

  Widget action() =>
      ForgeButton(onPressed: act, child: Text(text('actionLabel')));
  Widget composition() => switch (family) {
        'card' => ForgeCard(children: [
            ForgeCardHeader(child: Text(text('titleText'))),
            ForgeCardBody(child: Text(text('bodyText'))),
            ForgeCardFooter(child: action())
          ]),
        'alert' => ForgeAlert(children: [
            ForgeAlertHeader(child: Text(text('titleText'))),
            ForgeAlertBody(child: Text(text('bodyText'))),
            ForgeAlertFooter(child: action())
          ]),
        'empty-state' => ForgeEmptyState(children: [
            ForgeEmptyStateHeader(child: Text(text('titleText'))),
            ForgeEmptyStateBody(child: Text(text('bodyText'))),
            ForgeEmptyStateFooter(child: action())
          ]),
        'error-state' => ForgeErrorState(children: [
            ForgeErrorStateHeader(child: Text(text('titleText'))),
            ForgeErrorStateBody(child: Text(text('bodyText'))),
            ForgeErrorStateFooter(child: action())
          ]),
        'loading-state' => ForgeLoadingState(label: text('label'), children: [
            ForgeLoadingStateHeader(child: Text(text('titleText'))),
            ForgeLoadingStateBody(child: Text(text('bodyText'))),
            ForgeLoadingStateFooter(child: action())
          ]),
        'breadcrumb' => ForgeBreadcrumb(label: text('label'), children: [
            ForgeBreadcrumbItem(
                href: '/catalog',
                onActivate: act,
                child: Text(text('actionLabel'))),
            ForgeBreadcrumbItem(current: true, child: Text(text('titleText')))
          ]),
        'pagination' => ForgePagination(
              label: text('label'),
              page: page,
              pageCount: 9,
              onPageChange: (p) => setState(() {
                    page = p;
                    actions++;
                  }),
              children: [
                const ForgePaginationItem(page: 1, label: 'Página 1'),
                if (page > 2) const ForgePaginationEllipsis(),
                if (page > 1 && page < 9)
                  ForgePaginationItem(page: page, label: 'Página $page'),
                if (page < 8) const ForgePaginationEllipsis(),
                const ForgePaginationItem(page: 9, label: 'Página 9')
              ]),
        'tag-group' => Column(children: [
            ForgeTagGroup(label: text('label'), items: [
              if (!removed)
                ForgeTagGroupEntry(
                    id: 'forge',
                    tag: ForgeTagConfiguration(
                        text: text('titleText'),
                        removeLabel: text('actionLabel'),
                        onRemove: () => setState(() {
                              removed = true;
                              actions++;
                            })))
            ]),
            if (removed)
              ForgeButton(
                  onPressed: () => setState(() => removed = false),
                  child: const Text('Restaurar tag'))
          ]),
        _ => throw StateError(family)
      };
  @override
  Widget build(BuildContext context) => Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [composition(), Text('Ações: $actions')]);
}

// EmptyStateBody is demonstrated inside its canonical owner. Data-driven owners create their public items.
const snippetContracts7=<String,Map<String,Map<String,Object?>>>{"empty-state-body":{"label":{"kind":"text","defaultValue":"Exemplo de composição","nonblank":true},"titleText":{"kind":"text","defaultValue":"Título","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Executar","nonblank":true}}};
const snippetFamilies7=<String,String>{"empty-state-body":"empty-state"};
class PartSnippet7 extends StatefulWidget{final String slug='empty-state-body';final Map<String,Object?> properties=const {"label": "Exemplo de composição", "titleText": "Título", "bodyText": "Conteúdo", "actionLabel": "Executar"};const PartSnippet7({super.key});@override State<PartSnippet7> createState()=>_PartSnippetState7();}
class _PartSnippetState7 extends State<PartSnippet7> {
  int actions = 0, page = 5;
  bool removed = false;
  String get family => snippetFamilies7[widget.slug]!;
  String text(String k) =>
      (widget.properties[k] ?? snippetContracts7[widget.slug]?[k]?['defaultValue'])
          as String;
  void act() {
    setState(() => actions++);
  }

  Widget action() =>
      ForgeButton(onPressed: act, child: Text(text('actionLabel')));
  Widget composition() => switch (family) {
        'card' => ForgeCard(children: [
            ForgeCardHeader(child: Text(text('titleText'))),
            ForgeCardBody(child: Text(text('bodyText'))),
            ForgeCardFooter(child: action())
          ]),
        'alert' => ForgeAlert(children: [
            ForgeAlertHeader(child: Text(text('titleText'))),
            ForgeAlertBody(child: Text(text('bodyText'))),
            ForgeAlertFooter(child: action())
          ]),
        'empty-state' => ForgeEmptyState(children: [
            ForgeEmptyStateHeader(child: Text(text('titleText'))),
            ForgeEmptyStateBody(child: Text(text('bodyText'))),
            ForgeEmptyStateFooter(child: action())
          ]),
        'error-state' => ForgeErrorState(children: [
            ForgeErrorStateHeader(child: Text(text('titleText'))),
            ForgeErrorStateBody(child: Text(text('bodyText'))),
            ForgeErrorStateFooter(child: action())
          ]),
        'loading-state' => ForgeLoadingState(label: text('label'), children: [
            ForgeLoadingStateHeader(child: Text(text('titleText'))),
            ForgeLoadingStateBody(child: Text(text('bodyText'))),
            ForgeLoadingStateFooter(child: action())
          ]),
        'breadcrumb' => ForgeBreadcrumb(label: text('label'), children: [
            ForgeBreadcrumbItem(
                href: '/catalog',
                onActivate: act,
                child: Text(text('actionLabel'))),
            ForgeBreadcrumbItem(current: true, child: Text(text('titleText')))
          ]),
        'pagination' => ForgePagination(
              label: text('label'),
              page: page,
              pageCount: 9,
              onPageChange: (p) => setState(() {
                    page = p;
                    actions++;
                  }),
              children: [
                const ForgePaginationItem(page: 1, label: 'Página 1'),
                if (page > 2) const ForgePaginationEllipsis(),
                if (page > 1 && page < 9)
                  ForgePaginationItem(page: page, label: 'Página $page'),
                if (page < 8) const ForgePaginationEllipsis(),
                const ForgePaginationItem(page: 9, label: 'Página 9')
              ]),
        'tag-group' => Column(children: [
            ForgeTagGroup(label: text('label'), items: [
              if (!removed)
                ForgeTagGroupEntry(
                    id: 'forge',
                    tag: ForgeTagConfiguration(
                        text: text('titleText'),
                        removeLabel: text('actionLabel'),
                        onRemove: () => setState(() {
                              removed = true;
                              actions++;
                            })))
            ]),
            if (removed)
              ForgeButton(
                  onPressed: () => setState(() => removed = false),
                  child: const Text('Restaurar tag'))
          ]),
        _ => throw StateError(family)
      };
  @override
  Widget build(BuildContext context) => Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [composition(), Text('Ações: $actions')]);
}

// EmptyStateFooter is demonstrated inside its canonical owner. Data-driven owners create their public items.
const snippetContracts8=<String,Map<String,Map<String,Object?>>>{"empty-state-footer":{"label":{"kind":"text","defaultValue":"Exemplo de composição","nonblank":true},"titleText":{"kind":"text","defaultValue":"Título","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Executar","nonblank":true}}};
const snippetFamilies8=<String,String>{"empty-state-footer":"empty-state"};
class PartSnippet8 extends StatefulWidget{final String slug='empty-state-footer';final Map<String,Object?> properties=const {"label": "Exemplo de composição", "titleText": "Título", "bodyText": "Conteúdo", "actionLabel": "Executar"};const PartSnippet8({super.key});@override State<PartSnippet8> createState()=>_PartSnippetState8();}
class _PartSnippetState8 extends State<PartSnippet8> {
  int actions = 0, page = 5;
  bool removed = false;
  String get family => snippetFamilies8[widget.slug]!;
  String text(String k) =>
      (widget.properties[k] ?? snippetContracts8[widget.slug]?[k]?['defaultValue'])
          as String;
  void act() {
    setState(() => actions++);
  }

  Widget action() =>
      ForgeButton(onPressed: act, child: Text(text('actionLabel')));
  Widget composition() => switch (family) {
        'card' => ForgeCard(children: [
            ForgeCardHeader(child: Text(text('titleText'))),
            ForgeCardBody(child: Text(text('bodyText'))),
            ForgeCardFooter(child: action())
          ]),
        'alert' => ForgeAlert(children: [
            ForgeAlertHeader(child: Text(text('titleText'))),
            ForgeAlertBody(child: Text(text('bodyText'))),
            ForgeAlertFooter(child: action())
          ]),
        'empty-state' => ForgeEmptyState(children: [
            ForgeEmptyStateHeader(child: Text(text('titleText'))),
            ForgeEmptyStateBody(child: Text(text('bodyText'))),
            ForgeEmptyStateFooter(child: action())
          ]),
        'error-state' => ForgeErrorState(children: [
            ForgeErrorStateHeader(child: Text(text('titleText'))),
            ForgeErrorStateBody(child: Text(text('bodyText'))),
            ForgeErrorStateFooter(child: action())
          ]),
        'loading-state' => ForgeLoadingState(label: text('label'), children: [
            ForgeLoadingStateHeader(child: Text(text('titleText'))),
            ForgeLoadingStateBody(child: Text(text('bodyText'))),
            ForgeLoadingStateFooter(child: action())
          ]),
        'breadcrumb' => ForgeBreadcrumb(label: text('label'), children: [
            ForgeBreadcrumbItem(
                href: '/catalog',
                onActivate: act,
                child: Text(text('actionLabel'))),
            ForgeBreadcrumbItem(current: true, child: Text(text('titleText')))
          ]),
        'pagination' => ForgePagination(
              label: text('label'),
              page: page,
              pageCount: 9,
              onPageChange: (p) => setState(() {
                    page = p;
                    actions++;
                  }),
              children: [
                const ForgePaginationItem(page: 1, label: 'Página 1'),
                if (page > 2) const ForgePaginationEllipsis(),
                if (page > 1 && page < 9)
                  ForgePaginationItem(page: page, label: 'Página $page'),
                if (page < 8) const ForgePaginationEllipsis(),
                const ForgePaginationItem(page: 9, label: 'Página 9')
              ]),
        'tag-group' => Column(children: [
            ForgeTagGroup(label: text('label'), items: [
              if (!removed)
                ForgeTagGroupEntry(
                    id: 'forge',
                    tag: ForgeTagConfiguration(
                        text: text('titleText'),
                        removeLabel: text('actionLabel'),
                        onRemove: () => setState(() {
                              removed = true;
                              actions++;
                            })))
            ]),
            if (removed)
              ForgeButton(
                  onPressed: () => setState(() => removed = false),
                  child: const Text('Restaurar tag'))
          ]),
        _ => throw StateError(family)
      };
  @override
  Widget build(BuildContext context) => Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [composition(), Text('Ações: $actions')]);
}

// ErrorStateHeader is demonstrated inside its canonical owner. Data-driven owners create their public items.
const snippetContracts9=<String,Map<String,Map<String,Object?>>>{"error-state-header":{"label":{"kind":"text","defaultValue":"Exemplo de composição","nonblank":true},"titleText":{"kind":"text","defaultValue":"Título","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Executar","nonblank":true}}};
const snippetFamilies9=<String,String>{"error-state-header":"error-state"};
class PartSnippet9 extends StatefulWidget{final String slug='error-state-header';final Map<String,Object?> properties=const {"label": "Exemplo de composição", "titleText": "Título", "bodyText": "Conteúdo", "actionLabel": "Executar"};const PartSnippet9({super.key});@override State<PartSnippet9> createState()=>_PartSnippetState9();}
class _PartSnippetState9 extends State<PartSnippet9> {
  int actions = 0, page = 5;
  bool removed = false;
  String get family => snippetFamilies9[widget.slug]!;
  String text(String k) =>
      (widget.properties[k] ?? snippetContracts9[widget.slug]?[k]?['defaultValue'])
          as String;
  void act() {
    setState(() => actions++);
  }

  Widget action() =>
      ForgeButton(onPressed: act, child: Text(text('actionLabel')));
  Widget composition() => switch (family) {
        'card' => ForgeCard(children: [
            ForgeCardHeader(child: Text(text('titleText'))),
            ForgeCardBody(child: Text(text('bodyText'))),
            ForgeCardFooter(child: action())
          ]),
        'alert' => ForgeAlert(children: [
            ForgeAlertHeader(child: Text(text('titleText'))),
            ForgeAlertBody(child: Text(text('bodyText'))),
            ForgeAlertFooter(child: action())
          ]),
        'empty-state' => ForgeEmptyState(children: [
            ForgeEmptyStateHeader(child: Text(text('titleText'))),
            ForgeEmptyStateBody(child: Text(text('bodyText'))),
            ForgeEmptyStateFooter(child: action())
          ]),
        'error-state' => ForgeErrorState(children: [
            ForgeErrorStateHeader(child: Text(text('titleText'))),
            ForgeErrorStateBody(child: Text(text('bodyText'))),
            ForgeErrorStateFooter(child: action())
          ]),
        'loading-state' => ForgeLoadingState(label: text('label'), children: [
            ForgeLoadingStateHeader(child: Text(text('titleText'))),
            ForgeLoadingStateBody(child: Text(text('bodyText'))),
            ForgeLoadingStateFooter(child: action())
          ]),
        'breadcrumb' => ForgeBreadcrumb(label: text('label'), children: [
            ForgeBreadcrumbItem(
                href: '/catalog',
                onActivate: act,
                child: Text(text('actionLabel'))),
            ForgeBreadcrumbItem(current: true, child: Text(text('titleText')))
          ]),
        'pagination' => ForgePagination(
              label: text('label'),
              page: page,
              pageCount: 9,
              onPageChange: (p) => setState(() {
                    page = p;
                    actions++;
                  }),
              children: [
                const ForgePaginationItem(page: 1, label: 'Página 1'),
                if (page > 2) const ForgePaginationEllipsis(),
                if (page > 1 && page < 9)
                  ForgePaginationItem(page: page, label: 'Página $page'),
                if (page < 8) const ForgePaginationEllipsis(),
                const ForgePaginationItem(page: 9, label: 'Página 9')
              ]),
        'tag-group' => Column(children: [
            ForgeTagGroup(label: text('label'), items: [
              if (!removed)
                ForgeTagGroupEntry(
                    id: 'forge',
                    tag: ForgeTagConfiguration(
                        text: text('titleText'),
                        removeLabel: text('actionLabel'),
                        onRemove: () => setState(() {
                              removed = true;
                              actions++;
                            })))
            ]),
            if (removed)
              ForgeButton(
                  onPressed: () => setState(() => removed = false),
                  child: const Text('Restaurar tag'))
          ]),
        _ => throw StateError(family)
      };
  @override
  Widget build(BuildContext context) => Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [composition(), Text('Ações: $actions')]);
}

// ErrorStateBody is demonstrated inside its canonical owner. Data-driven owners create their public items.
const snippetContracts10=<String,Map<String,Map<String,Object?>>>{"error-state-body":{"label":{"kind":"text","defaultValue":"Exemplo de composição","nonblank":true},"titleText":{"kind":"text","defaultValue":"Título","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Executar","nonblank":true}}};
const snippetFamilies10=<String,String>{"error-state-body":"error-state"};
class PartSnippet10 extends StatefulWidget{final String slug='error-state-body';final Map<String,Object?> properties=const {"label": "Exemplo de composição", "titleText": "Título", "bodyText": "Conteúdo", "actionLabel": "Executar"};const PartSnippet10({super.key});@override State<PartSnippet10> createState()=>_PartSnippetState10();}
class _PartSnippetState10 extends State<PartSnippet10> {
  int actions = 0, page = 5;
  bool removed = false;
  String get family => snippetFamilies10[widget.slug]!;
  String text(String k) =>
      (widget.properties[k] ?? snippetContracts10[widget.slug]?[k]?['defaultValue'])
          as String;
  void act() {
    setState(() => actions++);
  }

  Widget action() =>
      ForgeButton(onPressed: act, child: Text(text('actionLabel')));
  Widget composition() => switch (family) {
        'card' => ForgeCard(children: [
            ForgeCardHeader(child: Text(text('titleText'))),
            ForgeCardBody(child: Text(text('bodyText'))),
            ForgeCardFooter(child: action())
          ]),
        'alert' => ForgeAlert(children: [
            ForgeAlertHeader(child: Text(text('titleText'))),
            ForgeAlertBody(child: Text(text('bodyText'))),
            ForgeAlertFooter(child: action())
          ]),
        'empty-state' => ForgeEmptyState(children: [
            ForgeEmptyStateHeader(child: Text(text('titleText'))),
            ForgeEmptyStateBody(child: Text(text('bodyText'))),
            ForgeEmptyStateFooter(child: action())
          ]),
        'error-state' => ForgeErrorState(children: [
            ForgeErrorStateHeader(child: Text(text('titleText'))),
            ForgeErrorStateBody(child: Text(text('bodyText'))),
            ForgeErrorStateFooter(child: action())
          ]),
        'loading-state' => ForgeLoadingState(label: text('label'), children: [
            ForgeLoadingStateHeader(child: Text(text('titleText'))),
            ForgeLoadingStateBody(child: Text(text('bodyText'))),
            ForgeLoadingStateFooter(child: action())
          ]),
        'breadcrumb' => ForgeBreadcrumb(label: text('label'), children: [
            ForgeBreadcrumbItem(
                href: '/catalog',
                onActivate: act,
                child: Text(text('actionLabel'))),
            ForgeBreadcrumbItem(current: true, child: Text(text('titleText')))
          ]),
        'pagination' => ForgePagination(
              label: text('label'),
              page: page,
              pageCount: 9,
              onPageChange: (p) => setState(() {
                    page = p;
                    actions++;
                  }),
              children: [
                const ForgePaginationItem(page: 1, label: 'Página 1'),
                if (page > 2) const ForgePaginationEllipsis(),
                if (page > 1 && page < 9)
                  ForgePaginationItem(page: page, label: 'Página $page'),
                if (page < 8) const ForgePaginationEllipsis(),
                const ForgePaginationItem(page: 9, label: 'Página 9')
              ]),
        'tag-group' => Column(children: [
            ForgeTagGroup(label: text('label'), items: [
              if (!removed)
                ForgeTagGroupEntry(
                    id: 'forge',
                    tag: ForgeTagConfiguration(
                        text: text('titleText'),
                        removeLabel: text('actionLabel'),
                        onRemove: () => setState(() {
                              removed = true;
                              actions++;
                            })))
            ]),
            if (removed)
              ForgeButton(
                  onPressed: () => setState(() => removed = false),
                  child: const Text('Restaurar tag'))
          ]),
        _ => throw StateError(family)
      };
  @override
  Widget build(BuildContext context) => Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [composition(), Text('Ações: $actions')]);
}

// ErrorStateFooter is demonstrated inside its canonical owner. Data-driven owners create their public items.
const snippetContracts11=<String,Map<String,Map<String,Object?>>>{"error-state-footer":{"label":{"kind":"text","defaultValue":"Exemplo de composição","nonblank":true},"titleText":{"kind":"text","defaultValue":"Título","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Executar","nonblank":true}}};
const snippetFamilies11=<String,String>{"error-state-footer":"error-state"};
class PartSnippet11 extends StatefulWidget{final String slug='error-state-footer';final Map<String,Object?> properties=const {"label": "Exemplo de composição", "titleText": "Título", "bodyText": "Conteúdo", "actionLabel": "Executar"};const PartSnippet11({super.key});@override State<PartSnippet11> createState()=>_PartSnippetState11();}
class _PartSnippetState11 extends State<PartSnippet11> {
  int actions = 0, page = 5;
  bool removed = false;
  String get family => snippetFamilies11[widget.slug]!;
  String text(String k) =>
      (widget.properties[k] ?? snippetContracts11[widget.slug]?[k]?['defaultValue'])
          as String;
  void act() {
    setState(() => actions++);
  }

  Widget action() =>
      ForgeButton(onPressed: act, child: Text(text('actionLabel')));
  Widget composition() => switch (family) {
        'card' => ForgeCard(children: [
            ForgeCardHeader(child: Text(text('titleText'))),
            ForgeCardBody(child: Text(text('bodyText'))),
            ForgeCardFooter(child: action())
          ]),
        'alert' => ForgeAlert(children: [
            ForgeAlertHeader(child: Text(text('titleText'))),
            ForgeAlertBody(child: Text(text('bodyText'))),
            ForgeAlertFooter(child: action())
          ]),
        'empty-state' => ForgeEmptyState(children: [
            ForgeEmptyStateHeader(child: Text(text('titleText'))),
            ForgeEmptyStateBody(child: Text(text('bodyText'))),
            ForgeEmptyStateFooter(child: action())
          ]),
        'error-state' => ForgeErrorState(children: [
            ForgeErrorStateHeader(child: Text(text('titleText'))),
            ForgeErrorStateBody(child: Text(text('bodyText'))),
            ForgeErrorStateFooter(child: action())
          ]),
        'loading-state' => ForgeLoadingState(label: text('label'), children: [
            ForgeLoadingStateHeader(child: Text(text('titleText'))),
            ForgeLoadingStateBody(child: Text(text('bodyText'))),
            ForgeLoadingStateFooter(child: action())
          ]),
        'breadcrumb' => ForgeBreadcrumb(label: text('label'), children: [
            ForgeBreadcrumbItem(
                href: '/catalog',
                onActivate: act,
                child: Text(text('actionLabel'))),
            ForgeBreadcrumbItem(current: true, child: Text(text('titleText')))
          ]),
        'pagination' => ForgePagination(
              label: text('label'),
              page: page,
              pageCount: 9,
              onPageChange: (p) => setState(() {
                    page = p;
                    actions++;
                  }),
              children: [
                const ForgePaginationItem(page: 1, label: 'Página 1'),
                if (page > 2) const ForgePaginationEllipsis(),
                if (page > 1 && page < 9)
                  ForgePaginationItem(page: page, label: 'Página $page'),
                if (page < 8) const ForgePaginationEllipsis(),
                const ForgePaginationItem(page: 9, label: 'Página 9')
              ]),
        'tag-group' => Column(children: [
            ForgeTagGroup(label: text('label'), items: [
              if (!removed)
                ForgeTagGroupEntry(
                    id: 'forge',
                    tag: ForgeTagConfiguration(
                        text: text('titleText'),
                        removeLabel: text('actionLabel'),
                        onRemove: () => setState(() {
                              removed = true;
                              actions++;
                            })))
            ]),
            if (removed)
              ForgeButton(
                  onPressed: () => setState(() => removed = false),
                  child: const Text('Restaurar tag'))
          ]),
        _ => throw StateError(family)
      };
  @override
  Widget build(BuildContext context) => Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [composition(), Text('Ações: $actions')]);
}

// LoadingStateHeader is demonstrated inside its canonical owner. Data-driven owners create their public items.
const snippetContracts12=<String,Map<String,Map<String,Object?>>>{"loading-state-header":{"label":{"kind":"text","defaultValue":"Exemplo de composição","nonblank":true},"titleText":{"kind":"text","defaultValue":"Título","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Executar","nonblank":true}}};
const snippetFamilies12=<String,String>{"loading-state-header":"loading-state"};
class PartSnippet12 extends StatefulWidget{final String slug='loading-state-header';final Map<String,Object?> properties=const {"label": "Exemplo de composição", "titleText": "Título", "bodyText": "Conteúdo", "actionLabel": "Executar"};const PartSnippet12({super.key});@override State<PartSnippet12> createState()=>_PartSnippetState12();}
class _PartSnippetState12 extends State<PartSnippet12> {
  int actions = 0, page = 5;
  bool removed = false;
  String get family => snippetFamilies12[widget.slug]!;
  String text(String k) =>
      (widget.properties[k] ?? snippetContracts12[widget.slug]?[k]?['defaultValue'])
          as String;
  void act() {
    setState(() => actions++);
  }

  Widget action() =>
      ForgeButton(onPressed: act, child: Text(text('actionLabel')));
  Widget composition() => switch (family) {
        'card' => ForgeCard(children: [
            ForgeCardHeader(child: Text(text('titleText'))),
            ForgeCardBody(child: Text(text('bodyText'))),
            ForgeCardFooter(child: action())
          ]),
        'alert' => ForgeAlert(children: [
            ForgeAlertHeader(child: Text(text('titleText'))),
            ForgeAlertBody(child: Text(text('bodyText'))),
            ForgeAlertFooter(child: action())
          ]),
        'empty-state' => ForgeEmptyState(children: [
            ForgeEmptyStateHeader(child: Text(text('titleText'))),
            ForgeEmptyStateBody(child: Text(text('bodyText'))),
            ForgeEmptyStateFooter(child: action())
          ]),
        'error-state' => ForgeErrorState(children: [
            ForgeErrorStateHeader(child: Text(text('titleText'))),
            ForgeErrorStateBody(child: Text(text('bodyText'))),
            ForgeErrorStateFooter(child: action())
          ]),
        'loading-state' => ForgeLoadingState(label: text('label'), children: [
            ForgeLoadingStateHeader(child: Text(text('titleText'))),
            ForgeLoadingStateBody(child: Text(text('bodyText'))),
            ForgeLoadingStateFooter(child: action())
          ]),
        'breadcrumb' => ForgeBreadcrumb(label: text('label'), children: [
            ForgeBreadcrumbItem(
                href: '/catalog',
                onActivate: act,
                child: Text(text('actionLabel'))),
            ForgeBreadcrumbItem(current: true, child: Text(text('titleText')))
          ]),
        'pagination' => ForgePagination(
              label: text('label'),
              page: page,
              pageCount: 9,
              onPageChange: (p) => setState(() {
                    page = p;
                    actions++;
                  }),
              children: [
                const ForgePaginationItem(page: 1, label: 'Página 1'),
                if (page > 2) const ForgePaginationEllipsis(),
                if (page > 1 && page < 9)
                  ForgePaginationItem(page: page, label: 'Página $page'),
                if (page < 8) const ForgePaginationEllipsis(),
                const ForgePaginationItem(page: 9, label: 'Página 9')
              ]),
        'tag-group' => Column(children: [
            ForgeTagGroup(label: text('label'), items: [
              if (!removed)
                ForgeTagGroupEntry(
                    id: 'forge',
                    tag: ForgeTagConfiguration(
                        text: text('titleText'),
                        removeLabel: text('actionLabel'),
                        onRemove: () => setState(() {
                              removed = true;
                              actions++;
                            })))
            ]),
            if (removed)
              ForgeButton(
                  onPressed: () => setState(() => removed = false),
                  child: const Text('Restaurar tag'))
          ]),
        _ => throw StateError(family)
      };
  @override
  Widget build(BuildContext context) => Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [composition(), Text('Ações: $actions')]);
}

// LoadingStateBody is demonstrated inside its canonical owner. Data-driven owners create their public items.
const snippetContracts13=<String,Map<String,Map<String,Object?>>>{"loading-state-body":{"label":{"kind":"text","defaultValue":"Exemplo de composição","nonblank":true},"titleText":{"kind":"text","defaultValue":"Título","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Executar","nonblank":true}}};
const snippetFamilies13=<String,String>{"loading-state-body":"loading-state"};
class PartSnippet13 extends StatefulWidget{final String slug='loading-state-body';final Map<String,Object?> properties=const {"label": "Exemplo de composição", "titleText": "Título", "bodyText": "Conteúdo", "actionLabel": "Executar"};const PartSnippet13({super.key});@override State<PartSnippet13> createState()=>_PartSnippetState13();}
class _PartSnippetState13 extends State<PartSnippet13> {
  int actions = 0, page = 5;
  bool removed = false;
  String get family => snippetFamilies13[widget.slug]!;
  String text(String k) =>
      (widget.properties[k] ?? snippetContracts13[widget.slug]?[k]?['defaultValue'])
          as String;
  void act() {
    setState(() => actions++);
  }

  Widget action() =>
      ForgeButton(onPressed: act, child: Text(text('actionLabel')));
  Widget composition() => switch (family) {
        'card' => ForgeCard(children: [
            ForgeCardHeader(child: Text(text('titleText'))),
            ForgeCardBody(child: Text(text('bodyText'))),
            ForgeCardFooter(child: action())
          ]),
        'alert' => ForgeAlert(children: [
            ForgeAlertHeader(child: Text(text('titleText'))),
            ForgeAlertBody(child: Text(text('bodyText'))),
            ForgeAlertFooter(child: action())
          ]),
        'empty-state' => ForgeEmptyState(children: [
            ForgeEmptyStateHeader(child: Text(text('titleText'))),
            ForgeEmptyStateBody(child: Text(text('bodyText'))),
            ForgeEmptyStateFooter(child: action())
          ]),
        'error-state' => ForgeErrorState(children: [
            ForgeErrorStateHeader(child: Text(text('titleText'))),
            ForgeErrorStateBody(child: Text(text('bodyText'))),
            ForgeErrorStateFooter(child: action())
          ]),
        'loading-state' => ForgeLoadingState(label: text('label'), children: [
            ForgeLoadingStateHeader(child: Text(text('titleText'))),
            ForgeLoadingStateBody(child: Text(text('bodyText'))),
            ForgeLoadingStateFooter(child: action())
          ]),
        'breadcrumb' => ForgeBreadcrumb(label: text('label'), children: [
            ForgeBreadcrumbItem(
                href: '/catalog',
                onActivate: act,
                child: Text(text('actionLabel'))),
            ForgeBreadcrumbItem(current: true, child: Text(text('titleText')))
          ]),
        'pagination' => ForgePagination(
              label: text('label'),
              page: page,
              pageCount: 9,
              onPageChange: (p) => setState(() {
                    page = p;
                    actions++;
                  }),
              children: [
                const ForgePaginationItem(page: 1, label: 'Página 1'),
                if (page > 2) const ForgePaginationEllipsis(),
                if (page > 1 && page < 9)
                  ForgePaginationItem(page: page, label: 'Página $page'),
                if (page < 8) const ForgePaginationEllipsis(),
                const ForgePaginationItem(page: 9, label: 'Página 9')
              ]),
        'tag-group' => Column(children: [
            ForgeTagGroup(label: text('label'), items: [
              if (!removed)
                ForgeTagGroupEntry(
                    id: 'forge',
                    tag: ForgeTagConfiguration(
                        text: text('titleText'),
                        removeLabel: text('actionLabel'),
                        onRemove: () => setState(() {
                              removed = true;
                              actions++;
                            })))
            ]),
            if (removed)
              ForgeButton(
                  onPressed: () => setState(() => removed = false),
                  child: const Text('Restaurar tag'))
          ]),
        _ => throw StateError(family)
      };
  @override
  Widget build(BuildContext context) => Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [composition(), Text('Ações: $actions')]);
}

// LoadingStateFooter is demonstrated inside its canonical owner. Data-driven owners create their public items.
const snippetContracts14=<String,Map<String,Map<String,Object?>>>{"loading-state-footer":{"label":{"kind":"text","defaultValue":"Exemplo de composição","nonblank":true},"titleText":{"kind":"text","defaultValue":"Título","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Executar","nonblank":true}}};
const snippetFamilies14=<String,String>{"loading-state-footer":"loading-state"};
class PartSnippet14 extends StatefulWidget{final String slug='loading-state-footer';final Map<String,Object?> properties=const {"label": "Exemplo de composição", "titleText": "Título", "bodyText": "Conteúdo", "actionLabel": "Executar"};const PartSnippet14({super.key});@override State<PartSnippet14> createState()=>_PartSnippetState14();}
class _PartSnippetState14 extends State<PartSnippet14> {
  int actions = 0, page = 5;
  bool removed = false;
  String get family => snippetFamilies14[widget.slug]!;
  String text(String k) =>
      (widget.properties[k] ?? snippetContracts14[widget.slug]?[k]?['defaultValue'])
          as String;
  void act() {
    setState(() => actions++);
  }

  Widget action() =>
      ForgeButton(onPressed: act, child: Text(text('actionLabel')));
  Widget composition() => switch (family) {
        'card' => ForgeCard(children: [
            ForgeCardHeader(child: Text(text('titleText'))),
            ForgeCardBody(child: Text(text('bodyText'))),
            ForgeCardFooter(child: action())
          ]),
        'alert' => ForgeAlert(children: [
            ForgeAlertHeader(child: Text(text('titleText'))),
            ForgeAlertBody(child: Text(text('bodyText'))),
            ForgeAlertFooter(child: action())
          ]),
        'empty-state' => ForgeEmptyState(children: [
            ForgeEmptyStateHeader(child: Text(text('titleText'))),
            ForgeEmptyStateBody(child: Text(text('bodyText'))),
            ForgeEmptyStateFooter(child: action())
          ]),
        'error-state' => ForgeErrorState(children: [
            ForgeErrorStateHeader(child: Text(text('titleText'))),
            ForgeErrorStateBody(child: Text(text('bodyText'))),
            ForgeErrorStateFooter(child: action())
          ]),
        'loading-state' => ForgeLoadingState(label: text('label'), children: [
            ForgeLoadingStateHeader(child: Text(text('titleText'))),
            ForgeLoadingStateBody(child: Text(text('bodyText'))),
            ForgeLoadingStateFooter(child: action())
          ]),
        'breadcrumb' => ForgeBreadcrumb(label: text('label'), children: [
            ForgeBreadcrumbItem(
                href: '/catalog',
                onActivate: act,
                child: Text(text('actionLabel'))),
            ForgeBreadcrumbItem(current: true, child: Text(text('titleText')))
          ]),
        'pagination' => ForgePagination(
              label: text('label'),
              page: page,
              pageCount: 9,
              onPageChange: (p) => setState(() {
                    page = p;
                    actions++;
                  }),
              children: [
                const ForgePaginationItem(page: 1, label: 'Página 1'),
                if (page > 2) const ForgePaginationEllipsis(),
                if (page > 1 && page < 9)
                  ForgePaginationItem(page: page, label: 'Página $page'),
                if (page < 8) const ForgePaginationEllipsis(),
                const ForgePaginationItem(page: 9, label: 'Página 9')
              ]),
        'tag-group' => Column(children: [
            ForgeTagGroup(label: text('label'), items: [
              if (!removed)
                ForgeTagGroupEntry(
                    id: 'forge',
                    tag: ForgeTagConfiguration(
                        text: text('titleText'),
                        removeLabel: text('actionLabel'),
                        onRemove: () => setState(() {
                              removed = true;
                              actions++;
                            })))
            ]),
            if (removed)
              ForgeButton(
                  onPressed: () => setState(() => removed = false),
                  child: const Text('Restaurar tag'))
          ]),
        _ => throw StateError(family)
      };
  @override
  Widget build(BuildContext context) => Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [composition(), Text('Ações: $actions')]);
}

// BreadcrumbItem is demonstrated inside its canonical owner. Data-driven owners create their public items.
const snippetContracts15=<String,Map<String,Map<String,Object?>>>{"breadcrumb-item":{"label":{"kind":"text","defaultValue":"Exemplo de composição","nonblank":true},"titleText":{"kind":"text","defaultValue":"Título","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Executar","nonblank":true}}};
const snippetFamilies15=<String,String>{"breadcrumb-item":"breadcrumb"};
class PartSnippet15 extends StatefulWidget{final String slug='breadcrumb-item';final Map<String,Object?> properties=const {"label": "Exemplo de composição", "titleText": "Título", "bodyText": "Conteúdo", "actionLabel": "Executar"};const PartSnippet15({super.key});@override State<PartSnippet15> createState()=>_PartSnippetState15();}
class _PartSnippetState15 extends State<PartSnippet15> {
  int actions = 0, page = 5;
  bool removed = false;
  String get family => snippetFamilies15[widget.slug]!;
  String text(String k) =>
      (widget.properties[k] ?? snippetContracts15[widget.slug]?[k]?['defaultValue'])
          as String;
  void act() {
    setState(() => actions++);
  }

  Widget action() =>
      ForgeButton(onPressed: act, child: Text(text('actionLabel')));
  Widget composition() => switch (family) {
        'card' => ForgeCard(children: [
            ForgeCardHeader(child: Text(text('titleText'))),
            ForgeCardBody(child: Text(text('bodyText'))),
            ForgeCardFooter(child: action())
          ]),
        'alert' => ForgeAlert(children: [
            ForgeAlertHeader(child: Text(text('titleText'))),
            ForgeAlertBody(child: Text(text('bodyText'))),
            ForgeAlertFooter(child: action())
          ]),
        'empty-state' => ForgeEmptyState(children: [
            ForgeEmptyStateHeader(child: Text(text('titleText'))),
            ForgeEmptyStateBody(child: Text(text('bodyText'))),
            ForgeEmptyStateFooter(child: action())
          ]),
        'error-state' => ForgeErrorState(children: [
            ForgeErrorStateHeader(child: Text(text('titleText'))),
            ForgeErrorStateBody(child: Text(text('bodyText'))),
            ForgeErrorStateFooter(child: action())
          ]),
        'loading-state' => ForgeLoadingState(label: text('label'), children: [
            ForgeLoadingStateHeader(child: Text(text('titleText'))),
            ForgeLoadingStateBody(child: Text(text('bodyText'))),
            ForgeLoadingStateFooter(child: action())
          ]),
        'breadcrumb' => ForgeBreadcrumb(label: text('label'), children: [
            ForgeBreadcrumbItem(
                href: '/catalog',
                onActivate: act,
                child: Text(text('actionLabel'))),
            ForgeBreadcrumbItem(current: true, child: Text(text('titleText')))
          ]),
        'pagination' => ForgePagination(
              label: text('label'),
              page: page,
              pageCount: 9,
              onPageChange: (p) => setState(() {
                    page = p;
                    actions++;
                  }),
              children: [
                const ForgePaginationItem(page: 1, label: 'Página 1'),
                if (page > 2) const ForgePaginationEllipsis(),
                if (page > 1 && page < 9)
                  ForgePaginationItem(page: page, label: 'Página $page'),
                if (page < 8) const ForgePaginationEllipsis(),
                const ForgePaginationItem(page: 9, label: 'Página 9')
              ]),
        'tag-group' => Column(children: [
            ForgeTagGroup(label: text('label'), items: [
              if (!removed)
                ForgeTagGroupEntry(
                    id: 'forge',
                    tag: ForgeTagConfiguration(
                        text: text('titleText'),
                        removeLabel: text('actionLabel'),
                        onRemove: () => setState(() {
                              removed = true;
                              actions++;
                            })))
            ]),
            if (removed)
              ForgeButton(
                  onPressed: () => setState(() => removed = false),
                  child: const Text('Restaurar tag'))
          ]),
        _ => throw StateError(family)
      };
  @override
  Widget build(BuildContext context) => Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [composition(), Text('Ações: $actions')]);
}

// PaginationItem is demonstrated inside its canonical owner. Data-driven owners create their public items.
const snippetContracts16=<String,Map<String,Map<String,Object?>>>{"pagination-item":{"label":{"kind":"text","defaultValue":"Exemplo de composição","nonblank":true},"titleText":{"kind":"text","defaultValue":"Título","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Executar","nonblank":true}}};
const snippetFamilies16=<String,String>{"pagination-item":"pagination"};
class PartSnippet16 extends StatefulWidget{final String slug='pagination-item';final Map<String,Object?> properties=const {"label": "Exemplo de composição", "titleText": "Título", "bodyText": "Conteúdo", "actionLabel": "Executar"};const PartSnippet16({super.key});@override State<PartSnippet16> createState()=>_PartSnippetState16();}
class _PartSnippetState16 extends State<PartSnippet16> {
  int actions = 0, page = 5;
  bool removed = false;
  String get family => snippetFamilies16[widget.slug]!;
  String text(String k) =>
      (widget.properties[k] ?? snippetContracts16[widget.slug]?[k]?['defaultValue'])
          as String;
  void act() {
    setState(() => actions++);
  }

  Widget action() =>
      ForgeButton(onPressed: act, child: Text(text('actionLabel')));
  Widget composition() => switch (family) {
        'card' => ForgeCard(children: [
            ForgeCardHeader(child: Text(text('titleText'))),
            ForgeCardBody(child: Text(text('bodyText'))),
            ForgeCardFooter(child: action())
          ]),
        'alert' => ForgeAlert(children: [
            ForgeAlertHeader(child: Text(text('titleText'))),
            ForgeAlertBody(child: Text(text('bodyText'))),
            ForgeAlertFooter(child: action())
          ]),
        'empty-state' => ForgeEmptyState(children: [
            ForgeEmptyStateHeader(child: Text(text('titleText'))),
            ForgeEmptyStateBody(child: Text(text('bodyText'))),
            ForgeEmptyStateFooter(child: action())
          ]),
        'error-state' => ForgeErrorState(children: [
            ForgeErrorStateHeader(child: Text(text('titleText'))),
            ForgeErrorStateBody(child: Text(text('bodyText'))),
            ForgeErrorStateFooter(child: action())
          ]),
        'loading-state' => ForgeLoadingState(label: text('label'), children: [
            ForgeLoadingStateHeader(child: Text(text('titleText'))),
            ForgeLoadingStateBody(child: Text(text('bodyText'))),
            ForgeLoadingStateFooter(child: action())
          ]),
        'breadcrumb' => ForgeBreadcrumb(label: text('label'), children: [
            ForgeBreadcrumbItem(
                href: '/catalog',
                onActivate: act,
                child: Text(text('actionLabel'))),
            ForgeBreadcrumbItem(current: true, child: Text(text('titleText')))
          ]),
        'pagination' => ForgePagination(
              label: text('label'),
              page: page,
              pageCount: 9,
              onPageChange: (p) => setState(() {
                    page = p;
                    actions++;
                  }),
              children: [
                const ForgePaginationItem(page: 1, label: 'Página 1'),
                if (page > 2) const ForgePaginationEllipsis(),
                if (page > 1 && page < 9)
                  ForgePaginationItem(page: page, label: 'Página $page'),
                if (page < 8) const ForgePaginationEllipsis(),
                const ForgePaginationItem(page: 9, label: 'Página 9')
              ]),
        'tag-group' => Column(children: [
            ForgeTagGroup(label: text('label'), items: [
              if (!removed)
                ForgeTagGroupEntry(
                    id: 'forge',
                    tag: ForgeTagConfiguration(
                        text: text('titleText'),
                        removeLabel: text('actionLabel'),
                        onRemove: () => setState(() {
                              removed = true;
                              actions++;
                            })))
            ]),
            if (removed)
              ForgeButton(
                  onPressed: () => setState(() => removed = false),
                  child: const Text('Restaurar tag'))
          ]),
        _ => throw StateError(family)
      };
  @override
  Widget build(BuildContext context) => Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [composition(), Text('Ações: $actions')]);
}

// PaginationEllipsis is demonstrated inside its canonical owner. Data-driven owners create their public items.
const snippetContracts17=<String,Map<String,Map<String,Object?>>>{"pagination-ellipsis":{"label":{"kind":"text","defaultValue":"Exemplo de composição","nonblank":true},"titleText":{"kind":"text","defaultValue":"Título","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Executar","nonblank":true}}};
const snippetFamilies17=<String,String>{"pagination-ellipsis":"pagination"};
class PartSnippet17 extends StatefulWidget{final String slug='pagination-ellipsis';final Map<String,Object?> properties=const {"label": "Exemplo de composição", "titleText": "Título", "bodyText": "Conteúdo", "actionLabel": "Executar"};const PartSnippet17({super.key});@override State<PartSnippet17> createState()=>_PartSnippetState17();}
class _PartSnippetState17 extends State<PartSnippet17> {
  int actions = 0, page = 5;
  bool removed = false;
  String get family => snippetFamilies17[widget.slug]!;
  String text(String k) =>
      (widget.properties[k] ?? snippetContracts17[widget.slug]?[k]?['defaultValue'])
          as String;
  void act() {
    setState(() => actions++);
  }

  Widget action() =>
      ForgeButton(onPressed: act, child: Text(text('actionLabel')));
  Widget composition() => switch (family) {
        'card' => ForgeCard(children: [
            ForgeCardHeader(child: Text(text('titleText'))),
            ForgeCardBody(child: Text(text('bodyText'))),
            ForgeCardFooter(child: action())
          ]),
        'alert' => ForgeAlert(children: [
            ForgeAlertHeader(child: Text(text('titleText'))),
            ForgeAlertBody(child: Text(text('bodyText'))),
            ForgeAlertFooter(child: action())
          ]),
        'empty-state' => ForgeEmptyState(children: [
            ForgeEmptyStateHeader(child: Text(text('titleText'))),
            ForgeEmptyStateBody(child: Text(text('bodyText'))),
            ForgeEmptyStateFooter(child: action())
          ]),
        'error-state' => ForgeErrorState(children: [
            ForgeErrorStateHeader(child: Text(text('titleText'))),
            ForgeErrorStateBody(child: Text(text('bodyText'))),
            ForgeErrorStateFooter(child: action())
          ]),
        'loading-state' => ForgeLoadingState(label: text('label'), children: [
            ForgeLoadingStateHeader(child: Text(text('titleText'))),
            ForgeLoadingStateBody(child: Text(text('bodyText'))),
            ForgeLoadingStateFooter(child: action())
          ]),
        'breadcrumb' => ForgeBreadcrumb(label: text('label'), children: [
            ForgeBreadcrumbItem(
                href: '/catalog',
                onActivate: act,
                child: Text(text('actionLabel'))),
            ForgeBreadcrumbItem(current: true, child: Text(text('titleText')))
          ]),
        'pagination' => ForgePagination(
              label: text('label'),
              page: page,
              pageCount: 9,
              onPageChange: (p) => setState(() {
                    page = p;
                    actions++;
                  }),
              children: [
                const ForgePaginationItem(page: 1, label: 'Página 1'),
                if (page > 2) const ForgePaginationEllipsis(),
                if (page > 1 && page < 9)
                  ForgePaginationItem(page: page, label: 'Página $page'),
                if (page < 8) const ForgePaginationEllipsis(),
                const ForgePaginationItem(page: 9, label: 'Página 9')
              ]),
        'tag-group' => Column(children: [
            ForgeTagGroup(label: text('label'), items: [
              if (!removed)
                ForgeTagGroupEntry(
                    id: 'forge',
                    tag: ForgeTagConfiguration(
                        text: text('titleText'),
                        removeLabel: text('actionLabel'),
                        onRemove: () => setState(() {
                              removed = true;
                              actions++;
                            })))
            ]),
            if (removed)
              ForgeButton(
                  onPressed: () => setState(() => removed = false),
                  child: const Text('Restaurar tag'))
          ]),
        _ => throw StateError(family)
      };
  @override
  Widget build(BuildContext context) => Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [composition(), Text('Ações: $actions')]);
}

// TagGroupItem is demonstrated inside its canonical owner. Data-driven owners create their public items.
const snippetContracts18=<String,Map<String,Map<String,Object?>>>{"tag-group-item":{"label":{"kind":"text","defaultValue":"Exemplo de composição","nonblank":true},"titleText":{"kind":"text","defaultValue":"Título","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Executar","nonblank":true}}};
const snippetFamilies18=<String,String>{"tag-group-item":"tag-group"};
class PartSnippet18 extends StatefulWidget{final String slug='tag-group-item';final Map<String,Object?> properties=const {"label": "Exemplo de composição", "titleText": "Título", "bodyText": "Conteúdo", "actionLabel": "Executar"};const PartSnippet18({super.key});@override State<PartSnippet18> createState()=>_PartSnippetState18();}
class _PartSnippetState18 extends State<PartSnippet18> {
  int actions = 0, page = 5;
  bool removed = false;
  String get family => snippetFamilies18[widget.slug]!;
  String text(String k) =>
      (widget.properties[k] ?? snippetContracts18[widget.slug]?[k]?['defaultValue'])
          as String;
  void act() {
    setState(() => actions++);
  }

  Widget action() =>
      ForgeButton(onPressed: act, child: Text(text('actionLabel')));
  Widget composition() => switch (family) {
        'card' => ForgeCard(children: [
            ForgeCardHeader(child: Text(text('titleText'))),
            ForgeCardBody(child: Text(text('bodyText'))),
            ForgeCardFooter(child: action())
          ]),
        'alert' => ForgeAlert(children: [
            ForgeAlertHeader(child: Text(text('titleText'))),
            ForgeAlertBody(child: Text(text('bodyText'))),
            ForgeAlertFooter(child: action())
          ]),
        'empty-state' => ForgeEmptyState(children: [
            ForgeEmptyStateHeader(child: Text(text('titleText'))),
            ForgeEmptyStateBody(child: Text(text('bodyText'))),
            ForgeEmptyStateFooter(child: action())
          ]),
        'error-state' => ForgeErrorState(children: [
            ForgeErrorStateHeader(child: Text(text('titleText'))),
            ForgeErrorStateBody(child: Text(text('bodyText'))),
            ForgeErrorStateFooter(child: action())
          ]),
        'loading-state' => ForgeLoadingState(label: text('label'), children: [
            ForgeLoadingStateHeader(child: Text(text('titleText'))),
            ForgeLoadingStateBody(child: Text(text('bodyText'))),
            ForgeLoadingStateFooter(child: action())
          ]),
        'breadcrumb' => ForgeBreadcrumb(label: text('label'), children: [
            ForgeBreadcrumbItem(
                href: '/catalog',
                onActivate: act,
                child: Text(text('actionLabel'))),
            ForgeBreadcrumbItem(current: true, child: Text(text('titleText')))
          ]),
        'pagination' => ForgePagination(
              label: text('label'),
              page: page,
              pageCount: 9,
              onPageChange: (p) => setState(() {
                    page = p;
                    actions++;
                  }),
              children: [
                const ForgePaginationItem(page: 1, label: 'Página 1'),
                if (page > 2) const ForgePaginationEllipsis(),
                if (page > 1 && page < 9)
                  ForgePaginationItem(page: page, label: 'Página $page'),
                if (page < 8) const ForgePaginationEllipsis(),
                const ForgePaginationItem(page: 9, label: 'Página 9')
              ]),
        'tag-group' => Column(children: [
            ForgeTagGroup(label: text('label'), items: [
              if (!removed)
                ForgeTagGroupEntry(
                    id: 'forge',
                    tag: ForgeTagConfiguration(
                        text: text('titleText'),
                        removeLabel: text('actionLabel'),
                        onRemove: () => setState(() {
                              removed = true;
                              actions++;
                            })))
            ]),
            if (removed)
              ForgeButton(
                  onPressed: () => setState(() => removed = false),
                  child: const Text('Restaurar tag'))
          ]),
        _ => throw StateError(family)
      };
  @override
  Widget build(BuildContext context) => Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [composition(), Text('Ações: $actions')]);
}

// CardHeader is demonstrated inside its canonical owner. Data-driven owners create their public items.
const snippetContracts19=<String,Map<String,Map<String,Object?>>>{"card-header":{"label":{"kind":"text","defaultValue":"Exemplo de composição","nonblank":true},"titleText":{"kind":"text","defaultValue":"Título","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Executar","nonblank":true}}};
const snippetFamilies19=<String,String>{"card-header":"card"};
class PartSnippet19 extends StatefulWidget{final String slug='card-header';final Map<String,Object?> properties=const {"label": "Exemplo de composição", "titleText": "Aspas ' barra \\ dólar \$ e\nnova linha", "bodyText": "Conteúdo", "actionLabel": "Executar"};const PartSnippet19({super.key});@override State<PartSnippet19> createState()=>_PartSnippetState19();}
class _PartSnippetState19 extends State<PartSnippet19> {
  int actions = 0, page = 5;
  bool removed = false;
  String get family => snippetFamilies19[widget.slug]!;
  String text(String k) =>
      (widget.properties[k] ?? snippetContracts19[widget.slug]?[k]?['defaultValue'])
          as String;
  void act() {
    setState(() => actions++);
  }

  Widget action() =>
      ForgeButton(onPressed: act, child: Text(text('actionLabel')));
  Widget composition() => switch (family) {
        'card' => ForgeCard(children: [
            ForgeCardHeader(child: Text(text('titleText'))),
            ForgeCardBody(child: Text(text('bodyText'))),
            ForgeCardFooter(child: action())
          ]),
        'alert' => ForgeAlert(children: [
            ForgeAlertHeader(child: Text(text('titleText'))),
            ForgeAlertBody(child: Text(text('bodyText'))),
            ForgeAlertFooter(child: action())
          ]),
        'empty-state' => ForgeEmptyState(children: [
            ForgeEmptyStateHeader(child: Text(text('titleText'))),
            ForgeEmptyStateBody(child: Text(text('bodyText'))),
            ForgeEmptyStateFooter(child: action())
          ]),
        'error-state' => ForgeErrorState(children: [
            ForgeErrorStateHeader(child: Text(text('titleText'))),
            ForgeErrorStateBody(child: Text(text('bodyText'))),
            ForgeErrorStateFooter(child: action())
          ]),
        'loading-state' => ForgeLoadingState(label: text('label'), children: [
            ForgeLoadingStateHeader(child: Text(text('titleText'))),
            ForgeLoadingStateBody(child: Text(text('bodyText'))),
            ForgeLoadingStateFooter(child: action())
          ]),
        'breadcrumb' => ForgeBreadcrumb(label: text('label'), children: [
            ForgeBreadcrumbItem(
                href: '/catalog',
                onActivate: act,
                child: Text(text('actionLabel'))),
            ForgeBreadcrumbItem(current: true, child: Text(text('titleText')))
          ]),
        'pagination' => ForgePagination(
              label: text('label'),
              page: page,
              pageCount: 9,
              onPageChange: (p) => setState(() {
                    page = p;
                    actions++;
                  }),
              children: [
                const ForgePaginationItem(page: 1, label: 'Página 1'),
                if (page > 2) const ForgePaginationEllipsis(),
                if (page > 1 && page < 9)
                  ForgePaginationItem(page: page, label: 'Página $page'),
                if (page < 8) const ForgePaginationEllipsis(),
                const ForgePaginationItem(page: 9, label: 'Página 9')
              ]),
        'tag-group' => Column(children: [
            ForgeTagGroup(label: text('label'), items: [
              if (!removed)
                ForgeTagGroupEntry(
                    id: 'forge',
                    tag: ForgeTagConfiguration(
                        text: text('titleText'),
                        removeLabel: text('actionLabel'),
                        onRemove: () => setState(() {
                              removed = true;
                              actions++;
                            })))
            ]),
            if (removed)
              ForgeButton(
                  onPressed: () => setState(() => removed = false),
                  child: const Text('Restaurar tag'))
          ]),
        _ => throw StateError(family)
      };
  @override
  Widget build(BuildContext context) => Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [composition(), Text('Ações: $actions')]);
}

Widget host(Widget child)=>MaterialApp(theme:ForgeThemeData.light(),home:Scaffold(body:SingleChildScrollView(child:SizedBox(width:320,child:child))));
void main(){
testWidgets('copyable interaction card-header 0',(t)async{await t.pumpWidget(host(const PartSnippet0()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction card-body 1',(t)async{await t.pumpWidget(host(const PartSnippet1()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction card-footer 2',(t)async{await t.pumpWidget(host(const PartSnippet2()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction alert-header 3',(t)async{await t.pumpWidget(host(const PartSnippet3()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction alert-body 4',(t)async{await t.pumpWidget(host(const PartSnippet4()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction alert-footer 5',(t)async{await t.pumpWidget(host(const PartSnippet5()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction empty-state-header 6',(t)async{await t.pumpWidget(host(const PartSnippet6()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction empty-state-body 7',(t)async{await t.pumpWidget(host(const PartSnippet7()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction empty-state-footer 8',(t)async{await t.pumpWidget(host(const PartSnippet8()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction error-state-header 9',(t)async{await t.pumpWidget(host(const PartSnippet9()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction error-state-body 10',(t)async{await t.pumpWidget(host(const PartSnippet10()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction error-state-footer 11',(t)async{await t.pumpWidget(host(const PartSnippet11()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction loading-state-header 12',(t)async{await t.pumpWidget(host(const PartSnippet12()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction loading-state-body 13',(t)async{await t.pumpWidget(host(const PartSnippet13()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction loading-state-footer 14',(t)async{await t.pumpWidget(host(const PartSnippet14()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction breadcrumb-item 15',(t)async{await t.pumpWidget(host(const PartSnippet15()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction pagination-item 16',(t)async{await t.pumpWidget(host(const PartSnippet16()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction pagination-ellipsis 17',(t)async{await t.pumpWidget(host(const PartSnippet17()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction tag-group-item 18',(t)async{await t.pumpWidget(host(const PartSnippet18()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction card-header 19',(t)async{await t.pumpWidget(host(const PartSnippet19()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
}
