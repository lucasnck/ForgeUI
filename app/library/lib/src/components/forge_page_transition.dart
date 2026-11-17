import 'package:flutter/widgets.dart';
import '../theme/forge_theme_tokens.dart';

enum ForgePageTransitionIntent { forward, back, replace, reveal, none }

class ForgeTransitionSnapshot {
  final Object screenKey;
  final ForgePageTransitionIntent intent;
  const ForgeTransitionSnapshot(
      {required this.screenKey, this.intent = ForgePageTransitionIntent.none});
}

/// The application commits screen identity/readiness and keeps routing, focus and scroll policy.
class ForgeTransitionScope extends InheritedWidget {
  final ForgeTransitionSnapshot snapshot;
  const ForgeTransitionScope(
      {super.key, required this.snapshot, required super.child});
  static ForgeTransitionSnapshot? maybeOf(BuildContext c) =>
      c.dependOnInheritedWidgetOfExactType<ForgeTransitionScope>()?.snapshot;
  @override
  bool updateShouldNotify(ForgeTransitionScope old) =>
      snapshot.screenKey != old.snapshot.screenKey ||
      snapshot.intent != old.snapshot.intent;
}

class ForgePageTransition extends StatefulWidget {
  final Widget child;
  final bool animated;
  final Object? screenKey;
  final ForgePageTransitionIntent? intent;
  const ForgePageTransition(
      {super.key,
      required this.child,
      this.animated = true,
      this.screenKey,
      this.intent});
  @override
  State<ForgePageTransition> createState() => _PageTransitionState();
}

class _PageTransitionState extends State<ForgePageTransition>
    with SingleTickerProviderStateMixin {
  late final AnimationController animation;
  Object? previous;
  bool initialized = false;
  ForgePageTransitionIntent intent = ForgePageTransitionIntent.none;
  bool get enabled =>
      widget.animated &&
      !(MediaQuery.maybeOf(context)?.disableAnimations ?? false);
  @override
  void initState() {
    super.initState();
    animation = AnimationController(vsync: this, value: 1);
  }

  void sync() {
    final snapshot = ForgeTransitionScope.maybeOf(context),
        key = widget.screenKey ?? snapshot?.screenKey ?? widget.child.key;
    intent =
        widget.intent ?? snapshot?.intent ?? ForgePageTransitionIntent.none;
    animation.duration = Duration(
        milliseconds:
            ForgeThemeTokens.of(context).palette.motionNormal.round());
    if (!initialized) {
      initialized = true;
      previous = key;
      animation.value = 1;
      return;
    }
    if (key != previous) {
      previous = key;
      if (enabled && intent != ForgePageTransitionIntent.none) {
        animation.forward(from: 0);
      } else {
        animation.value = 1;
      }
    }
    if (!enabled) animation.value = 1;
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    sync();
  }

  @override
  void didUpdateWidget(covariant ForgePageTransition old) {
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
        final value =
            enabled ? Curves.easeInOut.transform(animation.value) : 1.0;
        final p = ForgeThemeTokens.of(context).palette,
            rtl = Directionality.of(context) == TextDirection.rtl ? -1.0 : 1.0;
        final offset = switch (intent) {
          ForgePageTransitionIntent.forward => p.space3 * rtl,
          ForgePageTransitionIntent.back => -p.space3 * rtl,
          _ => 0.0
        };
        return Opacity(
            opacity: value,
            alwaysIncludeSemantics: true,
            child: Transform.translate(
                offset: Offset(offset * (1 - value), 0), child: child));
      });
}
