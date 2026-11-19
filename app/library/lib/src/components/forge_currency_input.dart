import 'package:flutter/widgets.dart';
import '../types/primitives.dart';
import '../types/forms.dart';
import '../helpers/money.dart';
import 'internal/configured_input.dart';
import 'forge_input_group.dart';

class ForgeCurrencyInput extends ForgeConfiguredInput {
  final String? amount;
  final ValueChanged<String?> onValueChange;
  final String currency, invalidMessage;
  final ForgeLocale locale;
  final bool allowNegative;
  final ValueChanged<ForgeMoneyInputResult>? onInputStateChange;
  const ForgeCurrencyInput(
      {super.key,
      required String? value,
      required this.onValueChange,
      required this.currency,
      required this.locale,
      required this.invalidMessage,
      this.allowNegative = true,
      this.onInputStateChange,
      super.controller,
      super.focusNode,
      super.control,
      super.name,
      super.semanticLabel,
      super.placeholder,
      super.label,
      super.hint,
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
      : amount = value;
  @override
  State<ForgeCurrencyInput> createState() => _CurrencyState();
}

class _CurrencyState extends ConfiguredInputState<ForgeCurrencyInput> {
  late ForgeLocale draftLocale;
  late String draftCurrency;
  String? baseline, expected;
  bool editing = false, composing = false;
  ForgeFormBinding? form;
  String? skipChange;
  ForgeMoneyOptions get options => ForgeMoneyOptions(
      currency: draftCurrency,
      locale: draftLocale,
      allowNegative: widget.allowNegative);
  ForgeMoneyOptions get currentOptions => ForgeMoneyOptions(
      currency: widget.currency,
      locale: widget.locale,
      allowNegative: widget.allowNegative);
  String display(String? v) => v == null || isValidForgeMoney(v, currentOptions)
      ? forgeMoneyDisplayText(v, currentOptions)
      : forgeMoneyEditText(v, currentOptions);
  @override
  String get initialText => display(widget.amount);
  @override
  void initState() {
    draftLocale = widget.locale;
    draftCurrency = widget.currency;
    baseline = expected = widget.amount;
    super.initState();
  }

  ForgeMoneyInputResult get parsed =>
      parseForgeMoneyInput(textController.text, options);
  bool get partial =>
      parsed.kind == ForgeMoneyInputKind.incomplete ||
      parsed.kind == ForgeMoneyInputKind.invalid;
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    bind();
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
            enabled: () => !widget.disabled && widget.name?.isNotEmpty == true,
            values: () => [
                  widget.amount == null
                      ? ''
                      : normalizeForgeMoney(widget.amount!)
                ],
            validate: () =>
                !partial && (!widget.required || widget.amount != null),
            reset: () {
              if (mounted)
                setState(() {
                  baseline = expected = widget.amount;
                  draftLocale = widget.locale;
                  draftCurrency = widget.currency;
                  setText(display(widget.amount));
                });
            },
            focusNode: inputFocus));
  }

  @override
  void didUpdateWidget(covariant ForgeCurrencyInput oldWidget) {
    super.didUpdateWidget(oldWidget);
    final external = widget.amount != baseline && widget.amount != expected;
    if (external ||
        (!partial &&
            (draftLocale != widget.locale ||
                draftCurrency != widget.currency))) {
      baseline = expected = widget.amount;
      draftLocale = widget.locale;
      draftCurrency = widget.currency;
      setText(editing
          ? forgeMoneyEditText(widget.amount, currentOptions)
          : display(widget.amount));
    }
    bind();
  }

  void process(String text) {
    if (widget.disabled || widget.readOnly) return;
    final result = parseForgeMoneyInput(text, options);
    baseline = widget.amount;
    expected = result.kind == ForgeMoneyInputKind.valid ||
            result.kind == ForgeMoneyInputKind.empty
        ? result.value
        : widget.amount;
    editing = true;
    widget.onInputStateChange?.call(result);
    if ((result.kind == ForgeMoneyInputKind.valid ||
            result.kind == ForgeMoneyInputKind.empty) &&
        result.value != widget.amount) widget.onValueChange(result.value);
    if (widget.name != null) form?.changed(widget.name!);
    setState(() {});
  }

  void focus(bool active) {
    widget.onFocusChange?.call(active);
    if (widget.disabled || widget.readOnly) return;
    if (!partial) {
      draftLocale = widget.locale;
      draftCurrency = widget.currency;
      baseline = expected = widget.amount;
      setText(active
          ? forgeMoneyEditText(widget.amount, currentOptions)
          : display(widget.amount));
    }
    editing = active;
    if (mounted) setState(() {});
  }

  @override
  void dispose() {
    form?.unregister(this);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => ForgeInputGroup(
      fullWidth: widget.fullWidth,
      leading: ForgeInputAddon(text: widget.currency),
      child: buildInput(
          includeName: false,
          keyboardType: const TextInputType.numberWithOptions(
              decimal: true, signed: true),
          onFocusChange: focus,
          validator: (_) => partial ? widget.invalidMessage : null,
          onChanged: (text) {
            if (skipChange == text) {
              skipChange = null;
              return;
            }
            if (!composing) process(text);
          },
          onEditingValueChange: (v) {
            final active = v.composing.isValid && !v.composing.isCollapsed;
            if (composing && !active) {
              skipChange = v.text;
              process(v.text);
            }
            composing = active;
          }));
}
