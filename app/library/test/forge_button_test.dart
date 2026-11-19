import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';

Widget host(Widget child,
        {ForgeThemeId theme = ForgeThemeId.light,
        ForgeShape shape = ForgeShape.rounded,
        bool reduce = false}) =>
    WidgetsApp(
        color: const Color(0xFF101820),
        home: ForgeThemeScope(
            tokens: ForgeThemeTokens.fromId(theme).copyWith(shape: shape),
            child: MediaQuery(
                data: MediaQueryData(disableAnimations: reduce),
                child: Directionality(
                    textDirection: TextDirection.ltr,
                    child: Center(child: child)))));

BoxDecoration actionDecoration(WidgetTester tester) =>
    tester.widget<AnimatedContainer>(find.byType(AnimatedContainer).first).decoration!
        as BoxDecoration;

void main() {
  testWidgets('one activation; disabled, loading and null suppress actions',
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

  testWidgets('loading replacement, fallback and explicit semantics',
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

  testWidgets('appearance precedence and theme shape follow Forge Web tokens',
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
    expect(actionDecoration(tester).color, ForgeTokens.light.colorSurfaceSubtle);
    expect(actionDecoration(tester).borderRadius,
        BorderRadius.circular(ForgeTokens.light.radiusFull));
    await tester.pumpWidget(host(ForgeButton(
        onPressed: () {},
        shape: ForgeShape.square,
        appearance: ForgeAppearance.bordered,
        child: const Text('Go'))));
    expect(actionDecoration(tester).borderRadius, BorderRadius.zero);
    expect(actionDecoration(tester).color, ForgeTokens.light.colorSurfaceDefault);
  });

  testWidgets('all four token themes and sizes work without MaterialApp',
      (tester) async {
    for (final theme in ForgeThemeId.values) {
      final palette = ForgeThemeTokens.fromId(theme).palette;
      for (final size in ForgeSize.values) {
        await tester.pumpWidget(host(
            ForgeButton(
                onPressed: () {}, size: size, child: const Text('Native')),
            theme: theme,
            reduce: true));
        expect(actionDecoration(tester).color,
            palette.colorActionBrandBackground);
        expect(tester.getSize(find.byType(ForgeButton)).height,
            greaterThanOrEqualTo(48));
        expect(tester.getSize(find.byType(AnimatedContainer).first).height,
            greaterThanOrEqualTo(palette.number('--component-height-${size.name}')));
        expect(tester.takeException(), isNull);
      }
    }
  });

  testWidgets('bounded fullWidth, unbounded fallback and scaled text',
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

  testWidgets('keyboard activation and borrowed FocusNode survive disposal',
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
    await tester.sendKeyEvent(LogicalKeyboardKey.space);
    await tester.pump();
    expect(hits, 2);
    await tester.pumpWidget(const SizedBox());
    expect(() => focus.addListener(() {}), returnsNormally);
    focus.dispose();
  });
}
