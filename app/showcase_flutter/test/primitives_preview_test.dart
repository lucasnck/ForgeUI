import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';
import 'package:forge_ui_showcase_flutter/preview_settings.dart';
import 'package:forge_ui_showcase_flutter/examples/primitives_generated.dart';

String message(String slug, Map<String, Object?> props) => jsonEncode({
      'version': 2,
      'type': 'forge-ui-preview',
      'component': slug,
      'properties': {'theme': 'light', ...props}
    });
void main() {
  test('primitive bridge validates exact finite constructor controls', () {
    expect(primitiveContracts.length, 20);
    expect(
        ForgePreviewSettings.fromMessage(message('text', {'text': 'Alterado'}))!
            .catalogProperties['text'],
        'Alterado');
    for (final entry in [
      message('text', {'text': false}),
      message('text', {'unexpected': true}),
      message('text', {'tone': 'invalid'}),
      message('heading', {'level': 7}),
      message('meter', {'value': 101}),
      message('unknown', {})
    ]) expect(ForgePreviewSettings.fromMessage(entry), isNull);
  });
  for (final slug in primitiveContracts.keys) {
    for (final theme in ForgeThemeId.values) {
      testWidgets('real primitive fixture $slug in $theme', (t) async {
        final fields = primitiveContracts[slug] as Map;
        final props = <String, Object?>{
          for (final e in fields.entries)
            e.key as String: (e.value as Map)['defaultValue']
        };
        expect(validPrimitiveProperties(slug, props), isTrue);
        await t.pumpWidget(MaterialApp(
            theme: ForgeThemeData.forId(theme),
            home: Scaffold(
                body: SingleChildScrollView(
                    child: SizedBox(
                        width: 560, child: primitiveExample(slug, props))))));
        await t.pump(const Duration(milliseconds: 150));
        expect(t.takeException(), isNull);
        await t.pumpWidget(const SizedBox());
        await t.pump();
        expect(t.takeException(), isNull);
      });
    }
  }
  testWidgets('text property edit updates the real native widget', (t) async {
    Widget host(String text) => MaterialApp(
        theme: ForgeThemeData.light(),
        home: Scaffold(
            body: primitiveExample('text', {'text': text, 'size': 'xl'})));
    await t.pumpWidget(host('Antes'));
    expect(find.text('Antes'), findsOneWidget);
    await t.pumpWidget(host('Depois'));
    expect(find.text('Antes'), findsNothing);
    expect(find.text('Depois'), findsOneWidget);
  });
  testWidgets('label preview focuses its owned native input', (t) async {
    await t.pumpWidget(MaterialApp(
        theme: ForgeThemeData.light(),
        home: Scaffold(body: primitiveExample('label', {'text': 'Nome'}))));
    await t.tap(find.text('Nome'));
    await t.pump();
    expect(t.widget<TextField>(find.byType(TextField)).focusNode!.hasFocus,
        isTrue);
    await t.pumpWidget(const SizedBox());
    await t.pump();
    expect(t.takeException(), isNull);
  });
  testWidgets('link activation is observable and survives property edits',
      (t) async {
    Widget host(String href) => MaterialApp(
        theme: ForgeThemeData.light(),
        home: Scaffold(body: primitiveExample('link', {'href': href})));
    await t.pumpWidget(host('/one'));
    await t.tap(find.text('Abrir exemplo'));
    await t.pump();
    expect(find.text('Ativações: 1'), findsOneWidget);
    await t.pumpWidget(host('/two'));
    expect(find.text('Ativações: 1'), findsOneWidget);
    await t.tap(find.text('Abrir exemplo'));
    await t.pump();
    expect(find.text('Ativações: 2'), findsOneWidget);
  });
}
