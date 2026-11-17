import 'package:flutter/material.dart';
import '../helpers/range.dart';
import '../theme/forge_theme_tokens.dart';
import '../theme/forge_control_style.dart';
import '../types/component_capabilities.dart';

class ForgeProgress extends StatelessWidget {
  final double? value, max;
  final String label;
  final String? valueText;
  final ForgeSize size;
  final ForgeTone tone;
  final bool fullWidth, animated;
  const ForgeProgress(
      {super.key,
      this.value,
      this.max,
      required this.label,
      this.valueText,
      this.size = ForgeSize.md,
      this.tone = ForgeTone.brand,
      this.fullWidth = true,
      this.animated = true});
  @override
  Widget build(BuildContext context) {
    if (label.trim().isEmpty)
      throw ArgumentError('Progress requires a nonblank label.');
    final range = normalizeForgeProgress(value, max);
    return ForgeRangeTrack(
        label: label,
        ratio: range.value == null ? null : range.value! / range.max,
        valueText: valueText,
        size: size,
        tone: tone,
        fullWidth: fullWidth,
        animated: animated);
  }
}

class ForgeRangeTrack extends StatelessWidget {
  final String label;
  final double? ratio;
  final String? valueText;
  final ForgeSize size;
  final ForgeTone tone;
  final bool fullWidth, animated;
  final bool measurement;
  const ForgeRangeTrack(
      {super.key,
      required this.label,
      this.ratio,
      this.valueText,
      required this.size,
      required this.tone,
      required this.fullWidth,
      required this.animated,
      this.measurement = false});
  @override
  Widget build(BuildContext context) {
    final p = ForgeThemeTokens.of(context).palette;
    final height =
        [p.length1, p.length1, p.length2, p.length3, p.length4][size.index];
    final staticMotion =
        !animated || (MediaQuery.maybeOf(context)?.disableAnimations ?? false);
    return Semantics(
        label: label,
        value:
            valueText ?? (ratio == null ? null : '${(ratio! * 100).round()}%'),
        child: ExcludeSemantics(
            child: LayoutBuilder(
                builder: (context, c) => Container(
                    width: fullWidth && c.hasBoundedWidth
                        ? c.maxWidth
                        : p.length20,
                    height: height,
                    decoration: BoxDecoration(
                        border: Border.all(
                            width: p.borderWidthThin,
                            color: p.colorBorderDefault),
                        borderRadius: BorderRadius.circular(p.radiusSm),
                        color: p.colorSurfaceSubtle),
                    clipBehavior: Clip.antiAlias,
                    child: LinearProgressIndicator(
                        value: ratio ?? (staticMotion ? 0.3 : null),
                        minHeight: height,
                        borderRadius: BorderRadius.circular(p.radiusSm),
                        color: forgeActionColors(p, tone).background,
                        backgroundColor: p.colorSurfaceSubtle)))));
  }
}
