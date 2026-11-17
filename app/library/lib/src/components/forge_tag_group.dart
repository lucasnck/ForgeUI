import 'package:flutter/widgets.dart';

import '../theme/forge_theme_tokens.dart';
import 'forge_tag.dart';

/// A stable caller-owned tag descriptor; IDs never depend on display labels.
class ForgeTagGroupEntry {
  final String id;
  final ForgeTagConfiguration tag;

  const ForgeTagGroupEntry({required this.id, required this.tag});
}

/// Ordered, wrapping tag collection. Removing an item requires a caller update.
class ForgeTagGroup extends StatelessWidget {
  final List<ForgeTagGroupEntry>? items;
  final List<ForgeTagGroupItem>? children;
  final bool fullWidth;
  final String? label;

  const ForgeTagGroup({
    super.key,
    this.items,
    this.children,
    this.fullWidth = true,
    this.label,
  });

  @override
  Widget build(BuildContext context) {
    if ((items == null) == (children == null)) {
      throw ArgumentError(
          'TagGroup requires either items or children, not both');
    }
    final descendants = children ??
        [
          for (final tag in items!)
            ForgeTagGroupItem(key: ValueKey(tag.id), tag: tag),
        ];
    final ids = descendants.map((item) => item.tag.id).toList(growable: false);
    if (ids.any((id) => id.trim().isEmpty) ||
        ids.toSet().length != ids.length) {
      throw ArgumentError('TagGroup requires nonblank, unique stable item IDs');
    }
    final palette = ForgeThemeTokens.of(context).palette;
    return _TagGroupScope(
      child: Semantics(
        container: true,
        label: label,
        explicitChildNodes: true,
        child: LayoutBuilder(
          builder: (context, constraints) => SizedBox(
            width: fullWidth && constraints.hasBoundedWidth
                ? constraints.maxWidth
                : null,
            child: Wrap(
              spacing: palette.space1,
              runSpacing: palette.space1,
              children: descendants,
            ),
          ),
        ),
      ),
    );
  }
}

class _TagGroupScope extends InheritedWidget {
  const _TagGroupScope({required super.child});

  static void require(BuildContext context) {
    if (context.dependOnInheritedWidgetOfExactType<_TagGroupScope>() == null) {
      throw StateError('ForgeTagGroupItem requires a ForgeTagGroup owner');
    }
  }

  @override
  bool updateShouldNotify(_TagGroupScope old) => false;
}

/// Renders the full Tag descriptor without introducing selection/removal state.
class ForgeTagGroupItem extends StatelessWidget {
  final ForgeTagGroupEntry tag;

  const ForgeTagGroupItem({super.key, required this.tag});

  @override
  Widget build(BuildContext context) {
    _TagGroupScope.require(context);
    return Semantics(container: true, child: tag.tag.build());
  }
}
