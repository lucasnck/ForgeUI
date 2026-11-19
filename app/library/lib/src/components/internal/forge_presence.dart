import 'package:flutter/widgets.dart';
import '../../types/primitives.dart';
import '../../theme/forge_theme_tokens.dart';
import '../../generated/forge_motion.g.dart';

/// Paint retention never delays input, focus or semantic state.
class ForgePresence extends StatefulWidget {
  final bool visible, animated;
  final ForgeAnimationEffect effect;
  final Widget child;
  final VoidCallback? onHidden;
  const ForgePresence(
      {super.key,
      required this.visible,
      required this.child,
      this.animated = true,
      this.effect = ForgeAnimationEffect.fade,
      this.onHidden});
  @override
  State<ForgePresence> createState() => _PresenceState();
}

class _PresenceState extends State<ForgePresence>
    with SingleTickerProviderStateMixin {
  late final AnimationController animation;
  bool notifying = false, hiddenNotified = false;
  bool get enabled =>
      widget.animated &&
      widget.effect != ForgeAnimationEffect.none &&
      !(MediaQuery.maybeOf(context)?.disableAnimations ?? false);
  @override
  void initState() {
    super.initState();
    animation = AnimationController(vsync: this, value: 0);
    animation.addStatusListener((status) {
      if (status == AnimationStatus.dismissed) notifyHidden();
    });
  }

  void notifyHidden() {
    if (notifying ||
        hiddenNotified ||
        widget.visible ||
        widget.onHidden == null) return;
    notifying = true;
    WidgetsBinding.instance.addPostFrameCallback((_) {
      notifying = false;
      if (!mounted ||
          widget.visible ||
          animation.value != 0 ||
          animation.isAnimating) return;
      hiddenNotified = true;
      widget.onHidden?.call();
    });
  }

  void sync() {
    animation.duration = Duration(
        milliseconds:
            ForgeThemeTokens.of(context).palette.motionNormal.round());
    if (widget.visible) hiddenNotified = false;
    if (!enabled) {
      animation.stop();
      animation.value = widget.visible ? 1 : 0;
    } else if (widget.visible) {
      animation.forward();
    } else {
      animation.reverse();
    }
    if (!widget.visible && animation.value == 0) notifyHidden();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    sync();
  }

  @override
  void didUpdateWidget(covariant ForgePresence old) {
    super.didUpdateWidget(old);
    sync();
  }

  @override
  void dispose() {
    animation.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => AnimatedBuilder(
      animation: animation,
      child: widget.child,
      builder: (context, child) {
        final p = ForgeThemeTokens.of(context).palette;
        final progress = enabled
            ? forgeStandardCurve.transform(animation.value)
            : widget.visible
                ? 1.0
                : 0.0;
        final opacity = p.motionOpacityHidden +
            (p.motionOpacityVisible - p.motionOpacityHidden) * progress;
        final scale = widget.effect == ForgeAnimationEffect.scale
            ? p.motionScaleEnter +
                (p.motionScaleRest - p.motionScaleEnter) * progress
            : p.motionScaleRest;
        return Offstage(
            offstage: !widget.visible && animation.value == 0,
            child: ExcludeFocus(
                excluding: !widget.visible,
                child: ExcludeSemantics(
                    excluding: !widget.visible,
                    child: IgnorePointer(
                        ignoring: !widget.visible,
                        child: TickerMode(
                            enabled: widget.visible || animation.isAnimating,
                            child: Opacity(
                                opacity: opacity,
                                alwaysIncludeSemantics: widget.visible,
                                child: Transform.scale(
                                    scale: scale,
                                    alignment: Alignment.center,
                                    child: child)))))));
      });
}
