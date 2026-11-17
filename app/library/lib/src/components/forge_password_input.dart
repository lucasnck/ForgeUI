import 'package:flutter/material.dart';
import 'internal/configured_input.dart';
import 'forge_input.dart';
import 'forge_input_group.dart';
import 'forge_button.dart';

class ForgePasswordInput extends ForgeConfiguredInput {
  final String revealLabel, concealLabel;
  final bool revealable;
  const ForgePasswordInput(
      {super.key,
      required this.revealLabel,
      required this.concealLabel,
      this.revealable = true,
      super.value,
      super.defaultValue,
      super.onChanged,
      super.controller,
      super.focusNode,
      super.control,
      super.name,
      super.semanticLabel,
      super.placeholder,
      super.label,
      super.hint,
      super.error,
      super.pattern,
      super.validationMessage,
      super.form,
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
      : assert(revealLabel != ''),
        assert(concealLabel != '');
  @override
  State<ForgePasswordInput> createState() => _PasswordState();
}

class _PasswordState extends ConfiguredInputState<ForgePasswordInput> {
  bool revealed = false;
  @override
  void didUpdateWidget(covariant ForgePasswordInput oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (!widget.revealable) revealed = false;
  }

  @override
  Widget build(BuildContext context) => ForgeInputGroup(
      fullWidth: widget.fullWidth,
      child: buildInput(
          kind: revealed ? ForgeInputKind.text : ForgeInputKind.password,
          obscureText: !revealed,
          autofillHints: const [AutofillHints.password]),
      trailing: widget.revealable
          ? Semantics(
              toggled: revealed,
              child: ForgeButton(
                  disabled: widget.disabled,
                  onPressed: () {
                    final selection = textController.selection;
                    setState(() => revealed = !revealed);
                    WidgetsBinding.instance.addPostFrameCallback((_) {
                      if (mounted) {
                        inputFocus.requestFocus();
                        textController.selection = selection;
                      }
                    });
                  },
                  child: Text(
                      revealed ? widget.concealLabel : widget.revealLabel)))
          : null);
}
