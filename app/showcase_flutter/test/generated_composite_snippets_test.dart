// Generated from real Showcase copyable Dart composition examples.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';
class PaginationExample extends StatefulWidget {
  const PaginationExample({super.key});
  @override State<PaginationExample> createState() => _PaginationExampleState();
}
class _PaginationExampleState extends State<PaginationExample> {
  int page = 2;
  @override Widget build(BuildContext context) => ForgePagination(
    label: "Páginas",
    page: page,
    pageCount: 5,
    disabled: false,
    onPageChange: (next) => setState(() => page = next),
    children: [
      for (var n = 1; n <= 5; n++)
        ForgePaginationItem(page: n, label: 'Página $n'),
    ],
  );
}
class TagGroupExample extends StatefulWidget {
  const TagGroupExample({super.key});
  @override State<TagGroupExample> createState() => _TagGroupExampleState();
}
class _TagGroupExampleState extends State<TagGroupExample> {
  final removed = <String>{};
  @override Widget build(BuildContext context) => ForgeTagGroup(
    label: "Habilidades",
    fullWidth: true,
    items: [
      if (!removed.contains('flutter')) ForgeTagGroupEntry(
        id: 'flutter',
        tag: ForgeTagConfiguration(
          text: "Flutter",
          removeLabel: "Remover Flutter",
          disabled: false,
          onRemove: () => setState(() => removed.add('flutter')),
        ),
      ),
    ],
  );
}
Widget host(Widget child) => MaterialApp(theme: ForgeThemeData.light(), home: Scaffold(body: SingleChildScrollView(child: SizedBox(width: 480, child: child))));
void main() {
testWidgets('copyable breadcrumb 0', (t) async { await t.pumpWidget(host(ForgeBreadcrumb(
  label: "Localização",
  children: [
    // Replace this consumer-owned callback with your router.
    ForgeBreadcrumbItem(href: '/catalog', onActivate: () {}, child: Text("Catálogo")),
    ForgeBreadcrumbItem(current: true, child: Text("Detalhes")),
  ],
))); await t.pump(); expect(t.takeException(), isNull); });
testWidgets('copyable pagination 1', (t) async { await t.pumpWidget(host(const PaginationExample())); await t.pump(); expect(t.takeException(), isNull); });
testWidgets('copyable tag-group 2', (t) async { await t.pumpWidget(host(const TagGroupExample())); await t.pump(); expect(t.takeException(), isNull); });
testWidgets('copyable page-header 3', (t) async { await t.pumpWidget(host(ForgePageHeader(
  titleId: "forge-page-title",
  pageTitle: Text("Meus registros"),
  description: Text("Gerencie seus registros"),
  identity: const ForgeAvatar(label: 'Equipe Forge', initials: 'F'),
  breadcrumb: ForgeBreadcrumb(label: 'Localização', children: [
    ForgeBreadcrumbItem(href: '/home', onActivate: () {}, child: const Text('Início')),
    const ForgeBreadcrumbItem(current: true, child: Text('Registros')),
  ]),
  actions: ForgeButton(onPressed: () {}, child: const Text('Adicionar')),
  divider: false,
))); await t.pump(); expect(t.takeException(), isNull); });
testWidgets('copyable breadcrumb 4', (t) async { await t.pumpWidget(host(ForgeBreadcrumb(
  label: "Localização",
  children: [
    // Replace this consumer-owned callback with your router.
    ForgeBreadcrumbItem(href: '/catalog', onActivate: () {}, child: Text("Entrada ' com \\ barra e\nlinha")),
    ForgeBreadcrumbItem(current: true, child: Text("Detalhes")),
  ],
))); await t.pump(); expect(t.takeException(), isNull); });
}
