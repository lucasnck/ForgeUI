import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../theme/forge_theme_tokens.dart';
import '../theme/forge_control_style.dart';
import '../theme/forge_primitive_style.dart';
import '../types/component_capabilities.dart';
import '../types/forms.dart';
import '../types/primitives.dart';

enum ForgeInputKind {
  text,
  email,
  password,
  number,
  telephone,
  url,
  search,
  date,
  time,
  dateTimeLocal,
  color
}

class ForgeInput extends StatefulWidget {
  final String? value;
  final String defaultValue;
  final ValueChanged<String>? onChanged;
  final TextEditingController? controller;
  final FocusNode? focusNode;
  final ForgeControlBinding? control;
  final String? Function(String)? validator;
  final bool showValidationMessage;
  final String? name,
      semanticLabel,
      placeholder,
      label,
      hint,
      error,
      pattern,
      validationMessage;
  final ForgeFormBinding? form;
  final bool disabled,
      readOnly,
      required,
      autofocus,
      fullWidth,
      animated,
      obscureText;
  final bool? invalid;
  final int? minLength, maxLength, maxLines;
  final int minLines;
  final double? min, max, step;
  final ForgeSize size;
  final ForgeTone tone;
  final ForgeAppearance appearance;
  final ForgeShape? shape;
  final ForgeInputKind inputType;
  final TextInputType? keyboardType;
  final TextInputAction? textInputAction;
  final Iterable<String>? autofillHints;
  final bool autocorrect, spellCheck;
  final TextCapitalization capitalization;
  final ValueChanged<bool>? onFocusChange;
  final VoidCallback? onSubmitted;
  final List<TextInputFormatter> inputFormatters;
  final ValueChanged<TextEditingValue>? onEditingValueChange;
  const ForgeInput(
      {super.key,
      this.value,
      this.defaultValue = '',
      this.onChanged,
      this.controller,
      this.focusNode,
      this.control,
      this.showValidationMessage = true,
      this.validator,
      this.name,
      this.form,
      this.semanticLabel,
      this.placeholder,
      this.label,
      this.hint,
      this.error,
      this.pattern,
      this.validationMessage,
      this.disabled = false,
      this.readOnly = false,
      this.required = false,
      this.autofocus = false,
      this.fullWidth = true,
      this.animated = true,
      this.obscureText = false,
      this.invalid,
      this.minLength,
      this.maxLength,
      this.maxLines = 1,
      this.minLines = 1,
      this.min,
      this.max,
      this.step,
      this.size = ForgeSize.md,
      this.tone = ForgeTone.neutral,
      this.appearance = ForgeAppearance.bordered,
      this.shape,
      this.inputType = ForgeInputKind.text,
      this.keyboardType,
      this.textInputAction,
      this.autofillHints,
      this.autocorrect = true,
      this.spellCheck = true,
      this.capitalization = TextCapitalization.none,
      this.onFocusChange,
      this.onSubmitted,
      this.inputFormatters = const [],
      this.onEditingValueChange});
  @override
  State<ForgeInput> createState() => _ForgeInputState();
}

class _ForgeInputState extends State<ForgeInput> {
  late TextEditingController _text;
  late FocusNode _focus;
  late bool _ownsText, _ownsFocus;
  ForgeFormBinding? _form;
  String? _error;
  int _revision = 0;
  bool _syncing = false;
  String get text => _text.text;
  FocusNode? suppliedFocus(ForgeInput w) => w.control?.focusNode ?? w.focusNode;
  @override
  void initState() {
    super.initState();
    attachText();
    attachFocus();
  }

  void attachText() {
    _ownsText = widget.controller == null;
    _text = widget.controller ??
        TextEditingController(text: widget.value ?? widget.defaultValue);
    if (widget.value != null && _text.text != widget.value) {
      _text.value = TextEditingValue(
          text: widget.value!,
          selection: TextSelection.collapsed(offset: widget.value!.length));
    }
    _text.addListener(edited);
  }

