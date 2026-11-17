import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';
import 'package:forge_ui_showcase_flutter/main.dart';
import 'package:forge_ui_showcase_flutter/preview_settings.dart';

String message(
        {String label = 'Novo conteúdo',
        bool enabled = true,
        bool loading = false,
        bool outlined = true,
        String theme = 'dark'}) =>
    jsonEncode({
      'version': 1,
      'type': 'forge-ui-preview',
      'component': 'button',
      'properties': {
        'theme': theme,
        'child': label,
        'enabled': enabled,
        'loading': loading,
        'outlined': outlined,
      },
    });

void main() {
  test('preview rejects malformed or unsupported messages', () {
    expect(ForgePreviewSettings.fromMessage('invalid'), isNull);
    expect(ForgePreviewSettings.fromMessage(message(theme: 'unknown')), isNull);
    expect(
        ForgePreviewSettings.fromMessage(
            message().replaceFirst('"version":1', '"version":2')),
        isNull);
    expect(ForgePreviewSettings.fromMessage(message(label: 'x' * 201)), isNull);
    expect(
        ForgePreviewSettings.fromMessage(message())?.theme, ForgeThemeId.dark);
  });
  testWidgets(
      'live properties reach the real button without resetting its counter',
      (tester) async {
    late void Function(String) update;
    var disconnected = false;
    await tester.pumpWidget(ForgeFlutterPreview(connect: (receive) {
      update = receive;
      return () {
        disconnected = true;
      };
    }));
    await tester.tap(find.text('Salvar alterações'));
    await tester.pump();
    expect(find.text('Cliques: 1'), findsOneWidget);
    update(message());
    await tester.pumpAndSettle();
    expect(find.byType(OutlinedButton), findsOneWidget);
    expect(find.text('Novo conteúdo'), findsOneWidget);
    expect(find.text('Cliques: 1'), findsOneWidget);
    expect(ForgeThemeTokens.of(tester.element(find.byType(ForgeButton))).id,
        ForgeThemeId.dark);
    update(message(loading: true));
    await tester.pump();
    await tester.tap(find.text('Novo conteúdo'));
    await tester.pump();
    expect(find.text('Cliques: 1'), findsOneWidget);
    update(message(enabled: false, loading: false));
    await tester.pump();
    await tester.tap(find.text('Novo conteúdo'));
    await tester.pump();
    expect(find.text('Cliques: 1'), findsOneWidget);
    await tester.pumpWidget(const SizedBox());
    expect(disconnected, isTrue);
  });
  test('native settings preserve all Button enums and reject malformed values',
      () {
    String encode(Map<String, Object?> properties,
            {String component = 'button'}) =>
        jsonEncode({
          'version': 1,
          'type': 'forge-ui-preview',
          'component': component,
          'properties': {'theme': 'light', ...properties},
        });
    final parsed = ForgePreviewSettings.fromMessage(encode({
      'size': 'xl',
      'tone': 'forest',
      'appearance': 'bordered',
      'shape': 'pill',
      'variant': 'outline',
      'fullWidth': true,
      'disabled': true,
      'loadingLabel': 'Aguarde',
      'onPressed': true,
      'autofocus': true,
    }))!;
    expect(parsed.size, ForgeSize.xl);
    expect(parsed.tone, ForgeTone.forest);
    expect(parsed.appearance, ForgeAppearance.bordered);
    expect(parsed.shape, ForgeShape.pill);
    expect(parsed.disabled, isTrue);
    expect(parsed.fullWidth, isTrue);
    expect(parsed.autofocus, isTrue);
    for (final value in ['bad', 42, true, null]) {
      expect(ForgePreviewSettings.fromMessage(encode({'size': value})), isNull);
    }
    expect(
        ForgePreviewSettings.fromMessage(encode({'disabled': 'true'})), isNull);
    expect(
        ForgePreviewSettings.fromMessage(
            encode({'decorative': false, 'label': ' '}, component: 'spinner')),
        isNull);
  });

  testWidgets(
      'Spinner and ButtonGroup previews use real widgets and live settings',
      (tester) async {
    late void Function(String) update;
    Future<void> mount(String component) async {
      await tester.pumpWidget(ForgeFlutterPreview(
          key: ValueKey(component),
          initialComponent: component,
          connect: (receive) {
            update = receive;
            return () {};
          }));
      await tester.pump();
    }

    await mount('spinner');
    update(jsonEncode({
      'version': 1,
      'type': 'forge-ui-preview',
      'component': 'spinner',
      'properties': {
        'theme': 'dark',
        'size': 'lg',
        'tone': 'sky',
        'animated': false,
        'decorative': false,
        'label': 'Carregando'
      }
    }));
    await tester.pump();
    final spinner = tester.widget<ForgeSpinner>(find.byType(ForgeSpinner));
    expect(spinner.size, ForgeSize.lg);
    expect(spinner.animated, isFalse);
    expect(spinner.decorative, isFalse);
    await mount('button-group');
    expect(tester.widget<ForgeButtonGroup>(find.byType(ForgeButtonGroup)).label,
        'Ações');
    update(jsonEncode({
      'version': 1,
      'type': 'forge-ui-preview',
      'component': 'button-group',
      'properties': {
        'theme': 'light',
        'label': 'Operações',
        'gap': 's4',
        'padding': 's2',
        'fullWidth': true
      }
    }));
    await tester.pump();
    final group =
        tester.widget<ForgeButtonGroup>(find.byType(ForgeButtonGroup));
    expect(group.label, 'Operações');
    expect(group.gap, ForgeSpace.s4);
    await tester.tap(find.text('Salvar'));
    await tester.pump();
    expect(find.text('Salvar: 1 · Cancelar: 0'), findsOneWidget);
  });

  testWidgets(
      'hierarchy exposes danger only after an explicit confirmation request',
      (tester) async {
    late void Function(String) update;
    await tester.pumpWidget(ForgeFlutterPreview(connect: (receive) {
      update = receive;
      return () {};
    }));
    update(jsonEncode({
      'version': 1,
      'type': 'forge-ui-preview',
      'component': 'button',
      'properties': {'theme': 'light', 'scenario': 'crud-hierarchy'}
    }));
    await tester.pump();
    expect(find.text('Confirmar exclusão'), findsNothing);
    await tester.tap(find.text('Revisar exclusão'));
    await tester.pump();
    expect(find.text('Confirmar exclusão'), findsOneWidget);
    await tester.tap(find.text('Cancelar'));
    await tester.pump();
    expect(find.text('Confirmar exclusão'), findsNothing);
  });
}
