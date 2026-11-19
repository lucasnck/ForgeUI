import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';

void main() {
  Widget fixture({bool overrideAppearance = false}) => MaterialApp(
        theme: ForgeThemeData.light(),
        home: Scaffold(
          body: ForgeTabs(
            label: 'Seções',
            defaultValue: 'first',
            children: [
              ForgeTabsHeader(tabs: [
                ForgeTab(
                  value: 'first',
                  appearance:
                      overrideAppearance ? ForgeAppearance.bordered : null,
                  child: const Text('Primeiro'),
                ),
                const ForgeTab(value: 'second', child: Text('Segundo')),
              ]),
              const ForgeTabsBody(panels: [
                ForgeTabPanel(value: 'first', child: Text('Painel 1')),
                ForgeTabPanel(value: 'second', child: Text('Painel 2')),
              ]),
            ],
          ),
        ),
      );

  ForgeAppearance? appearanceOf(WidgetTester tester, int index) =>
      tester.widget<ForgeButton>(
        find.descendant(
          of: find.byType(ForgeTab).at(index),
          matching: find.byType(ForgeButton),
        ),
      ).appearance;

  testWidgets('default selected tab is a solid button without underline',
      (tester) async {
    await tester.pumpWidget(fixture());
    expect(appearanceOf(tester, 0), ForgeAppearance.solid);
    expect(appearanceOf(tester, 1), ForgeAppearance.ghost);
    expect(find.text('Painel 1'), findsOneWidget);

    await tester.tap(find.text('Segundo'));
    await tester.pump();
    expect(appearanceOf(tester, 0), ForgeAppearance.ghost);
    expect(appearanceOf(tester, 1), ForgeAppearance.solid);
    expect(tester.takeException(), isNull);
  });

  testWidgets('an explicit appearance always wins', (tester) async {
    await tester.pumpWidget(fixture(overrideAppearance: true));
    expect(appearanceOf(tester, 0), ForgeAppearance.bordered);
    await tester.tap(find.text('Segundo'));
    await tester.pump();
    expect(appearanceOf(tester, 0), ForgeAppearance.bordered);
    expect(appearanceOf(tester, 1), ForgeAppearance.solid);
  });
}
