import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';
import 'package:forge_ui_showcase_flutter/examples/feedback_contracts.dart';
import 'package:forge_ui_showcase_flutter/examples/feedback_examples.dart';
import 'package:forge_ui_showcase_flutter/preview_settings.dart';

Map<String, Object?> defaults(String slug) => {
  for (final field in feedbackContracts[slug]!.entries)
    field.key: field.value['defaultValue'],
};
Widget host(String slug, Map<String, Object?> properties,
    {ForgeThemeId theme = ForgeThemeId.light}) =>
  MaterialApp(
    theme: ForgeThemeData.forId(theme),
    home: Scaffold(body: SingleChildScrollView(child: SizedBox(
      width: 420,
      child: ForgeFeedbackCatalogExample(slug: slug, properties: properties),
    ))),
  );

void main() {
  test('bridge rejects unknown, malformed, and invalid values', () {
    expect(feedbackContracts.length, 5);
    for (final slug in feedbackContracts.keys) {
      final props = defaults(slug);
      expect(validFeedbackProperties(slug, props), isTrue, reason: slug);
      expect(validFeedbackProperties(slug, {...props, 'unsupported': true}),
          isFalse, reason: slug);
      expect(ForgePreviewSettings.fromMessage(jsonEncode({
        'version': 2,
        'type': 'forge-ui-preview',
        'component': slug,
        'properties': {'theme': 'dark', ...props},
      })), isNotNull, reason: slug);
    }
    expect(validFeedbackProperties('card', {'elevation': 'absolute'}), isFalse);
    expect(validFeedbackProperties('alert', {'announcement': 'disabled'}), isFalse);
    expect(validFeedbackProperties('empty-state', {'showAction': 'yes'}), isFalse);
    expect(validFeedbackProperties('loading-state', {'label': ' '}), isFalse);
    expect(validFeedbackProperties('unknown', {}), isFalse);
  });

  for (final slug in feedbackContracts.keys) {
    for (final theme in ForgeThemeId.values) {
      testWidgets('real feedback $slug renders in $theme', (tester) async {
        await tester.pumpWidget(host(slug, defaults(slug), theme: theme));
        await tester.pump(const Duration(milliseconds: 100));
        expect(tester.takeException(), isNull);
        await tester.pumpWidget(const SizedBox());
      });
    }
  }

  testWidgets('card action is independent and edits preserve consumer state',
      (tester) async {
    final props = defaults('card');
    await tester.pumpWidget(host('card', props));
    await tester.tap(find.text('Abrir'));
    await tester.pump();
    expect(find.text('Ações: 1'), findsOneWidget);
    await tester.pumpWidget(host('card', {...props, 'titleText': 'Pedidos'}));
    await tester.pump();
    expect(find.text('Pedidos'), findsOneWidget);
    expect(find.text('Ações: 1'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });

  testWidgets('empty state can omit footer, no implicit action', (tester) async {
    final props = defaults('empty-state');
    await tester.pumpWidget(host('empty-state', {...props, 'showAction': false}));
    expect(find.text('Criar registro'), findsNothing);
    expect(find.text('Ações: 0'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });

  testWidgets('error retry only invokes caller callback', (tester) async {
    await tester.pumpWidget(host('error-state', defaults('error-state')));
    expect(find.text('Ações: 0'), findsOneWidget);
    await tester.tap(find.text('Tentar novamente'));
    await tester.pump();
    expect(find.text('Ações: 1'), findsOneWidget);
    expect(find.text('Ação solicitada: Tentar novamente'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });

  testWidgets('loading status includes a decorative spinner and required label',
      (tester) async {
    await tester.pumpWidget(host('loading-state', defaults('loading-state')));
    expect(find.byType(ForgeSpinner), findsOneWidget);
    expect(find.text('Carregando registros'), findsOneWidget);
    expect(find.text('Ações: 0'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });
}
