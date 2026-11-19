import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';
import 'package:forge_ui_showcase_flutter/preview_settings.dart';
import 'package:forge_ui_showcase_flutter/examples/transient_contracts.dart';
import 'package:forge_ui_showcase_flutter/examples/transients_generated.dart';

Map<String, Object?> defaults(String slug) => {
      for (final e in transientContracts[slug]!.entries)
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
                    child: ForgeTransientExample(slug: slug, properties: p)))));
void main() {
  test('finite transient contracts validate bridge messages', () {
    expect(transientContracts.length, 25);
    for (final slug in transientContracts.keys) {
      final p = defaults(slug);
      expect(validTransientProperties(slug, p), isTrue);
      expect(validTransientProperties(slug, {...p, 'unknown': true}), isFalse);
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
  for (final slug in transientContracts.keys) {
    for (final theme in ForgeThemeId.values) {
      testWidgets('open $slug in $theme at 320 logical pixels', (t) async {
        await t.pumpWidget(host(
            slug,
            {
              ...defaults(slug),
              if (defaults(slug).containsKey('open')) 'open': true
            },
            theme: theme));
        await t.pumpAndSettle();
        expect(t.takeException(), isNull);
        await t.pumpWidget(const SizedBox());
        await t.pump();
        expect(t.takeException(), isNull);
      });
    }
  }
  for (final slug in ['modal', 'dialog', 'alert-dialog']) {
    testWidgets('$slug close restores focus and retains entered content',
        (t) async {
      await t.pumpWidget(host(slug, defaults(slug)));
      await t.tap(find.text('Abrir'));
      await t.pumpAndSettle();
      await t.enterText(find.byType(EditableText), 'preservado');
      await t.tap(find.text('Cancelar'));
      await t.pumpAndSettle();
      expect(find.byType(EditableText), findsNothing);
      expect(find.textContaining('Fechamentos: 1'), findsOneWidget);
      await t.tap(find.text('Abrir'));
      await t.pumpAndSettle();
      expect(t.widget<EditableText>(find.byType(EditableText)).controller.text,
          'preservado');
      expect(t.takeException(), isNull);
    });
    testWidgets('$slug accepts cancellation veto', (t) async {
      await t.pumpWidget(host(
          slug, {...defaults(slug), 'open': true, 'preventDismiss': true}));
      await t.pumpAndSettle();
      await t.tap(find.text('Cancelar'));
      await t.pumpAndSettle();
      expect(find.byType(EditableText), findsOneWidget);
      expect(find.textContaining('Fechamentos: 0'), findsOneWidget);
    });
    testWidgets('$slug caller can refuse controlled opening', (t) async {
      await t
          .pumpWidget(host(slug, {...defaults(slug), 'acceptChanges': false}));
      await t.tap(find.text('Abrir'));
      await t.pumpAndSettle();
      expect(find.byType(EditableText), findsNothing);
      expect(find.textContaining('Solicitações: 1'), findsOneWidget);
    });
  }
  testWidgets('confirmation records the callback and caller controls closure',
      (t) async {
    await t.pumpWidget(host('confirmation-modal', {
      ...defaults('confirmation-modal'),
      'open': true,
      'closeOnConfirm': true
    }));
    await t.pumpAndSettle();
    await t.tap(find.text('Confirmar'));
    await t.pumpAndSettle();
    expect(find.text('Confirmar'), findsNothing);
    expect(find.textContaining('Ações: 1'), findsOneWidget);
  });
  testWidgets('popover closes through real footer and restores trigger',
      (t) async {
    await t.pumpWidget(host('popover', defaults('popover')));
    await t.tap(find.text('Abrir'));
    await t.pumpAndSettle();
    expect(find.byType(EditableText), findsOneWidget);
    await t.tap(find.text('Fechar'));
    await t.pumpAndSettle();
    expect(find.byType(EditableText), findsNothing);
    expect(t.takeException(), isNull);
  });
  testWidgets('toast queue supports action and dismissal', (t) async {
    await t.pumpWidget(host(
        'toast-region', {...defaults('toast-region'), 'withAction': true}));
    await t.pumpAndSettle();
    await t.tap(find.text('Revisar'));
    await t.pump();
    expect(find.textContaining('Ações: 1'), findsOneWidget);
    await t.tap(find.text('Dispensar'));
    await t.pumpAndSettle();
    expect(find.byType(ForgeToast), findsNothing);
    await t.tap(find.text('Adicionar notificação'));
    await t.pumpAndSettle();
    expect(find.byType(ForgeToast), findsOneWidget);
  });
  testWidgets('controlled toast queue preserves rejected dismissal', (t) async {
    await t.pumpWidget(host(
        'toast-region', {...defaults('toast-region'), 'acceptChanges': false}));
    await t.pumpAndSettle();
    await t.tap(find.text('Dispensar'));
    await t.pumpAndSettle();
    expect(find.byType(ForgeToast), findsOneWidget);
    expect(find.textContaining('Solicitações: 1'), findsOneWidget);
  });
}
