import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';
import 'package:forge_ui_showcase_flutter/preview_settings.dart';
import 'package:forge_ui_showcase_flutter/examples/advanced_contracts.dart';
import 'package:forge_ui_showcase_flutter/examples/advanced_examples.dart';

Map<String, Object?> defaults(String s) => {
      for (final e in advancedContracts[s]!.entries)
        e.key: e.value['defaultValue']
    };
Widget host(String slug, Map<String, Object?> p,
        {ForgeThemeId theme = ForgeThemeId.light}) =>
    MaterialApp(
        theme: ForgeThemeData.forId(theme),
        home: Scaffold(
            body: SingleChildScrollView(
                child: SizedBox(
                    width: 320,
                    child: ForgeAdvancedExample(slug: slug, properties: p)))));
void main() {
  test('advanced contracts validate finite bridge messages', () {
    expect(advancedContracts.length, 30);
    for (final slug in advancedContracts.keys) {
      final p = defaults(slug);
      expect(validAdvancedProperties(slug, p), isTrue);
      expect(validAdvancedProperties(slug, {...p, 'unknown': true}), isFalse);
      expect(
          ForgePreviewSettings.fromMessage(jsonEncode({
            'version': 2,
            'type': 'forge-ui-preview',
            'component': slug,
            'properties': {'theme': 'light', ...p}
          })),
          isNotNull,
          reason: slug);
    }
  });
  for (final slug in advancedContracts.keys) {
    for (final theme in ForgeThemeId.values) {
      testWidgets('$slug in $theme at 320 pixels', (t) async {
        await t.pumpWidget(host(slug, defaults(slug), theme: theme));
        await t.pumpAndSettle();
        expect(t.takeException(), isNull);
        await t.pumpWidget(const SizedBox());
        await t.pump();
        expect(t.takeException(), isNull);
      });
    }
  }
  testWidgets('data grid sorts caller data and emits once per activation',
      (t) async {
    await t.pumpWidget(host('data-grid', defaults('data-grid')));
    await t.tap(find.text('Nome'));
    await t.pumpAndSettle();
    expect(t.getTopLeft(find.text('Alpha')).dy,
        lessThan(t.getTopLeft(find.text('Beta')).dy));
    expect(find.text('Solicitações: 1'), findsOneWidget);
    await t.tap(find.text('Nome'));
    await t.pumpAndSettle();
    expect(t.getTopLeft(find.text('Gamma')).dy,
        lessThan(t.getTopLeft(find.text('Beta')).dy));
  });
  testWidgets('tree grid expands native branch through keyboard', (t) async {
    await t.pumpWidget(host('tree-grid', defaults('tree-grid')));
    await t.tap(find.text('Equipe'));
    await t.sendKeyEvent(LogicalKeyboardKey.enter);
    await t.pumpAndSettle();
    expect(find.text('Pessoa'), findsOneWidget);
    expect(find.text('Solicitações: 1'), findsOneWidget);
  });
  testWidgets('page transition swaps real current screen', (t) async {
    await t.pumpWidget(host('page-transition', defaults('page-transition')));
    await t.tap(find.text('Trocar tela'));
    await t.pumpAndSettle();
    expect(find.text('Tela 1'), findsOneWidget);
    expect(find.text('Tela 0'), findsNothing);
  });
  testWidgets('shared element uses caller navigation and can return',
      (t) async {
    await t.pumpWidget(host('shared-element', defaults('shared-element')));
    await t.tap(find.text('Abrir destino'));
    await t.pumpAndSettle();
    expect(find.text('Voltar'), findsOneWidget);
    await t.tap(find.text('Voltar'));
    await t.pumpAndSettle();
    expect(find.text('Abrir destino'), findsOneWidget);
    expect(t.takeException(), isNull);
  });
  testWidgets(
      'OData preserves exact decimal and emits authoritative serialization',
      (t) async {
    await t.pumpWidget(host('odata-filter', defaults('odata-filter')));
    await t.enterText(find.byType(EditableText), '9007199254740993.0100');
    await t.pump();
    await t.ensureVisible(find.text('Aplicar'));
    await t.tap(find.text('Aplicar'));
    await t.pumpAndSettle();
    expect(find.text('(Amount eq 9007199254740993.0100)'), findsOneWidget);
    expect(t.takeException(), isNull);
  });
}
