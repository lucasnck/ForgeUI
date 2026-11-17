import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';

Widget host(Widget child) =>
    MaterialApp(theme: ForgeThemeData.light(), home: Scaffold(body: child));
Future<void> openFrames(WidgetTester t) async {
  await t.pump();
  await t.pump();
  await t.pump();
}

void main() {
  testWidgets(
      'modal traps focus and retains native field state after accepted close and reopen',
      (t) async {
    bool open = false;
    late StateSetter update;
    final initial = FocusNode(), returnTo = FocusNode();
    await t.pumpWidget(host(StatefulBuilder(builder: (c, set) {
      update = set;
      return Column(children: [
        ForgeButton(
            focusNode: returnTo,
            onPressed: () => set(() => open = true),
            child: const Text('Launch')),
        ForgeModal(
            open: open,
            onOpenChange: (v) => set(() => open = v),
            initialFocusNode: initial,
            returnFocusNode: returnTo,
            animated: false,
            children: [
              const ForgeModalHeader(title: 'Editor'),
              ForgeModalBody(child: TextField(focusNode: initial)),
              const ForgeModalFooter(
                  children: [ForgeDialogClose(child: Text('Close'))])
            ])
      ]);
    })));
    returnTo.requestFocus();
    await t.pump();
    update(() => open = true);
    await openFrames(t);
    expect(initial.hasFocus, isTrue);
    await t.enterText(find.byType(TextField), 'retained');
    await t.tap(find.text('Close'));
    await openFrames(t);
    expect(open, isFalse);
    expect(returnTo.hasFocus, isTrue);
    expect(find.byType(TextField), findsNothing);
    update(() => open = true);
    await openFrames(t);
    expect(t.widget<EditableText>(find.byType(EditableText)).controller.text,
        'retained');
    await t.pumpWidget(host(const SizedBox()));
    await t.pump();
    initial.dispose();
    returnTo.dispose();
  });
  testWidgets(
      'controlled modal refuses escape, cancellation and outside dismissal',
      (t) async {
    final requests = <bool>[];
    final focus = FocusNode();
    await t.pumpWidget(host(ForgeModal(
        open: true,
        onOpenChange: requests.add,
        initialFocusNode: focus,
        closeOnOutsideClick: true,
        animated: false,
        children: [
          const ForgeModalHeader(title: 'Controlled'),
          ForgeModalBody(child: TextField(focusNode: focus))
        ])));
    await openFrames(t);
    await t.sendKeyEvent(LogicalKeyboardKey.escape);
    await t.pump();
    expect(requests, [false]);
    expect(find.text('Controlled'), findsOneWidget);
    expect(focus.hasFocus, isTrue);
    await t.tapAt(const Offset(2, 2));
    await t.pump();
    expect(requests, [false, false]);
    await t.pumpWidget(host(const SizedBox()));
    await t.pump();
    focus.dispose();
  });
  testWidgets('inside and dragged-out pointer sequences do not dismiss',
      (t) async {
    final requests = <bool>[];
    await t.pumpWidget(host(ForgeModal(
        open: true,
        onOpenChange: requests.add,
        closeOnOutsideClick: true,
        animated: false,
        children: const [
          ForgeModalHeader(title: 'Surface'),
          ForgeModalBody(child: Text('Inside'))
        ])));
    await openFrames(t);
    await t.tap(find.text('Inside'));
    await t.pump();
    expect(requests, isEmpty);
    final gesture = await t.startGesture(t.getCenter(find.text('Inside')));
    await gesture.moveTo(const Offset(2, 2));
    await gesture.up();
    await t.pump();
    expect(requests, isEmpty);
  });
  testWidgets('modal cancellation intercepts close before owner change',
      (t) async {
    final requests = <bool>[];
    final focus = FocusNode();
    await t.pumpWidget(host(ForgeModal(
        open: true,
        onOpenChange: requests.add,
        onCancel: (e) => e.cancel(),
        initialFocusNode: focus,
        animated: false,
        children: [
          const ForgeModalHeader(title: 'Cancel close'),
          ForgeModalBody(child: TextField(focusNode: focus))
        ])));
    await openFrames(t);
    await t.sendKeyEvent(LogicalKeyboardKey.escape);
    await t.pump();
    expect(requests, isEmpty);
    await t.pumpWidget(host(const SizedBox()));
    await t.pump();
    focus.dispose();
  });
  testWidgets('confirmation never closes or invokes confirm during loading',
      (t) async {
    var confirms = 0;
    final requests = <bool>[];
    await t.pumpWidget(host(ForgeConfirmationModal(
        open: true,
        title: 'Confirm',
        closeLabel: 'Close',
        cancelLabel: 'Cancel',
        confirmLabel: 'Apply',
        child: const Text('Review'),
        onConfirm: () => confirms++,
        loading: true,
        loadingLabel: 'Applying',
        onOpenChange: requests.add)));
    await openFrames(t);
    await t.tap(find.text('Applying'));
    await t.pump();
    expect(confirms, 0);
    expect(requests, isEmpty);
  });
  testWidgets(
      'phone input retains incomplete draft and submits only accepted canonical number',
      (t) async {
    final values = <ForgePhoneInputValue>[], states = <ForgePhoneParseResult>[];
    final form = ForgeFormBinding();
    await t.pumpWidget(host(ForgeInternationalTelephoneInput(
        value: const ForgePhoneInputValue(number: null, country: 'BR'),
        locale: ForgeLocale.ptBR,
        countryLabel: 'Country',
        internationalLabel: 'International',
        invalidMessage: 'Invalid phone',
        name: 'phone',
        form: form,
        fixedCountry: 'BR',
        onValueChange: values.add,
        onInputStateChange: states.add)));
    final editor = find.byType(TextField);
    await t.enterText(editor, '11');
    await t.pump();
    expect(values, isEmpty);
    expect(states.last.kind, ForgePhoneParseKind.incomplete);
    await t.enterText(editor, '11987654321');
    await t.pump();
    expect(values.single.number, '+5511987654321');
    expect(form.data().get('phone'), ''); // owner refused the edit
    await t.pumpWidget(host(const SizedBox()));
    form.dispose();
  });
}
