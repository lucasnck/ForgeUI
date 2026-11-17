import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';

const short = ForgeToastRecord(
    id: 'short',
    title: 'Title',
    message: 'Message',
    dismissLabel: 'Dismiss',
    duration: ForgeToastDuration.short);
Widget host(Widget child) => MaterialApp(
    theme: ForgeThemeData.light(),
    home: Scaffold(body: SizedBox(width: 400, child: child)));
void main() {
  testWidgets(
      'toast queue pauses remaining timeout and keeps actionable records persistent',
      (t) async {
    final q = ForgeToastQueue(defaultRecords: [
      short,
      const ForgeToastRecord(
          id: 'action',
          title: 'Action',
          message: 'Message',
          dismissLabel: 'Dismiss',
          duration: ForgeToastDuration.short,
          action: Text('Action'))
    ], now: t.binding.clock.now);
    await t.pump(const Duration(seconds: 2));
    q.pause(ForgeToastPauseReason.focus);
    await t.pump(const Duration(seconds: 20));
    expect(q.records.length, 2);
    q.resume(ForgeToastPauseReason.focus);
    await t.pump(const Duration(seconds: 2));
    expect(q.records.length, 2);
    await t.pump(const Duration(seconds: 1));
    expect(q.records.map((r) => r.id), ['action']);
    q.dispose();
  });
  testWidgets(
      'controlled expiry requests once until an authoritative snapshot changes',
      (t) async {
    final changes = <List<ForgeToastRecord>>[];
    final records = [short];
    final q = ForgeToastQueue(
        records: records,
        onRecordsChange: changes.add,
        now: t.binding.clock.now);
    await t.pump(const Duration(seconds: 5));
    expect(changes.length, 1);
    expect(q.records.length, 1);
    q.pause(ForgeToastPauseReason.hover);
    q.resume(ForgeToastPauseReason.hover);
    await t.pump(const Duration(seconds: 20));
    expect(changes.length, 1);
    q.update(records: [short], onRecordsChange: changes.add);
    await t.pump(Duration.zero);
    expect(changes.length, 2);
    q.dispose();
  });
  testWidgets(
      'region announces new content once and restores focus after dismissal',
      (t) async {
    final q = ForgeToastQueue(), announcements = <ForgeNotificationMessage>[];
    final origin = FocusNode();
    await t.pumpWidget(host(Column(children: [
      ForgeButton(
          focusNode: origin, onPressed: () {}, child: const Text('Origin')),
      ForgeToastRegion(
          label: 'Notifications',
          controller: q,
          announcer: (c, m) => announcements.addAll(m))
    ])));
    origin.requestFocus();
    await t.pump();
    q.add(short);
    await t.pump();
    await t.pump();
    expect(announcements.map((m) => m.text), ['Title. Message']);
    expect(origin.hasFocus, isTrue);
    final dismiss = find.text('Dismiss');
    Focus.of(t.element(dismiss)).requestFocus();
    await t.pump();
    await t.tap(dismiss);
    await t.pump();
    await t.pump();
    await t.pump();
    expect(q.records, isEmpty);
    expect(origin.hasFocus, isTrue);
    expect(announcements.length, 1);
    await t.pumpWidget(host(const SizedBox()));
    await t.pump();
    q.dispose();
    origin.dispose();
  });
  testWidgets(
      'queue rejects duplicate IDs and renderer cannot replace authoritative record',
      (t) async {
    final q = ForgeToastQueue(defaultRecords: [short]);
    expect(() => q.add(short), throwsArgumentError);
    await t.pumpWidget(host(ForgeToastRegion(
        label: 'Notifications',
        controller: q,
        renderToast: (_) => const ForgeToast(
            record: ForgeToastRecord(
                id: 'wrong',
                title: 'Wrong',
                message: 'Wrong',
                dismissLabel: 'Dismiss')))));
    expect(find.text('Title'), findsOneWidget);
    expect(find.text('Wrong'), findsNothing);
    await t.pumpWidget(host(const SizedBox()));
    q.dispose();
  });
}
