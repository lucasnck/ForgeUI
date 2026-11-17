import 'package:flutter/widgets.dart';
import '../types/forms.dart';
import '../types/component_capabilities.dart';
import 'forge_layout.dart';

enum ForgeButtonType { button, submit, reset }

class ForgeForm extends StatefulWidget {
  final List<Widget> children;
  final ForgeFormBinding? binding;
  final bool loading, noValidate;
  final String? loadingLabel, semanticLabel;
  final void Function(ForgeFormData data, ForgeSubmitContext context)
      onValidSubmit;
  final ForgeSubmitInterceptor? onSubmit;
  final ForgeResetInterceptor? onReset;
  const ForgeForm(
      {super.key,
      required this.children,
      required this.onValidSubmit,
      this.binding,
      this.loading = false,
      this.loadingLabel,
      this.semanticLabel,
      this.noValidate = false,
      this.onSubmit,
      this.onReset});
  @override
  State<ForgeForm> createState() => _FormState();
}

class _FormState extends State<ForgeForm> {
  late ForgeFormBinding binding;
  late bool own;
  @override
  void initState() {
    super.initState();
    attach();
  }

  void attach() {
    own = widget.binding == null;
    binding = widget.binding ?? ForgeFormBinding();
    binding.onSubmitRequested = () => submit(ForgeSubmitContext());
  }

  void detach() {
    binding.onSubmitRequested = null;
    if (own) binding.dispose();
  }

  @override
  void didUpdateWidget(covariant ForgeForm oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.binding != widget.binding) {
      detach();
      attach();
    }
  }

  void submit(ForgeSubmitContext event) {
    widget.onSubmit?.call(event);
    if (event.cancelled || widget.loading) return;
    if (!widget.noValidate && !binding.validate()) return;
    widget.onValidSubmit(binding.data(submitter: event), event);
  }

  void reset(ForgeSubmitContext event) {
    widget.onReset?.call(event);
    if (!event.cancelled) binding.reset();
  }

  @override
  void dispose() {
    detach();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final parts = <_FormPartKind, Widget>{};
    for (final child in widget.children) {
      if (child is! _FormPart)
        throw ArgumentError(
            'Form accepts only FormHeader, FormBody and FormFooter.');
      if (parts.containsKey(child.kind))
        throw ArgumentError('Duplicate Form part.');
      parts[child.kind] = child;
    }
    return _FormActions(
        submit: submit,
        reset: reset,
        child: ForgeFormScope(
            binding: binding,
            loading: widget.loading,
            loadingLabel: widget.loadingLabel,
            child: Semantics(
                container: true,
                label: widget.semanticLabel,
                child: ForgeStack(gap: ForgeSpace.s2, children: [
                  for (final part in _FormPartKind.values)
                    if (parts[part] != null) parts[part]!
                ]))));
  }
}

class _FormActions extends InheritedWidget {
  final void Function(ForgeSubmitContext event) submit, reset;
  const _FormActions(
      {required this.submit, required this.reset, required super.child});
  @override
  bool updateShouldNotify(_FormActions old) =>
      submit != old.submit || reset != old.reset;
}

void forgeActivateForm(BuildContext context, ForgeButtonType type,
    {String? name, String? value}) {
  final owner = context.dependOnInheritedWidgetOfExactType<_FormActions>();
  if (owner == null)
    throw StateError('A submit/reset Button requires a ForgeForm owner.');
  final event = ForgeSubmitContext(name: name, value: value);
  if (type == ForgeButtonType.submit)
    owner.submit(event);
  else if (type == ForgeButtonType.reset) owner.reset(event);
}

enum _FormPartKind { header, body, footer }

abstract class _FormPart extends StatelessWidget {
  final _FormPartKind kind;
  final List<Widget> children;
  const _FormPart({super.key, required this.kind, required this.children});
  @override
  Widget build(BuildContext context) {
    if (ForgeFormScope.maybeOf(context) == null)
      throw StateError('Form part requires its owner.');
    return kind == _FormPartKind.footer
        ? ForgeInline(gap: ForgeSpace.s2, wrap: true, children: children)
        : ForgeStack(gap: ForgeSpace.s2, children: children);
  }
}

class ForgeFormHeader extends _FormPart {
  const ForgeFormHeader({super.key, required super.children})
      : super(kind: _FormPartKind.header);
}

class ForgeFormBody extends _FormPart {
  const ForgeFormBody({super.key, required super.children})
      : super(kind: _FormPartKind.body);
}

class ForgeFormFooter extends _FormPart {
  const ForgeFormFooter({super.key, required super.children})
      : super(kind: _FormPartKind.footer);
}
