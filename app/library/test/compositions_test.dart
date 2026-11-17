import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';

Widget host(Widget child) => MaterialApp(
    theme: ForgeThemeData.light(),
    home: Scaffold(body: SizedBox(width: 400, child: child)));
void main() {
  testWidgets('card sorts canonical parts and child actions remain independent',
      (t) async {
    var actions = 0;
    await t.pumpWidget(host(ForgeCard(children: [
      ForgeCardFooter(
          child: ForgeButton(
              onPressed: () => actions++, child: const Text('Act'))),
      const ForgeCardBody(child: Text('Body')),
      const ForgeCardHeader(child: Text('Title'))
    ])));
    expect(t.getTopLeft(find.text('Title')).dy,
        lessThan(t.getTopLeft(find.text('Body')).dy));
    await t.tap(find.text('Act'));
    await t.pump();
    expect(actions, 1);
    expect(t.takeException(), isNull);
  });
  testWidgets('parts require matching owner and a unique required body',
      (t) async {
    await t.pumpWidget(host(const ForgeCardHeader(child: Text('orphan'))));
    expect(t.takeException(), isStateError);
    await t.pumpWidget(host(const ForgeCard(children: [ForgeCardHeader()])));
    expect(t.takeException(), isArgumentError);
    await t.pumpWidget(
        host(const ForgeCard(children: [ForgeCardBody(), ForgeCardBody()])));
    expect(t.takeException(), isArgumentError);
  });
  testWidgets('loading state owns one accessible status label', (t) async {
    final semantics = t.ensureSemantics();
    await t.pumpWidget(
        host(const ForgeLoadingState(label: 'Loading results', children: [
      ForgeLoadingStateHeader(child: Text('Results')),
      ForgeLoadingStateBody(child: Text('Please wait'))
    ])));
    expect(find.byType(ForgeSpinner), findsOneWidget);
    expect(find.bySemanticsLabel(RegExp('Loading results')), findsOneWidget);
    semantics.dispose();
  });
  testWidgets('list has real item content and child actions', (t) async {
    await t.pumpWidget(host(const ForgeList(label: 'Options', children: [
      ForgeListBody(items: [
        ForgeListItem(child: Text('First')),
        ForgeListItem(child: Text('Second'))
      ])
    ])));
    expect(find.text('First'), findsOneWidget);
    expect(find.text('Second'), findsOneWidget);
    expect(t.takeException(), isNull);
  });
  testWidgets(
      'form submit validates and includes exact submitter once; reset restores field',
      (t) async {
    final submissions = <ForgeFormData>[];
    await t.pumpWidget(host(
        ForgeForm(onValidSubmit: (data, e) => submissions.add(data), children: [
      const ForgeFormBody(
          children: [ForgeInput(name: 'title', required: true)]),
      const ForgeFormFooter(children: [
        ForgeButton(
            type: ForgeButtonType.submit,
            name: 'action',
            value: 'save',
            child: Text('Save')),
        ForgeButton(type: ForgeButtonType.reset, child: Text('Reset'))
      ])
    ])));
    await t.tap(find.text('Save'));
    await t.pump();
    expect(submissions, isEmpty);
    await t.enterText(find.byType(TextField), 'native');
    await t.tap(find.text('Save'));
    await t.pump();
    expect(submissions.single.get('title'), 'native');
    expect(submissions.single.getAll('action'), ['save']);
    await t.tap(find.text('Reset'));
    await t.pump();
    expect(t.widget<TextField>(find.byType(TextField)).controller!.text, '');
  });
  testWidgets('cancelled submit and reset retain owner control', (t) async {
    var submitted = 0;
    await t.pumpWidget(host(ForgeForm(
        onValidSubmit: (d, e) => submitted++,
        onSubmit: (e) => e.cancel(),
        onReset: (e) => e.cancel(),
        children: [
          const ForgeFormBody(children: [ForgeInput(defaultValue: 'start')]),
          const ForgeFormFooter(children: [
            ForgeButton(type: ForgeButtonType.submit, child: Text('Save')),
            ForgeButton(type: ForgeButtonType.reset, child: Text('Reset'))
          ])
        ])));
    await t.enterText(find.byType(TextField), 'changed');
    await t.tap(find.text('Save'));
    await t.tap(find.text('Reset'));
    await t.pump();
    expect(submitted, 0);
    expect(t.widget<TextField>(find.byType(TextField)).controller!.text,
        'changed');
  });
  testWidgets(
      'field association forwards focus and footer override to a real control',
      (t) async {
    await t.pumpWidget(host(ForgeFormField(
        controlId: 'email',
        label: 'Email',
        hint: 'old',
        error: 'old error',
        children: [
          ForgeFormFieldBody(
              controlBuilder: (c, f) => ForgeInput(
                  control: f.binding,
                  semanticLabel: f.label,
                  invalid: f.invalid)),
          const ForgeFormFieldFooter(hint: 'new hint', error: 'new error')
        ])));
    expect(find.text('old'), findsNothing);
    expect(find.text('new hint'), findsOneWidget);
    await t.tap(find.text('Email'));
    await t.pump();
    expect(t.widget<TextField>(find.byType(TextField)).focusNode!.hasFocus,
        isTrue);
    expect(find.text('new error'), findsOneWidget);
  });
  testWidgets(
      'currency input preserves incomplete drafts and refusal commits authoritative value on blur',
      (t) async {
    final edits = <String?>[];
    final states = <ForgeMoneyInputResult>[];
    final focus = FocusNode();
    await t.pumpWidget(host(Column(children: [
      ForgeCurrencyInput(
          value: '12.00',
          currency: 'USD',
          locale: ForgeLocale.en,
          invalidMessage: 'Invalid amount',
          onValueChange: edits.add,
          onInputStateChange: states.add,
          focusNode: focus),
      const TextField()
    ])));
    focus.requestFocus();
    await t.pump();
    final editor = find.byType(TextField).first;
    await t.enterText(editor, '15.');
    await t.pump();
    expect(edits, isEmpty);
    expect(states.last.kind, ForgeMoneyInputKind.incomplete);
    focus.unfocus();
    await t.pump();
    expect(t.widget<TextField>(editor).controller!.text, '15.');
    focus.requestFocus();
    await t.pump();
    await t.enterText(editor, '15.50');
    await t.pump();
    expect(edits, ['15.50']);
    focus.unfocus();
    await t.pump();
    expect(t.widget<TextField>(editor).controller!.text, '12.00');
    await t.pumpWidget(host(const SizedBox()));
    focus.dispose();
  });
}