  bool get composing =>
      _text.value.composing.isValid && !_text.value.composing.isCollapsed;
  void reconcile() {
    final version = ++_revision;
    if (widget.value != null && !composing)
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted &&
            version == _revision &&
            !composing &&
            widget.value != null &&
            widget.value != _text.text) write(widget.value!);
      });
  }

  void edited() {
    if (!_syncing) {
      widget.onEditingValueChange?.call(_text.value);
      reconcile();
    }
  }

  void attachFocus() {
    _ownsFocus = suppliedFocus(widget) == null;
    _focus = suppliedFocus(widget) ?? FocusNode();
    _focus.addListener(focused);
  }

  void focused() {
    widget.onFocusChange?.call(_focus.hasFocus);
    if (!_focus.hasFocus && widget.name != null) _form?.blurred(widget.name!);
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    bind();
  }

  void bind() {
    final next = widget.form ?? ForgeFormScope.maybeOf(context)?.binding;
    if (_form != next) {
      _form?.unregister(this);
      _form = next;
    }
    _form?.register(
        this,
        ForgeFieldRegistration(
            name: widget.name ?? '',
            enabled: () =>
                !widget.disabled &&
                widget.name != null &&
                widget.name!.isNotEmpty &&
                !(_form?.disabled ?? false),
            values: () => [text],
            validate: validate,
            reset: reset,
            focusNode: _focus));
  }

  @override
  void didUpdateWidget(covariant ForgeInput oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.controller != widget.controller) {
      _text.removeListener(edited);
      if (_ownsText) _text.dispose();
      attachText();
    }
    if (suppliedFocus(oldWidget) != suppliedFocus(widget)) {
      _focus.removeListener(focused);
      if (_ownsFocus) _focus.dispose();
      attachFocus();
    }
    if (widget.value != null &&
        widget.value != _text.text &&
        (!composing || oldWidget.value != widget.value)) write(widget.value!);
    bind();
  }

  void write(String value) {
    _syncing = true;
    final offset = _text.selection.extentOffset.clamp(0, value.length);
    _text.value = TextEditingValue(
        text: value, selection: TextSelection.collapsed(offset: offset));
    _syncing = false;
  }

  void change(String next) {
    widget.onChanged?.call(next);
    if (_error != null) validate();
    if (widget.name != null) _form?.changed(widget.name!);
    reconcile();
  }

  void reset() {
    _revision++;
    write(widget.value ?? widget.defaultValue);
    if (mounted) setState(() => _error = null);
  }

  bool validate() {
    String? issue;
    if (widget.required && text.isEmpty) issue = 'required';
    if (widget.minLength != null &&
        text.isNotEmpty &&
        text.runes.length < widget.minLength!) issue = 'length';
    if (widget.maxLength != null && text.runes.length > widget.maxLength!)
      issue = 'length';
    if (widget.pattern != null &&
        text.isNotEmpty &&
        !RegExp('^(?:' + widget.pattern! + r')$').hasMatch(text))
      issue = 'pattern';
    if (widget.inputType == ForgeInputKind.email &&
        text.isNotEmpty &&
        !RegExp(r'^[^@\s]+@[^@\s]+\.[^@\s]+$').hasMatch(text))
      issue = 'pattern';
    if (widget.inputType == ForgeInputKind.url &&
        text.isNotEmpty &&
        !(Uri.tryParse(text)?.hasScheme ?? false)) issue = 'pattern';
    if (widget.inputType == ForgeInputKind.number && text.isNotEmpty) {
      final n = double.tryParse(text);
      if (n == null ||
          !n.isFinite ||
          (widget.min != null && n < widget.min!) ||
          (widget.max != null && n > widget.max!))
        issue = 'range';
      else if (widget.step != null && widget.step! > 0) {
        final steps = (n - (widget.min ?? 0)) / widget.step!;
        if ((steps - steps.round()).abs() > 1e-8) issue = 'range';
      }
    }
    final external = widget.validator?.call(text);
    final message = external ??
        (issue == null
            ? null
            : widget.validationMessage ??
                forgeValidationMessage(context, issue));
    if (mounted) setState(() => _error = message);
    return message == null;
  }

  @override
  void dispose() {
    _revision++;
    _form?.unregister(this);
    _text.removeListener(edited);
    _focus.removeListener(focused);
    if (_ownsText) _text.dispose();
    if (_ownsFocus) _focus.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final t = ForgeThemeTokens.of(context), p = t.palette;
    final colors = forgeActionColors(p, widget.tone);
    final border = OutlineInputBorder(
        borderRadius: forgeRadius(p, widget.shape ?? t.shape),
        borderSide:
            BorderSide(color: p.colorBorderDefault, width: p.borderWidthThin));
    final background = switch (widget.appearance) {
      ForgeAppearance.solid => colors.background,
      ForgeAppearance.soft => colors.soft,
      ForgeAppearance.ghost || ForgeAppearance.none => const Color(0x00000000),
      _ => p.colorSurfaceDefault
    };
    final type = widget.keyboardType ??
        switch (widget.inputType) {
          ForgeInputKind.email => TextInputType.emailAddress,
          ForgeInputKind.number =>
            const TextInputType.numberWithOptions(decimal: true, signed: true),
          ForgeInputKind.telephone => TextInputType.phone,
          ForgeInputKind.url => TextInputType.url,
          ForgeInputKind.date ||
          ForgeInputKind.time ||
          ForgeInputKind.dateTimeLocal =>
            TextInputType.datetime,
          _ =>
            widget.maxLines == 1 ? TextInputType.text : TextInputType.multiline
        };
    Widget field = Semantics(
        label: widget.semanticLabel,
        textField: true,
        child: TextField(
            controller: _text,
            focusNode: _focus,
            enabled: !widget.disabled && !(_form?.disabled ?? false),
            readOnly: widget.readOnly,
            autofocus: widget.autofocus,
            obscureText: widget.obscureText ||
                widget.inputType == ForgeInputKind.password,
            minLines: widget.minLines,
            maxLines: widget.obscureText || widget.inputType == ForgeInputKind.password
                ? 1
                : widget.maxLines,
            keyboardType: type,
            textInputAction: widget.textInputAction,
            autofillHints: widget.autofillHints,
            autocorrect: widget.autocorrect,
            spellCheckConfiguration:
                widget.spellCheck && WidgetsBinding.instance.platformDispatcher.nativeSpellCheckServiceDefined
                    ? const SpellCheckConfiguration()
                    : const SpellCheckConfiguration.disabled(),
            textCapitalization: widget.capitalization,
            inputFormatters: [
              ...widget.inputFormatters,
              if (widget.maxLength != null && widget.maxLength! > 0)
                LengthLimitingTextInputFormatter(widget.maxLength,
                    maxLengthEnforcement:
                        MaxLengthEnforcement.truncateAfterCompositionEnds)
            ],
            onChanged: change,
            onSubmitted: (_) {
              if (widget.onSubmitted != null) {
                widget.onSubmitted!();
              } else {
                _form?.onSubmitRequested?.call();
              }
            },
            style: TextStyle(
                fontSize: p.number('--font-size-${widget.size.name}'),
                color: widget.appearance == ForgeAppearance.solid
                    ? colors.foreground
                    : p.colorTextDefault),
            decoration: InputDecoration(
                isDense: true,
                labelText: widget.label,
                hintText: widget.placeholder,
                helperText: widget.hint,
                errorText: widget.showValidationMessage
                    ? widget.error ?? _error
                    : null,
                filled: true,
                fillColor: background,
                contentPadding: EdgeInsets.symmetric(
                    horizontal: p.number(
                        '--component-padding-inline-${widget.size.name}'),
                    vertical: p.number(
                        '--component-padding-block-${widget.size.name}')),
                border: border,
                enabledBorder: (widget.appearance == ForgeAppearance.ghost || widget.appearance == ForgeAppearance.none)
                    ? border.copyWith(borderSide: BorderSide.none)
                    : border,
                focusedBorder: border.copyWith(borderSide: BorderSide(color: p.colorFocusRing, width: p.borderWidthFocus)),
                errorBorder: border.copyWith(borderSide: BorderSide(color: p.colorTextDanger, width: p.borderWidthThin)),
                focusedErrorBorder: border.copyWith(borderSide: BorderSide(color: p.colorFocusRing, width: p.borderWidthFocus)))));
    if (widget.invalid == true && widget.error == null && _error == null)
      field = DecoratedBox(
          decoration: BoxDecoration(
              border: Border.all(
                  color: p.colorTextDanger, width: p.borderWidthThin),
              borderRadius: forgeRadius(p, widget.shape ?? t.shape)),
          child: field);
    return LayoutBuilder(
        builder: (context, c) => SizedBox(
            width: widget.fullWidth && c.hasBoundedWidth
                ? c.maxWidth
                : p.layoutContainerNarrow.clamp(0, c.maxWidth).toDouble(),
            child: ConstrainedBox(
                constraints: BoxConstraints(
                    minHeight:
                        p.number('--component-height-${widget.size.name}')),
                child: field)));
  }
}
