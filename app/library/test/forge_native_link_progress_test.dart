import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';

Widget host(Widget child, {bool reduceMotion = true}) => WidgetsApp(
      color: const Color(0xff101820),
      home: ForgeThemeScope.forId(
        theme: ForgeThemeId.light,
        child: MediaQuery(
          data: MediaQueryData(disableAnimations: reduceMotion),
          child: Directionality(
            textDirection: TextDirection.ltr,
            child: Center(child: child),
          ),
        ),
      ),
    );

void main() {
  testWidgets('ForgeLink delegates exact destination and metadata on tap',
      (tester) async {
    ForgeLaunchRequest? request;
    await tester.pumpWidget(host(ForgeLink(
      href: '../search?q=a&mode=1',
      target: '_blank',
      rel: 'noreferrer',
      download: 'export.csv',
      hrefLang: 'pt-BR',
      launcher: (next) => request = next,
      child: const Text('Open report'),
    )));
    await tester.tap(find.text('Open report'));
    expect(request?.href, '../search?q=a&mode=1');
    expect(request?.target, '_blank');
    expect(request?.rel, 'noreferrer');
    expect(request?.download, 'export.csv');
    expect(request?.language, 'pt-BR');
    expect(tester.takeException(), isNull);
  });

  testWidgets('ForgeLink activates once via Enter and Space', (tester) async {
    final focus = FocusNode();
    addTearDown(focus.dispose);
    var activations = 0;
    await tester.pumpWidget(host(ForgeLink(
      href: '/dashboard',
      focusNode: focus,
      onActivate: () => activations++,
      child: const Text('Dashboard'),
    )));
    focus.requestFocus();
    await tester.pump();
    await tester.sendKeyEvent(LogicalKeyboardKey.enter);
    await tester.pump();
    expect(activations, 1);
    await tester.sendKeyEvent(LogicalKeyboardKey.space);
    await tester.pump();
    expect(activations, 2);
  });

  testWidgets('Link with no href stays passive', (tester) async {
    var activations = 0;
    await tester.pumpWidget(host(ForgeLink(
      onActivate: () => activations++,
      child: const Text('Passive label'),
    )));
    await tester.tap(find.text('Passive label'));
    expect(activations, 0);
  });

  testWidgets('Progress handles determinate zero and clamped max',
      (tester) async {
    await tester.pumpWidget(host(const Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        ForgeProgress(label: 'Zero', value: 0, animated: false),
        ForgeProgress(label: 'Over', value: 150, max: 100, animated: false),
      ],
    )));
    expect(find.byType(ForgeProgress), findsNWidgets(2));
    expect(find.byType(ForgeRangeTrack), findsNWidgets(2));
    expect(tester.takeException(), isNull);
    expect(find.bySemanticsLabel('Zero'), findsOneWidget);
    expect(find.bySemanticsLabel('Over'), findsOneWidget);
  });

  testWidgets('Indeterminate progress uses native paint and reduced motion',
      (tester) async {
    await tester.pumpWidget(host(
      const ForgeProgress(label: 'Working', animated: true),
      reduceMotion: true,
    ));
    await tester.pump(const Duration(milliseconds: 250));
    expect(find.byType(ForgeRangeTrack), findsOneWidget);
    expect(find.byType(ColoredBox), findsWidgets);
    expect(tester.takeException(), isNull);
  });

  testWidgets('RangeTrack remains compatible with Meter and ProgressBar',
      (tester) async {
    await tester.pumpWidget(host(const Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        ForgeProgressBar(label: 'Download', value: 50, valueText: '50 / 100'),
        ForgeMeter(label: 'Temperature', value: 10, min: 0, max: 40),
      ],
    )));
    expect(find.byType(ForgeRangeTrack), findsNWidgets(2));
    expect(tester.takeException(), isNull);
  });
}
