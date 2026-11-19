import 'package:flutter/widgets.dart';
import '../types/primitives.dart';
import '../types/component_capabilities.dart';
import '../types/forms.dart';
import '../controllers/roving_focus_controller.dart';
import 'forge_button.dart';
import 'forge_layout.dart';

class ForgeChoiceOption {
  final String value, label;
  final bool disabled;
  final ForgeSize size;
  final ForgeTone tone;
  final ForgeAppearance appearance;
  final ForgeShape shape;
  const ForgeChoiceOption(
      {required this.value,
      required this.label,
      this.disabled = false,
      this.size = ForgeSize.md,
      this.tone = ForgeTone.brand,
      this.appearance = ForgeAppearance.ghost,
      this.shape = ForgeShape.rounded});
}

typedef ForgeListBoxOption = ForgeChoiceOption;

class ForgeListBox extends StatefulWidget {
  final String label;
  final List<ForgeChoiceOption> options;
  final List<Widget> children;
  final List<String>? value;
  final List<String> defaultValue;
  final ValueChanged<List<String>>? onValueChange;
  final ForgeSelectionMode selectionMode;
  final bool disabled, animated;
  final bool? invalid;
  final String? name;
  final ForgeFormBinding? form;
  const ForgeListBox(
      {super.key,
      required this.label,
      required this.options,
      required this.children,
      this.value,
      this.defaultValue = const [],
      this.onValueChange,
      this.selectionMode = ForgeSelectionMode.single,
      this.disabled = false,
      this.animated = true,
      this.invalid,
      this.name,
      this.form});
  @override
  State<ForgeListBox> createState() => _ListBoxState();
}

class _ListBoxState extends State<ForgeListBox> {
  final focus = ForgeRovingFocusController();
  final fallback = FocusNode();
  late List<String> local;
  ForgeFormBinding? form;
  List<String> get selected => (widget.value ?? local)
      .toSet()
      .take(widget.selectionMode == ForgeSelectionMode.single
          ? 1
          : widget.options.length)
      .toList();
  bool get disabled => widget.disabled || (form?.disabled ?? false);
  void validate() {
    if (widget.label.trim().isEmpty ||
        widget.options.any((o) => o.label.trim().isEmpty))
      throw ArgumentError('ListBox requires nonempty labels.');
    focus.update([
      for (final o in widget.options)
        ForgeFocusItem(o.value, text: o.label, disabled: o.disabled || disabled)
    ], initialId: selected.firstOrNull);
  }

  @override
  void initState() {
    super.initState();
    local = List.of(widget.defaultValue);
    validate();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    bind();
    validate();
  }

  void bind() {
    final next = widget.form ?? ForgeFormScope.maybeOf(context)?.binding;
    if (next != form) {
      form?.unregister(this);
      form = next;
    }
    form?.register(
        this,
        ForgeFieldRegistration(
            name: widget.name ?? '',
            enabled: () => !disabled && widget.name?.isNotEmpty == true,
            values: () => selected
                .where((v) =>
                    widget.options.any((o) => o.value == v && !o.disabled))
                .toList(),
            validate: () => true,
            reset: () {
              if (widget.value == null && mounted)
                setState(() => local = List.of(widget.defaultValue));
            },
            focusNode: fallback));
  }

  @override
  void didUpdateWidget(covariant ForgeListBox old) {
    super.didUpdateWidget(old);
    bind();
    validate();
  }

  void select(String key) {
    final option = widget.options.where((o) => o.value == key).firstOrNull;
    if (disabled || option == null || option.disabled) return;
    final current = selected,
        next = widget.selectionMode == ForgeSelectionMode.single
            ? [key]
            : current.contains(key)
                ? current.where((v) => v != key).toList()
                : [...current, key];
    if (next.length == current.length &&
        Iterable.generate(next.length).every((i) => next[i] == current[i]))
      return;
    if (widget.value == null) setState(() => local = next);
    widget.onValueChange?.call(List.unmodifiable(next));
    if (widget.name != null) form?.changed(widget.name!);
  }

