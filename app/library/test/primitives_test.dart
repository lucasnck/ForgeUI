import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';
import 'package:forge_ui/src/helpers/range.dart';
import 'package:forge_ui/src/generated/forge_icons.g.dart';

Widget host(Widget child, {TextDirection direction = TextDirection.ltr}) =>
    MaterialApp(
        theme: ForgeThemeData.light(),
        home: Scaffold(
            body: Directionality(
                textDirection: direction,
                child: Center(child: SizedBox(width: 360, child: child)))));

void main() {
  test(
      'portable ranges retain zero, indeterminate and ordered meter thresholds',
      () {
    expect(normalizeForgeProgress(0, null).value, 0);
    expect(normalizeForgeProgress(double.nan, -1).value, isNull);
    expect(normalizeForgeProgress(200, 100).value, 100);
    final r = normalizeForgeMeter(
        value: 50,
        min: 0,
        max: 100,
        low: 90,
        high: 5,
        optimum: double.infinity);
    expect(r.low, 90);
    expect(r.high, 90);
    expect(r.optimum, 50);
    expect(r.ratio, .5);
    expect(
        normalizeForgeMeter(
                value: double.nan, min: double.maxFinite, max: double.infinity)
            .max,
        100);
  });
  test('native vectors retain source identity and arrow geometry', () {
    expect(ForgeIconName.values.length, 35);
    expect(ForgeIconName.values.map((n) => n.sourceName).toSet().length, 35);
    final arrow = forgeIconGeometry[ForgeIconName.arrowLeft]!;
    expect(arrow.paths.length, 3);
    expect(arrow.paths[0].getBounds().left, 5);
    expect(arrow.paths[0].getBounds().right, 19);
    for (final g in forgeIconGeometry.values)
      for (final path in g.paths) {
        final r = path.getBounds();
        expect(
            r.left.isFinite &&
                r.right.isFinite &&
                r.top.isFinite &&
                r.bottom.isFinite,
            isTrue);
      }
  });
  testWidgets(
      'text defaults and six heading levels keep token styles and names',
      (tester) async {
    final semantics = tester.ensureSemantics();
    for (var level = 1; level <= 6; level++) {
      await tester
          .pumpWidget(host(ForgeHeading(level: level, text: 'Heading')));
      expect(find.bySemanticsLabel('Heading'), findsOneWidget);
      final style =
          DefaultTextStyle.of(tester.element(find.text('Heading'))).style;
      expect(style.color, ForgeTokens.light.colorTextDefault);
    }
    await tester.pumpWidget(host(const ForgeFieldError(text: 'Invalid')));
    expect(find.bySemanticsLabel('Invalid'), findsOneWidget);
    await tester
        .pumpWidget(host(const ForgeVisuallyHidden(text: 'Description')));
    expect(find.bySemanticsLabel('Description'), findsOneWidget);
    expect(tester.getSize(find.byType(ForgeVisuallyHidden)).height, 0);
    semantics.dispose();
  });
  testWidgets('wrapping baseline and RTL layout keep all children finite',
      (tester) async {
    for (final align in ForgeAlign.values) {
      await tester.pumpWidget(host(
          ForgeInline(align: align, gap: ForgeSpace.s3, children: [
            const SizedBox(width: 200, height: 20, child: Text('One')),
            const SizedBox(width: 200, height: 40, child: Text('Two')),
          ]),
          direction: TextDirection.rtl));
      expect(tester.getTopLeft(find.text('Two')).dy,
          greaterThan(tester.getTopLeft(find.text('One')).dy));
      expect(tester.takeException(), isNull);
    }
    await tester.pumpWidget(host(const ForgeSimpleGrid(
        columns: ForgeResponsive(base: 1, mobile: 2, wide: 4),
        children: [Text('A'), Text('B')])));
    expect(tester.takeException(), isNull);
  });
  testWidgets(
      'passive feedback renders real source variants without extra actions',
      (tester) async {
    final semantics = tester.ensureSemantics();
    await tester.pumpWidget(host(const ForgeStack(children: [
      ForgeSurface(
          elevation: ForgeElevation.floating,
          child: ForgeText(text: 'Surface')),
      ForgeBadge(
          text: '0',
          appearance: ForgeAppearance.bordered,
          tone: ForgeTone.sand),
      ForgeAvatar(label: 'User', initials: 'AB'),
      ForgeSkeleton(animated: false),
      ForgeProgress(label: 'Upload', value: 0),
      ForgeMeter(label: 'Temperature', value: 50),
      ForgeIcon(name: ForgeIconName.check, label: 'Complete'),
      ForgeDivider(semanticLabel: 'Separator'),
    ])));
    expect(find.text('0'), findsOneWidget);
    expect(find.bySemanticsLabel('User'), findsOneWidget);
    expect(find.bySemanticsLabel('Complete'), findsOneWidget);
    expect(tester.takeException(), isNull);
    semantics.dispose();
  });
  testWidgets(
      'label binding targets borrowed focus; link delegates exact destination',
      (tester) async {
    final node = FocusNode(),
        binding = ForgeControlBinding(id: 'field', focusNode: FocusNode());
    ForgeLaunchRequest? request;
    await tester
        .pumpWidget(host(Column(mainAxisSize: MainAxisSize.min, children: [
      ForgeLabel(control: binding, text: 'Label', required: true),
      TextField(focusNode: binding.focusNode),
      ForgeLink(
          href: '../records?x=1',
          launcher: (r) => request = r,
          child: const Text('Navigate')),
    ])));
    await tester.tap(find.text('Label'));
    await tester.pump();
    expect(binding.focusNode.hasFocus, isTrue);
    await tester.tap(find.text('Navigate'));
    expect(request?.href, '../records?x=1');
    await tester.pumpWidget(const SizedBox());
    binding.dispose();
    binding.focusNode.dispose();
    node.dispose();
  });
}
