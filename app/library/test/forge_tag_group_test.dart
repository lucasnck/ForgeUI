import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';

Widget host(Widget child) => MaterialApp(
      theme: ForgeThemeData.light(),
      home: Scaffold(body: SizedBox(width: 300, child: child)),
    );

void main() {
  testWidgets('TagGroup uses stable entries and never removes caller data',
      (t) async {
    var requests = 0;
    await t.pumpWidget(host(ForgeTagGroup(
      label: 'Skills',
      items: [
        ForgeTagGroupEntry(
          id: 'first',
          tag: ForgeTagConfiguration(
            text: 'Dart',
            removeLabel: 'Remove Dart',
            onRemove: () => requests++,
          ),
        ),
        const ForgeTagGroupEntry(
          id: 'second',
          tag: ForgeTagConfiguration(text: 'Flutter'),
        ),
      ],
    )));
    expect(find.text('Dart'), findsOneWidget);
    expect(find.text('Flutter'), findsOneWidget);
    await t.tap(find.byType(ForgeIconButton));
    await t.pump();
    expect(requests, 1);
    expect(find.text('Dart'), findsOneWidget);
    expect(t.takeException(), isNull);
  });

  testWidgets('TagGroup rejects missing sources and duplicate stable IDs',
      (t) async {
    await t.pumpWidget(host(const ForgeTagGroup()));
    expect(t.takeException(), isArgumentError);

    await t.pumpWidget(host(const ForgeTagGroup(items: [
      ForgeTagGroupEntry(id: 'one', tag: ForgeTagConfiguration(text: 'A')),
      ForgeTagGroupEntry(id: 'one', tag: ForgeTagConfiguration(text: 'B')),
    ])));
    expect(t.takeException(), isArgumentError);
  });

  testWidgets('Empty items are allowed, with no invented empty-state text',
      (t) async {
    await t.pumpWidget(host(const ForgeTagGroup(items: [])));
    expect(t.takeException(), isNull);
    expect(find.byType(ForgeTag), findsNothing);
  });

  testWidgets('TagGroupItem requires its native owner', (t) async {
    await t.pumpWidget(host(const ForgeTagGroupItem(
      tag: ForgeTagGroupEntry(
        id: 'one',
        tag: ForgeTagConfiguration(text: 'One'),
      ),
    )));
    expect(t.takeException(), isStateError);
  });
}
