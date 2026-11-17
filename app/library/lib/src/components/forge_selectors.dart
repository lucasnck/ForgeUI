import 'package:flutter/widgets.dart';
import '../types/primitives.dart';
import '../types/component_capabilities.dart';
import '../theme/forge_theme_tokens.dart';
import 'forge_select.dart';

@immutable
class ForgeSelectorOption<T> {
  final T value;
  final String label;
  const ForgeSelectorOption({required this.value, required this.label});
}

class ForgeLocaleSelector extends StatelessWidget {
  final ForgeLocale value;
  final ValueChanged<ForgeLocale> onValueChange;
  final List<ForgeSelectorOption<ForgeLocale>> options;
  final String label;
  final bool disabled;
  final ForgeSize size;
  const ForgeLocaleSelector(
      {super.key,
      required this.value,
      required this.onValueChange,
      required this.options,
      required this.label,
      this.disabled = false,
      this.size = ForgeSize.md});
  @override
  Widget build(BuildContext context) => ForgeSelect(
      label: label,
      value: value.name,
      disabled: disabled,
      size: size,
      options: [
        for (final o in options)
          ForgeOption(value: o.value.name, label: o.label)
      ],
      onChanged: (v) =>
          onValueChange(options.firstWhere((o) => o.value.name == v).value));
}

class ForgeThemeSelector extends StatelessWidget {
  final ForgeThemeId value;
  final ValueChanged<ForgeThemeId> onValueChange;
  final List<ForgeSelectorOption<ForgeThemeId>> options;
  final String label;
  final bool disabled;
  final ForgeSize size;
  const ForgeThemeSelector(
      {super.key,
      required this.value,
      required this.onValueChange,
      required this.options,
      required this.label,
      this.disabled = false,
      this.size = ForgeSize.md});
  @override
  Widget build(BuildContext context) => ForgeSelect(
      label: label,
      value: value.name,
      disabled: disabled,
      size: size,
      options: [
        for (final o in options)
          ForgeOption(value: o.value.name, label: o.label)
      ],
      onChanged: (v) =>
          onValueChange(options.firstWhere((o) => o.value.name == v).value));
}
