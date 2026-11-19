import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';

void main() {
  testWidgets('Text, Heading and descriptive text work without MaterialApp',
      (tester) async {
    for (final theme in ForgeThemeId.values) {
      await tester.pumpWidget(WidgetsApp(
        color: const Color(0xFF141D28),
        home: ForgeThemeScope.forId(
          theme: theme,
          child: const Directionality(
            textDirection: TextDirection.ltr,
            child: Column(
              children: [
                ForgeText(text: 'Body copy', size: ForgeTextSize.sm),
                ForgeHeading(level: 2, text: 'Heading copy'),
                ForgeFieldHint(text: 'Hint copy'),
                ForgeFieldError(text: 'Error copy', announce: false),
                ForgeDivider(semanticLabel: 'Section separator'),
              ],
            ),
          ),
        ),
      ));

      expect(find.text('Body copy'), findsOneWidget);
      expect(find.text('Heading copy'), findsOneWidget);
      expect(find.text('Hint copy'), findsOneWidget);
      expect(find.text('Error copy'), findsOneWidget);
      final separator = find.descendant(
        of: find.byType(ForgeDivider),
        matching: find.byType(ColoredBox),
      );
      expect(separator, findsOneWidget);
      expect(
        tester.widget<ColoredBox>(separator).color,
        ForgeThemeTokens.fromId(theme).palette.colorBorderDefault,
      );
      expect(
        ForgeThemeTokens.of(tester.element(find.byType(ForgeHeading))).id,
        theme,
      );
    }
  });

  testWidgets('ForgeLabel keeps focus behavior in a WidgetsApp',
      (tester) async {
    final focusNode = FocusNode();
    final binding = ForgeControlBinding(id: 'email', focusNode: focusNode);
    addTearDown(focusNode.dispose);
    await tester.pumpWidget(WidgetsApp(
      color: const Color(0xFF141D28),
      home: ForgeThemeScope.forId(
        theme: ForgeThemeId.light,
        child: Directionality(
          textDirection: TextDirection.ltr,
          child: Column(children: [
            Focus(focusNode: focusNode, child: const SizedBox(height: 20)),
            ForgeLabel(control: binding, text: 'Email', required: true),
          ]),
        ),
      ),
    ));
    await tester.tap(find.text('Email'));
    await tester.pump();
    expect(focusNode.hasFocus, isTrue);
    expect(find.text(' *'), findsOneWidget);
  });
}
