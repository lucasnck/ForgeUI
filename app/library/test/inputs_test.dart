import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';
import 'package:forge_ui/src/helpers/mask.dart';
import 'package:forge_ui/src/helpers/email.dart';

Widget host(Widget child) => MaterialApp(
    theme: ForgeThemeData.light(),
    home: Scaffold(body: SizedBox(width: 400, child: child)));
void main() {
  test('mask slots preserve raw values and optional digit policy', () {
    expect(applyForgeMask('11987654321', '(00) 00000-0000'), '(11) 98765-4321');
    expect(unmaskForge('(11) 98765-4321', '(00) 00000-0000'), '11987654321');
    expect(isForgeMaskComplete('123', '000'), isTrue);
    expect(isForgeMaskComplete('12', '000'), isFalse);
    expect(applyForgeMask('ab12', 'AA-00'), 'ab-12');
  });
  test('email suggestions are local prefix matches with bounded results', () {
    expect(
        forgeEmailSuggestions('a@g', ['gmail.com', 'gmx.com', 'other'],
            maxSuggestions: 1),
        ['gmail.com']);
    expect(forgeEmailSuggestions('@g', ['gmail.com']), isEmpty);
    expect(forgeEmailSuggestions('a@gmail.com', ['gmail.com']), isEmpty);
    expect(forgeEmailWithProvider('x@y@', 'gmail.com'), 'x@y@gmail.com');
  });
  testWidgets('controlled input can refuse edits without callback echo',
      (t) async {
    final edits = <String>[];
    final controller = TextEditingController();
    await t.pumpWidget(host(ForgeInput(
        value: 'original', onChanged: edits.add, controller: controller)));
    expect(controller.text, 'original');
    await t.enterText(find.byType(TextField), 'attempt');
    await t.pump();
    expect(edits, ['attempt']);
    expect(controller.text, 'original');
    await t.pumpWidget(host(const SizedBox()));
    controller.text = 'borrowed alive';
    controller.dispose();
    expect(t.takeException(), isNull);
  });
  testWidgets('form validates required, submits current and resets defaults',
      (t) async {
    final form = ForgeFormBinding();
    await t.pumpWidget(host(ForgeInput(
        defaultValue: '', required: true, name: 'title', form: form)));
    expect(form.validate(), isFalse);
    await t.pump();
    await t.enterText(find.byType(TextField), 'hello');
    await t.pump();
    expect(form.validate(), isTrue);
    expect(form.data().get('title'), 'hello');
    form.reset();
    await t.pump();
    expect(t.widget<TextField>(find.byType(TextField)).controller!.text, '');
    expect(form.dirty, isEmpty);
    await t.pumpWidget(host(const SizedBox()));
    form.dispose();
  });
  testWidgets(
      'password reveal changes obscurity while preserving text and selection',
      (t) async {
    final c = TextEditingController(text: 'secret');
    await t.pumpWidget(host(ForgePasswordInput(
        controller: c, revealLabel: 'Reveal', concealLabel: 'Conceal')));
    c.selection = const TextSelection(baseOffset: 1, extentOffset: 4);
    expect(t.widget<TextField>(find.byType(TextField)).obscureText, isTrue);
    await t.tap(find.text('Reveal'));
    await t.pump();
    expect(t.widget<TextField>(find.byType(TextField)).obscureText, isFalse);
    expect(c.text, 'secret');
    expect(c.selection, const TextSelection(baseOffset: 1, extentOffset: 4));
    await t.pumpWidget(host(const SizedBox()));
    c.dispose();
  });
  testWidgets('search clear emits once and controlled owner may reject',
      (t) async {
    final edits = <String>[];
    await t.pumpWidget(host(ForgeSearchInput(
        value: 'query', onChanged: edits.add, clearLabel: 'Clear')));
    await t.tap(find.text('Clear'));
    await t.pump();
    expect(edits, ['']);
    expect(
        t.widget<TextField>(find.byType(TextField)).controller!.text, 'query');
  });
  testWidgets(
      'checkbox registers only checked successful controls and reset restores default',
      (t) async {
    final form = ForgeFormBinding();
    await t.pumpWidget(host(ForgeCheckbox(
        name: 'choice', value: 'yes', form: form, semanticLabel: 'Choice')));
    expect(form.data().getAll('choice'), isEmpty);
    await t.tap(find.byType(ForgeCheckbox));
    await t.pump();
    expect(form.data().getAll('choice'), ['yes']);
    form.reset();
    await t.pump();
    expect(form.data().getAll('choice'), isEmpty);
    await t.pumpWidget(host(const SizedBox()));
    form.dispose();
  });
  testWidgets('select retains duplicate option labels with index identity',
      (t) async {
    await t.pumpWidget(host(const ForgeSelect(value: 'same', options: [
      ForgeOption(value: 'same', label: 'First'),
      ForgeOption(value: 'same', label: 'Second')
    ])));
    expect(t.takeException(), isNull);
  });
  testWidgets(
      'file cancellation emits nothing; accepted empty emits with cancellable callback order',
      (t) async {
    final calls = <String>[];
    var result = const ForgeFilePickerResult.cancelled();
    await t.pumpWidget(host(ForgeFileInput(
        chooserLabel: 'Choose',
        picker: (_) async => result,
        onChanged: (e) => calls.add('change'),
        onFilesChange: (f) => calls.add('files:${f.length}'))));
    await t.tap(find.text('Choose'));
    await t.pump();
    expect(calls, isEmpty);
    result = ForgeFilePickerResult.accepted([]);
    await t.tap(find.text('Choose'));
    await t.pump();
    expect(calls, ['change', 'files:0']);
  });
  test('temporal values are local and invalid dates do not normalize silently',
      () {
    expect(forgeValidLocalDateTime('2024-02-29T12:15'), isTrue);
    expect(forgeValidLocalDateTime('2023-02-29T12:15'), isFalse);
    expect(forgeValidTime('24:00'), isFalse);
    expect(forgeValidTime('23:59:59.125'), isTrue);
    expect(
        forgeLocalDateTime(DateTime(2024, 2, 29, 12, 15)), '2024-02-29T12:15');
  });
  testWidgets('controlled input preserves IME draft until composition commits',
      (t) async {
    final controller = TextEditingController();
    final edits = <String>[];
    await t.pumpWidget(host(ForgeInput(
        value: 'owner',
        controller: controller,
        onChanged: edits.add,
        spellCheck: false)));
    await t.showKeyboard(find.byType(TextField));
    t.testTextInput.updateEditingValue(const TextEditingValue(
        text: 'draft',
        selection: TextSelection.collapsed(offset: 5),
        composing: TextRange(start: 0, end: 5)));
    await t.pump();
    expect(controller.text, 'draft');
    expect(controller.value.composing.isCollapsed, isFalse);
    t.testTextInput.updateEditingValue(const TextEditingValue(
        text: 'draft', selection: TextSelection.collapsed(offset: 5)));
    await t.pump();
    expect(controller.text, 'owner');
    expect(edits, ['draft']);
    expect(
        t
            .widget<TextField>(find.byType(TextField))
            .spellCheckConfiguration!
            .spellCheckEnabled,
        isFalse);
    await t.pumpWidget(host(const SizedBox()));
    controller.dispose();
  });
}
