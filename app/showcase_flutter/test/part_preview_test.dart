import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';
import 'package:forge_ui_showcase_flutter/preview_settings.dart';
import 'package:forge_ui_showcase_flutter/examples/part_contracts.dart';
import 'package:forge_ui_showcase_flutter/examples/part_examples.dart';

Map<String, Object?> defaults(String slug) => {
      for (final e in partContracts[slug]!.entries)
        e.key: e.value['defaultValue']
    };
Widget host(String slug, {ForgeThemeId theme = ForgeThemeId.light}) =>
    MaterialApp(
        theme: ForgeThemeData.forId(theme),
        home: Scaffold(
            body: SingleChildScrollView(
                child: SizedBox(
                    width: 320,
                    child: ForgePartExample(
                        slug: slug, properties: defaults(slug))))));
void main() {
  test('19 contextual parts have finite native bridge contracts', () {
    expect(partContracts.length, 19);
    for (final slug in partContracts.keys) {
      expect(validPartProperties(slug, {...defaults(slug), 'unknown': true}),
          isFalse);
      expect(
          ForgePreviewSettings.fromMessage(jsonEncode({
            'version': 2,
            'type': 'forge-ui-preview',
            'component': slug,
            'properties': {'theme': 'light', ...defaults(slug)}
          })),
          isNotNull);
    }
  });
  for (final slug in partContracts.keys) {
    for (final theme in ForgeThemeId.values) {
      testWidgets('contextual $slug in $theme', (t) async {
        await t.pumpWidget(host(slug, theme: theme));
        await t.pump();
        expect(t.takeException(), isNull);
        await t.pumpWidget(const SizedBox());
        await t.pump();
        expect(t.takeException(), isNull);
      });
    }
  }
  testWidgets('loading footer action is a real public part', (t) async {
    await t.pumpWidget(host('loading-state-footer'));
    expect(find.byType(ForgeLoadingStateFooter), findsOneWidget);
    await t.tap(find.text('Executar'));
    await t.pump();
    expect(find.text('Ações: 1'), findsOneWidget);
  });
  testWidgets('pagination gaps are structural and targets remain unique',
      (t) async {
    await t.pumpWidget(host('pagination-ellipsis'));
    expect(find.byType(ForgePaginationEllipsis), findsNWidgets(2));
    await t.tap(
        find.byWidgetPredicate((w) => w is ForgePaginationItem && w.page == 9));
    await t.pump();
    expect(t.widget<ForgePagination>(find.byType(ForgePagination)).page, 9);
    expect(t.takeException(), isNull);
  });
  testWidgets('tag group owns canonical item and removal', (t) async {
    await t.pumpWidget(host('tag-group-item'));
    expect(find.byType(ForgeTagGroupItem), findsOneWidget);
    await t.tap(find.descendant(
        of: find.byType(ForgeTagGroupItem),
        matching: find.byType(ForgeIconButton)));
    await t.pump();
    expect(find.byType(ForgeTagGroupItem), findsNothing);
  });
}
