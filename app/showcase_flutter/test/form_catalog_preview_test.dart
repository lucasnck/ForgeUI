import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';
import 'package:forge_ui_showcase_flutter/main.dart';
import 'package:forge_ui_showcase_flutter/preview_settings.dart';
import 'package:forge_ui_showcase_flutter/examples/form_catalog_contracts.dart';
import 'package:forge_ui_showcase_flutter/examples/form_catalog_examples.dart';

Map<String, Object?> defaults(String slug) => {
      for (final e in formCatalogContracts[slug]!.entries)
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
                        ForgeFormCatalogExample(slug: slug, properties: p)))));
void main() {
  test('14 finite form/list contracts validate exact message values', () {
    expect(formCatalogContracts.length, 14);
    for (final slug in formCatalogContracts.keys) {
      final p = defaults(slug);
      expect(validFormCatalogProperties(slug, p), isTrue);
      expect(
          validFormCatalogProperties(slug, {...p, 'unknown': true}), isFalse);
      expect(
          ForgePreviewSettings.fromMessage(jsonEncode({
            'version': 2,
            'type': 'forge-ui-preview',
            'component': slug,
            'properties': {'theme': 'light', ...p}
          })),
          isNotNull);
    }
    expect(validFormCatalogProperties('form', {'required': 'yes'}), isFalse);
    expect(validFormCatalogProperties('form-field', {'label': ''}), isFalse);
  });
  for (final slug in formCatalogContracts.keys) {
    for (final theme in ForgeThemeId.values) {
      testWidgets('form/list $slug at 320 logical pixels in $theme', (t) async {
        await t.pumpWidget(host(slug, defaults(slug), theme: theme));
        await t.pump();
        expect(t.takeException(), isNull);
        await t.pumpWidget(const SizedBox());
        await t.pump();
        expect(t.takeException(), isNull);
      });
    }
  }
  testWidgets(
      'required form validates, submits named value and submitter then resets',
      (t) async {
    await t.pumpWidget(host('form', defaults('form')));
    await t.tap(find.text('Enviar'));
    await t.pump();
    expect(find.text('Preencha o campo.'), findsOneWidget);
    expect(find.textContaining('Envios: 0'), findsOneWidget);
    await t.enterText(find.byType(TextField), 'test@example.com');
    await t.pump();
    await t.tap(find.text('Enviar'));
    await t.pump();
    expect(find.text('Enviado: test@example.com | ação: save'), findsOneWidget);
    expect(find.textContaining('Envios: 1'), findsOneWidget);
    await t.tap(find.text('Restaurar'));
    await t.pump();
    expect(
        t.widget<TextField>(find.byType(TextField)).controller!.text, isEmpty);
    expect(find.textContaining('Resets: 1'), findsOneWidget);
  });
  testWidgets('cancelled submit and reset retain entered value', (t) async {
    final p = {...defaults('form'), 'cancelSubmit': true, 'cancelReset': true};
    await t.pumpWidget(host('form', p));
    await t.enterText(find.byType(TextField), 'Mantido');
    await t.pump();
    await t.tap(find.text('Enviar'));
    await t.pump();
    expect(find.text('Envio cancelado'), findsOneWidget);
    await t.tap(find.text('Restaurar'));
    await t.pump();
    expect(find.text('Reset cancelado'), findsOneWidget);
    expect(t.widget<TextField>(find.byType(TextField)).controller!.text,
        'Mantido');
    expect(find.textContaining('Envios: 0'), findsOneWidget);
    expect(find.textContaining('Resets: 0'), findsOneWidget);
  });
  testWidgets(
      'typed model edits and provider errors preserve displayed override and validity',
      (t) async {
    final p = {
      ...defaults('form-field-input'),
      'modelValue': 'initial',
      'providerError': 'Erro do provider',
      'errorOverride': 'Erro exibido'
    };
    await t.pumpWidget(host('form-field-input', p));
    expect(find.text('Erro exibido'), findsOneWidget);
    expect(find.text('Erro do provider'), findsNothing);
    await t.tap(find.text('Enviar'));
    await t.pump();
    expect(find.textContaining('Envios: 0'), findsOneWidget);
    await t.pumpWidget(host('form-field-input', {
      ...p,
      'providerError': '',
      'errorOverride': '',
      'modelValue': 'Atualizado'
    }));
    await t.pump();
    expect(t.widget<TextField>(find.byType(TextField)).controller!.text,
        'Atualizado');
    expect(find.text('Erro exibido'), findsNothing);
    await t.tap(find.text('Enviar'));
    await t.pump();
    expect(find.text('Enviado: Atualizado | ação: save'), findsOneWidget);
  });
  testWidgets('disabled owner blocks editing and loading suppresses submission',
      (t) async {
    final p = {...defaults('form'), 'disabled': true, 'loading': true};
    await t.pumpWidget(host('form', p));
    expect(t.widget<TextField>(find.byType(TextField)).enabled, isFalse);
    await t.tap(find.text('Enviando'));
    await t.pump();
    expect(find.textContaining('Envios: 0'), findsOneWidget);
  });
  testWidgets('list is passive while footer action is independent', (t) async {
    await t.pumpWidget(host('list', defaults('list')));
    await t.tap(find.text('Primeiro registro'));
    await t.pump();
    expect(find.text('Ações: 0'), findsOneWidget);
    await t.tap(find.text('Adicionar'));
    await t.pump();
    expect(find.text('Ações: 1'), findsOneWidget);
  });
  testWidgets('entrypoint mounts native typed form', (t) async {
    await t.pumpWidget(ForgeFlutterPreview(
        initialComponent: 'form-field-input', connect: (_) => () {}));
    await t.pump();
    expect(find.byType(ForgeFormFieldInput<ForgeDemoProfile>), findsOneWidget);
    expect(find.text('Flutter preview unavailable for this component.'),
        findsNothing);
  });
}
