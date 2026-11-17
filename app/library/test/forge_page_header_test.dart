import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';

Widget host(Widget child) => MaterialApp(
      theme: ForgeThemeData.light(),
      home: Scaffold(body: SizedBox(width: 320, child: child)),
    );

void main() {
  testWidgets('PageHeader keeps caller-owned slots and a stable heading',
      (t) async {
    var actions = 0;
    await t.pumpWidget(host(ForgePageHeader(
      titleId: 'settings-title',
      pageTitle: const Text('Settings'),
      description: const Text('Manage preferences'),
      identity: const Icon(Icons.settings),
      breadcrumb: const Text('Home / Settings'),
      actions: TextButton(
        onPressed: () => actions++,
        child: const Text('Edit'),
      ),
      divider: true,
    )));
    expect(find.byType(ForgeHeading), findsOneWidget);
    expect(find.text('Settings'), findsOneWidget);
    expect(find.text('Manage preferences'), findsOneWidget);
    expect(find.byType(ForgeDivider), findsOneWidget);
    await t.tap(find.text('Edit'));
    await t.pump();
    expect(actions, 1);
    expect(t.takeException(), isNull);
  });

  testWidgets('PageHeader does not invent missing slots or divider', (t) async {
    await t.pumpWidget(host(const ForgePageHeader(
      titleId: 'one',
      pageTitle: Text('Only title'),
    )));
    expect(find.byType(ForgeDivider), findsNothing);
    expect(find.text('Only title'), findsOneWidget);
    expect(t.takeException(), isNull);
  });

  testWidgets('PageHeader rejects an empty heading identity', (t) async {
    await t.pumpWidget(host(const ForgePageHeader(
      titleId: ' ',
      pageTitle: Text('Invalid'),
    )));
    expect(t.takeException(), isArgumentError);
  });
}
