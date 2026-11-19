import 'package:flutter/widgets.dart';
import 'package:flutter/services.dart';
import '../types/forms.dart';
import '../types/component_capabilities.dart';
import 'forge_layout.dart';
import 'forge_checkable.dart';
import 'forge_legend.dart';

class ForgeChoiceGroup extends StatelessWidget {
  final List<Widget> children;
  final String? legend, semanticLabel;
  final bool disabled;
  final bool? invalid;
  final ForgeSpace gap, padding;
  const ForgeChoiceGroup(
      {super.key,
      required this.children,
      this.legend,
      this.semanticLabel,
      this.disabled = false,
      this.invalid,
      this.gap = ForgeSpace.s2,
      this.padding = ForgeSpace.s0});
  @override
  Widget build(BuildContext context) {
    final parts = <_ChoicePartKind, Widget>{};
    for (final child in children) {
      if (child is! _ChoicePart)
        throw ArgumentError('ChoiceGroup accepts its canonical parts only.');
      if (parts.containsKey(child.kind))
        throw ArgumentError('Duplicate ChoiceGroup part.');
      parts[child.kind] = child;
    }
    if (!parts.containsKey(_ChoicePartKind.body) ||
        (legend == null && !parts.containsKey(_ChoicePartKind.header)))
      throw ArgumentError('ChoiceGroup requires Body and a legend source.');
    if (legend != null && parts.containsKey(_ChoicePartKind.header))
      throw ArgumentError('ChoiceGroup accepts one legend source.');
    return _ChoiceScope(
        disabled: disabled,
        invalid: invalid,
        child: Semantics(
            container: true,
            label: semanticLabel,
            child: ForgeStack(gap: gap, padding: padding, children: [
              if (legend != null)
                ForgeLegend(text: legend)
              else
                parts[_ChoicePartKind.header]!,
              parts[_ChoicePartKind.body]!,
              if (parts[_ChoicePartKind.footer] != null)
                parts[_ChoicePartKind.footer]!
            ])));
  }
}

class _ChoiceScope extends InheritedWidget {
  final bool disabled;
  final bool? invalid;
  const _ChoiceScope(
      {required this.disabled, this.invalid, required super.child});
  static _ChoiceScope of(BuildContext c) {
    final s = c.dependOnInheritedWidgetOfExactType<_ChoiceScope>();
    if (s == null) throw StateError('Choice part requires ChoiceGroup.');
    return s;
  }

  @override
  bool updateShouldNotify(_ChoiceScope old) =>
      disabled != old.disabled || invalid != old.invalid;
}

enum _ChoicePartKind { header, body, footer }

abstract class _ChoicePart extends StatelessWidget {
  final _ChoicePartKind kind;
  final Widget child;
  const _ChoicePart({super.key, required this.kind, required this.child});
  @override
  Widget build(BuildContext context) {
    _ChoiceScope.of(context);
    return child;
  }
}

class ForgeChoiceGroupHeader extends _ChoicePart {
  const ForgeChoiceGroupHeader({super.key, required super.child})
      : super(kind: _ChoicePartKind.header);
}

class ForgeChoiceGroupBody extends _ChoicePart {
  const ForgeChoiceGroupBody({super.key, required super.child})
      : super(kind: _ChoicePartKind.body);
}

class ForgeChoiceGroupFooter extends _ChoicePart {
  const ForgeChoiceGroupFooter({super.key, required super.child})
      : super(kind: _ChoicePartKind.footer);
}

abstract class _SelectionGroup extends StatefulWidget {
  final String name;
  final List<Widget> children;
  final String? legend;
  final bool disabled;
  final bool? invalid;
  final ForgeFormBinding? form;
  final ForgeSpace gap, padding;
  const _SelectionGroup(
      {super.key,
      required this.name,
      required this.children,
      this.legend,
      this.disabled = false,
      this.invalid,
      this.form,
      this.gap = ForgeSpace.s2,
      this.padding = ForgeSpace.s0});
  @override
  State<_SelectionGroup> createState() => _SelectionState();
}

class ForgeCheckboxGroup extends _SelectionGroup {
  final List<String>? value;
  final List<String> defaultValue;
  final ValueChanged<List<String>>? onValueChange;
  const ForgeCheckboxGroup(
      {super.key,
      required super.name,
      required super.children,
      super.legend,
      super.disabled,
      super.invalid,
      super.form,
      super.gap,
      super.padding,
      this.value,
      this.defaultValue = const [],
      this.onValueChange});
}

