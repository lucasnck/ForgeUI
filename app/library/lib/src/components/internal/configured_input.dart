import 'package:flutter/widgets.dart';
import 'package:flutter/services.dart';
import '../forge_input.dart';
import '../../types/component_capabilities.dart';
import '../../types/primitives.dart';
import '../../types/forms.dart';

abstract class ForgeConfiguredInput extends StatefulWidget {
  final String? value;
  final String defaultValue;
  final ValueChanged<String>? onChanged;
  final TextEditingController? controller;
  final FocusNode? focusNode;
  final ForgeControlBinding? control;
  final String? name;
  final String? semanticLabel;
  final String? placeholder;
  final String? label;
  final String? hint;
  final String? error;
  final String? pattern;
  final String? validationMessage;
  final ForgeFormBinding? form;
  final bool disabled;
  final bool readOnly;
  final bool required;
  final bool autofocus;
  final bool fullWidth;
  final bool animated;
  final bool? invalid;
  final int? minLength;
  final int? maxLength;
  final ForgeSize size;
  final ForgeTone tone;
  final ForgeAppearance appearance;
  final ForgeShape? shape;
  final TextInputType? keyboardType;
  final TextInputAction? textInputAction;
  final Iterable<String>? autofillHints;
  final bool autocorrect;
  final bool spellCheck;
  final TextCapitalization capitalization;
  final ValueChanged<bool>? onFocusChange;
  final VoidCallback? onSubmitted;
  const ForgeConfiguredInput(
      {super.key,
      this.value,
      this.defaultValue = '',
      this.onChanged,
      this.controller,
      this.focusNode,
      this.control,
      this.name,
      this.semanticLabel,
      this.placeholder,
      this.label,
      this.hint,
      this.error,
      this.pattern,
      this.validationMessage,
      this.form,
      this.disabled = false,
      this.readOnly = false,
      this.required = false,
      this.autofocus = false,
      this.fullWidth = true,
      this.animated = true,
      this.invalid,
      this.minLength,
      this.maxLength,
      this.size = ForgeSize.md,
      this.tone = ForgeTone.neutral,
      this.appearance = ForgeAppearance.bordered,
      this.shape,
      this.keyboardType,
      this.textInputAction,
      this.autofillHints,
      this.autocorrect = true,
      this.spellCheck = true,
      this.capitalization = TextCapitalization.none,
      this.onFocusChange,
      this.onSubmitted});
}

abstract class ConfiguredInputState<T extends ForgeConfiguredInput>
    extends State<T> {
  late TextEditingController textController;
  late FocusNode inputFocus;
  late bool ownsText, ownsFocus;
  bool settingText = false;
  String get initialText => widget.value ?? widget.defaultValue;
  FocusNode? suppliedFocus(ForgeConfiguredInput w) =>
      w.control?.focusNode ?? w.focusNode;
  @override
  void initState() {
    super.initState();
    attachText();
    attachFocus();
  }

  void attachText() {
    ownsText = widget.controller == null;
    textController =
        widget.controller ?? TextEditingController(text: initialText);
  }

  void attachFocus() {
    ownsFocus = suppliedFocus(widget) == null;
    inputFocus = suppliedFocus(widget) ?? FocusNode();
  }

  @override
  void didUpdateWidget(covariant T oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.controller != widget.controller) {
      if (ownsText) textController.dispose();
      attachText();
    }
    if (suppliedFocus(oldWidget) != suppliedFocus(widget)) {
      if (ownsFocus) inputFocus.dispose();
      attachFocus();
    }
  }

  void setText(String value, {TextSelection? selection}) {
    settingText = true;
    textController.value = TextEditingValue(
        text: value,
        selection: selection ?? TextSelection.collapsed(offset: value.length));
    settingText = false;
  }

  @override
  void dispose() {
    if (ownsText) textController.dispose();
    if (ownsFocus) inputFocus.dispose();
    super.dispose();
  }

  Widget buildInput(
          {ForgeInputKind kind = ForgeInputKind.text,
          String? displayValue,
          bool useDisplayValue = false,
          ValueChanged<String>? onChanged,
          ValueChanged<bool>? onFocusChange,
          ValueChanged<TextEditingValue>? onEditingValueChange,
          List<TextInputFormatter> formatters = const [],
          bool obscureText = false,
          TextInputType? keyboardType,
          Iterable<String>? autofillHints,
          String? Function(String)? validator,
          bool includeName = true,
          double? min,
          double? max,
          double? step,
          bool showValidationMessage = true,
          ForgeFormBinding? formOverride,
          bool includeLabel = true,
          bool includeHint = true,
          bool includeError = true,
          bool? invalidOverride,
          bool? disabledOverride,
          String? semanticLabelOverride}) =>
      ForgeInput(
          showValidationMessage: showValidationMessage,
          value: useDisplayValue ? displayValue : widget.value,
          defaultValue: widget.defaultValue,
          onChanged: onChanged ?? widget.onChanged,
          controller: textController,
          focusNode: inputFocus,
          control: widget.control,
          name: includeName ? widget.name : null,
          form: formOverride ?? widget.form,
          semanticLabel: semanticLabelOverride ?? widget.semanticLabel,
          placeholder: widget.placeholder,
          label: includeLabel ? widget.label : null,
          hint: includeHint ? widget.hint : null,
          error: includeError ? widget.error : null,
          pattern: widget.pattern,
          validationMessage: widget.validationMessage,
          disabled: disabledOverride ?? widget.disabled,
          readOnly: widget.readOnly,
          required: widget.required,
          autofocus: widget.autofocus,
          fullWidth: widget.fullWidth,
          animated: widget.animated,
          invalid: invalidOverride ?? widget.invalid,
          minLength: widget.minLength,
          maxLength: widget.maxLength,
          size: widget.size,
          tone: widget.tone,
          appearance: widget.appearance,
          shape: widget.shape,
          inputType: kind,
          obscureText: obscureText,
          keyboardType: widget.keyboardType ?? keyboardType,
          textInputAction: widget.textInputAction,
          autofillHints: widget.autofillHints ?? autofillHints,
          autocorrect: widget.autocorrect,
          spellCheck: widget.spellCheck,
          capitalization: widget.capitalization,
          onFocusChange: onFocusChange ?? widget.onFocusChange,
          onSubmitted: widget.onSubmitted,
          inputFormatters: formatters,
          onEditingValueChange: (v) {
            if (!settingText) onEditingValueChange?.call(v);
          },
          validator: validator,
          min: min,
          max: max,
          step: step);
}
