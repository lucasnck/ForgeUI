import 'package:flutter/widgets.dart';
import 'forge_progress.dart';
import '../helpers/range.dart';
import '../types/component_capabilities.dart';

class ForgeMeter extends StatelessWidget {
  final double value;
  final double? min, max, low, high, optimum;
  final String label;
  final ForgeSize size;
  final ForgeTone tone;
  final bool fullWidth, animated;
  const ForgeMeter(
      {super.key,
      required this.value,
      this.min,
      this.max,
      this.low,
      this.high,
      this.optimum,
      required this.label,
      this.size = ForgeSize.md,
      this.tone = ForgeTone.brand,
      this.fullWidth = true,
      this.animated = true});
  @override
  Widget build(BuildContext context) {
    if (label.trim().isEmpty)
      throw ArgumentError('Meter requires a nonblank label.');
    final r = normalizeForgeMeter(
        value: value,
        min: min,
        max: max,
        low: low,
        high: high,
        optimum: optimum);
    return ForgeRangeTrack(
        label: label,
        ratio: r.ratio,
        valueText: '${r.value} (${r.min}–${r.max})',
        size: size,
        tone: tone,
        fullWidth: fullWidth,
        animated: animated,
        measurement: true);
  }
}
