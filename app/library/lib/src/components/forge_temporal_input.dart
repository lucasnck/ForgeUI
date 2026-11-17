import 'package:flutter/material.dart';
import 'internal/configured_input.dart';
import 'forge_input.dart';
import 'forge_input_group.dart';
import 'forge_button.dart';

String _two(int v) => v.toString().padLeft(2, '0');
String forgeLocalDateTime(DateTime d) =>
    '${d.year.toString().padLeft(4, '0')}-${_two(d.month)}-${_two(d.day)}T${_two(d.hour)}:${_two(d.minute)}';
String forgeLocalTime(TimeOfDay t) => '${_two(t.hour)}:${_two(t.minute)}';
bool forgeValidTime(String value) {
  final m = RegExp(r'^(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?$')
      .firstMatch(value);
  return m != null &&
      int.parse(m[1]!) < 24 &&
      int.parse(m[2]!) < 60 &&
      (m[3] == null || int.parse(m[3]!) < 60);
}

bool forgeValidLocalDateTime(String value) {
  final m = RegExp(r'^(\d{4,})-(\d{2})-(\d{2})T(.+)$').firstMatch(value);
  if (m == null || !forgeValidTime(m[4]!)) return false;
  final year = int.parse(m[1]!),
      month = int.parse(m[2]!),
      day = int.parse(m[3]!);
  final d = DateTime(year, month, day);
  return year > 0 && d.year == year && d.month == month && d.day == day;
}

abstract class _TemporalInput extends ForgeConfiguredInput {
  final String pickerLabel;
  final DateTime? firstDate, lastDate;
  const _TemporalInput(
      {super.key,
      required this.pickerLabel,
      this.firstDate,
      this.lastDate,
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
}

class ForgeTimeInput extends _TemporalInput {
  const ForgeTimeInput(
      {super.key,
      required super.pickerLabel,
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
  State<ForgeTimeInput> createState() => _TemporalState<ForgeTimeInput>();
}

class ForgeDateTimeInput extends _TemporalInput {
  const ForgeDateTimeInput(
      {super.key,
      required super.pickerLabel,
      super.firstDate,
      super.lastDate,
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
  State<ForgeDateTimeInput> createState() =>
      _TemporalState<ForgeDateTimeInput>();
}

class _TemporalState<T extends _TemporalInput> extends ConfiguredInputState<T> {
  bool picking = false;
  bool get timeOnly => widget is ForgeTimeInput;
  void commit(String v) {
    setText(v);
    widget.onChanged?.call(v);
    inputFocus.requestFocus();
    if (widget.value != null)
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted && widget.value != v) setText(widget.value!);
      });
  }

  Future<void> pick() async {
    if (picking || widget.disabled || widget.readOnly) return;
    picking = true;
    final old = textController.text,
        base = DateTime.tryParse(old) ?? DateTime.now();
    DateTime? date = base;
    try {
      if (!timeOnly) {
        final first = widget.firstDate ?? DateTime(1),
            last = widget.lastDate ?? DateTime(9999, 12, 31);
        date = await showDatePicker(
            context: context,
            initialDate: base.isBefore(first)
                ? first
                : base.isAfter(last)
                    ? last
                    : base,
            firstDate: first,
            lastDate: last);
        if (date == null || !mounted) return;
      }
      if (!mounted) return;
      final time = await showTimePicker(
          context: context,
          initialTime: timeOnly && forgeValidTime(old)
              ? TimeOfDay(
                  hour: int.parse(old.substring(0, 2)),
                  minute: int.parse(old.substring(3, 5)))
              : TimeOfDay.fromDateTime(base));
      if (time == null || !mounted || widget.disabled || widget.readOnly)
        return;
      commit(timeOnly
          ? forgeLocalTime(time)
          : forgeLocalDateTime(DateTime(
              date.year, date.month, date.day, time.hour, time.minute)));
    } finally {
      picking = false;
    }
  }

  @override
  Widget build(BuildContext context) => ForgeInputGroup(
      fullWidth: widget.fullWidth,
      child: buildInput(
          kind: timeOnly ? ForgeInputKind.time : ForgeInputKind.dateTimeLocal,
          validator: (v) => v.isEmpty ||
                  (timeOnly ? forgeValidTime(v) : forgeValidLocalDateTime(v))
              ? null
              : MaterialLocalizations.of(context).invalidDateFormatLabel),
      trailing: ForgeButton(
          onPressed: pick,
          disabled: widget.disabled || widget.readOnly,
          child: Text(widget.pickerLabel)));
}
