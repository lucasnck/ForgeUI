import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';

Widget host(Widget child, ForgeThemeId theme) => WidgetsApp(
      color: const Color(0xFF101820),
      home: ForgeThemeScope.forId(
        theme: theme,
        child: Directionality(
          textDirection: TextDirection.ltr,
          child: Center(child: child),
        ),
      ),
    );

void main() {
  testWidgets('IconButton uses native ForgeAction and Web token palette',
      (tester) async {
    for (final theme in ForgeThemeId.values) {
      var taps = 0;
      await tester.pumpWidget(host(
        ForgeIconButton(
          icon: ForgeIconName.check,
          label: 'Accept',
          onPressed: () => taps++,
          size: ForgeSize.sm,
          tone: ForgeTone.brand,
        ),
        theme,
      ));
      expect(find.byType(ForgeIconButton), findsOneWidget);
      expect(find.byType(ForgeIcon), findsOneWidget);
      expect(tester.getSize(find.byType(ForgeIconButton)).width,
          greaterThanOrEqualTo(48));
      final decoration = tester
          .widget<AnimatedContainer>(find.byType(AnimatedContainer).first)
          .decoration as BoxDecoration;
      expect(decoration.color,
          ForgeThemeTokens.fromId(theme).palette.colorActionBrandBackground);
      await tester.tap(find.byType(ForgeIconButton));
      await tester.pump();
      expect(taps, 1);
      expect(tester.takeException(), isNull);
    }
  });

  testWidgets('IconButton disabled/loading never activates', (tester) async {
    var taps = 0;
    await tester.pumpWidget(host(
        ForgeIconButton(
          icon: ForgeIconName.plus,
          label: 'Add',
          onPressed: () => taps++,
          disabled: true,
        ),
        ForgeThemeId.light));
    await tester.tap(find.byType(ForgeIconButton));
    await tester.pump();
    expect(taps, 0);
    await tester.pumpWidget(host(
        ForgeIconButton(
          icon: ForgeIconName.plus,
          label: 'Add',
          onPressed: () => taps++,
          loading: true,
          loadingLabel: 'Adding',
        ),
        ForgeThemeId.light));
    await tester.tap(find.byType(ForgeIconButton));
    await tester.pump();
    expect(taps, 0);
  });
}
