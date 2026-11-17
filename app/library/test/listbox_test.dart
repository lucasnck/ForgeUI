import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';

Widget host(Widget child) => MaterialApp(
    theme: ForgeThemeData.light(),
    home: Scaffold(body: Center(child: SizedBox(width: 400, child: child))));
void main() {
  testWidgets(
      'listbox keyboard navigation is manual, bounded and typeahead enabled',
      (t) async {
    final values = <List<String>>[];
    await t.pumpWidget(host(ForgeListBox(
        label: 'Choices',
        options: const [
          ForgeChoiceOption(value: 'a', label: 'Alpha'),
          ForgeChoiceOption(value: 'off', label: 'Disabled', disabled: true),
          ForgeChoiceOption(value: 'b', label: 'Beta')
        ],
        onValueChange: values.add,
        children: const [ForgeListBoxBody()])));
    Focus.of(t.element(find.text('Alpha'))).requestFocus();
    await t.pump();
    await t.sendKeyEvent(LogicalKeyboardKey.arrowDown);
    await t.pump();
    expect(FocusManager.instance.primaryFocus?.debugLabel, 'b');
    expect(values, isEmpty);
    await t.sendKeyEvent(LogicalKeyboardKey.enter);
    await t.pump();
    expect(values.single, ['b']);
    await t.sendKeyEvent(LogicalKeyboardKey.arrowDown);
    await t.pump();
    expect(FocusManager.instance.primaryFocus?.debugLabel, 'b');
    await t.sendKeyEvent(LogicalKeyboardKey.keyA, character: 'a');
    await t.pump();
    expect(FocusManager.instance.primaryFocus?.debugLabel, 'a');
  });
  testWidgets(
      'listbox controlled multiple owner can refuse; form excludes disabled options',
      (t) async {
    final form = ForgeFormBinding(), values = <List<String>>[];
    await t.pumpWidget(host(ForgeListBox(
        label: 'Choices',
        selectionMode: ForgeSelectionMode.multiple,
        name: 'choices',
        form: form,
        value: const ['a', 'off'],
        options: const [
          ForgeChoiceOption(value: 'a', label: 'Alpha'),
          ForgeChoiceOption(value: 'off', label: 'Off', disabled: true)
        ],
        onValueChange: values.add,
        children: const [ForgeListBoxBody()])));
    expect(form.data().getAll('choices'), ['a']);
    await t.tap(find.text('Alpha'));
    await t.pump();
    expect(values.single, ['off']);
    expect(form.data().getAll('choices'), ['a']);
    await t.pumpWidget(host(const SizedBox()));
    form.dispose();
  });
  test(
      'popup resets active identity for a different query and ignores IME acceptance',
      () {
    final accepted = <int>[];
    final popup = ForgePopupListboxController(onAcceptOption: accepted.add);
    popup.configure(count: 2, queryKey: 'first');
    popup.setFocused(true);
    popup.handle(const KeyDownEvent(
        physicalKey: PhysicalKeyboardKey.arrowDown,
        logicalKey: LogicalKeyboardKey.arrowDown,
        timeStamp: Duration.zero));
    expect(popup.activeIndex, 0);
    popup.configure(count: 2, queryKey: 'second');
    expect(popup.activeIndex, -1);
    popup.composing = true;
    popup.acceptOption(0);
    expect(accepted, isEmpty);
    popup.composing = false;
    popup.acceptOption(1);
    expect(accepted, [1]);
    popup.dismiss();
    expect(popup.isOpen, isFalse);
    popup.dispose();
  });
  testWidgets(
      'autocomplete accepts supplied options and restores refused query on rebuild',
      (t) async {
    final changes = <String>[];
    await t.pumpWidget(host(ForgeAutocomplete(
        query: 'Al',
        onQueryChange: changes.add,
        listboxLabel: 'Suggestions',
        options: const [ForgeChoiceOption(value: 'a', label: 'Alpha')],
        children: const [ForgeAutocompleteBody()])));
    await t.tap(find.byType(TextField));
    await t.pump();
    await t.pump();
    await t.sendKeyEvent(LogicalKeyboardKey.arrowDown);
    await t.pump();
    await t.sendKeyEvent(LogicalKeyboardKey.enter);
    await t.pump();
    expect(changes, ['Alpha']);
    expect(t.widget<TextField>(find.byType(TextField)).controller!.text, 'Al');
  });
  testWidgets('combobox edit clears selected value independently from query',
      (t) async {
    final queries = <String>[], selections = <String?>[];
    await t.pumpWidget(host(ForgeCombobox(
        query: 'Alpha',
        onQueryChange: queries.add,
        selectedValue: 'a',
        onSelectionChange: selections.add,
        listboxLabel: 'Suggestions',
        options: const [
          ForgeChoiceOption(value: 'a', label: 'Alpha')
        ],
        children: const [
          ForgeComboboxHeader(child: Text('Pick')),
          ForgeComboboxBody()
        ])));
    await t.enterText(find.byType(TextField), 'Another');
    await t.pump();
    expect(queries, ['Another']);
    expect(selections, [null]);
  });
}