class ForgeRadioGroup extends _SelectionGroup {
  final String? value, defaultValue;
  final ValueChanged<String>? onValueChange;
  const ForgeRadioGroup(
      {super.key,
      required super.name,
      required super.children,
      super.legend,
      super.disabled,
      super.invalid,
      super.form,
      super.gap,
      super.padding,
      this.value,
      this.defaultValue,
      this.onValueChange});
}

class _SelectionState extends State<_SelectionGroup> {
  late List<String> local;
  final members = <_SelectionItemState>[];
  bool traversalScheduled = false;
  void syncTraversal() {
    if (!radio || traversalScheduled || !mounted) return;
    traversalScheduled = true;
    WidgetsBinding.instance.addPostFrameCallback((_) {
      traversalScheduled = false;
      if (!mounted) return;
      final enabled = members
          .where((m) =>
              m.mounted &&
              !m.widget.disabled &&
              !widget.disabled &&
              !(form?.disabled ?? false))
          .toList();
      final entry =
          enabled.where((m) => selected.contains(m.widget.value)).firstOrNull ??
              enabled.firstOrNull;
      for (final m in members) {
        if (m.mounted) m.focus.skipTraversal = m != entry;
      }
    });
  }

  KeyEventResult navigateRadio(_SelectionItemState from, KeyEvent event) {
    if (!radio ||
        event is! KeyDownEvent ||
        widget.disabled ||
        (form?.disabled ?? false)) return KeyEventResult.ignored;
    final key = event.logicalKey;
    if (![
      LogicalKeyboardKey.arrowLeft,
      LogicalKeyboardKey.arrowRight,
      LogicalKeyboardKey.arrowUp,
      LogicalKeyboardKey.arrowDown
    ].contains(key)) return KeyEventResult.ignored;
    final available = members
        .where(
            (m) => m.mounted && !m.widget.disabled && m.focus.canRequestFocus)
        .toList();
    if (available.isEmpty) return KeyEventResult.ignored;
    final nodes = ReadingOrderTraversalPolicy()
        .sortDescendants(available.map((m) => m.focus), from.focus)
        .toList();
    final index = nodes.indexOf(from.focus);
    if (index < 0) return KeyEventResult.ignored;
    var delta = (key == LogicalKeyboardKey.arrowRight ||
            key == LogicalKeyboardKey.arrowDown)
        ? 1
        : -1;
    if ((key == LogicalKeyboardKey.arrowLeft ||
            key == LogicalKeyboardKey.arrowRight) &&
        Directionality.of(from.context) == TextDirection.rtl) delta = -delta;
    final target = nodes[(index + delta + nodes.length) % nodes.length];
    final member = available.firstWhere((m) => m.focus == target);
    target.requestFocus();
    change(member.widget.value, true);
    syncTraversal();
    return KeyEventResult.handled;
  }

  ForgeFormBinding? form;
  bool get radio => widget is ForgeRadioGroup;
  List<String> defaults() => switch (widget) {
        ForgeCheckboxGroup w => List.of(w.defaultValue),
        ForgeRadioGroup w => [if (w.defaultValue != null) w.defaultValue!],
        _ => []
      };
  List<String> get selected => switch (widget) {
        ForgeCheckboxGroup w => w.value ?? local,
        ForgeRadioGroup w => w.value == null ? local : [w.value!],
        _ => []
      };
  @override
  void initState() {
    super.initState();
    local = defaults();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    bind();
  }

  void bind() {
    final next = widget.form ?? ForgeFormScope.maybeOf(context)?.binding;
    if (next != form) {
      form?.unregister(this);
      form = next;
    }
  }

  @override
  void didUpdateWidget(covariant _SelectionGroup old) {
    super.didUpdateWidget(old);
    bind();
  }

  void change(String value, bool checked) {
    if (widget.disabled || (form?.disabled ?? false) || radio && !checked)
      return;
    final next = radio
        ? [value]
        : checked
            ? {...selected, value}.toList()
            : selected.where((v) => v != value).toList();
    switch (widget) {
      case ForgeCheckboxGroup w:
        if (w.value == null) setState(() => local = next);
        w.onValueChange?.call(List.unmodifiable(next));
      case ForgeRadioGroup w:
        if (w.value == null) setState(() => local = next);
        if (selected.firstOrNull != value || w.value == null)
          w.onValueChange?.call(value);
    }
    form?.changed(widget.name);
    syncTraversal();
  }

