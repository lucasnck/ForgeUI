import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';

Widget host(Widget child) => MaterialApp(
    theme: ForgeThemeData.light(),
    home: Scaffold(body: Align(alignment: Alignment.topLeft, child: child)));
Future<void> frames(WidgetTester t) async {
  await t.pump();
  await t.pump();
  await t.pump();
}

void main() {
  testWidgets('popover opens with real field, Escape closes and returns focus',
      (t) async {
    await t.pumpWidget(host(const ForgePopover(
        triggerLabel: 'Open',
        label: 'Settings',
        children: [ForgePopoverBody(child: TextField())])));
    await frames(t);
    await t.tap(find.text('Open'));
    await frames(t);
    expect(find.byType(TextField), findsOneWidget);
    await t.enterText(find.byType(TextField), 'draft');
    await t.sendKeyEvent(LogicalKeyboardKey.escape);
    await frames(t);
    expect(find.byType(TextField), findsNothing);
    expect(FocusManager.instance.primaryFocus?.context, isNotNull);
  });
  testWidgets(
      'popover outside pointer requests close but controlled owner can refuse',
      (t) async {
    final requests = <bool>[];
    await t.pumpWidget(host(ForgePopover(
        open: true,
        onOpenChange: requests.add,
        triggerLabel: 'Open',
        label: 'Panel',
        children: const [ForgePopoverBody(child: Text('Details'))])));
    await frames(t);
    await t.tapAt(const Offset(700, 500));
    await frames(t);
    expect(requests, [false]);
    expect(find.text('Details'), findsOneWidget);
  });
  testWidgets(
      'anchored overlay clamps to viewport instead of overflowing its right edge',
      (t) async {
    await t.pumpWidget(MaterialApp(
        theme: ForgeThemeData.light(),
        home: Scaffold(
            body: Align(
                alignment: Alignment.topRight,
                child: ForgePopover(
                    triggerLabel: 'Open',
                    label: 'Panel',
                    open: true,
                    children: const [
                      ForgePopoverBody(
                          child:
                              SizedBox(width: 500, child: Text('Wide content')))
                    ])))));
    await frames(t);
    final rect = t.getRect(find.text('Wide content'));
    expect(rect.left, greaterThanOrEqualTo(0));
    expect(rect.right, lessThanOrEqualTo(800));
    expect(t.takeException(), isNull);
  });
  testWidgets(
      'tooltip exposes supplementary text on focus and honors controlled refusal',
      (t) async {
    final focus = FocusNode();
    final requests = <bool>[];
    await t.pumpWidget(host(ForgeTooltip(
        open: false,
        onOpenChange: requests.add,
        content: 'Supplement',
        child: ForgeButton(
            onPressed: () {}, focusNode: focus, child: const Text('Action')))));
    await frames(t);
    focus.requestFocus();
    await frames(t);
    expect(requests, [true]);
    expect(find.text('Supplement'), findsNothing);
    await t.pumpWidget(host(const SizedBox()));
    focus.dispose();
  });
  testWidgets('portal preserves nearest theme and removes content with owner',
      (t) async {
    await t.pumpWidget(host(Theme(
        data: ForgeThemeData.dark(),
        child: const ForgeOverlayPortal(children: [Text('Overlay content')]))));
    await frames(t);
    expect(find.text('Overlay content'), findsOneWidget);
    expect(ForgeThemeTokens.of(t.element(find.text('Overlay content'))).id,
        ForgeThemeId.dark);
    await t.pumpWidget(host(const SizedBox()));
    await frames(t);
    expect(find.text('Overlay content'), findsNothing);
  });
}
