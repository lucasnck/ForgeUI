import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';

Widget host(Widget child, {bool rtl = false}) => MaterialApp(
    theme: ForgeThemeData.light(),
    home: Scaffold(
        body: Directionality(
            textDirection: rtl ? TextDirection.rtl : TextDirection.ltr,
            child: SizedBox(width: 500, child: child))));
Widget group(
        {String? value,
        String? defaultValue,
        ValueChanged<String>? onChanged,
        bool disabled = false,
        bool third = false}) =>
    ForgeRadioGroup(
        name: 'choice',
        legend: 'Choose',
        value: value,
        defaultValue: defaultValue,
        onValueChange: onChanged,
        disabled: disabled,
        children: [
          ForgeChoiceGroupBody(
              child: Column(children: [
            ForgeRadioGroupItem(value: 'a', label: 'Alpha'),
            ForgeRadioGroupItem(
                value: 'off', label: 'Disabled', disabled: true),
            const ForgeRadioGroupItem(value: 'b', label: 'Beta'),
            if (third) const ForgeRadioGroupItem(value: 'c', label: 'Gamma')
          ]))
        ]);
void main() {
  testWidgets(
      'radio arrows wrap, skip disabled and update native selection once',
      (t) async {
    final edits = <String>[];
    await t.pumpWidget(host(group(defaultValue: 'a', onChanged: edits.add)));
    await t.pump();
    final radios = t.widgetList<ForgeRadio>(find.byType(ForgeRadio)).toList();
    radios.first.focusNode!.requestFocus();
    await t.pump();
    expect(radios.first.focusNode!.skipTraversal, isFalse);
    expect(radios.last.focusNode!.skipTraversal, isTrue);
    await t.sendKeyEvent(LogicalKeyboardKey.arrowDown);
    await t.pump();
    expect(edits, ['b']);
    expect(
        t.widgetList<ForgeRadio>(find.byType(ForgeRadio)).last.checked, isTrue);
    expect(radios.last.focusNode!.hasFocus, isTrue);
    expect(radios.last.focusNode!.skipTraversal, isFalse);
    await t.sendKeyEvent(LogicalKeyboardKey.arrowDown);
    await t.pump();
    expect(edits, ['b', 'a']);
  });
  testWidgets(
      'controlled radio refusal retains selected value and ignores false notifications',
      (t) async {
    final edits = <String>[];
    await t.pumpWidget(host(group(value: 'a', onChanged: edits.add)));
    await t.pump();
    final radios = t.widgetList<ForgeRadio>(find.byType(ForgeRadio)).toList();
    radios.last.onChanged!(false);
    await t.pump();
    expect(edits, isEmpty);
    radios.first.focusNode!.requestFocus();
    await t.pump();
    await t.sendKeyEvent(LogicalKeyboardKey.arrowRight);
    await t.pump();
    expect(edits, ['b']);
    expect(t.widgetList<ForgeRadio>(find.byType(ForgeRadio)).first.checked,
        isTrue);
    expect(radios.first.focusNode!.skipTraversal, isFalse);
  });
  testWidgets(
      'radio horizontal direction follows RTL and group disable blocks selection',
      (t) async {
    final edits = <String>[];
    await t.pumpWidget(host(
        group(defaultValue: 'a', onChanged: edits.add, third: true),
        rtl: true));
    await t.pump();
    t
        .widgetList<ForgeRadio>(find.byType(ForgeRadio))
        .first
        .focusNode!
        .requestFocus();
    await t.pump();
    await t.sendKeyEvent(LogicalKeyboardKey.arrowLeft);
    await t.pump();
    expect(edits, ['b']);
    await t.pumpWidget(
        host(group(value: 'a', onChanged: edits.add, disabled: true)));
    await t.pump();
    expect(
        t
            .widgetList<ForgeRadio>(find.byType(ForgeRadio))
            .every((r) => r.disabled),
        isTrue);
    await t.sendKeyEvent(LogicalKeyboardKey.arrowDown);
    await t.pump();
    expect(edits, ['b']);
    await t.pumpWidget(const SizedBox());
    await t.pump();
    expect(t.takeException(), isNull);
  });
}
