import 'package:flutter/widgets.dart';
import 'package:flutter/services.dart';
import 'internal/configured_input.dart';
import '../helpers/mask.dart';

class _MaskFormatter extends TextInputFormatter {
  final String mask;
  const _MaskFormatter(this.mask);
  @override
  TextEditingValue formatEditUpdate(
      TextEditingValue oldValue, TextEditingValue newValue) {
    if (newValue.composing.isValid && !newValue.composing.isCollapsed)
      return newValue;
    var raw = unmaskForge(newValue.text, mask);
    var index = unmaskForge(
            newValue.text.substring(0,
                newValue.selection.extentOffset.clamp(0, newValue.text.length)),
            mask)
        .length;
    final previous = unmaskForge(oldValue.text, mask);
    if (newValue.text.length < oldValue.text.length &&
        raw == previous &&
        oldValue.selection.isCollapsed) {
      final before = unmaskForge(
              oldValue.text.substring(
                  0,
                  oldValue.selection.extentOffset
                      .clamp(0, oldValue.text.length)),
              mask)
          .length;
      final backwards =
          newValue.selection.extentOffset < oldValue.selection.extentOffset;
      final remove = (backwards ? before - 1 : before)
          .clamp(0, raw.isEmpty ? 0 : raw.length - 1);
      if (raw.isNotEmpty) {
        raw = raw.substring(0, remove) + raw.substring(remove + 1);
        index = remove;
      }
    }
    final display = applyForgeMask(raw, mask);
    return TextEditingValue(
        text: display,
        selection: TextSelection.collapsed(
            offset: forgeCaretForIndex(display, mask, index)));
  }
}

class ForgeMaskedInput extends ForgeConfiguredInput {
  final String mask;
  final ValueChanged<String> onValueChange;
  const ForgeMaskedInput(
      {super.key,
      required String value,
      required this.onValueChange,
      required this.mask,
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
      : super(value: value);
  @override
  State<ForgeMaskedInput> createState() => _MaskedState();
}

class ForgeDateInput extends ForgeMaskedInput {
  const ForgeDateInput(
      {super.key,
      required super.value,
      required super.onValueChange,
      required super.mask,
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
}

class ForgePostalCodeInput extends ForgeMaskedInput {
  const ForgePostalCodeInput(
      {super.key,
      required super.value,
      required super.onValueChange,
      required super.mask,
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
}

class ForgeTaxIdInput extends ForgeMaskedInput {
  const ForgeTaxIdInput(
      {super.key,
      required super.value,
      required super.onValueChange,
      required super.mask,
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
}

class ForgeTokenInput extends ForgeMaskedInput {
  const ForgeTokenInput(
      {super.key,
      required super.value,
      required super.onValueChange,
      required super.mask,
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
}

class _MaskedState extends ConfiguredInputState<ForgeMaskedInput> {
  bool composing = false;
  String? skipChange;
  @override
  String get initialText => applyForgeMask(widget.value ?? '', widget.mask);
  @override
  void didUpdateWidget(covariant ForgeMaskedInput oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.value != oldWidget.value) composing = false;
  }

  void process(String display) {
    if (widget.disabled || widget.readOnly) return;
    final next = unmaskForge(display, widget.mask);
    if (next != widget.value) widget.onValueChange(next);
  }

  @override
  Widget build(BuildContext context) {
    return buildInput(
        useDisplayValue: true,
        displayValue: applyForgeMask(widget.value ?? '', widget.mask),
        keyboardType: widget.mask.contains('A') || widget.mask.contains('S')
            ? TextInputType.text
            : TextInputType.number,
        formatters: [_MaskFormatter(widget.mask)],
        onChanged: (text) {
          if (skipChange == text) {
            skipChange = null;
            return;
          }
          if (!textController.value.composing.isValid ||
              textController.value.composing.isCollapsed) process(text);
        },
        onEditingValueChange: (v) {
          final active = v.composing.isValid && !v.composing.isCollapsed;
          if (composing && !active) {
            skipChange = v.text;
            process(v.text);
          }
          composing = active;
        });
  }
}
