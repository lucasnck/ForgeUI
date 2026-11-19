import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';

void main() {
  for (final rtl in [false, true]) {
    testWidgets('query popup fits viewport and keyboard insets (rtl: $rtl)',
        (t) async {
      await t.binding.setSurfaceSize(const Size(400, 400));
      addTearDown(() => t.binding.setSurfaceSize(null));
      final focus = FocusNode();
      String query = '';
      late StateSetter update;
      await t.pumpWidget(MaterialApp(
          theme: ForgeThemeData.light(),
          home: MediaQuery(
              data: const MediaQueryData(
                  size: Size(400, 400),
                  padding: EdgeInsets.fromLTRB(8, 8, 8, 8),
                  viewInsets: EdgeInsets.only(bottom: 160)),
              child: Directionality(
                  textDirection: rtl ? TextDirection.rtl : TextDirection.ltr,
                  child: Scaffold(
                      resizeToAvoidBottomInset: false,
                      body: Align(
                          alignment: Alignment.bottomRight,
                          child: SizedBox(
                              width: 200,
                              child: StatefulBuilder(builder: (context, set) {
                                update = set;
                                return ForgeAutocomplete(
                                    focusNode: focus,
                                    query: query,
                                    onQueryChange: (v) => set(() => query = v),
                                    listboxLabel: 'Suggestions',
                                    options: List.generate(
                                        10,
                                        (i) => ForgeChoiceOption(
                                            value: '$i', label: 'Option $i')),
                                    children: const [ForgeAutocompleteBody()]);
                              }))))))));
      await t.tap(find.byType(TextField));
      await t.pump();
      await t.pump();
      final popup = find
          .byWidgetPredicate((w) => w is ForgePopupListbox<ForgeChoiceOption>);
      final panel =
          find.descendant(of: popup, matching: find.byType(Material)).first;
      final rect = t.getRect(panel);
      expect(rect.left, greaterThanOrEqualTo(8));
      expect(rect.right, lessThanOrEqualTo(392));
      expect(rect.top, greaterThanOrEqualTo(8));
      expect(rect.bottom, lessThanOrEqualTo(240));
      expect(rect.width, lessThanOrEqualTo(200));
      await t.pumpAndSettle();
      expect(t.getRect(panel).width, 200);
      expect(focus.hasFocus, isTrue);
      update(() => query = 'different');
      await t.pump();
      expect(focus.hasFocus, isTrue);
      await t.pumpWidget(const SizedBox());
      await t.pump();
      focus.dispose();
      expect(t.takeException(), isNull);
    });
  }
  testWidgets(
      'closed popup does not instantiate items against an unavailable count',
      (t) async {
    final popup = ForgePopupListboxController(onAcceptOption: (_) {});
    popup.configure(count: 0, queryKey: 'query');
    await t.pumpWidget(MaterialApp(
        theme: ForgeThemeData.light(),
        home: Scaffold(
            body: ForgePopupListbox<String>(
                popup: popup,
                items: const ['Alpha'],
                getOptionLabel: (v) => v,
                listboxLabel: 'Options'))));
    expect(find.byType(ForgePopupListboxItem), findsNothing);
    expect(t.takeException(), isNull);
    popup.configure(count: 1, queryKey: 'query');
    popup.setFocused(true);
    await t.pump();
    expect(find.byType(ForgePopupListboxItem), findsOneWidget);
    popup.configure(count: 0, queryKey: 'query');
    await t.pump();
    expect(find.byType(ForgePopupListboxItem), findsNothing);
    expect(t.takeException(), isNull);
    await t.pumpWidget(const SizedBox());
    await t.pump();
    popup.dispose();
  });
}
