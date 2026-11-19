import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

import '../theme/forge_theme_tokens.dart';
import '../types/primitives.dart';

/// A Forge-owned link. Navigation is always delegated to the consumer.
/// No Material ink, routing package, or implicit URL launcher is required.
class ForgeLink extends StatefulWidget {
  final String? href, target, rel, download, hrefLang, semanticLabel;
  final Widget child;
  final VoidCallback? onActivate;
  final ForgeLinkLauncher? launcher;
  final FocusNode? focusNode;

  const ForgeLink({
    super.key,
    this.href,
    this.child = const SizedBox.shrink(),
    this.onActivate,
    this.launcher,
    this.target,
    this.rel,
    this.download,
    this.hrefLang,
    this.semanticLabel,
    this.focusNode,
  });

  @override
  State<ForgeLink> createState() => _ForgeLinkState();
}

class _ForgeLinkState extends State<ForgeLink> {
  bool _showFocusHighlight = false;

  @override
  Widget build(BuildContext context) {
    if (widget.href == null) return widget.child;
    final p = ForgeThemeTokens.of(context).palette;

    void activate() {
      if (widget.onActivate != null) {
        widget.onActivate!();
        return;
      }
      final port = widget.launcher ?? ForgeNavigationAdapter.maybeOf(context);
      if (port == null) {
        throw StateError('ForgeLink requires a navigation adapter or onActivate.');
      }
      port(ForgeLaunchRequest(
        widget.href!,
        target: widget.target,
        rel: widget.rel,
        download: widget.download,
        language: widget.hrefLang,
      ));
    }

    return Semantics(
      link: true,
      enabled: true,
      label: widget.semanticLabel,
      onTap: activate,
      child: FocusableActionDetector(
        focusNode: widget.focusNode,
        mouseCursor: SystemMouseCursors.click,
        onShowFocusHighlight: (highlight) {
          if (mounted && _showFocusHighlight != highlight) {
            setState(() => _showFocusHighlight = highlight);
          }
        },
        shortcuts: const <ShortcutActivator, Intent>{
          SingleActivator(LogicalKeyboardKey.enter): ActivateIntent(),
          SingleActivator(LogicalKeyboardKey.space): ActivateIntent(),
        },
        actions: <Type, Action<Intent>>{
          ActivateIntent: CallbackAction<ActivateIntent>(
            onInvoke: (_) {
              activate();
              return null;
            },
          ),
        },
        child: MouseRegion(
          cursor: SystemMouseCursors.click,
          child: GestureDetector(
            excludeFromSemantics: true,
            behavior: HitTestBehavior.opaque,
            onTap: activate,
            child: Stack(
              fit: StackFit.passthrough,
              children: [
                if (widget.semanticLabel == null)
                  widget.child
                else
                  ExcludeSemantics(child: widget.child),
                if (_showFocusHighlight)
                  Positioned.fill(
                    child: IgnorePointer(
                      child: DecoratedBox(
                        decoration: BoxDecoration(
                          border: Border.all(
                            color: p.colorFocusRing,
                            width: p.borderWidthFocus,
                          ),
                          borderRadius: BorderRadius.circular(p.radiusSm),
                        ),
                      ),
                    ),
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
