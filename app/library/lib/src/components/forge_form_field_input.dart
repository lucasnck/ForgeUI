import 'package:flutter/material.dart';
import '../types/forms.dart';
import '../types/primitives.dart';
import '../controllers/typed_form_controller.dart';
import 'internal/configured_input.dart';
import 'forge_input.dart';
import 'forge_form_field.dart';

class ForgeFormFieldInput<T> extends ForgeConfiguredInput {
  final ForgeFieldPath<T> path;
  final ForgeTypedFormController<T>? formController;
  final ForgeInputKind inputType;
  final String? controlId;
  ForgeFormFieldInput(
      {super.key,
      required ForgeFieldPath<T> name,
      required String label,
      this.formController,
      this.inputType = ForgeInputKind.text,
      this.controlId,
      super.onChanged,
      super.controller,
      super.focusNode,
      super.control,
      super.semanticLabel,
      super.placeholder,
      super.hint,
      super.error,
      super.pattern,
      super.validationMessage,
      super.disabled,
      super.readOnly,
      super.required,
      super.autofocus,
      super.fullWidth,
      super.animated,
      super.invalid,
      super.minLength,
      super.maxLength,
      super.size,
      super.tone,
      super.appearance,
      super.shape,
      super.keyboardType,
      super.textInputAction,
      super.autofillHints,
      super.autocorrect,
      super.spellCheck,
      super.capitalization,
      super.onFocusChange,
      super.onSubmitted})
      : path = name,
        super(name: name.name, label: label);
  @override
  State<ForgeFormFieldInput<T>> createState() => _RegisteredInputState<T>();
}

class _RegisteredInputState<T>
    extends ConfiguredInputState<ForgeFormFieldInput<T>> {
  ForgeTypedFormController<T>? owner;
  late final String id;
  @override
  void initState() {
    super.initState();
    id = widget.controlId ?? 'forge-field-' + identityHashCode(this).toString();
  }

  @override
  Widget build(BuildContext context) {
    owner = widget.formController ?? ForgeTypedFormScope.of<T>(context);
    final form = owner!;
    return ListenableBuilder(
        listenable: form,
        builder: (context, _) {
          final message = widget.error ?? form.errors[widget.path.name];
          return ForgeFormField(
              controlId: widget.controlId ?? id,
              label: widget.label!,
              hint: widget.hint,
              error: message,
              control: widget.control ??
                  ForgeControlBinding(
                      id: widget.controlId ?? id, focusNode: inputFocus),
              controlBuilder: (context, field) => buildInput(
                  kind: widget.inputType,
                  useDisplayValue: true,
                  displayValue: form.readField(widget.path),
                  includeLabel: false,
                  includeHint: false,
                  includeError: false,
                  formOverride: form,
                  semanticLabelOverride: widget.semanticLabel ?? widget.label,
                  invalidOverride: form.errors.containsKey(widget.path.name),
                  disabledOverride: widget.disabled || form.disabled,
                  showValidationMessage: message == null,
                  onChanged: (text) {
                    form.writeField(widget.path, text, notify: false);
                    widget.onChanged?.call(text);
                  }));
        });
  }
}