  @override
  Widget build(BuildContext context) => _SelectionScope(
      state: this,
      child: ForgeChoiceGroup(
          legend: widget.legend,
          disabled: widget.disabled || (form?.disabled ?? false),
          invalid: widget.invalid,
          gap: widget.gap,
          padding: widget.padding,
          children: widget.children));
}

class _SelectionScope extends InheritedWidget {
  final _SelectionState state;
  const _SelectionScope({required this.state, required super.child});
  @override
  bool updateShouldNotify(_SelectionScope old) => true;
}

abstract class _SelectionItem extends StatefulWidget {
  final String value, label;
  final bool disabled, readOnly;
  final bool radio;
  const _SelectionItem(
      {super.key,
      required this.value,
      required this.label,
      this.disabled = false,
      this.readOnly = false,
      required this.radio});
  @override
  State<_SelectionItem> createState() => _SelectionItemState();
}

class ForgeCheckboxGroupItem extends _SelectionItem {
  const ForgeCheckboxGroupItem(
      {super.key,
      required super.value,
      required super.label,
      super.disabled,
      super.readOnly})
      : super(radio: false);
}

class ForgeRadioGroupItem extends _SelectionItem {
  const ForgeRadioGroupItem(
      {super.key, required super.value, required super.label, super.disabled})
      : super(radio: true);
}

class _SelectionItemState extends State<_SelectionItem> {
  final focus = FocusNode();
  ForgeFormBinding? form;
  _SelectionState? owner;
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    bind();
  }

  void bind() {
    final next =
        context.dependOnInheritedWidgetOfExactType<_SelectionScope>()?.state;
    if (next == null || next.radio != widget.radio)
      throw StateError('Selection item requires its matching group.');
    if (owner != next) {
      owner?.members.remove(this);
      owner?.syncTraversal();
      owner = next;
      if (!next.members.contains(this)) next.members.add(this);
    }
    next.syncTraversal();
    final nextForm = next.form;
    if (form != nextForm) {
      form?.unregister(this);
      form = nextForm;
    }
    form?.register(
        this,
        ForgeFieldRegistration(
            name: next.widget.name,
            enabled: () =>
                !widget.disabled &&
                !next.widget.disabled &&
                !(form?.disabled ?? false),
            values: () =>
                next.selected.contains(widget.value) ? [widget.value] : [],
            validate: () => true,
            reset: () {
              if (next.mounted)
                next.setState(() => next.local = next.defaults());
            },
            focusNode: focus));
  }

  @override
  void didUpdateWidget(covariant _SelectionItem old) {
    super.didUpdateWidget(old);
    bind();
  }

  @override
  void dispose() {
    owner?.members.remove(this);
    owner?.syncTraversal();
    form?.unregister(this);
    focus.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final choice = _ChoiceScope.of(context),
        s = context
            .dependOnInheritedWidgetOfExactType<_SelectionScope>()!
            .state;
    final disabled = widget.disabled || choice.disabled;
    final control = widget.radio
        ? ForgeRadio(
            checked: s.selected.contains(widget.value),
            disabled: disabled,
            invalid: choice.invalid,
            focusNode: focus,
            semanticLabel: widget.label,
            onChanged: (v) {
              if (!widget.readOnly) s.change(widget.value, v);
            })
        : ForgeCheckbox(
            checked: s.selected.contains(widget.value),
            disabled: disabled,
            invalid: choice.invalid,
            focusNode: focus,
            semanticLabel: widget.label,
            onChanged: (v) {
              if (!widget.readOnly) s.change(widget.value, v);
            });
    s.syncTraversal();
    return Focus(
        canRequestFocus: false,
        onKeyEvent: (_, event) => s.navigateRadio(this, event),
        child: Row(children: [
          control,
          Flexible(
              child: GestureDetector(
                  onTap: disabled || widget.readOnly
                      ? null
                      : () {
                          focus.requestFocus();
                          s.change(
                              widget.value,
                              widget.radio
                                  ? true
                                  : !s.selected.contains(widget.value));
                        },
                  child: ExcludeSemantics(child: Text(widget.label))))
        ]));
  }
}
