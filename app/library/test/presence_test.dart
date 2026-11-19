import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';
import 'package:forge_ui/src/components/internal/forge_presence.dart';

Widget host(Widget child, {bool reduced = false}) => MaterialApp(
    theme: ForgeThemeData.light(),
    home: Scaffold(
        body: MediaQuery(
            data: MediaQueryData(disableAnimations: reduced), child: child)));
void main() {
  testWidgets(
      'closing paint is retained while focus, pointer and semantics are removed immediately',
      (t) async {
    final semantics = t.ensureSemantics();
    try {
      var visible = true;
      late StateSetter update;
      final focus = FocusNode();
      await t.pumpWidget(host(StatefulBuilder(builder: (context, set) {
        update = set;
        return ForgePresence(
            visible: visible, child: TextField(focusNode: focus));
      })));
      await t.pumpAndSettle();
      await t.enterText(find.byType(TextField), 'Mantido');
      focus.requestFocus();
      await t.pump();
      update(() => visible = false);
      await t.pump();
      expect(focus.hasFocus, isFalse);
      expect(find.byType(TextField).hitTestable(), findsNothing);
      expect(find.byType(TextField), findsOneWidget);
      final exclusions = t.widgetList<ExcludeSemantics>(find.descendant(
          of: find.byType(ForgePresence),
          matching: find.byType(ExcludeSemantics)));
      expect(exclusions.any((w) => w.excluding), isTrue);
      await t.pumpAndSettle();
      expect(find.byType(TextField), findsNothing);
      update(() => visible = true);
      await t.pumpAndSettle();
      expect(t.widget<EditableText>(find.byType(EditableText)).controller.text,
          'Mantido');
      await t.pumpWidget(const SizedBox());
      focus.dispose();
    } finally {
      semantics.dispose();
    }
  });
  testWidgets(
      'interrupted close retargets and completion is only emitted for accepted final closure',
      (t) async {
    var visible = true;
    late StateSetter update;
    var hidden = 0;
    await t.pumpWidget(host(StatefulBuilder(builder: (context, set) {
      update = set;
      return ForgePresence(
          visible: visible,
          effect: ForgeAnimationEffect.scale,
          onHidden: () => hidden++,
          child: const Text('Content'));
    })));
    await t.pumpAndSettle();
    update(() => visible = false);
    await t.pump();
    await t.pump(const Duration(milliseconds: 30));
    update(() => visible = true);
    await t.pump();
    await t.pumpAndSettle();
    expect(hidden, 0);
    update(() => visible = false);
    await t.pump();
    await t.pumpAndSettle();
    expect(hidden, 1);
    await t.pump(const Duration(seconds: 1));
    expect(hidden, 1);
  });
  testWidgets(
      'motion opt out and reduced motion snap without replacing child state',
      (t) async {
    var visible = true, animated = true, reduced = false;
    late StateSetter update;
    await t.pumpWidget(MaterialApp(
        theme: ForgeThemeData.light(),
        home: Scaffold(body: StatefulBuilder(builder: (context, set) {
          update = set;
          return MediaQuery(
              data: MediaQueryData(disableAnimations: reduced),
              child: ForgePresence(
                  visible: visible,
                  animated: animated,
                  child: const TextField()));
        }))));
    await t.pumpAndSettle();
    await t.enterText(find.byType(TextField), 'Estado');
    update(() {
      animated = false;
      visible = false;
    });
    await t.pump();
    expect(find.byType(TextField), findsNothing);
    update(() => visible = true);
    await t.pump();
    expect(t.widget<EditableText>(find.byType(EditableText)).controller.text,
        'Estado');
    update(() {
      animated = true;
      reduced = true;
      visible = false;
    });
    await t.pump();
    expect(find.byType(TextField), findsNothing);
    update(() => visible = true);
    await t.pump();
    final opacity = t.widget<Opacity>(find
        .descendant(
            of: find.byType(ForgePresence), matching: find.byType(Opacity))
        .first);
    expect(opacity.opacity, 1);
    await t.pumpWidget(const SizedBox());
    await t.pump();
    expect(t.takeException(), isNull);
  });
}
