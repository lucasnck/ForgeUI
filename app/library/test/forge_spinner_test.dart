import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';

Widget host(Widget child, {bool reduced = false}) => MaterialApp(
    theme: ForgeThemeData.light(),
    home: MediaQuery(
        data: MediaQueryData(disableAnimations: reduced),
        child: Center(child: child)));

void main() {
  testWidgets('requires a nonblank status label', (tester) async {
    await tester
        .pumpWidget(host(const ForgeSpinner(decorative: false, label: ' ')));
    expect(tester.takeException(), isArgumentError);
  });
  testWidgets('named status, decorative exclusion and reduced-motion cleanup',
      (tester) async {
    final semantics = tester.ensureSemantics();
    await tester.pumpWidget(
        host(const ForgeSpinner(decorative: false, label: 'Loading records')));
    expect(find.bySemanticsLabel('Loading records'), findsOneWidget);
    expect(tester.binding.transientCallbackCount, greaterThan(0));
    await tester.pumpWidget(host(
        const ForgeSpinner(decorative: false, label: 'Loading records'),
        reduced: true));
    await tester.pump();
    expect(tester.binding.transientCallbackCount, 0);
    await tester.pumpWidget(
        host(const ForgeSpinner(label: 'Do not announce', animated: false)));
    expect(find.bySemanticsLabel('Do not announce'), findsNothing);
    await tester.pumpWidget(const SizedBox());
    expect(tester.binding.transientCallbackCount, 0);
    semantics.dispose();
  });
  testWidgets('every size uses the Web spinner token, not control height',
      (tester) async {
    final p = ForgeTokens.light;
    final lengths = [p.length2, p.length3, p.length4, p.length5, p.length6];
    for (final size in ForgeSize.values) {
      await tester.pumpWidget(host(ForgeSpinner(size: size, animated: false)));
      expect(tester.getSize(find.byType(CustomPaint).last).width,
          lengths[size.index]);
    }
  });
}
