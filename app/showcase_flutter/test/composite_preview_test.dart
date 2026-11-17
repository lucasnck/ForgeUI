import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';
import 'package:forge_ui_showcase_flutter/examples/composite_contracts.dart';
import 'package:forge_ui_showcase_flutter/examples/composite_examples.dart';
import 'package:forge_ui_showcase_flutter/preview_settings.dart';

Map<String, Object?> defaults(String slug) => {
  for (final entry in compositeContracts[slug]!.entries)
    entry.key: entry.value['defaultValue'],
};

Widget host(String slug, Map<String, Object?> properties,
    {ForgeThemeId theme = ForgeThemeId.light}) =>
    MaterialApp(
      theme: ForgeThemeData.forId(theme),
      home: Scaffold(
        body: SingleChildScrollView(
          child: SizedBox(
            width: 340,
            child: ForgeCompositeCatalogExample(
              slug: slug,
              properties: properties,
            ),
          ),
        ),
      ),
    );

void main() {
  test('only real, well-typed supported composition properties cross the bridge', () {
    expect(compositeContracts.length, 4);
    for (final slug in compositeContracts.keys) {
      final properties = defaults(slug);
      expect(validCompositeProperties(slug, properties), isTrue, reason: slug);
      expect(validCompositeProperties(slug, {...properties, 'unknown': true}),
          isFalse, reason: slug);
      expect(ForgePreviewSettings.fromMessage(jsonEncode({
        'version': 2,
        'type': 'forge-ui-preview',
        'component': slug,
        'properties': {'theme': 'dark', ...properties},
      })), isNotNull, reason: slug);
    }
    expect(validCompositeProperties('pagination', {'page': 5, 'pageCount': 2}),
        isFalse);
    expect(validCompositeProperties('pagination', {'page': 0}), isFalse);
    expect(validCompositeProperties('pagination', {'page': '2'}), isFalse);
    expect(validCompositeProperties('breadcrumb', {'label': '  '}), isFalse);
    expect(validCompositeProperties('tag-group', {'fullWidth': 'true'}), isFalse);
    expect(validCompositeProperties('missing', {}), isFalse);
  });

  for (final slug in compositeContracts.keys) {
    for (final theme in ForgeThemeId.values) {
      testWidgets('native $slug in $theme', (tester) async {
        await tester.pumpWidget(host(slug, defaults(slug), theme: theme));
        await tester.pump();
        expect(tester.takeException(), isNull);
        await tester.pumpWidget(const SizedBox());
        expect(tester.takeException(), isNull);
      });
    }
  }

  testWidgets('breadcrumb delegates navigation; current item is passive',
      (tester) async {
    await tester.pumpWidget(host('breadcrumb', defaults('breadcrumb')));
    await tester.tap(find.text('Catálogo'));
    await tester.pump();
    expect(find.text('Alterações: 1'), findsOneWidget);
    expect(find.text('Navegação solicitada: /catalog'), findsOneWidget);
    expect(find.byType(ForgeLink), findsOneWidget);
    expect(tester.takeException(), isNull);
  });

  testWidgets('pagination is controlled by caller and ignores disabled requests',
      (tester) async {
    final properties = defaults('pagination');
    await tester.pumpWidget(host('pagination', properties));
    await tester.tap(find.text('3'));
    await tester.pump();
    expect(tester.widget<ForgePagination>(find.byType(ForgePagination)).page, 3);
    expect(find.text('Alterações: 1'), findsOneWidget);
    await tester.pumpWidget(host('pagination', {
      ...properties,
      'page': 1,
      'disabled': true,
    }));
    await tester.pump();
    await tester.tap(find.text('3'));
    await tester.pump();
    expect(find.text('Alterações: 1'), findsOneWidget);
    expect(tester.widget<ForgePagination>(find.byType(ForgePagination)).page, 1);
    expect(tester.takeException(), isNull);
  });

  testWidgets('pagination rejects duplicate page targets', (tester) async {
    await tester.pumpWidget(MaterialApp(
      theme: ForgeThemeData.light(),
      home: Scaffold(body: ForgePagination(
        label: 'Páginas',
        page: 1,
        pageCount: 2,
        onPageChange: (_) {},
        children: const [
          ForgePaginationItem(page: 1, label: 'Um'),
          ForgePaginationItem(page: 1, label: 'Duplicado'),
        ],
      )),
    ));
    expect(tester.takeException(), isArgumentError);
  });

  testWidgets('tag removal is owned by fixture, stable entries survive',
      (tester) async {
    await tester.pumpWidget(host('tag-group', defaults('tag-group')));
    expect(find.byType(ForgeTagGroupItem), findsNWidgets(3));
    await tester.tap(find.byType(ForgeIconButton).first);
    await tester.pump();
    expect(find.byType(ForgeTagGroupItem), findsNWidgets(2));
    expect(find.text('Alterações: 1'), findsOneWidget);
    await tester.tap(find.text('Restaurar tags'));
    await tester.pump();
    expect(find.byType(ForgeTagGroupItem), findsNWidgets(3));
    expect(tester.takeException(), isNull);
  });

  testWidgets('page header retains heading and action identity after edits',
      (tester) async {
    final properties = defaults('page-header');
    await tester.pumpWidget(host('page-header', properties));
    expect(find.text('Meus registros'), findsOneWidget);
    await tester.tap(find.text('Adicionar'));
    await tester.pump();
    expect(find.text('Alterações: 1'), findsOneWidget);
    await tester.pumpWidget(host('page-header', {
      ...properties,
      'pageTitle': 'Pedidos',
      'divider': true,
    }));
    await tester.pump();
    expect(find.text('Pedidos'), findsOneWidget);
    expect(find.byType(ForgeDivider), findsOneWidget);
    expect(find.text('Alterações: 1'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });
}
