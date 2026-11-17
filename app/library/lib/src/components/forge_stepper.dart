import 'package:flutter/widgets.dart';
import '../types/component_capabilities.dart';
import '../types/primitives.dart';
import 'forge_button.dart';
import 'forge_badge.dart';
import 'forge_layout.dart';

class ForgeStepper extends StatefulWidget {
  final String label, value;
  final ValueChanged<String> onStepChange;
  final List<Widget> children;
  const ForgeStepper(
      {super.key,
      required this.label,
      required this.value,
      required this.onStepChange,
      required this.children});
  @override
  State<ForgeStepper> createState() => _StepperState();
}

class _StepperState extends State<ForgeStepper> {
  final Map<String, FocusNode> triggers = {};
  final Map<String, FocusScopeNode> panels = {};
  late ForgeStepperHeader header;
  late ForgeStepperBody body;
  ForgeStepperFooter? footer;
  void collect() {
    if (widget.label.trim().isEmpty)
      throw ArgumentError('Stepper requires a name.');
    final h = widget.children.whereType<ForgeStepperHeader>().toList(),
        b = widget.children.whereType<ForgeStepperBody>().toList(),
        f = widget.children.whereType<ForgeStepperFooter>().toList();
    if (h.length != 1 ||
        b.length != 1 ||
        f.length > 1 ||
        widget.children.length != h.length + b.length + f.length)
      throw ArgumentError(
          'Stepper requires Header and Body with optional Footer.');
    header = h.single;
    body = b.single;
    footer = f.firstOrNull;
    final ids = header.items.map((i) => i.value).toList(),
        panelIds = body.panels.map((i) => i.value).toList();
    if (ids.isEmpty ||
        ids.any((v) => v.trim().isEmpty) ||
        ids.toSet().length != ids.length ||
        panelIds.toSet().length != panelIds.length ||
        ids.length != panelIds.length ||
        ids.any((v) => !panelIds.contains(v)) ||
        !ids.contains(widget.value))
      throw ArgumentError(
          'Stepper identities must match each panel and controlled value.');
    for (final id in ids) {
      triggers.putIfAbsent(id, () => FocusNode(debugLabel: 'Step $id'));
      panels.putIfAbsent(
          id, () => FocusScopeNode(debugLabel: 'Step panel $id'));
    }
    for (final id in triggers.keys.where((id) => !ids.contains(id)).toList()) {
      final t = triggers.remove(id)!, p = panels.remove(id)!;
      WidgetsBinding.instance.addPostFrameCallback((_) {
        t.dispose();
        p.dispose();
      });
    }
  }

  @override
  void initState() {
    super.initState();
    collect();
  }

  @override
  void didUpdateWidget(covariant ForgeStepper old) {
    super.didUpdateWidget(old);
    final hadFocus = panels[old.value]?.hasFocus ?? false;
    collect();
    if (hadFocus && widget.value != old.value)
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted) triggers[widget.value]?.requestFocus();
      });
  }

  void select(String value) {
    if (value != widget.value &&
        header.items.any((i) => i.value == value && !i.disabled))
      widget.onStepChange(value);
  }

  @override
  void dispose() {
    for (final n in triggers.values) n.dispose();
    for (final n in panels.values) n.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => _StepperScope(
      state: this,
      child: ForgeStack(
          gap: ForgeSpace.s2,
          children: [header, body, if (footer != null) footer!]));
}

class _StepperScope extends InheritedWidget {
  final _StepperState state;
  const _StepperScope({required this.state, required super.child});
  static _StepperState of(BuildContext c) {
    final s = c.dependOnInheritedWidgetOfExactType<_StepperScope>();
    if (s == null) throw StateError('Stepper part requires Stepper.');
    return s.state;
  }

  @override
  bool updateShouldNotify(_StepperScope old) => true;
}

class ForgeStepperHeader extends StatelessWidget {
  final List<ForgeStepperItem> items;
  const ForgeStepperHeader({super.key, required this.items});
  @override
  Widget build(BuildContext context) {
    final s = _StepperScope.of(context);
    return Semantics(
        container: true,
        label: s.widget.label,
        child: ForgeInline(gap: ForgeSpace.s2, children: items));
  }
}

class ForgeStepperBody extends StatelessWidget {
  final List<ForgeStepperPanel> panels;
  const ForgeStepperBody({super.key, required this.panels});
  @override
  Widget build(BuildContext context) {
    _StepperScope.of(context);
    return Column(mainAxisSize: MainAxisSize.min, children: panels);
  }
}

class ForgeStepperFooter extends StatelessWidget {
  final Widget child;
  const ForgeStepperFooter({super.key, required this.child});
  @override
  Widget build(BuildContext context) {
    _StepperScope.of(context);
    return child;
  }
}

class ForgeStepperItem extends StatelessWidget {
  final String value, label;
  final ForgeStepStatus status;
  final String? statusLabel;
  final bool disabled, animated;
  final Widget? child;
  const ForgeStepperItem(
      {super.key,
      required this.value,
      required this.label,
      this.status = ForgeStepStatus.pending,
      this.statusLabel,
      this.disabled = false,
      this.animated = true,
      this.child});
  @override
  Widget build(BuildContext context) {
    final s = _StepperScope.of(context), selected = s.widget.value == value;
    if (label.trim().isEmpty ||
        (status != ForgeStepStatus.pending &&
            statusLabel?.trim().isNotEmpty != true))
      throw ArgumentError(
          'StepperItem requires label and visible completed/error status.');
    return ForgeStack(gap: ForgeSpace.s2, children: [
      Semantics(
          selected: selected,
          child: ForgeButton(
              focusNode: s.triggers[value],
              disabled: disabled,
              onPressed: () => s.select(value),
              tone: ForgeTone.neutral,
              appearance:
                  selected ? ForgeAppearance.soft : ForgeAppearance.ghost,
              semanticLabel:
                  statusLabel == null ? label : '$label, $statusLabel',
              child: Text(label))),
      if (status != ForgeStepStatus.pending)
        ForgeBadge(
            tone: status == ForgeStepStatus.complete
                ? ForgeTone.success
                : ForgeTone.danger,
            child: Text(statusLabel!)),
      if (child != null) child!
    ]);
  }
}

class ForgeStepperPanel extends StatelessWidget {
  final String value;
  final Widget child;
  const ForgeStepperPanel(
      {super.key, required this.value, required this.child});
  @override
  Widget build(BuildContext context) {
    final s = _StepperScope.of(context), active = s.widget.value == value;
    return Offstage(
        offstage: !active,
        child: TickerMode(
            enabled: active,
            child: FocusScope(
                node: s.panels[value],
                skipTraversal: true,
                child: ExcludeFocus(
                    excluding: !active,
                    child: Semantics(container: true, child: child)))));
  }
}
