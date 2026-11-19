import 'package:flutter/widgets.dart';

import '../helpers/range.dart';
import '../theme/forge_theme_tokens.dart';
import '../theme/forge_control_style.dart';
import '../types/component_capabilities.dart';

/// Token-backed progress without Material's LinearProgressIndicator.
class ForgeProgress extends StatelessWidget {
  final double? value, max;
  final String label;
  final String? valueText;
  final ForgeSize size;
  final ForgeTone tone;
  final bool fullWidth, animated;

  const ForgeProgress({
    super.key,
    this.value,
    this.max,
    required this.label,
    this.valueText,
    this.size = ForgeSize.md,
    this.tone = ForgeTone.brand,
    this.fullWidth = true,
    this.animated = true,
  });

  @override
  Widget build(BuildContext context) {
    if (label.trim().isEmpty) {
      throw ArgumentError('Progress requires a nonblank label.');
    }
    final range = normalizeForgeProgress(value, max);
    return ForgeRangeTrack(
      label: label,
      ratio: range.value == null ? null : range.value! / range.max,
      valueText: valueText,
      size: size,
      tone: tone,
      fullWidth: fullWidth,
      animated: animated,
    );
  }
}

/// Shared passive track used by ForgeProgress, ForgeProgressBar, and ForgeMeter.
class ForgeRangeTrack extends StatelessWidget {
  final String label;
  final double? ratio;
  final String? valueText;
  final ForgeSize size;
  final ForgeTone tone;
  final bool fullWidth, animated;
  final bool measurement;

  const ForgeRangeTrack({
    super.key,
    required this.label,
    this.ratio,
    this.valueText,
    required this.size,
    required this.tone,
    required this.fullWidth,
    required this.animated,
    this.measurement = false,
  });

  @override
  Widget build(BuildContext context) {
    final p = ForgeThemeTokens.of(context).palette;
    final height = [p.length1, p.length1, p.length2, p.length3, p.length4][size.index];
    final disableMotion = !animated ||
        (MediaQuery.maybeOf(context)?.disableAnimations ?? false);
    final fraction = ratio == null || !ratio!.isFinite
        ? null
        : ratio!.clamp(0.0, 1.0).toDouble();
    final fill = forgeActionColors(p, tone).background;
    final duration = Duration(milliseconds: disableMotion ? 0 : p.motionNormal.round());

    return Semantics(
      label: label,
      value: valueText ?? (fraction == null ? null : '${(fraction * 100).round()}%'),
      child: ExcludeSemantics(
        child: LayoutBuilder(
          builder: (context, constraints) => SizedBox(
            width: fullWidth && constraints.hasBoundedWidth
                ? constraints.maxWidth
                : p.length20,
            height: height,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(p.radiusSm),
              child: DecoratedBox(
                decoration: BoxDecoration(
                  color: p.colorSurfaceSubtle,
                  border: Border.all(
                    color: p.colorBorderDefault,
                    width: p.borderWidthThin,
                  ),
                ),
                child: fraction == null
                    ? _ForgeIndeterminateFill(
                        color: fill,
                        disableMotion: disableMotion,
                        duration: Duration(
                          milliseconds: p.motionPulseDuration.round().clamp(1, 999999).toInt(),
                        ),
                      )
                    : TweenAnimationBuilder<double>(
                        tween: Tween<double>(begin: 0, end: fraction),
                        duration: duration,
                        curve: Curves.easeInOut,
                        builder: (context, current, _) => FractionallySizedBox(
                          alignment: Alignment.centerLeft,
                          widthFactor: current,
                          child: ColoredBox(color: fill),
                        ),
                      ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

/// Indeterminate animation is local to the indicator and obeys reduced motion.
class _ForgeIndeterminateFill extends StatefulWidget {
  final Color color;
  final bool disableMotion;
  final Duration duration;

  const _ForgeIndeterminateFill({
    required this.color,
    required this.disableMotion,
    required this.duration,
  });

  @override
  State<_ForgeIndeterminateFill> createState() => _ForgeIndeterminateFillState();
}

class _ForgeIndeterminateFillState extends State<_ForgeIndeterminateFill>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: widget.duration);
    _syncMotion();
  }

  @override
  void didUpdateWidget(covariant _ForgeIndeterminateFill oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.duration != widget.duration ||
        oldWidget.disableMotion != widget.disableMotion) {
      _controller.duration = widget.duration;
      _syncMotion();
    }
  }

  void _syncMotion() {
    if (widget.disableMotion) {
      _controller.stop();
      _controller.value = 0;
    } else {
      _controller.repeat();
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => AnimatedBuilder(
        animation: _controller,
        builder: (context, _) => Align(
          alignment: Alignment(-1 + 2 * _controller.value, 0),
          child: FractionallySizedBox(
            alignment: Alignment.centerLeft,
            widthFactor: 0.3,
            child: ColoredBox(color: widget.color),
          ),
        ),
      );
}
