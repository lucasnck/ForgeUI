import 'package:flutter/widgets.dart';
import '../helpers/phone.dart';
import '../types/primitives.dart';
import '../types/forms.dart';
import 'internal/configured_input.dart';
import 'forge_input.dart';
import 'forge_input_group.dart';
import 'forge_select.dart';

class ForgeInternationalTelephoneInput extends ForgeConfiguredInput {
  final ForgePhoneInputValue phoneValue;
  final ValueChanged<ForgePhoneInputValue> onValueChange;
  final ValueChanged<ForgePhoneParseResult>? onInputStateChange;
  final ForgeLocale locale;
  final String countryLabel, internationalLabel, invalidMessage;
  final List<String>? countries;
  final String? fixedCountry, defaultCountry;
  final bool showCountrySelector;
  const ForgeInternationalTelephoneInput(
      {super.key,
      required ForgePhoneInputValue value,
      required this.onValueChange,
      required this.locale,
      required this.countryLabel,
      required this.internationalLabel,
      required this.invalidMessage,
      this.onInputStateChange,
      this.countries,
      this.fixedCountry,
      this.defaultCountry,
      this.showCountrySelector = true,
      super.controller,
      super.focusNode,
      super.control,
      super.name,
      super.semanticLabel,
      super.placeholder,
      super.label,
      super.hint,
      super.error,
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
      : phoneValue = value;
  @override
  State<ForgeInternationalTelephoneInput> createState() =>
      _InternationalPhoneState();
}

class _InternationalPhoneState
    extends ConfiguredInputState<ForgeInternationalTelephoneInput> {
  String? editingCountry, skipChange;
  ForgePhoneInputValue? expected, baseline, lastEmission;
  bool composing = false;
  ForgeFormBinding? form;
  String display() => formatForgePhone(widget.phoneValue.number,
      international: widget.showCountrySelector ||
          (widget.defaultCountry != null &&
              widget.phoneValue.country != widget.defaultCountry));
  @override
  String get initialText => display();
  void validateOptions() {
    final countries = widget.countries;
    if (countries != null &&
        (countries.toSet().length != countries.length ||
            countries.any((c) => !isSupportedForgePhoneCountry(c))))
      throw ArgumentError('Invalid phone countries.');
    for (final c in [
      widget.fixedCountry,
      widget.defaultCountry,
      widget.phoneValue.country
    ])
      if (c != null && !isSupportedForgePhoneCountry(c))
        throw ArgumentError('Unsupported phone country.');
    if (widget.defaultCountry != null &&
        ((widget.fixedCountry != null &&
                widget.defaultCountry != widget.fixedCountry) ||
            (countries != null && !countries.contains(widget.defaultCountry))))
      throw ArgumentError('Inconsistent phone default country.');
    if ((widget.fixedCountry != null &&
            widget.phoneValue.country != widget.fixedCountry) ||
        (widget.phoneValue.country != null &&
            countries != null &&
            !countries.contains(widget.phoneValue.country)) ||
        (widget.fixedCountry != null &&
            countries != null &&
            !countries.contains(widget.fixedCountry)))
      throw ArgumentError('Inconsistent phone country.');
    if (widget.phoneValue.number != null) {
      final state = restrict(parseForgePhone(widget.phoneValue.number!,
          country: widget.phoneValue.country));
      if (state.kind != ForgePhoneParseKind.possible ||
          state.number != widget.phoneValue.number)
        throw ArgumentError('Invalid canonical phone value.');
    }
  }

  @override
  void initState() {
    super.initState();
    editingCountry = widget.phoneValue.country ?? widget.defaultCountry;
    baseline = widget.phoneValue;
    validateOptions();
  }

  ForgePhoneParseResult restrict(ForgePhoneParseResult state) {
    if (state.kind == ForgePhoneParseKind.possible &&
        ((widget.fixedCountry != null &&
                state.country != widget.fixedCountry) ||
            (widget.countries != null &&
                (state.country == null ||
                    !widget.countries!.contains(state.country))))) {
      return ForgePhoneParseResult(ForgePhoneParseKind.invalid,
          text: textController.text);
    }
    return state;
  }

  String? get contextCountry => widget.showCountrySelector
      ? widget.phoneValue.country
      : textController.text.trim().isNotEmpty
          ? editingCountry
          : widget.defaultCountry ?? widget.phoneValue.country;
  ForgePhoneParseResult get parsed =>
      restrict(parseForgePhone(textController.text, country: contextCountry));
  bool get partial =>
      parsed.kind == ForgePhoneParseKind.invalid ||
      parsed.kind == ForgePhoneParseKind.incomplete;
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
                  parsed.kind == ForgePhoneParseKind.possible &&
                          parsed.number == widget.phoneValue.number
                      ? widget.phoneValue.number ?? ''
                      : ''
                ],
            validate: () =>
                !partial &&
                (!widget.required || widget.phoneValue.number != null),
            reset: () {
              if (mounted) setState(() => setText(display()));
            },
            focusNode: inputFocus));
  }

  @override
  void didUpdateWidget(covariant ForgeInternationalTelephoneInput old) {
    super.didUpdateWidget(old);
    validateOptions();
    if (widget.phoneValue != baseline) {
      if (widget.phoneValue != expected) {
        setText(display());
        editingCountry = widget.phoneValue.country ?? widget.defaultCountry;
      }
      baseline = widget.phoneValue;
      expected = null;
      lastEmission = null;
    }
    bind();
  }

  void emit(ForgePhoneInputValue next) {
    expected = next;
    if (next != widget.phoneValue && next != lastEmission) {
      lastEmission = next;
      widget.onValueChange(next);
    }
  }

  void process(String text) {
    if (widget.disabled || widget.readOnly) return;
    final state = restrict(parseForgePhone(text, country: contextCountry));
    widget.onInputStateChange?.call(state);
    if (state.kind == ForgePhoneParseKind.empty) {
      editingCountry = widget.defaultCountry ?? widget.phoneValue.country;
      emit(ForgePhoneInputValue(number: null, country: editingCountry));
    }
    if (state.kind == ForgePhoneParseKind.possible) {
      editingCountry = state.country;
      emit(ForgePhoneInputValue(number: state.number, country: state.country));
    }
    if (widget.name != null) form?.changed(widget.name!);
    setState(() {});
  }

  void changeCountry(String value) {
    if (widget.disabled || widget.readOnly || widget.fixedCountry != null)
      return;
    final next = ForgePhoneInputValue(
        number: null, country: value.isEmpty ? null : value);
    emit(next);
    setState(() => setText(''));
    widget.onInputStateChange
        ?.call(const ForgePhoneParseResult(ForgePhoneParseKind.empty));
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted && widget.phoneValue != next)
        setState(() => setText(display()));
    });
  }

  @override
  void dispose() {
    form?.unregister(this);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final options = forgePhoneCountries(widget.locale)
        .where((o) =>
            widget.countries == null || widget.countries!.contains(o.country))
        .toList();
    final fixed =
        options.where((o) => o.country == widget.fixedCountry).firstOrNull;
    return ForgeInputGroup(
        fullWidth: widget.fullWidth,
        leading: !widget.showCountrySelector
            ? null
            : fixed != null
                ? Semantics(
                    label: widget.countryLabel,
                    child: Text('${fixed.label} (+${fixed.callingCode})'))
                : ConstrainedBox(
                    constraints: const BoxConstraints(maxWidth: 160),
                    child: ForgeSelect(
                        value: widget.phoneValue.country ?? '',
                        semanticLabel: widget.countryLabel,
                        disabled: widget.disabled || widget.readOnly,
                        size: widget.size,
                        tone: widget.tone,
                        appearance: widget.appearance,
                        shape: widget.shape,
                        options: [
                          ForgeOption(
                              value: '', label: widget.internationalLabel),
                          for (final o in options)
                            ForgeOption(
                                value: o.country,
                                label: '${o.label} (+${o.callingCode})')
                        ],
                        onChanged: changeCountry)),
        child: buildInput(
            kind: ForgeInputKind.telephone,
            includeName: false,
            autofillHints: const [AutofillHints.telephoneNumber],
            validator: (_) => partial ? widget.invalidMessage : null,
            onFocusChange: (active) {
              widget.onFocusChange?.call(active);
              if (!active && !composing) {
                if (!partial) setState(() => setText(display()));
                lastEmission = null;
                expected = null;
              }
            },
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
}
