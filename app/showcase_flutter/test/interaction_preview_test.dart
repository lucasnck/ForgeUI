import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';
import 'package:forge_ui_showcase_flutter/main.dart';
import 'package:forge_ui_showcase_flutter/preview_settings.dart';
import 'package:forge_ui_showcase_flutter/examples/interaction_contracts.dart';
import 'package:forge_ui_showcase_flutter/examples/interactions_generated.dart';

Map<String, Object?> defaults(String slug) => {
      for (final e in interactionContracts[slug]!.entries)
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
                        ForgeInteractionExample(slug: slug, properties: p)))));
void main() {
  test('26 finite contracts validate defaults and reject unsupported changes',
      () {
    expect(interactionContracts.length, 26);
    for (final slug in interactionContracts.keys) {
      final p = defaults(slug);
      expect(validInteractionProperties(slug, p), isTrue, reason: slug);
      expect(
          validInteractionProperties(slug, {...p, 'unknown': true}), isFalse);
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
    expect(validInteractionProperties('tabs', {'direction': 'bad'}), isFalse);
    expect(validInteractionProperties('accordion', {'level': 7}), isFalse);
    expect(
        validInteractionProperties(
            'accordion', {'expanded': 'both', 'multiple': false}),
        isFalse);
  });
  for (final slug in interactionContracts.keys) {
    for (final theme in ForgeThemeId.values) {
      testWidgets('native interaction $slug at 320 logical pixels in $theme',
          (t) async {
        await t.pumpWidget(host(slug, defaults(slug), theme: theme));
        await t.pump(const Duration(milliseconds: 150));
        expect(t.takeException(), isNull);
        await t.pumpWidget(const SizedBox());
        await t.pump();
        expect(t.takeException(), isNull);
      });
    }
  }
  testWidgets(
      'checkbox group accepts then refuses requested changes without losing state',
      (t) async {
    final p = defaults('checkbox-group');
    await t.pumpWidget(host('checkbox-group', p));
    await t.pump();
    await t.tap(find.text('Primeiro'));
    await t.pump();
    expect(find.text('Alterações: 1'), findsOneWidget);
    expect(
        t.widgetList<ForgeCheckbox>(find.byType(ForgeCheckbox)).first.checked,
        isTrue);
    await t.pumpWidget(host('checkbox-group', {...p, 'acceptChanges': false}));
    await t.tap(find.text('Segundo'));
    await t.pump();
    expect(find.text('Alterações: 2'), findsOneWidget);
    expect(t.widgetList<ForgeCheckbox>(find.byType(ForgeCheckbox)).last.checked,
        isFalse);
    await t.pumpWidget(host('checkbox-group', {...p, 'disabled': true}));
    await t.tap(find.text('Primeiro'));
    await t.pump();
    expect(find.text('Alterações: 2'), findsOneWidget);
  });
  testWidgets(
      'tabs retain edited field state across panels and refuse controlled requests',
      (t) async {
    final p = defaults('tabs');
    await t.pumpWidget(host('tabs', p));
    await t.enterText(find.byType(TextField), 'Guardado');
    await t.pump();
    await t.tap(find.text('Segundo'));
    await t.pump();
    expect(find.text('Painel secundário'), findsOneWidget);
    await t.tap(find.text('Primeiro'));
    await t.pump();
    expect(t.widget<TextField>(find.byType(TextField)).controller!.text,
        'Guardado');
    expect(find.text('Alterações: 2'), findsOneWidget);
    await t.pumpWidget(host('tabs', {...p, 'acceptChanges': false}));
    await t.tap(find.text('Segundo'));
    await t.pump();
    expect(find.byType(TextField), findsOneWidget);
    expect(find.text('Alterações: 3'), findsOneWidget);
  });
  testWidgets('toolbar arrows skip disabled and activate one action',
      (t) async {
    await t.pumpWidget(
        host('toolbar', {...defaults('toolbar'), 'disableSecond': true}));
    await t.pump();
    final first = t.widgetList<ForgeButton>(find.byType(ForgeButton)).first;
    first.focusNode!.requestFocus();
    await t.pump();
    await t.sendKeyEvent(LogicalKeyboardKey.arrowRight);
    await t.pump();
    await t.sendKeyEvent(LogicalKeyboardKey.enter);
    await t.pump();
    expect(find.text('Solicitado: third'), findsOneWidget);
    expect(find.text('Alterações: 1'), findsOneWidget);
  });
  testWidgets(
      'collapse retains fields, repairs focus and honors rejected closure',
      (t) async {
    final p = {...defaults('collapse'), 'animated': false};
    await t.pumpWidget(host('collapse', p));
    await t.tap(find.text('Detalhes'));
    await t.pump();
    await t.enterText(find.byType(TextField), 'Mantido');
    await t.pump();
    await t.tap(find.text('Detalhes'));
    await t.pump();
    expect(find.byType(TextField), findsNothing);
    await t.tap(find.text('Detalhes'));
    await t.pump();
    expect(t.widget<TextField>(find.byType(TextField)).controller!.text,
        'Mantido');
    await t.pumpWidget(host('collapse', {...p, 'acceptChanges': false}));
    await t.tap(find.text('Detalhes'));
    await t.pump();
    expect(find.byType(TextField), findsOneWidget);
    expect(find.text('Alterações: 4'), findsOneWidget);
  });
  testWidgets(
      'accordion multiple and noncollapsible rules remain library-owned',
      (t) async {
    final p = {
      ...defaults('accordion'),
      'animated': false,
      'multiple': true,
      'collapsible': false
    };
    await t.pumpWidget(host('accordion', p));
    await t.tap(find.text('Primeiro'));
    await t.pump();
    await t.tap(find.text('Segundo'));
    await t.pump();
    expect(find.text('Conteúdo secundário'), findsOneWidget);
    expect(find.byType(TextField), findsOneWidget);
    await t.tap(find.text('Primeiro'));
    await t.pump();
    expect(find.byType(TextField), findsNothing);
    await t.tap(find.text('Segundo'));
    await t.pump();
    expect(find.text('Conteúdo secundário'), findsOneWidget);
    expect(find.text('Alterações: 3'), findsOneWidget);
  });
  testWidgets(
      'entrypoint mounts selected interaction instead of unavailable state',
      (t) async {
    await t.pumpWidget(
        ForgeFlutterPreview(initialComponent: 'tabs', connect: (_) => () {}));
    await t.pump();
    expect(find.byType(ForgeTabs), findsOneWidget);
    expect(find.text('Flutter preview unavailable for this component.'),
        findsNothing);
  });
}
