import '../types/primitives.dart';
import 'package:flutter/widgets.dart';
import '../theme/forge_theme_tokens.dart';
import '../theme/forge_primitive_style.dart';
import '../types/component_capabilities.dart';

class ForgeSkeleton extends StatefulWidget {
  final ForgeSize size;
  final ForgeShape? shape;
  final bool fullWidth, animated;
  final ForgeSkeletonKind kind;
  const ForgeSkeleton(
      {super.key,
      this.size = ForgeSize.md,
      this.shape,
      this.fullWidth = true,
      this.animated = true,
      this.kind = ForgeSkeletonKind.rectangle});
  @override
  State<ForgeSkeleton> createState() => _ForgeSkeletonState();
}

class _ForgeSkeletonState extends State<ForgeSkeleton>
    with SingleTickerProviderStateMixin {
  late final AnimationController _pulse;
  @override
  void initState() {
    super.initState();
    _pulse = AnimationController(vsync: this);
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    configure();
  }

  @override
  void didUpdateWidget(covariant ForgeSkeleton oldWidget) {
    super.didUpdateWidget(oldWidget);
    configure();
  }

  void configure() {
    final p = ForgeThemeTokens.of(context).palette;
    _pulse.duration = Duration(milliseconds: p.motionPulseDuration.round());
    final enabled = widget.animated &&
        !(MediaQuery.maybeOf(context)?.disableAnimations ?? false);
    if (enabled) {
      if (!_pulse.isAnimating) _pulse.repeat(reverse: true);
    } else {
      _pulse.stop();
      _pulse.value = 0;
    }
  }

  @override
  void dispose() {
    _pulse.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final t = ForgeThemeTokens.of(context), p = t.palette;
    final h = widget.kind == ForgeSkeletonKind.text
        ? [
            p.length2,
            p.length2,
            p.length3,
            p.length3,
            p.length4
          ][widget.size.index]
        : p.number('--component-height-${widget.size.name}');
    return ExcludeSemantics(
        child: LayoutBuilder(
            builder: (context, c) => FadeTransition(
                opacity:
                    Tween<double>(begin: p.opacityFull, end: p.opacityPulse)
                        .animate(_pulse),
                child: Container(
                    height: h,
                    width: widget.kind == ForgeSkeletonKind.circle
                        ? h
                        : widget.fullWidth && c.hasBoundedWidth
                            ? c.maxWidth
                            : p.length20,
                    decoration: BoxDecoration(
                        color: p.colorSurfaceSubtle,
                        borderRadius: widget.kind == ForgeSkeletonKind.circle
                            ? BorderRadius.circular(h / 2)
                            : forgeRadius(p, widget.shape ?? t.shape))))));
  }
}
