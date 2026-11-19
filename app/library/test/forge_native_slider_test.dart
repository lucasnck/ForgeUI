import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';

Widget host(Widget child, {TextDirection direction = TextDirection.ltr}) =>
    Directionality(
      textDirection: direction,
      child: ForgeThemeScope(
        tokens: ForgeThemeTokens.fromId(ForgeThemeId.light),
        child: Center(child: SizedBox(width: 280, child: child)),
      ),
    );

void main() {
  testWidgets('works under ForgeThemeScope without MaterialApp',
      (tester) async {
    final changes = <double>[];
    await tester.pumpWidget(host(ForgeSlider(
      defaultValue: 50,
      onChanged: changes.add,
      semanticLabel: 'Volume',
    )));
    await tester.tapAt(tester.getTopLeft(find.byType(ForgeSlider)) +
        const Offset(4, 20));
    await tester.pump();
    expect(changes, <double>[0]);
  });

  testWidgets('controlled slider reports values but does not mutate input',
      (tester) async {
    final changes = <double>[];
    final focus = FocusNode();
    addTearDown(focus.dispose);
    await tester.pumpWidget(host(ForgeSlider(
      value: 20,
      step: 10,
      focusNode: focus,
      onChanged: changes.add,
    )));
    focus.requestFocus();
    await tester.pump();
    await tester.sendKeyEvent(LogicalKeyboardKey.arrowRight);
    await tester.pump();
    await tester.sendKeyEvent(LogicalKeyboardKey.arrowRight);
    await tester.pump();
    expect(changes, <double>[30, 30]);
  });

  testWidgets('disabled and readonly prevent keyboard and touch changes',
      (tester) async {
    final changes = <double>[];
    await tester.pumpWidget(host(ForgeSlider(
      disabled: true,
      defaultValue: 20,
      onChanged: changes.add,
    )));
    await tester.tapAt(tester.getTopLeft(find.byType(ForgeSlider)) +
        const Offset(5, 20));
    await tester.pump();
    expect(changes, isEmpty);
    await tester.pumpWidget(host(ForgeSlider(
      readOnly: true,
      defaultValue: 20,
      onChanged: changes.add,
    )));
    await tester.tapAt(tester.getTopLeft(find.byType(ForgeSlider)) +
        const Offset(5, 20));
    await tester.pump();
    expect(changes, isEmpty);
  });

  testWidgets('RTL horizontal arrows reverse physical direction',
      (tester) async {
    final changes = <double>[];
    final focus = FocusNode();
    addTearDown(focus.dispose);
    await tester.pumpWidget(host(
      ForgeSlider(defaultValue: 50, step: 10,
          focusNode: focus, onChanged: changes.add),
      direction: TextDirection.rtl,
    ));
    focus.requestFocus();
    await tester.pump();
    await tester.sendKeyEvent(LogicalKeyboardKey.arrowRight);
    await tester.pump();
    expect(changes, <double>[40]);
  });

  testWidgets('range rejects equal bounds and nonpositive steps',
      (tester) async {
    await tester.pumpWidget(host(const ForgeSlider(min: 5, max: 5)));
    expect(tester.takeException(), isArgumentError);
    await tester.pumpWidget(host(const ForgeSlider(step: 0)));
    expect(tester.takeException(), isArgumentError);
  });
}
