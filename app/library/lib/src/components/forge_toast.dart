import 'package:flutter/material.dart';
import 'package:flutter/semantics.dart';
import '../controllers/toast_queue.dart';
import '../types/component_capabilities.dart';
import '../types/primitives.dart';
import 'forge_button.dart';
import 'forge_layout.dart';

typedef ForgeToastAnnouncer = void Function(
    BuildContext context, List<ForgeNotificationMessage> messages);

class ForgeToastRegion extends StatefulWidget {
  final String label;
  final List<ForgeToastRecord>? records;
  final List<ForgeToastRecord> defaultRecords;
  final ValueChanged<List<ForgeToastRecord>>? onRecordsChange;
  final ForgeToast Function(ForgeToastRecord record)? renderToast;
  final FocusNode? fallbackFocusNode;
  final ForgeToastAnnouncer? announcer;
  final ForgeToastQueue? controller;
  const ForgeToastRegion(
      {super.key,
      required this.label,
      this.records,
      this.defaultRecords = const [],
      this.onRecordsChange,
      this.renderToast,
      this.fallbackFocusNode,
      this.announcer,
      this.controller});
  static ForgeToastQueue of(BuildContext c) {
    final s = c.dependOnInheritedWidgetOfExactType<_ToastRegionScope>();
    if (s == null) throw StateError('Toast queue requires ToastRegion.');
    return s.state.queue;
  }

  @override
  State<ForgeToastRegion> createState() => _ToastRegionState();
}

class _ToastRegionState extends State<ForgeToastRegion>
    with WidgetsBindingObserver {
  late ForgeToastQueue queue;
  late bool own;
  final fallback = FocusNode();
  final Map<String, _ToastState> registry = {};
  final Map<String, FocusNode?> origins = {};
  List<ForgeToastRecord> previous = const [];
  int announced = 0;
  @override
  void initState() {
    super.initState();
    attach();
    WidgetsBinding.instance.addObserver(this);
  }

  void attach() {
    own = widget.controller == null;
    queue = widget.controller ??
        ForgeToastQueue(
            records: widget.records,
            defaultRecords: widget.defaultRecords,
            onRecordsChange: widget.onRecordsChange);
    previous = queue.records;
    announced = queue.sequence;
    queue.addListener(changed);
  }

  void detach() {
    queue.removeListener(changed);
    if (own) queue.dispose();
  }

  @override
  void didUpdateWidget(covariant ForgeToastRegion old) {
    super.didUpdateWidget(old);
    if (old.controller != widget.controller) {
      detach();
      attach();
    } else if (own &&
        (!identical(old.records, widget.records) ||
            old.onRecordsChange != widget.onRecordsChange))
      queue.update(
          records: widget.records, onRecordsChange: widget.onRecordsChange);
  }

  void changed() {
    final current = queue.records,
        ids = current.map((r) => r.id).toSet(),
        oldIds = previous.map((r) => r.id).toList();
    for (final r in current)
      if (!oldIds.contains(r.id))
        origins[r.id] = FocusManager.instance.primaryFocus;
    for (final id in oldIds.where((id) => !ids.contains(id))) {
      if (registry[id]?.scope.hasFocus ?? false) {
        final position = oldIds.indexOf(id),
            candidates = [
              ...oldIds.skip(position + 1),
              ...oldIds.take(position).toList().reversed,
              ...ids
            ];
        final next = candidates.where(ids.contains).firstOrNull,
            origin = origins[id];
        WidgetsBinding.instance.addPostFrameCallback((_) {
          if (!mounted) return;
          final state = registry[next];
          if (state != null) {
            state.actionFocus();
          } else {
            final restore = origin?.context != null
                ? origin
                : widget.fallbackFocusNode ?? fallback;
            restore?.requestFocus();
          }
        });
      }
      origins.remove(id);
    }
    previous = current;
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      setState(() {});
      if (queue.sequence != announced) {
        announced = queue.sequence;
        announce(queue.announcement);
      }
      if (!registry.values.any((s) => s.scope.hasFocus))
        queue.resume(ForgeToastPauseReason.focus);
    });
  }

  void announce(List<ForgeNotificationMessage> messages) {
    if (widget.announcer != null) {
      widget.announcer!(context, messages);
      return;
    }
    for (final urgency in ForgeNotificationUrgency.values) {
      final text = messages
          .where((m) => m.urgency == urgency)
          .map((m) => m.text)
          .join(' ');
      if (text.isEmpty) continue;
      SemanticsService.sendAnnouncement(
          View.of(context), text, Directionality.of(context),
          assertiveness: urgency == ForgeNotificationUrgency.urgent
              ? Assertiveness.assertive
              : Assertiveness.polite);
    }
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.resumed) {
      queue.resume(ForgeToastPauseReason.appInactive);
    } else {
      queue.pause(ForgeToastPauseReason.appInactive);
    }
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    detach();
    fallback.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (widget.label.trim().isEmpty)
      throw ArgumentError('ToastRegion requires a name.');
    return _ToastRegionScope(
        state: this,
        child: MouseRegion(
            onEnter: (_) => queue.pause(ForgeToastPauseReason.hover),
            onExit: (_) => queue.resume(ForgeToastPauseReason.hover),
            child: Focus(
                focusNode: widget.fallbackFocusNode ?? fallback,
                skipTraversal: true,
                onFocusChange: (v) {
                  if (v) {
                    queue.pause(ForgeToastPauseReason.focus);
                  } else {
                    queue.resume(ForgeToastPauseReason.focus);
                  }
                },
                child: Semantics(
                    container: true,
                    label: widget.label,
                    child: ForgeStack(gap: ForgeSpace.s2, children: [
                      for (final record in queue.records) buildRecord(record)
                    ])))));
  }

  Widget buildRecord(ForgeToastRecord record) {
    final custom = widget.renderToast?.call(record);
    return ForgeToast(
        key: ValueKey(record.id),
        record: record,
        children: custom?.children,
        animated: custom?.animated ?? true,
        animationEffect: custom?.animationEffect ?? ForgeAnimationEffect.fade);
  }
}

