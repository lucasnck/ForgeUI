import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';
import 'package:forge_ui_showcase_flutter/main.dart';
import 'package:forge_ui_showcase_flutter/preview_settings.dart';
import 'package:forge_ui_showcase_flutter/examples/collection_contracts.dart';
import 'package:forge_ui_showcase_flutter/examples/collections_generated.dart';

Map<String, Object?> defaults(String slug) => {
      for (final e in collectionContracts[slug]!.entries)
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
                    child:
                        ForgeCollectionExample(slug: slug, properties: p)))));
void main() {
  test(
      '39 finite collection contracts accept defaults and reject unknown fields',
      () {
    expect(collectionContracts.length, 39);
    for (final slug in collectionContracts.keys) {
      final p = defaults(slug);
      expect(validCollectionProperties(slug, p), isTrue);
      expect(validCollectionProperties(slug, {...p, 'unknown': true}), isFalse);
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
    expect(validCollectionProperties('list-box', {'selectionMode': 'bad'}),
        isFalse);
  });
  for (final slug in collectionContracts.keys) {
    for (final theme in ForgeThemeId.values) {
      testWidgets('collection $slug at 320 logical pixels in $theme',
          (t) async {
        await t.pumpWidget(host(slug, defaults(slug), theme: theme));
        await t.pump();
        await t.pump();
        expect(t.takeException(), isNull);
        await t.pumpWidget(const SizedBox());
        await t.pump();
        expect(t.takeException(), isNull);
      });
    }
  }
  testWidgets('multiple listbox supports selection and controlled refusal',
      (t) async {
    final p = {...defaults('list-box'), 'selectionMode': 'multiple'};
    await t.pumpWidget(host('list-box', p));
    await t.tap(find.text('Alpha'));
    await t.pump();
    await t.tap(find.text('Beta'));
    await t.pump();
    expect(find.text('Seleção: first, second'), findsOneWidget);
    await t.pumpWidget(host('list-box', {...p, 'acceptChanges': false}));
    await t.tap(find.text('Alpha'));
    await t.pump();
    expect(
        t
            .widgetList<Semantics>(find.byType(Semantics))
            .where((s) => s.properties.selected == true)
            .length,
        2);
  });
  testWidgets(
      'query acceptance is keyboard accessible and combobox has a selection channel',
      (t) async {
    await t.pumpWidget(host('combobox', defaults('combobox')));
    await t.tap(find.byType(TextField));
    await t.pump();
    await t.pump();
    await t.sendKeyEvent(LogicalKeyboardKey.arrowDown);
    await t.pump();
    await t.sendKeyEvent(LogicalKeyboardKey.enter);
    await t.pump();
    expect(
        t.widget<TextField>(find.byType(TextField)).controller!.text, 'Alpha');
    expect(find.text('Seleção: first'), findsOneWidget);
  });
  testWidgets(
      'popup stays closed while disabled and actual item uses consumer controller',
      (t) async {
    final p = {...defaults('popup-listbox'), 'open': true, 'disabled': true};
    await t.pumpWidget(host('popup-listbox', p));
    await t.pump();
    expect(find.byType(ForgePopupListboxItem), findsNothing);
    await t.pumpWidget(
        host('popup-listbox', {...p, 'disabled': false, 'open': false}));
    await t.pump();
    await t.tap(find.byType(TextField));
    await t.pump();
    await t.pump();
    expect(find.byType(ForgePopupListboxItem), findsNWidgets(3));
    await t.tap(find.text('Alpha'));
    await t.pump();
    expect(find.text('Ação solicitada: Alpha'), findsOneWidget);
  });
  testWidgets(
      'menu dispatches once before dismissal and disabled items do not activate',
      (t) async {
    await t
        .pumpWidget(host('menu', {...defaults('menu'), 'disableSecond': true}));
    await t.tap(find.text('Beta'));
    await t.pump();
    expect(find.text('Solicitações: 0 · Fechamentos: 0'), findsOneWidget);
    await t.tap(find.text('Alpha'));
    await t.pump();
    expect(find.text('Solicitações: 1 · Fechamentos: 1'), findsOneWidget);
    expect(find.text('Ação solicitada: first'), findsOneWidget);
  });
  testWidgets('dropdown trigger opens a real menu and action closes it',
      (t) async {
    await t.pumpWidget(host('dropdown-menu', defaults('dropdown-menu')));
    await t.tap(find.text('Abrir ações'));
    await t.pump();
    await t.pump();
    await t.pump();
    expect(find.byType(ForgeMenu), findsOneWidget);
    await t.tap(find.text('Alpha'));
    await t.pump();
    await t.pump();
    expect(find.text('Ação solicitada: first'), findsOneWidget);
    expect(find.text('Alpha'), findsNothing);
  });
  testWidgets(
      'navigation delegates links and preserves independent nested disclosure',
      (t) async {
    await t.pumpWidget(host('navigation-menu', defaults('navigation-menu')));
    await t.tap(find.text('Alpha'));
    await t.pump();
    expect(find.text('Ação solicitada: /alpha'), findsOneWidget);
    await t.tap(find.text('Beta'));
    await t.pumpAndSettle();
    await t.tap(find.text('Terceiro'));
    await t.pump();
    expect(find.text('Ação solicitada: /third'), findsOneWidget);
  });
  testWidgets('tree preserves separate selection and expansion requests',
      (t) async {
    final p = defaults('tree');
    await t.pumpWidget(host('tree', p));
    expect(find.byType(ForgeTreeItem), findsWidgets);
    expect(find.byType(ForgeTreeGroup), findsWidgets);
    await t.tap(find.text('Beta'));
    await t.pump();
    expect(find.text('Seleção: child'), findsOneWidget);
    await t.pumpWidget(host('tree', {...p, 'expanded': 'none'}));
    await t.pump();
    expect(find.text('Beta'), findsNothing);
  });
  testWidgets('stepper retains field edits and can refuse a requested step',
      (t) async {
    final p = defaults('stepper');
    await t.pumpWidget(host('stepper', p));
    await t.enterText(find.byType(TextField), 'Mantido');
    await t.pump();
    await t.tap(find.text('Beta'));
    await t.pump();
    await t.tap(find.text('Alpha'));
    await t.pump();
    expect(t.widget<TextField>(find.byType(TextField)).controller!.text,
        'Mantido');
    await t.pumpWidget(host('stepper', {...p, 'acceptChanges': false}));
    await t.tap(find.text('Beta'));
    await t.pump();
    expect(find.byType(TextField), findsOneWidget);
  });
  testWidgets(
      'entrypoint routes collection targets to real native implementation',
      (t) async {
    await t.pumpWidget(ForgeFlutterPreview(
        initialComponent: 'list-box', connect: (_) => () {}));
    await t.pump();
    expect(find.byType(ForgeListBox), findsOneWidget);
  });
  testWidgets(
      'property selection edits do not overwrite the independent query channel',
      (t) async {
    final p = defaults('combobox');
    await t.pumpWidget(host('combobox', p));
    await t.enterText(find.byType(TextField), 'Al');
    await t.pump();
    await t.pumpWidget(host('combobox', {...p, 'selection': 'second'}));
    await t.pump();
    expect(t.widget<TextField>(find.byType(TextField)).controller!.text, 'Al');
    expect(find.text('Solicitações: 1 · Fechamentos: 0'), findsOneWidget);
  });
  testWidgets(
      'tree expansion property edits preserve nullable controlled selection',
      (t) async {
    final p = defaults('tree');
    await t.pumpWidget(host('tree', p));
    await t.tap(find.text('Beta'));
    await t.pump();
    await t.pumpWidget(host('tree', {...p, 'expanded': 'none'}));
    await t.pump();
    expect(t.widget<ForgeTree>(find.byType(ForgeTree)).value!.value, 'child');
    expect(find.text('Beta'), findsNothing);
  });
}
