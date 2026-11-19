import 'dart:math' as math;
import 'package:flutter/widgets.dart';
import '../theme/forge_control_style.dart';
import '../theme/forge_theme_tokens.dart';
import '../types/component_capabilities.dart';

class ForgeSpinner extends StatefulWidget {
  final ForgeSize size;
  final ForgeTone? tone;
  final bool animated;
  final bool decorative;
  final String? label;
  const ForgeSpinner(
      {super.key,
      this.size = ForgeSize.md,
      this.tone,
      this.animated = true,
      this.decorative = true,
      this.label});
  @override
  State<ForgeSpinner> createState() => _ForgeSpinnerState();
}

class _ForgeSpinnerState extends State<ForgeSpinner>
    with SingleTickerProviderStateMixin {
  late final AnimationController _rotation;
  @override
  void initState() {
    super.initState();
    _rotation = AnimationController(vsync: this);
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _configure();
  }

  @override
  void didUpdateWidget(covariant ForgeSpinner oldWidget) {
    super.didUpdateWidget(oldWidget);
    _configure();
  }

  void _configure() {
    final duration = Duration(
        milliseconds:
            ForgeThemeTokens.of(context).palette.motionSpinDuration.round());
    final changed = _rotation.duration != duration;
    _rotation.duration = duration;
    final running = widget.animated &&
        !(MediaQuery.maybeOf(context)?.disableAnimations ?? false);
    if (running) {
      if (!_rotation.isAnimating || changed) _rotation.repeat();
    } else {
      _rotation.stop();
      _rotation.value = 0;
    }
  }

  @override
  void dispose() {
    _rotation.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!widget.decorative &&
        (widget.label == null || widget.label!.trim().isEmpty)) {
      throw ArgumentError(
          'A nondecorative ForgeSpinner requires a nonblank label.');
    }
    final p = ForgeThemeTokens.of(context).palette;
    final diameter = switch (widget.size) {
      ForgeSize.xs => p.length2,
      ForgeSize.sm => p.length3,
      ForgeSize.md => p.length4,
      ForgeSize.lg => p.length5,
      ForgeSize.xl => p.length6,
    };
    final color = widget.tone == null
        ? DefaultTextStyle.of(context).style.color ?? p.colorTextDefault
        : forgeActionColors(p, widget.tone!).background;
    final indicator = RotationTransition(
        turns: _rotation,
        child: CustomPaint(
            size: Size.square(diameter),
            painter: _SpinnerPainter(color, p.borderWidthThick)));
    return widget.decorative
        ? ExcludeSemantics(child: indicator)
        : Semantics(
            label: widget.label,
            liveRegion: true,
            child: ExcludeSemantics(child: indicator));
  }
}

class _SpinnerPainter extends CustomPainter {
  final Color color;
  final double width;
  const _SpinnerPainter(this.color, this.width);
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = width;
    canvas.drawArc((Offset.zero & size).deflate(width / 2), -math.pi / 2,
        math.pi * 1.5, false, paint);
  }

  @override
  bool shouldRepaint(covariant _SpinnerPainter old) =>
      old.color != color || old.width != width;
}
