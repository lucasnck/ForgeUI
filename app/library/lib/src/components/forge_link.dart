import 'package:flutter/material.dart';
import '../theme/forge_theme_tokens.dart';
import '../types/primitives.dart';

class ForgeLink extends StatelessWidget {
  final String? href, target, rel, download, hrefLang, semanticLabel;
  final Widget child;
  final VoidCallback? onActivate;
  final ForgeLinkLauncher? launcher;
  final FocusNode? focusNode;
  const ForgeLink(
      {super.key,
      this.href,
      this.child = const SizedBox.shrink(),
      this.onActivate,
      this.launcher,
      this.target,
      this.rel,
      this.download,
      this.hrefLang,
      this.semanticLabel,
      this.focusNode});
  @override
  Widget build(BuildContext context) {
    if (href == null) return child;
    final p = ForgeThemeTokens.of(context).palette;
    void activate() {
      if (onActivate != null) {
        onActivate!();
        return;
      }
      final port = launcher ?? ForgeNavigationAdapter.maybeOf(context);
      if (port == null)
        throw StateError(
            'ForgeLink requires a navigation adapter or onActivate.');
      port(ForgeLaunchRequest(href!,
          target: target, rel: rel, download: download, language: hrefLang));
    }

    return Semantics(
        link: true,
        label: semanticLabel,
        child: Material(
            type: MaterialType.transparency,
            child: InkWell(
                focusNode: focusNode,
                onTap: activate,
                mouseCursor: SystemMouseCursors.click,
                focusColor:
                    p.colorFocusRing.withValues(alpha: p.opacityDecorative),
                child: semanticLabel == null
                    ? child
                    : ExcludeSemantics(child: child))));
  }
}
