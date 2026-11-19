import 'package:flutter/widgets.dart';
import 'internal/configured_input.dart';
import 'forge_input.dart';
import 'forge_input_group.dart';

class ForgePercentageInput extends ForgeConfiguredInput {
  final double min, max, step;
  const ForgePercentageInput(
      {super.key,
      this.min = 0,
      this.max = 100,
      this.step = 1,
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
  State<ForgePercentageInput> createState() => _PercentageState();
}

class _PercentageState extends ConfiguredInputState<ForgePercentageInput> {
  @override
  Widget build(BuildContext context) => ForgeInputGroup(
      fullWidth: widget.fullWidth,
      trailing: const ExcludeSemantics(child: ForgeInputAddon(text: '%')),
      child: buildInput(
          kind: ForgeInputKind.number,
          min: widget.min,
          max: widget.max,
          step: widget.step));
}
