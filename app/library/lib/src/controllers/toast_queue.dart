import 'dart:async';
import 'package:flutter/widgets.dart';

enum ForgeToastDuration { persistent, short, long }

enum ForgeNotificationUrgency { normal, urgent }

enum ForgeToastPauseReason { hover, focus, appInactive }

class ForgeToastRecord {
  final String id, title, message, dismissLabel;
  final ForgeToastDuration duration;
  final ForgeNotificationUrgency urgency;
  final Widget? action;
  const ForgeToastRecord(
      {required this.id,
      required this.title,
      required this.message,
      required this.dismissLabel,
      this.duration = ForgeToastDuration.persistent,
      this.urgency = ForgeNotificationUrgency.normal,
      this.action});
}

class ForgeNotificationMessage {
  final String text;
  final ForgeNotificationUrgency urgency;
  const ForgeNotificationMessage(this.text, this.urgency);
}

class _Budget {
  Duration remaining;
  DateTime? started;
  Timer? timer;
  _Budget(this.remaining);
}

class ForgeToastQueue extends ChangeNotifier {
  List<ForgeToastRecord>? _controlled;
  List<ForgeToastRecord> _local;
  ValueChanged<List<ForgeToastRecord>>? onRecordsChange;
  final DateTime Function() now;
  final Map<String, _Budget> _budgets = {};
  final Set<ForgeToastPauseReason> _reasons = {};
  final Set<String> _expired = {};
  Map<String, String> _seen = {};
  int sequence = 0;
  List<ForgeNotificationMessage> announcement = const [];
  bool _disposed = false;
  ForgeToastQueue(
      {List<ForgeToastRecord>? records,
      List<ForgeToastRecord> defaultRecords = const [],
      this.onRecordsChange,
      DateTime Function()? now})
      : _controlled = records,
        _local = List.of(defaultRecords),
        now = now ?? DateTime.now {
    _validate(this.records);
    _seen = _signatures(this.records);
    _schedule();
  }
  List<ForgeToastRecord> get records =>
      List.unmodifiable(_controlled ?? _local);
  Map<String, String> _signatures(List<ForgeToastRecord> records) => {
        for (final r in records)
          r.id: r.title + '\u0000' + r.message + '\u0000' + r.urgency.name
      };
  void _validate(List<ForgeToastRecord> records) {
    if (records
            .any((r) => r.id.trim().isEmpty || r.dismissLabel.trim().isEmpty) ||
        records.map((r) => r.id).toSet().length != records.length)
      throw ArgumentError(
          'Toast records require unique IDs and dismiss labels.');
  }

  void update(
      {required List<ForgeToastRecord>? records,
      ValueChanged<List<ForgeToastRecord>>? onRecordsChange}) {
    _stop();
    _controlled = records;
    this.onRecordsChange = onRecordsChange;
    _expired.clear();
    _commit();
  }

  void _commit() {
    final snapshot = records;
    _validate(snapshot);
    final signatures = _signatures(snapshot);
    final changes =
        snapshot.where((r) => _seen[r.id] != signatures[r.id]).toList();
    if (changes.isNotEmpty) {
      sequence++;
      announcement = List.unmodifiable(changes.map((r) =>
          ForgeNotificationMessage(
              [r.title, r.message].where((v) => v.isNotEmpty).join('. '),
              r.urgency)));
    }
    _seen = signatures;
    for (final id in _budgets.keys
        .where((id) => !signatures.containsKey(id))
        .toList()) _budgets.remove(id)?.timer?.cancel();
    _expired.removeWhere((id) => !signatures.containsKey(id));
    _schedule();
    notifyListeners();
  }

  void _request(List<ForgeToastRecord> next) {
    _validate(next);
    if (_controlled == null) {
      _stop();
      _local = List.of(next);
      _commit();
    }
    onRecordsChange?.call(List.unmodifiable(next));
  }

  void add(ForgeToastRecord record) {
    if (records.any((r) => r.id == record.id))
      throw ArgumentError('Duplicate Toast id.');
    _request([...records, record]);
  }

  void dismiss(String id) {
    if (records.any((r) => r.id == id))
      _request(records.where((r) => r.id != id).toList());
  }

  void pause(ForgeToastPauseReason reason) {
    if (_reasons.add(reason)) _stop();
  }

  void resume(ForgeToastPauseReason reason) {
    if (_reasons.remove(reason)) _schedule();
  }

  void _stop() {
    final current = now();
    for (final b in _budgets.values) {
      b.timer?.cancel();
      b.timer = null;
      if (b.started != null) {
        b.remaining -= current.difference(b.started!);
        if (b.remaining.isNegative) b.remaining = Duration.zero;
        b.started = null;
      }
    }
  }

  void _schedule() {
    if (_disposed) return;
    for (final r in records) {
      if (r.duration == ForgeToastDuration.persistent || r.action != null) {
        _budgets.remove(r.id)?.timer?.cancel();
        continue;
      }
      final b = _budgets.putIfAbsent(
          r.id,
          () => _Budget(Duration(
              seconds: r.duration == ForgeToastDuration.short ? 5 : 10)));
      if (_reasons.isNotEmpty || _expired.contains(r.id) || b.timer != null)
        continue;
      b.started = now();
      b.timer = Timer(b.remaining, () {
        if (_disposed) return;
        b.timer = null;
        b.started = null;
        b.remaining = Duration.zero;
        _expired.add(r.id);
        dismiss(r.id);
      });
    }
  }

  @override
  void dispose() {
    if (_disposed) return;
    _disposed = true;
    _stop();
    _budgets.clear();
    super.dispose();
  }
}
