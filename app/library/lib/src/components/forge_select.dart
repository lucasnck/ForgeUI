import 'package:flutter/material.dart';
import '../theme/forge_theme_tokens.dart';
import '../theme/forge_primitive_style.dart';
import '../theme/forge_control_style.dart';
import '../types/component_capabilities.dart';
import '../types/forms.dart';

class ForgeOption {
  final String value;
  final String label;
  final bool disabled, selected;
  const ForgeOption(
      {required this.value,
      this.label = '',
      this.disabled = false,
      this.selected = false});
}

class ForgeSelectionValue {
  final List<String> values;
  ForgeSelectionValue.single(String value)
      : values = List.unmodifiable([value]);
  ForgeSelectionValue.multiple(Iterable<String> values)
      : values = List.unmodifiable(values);
  String? get single => values.isEmpty ? null : values.first;
}

class ForgeSelect extends StatefulWidget {
  final List<ForgeOption> options;
  final String? value;
  final String? defaultValue;
  final List<String>? values;
  final List<String> defaultValues;
  final ValueChanged<String>? onChanged;
  final ValueChanged<List<String>>? onValuesChanged;
  final bool multiple, disabled, required, fullWidth, autofocus;
  final bool? invalid;
  final String? label, semanticLabel, name;
  final ForgeFormBinding? form;
  final FocusNode? focusNode;
  final ForgeSize size;
  final ForgeTone tone;
  final ForgeAppearance appearance;
  final ForgeShape? shape;
  const ForgeSelect(
      {super.key,
      required this.options,
      this.value,
      this.defaultValue,
      this.values,
      this.defaultValues = const [],
      this.onChanged,
      this.onValuesChanged,
      this.multiple = false,
      this.disabled = false,
      this.required = false,
      this.fullWidth = true,
      this.autofocus = false,
      this.invalid,
      this.label,
      this.semanticLabel,
      this.name,
      this.form,
      this.focusNode,
      this.size = ForgeSize.md,
      this.tone = ForgeTone.neutral,
      this.appearance = ForgeAppearance.bordered,
      this.shape});
  @override
  State<ForgeSelect> createState() => _SelectState();
}

class _SelectState extends State<ForgeSelect> {
  late List<String> local;
  ForgeFormBinding? _form;
  @override
  void initState() {
    super.initState();
    local = initial();
  }

  List<String> initial() => widget.multiple
      ? [...widget.defaultValues]
      : [
          if (widget.defaultValue != null)
            widget.defaultValue!
          else if (widget.options.any((o) => o.selected))
            widget.options.firstWhere((o) => o.selected).value
          else if (widget.options.any((o) => !o.disabled))
            widget.options.firstWhere((o) => !o.disabled).value
        ];
  List<String> get current => widget.multiple
      ? widget.values ?? local
      : widget.value != null
          ? [widget.value!]
          : local;
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    bind();
  }

  void bind() {
    final next = widget.form ?? ForgeFormScope.maybeOf(context)?.binding;
    if (next != _form) {
      _form?.unregister(this);
      _form = next;
    }
    _form?.register(
        this,
        ForgeFieldRegistration(
            name: widget.name ?? '',
            enabled: () => !widget.disabled && widget.name?.isNotEmpty == true,
            values: () => [...current],
            validate: () =>
                !widget.required || current.any((v) => v.isNotEmpty),
            reset: () {
              if (mounted) setState(() => local = initial());
            },
            focusNode: widget.focusNode));
  }

  @override
  void didUpdateWidget(covariant ForgeSelect oldWidget) {
    super.didUpdateWidget(oldWidget);
    bind();
  }

  @override
  void dispose() {
    _form?.unregister(this);
    super.dispose();
  }

  void choose(String value) {
    if (widget.disabled || (_form?.disabled ?? false)) return;
    final next = widget.multiple
        ? (current.contains(value)
            ? current.where((v) => v != value).toList()
            : [...current, value])
        : [value];
    if ((widget.multiple ? widget.values == null : widget.value == null))
      setState(() => local = next);
    if (widget.multiple) {
      widget.onValuesChanged?.call(List.unmodifiable(next));
    } else {
      widget.onChanged?.call(value);
    }
    if (widget.name != null) _form?.changed(widget.name!);
  }

  @override
  Widget build(BuildContext context) {
    final p = ForgeThemeTokens.of(context).palette;
    if (widget.multiple)
      return Semantics(
          label: widget.semanticLabel ?? widget.label,
          child: Column(mainAxisSize: MainAxisSize.min, children: [
            for (final o in widget.options)
              CheckboxListTile(
                  value: current.contains(o.value),
                  title: Text(o.label),
                  onChanged: widget.disabled || o.disabled
                      ? null
                      : (_) => choose(o.value),
                  controlAffinity: ListTileControlAffinity.leading)
          ]));
    final selected = current.isEmpty
        ? -1
        : widget.options.indexWhere((o) => o.value == current.first);
    final present = selected < 0 ? null : selected;
    final style = forgeActionStyle(p,
        size: widget.size,
        tone: widget.tone,
        appearance: widget.appearance,
        shape: widget.shape ?? ForgeThemeTokens.of(context).shape,
        reduceMotion: true);
    return Semantics(
        label: widget.semanticLabel,
        child: InputDecorator(
            decoration: InputDecoration(
                labelText: widget.label,
                isDense: true,
                enabled: !widget.disabled,
                filled: true,
                fillColor: style.background,
                border: OutlineInputBorder(
                    borderRadius: forgeRadius(
                        p, widget.shape ?? ForgeThemeTokens.of(context).shape),
                    borderSide: BorderSide(
                        color: widget.invalid == true
                            ? p.colorTextDanger
                            : p.colorBorderDefault,
                        width: p.borderWidthThin))),
            child: DropdownButtonHideUnderline(
                child: DropdownButton<int>(
                    value: present,
                    isDense: true,
                    focusNode: widget.focusNode,
                    autofocus: widget.autofocus,
                    isExpanded: widget.fullWidth,
                    items: [
                      for (var i = 0; i < widget.options.length; i++)
                        DropdownMenuItem(
                            value: i,
                            enabled: !widget.options[i].disabled,
                            child: Text(widget.options[i].label))
                    ],
                    onChanged: widget.disabled
                        ? null
                        : (v) {
                            if (v != null) choose(widget.options[v].value);
                          }))));
  }
}
