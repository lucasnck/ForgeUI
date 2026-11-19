import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';

void main() {
  testWidgets(
      'modal exit paints without interaction, restores focus once and reverses without resetting fields',
      (t) async {
    var open = true;
    late StateSetter update;
    var closed = 0;
    final origin = FocusNode(), field = FocusNode();
    await t.pumpWidget(MaterialApp(
        theme: ForgeThemeData.light(),
        home: Scaffold(body: StatefulBuilder(builder: (context, set) {
          update = set;
          return Column(children: [
            ForgeButton(
                focusNode: origin,
                onPressed: () {},
                child: const Text('Origin')),
            ForgeModal(
                open: open,
                initialFocusNode: field,
                returnFocusNode: origin,
                onClose: () => closed++,
                animationEffect: ForgeAnimationEffect.scale,
                children: [
                  const ForgeModalHeader(title: 'Dialog title'),
                  ForgeModalBody(child: TextField(focusNode: field)),
                  const ForgeModalFooter(children: [Text('Footer')])
                ])
          ]);
        }))));
    await t.pumpAndSettle();
    await t.enterText(find.byType(TextField), 'Cached');
    await t.pump();
    update(() => open = false);
    await t.pump();
    await t.pump();
    expect(closed, 1);
    expect(origin.hasFocus, isTrue);
    expect(field.hasFocus, isFalse);
    expect(find.byType(TextField), findsOneWidget);
    expect(find.byType(TextField).hitTestable(), findsNothing);
    await t.pump(const Duration(milliseconds: 30));
    update(() => open = true);
    await t.pump();
    await t.pumpAndSettle();
    expect(t.widget<EditableText>(find.byType(EditableText)).controller.text,
        'Cached');
    expect(field.hasFocus, isTrue);
    expect(closed, 1);
    update(() => open = false);
    await t.pump();
    await t.pumpAndSettle();
    expect(closed, 2);
    expect(find.byType(TextField), findsNothing);
    await t.pumpWidget(const SizedBox());
    await t.pump();
    origin.dispose();
    field.dispose();
    expect(t.takeException(), isNull);
  });
  testWidgets(
      'outside dismissal uses transformed surface bounds during scale entry',
      (t) async {
    final requests = <bool>[];
    await t.pumpWidget(MaterialApp(
        theme: ForgeThemeData.light(),
        home: Scaffold(
            body: ForgeModal(
                open: true,
                closeOnOutsideClick: true,
                animationEffect: ForgeAnimationEffect.scale,
                onOpenChange: requests.add,
                children: const [
              ForgeModalHeader(title: 'Scaled'),
              ForgeModalBody(child: Text('Body'))
            ]))));
    await t.pump();
    await t.pump();
    final rect = t.getRect(find.byType(ForgeSurface));
    await t.tapAt(Offset(rect.right + 0.5, rect.center.dy));
    await t.pump();
    expect(requests, [false]);
    await t.pumpWidget(const SizedBox());
    await t.pump();
    expect(t.takeException(), isNull);
  });
}
