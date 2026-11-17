import 'package:flutter/widgets.dart';

typedef ForgeSharedElementName = String;

/// Hero participates in the caller's Navigator/coordinator; no routing is introduced.
class ForgeSharedElement extends StatelessWidget {
  final ForgeSharedElementName name;
  final Widget child;
  final bool animated;
  const ForgeSharedElement(
      {super.key,
      required this.name,
      required this.child,
      this.animated = true});
  @override
  Widget build(BuildContext context) {
    if (name.trim().isEmpty)
      throw ArgumentError(
          'SharedElement requires a deterministic nonempty name.');
    final enabled =
        animated && !(MediaQuery.maybeOf(context)?.disableAnimations ?? false);
    return HeroMode(
        enabled: enabled,
        child: Hero(tag: name, transitionOnUserGestures: true, child: child));
  }
}
