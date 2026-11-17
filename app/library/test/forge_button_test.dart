import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';

Widget host(Widget child,
        {ForgeShape shape = ForgeShape.rounded, bool reduce = false}) =>
    MaterialApp(
        theme: ForgeThemeData.light().copyWith(extensions: [
          ForgeThemeTokens.fromId(ForgeThemeId.light).copyWith(shape: shape)
        ]),
        home: MediaQuery(
            data: MediaQueryData(disableAnimations: reduce),
            child: Scaffold(body: Center(child: child))));

void main() {
  testWidgets(
      'one native activation; disabled, loading and null suppress actions',
      (tester) async {
    var hits = 0;
    for (final state in ['enabled', 'disabled', 'loading', 'null']) {
      await tester.pumpWidget(host(ForgeButton(
          onPressed: state == 'null' ? null : () => hits++,
          disabled: state == 'disabled',
          loading: state == 'loading',
          child: const Text('Action'))));
      await tester.tap(find.text('Action'));
      await tester.pump();
    }
    expect(hits, 1);
  });
  testWidgets('loading replacement, empty fallback and explicit semantics',
      (tester) async {
    final handle = tester.ensureSemantics();
    await tester.pumpWidget(host(ForgeButton(
        onPressed: () {},
        loading: true,
        loadingLabel: 'Saving',
        child: const Text('Save'))));
    expect(find.text('Save'), findsNothing);
    expect(find.text('Saving'), findsOneWidget);
    expect(tester.widget<ForgeSpinner>(find.byType(ForgeSpinner)).decorative,
        isTrue);
    expect(find.bySemanticsLabel('Saving'), findsOneWidget);
    await tester.pumpWidget(host(ForgeButton(
        onPressed: () {},
        loading: true,
        loadingLabel: '',
        semanticLabel: 'Save record',
        child: const Text('Save'))));
    expect(find.text('Save'), findsOneWidget);
    expect(find.bySemanticsLabel('Save record'), findsOneWidget);
    expect(find.bySemanticsLabel('Save'), findsNothing);
    handle.dispose();
  });
  testWidgets(
      'appearance overrides variant and legacy; theme shape is inherited',
      (tester) async {
    // ignore: deprecated_member_use
    await tester.pumpWidget(host(
        ForgeButton(
            onPressed: () {},
            outlined: true,
            variant: ForgeVariant.solid,
            appearance: ForgeAppearance.soft,
            child: const Text('Go')),
        shape: ForgeShape.pill));
    final button = tester.widget<FilledButton>(find.byType(FilledButton));
    final p = ForgeTokens.light;
    expect(button.style!.backgroundColor!.resolve({}), p.colorSurfaceSubtle);
    final inherited =
        button.style!.shape!.resolve({})! as RoundedRectangleBorder;
    expect(inherited.borderRadius, BorderRadius.circular(p.radiusFull));
    await tester.pumpWidget(host(ForgeButton(
        onPressed: () {},
        shape: ForgeShape.square,
        appearance: ForgeAppearance.bordered,
        child: const Text('Go'))));
    final outlined = tester.widget<OutlinedButton>(find.byType(OutlinedButton));
    expect(
        (outlined.style!.shape!.resolve({})! as RoundedRectangleBorder)
            .borderRadius,
        BorderRadius.zero);
  });
  testWidgets(
      'bounded full width, unbounded fallback and scaled content stay finite',
      (tester) async {
    await tester.pumpWidget(host(SizedBox(
        width: 320,
        child: ForgeButton(
            onPressed: () {}, fullWidth: true, child: const Text('Wide')))));
    expect(tester.getSize(find.byType(ForgeButton)).width, 320);
    await tester.pumpWidget(host(SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: ForgeButton(
            onPressed: () {}, fullWidth: true, child: const Text('Finite')))));
    expect(tester.takeException(), isNull);
    expect(tester.getSize(find.byType(ForgeButton)).width.isFinite, isTrue);
    await tester.pumpWidget(host(SizedBox(
        width: 160,
        child: MediaQuery(
            data: const MediaQueryData(textScaler: TextScaler.linear(2)),
            child: ForgeButton(
                onPressed: () {},
                child: const Text('Long scaled action label'))))));
    expect(tester.takeException(), isNull);
  });
  testWidgets('keyboard activation and borrowed focus survive widget disposal',
      (tester) async {
    final focus = FocusNode();
    var hits = 0;
    await tester.pumpWidget(host(ForgeButton(
        focusNode: focus,
        autofocus: true,
        onPressed: () => hits++,
        child: const Text('Keyboard'))));
    await tester.pump();
    await tester.sendKeyEvent(LogicalKeyboardKey.enter);
    await tester.pump();
    expect(hits, 1);
    await tester.pumpWidget(const SizedBox());
    expect(() => focus.addListener(() {}), returnsNormally);
    focus.dispose();
  });
}
