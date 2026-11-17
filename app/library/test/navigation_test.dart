import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';
import 'package:forge_ui/src/controllers/roving_focus_controller.dart';

Widget host(Widget child) => MaterialApp(
    theme: ForgeThemeData.light(),
    home: Scaffold(body: SizedBox(width: 500, child: child)));
void main() {
  testWidgets(
      'tabs use manual keyboard activation, skip disabled, retain panels and repair hidden focus',
      (t) async {
    String? value = 'a';
    late StateSetter update;
    await t.pumpWidget(host(StatefulBuilder(builder: (c, set) {
      update = set;
      return ForgeTabs(
          value: value,
          label: 'Views',
          onValueChange: (v) => set(() => value = v),
          children: [
            const ForgeTabsHeader(tabs: [
              ForgeTab(value: 'a', child: Text('Alpha')),
              ForgeTab(value: 'off', disabled: true, child: Text('Disabled')),
              ForgeTab(value: 'b', child: Text('Beta'))
            ]),
            const ForgeTabsBody(panels: [
              ForgeTabPanel(value: 'a', child: TextField()),
              ForgeTabPanel(value: 'off', child: Text('disabled panel')),
              ForgeTabPanel(value: 'b', child: Text('Panel B'))
            ])
          ]);
    })));
    await t.tap(find.text('Alpha'));
    Focus.of(t.element(find.text('Alpha'))).requestFocus();
    await t.pump();
    await t.sendKeyEvent(LogicalKeyboardKey.arrowRight);
    await t.pump();
    expect(value, 'a');
    expect(FocusManager.instance.primaryFocus?.debugLabel, 'b');
    await t.sendKeyEvent(LogicalKeyboardKey.enter);
    await t.pump();
    expect(value, 'b');
    expect(find.text('Panel B'), findsOneWidget);
    update(() => value = 'a');
    await t.pump();
    await t.enterText(find.byType(TextField), 'retained');
    await t.pump();
    expect(t.widget<EditableText>(find.byType(EditableText)).controller.text,
        'retained');
    update(() => value = 'b');
    await t.pump();
    expect(FocusManager.instance.primaryFocus?.debugLabel, 'b');
    update(() => value = 'a');
    await t.pump();
    expect(t.widget<EditableText>(find.byType(EditableText)).controller.text,
        'retained');
  });
  testWidgets(
      'toolbar wraps keyboard focus in source direction and excludes disabled',
      (t) async {
    var actions = 0;
    await t.pumpWidget(host(ForgeToolbar(
        label: 'Tools',
        direction: ForgeNavigationDirection.rtl,
        children: [
          ForgeToolbarItem(
              itemKey: 'a', onPressed: () => actions++, child: const Text('A')),
          const ForgeToolbarItem(
              itemKey: 'off', disabled: true, child: Text('Off')),
          ForgeToolbarItem(
              itemKey: 'b', onPressed: () => actions++, child: const Text('B'))
        ])));
    await t.tap(find.text('A'));
    Focus.of(t.element(find.text('A'))).requestFocus();
    await t.pump();
    await t.sendKeyEvent(LogicalKeyboardKey.arrowLeft);
    await t.pump();
    expect(FocusManager.instance.primaryFocus?.debugLabel, 'b');
    await t.sendKeyEvent(LogicalKeyboardKey.enter);
    await t.pump();
    expect(actions, 2);
  });
  testWidgets('collapse retains input state and moves focus before hiding',
      (t) async {
    bool open = true;
    late StateSetter update;
    await t.pumpWidget(host(StatefulBuilder(builder: (c, set) {
      update = set;
      return ForgeCollapse(
          open: open,
          onOpenChange: (v) => set(() => open = v),
          animated: false,
          children: const [
            ForgeCollapseHeader(child: Text('Details')),
            ForgeCollapseBody(child: TextField())
          ]);
    })));
    await t.enterText(find.byType(TextField), 'retained');
    update(() => open = false);
    await t.pump();
    expect(find.byType(TextField), findsNothing);
    expect(FocusManager.instance.primaryFocus?.hasFocus, isTrue);
    await t.tap(find.text('Details'));
    await t.pump();
    expect(t.widget<EditableText>(find.byType(EditableText)).controller.text,
        'retained');
  });
  testWidgets('controlled collapse refusal does not hide content', (t) async {
    final requests = <bool>[];
    await t.pumpWidget(host(ForgeCollapse(
        open: true,
        onOpenChange: requests.add,
        animated: false,
        children: const [
          ForgeCollapseHeader(child: Text('Toggle')),
          ForgeCollapseBody(child: Text('Content'))
        ])));
    await t.tap(find.text('Toggle'));
    await t.pump();
    expect(requests, [false]);
    expect(find.text('Content'), findsOneWidget);
  });
  testWidgets(
      'accordion single noncollapsible and multiple state follow accepted owner',
      (t) async {
    await t.pumpWidget(host(const ForgeAccordion(
        defaultValue: ['a'],
        collapsible: false,
        animated: false,
        children: [
          ForgeAccordionItem(value: 'a', children: [
            ForgeAccordionHeader(child: Text('A')),
            ForgeAccordionBody(child: Text('Body A'))
          ]),
          ForgeAccordionItem(value: 'b', children: [
            ForgeAccordionHeader(child: Text('B')),
            ForgeAccordionBody(child: Text('Body B'))
          ])
        ])));
    await t.tap(find.text('A'));
    await t.pump();
    expect(find.text('Body A'), findsOneWidget);
    await t.tap(find.text('B'));
    await t.pump();
    expect(find.text('Body A'), findsNothing);
    expect(find.text('Body B'), findsOneWidget);
  });
  testWidgets(
      'selection groups preserve controlled refusal, repeated form values and reset',
      (t) async {
    final form = ForgeFormBinding();
    final changes = <List<String>>[];
    await t.pumpWidget(host(ForgeCheckboxGroup(
        name: 'choices',
        legend: 'Choices',
        form: form,
        defaultValue: const ['a'],
        onValueChange: changes.add,
        children: const [
          ForgeChoiceGroupBody(
              child: Column(children: [
            ForgeCheckboxGroupItem(value: 'a', label: 'Alpha'),
            ForgeCheckboxGroupItem(value: 'b', label: 'Beta')
          ]))
        ])));
    expect(form.data().getAll('choices'), ['a']);
    await t.tap(find.text('Beta'));
    await t.pump();
    expect(changes.single, ['a', 'b']);
    expect(form.data().getAll('choices'), ['a', 'b']);
    form.reset();
    await t.pump();
    expect(form.data().getAll('choices'), ['a']);
    await t.pumpWidget(host(const SizedBox()));
    form.dispose();
  });
  testWidgets(
      'removing a focused toolbar item repairs focus to the next enabled action',
      (t) async {
    var clicks = 0;
    var showB = true;
    late StateSetter rebuild;
    await t.pumpWidget(host(StatefulBuilder(builder: (context, set) {
      rebuild = set;
      return ForgeToolbar(label: 'Actions', children: [
        ForgeToolbarItem(
            itemKey: 'a', onPressed: () => clicks++, child: const Text('A')),
        if (showB)
          ForgeToolbarItem(
              itemKey: 'b', onPressed: () => clicks++, child: const Text('B')),
        ForgeToolbarItem(
            itemKey: 'c', onPressed: () => clicks++, child: const Text('C')),
        ForgeToolbarItem(
            itemKey: 'd', onPressed: () => clicks++, child: const Text('D')),
      ]);
    })));
    await t.tap(find.text('B'));
    Focus.of(t.element(find.text('B'))).requestFocus();
    await t.pump();
    expect(FocusManager.instance.primaryFocus?.debugLabel, 'b');
    expect(clicks, 1);
    rebuild(() => showB = false);
    await t.pump();
    await t.pump();
    expect(FocusManager.instance.primaryFocus?.debugLabel, 'c');
    expect(clicks, 1); // Moving focus must not activate an action.
    await t.sendKeyEvent(LogicalKeyboardKey.enter);
    await t.pump();
    expect(clicks, 2);
  });

  testWidgets('roving focus validates identities before mutation', (t) async {
    final controller = ForgeRovingFocusController();
    controller.update(const [
      ForgeFocusItem('a'),
      ForgeFocusItem('b', disabled: true),
      ForgeFocusItem('c'),
    ]);
    expect(controller.active, 'a');
    expect(controller.node('b').canRequestFocus, isFalse);
    expect(
        () =>
            controller.update(const [ForgeFocusItem('a'), ForgeFocusItem('a')]),
        throwsArgumentError);
    expect(() => controller.update(const [ForgeFocusItem(' ')]),
        throwsArgumentError);
    expect(controller.node('c').canRequestFocus, isTrue);
    expect(controller.active, 'a');
    controller.update(
        const [ForgeFocusItem('a'), ForgeFocusItem('b', disabled: true)]);
    controller
        .dispose(); // Deferred disposal for removed 'c' must not run twice.
    controller.dispose();
    await t.pump();
  });
}
