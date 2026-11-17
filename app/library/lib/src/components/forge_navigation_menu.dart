import 'package:flutter/widgets.dart';
import '../types/component_capabilities.dart';
import '../types/primitives.dart';
import '../theme/forge_theme_tokens.dart';
import 'forge_layout.dart';
import 'forge_disclosure.dart';
import 'forge_link.dart';

class ForgeNavigationMenu extends StatelessWidget {
  final String label;
  final List<Widget> children;
  const ForgeNavigationMenu(
      {super.key, required this.label, required this.children});
  @override
  Widget build(BuildContext context) {
    if (label.trim().isEmpty)
      throw ArgumentError('NavigationMenu requires a name.');
    final parts = <_NavPartKind, Widget>{};
    for (final child in children) {
      if (child is! _NavPart)
        throw ArgumentError('NavigationMenu accepts canonical parts only.');
      if (parts.containsKey(child.kind))
        throw ArgumentError('Duplicate NavigationMenu part.');
      parts[child.kind] = child;
    }
    if (!parts.containsKey(_NavPartKind.body))
      throw ArgumentError('NavigationMenu requires Body.');
    return _NavScope(
        child: Semantics(
            container: true,
            label: label,
            child: ForgeStack(gap: ForgeSpace.s2, children: [
              for (final p in _NavPartKind.values)
                if (parts[p] != null) parts[p]!
            ])));
  }
}

class _NavScope extends InheritedWidget {
  const _NavScope({required super.child});
  static void require(BuildContext c) {
    if (c.dependOnInheritedWidgetOfExactType<_NavScope>() == null)
      throw StateError('Navigation part requires NavigationMenu.');
  }

  @override
  bool updateShouldNotify(_NavScope old) => false;
}

enum _NavPartKind { header, body, footer }

abstract class _NavPart extends StatelessWidget {
  final _NavPartKind kind;
  final Widget child;
  const _NavPart({super.key, required this.kind, required this.child});
  @override
  Widget build(BuildContext context) {
    _NavScope.require(context);
    return child;
  }
}

class ForgeNavigationMenuHeader extends _NavPart {
  const ForgeNavigationMenuHeader({super.key, required super.child})
      : super(kind: _NavPartKind.header);
}

class ForgeNavigationMenuFooter extends _NavPart {
  const ForgeNavigationMenuFooter({super.key, required super.child})
      : super(kind: _NavPartKind.footer);
}

class ForgeNavigationMenuBody extends _NavPart {
  ForgeNavigationMenuBody(
      {super.key, required List<ForgeNavigationMenuItem> items})
      : super(
            kind: _NavPartKind.body,
            child: ForgeStack(gap: ForgeSpace.s2, children: items));
}

class ForgeNavigationMenuItem extends StatelessWidget {
  final String label;
  final String? href;
  final bool current, animated;
  final bool? open, defaultOpen;
  final ValueChanged<bool>? onOpenChange;
  final ForgeNavigationMenuSublist? sublist;
  final ForgeLinkLauncher? launcher;
  const ForgeNavigationMenuItem(
      {super.key,
      required this.label,
      this.href,
      this.current = false,
      this.animated = true,
      this.open,
      this.defaultOpen,
      this.onOpenChange,
      this.sublist,
      this.launcher});
  @override
  Widget build(BuildContext context) {
    _NavScope.require(context);
    if (label.trim().isEmpty)
      throw ArgumentError('Navigation item requires a label.');
    if (sublist != null) {
      if (href != null || current)
        throw ArgumentError('Navigation group cannot have href/current.');
      return ForgeDisclosure(
          label: label,
          open: open,
          defaultOpen: defaultOpen ?? false,
          onOpenChange: onOpenChange,
          animated: animated,
          child: sublist!);
    }
    if (open != null ||
        defaultOpen != null ||
        onOpenChange != null ||
        href?.trim().isNotEmpty != true)
      throw ArgumentError(
          'Navigation leaves require href and have no open state.');
    return Semantics(
        selected: current,
        child: ForgeLink(href: href, launcher: launcher, child: Text(label)));
  }
}

class ForgeNavigationMenuSublist extends StatelessWidget {
  final List<ForgeNavigationMenuItem> items;
  const ForgeNavigationMenuSublist({super.key, required this.items});
  @override
  Widget build(BuildContext context) {
    _NavScope.require(context);
    return Padding(
        padding: EdgeInsetsDirectional.only(
            start: ForgeThemeTokens.of(context).palette.space3),
        child: ForgeStack(gap: ForgeSpace.s2, children: items));
  }
}
