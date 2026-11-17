import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';

Widget host(Widget child) =>
    MaterialApp(theme: ForgeThemeData.light(), home: Scaffold(body: child));
void main() {
  testWidgets(
      'typed field writes nested identity once, obeys errors and resets defaults',
      (t) async {
    final controller = ForgeTypedFormController<({String email})>(
        initialValues: (email: 'initial'));
    final path = ForgeFieldPath<({String email})>('profile.email',
        read: (v) => v.email, write: (v, text) => (email: text));
    var notifications = 0;
    controller.addListener(() => notifications++);
    await t.pumpWidget(host(ForgeTypedFormScope<({String email})>(
        controller: controller,
        child: ForgeForm(
            binding: controller,
            onValidSubmit: (data, event) {},
            children: [
              ForgeFormBody(children: [
                ForgeFormFieldInput<({String email})>(
                    name: path, label: 'Email', error: 'Displayed override')
              ])
            ]))));
    expect(t.widget<TextField>(find.byType(TextField)).controller!.text,
        'initial');
    final before = notifications;
    await t.enterText(find.byType(TextField), 'edited');
    await t.pump();
    expect(controller.values.email, 'edited');
    expect(controller.dirty, {'profile.email'});
    expect(notifications - before, 1);
    controller.setError('profile.email', 'Provider error');
    await t.pump();
    expect(controller.validate(), isFalse);
    await t.pump();
    expect(find.text('Displayed override'), findsOneWidget);
    expect(find.text('Provider error'), findsNothing);
    controller.reset();
    await t.pump();
    expect(controller.values.email, 'initial');
    expect(t.widget<TextField>(find.byType(TextField)).controller!.text,
        'initial');
    await t.pumpWidget(host(const SizedBox()));
    controller.dispose();
  });
  testWidgets('registered field fails clearly without typed owner', (t) async {
    final path = ForgeFieldPath<String>('name',
        read: (v) => v, write: (_, text) => text);
    await t.pumpWidget(
        host(ForgeFormFieldInput<String>(name: path, label: 'Name')));
    expect(t.takeException(), isStateError);
  });
  testWidgets(
      'application shell preserves entered state when responsive slots change',
      (t) async {
    var wide = false, header = false;
    late StateSetter update;
    await t.pumpWidget(host(StatefulBuilder(builder: (context, set) {
      update = set;
      return Align(
          alignment: Alignment.topLeft,
          child: SizedBox(
              width: wide ? 790 : 360,
              height: 500,
              child: ForgeApplicationLayoutTemplate(
                  header: header ? const Text('Header') : null,
                  navigation: const Text('Navigation'),
                  toolbar: const Text('Toolbar'),
                  footer: const Text('Footer'),
                  child: const TextField())));
    })));
    await t.enterText(find.byType(TextField), 'kept');
    update(() {
      wide = true;
      header = true;
    });
    await t.pump();
    expect(t.widget<EditableText>(find.byType(EditableText)).controller.text,
        'kept');
    expect(find.byType(MaterialApp), findsOneWidget);
    expect(find.text('Header'), findsOneWidget);
    expect(t.takeException(), isNull);
  });
  testWidgets(
      'page templates omit absent slots and preserve header/content ordering',
      (t) async {
    await t.pumpWidget(host(const SingleChildScrollView(
        child: ForgeHomePageTemplate(
            titleId: 'home-title',
            pageTitle: Text('Home'),
            quickActions: Text('Quick actions'),
            summary: Text('Summary'),
            child: Text('Content')))));
    expect(t.getTopLeft(find.text('Home')).dy,
        lessThan(t.getTopLeft(find.text('Quick actions')).dy));
    expect(t.getTopLeft(find.text('Quick actions')).dy,
        lessThan(t.getTopLeft(find.text('Summary')).dy));
    expect(t.getTopLeft(find.text('Summary')).dy,
        lessThan(t.getTopLeft(find.text('Content')).dy));
  });
  testWidgets(
      'page transition commits latest content immediately and snaps for reduced motion',
      (t) async {
    var screen = 'a', reduced = false;
    late StateSetter update;
    await t.pumpWidget(host(StatefulBuilder(builder: (context, set) {
      update = set;
      return MediaQuery(
          data: MediaQuery.of(context).copyWith(disableAnimations: reduced),
          child: ForgeTransitionScope(
              snapshot: ForgeTransitionSnapshot(
                  screenKey: screen, intent: ForgePageTransitionIntent.forward),
              child: ForgePageTransition(child: Text(screen))));
    })));
    update(() => screen = 'b');
    await t.pump();
    expect(find.text('b'), findsOneWidget);
    expect(find.text('a'), findsNothing);
    await t.pump(const Duration(milliseconds: 30));
    update(() => screen = 'c');
    await t.pump();
    expect(find.text('c'), findsOneWidget);
    expect(find.text('b'), findsNothing);
    update(() => reduced = true);
    await t.pump();
    expect(
        t
            .widget<Opacity>(find
                .ancestor(of: find.text('c'), matching: find.byType(Opacity))
                .first)
            .opacity,
        1);
    await t.pumpAndSettle();
  });
  testWidgets(
      'shared element uses real native route participation and direct-entry fallback',
      (t) async {
    await t.pumpWidget(MaterialApp(
        theme: ForgeThemeData.light(),
        home: Builder(
            builder: (context) => Scaffold(
                    body: Column(children: [
                  const ForgeSharedElement(
                      name: 'catalog/item/title', child: Text('Source')),
                  TextButton(
                      onPressed: () => Navigator.of(context).push(
                          MaterialPageRoute<void>(
                              builder: (context) => const Scaffold(
                                  body: ForgeSharedElement(
                                      name: 'catalog/item/title',
                                      child: Text('Destination'))))),
                      child: const Text('Go'))
                ])))));
    await t.tap(find.text('Go'));
    await t.pumpAndSettle();
    expect(find.text('Destination'), findsOneWidget);
    expect(t.takeException(), isNull);
  });
}
