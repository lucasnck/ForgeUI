import 'package:flutter/material.dart';

import '../theme/forge_theme_tokens.dart';
import '../types/primitives.dart';
import 'forge_link.dart';

/// A named location trail. Route handling belongs to the consumer.
///
/// Exactly one [ForgeBreadcrumbItem] must be `current`, and it must be last.
class ForgeBreadcrumb extends StatelessWidget {
  final String label;
  final List<Widget> children;

  const ForgeBreadcrumb({
    super.key,
    required this.label,
    required this.children,
  });

  @override
  Widget build(BuildContext context) {
    if (label.trim().isEmpty) {
      throw ArgumentError.value(
          label, 'label', 'A breadcrumb requires a label');
    }
    if (children.isEmpty) {
      throw ArgumentError('A breadcrumb requires a current location');
    }
    var currentCount = 0;
    for (var index = 0; index < children.length; index++) {
      final child = children[index];
      if (child is! ForgeBreadcrumbItem) {
        throw ArgumentError('Only ForgeBreadcrumbItem children are allowed');
      }
      if (child.current) {
        currentCount++;
        if (index != children.length - 1 || child.href != null) {
          throw ArgumentError(
              'The last item must be the passive current location');
        }
      } else if (child.href == null || child.href!.trim().isEmpty) {
        throw ArgumentError('Each breadcrumb ancestor requires a destination');
      }
    }
    if (currentCount != 1) {
      throw ArgumentError('Exactly one current breadcrumb item is required');
    }

    final palette = ForgeThemeTokens.of(context).palette;
    return _BreadcrumbScope(
      child: Semantics(
        container: true,
        label: label,
        explicitChildNodes: true,
        child: Wrap(
          spacing: palette.space2,
          runSpacing: palette.space1,
          crossAxisAlignment: WrapCrossAlignment.center,
          children: [
            for (var index = 0; index < children.length; index++) ...[
              if (index > 0)
                ExcludeSemantics(
                  child: Text(
                    '/',
                    style: TextStyle(color: palette.colorTextMuted),
                  ),
                ),
              children[index],
            ],
          ],
        ),
      ),
    );
  }
}

class _BreadcrumbScope extends InheritedWidget {
  const _BreadcrumbScope({required super.child});

  static void require(BuildContext context) {
    if (context.dependOnInheritedWidgetOfExactType<_BreadcrumbScope>() ==
        null) {
      throw StateError('ForgeBreadcrumbItem requires a ForgeBreadcrumb owner');
    }
  }

  @override
  bool updateShouldNotify(_BreadcrumbScope oldWidget) => false;
}

/// An ancestor link or a passive current-location item.
class ForgeBreadcrumbItem extends StatelessWidget {
  final bool current;
  final String? href;
  final String? rel;
  final Widget child;
  final String? semanticLabel;
  final VoidCallback? onActivate;
  final ForgeLinkLauncher? launcher;
  final FocusNode? focusNode;

  const ForgeBreadcrumbItem({
    super.key,
    this.current = false,
    this.href,
    this.rel,
    this.child = const SizedBox.shrink(),
    this.semanticLabel,
    this.onActivate,
    this.launcher,
    this.focusNode,
  });

  @override
  Widget build(BuildContext context) {
    _BreadcrumbScope.require(context);
    if (current) {
      // A current location is never an actionable link or an extra focus stop.
      return Semantics(
        container: true,
        selected: true,
        label: semanticLabel,
        child: child,
      );
    }
    return ForgeLink(
      href: href,
      rel: rel,
      onActivate: onActivate,
      launcher: launcher,
      focusNode: focusNode,
      semanticLabel: semanticLabel,
      child: child,
    );
  }
}