class _ToastRegionScope extends InheritedWidget {
  final _ToastRegionState state;
  const _ToastRegionScope({required this.state, required super.child});
  @override
  bool updateShouldNotify(_ToastRegionScope old) => true;
}

class ForgeToast extends StatefulWidget {
  final ForgeToastRecord record;
  final List<Widget>? children;
  final bool animated;
  final ForgeAnimationEffect animationEffect;
  const ForgeToast(
      {super.key,
      required this.record,
      this.children,
      this.animated = true,
      this.animationEffect = ForgeAnimationEffect.fade});
  @override
  State<ForgeToast> createState() => _ToastState();
}

class _ToastState extends State<ForgeToast> {
  final scope = FocusScopeNode(), dismissFocus = FocusNode();
  _ToastRegionState? owner;
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final next =
        context.dependOnInheritedWidgetOfExactType<_ToastRegionScope>()?.state;
    if (next == null) throw StateError('Toast requires ToastRegion.');
    if (owner != next) {
      owner?.registry.remove(widget.record.id);
      owner = next;
    }
    owner!.registry[widget.record.id] = this;
  }

  @override
  void didUpdateWidget(covariant ForgeToast old) {
    super.didUpdateWidget(old);
    if (old.record.id != widget.record.id) {
      owner?.registry.remove(old.record.id);
      owner?.registry[widget.record.id] = this;
    }
  }

  void actionFocus() {
    final first =
        scope.traversalDescendants.where((n) => n.canRequestFocus).firstOrNull;
    (first ?? owner?.widget.fallbackFocusNode ?? owner?.fallback)
        ?.requestFocus();
  }

  void dismiss() => owner!.queue.dismiss(widget.record.id);
  @override
  void dispose() {
    if (owner?.registry[widget.record.id] == this)
      owner?.registry.remove(widget.record.id);
    scope.dispose();
    dismissFocus.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final record = widget.record;
    if (record.dismissLabel.trim().isEmpty)
      throw ArgumentError('Toast requires dismissLabel.');
    final parts = <_ToastPartKind, Widget>{};
    if (widget.children != null)
      for (final child in widget.children!) {
        if (child is! _ToastPart)
          throw ArgumentError('Toast accepts canonical parts only.');
        if (parts.containsKey(child.kind))
          throw ArgumentError('Duplicate Toast part.');
        parts[child.kind] = child;
      }
    if (widget.children != null && !parts.containsKey(_ToastPartKind.body))
      throw ArgumentError('Toast requires Body.');
    final children = widget.children == null
        ? [
            ForgeToastHeader(child: Text(record.title)),
            ForgeToastBody(child: Text(record.message)),
            ForgeToastFooter(
                child: ForgeInline(gap: ForgeSpace.s2, children: [
              if (record.action != null) record.action!,
              ForgeButton(
                  focusNode: dismissFocus,
                  onPressed: dismiss,
                  child: Text(record.dismissLabel))
            ]))
          ]
        : [
            for (final kind in _ToastPartKind.values)
              if (parts[kind] != null) parts[kind]!
          ];
    return _ToastScope(
        state: this,
        child: FocusScope(
            node: scope,
            onFocusChange: (v) {
              if (v) owner!.queue.pause(ForgeToastPauseReason.focus);
            },
            child: Dismissible(
                key: ValueKey(record.id),
                confirmDismiss: (_) async {
                  dismiss();
                  return false;
                },
                child: ForgeSurface(
                    gap: ForgeSpace.s2,
                    padding: ForgeSpace.s2,
                    children: children))));
  }
}

class _ToastScope extends InheritedWidget {
  final _ToastState state;
  const _ToastScope({required this.state, required super.child});
  @override
  bool updateShouldNotify(_ToastScope old) => true;
}

enum _ToastPartKind { header, body, footer }

abstract class _ToastPart extends StatelessWidget {
  final _ToastPartKind kind;
  final Widget child;
  const _ToastPart({super.key, required this.kind, required this.child});
  @override
  Widget build(BuildContext context) {
    if (context.dependOnInheritedWidgetOfExactType<_ToastScope>() == null)
      throw StateError('Toast part requires Toast.');
    return child;
  }
}

class ForgeToastHeader extends _ToastPart {
  const ForgeToastHeader({super.key, required super.child})
      : super(kind: _ToastPartKind.header);
}

class ForgeToastBody extends _ToastPart {
  const ForgeToastBody({super.key, required super.child})
      : super(kind: _ToastPartKind.body);
}

class ForgeToastFooter extends _ToastPart {
  const ForgeToastFooter({super.key, required super.child})
      : super(kind: _ToastPartKind.footer);
}
