import 'package:flutter/widgets.dart';
import '../types/primitives.dart';
import '../types/component_capabilities.dart';
import 'forge_label.dart';
import 'forge_field_hint.dart';
import 'forge_field_error.dart';
import 'forge_layout.dart';

class ForgeFieldControl {
  final ForgeControlBinding binding;
  final String label;
  final String? hint, error;
  const ForgeFieldControl(
      {required this.binding, required this.label, this.hint, this.error});
  bool get invalid => error?.isNotEmpty == true;
  List<ForgeDescriptionBinding> get descriptions => [
        if (hint?.isNotEmpty == true)
          ForgeDescriptionBinding(id: '${binding.id}-hint', text: hint!),
        if (error?.isNotEmpty == true)
          ForgeDescriptionBinding(id: '${binding.id}-error', text: error!)
      ];
}

typedef ForgeFieldControlBuilder = Widget Function(
    BuildContext context, ForgeFieldControl control);

class ForgeFormField extends StatefulWidget {
  final String controlId, label;
  final String? hint, error;
  final ForgeControlBinding? control;
  final ForgeFieldControlBuilder? controlBuilder;
  final List<Widget>? children;
  const ForgeFormField(
      {super.key,
      required this.controlId,
      required this.label,
      this.hint,
      this.error,
      this.control,
      this.controlBuilder,
      this.children})
      : assert((controlBuilder == null) != (children == null));
  @override
  State<ForgeFormField> createState() => _FieldState();
}

class _FieldState extends State<ForgeFormField> {
  late ForgeControlBinding binding;
  late bool own;
  void attach() {
    own = widget.control == null;
    binding = widget.control ?? ForgeControlBinding(id: widget.controlId);
  }

  @override
  void initState() {
    super.initState();
    attach();
  }

  @override
  void didUpdateWidget(covariant ForgeFormField oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.control != widget.control ||
        oldWidget.controlId != widget.controlId) {
      if (own) binding.dispose();
      attach();
    }
  }

  @override
  void dispose() {
    if (own) binding.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final parts = <_FieldPartKind, Widget>{};
    if (widget.children != null)
      for (final child in widget.children!) {
        if (child is! _FieldPart)
          throw ArgumentError('FormField accepts only its canonical parts.');
        if (parts.containsKey(child.kind))
          throw ArgumentError('Duplicate FormField part.');
        parts[child.kind] = child;
      }
    if (widget.children != null && !parts.containsKey(_FieldPartKind.body))
      throw ArgumentError('FormField requires Body.');
    final footer = parts[_FieldPartKind.footer] as ForgeFormFieldFooter?;
    final hint = footer?.hint ?? widget.hint,
        error = footer?.error ?? widget.error;
    final field = ForgeFieldControl(
        binding: binding, label: widget.label, hint: hint, error: error);
    return _FieldScope(
        field: field,
        child: ForgeStack(gap: ForgeSpace.s2, children: [
          parts[_FieldPartKind.header] ?? const ForgeFormFieldHeader(),
          parts[_FieldPartKind.body] ??
              ForgeFormFieldBody(controlBuilder: widget.controlBuilder!),
          if (footer != null)
            ForgeFormFieldFooter(key: footer.key, hint: hint, error: error)
          else if (hint?.isNotEmpty == true || error?.isNotEmpty == true)
            ForgeFormFieldFooter(hint: hint, error: error)
        ]));
  }
}

class _FieldScope extends InheritedWidget {
  final ForgeFieldControl field;
  const _FieldScope({required this.field, required super.child});
  static ForgeFieldControl of(BuildContext c) {
    final s = c.dependOnInheritedWidgetOfExactType<_FieldScope>();
    if (s == null) throw StateError('Field part requires FormField.');
    return s.field;
  }

  @override
  bool updateShouldNotify(_FieldScope old) => field != old.field;
}

enum _FieldPartKind { header, body, footer }

abstract class _FieldPart extends StatelessWidget {
  final _FieldPartKind kind;
  const _FieldPart({super.key, required this.kind});
}

class ForgeFormFieldHeader extends _FieldPart {
  final Widget? child;
  const ForgeFormFieldHeader({super.key, this.child})
      : super(kind: _FieldPartKind.header);
  @override
  Widget build(BuildContext context) {
    final f = _FieldScope.of(context);
    return ForgeLabel(
        control: f.binding, text: child == null ? f.label : null, child: child);
  }
}

class ForgeFormFieldBody extends _FieldPart {
  final ForgeFieldControlBuilder controlBuilder;
  const ForgeFormFieldBody({super.key, required this.controlBuilder})
      : super(kind: _FieldPartKind.body);
  @override
  Widget build(BuildContext context) =>
      controlBuilder(context, _FieldScope.of(context));
}

class ForgeFormFieldFooter extends _FieldPart {
  final String? hint, error;
  const ForgeFormFieldFooter({super.key, this.hint, this.error})
      : super(kind: _FieldPartKind.footer);
  @override
  Widget build(BuildContext context) {
    final f = _FieldScope.of(context);
    return ForgeStack(gap: ForgeSpace.s2, children: [
      if (hint?.isNotEmpty == true)
        ForgeFieldHint(text: hint, semanticId: '${f.binding.id}-hint'),
      if (error?.isNotEmpty == true)
        ForgeFieldError(text: error, semanticId: '${f.binding.id}-error')
    ]);
  }
}
