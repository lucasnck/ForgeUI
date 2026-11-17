import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';

Widget host(Widget child) => MaterialApp(
    theme: ForgeThemeData.light(),
    home: Scaffold(body: SizedBox(width: 500, child: child)));
void main() {
  testWidgets(
      'tree grid navigates a matrix and expands only first-column Enter',
      (t) async {
    final parent = ForgeTreeGridNode<String>(
        key: 'p',
        item: 'Parent',
        children: [ForgeTreeGridNode(key: 'c', item: 'Child')]);
    await t.pumpWidget(host(ForgeTreeGrid<String>(
        label: 'Hierarchy',
        nodes: [parent],
        getNodeLabel: (r) => r,
        columns: [
          ForgeTreeGridColumn(
              key: 'name', header: 'Name', getCellText: (r) => r),
          ForgeTreeGridColumn(
              key: 'detail', header: 'Detail', getCellText: (r) => '$r info')
        ],
        children: const [ForgeTreeGridHeader(), ForgeTreeGridBody()])));
    await t.tap(find.text('Parent'));
    await t.pump();
    await t.sendKeyEvent(LogicalKeyboardKey.arrowRight);
    await t.pump();
    expect(FocusManager.instance.primaryFocus?.debugLabel, '["p","detail"]');
    await t.sendKeyEvent(LogicalKeyboardKey.enter);
    await t.pump();
    expect(find.text('Child'), findsNothing);
    await t.sendKeyEvent(LogicalKeyboardKey.home);
    await t.pump();
    await t.sendKeyEvent(LogicalKeyboardKey.enter);
    await t.pump();
    expect(find.text('Child'), findsOneWidget);
    await t.sendKeyEvent(LogicalKeyboardKey.arrowDown);
    await t.pump();
    expect(FocusManager.instance.primaryFocus?.debugLabel, '["c","name"]');
    expect(t.takeException(), isNull);
  });
  testWidgets(
      'controlled tree-grid collapse returns focused descendant to matching ancestor column',
      (t) async {
    List<String> expanded = ['p'];
    late StateSetter update;
    final parent = ForgeTreeGridNode<String>(
        key: 'p',
        item: 'Parent',
        children: [ForgeTreeGridNode(key: 'c', item: 'Child')]);
    await t.pumpWidget(host(StatefulBuilder(builder: (context, set) {
      update = set;
      return ForgeTreeGrid<String>(
          label: 'Hierarchy',
          nodes: [parent],
          getNodeLabel: (r) => r,
          expandedValue: expanded,
          columns: [
            ForgeTreeGridColumn(
                key: 'name', header: 'Name', getCellText: (r) => r),
            ForgeTreeGridColumn(
                key: 'detail', header: 'Detail', getCellText: (r) => '$r info')
          ],
          children: const [ForgeTreeGridBody()]);
    })));
    await t.tap(find.text('Child info'));
    await t.pump();
    expect(FocusManager.instance.primaryFocus?.debugLabel, '["c","detail"]');
    update(() => expanded = []);
    await t.pump();
    await t.pump();
    expect(FocusManager.instance.primaryFocus?.debugLabel, '["p","detail"]');
    expect(find.text('Child info'), findsNothing);
  });
}
