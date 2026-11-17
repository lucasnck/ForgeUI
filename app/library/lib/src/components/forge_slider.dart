import 'package:flutter/material.dart';
import '../types/forms.dart';
import '../types/component_capabilities.dart';
import '../theme/forge_theme_tokens.dart';

class ForgeSlider extends StatefulWidget {
  final double? value;
  final double? defaultValue;
  final double min, max, step;
  final bool disabled, readOnly, required, fullWidth;
  final ValueChanged<double>? onChanged;
  final String? valueText, semanticLabel, name;
  final ForgeFormBinding? form;
  final FocusNode? focusNode;
  final bool autofocus;
  final ForgeSize size;
  final ForgeTone tone;
  final bool? invalid;
  const ForgeSlider(
      {super.key,
      this.value,
      this.defaultValue,
      this.min = 0,
      this.max = 100,
      this.step = 1,
      this.disabled = false,
      this.readOnly = false,
      this.required = false,
      this.fullWidth = true,
      this.onChanged,
      this.valueText,
      this.semanticLabel,
      this.name,
      this.form,
      this.focusNode,
      this.autofocus = false,
      this.size = ForgeSize.md,
      this.tone = ForgeTone.neutral,
      this.invalid});
  @override
  State<ForgeSlider> createState() => _SliderState();
}

class _SliderState extends State<ForgeSlider> {
  late double local;
  ForgeFormBinding? form;
  double normalize(double n) {
    if (!n.isFinite) return widget.min;
    final clamped = n.clamp(widget.min, widget.max).toDouble();
    return (widget.min +
            ((clamped - widget.min) / widget.step).round() * widget.step)
        .clamp(widget.min, widget.max)
        .toDouble();
  }

  double get current => normalize(widget.value ?? local);
  @override
  void initState() {
    super.initState();
    check();
    local = normalize(widget.defaultValue ?? (widget.min + widget.max) / 2);
  }

  void check() {
    if (!widget.min.isFinite ||
        !widget.max.isFinite ||
        widget.max < widget.min ||
        !widget.step.isFinite ||
        widget.step <= 0) throw ArgumentError('Invalid Slider range/step.');
  }

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
                  current == current.roundToDouble()
                      ? current.toInt().toString()
                      : current.toString()
                ],
            validate: () => true,
            reset: () {
              if (mounted)
                setState(() => local = normalize(
                    widget.defaultValue ?? (widget.min + widget.max) / 2));
            },
            focusNode: widget.focusNode));
  }

  @override
  void didUpdateWidget(covariant ForgeSlider oldWidget) {
    super.didUpdateWidget(oldWidget);
    check();
    bind();
  }

  @override
  void dispose() {
    form?.unregister(this);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final p = ForgeThemeTokens.of(context).palette,
        enabled =
            !widget.disabled && !widget.readOnly && !(form?.disabled ?? false);
    final slider = SliderTheme(
        data: SliderTheme.of(context).copyWith(
            activeTrackColor: p.colorActionBrandBackground,
            thumbColor: p.colorActionBrandBackground,
            trackHeight: switch (widget.size) {
              ForgeSize.xs || ForgeSize.sm => p.length1,
              ForgeSize.md => p.length2,
              _ => p.length3
            }),
        child: Slider(
            value: current,
            min: widget.min,
            max: widget.max,
            focusNode: widget.focusNode,
            autofocus: widget.autofocus,
            semanticFormatterCallback: (v) => widget.valueText ?? v.toString(),
            onChanged: enabled
                ? (v) {
                    final next = normalize(v);
                    if (next == current) return;
                    if (widget.value == null) setState(() => local = next);
                    widget.onChanged?.call(next);
                    if (widget.name != null) form?.changed(widget.name!);
                  }
                : null));
    return Semantics(
        label: widget.semanticLabel,
        child: widget.fullWidth
            ? slider
            : SizedBox(width: p.length20, child: slider));
  }
}
