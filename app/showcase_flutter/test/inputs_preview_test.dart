import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';
import 'package:forge_ui_showcase_flutter/preview_settings.dart';
import 'package:forge_ui_showcase_flutter/main.dart';
import 'package:forge_ui_showcase_flutter/examples/inputs_generated.dart';
import 'package:forge_ui_showcase_flutter/examples/input_contracts.dart';

Widget host(String slug, Map<String, Object?> props,
        {ForgeThemeId theme = ForgeThemeId.light}) =>
    MaterialApp(
        theme: ForgeThemeData.forId(theme),
        home: Scaffold(
            body: SingleChildScrollView(
                child: SizedBox(
                    width: 560,
                    child: ForgeInputCatalogExample(
                        slug: slug, properties: props)))));
Map<String, Object?> defaults(String slug) => {
      for (final e in (inputContracts[slug] as Map).entries)
        e.key as String: (e.value as Map)['defaultValue']
    };
void main() {
  test('all input bridge contracts reject unknown properties and wrong types',
      () {
    expect(inputContracts.length, 36);
    for (final slug in inputContracts.keys) {
      final props = defaults(slug);
      expect(validInputProperties(slug, props), isTrue, reason: slug);
      expect(validInputProperties(slug, {...props, 'unknown': true}), isFalse);
      expect(
          ForgePreviewSettings.fromMessage(jsonEncode({
            'version': 2,
            'type': 'forge-ui-preview',
            'component': slug,
            'properties': {'theme': 'light', ...props}
          })),
          isNotNull,
          reason: slug);
    }
    expect(validInputProperties('input', {'disabled': 'false'}), isFalse);
    expect(validInputProperties('slider', {'value': 101}), isFalse);
    expect(validInputProperties('masked-input', {'mask': ''}), isFalse);
  });
  for (final slug in inputContracts.keys) {
    for (final theme in ForgeThemeId.values) {
      testWidgets('native input $slug in $theme', (t) async {
        await t.pumpWidget(host(slug, defaults(slug), theme: theme));
        await t.pump(const Duration(milliseconds: 100));
        expect(t.takeException(), isNull);
        await t.pumpWidget(const SizedBox());
        await t.pump();
        expect(t.takeException(), isNull);
      });
    }
  }
  testWidgets(
      'input owner accepts edits once and property edits preserve event count',
      (t) async {
    final props = defaults('input');
    await t.pumpWidget(host('input', props));
    await t.enterText(find.byType(TextField), 'Digitado');
    await t.pump();
    expect(find.text('Alterações: 1'), findsOneWidget);
    await t.pumpWidget(host('input', {...props, 'value': 'Pelo painel'}));
    await t.pump();
    expect(t.widget<TextField>(find.byType(TextField)).controller!.text,
        'Pelo painel');
    expect(find.text('Alterações: 1'), findsOneWidget);
  });
  testWidgets(
      'file fixture exercises the real picker port and reports selected file',
      (t) async {
    final props = defaults('file-input');
    await t.pumpWidget(host('file-input', props));
    await t.tap(find.text(props['chooserLabel'] as String));
    await t.pump();
    await t.pump();
    expect(find.text('Alterações: 1'), findsOneWidget);
    expect(find.text('example.txt'), findsWidgets);
  });
  testWidgets('entrypoint mounts an input target instead of unavailable state',
      (t) async {
    await t.pumpWidget(
        ForgeFlutterPreview(initialComponent: 'input', connect: (_) => () {}));
    await t.pump();
    expect(find.byType(ForgeInput), findsOneWidget);
    expect(find.text('Flutter preview unavailable for this component.'),
        findsNothing);
  });
}
