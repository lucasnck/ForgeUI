import 'package:flutter/widgets.dart';
import 'internal/configured_input.dart';
import 'forge_input.dart';
import 'forge_input_group.dart';
import 'forge_button.dart';

class ForgeSearchInput extends ForgeConfiguredInput {
  final String? clearLabel;
  const ForgeSearchInput(
      {super.key,
      this.clearLabel,
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
      super.onSubmitted});
  @override
  State<ForgeSearchInput> createState() => _SearchState();
}

class _SearchState extends ConfiguredInputState<ForgeSearchInput> {
  bool pending = false;
  void changed() {
    if (pending) return;
    pending = true;
    WidgetsBinding.instance.addPostFrameCallback((_) {
      pending = false;
      if (mounted) setState(() {});
    });
  }

  @override
  void initState() {
    super.initState();
    textController.addListener(changed);
  }

  @override
  void didUpdateWidget(covariant ForgeSearchInput oldWidget) {
    final previous = textController;
    previous.removeListener(changed);
    super.didUpdateWidget(oldWidget);
    textController.addListener(changed);
  }

  @override
  void dispose() {
    textController.removeListener(changed);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => ForgeInputGroup(
      fullWidth: widget.fullWidth,
      child: buildInput(kind: ForgeInputKind.search),
      trailing: (widget.value ?? textController.text).isNotEmpty &&
              !widget.disabled &&
              !widget.readOnly &&
              widget.clearLabel?.isNotEmpty == true
          ? ForgeButton(
              onPressed: () {
                setText('');
                widget.onChanged?.call('');
                inputFocus.requestFocus();
                if (widget.value != null)
                  WidgetsBinding.instance.addPostFrameCallback((_) {
                    if (mounted && textController.text != widget.value)
                      setText(widget.value!);
                  });
              },
              child: Text(widget.clearLabel!))
          : null);
}