  @override
  void dispose() {
    form?.unregister(this);
    focus.dispose();
    fallback.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final parts = <_ListPartKind, Widget>{};
    for (final child in widget.children) {
      if (child is! _ListPart)
        throw ArgumentError('ListBox accepts canonical parts only.');
      if (parts.containsKey(child.kind))
        throw ArgumentError('Duplicate ListBox part.');
      parts[child.kind] = child;
    }
    if (!parts.containsKey(_ListPartKind.body))
      throw ArgumentError('ListBox requires Body.');
    return _ListBoxScope(
        state: this,
        child: ForgeStack(gap: ForgeSpace.s2, children: [
          for (final part in _ListPartKind.values)
            if (parts[part] != null) parts[part]!
        ]));
  }
}

class _ListBoxScope extends InheritedWidget {
  final _ListBoxState state;
  const _ListBoxScope({required this.state, required super.child});
  static _ListBoxState of(BuildContext c) {
    final s = c.dependOnInheritedWidgetOfExactType<_ListBoxScope>();
    if (s == null) throw StateError('ListBox part requires ListBox.');
    return s.state;
  }

  @override
  bool updateShouldNotify(_ListBoxScope old) => true;
}

enum _ListPartKind { header, body, footer }

abstract class _ListPart extends StatelessWidget {
  final _ListPartKind kind;
  final Widget? child;
  const _ListPart({super.key, required this.kind, this.child});
  @override
  Widget build(BuildContext context) {
    _ListBoxScope.of(context);
    return child ?? const SizedBox.shrink();
  }
}

class ForgeListBoxHeader extends _ListPart {
  const ForgeListBoxHeader({super.key, super.child})
      : super(kind: _ListPartKind.header);
}

class ForgeListBoxFooter extends _ListPart {
  const ForgeListBoxFooter({super.key, super.child})
      : super(kind: _ListPartKind.footer);
}

class ForgeListBoxBody extends _ListPart {
  const ForgeListBoxBody({super.key}) : super(kind: _ListPartKind.body);
  @override
  Widget build(BuildContext context) {
    final s = _ListBoxScope.of(context), empty = s.focus.enabled.isEmpty;
    return Semantics(
        container: true,
        label: s.widget.label,
        child: Focus(
            focusNode: s.fallback,
            skipTraversal: !empty,
            onKeyEvent: (_, e) => s.disabled
                ? KeyEventResult.ignored
                : s.focus.handle(e,
                    orientation: ForgeNavigationOrientation.vertical,
                    loop: false),
            child: ForgeStack(gap: ForgeSpace.s0, children: [
              for (final o in s.widget.options)
                ForgeListBoxItem(
                    key: ValueKey(o.value),
                    value: o.value,
                    label: o.label,
                    disabled: o.disabled,
                    size: o.size,
                    tone: o.tone,
                    appearance: o.appearance,
                    shape: o.shape)
            ])));
  }
}

class ForgeListBoxItem extends StatelessWidget {
  final String value, label;
  final bool disabled;
  final ForgeSize size;
  final ForgeTone tone;
  final ForgeAppearance appearance;
  final ForgeShape shape;
  const ForgeListBoxItem(
      {super.key,
      required this.value,
      required this.label,
      this.disabled = false,
      this.size = ForgeSize.md,
      this.tone = ForgeTone.brand,
      this.appearance = ForgeAppearance.ghost,
      this.shape = ForgeShape.rounded});
  @override
  Widget build(BuildContext context) {
    final s = _ListBoxScope.of(context);
    if (!s.widget.options.any((o) => o.value == value) || label.trim().isEmpty)
      throw ArgumentError('ListBoxItem must match a registered option.');
    return Semantics(
        selected: s.selected.contains(value),
        child: ForgeButton(
            fullWidth: true,
            focusNode: s.focus.node(value),
            onFocusChange: (focused) {
              if (focused) s.focus.focused(value);
            },
            onPressed: () => s.select(value),
            disabled: s.disabled || disabled,
            size: size,
            tone: tone,
            appearance: appearance,
            shape: shape,
            child: Text(label)));
  }
}
