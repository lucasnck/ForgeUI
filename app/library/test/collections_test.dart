import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';

Widget host(Widget child) => MaterialApp(
    theme: ForgeThemeData.light(),
    home: Scaffold(body: Center(child: SizedBox(width: 500, child: child))));
void main() {
  testWidgets(
      'menu activates one action before dismissal and loops keyboard focus',
      (t) async {
    final calls = <String>[];
    await t.pumpWidget(host(ForgeMenu(
        label: 'Actions',
        onAction: (v) => calls.add(v),
        onDismiss: () => calls.add('dismiss'),
        children: const [
          ForgeMenuBody(items: [
            ForgeMenuItem(value: 'a', label: 'Alpha'),
            ForgeMenuItem(value: 'off', label: 'Off', disabled: true),
            ForgeMenuItem(value: 'b', label: 'Beta')
          ])
        ])));
    Focus.of(t.element(find.text('Alpha'))).requestFocus();
    await t.pump();
    await t.sendKeyEvent(LogicalKeyboardKey.arrowUp);
    await t.pump();
    expect(FocusManager.instance.primaryFocus?.debugLabel, 'b');
    await t.sendKeyEvent(LogicalKeyboardKey.enter);
    await t.pump();
    expect(calls, ['b', 'dismiss']);
  });
  testWidgets(
      'dropdown is an actual menu and accepts a dismissed controlled request',
      (t) async {
    final actions = <String>[];
    final requests = <bool>[];
    await t.pumpWidget(host(ForgeDropdownMenu(
        label: 'Actions',
        open: true,
        onOpenChange: requests.add,
        child: ForgeMenu(
            label: 'Commands',
            onAction: actions.add,
            children: const [
              ForgeMenuBody(
                  items: [ForgeMenuItem(value: 'save', label: 'Save')])
            ]))));
    await t.pump();
    await t.pump();
    await t.pump();
    await t.tap(find.text('Save'));
    await t.pump();
    expect(actions, ['save']);
    expect(requests, [false]);
    expect(find.text('Save'), findsOneWidget); // controlled refusal
  });
  testWidgets(
      'tree expansion and selection remain separate keyboard operations',
      (t) async {
    final selected = <String?>[];
    final root = ForgeTreeNode(
        key: 'root',
        label: 'Root',
        children: [ForgeTreeNode(key: 'child', label: 'Child')]);
    await t.pumpWidget(host(ForgeTree(
        label: 'Nodes',
        nodes: [root],
        onValueChange: selected.add,
        children: const [ForgeTreeBody()])));
    Focus.of(t.element(find.text('Root'))).requestFocus();
    await t.pump();
    await t.sendKeyEvent(LogicalKeyboardKey.arrowRight);
    await t.pump();
    expect(find.text('Child'), findsOneWidget);
    expect(selected, isEmpty);
    await t.sendKeyEvent(LogicalKeyboardKey.arrowRight);
    await t.pump();
    expect(FocusManager.instance.primaryFocus?.debugLabel, 'child');
    await t.sendKeyEvent(LogicalKeyboardKey.enter);
    await t.pump();
    expect(selected, ['child']);
    await t.sendKeyEvent(LogicalKeyboardKey.arrowLeft);
    await t.pump();
    expect(FocusManager.instance.primaryFocus?.debugLabel, 'root');
    await t.sendKeyEvent(LogicalKeyboardKey.arrowLeft);
    await t.pump();
    expect(find.text('Child'), findsNothing);
  });
  testWidgets('tree nullable controlled selection can explicitly refuse',
      (t) async {
    final selected = <String?>[];
    await t.pumpWidget(host(ForgeTree(
        label: 'Nodes',
        nodes: [ForgeTreeNode(key: 'one', label: 'One')],
        value: const ForgeProvided(null),
        onValueChange: selected.add,
        children: const [ForgeTreeBody()])));
    await t.tap(find.text('One'));
    await t.pump();
    expect(selected, ['one']);
    expect(
        find.byWidgetPredicate(
            (w) => w is Semantics && w.properties.selected == false),
        findsOneWidget);
    await t.pumpAndSettle();
  });
  testWidgets('stepper preserves panel state across controlled changes',
      (t) async {
    var value = 'a';
    late StateSetter update;
    await t.pumpWidget(host(StatefulBuilder(builder: (context, set) {
      update = set;
      return ForgeStepper(
          label: 'Steps',
          value: value,
          onStepChange: (v) => set(() => value = v),
          children: const [
            ForgeStepperHeader(items: [
              ForgeStepperItem(value: 'a', label: 'First'),
              ForgeStepperItem(
                  value: 'b',
                  label: 'Second',
                  status: ForgeStepStatus.complete,
                  statusLabel: 'Complete')
            ]),
            ForgeStepperBody(panels: [
              ForgeStepperPanel(value: 'a', child: TextField()),
              ForgeStepperPanel(value: 'b', child: Text('Second panel'))
            ])
          ]);
    })));
    await t.enterText(find.byType(TextField), 'kept');
    await t.tap(find.text('Second'));
    await t.pump();
    expect(value, 'b');
    update(() => value = 'a');
    await t.pump();
    expect(t.widget<EditableText>(find.byType(EditableText)).controller.text,
        'kept');
    await t.pumpWidget(host(const SizedBox()));
    await t.pumpAndSettle();
  });
  testWidgets(
      'navigation leaves delegate href and groups disclose native content',
      (t) async {
    final destinations = <String>[];
    await t.pumpWidget(host(ForgeNavigationAdapter(
        launch: (request) {
          destinations.add(request.href);
        },
        child: ForgeNavigationMenu(label: 'Main', children: [
          ForgeNavigationMenuBody(items: const [
            ForgeNavigationMenuItem(label: 'Home', href: '/home'),
            ForgeNavigationMenuItem(
                label: 'Group',
                sublist: ForgeNavigationMenuSublist(items: [
                  ForgeNavigationMenuItem(label: 'Child', href: '/child')
                ]))
          ])
        ]))));
    await t.tap(find.text('Home'));
    await t.pump();
    expect(destinations, ['/home']);
    await t.tap(find.text('Group'));
    await t.pumpAndSettle();
    expect(find.text('Child'), findsOneWidget);
  });
}
