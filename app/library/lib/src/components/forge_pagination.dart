import 'package:flutter/widgets.dart';

import '../theme/forge_theme_tokens.dart';
import '../types/component_capabilities.dart';
import 'forge_button.dart';

/// A controlled collection of page actions; never fetches or changes routes.
class ForgePagination extends StatelessWidget {
  final String label;
  final int page;
  final int pageCount;
  final ValueChanged<int> onPageChange;
  final bool disabled;
  final List<Widget> children;

  const ForgePagination({
    super.key,
    required this.label,
    required this.page,
    required this.pageCount,
    required this.onPageChange,
    required this.children,
    this.disabled = false,
  });

  @override
  Widget build(BuildContext context) {
    if (label.trim().isEmpty) {
      throw ArgumentError.value(label, 'label', 'Pagination requires a label');
    }
    if (pageCount < 1 || page < 1 || page > pageCount) {
      throw RangeError('Pagination must have a valid one-based page range');
    }
    final targets = <int>{};
    for (final child in children) {
      if (child is ForgePaginationItem) {
        if (child.page < 1 || child.page > pageCount) {
          throw RangeError.range(child.page, 1, pageCount, 'PaginationItem.page');
        }
        if (!targets.add(child.page)) {
          throw ArgumentError.value(child.page, 'PaginationItem.page',
              'Duplicate page targets are not allowed');
        }
      } else if (child is! ForgePaginationEllipsis) {
        throw ArgumentError('Only ForgePaginationItem and ForgePaginationEllipsis are allowed');
      }
    }

    final palette = ForgeThemeTokens.of(context).palette;
    return _PaginationScope(
      page: page,
      pageCount: pageCount,
      disabled: disabled,
      requestPage: (requested) {
        if (!disabled && requested >= 1 && requested <= pageCount && requested != page) {
          onPageChange(requested);
        }
      },
      child: Semantics(
        container: true,
        label: label,
        explicitChildNodes: true,
        child: Wrap(
          spacing: palette.space0,
          runSpacing: palette.space1,
          crossAxisAlignment: WrapCrossAlignment.center,
          children: children,
        ),
      ),
    );
  }
}

class _PaginationScope extends InheritedWidget {
  final int page;
  final int pageCount;
  final bool disabled;
  final ValueChanged<int> requestPage;

  const _PaginationScope({
    required this.page,
    required this.pageCount,
    required this.disabled,
    required this.requestPage,
    required super.child,
  });

  static _PaginationScope of(BuildContext context) {
    final scope = context.dependOnInheritedWidgetOfExactType<_PaginationScope>();
    if (scope == null) {
      throw StateError('A pagination item must have a ForgePagination owner');
    }
    return scope;
  }

  @override
  bool updateShouldNotify(_PaginationScope old) =>
      page != old.page ||
      pageCount != old.pageCount ||
      disabled != old.disabled ||
      requestPage != old.requestPage;
}

/// Caller-owned page target. `current: false` is useful for Previous/Next.
class ForgePaginationItem extends StatelessWidget {
  final int page;
  final String label;
  final Widget? child;
  final bool disabled;
  final bool animated;
  final bool? current;
  final VoidCallback? onPressed;

  const ForgePaginationItem({
    super.key,
    required this.page,
    required this.label,
    this.child,
    this.disabled = false,
    this.animated = true,
    this.current,
    this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    final owner = _PaginationScope.of(context);
    if (label.trim().isEmpty) {
      throw ArgumentError.value(label, 'label', 'A page action requires a label');
    }
    if (page < 1 || page > owner.pageCount) {
      throw RangeError.range(page, 1, owner.pageCount, 'page');
    }
    final isCurrent = current ?? page == owner.page;
    final unavailable = owner.disabled || disabled;
    return Semantics(
      container: true,
      selected: isCurrent,
      child: ForgeButton(
        semanticLabel: label,
        size: ForgeSize.sm,
        tone: ForgeTone.neutral,
        appearance: isCurrent ? ForgeAppearance.soft : ForgeAppearance.ghost,
        disabled: unavailable,
        onPressed: unavailable
            ? null
            : () {
                onPressed?.call();
                owner.requestPage(page);
              },
        child: child ?? Text('$page'),
      ),
    );
  }
}

/// Visual-only, nonfocusable gap. It is not a page target.
class ForgePaginationEllipsis extends StatelessWidget {
  const ForgePaginationEllipsis({super.key});

  @override
  Widget build(BuildContext context) {
    _PaginationScope.of(context);
    final palette = ForgeThemeTokens.of(context).palette;
    return ExcludeSemantics(
      child: Padding(
        padding: EdgeInsets.symmetric(horizontal: palette.space2),
        child: Text('…', style: TextStyle(color: palette.colorTextMuted)),
      ),
    );
  }
}
