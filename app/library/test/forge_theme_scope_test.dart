import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';

void main() {
  testWidgets('ForgeThemeScope exposes tokens without a MaterialApp',
      (tester) async {
    ForgeThemeId? observed;

    Widget app(ForgeThemeId theme) => WidgetsApp(
          color: const Color(0xFF121212),
          home: ForgeThemeScope.forId(
            theme: theme,
            child: Builder(builder: (context) {
              observed = ForgeThemeTokens.of(context).id;
              return const Text('Forge theme');
            }),
          ),
        );

    await tester.pumpWidget(app(ForgeThemeId.light));
    expect(observed, ForgeThemeId.light);

    await tester.pumpWidget(app(ForgeThemeId.dark));
    expect(observed, ForgeThemeId.dark);
    expect(find.text('Forge theme'), findsOneWidget);
  });

  testWidgets('native scope resolves every supported Forge theme',
      (tester) async {
    for (final id in ForgeThemeId.values) {
      late ForgeThemeTokens observed;
      await tester.pumpWidget(WidgetsApp(
        color: const Color(0xFF121212),
        home: ForgeThemeScope.forId(
          theme: id,
          child: Builder(builder: (context) {
            observed = ForgeThemeTokens.of(context);
            return const Text('Theme');
          }),
        ),
      ));
      expect(observed.id, id);
      expect(observed.palette.colorTextDefault,
          ForgeThemeTokens.fromId(id).palette.colorTextDefault);
    }
  });
}
