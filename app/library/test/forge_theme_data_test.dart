import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';

void main() {
  test('all four themes expose token-backed colors and sizes', () {
    for (final id in ForgeThemeId.values) {
      final data = ForgeThemeData.forId(id);
      final p = ForgeThemeTokens.fromId(id).palette;
      expect(data.colorScheme.surface, p.colorSurfaceDefault);
      expect(data.colorScheme.primary, p.colorActionBrandBackground);
      expect(data.extension<ForgeThemeTokens>()?.id, id);
      expect(p.radiusMd, greaterThan(0));
    }
  });

  testWidgets('button switches themes and respects disabled/loading state',
      (tester) async {
    var hits = 0;
    Future<void> render(ThemeData theme, {bool loading = false}) async {
      await tester.pumpWidget(MaterialApp(
        theme: theme,
        home: Scaffold(
            body: ForgeButton(
          onPressed: () => hits++,
          loading: loading,
          child: const Text('Save'),
        )),
      ));
    }

    await render(ForgeThemeData.light());
    await tester.tap(find.text('Save'));
    expect(hits, 1);
    await render(ForgeThemeData.dark(), loading: true);
    await tester.tap(find.text('Save'));
    expect(hits, 1);
    await tester.pump(kThemeAnimationDuration);
    expect(ForgeThemeTokens.of(tester.element(find.byType(ForgeButton))).id,
        ForgeThemeId.dark);
  });
}
