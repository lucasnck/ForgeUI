import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';

Widget checkableHost(Widget child, {
  ForgeThemeId theme = ForgeThemeId.light,
  bool reduceMotion = true,
}) => WidgetsApp(
  color: const Color(0xFF141D28),
  home: ForgeThemeScope.forId(
    theme: theme,
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
  testWidgets('native Checkbox toggles once per tap and keyboard action',
      (tester) async {
    for (final theme in ForgeThemeId.values) {
      final focus = FocusNode();
      final events = <bool>[];
      await tester.pumpWidget(checkableHost(
        ForgeCheckbox(
          key: ValueKey(theme),
          focusNode: focus,
          semanticLabel: 'Accept terms',
          onChanged: events.add,
        ),
        theme: theme,
      ));
      await tester.tap(find.byType(ForgeCheckbox));
      await tester.pump();
      expect(events, [true]);
      focus.requestFocus();
      await tester.pump();
      await tester.sendKeyDownEvent(LogicalKeyboardKey.space);
      await tester.pump();
      expect(events, [true, false]);
      await tester.sendKeyUpEvent(LogicalKeyboardKey.space);
      await tester.sendKeyDownEvent(LogicalKeyboardKey.enter);
      await tester.pump();
      expect(events, [true, false, true]);
      await tester.sendKeyUpEvent(LogicalKeyboardKey.enter);
      await tester.pumpWidget(const SizedBox());
      focus.dispose();
    }
  });

  testWidgets('controlled Checkbox does not mutate when parent refuses',
      (tester) async {
    final events = <bool>[];
    await tester.pumpWidget(checkableHost(ForgeCheckbox(
      checked: false,
      semanticLabel: 'Controlled',
      onChanged: events.add,
    )));
    await tester.tap(find.byType(ForgeCheckbox));
    await tester.pump();
    expect(events, [true]);
    final widget = tester.widget<ForgeCheckbox>(find.byType(ForgeCheckbox));
    expect(widget.checked, isFalse);
  });

  testWidgets('disabled Checkables do not activate', (tester) async {
    final events = <bool>[];
    await tester.pumpWidget(checkableHost(Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        ForgeCheckbox(disabled: true, onChanged: events.add),
        ForgeRadio(disabled: true, onChanged: events.add),
        ForgeSwitch(disabled: true, onChanged: events.add),
      ],
    )));
    for (final type in [ForgeCheckbox, ForgeRadio, ForgeSwitch]) {
      await tester.tap(find.byType(type));
    }
    await tester.pump();
    expect(events, isEmpty);
  });

  testWidgets('Radio selects once, Switch toggles both ways',
      (tester) async {
    final radioEvents = <bool>[];
    final switchEvents = <bool>[];
    await tester.pumpWidget(checkableHost(Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        ForgeRadio(semanticLabel: 'Option A', onChanged: radioEvents.add),
        ForgeSwitch(semanticLabel: 'Notifications', onChanged: switchEvents.add),
      ],
    )));
    await tester.tap(find.byType(ForgeRadio));
    await tester.tap(find.byType(ForgeRadio));
    await tester.tap(find.byType(ForgeSwitch));
    await tester.pump();
    await tester.tap(find.byType(ForgeSwitch));
    await tester.pump();
    expect(radioEvents, [true]);
    expect(switchEvents, [true, false]);
    expect(tester.takeException(), isNull);
  });
}
