import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';

void main() {
  testWidgets(
      'wraps actions with token spacing and independent semantics/callbacks',
      (tester) async {
    final semantics = tester.ensureSemantics();
    var first = 0, second = 0;
    await tester.pumpWidget(MaterialApp(
        theme: ForgeThemeData.light(),
        home: Center(
            child: SizedBox(
                width: 130,
                child: ForgeButtonGroup(label: 'Actions', children: [
                  ForgeButton(
                      onPressed: () => first++,
                      child: const Text('First action')),
                  ForgeButton(
                      onPressed: () => second++,
                      child: const Text('Second action'))
                ])))));
    expect(tester.getTopLeft(find.text('Second action')).dy,
        greaterThan(tester.getTopLeft(find.text('First action')).dy));
    expect(tester.widget<Wrap>(find.byType(Wrap)).spacing,
        ForgeTokens.light.space2);
    await tester.tap(find.text('First action'));
    await tester.tap(find.text('Second action'));
    expect([first, second], [1, 1]);
    expect(find.bySemanticsLabel('Actions'), findsOneWidget);
    expect(find.bySemanticsLabel('First action'), findsOneWidget);
    semantics.dispose();
  });
  testWidgets('rejects blank group name', (tester) async {
    await tester.pumpWidget(MaterialApp(
        theme: ForgeThemeData.light(),
        home: const ForgeButtonGroup(label: ' ', children: [])));
    expect(tester.takeException(), isArgumentError);
  });
}
