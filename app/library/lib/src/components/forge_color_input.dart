import 'package:flutter/material.dart';
import 'internal/configured_input.dart';
import 'forge_input.dart';
import 'forge_input_group.dart';
import 'forge_button.dart';

class ForgeColorInput extends ForgeConfiguredInput {
  final String pickerLabel, redLabel, greenLabel, blueLabel;
  const ForgeColorInput(
      {super.key,
      required this.pickerLabel,
      required this.redLabel,
      required this.greenLabel,
      required this.blueLabel,
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
  State<ForgeColorInput> createState() => _ColorState();
}

class _ColorState extends ConfiguredInputState<ForgeColorInput> {
  bool picking = false;
  bool valid(String v) => RegExp(r'^#[0-9a-fA-F]{6}$').hasMatch(v);
  Future<void> pick() async {
    if (picking || widget.disabled || widget.readOnly) return;
    picking = true;
    try {
      var color = Color(int.parse(
          'ff' +
              (valid(textController.text)
                  ? textController.text.substring(1)
                  : '000000'),
          radix: 16));
      final next = await showDialog<Color>(
          context: context,
          builder: (context) => StatefulBuilder(builder: (context, update) {
                Widget channel(
                        String label, int value, void Function(int) change) =>
                    Row(children: [
                      SizedBox(width: 80, child: Text(label)),
                      Expanded(
                          child: Slider(
                              value: value.toDouble(),
                              min: 0,
                              max: 255,
                              divisions: 255,
                              label: value.toString(),
                              onChanged: (v) =>
                                  update(() => change(v.round()))))
                    ]);
                return AlertDialog(
                    title: Text(widget.pickerLabel),
                    content: Column(mainAxisSize: MainAxisSize.min, children: [
                      Semantics(
                          label: '#' +
                              color.toARGB32().toRadixString(16).substring(2),
                          child: SizedBox(
                              width: 64,
                              height: 64,
                              child: ColoredBox(color: color))),
                      channel(widget.redLabel, (color.r * 255).round(),
                          (v) => color = color.withRed(v)),
                      channel(widget.greenLabel, (color.g * 255).round(),
                          (v) => color = color.withGreen(v)),
                      channel(widget.blueLabel, (color.b * 255).round(),
                          (v) => color = color.withBlue(v))
                    ]),
                    actions: [
                      TextButton(
                          onPressed: () => Navigator.pop(context),
                          child: Text(MaterialLocalizations.of(context)
                              .cancelButtonLabel)),
                      TextButton(
                          onPressed: () => Navigator.pop(context, color),
                          child: Text(
                              MaterialLocalizations.of(context).okButtonLabel))
                    ]);
              }));
      if (next == null || !mounted || widget.disabled || widget.readOnly)
        return;
      final value =
          '#' + next.toARGB32().toRadixString(16).padLeft(8, '0').substring(2);
      setText(value);
      widget.onChanged?.call(value);
      if (widget.value != null)
        WidgetsBinding.instance.addPostFrameCallback((_) {
          if (mounted && widget.value != value) setText(widget.value!);
        });
    } finally {
      picking = false;
    }
  }

  @override
  Widget build(BuildContext context) => ForgeInputGroup(
      fullWidth: widget.fullWidth,
      child: buildInput(
          kind: ForgeInputKind.color,
          validator: (v) => v.isEmpty || valid(v)
              ? null
              : widget.validationMessage ?? 'Use #RRGGBB'),
      trailing: ForgeButton(
          onPressed: pick,
          disabled: widget.disabled || widget.readOnly,
          child: Text(widget.pickerLabel)));
}
