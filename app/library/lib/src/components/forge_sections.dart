import 'package:flutter/widgets.dart';
import '../theme/forge_theme_tokens.dart';
import '../types/primitives.dart';
import '../types/component_capabilities.dart';
import 'forge_layout.dart';
import 'forge_spinner.dart';

enum _SectionKind { card, alert, emptyState, errorState, loadingState, list }

enum _Part { header, body, footer }

class _SectionScope extends InheritedWidget {
  final _SectionKind kind;
  final ForgeAnnouncementPoliteness announcement;
  final String? label;
  const _SectionScope(
      {required this.kind,
      required this.announcement,
      this.label,
      required super.child});
  static _SectionScope of(BuildContext context, _SectionKind kind) {
    final scope = context.dependOnInheritedWidgetOfExactType<_SectionScope>();
    if (scope == null || scope.kind != kind)
      throw StateError('Section part used outside its matching nearest owner.');
    return scope;
  }

  @override
  bool updateShouldNotify(_SectionScope old) =>
      kind != old.kind ||
      announcement != old.announcement ||
      label != old.label;
}

abstract class _SectionPart extends StatelessWidget {
  final _SectionKind kind;
  final _Part part;
  final Widget child;
  final String? semanticLabel;
  const _SectionPart(
      {super.key,
      required this.kind,
      required this.part,
      this.child = const SizedBox.shrink(),
      this.semanticLabel});
  @override
  Widget build(BuildContext context) {
    final scope = _SectionScope.of(context, kind),
        p = ForgeThemeTokens.of(context).palette;
    Widget body = child;
    if (kind == _SectionKind.loadingState && part == _Part.body) {
      body = ForgeStack(gap: ForgeSpace.s2, children: [
        ForgeInline(gap: ForgeSpace.s2, children: [
          const ForgeSpinner(decorative: true),
          Text(scope.label!)
        ]),
        child
      ]);
    }
    if (kind == _SectionKind.card)
      body = Padding(padding: EdgeInsets.all(p.space3), child: body);
    if (part == _Part.body &&
        (kind == _SectionKind.alert ||
            kind == _SectionKind.errorState ||
            kind == _SectionKind.loadingState)) {
      body = Semantics(
          container: true,
          liveRegion: kind == _SectionKind.loadingState ||
              scope.announcement != ForgeAnnouncementPoliteness.off,
          label: semanticLabel,
          child: body);
    } else if (semanticLabel != null) {
      body = Semantics(label: semanticLabel, child: body);
    }
    return body;
  }
}

abstract class _Section extends StatelessWidget {
  final _SectionKind kind;
  final List<Widget> children;
  final ForgeAnnouncementPoliteness announcement;
  final String? label, semanticLabel;
  final ForgeElevation elevation;
  final ForgeShape? shape;
  final bool fullWidth;
  const _Section(
      {super.key,
      required this.kind,
      required this.children,
      this.announcement = ForgeAnnouncementPoliteness.off,
      this.label,
      this.semanticLabel,
      this.elevation = ForgeElevation.raised,
      this.shape,
      this.fullWidth = true});
  @override
  Widget build(BuildContext context) {
    final parts = <_Part, Widget>{};
    for (final child in children) {
      if (child is! _SectionPart || child.kind != kind)
        throw ArgumentError(
            'Only canonical matching section parts are allowed.');
      if (parts.containsKey(child.part))
        throw ArgumentError('Duplicate section part.');
      parts[child.part] = child;
    }
    if (!parts.containsKey(_Part.body))
      throw ArgumentError('Section requires its Body part.');
    if (kind == _SectionKind.loadingState &&
        (label == null || label!.trim().isEmpty))
      throw ArgumentError('LoadingState requires a nonblank localized label.');
    final p = ForgeThemeTokens.of(context).palette;
    Widget body = ForgeStack(
        gap: kind == _SectionKind.card ? ForgeSpace.s0 : ForgeSpace.s2,
        children: [
          for (final part in _Part.values)
            if (parts[part] != null) parts[part]!
        ]);
    if (kind == _SectionKind.card) {
      body = ForgeSurface(
          elevation: elevation,
          shape: shape,
          padding: ForgeSpace.s0,
          gap: ForgeSpace.s0,
          child: body);
    } else {
      body = Padding(
          padding: EdgeInsets.all(kind == _SectionKind.alert
              ? p.space2
              : kind == _SectionKind.list
                  ? 0
                  : p.space3),
          child: body);
    }
    body = Semantics(
        container: true,
        label:
            semanticLabel ?? (parts.containsKey(_Part.header) ? null : label),
        child: body);
    if (fullWidth) {
      final content = body;
      body = LayoutBuilder(
          builder: (context, c) => SizedBox(
              width: c.hasBoundedWidth ? c.maxWidth : null, child: content));
    }
    return _SectionScope(
        kind: kind, announcement: announcement, label: label, child: body);
  }
}

class ForgeCard extends _Section {
  const ForgeCard({
    super.key,
    required super.children,
    super.semanticLabel,
    super.elevation,
    super.shape,
    super.fullWidth,
  }) : super(kind: _SectionKind.card);
}

class ForgeCardHeader extends _SectionPart {
  const ForgeCardHeader({super.key, super.child, super.semanticLabel})
      : super(kind: _SectionKind.card, part: _Part.header);
}

class ForgeCardBody extends _SectionPart {
  const ForgeCardBody({super.key, super.child, super.semanticLabel})
      : super(kind: _SectionKind.card, part: _Part.body);
}

class ForgeCardFooter extends _SectionPart {
  const ForgeCardFooter({super.key, super.child, super.semanticLabel})
      : super(kind: _SectionKind.card, part: _Part.footer);
}

class ForgeAlert extends _Section {
  const ForgeAlert({
    super.key,
    required super.children,
    super.semanticLabel,
    ForgeAnnouncementPoliteness announcement =
        ForgeAnnouncementPoliteness.polite,
  }) : super(kind: _SectionKind.alert, announcement: announcement);
}

class ForgeAlertHeader extends _SectionPart {
  const ForgeAlertHeader({super.key, super.child, super.semanticLabel})
      : super(kind: _SectionKind.alert, part: _Part.header);
}

class ForgeAlertBody extends _SectionPart {
  const ForgeAlertBody({super.key, super.child, super.semanticLabel})
      : super(kind: _SectionKind.alert, part: _Part.body);
}

class ForgeAlertFooter extends _SectionPart {
  const ForgeAlertFooter({super.key, super.child, super.semanticLabel})
      : super(kind: _SectionKind.alert, part: _Part.footer);
}

class ForgeEmptyState extends _Section {
  const ForgeEmptyState({
    super.key,
    required super.children,
    super.semanticLabel,
  }) : super(kind: _SectionKind.emptyState);
}

class ForgeEmptyStateHeader extends _SectionPart {
  const ForgeEmptyStateHeader({super.key, super.child, super.semanticLabel})
      : super(kind: _SectionKind.emptyState, part: _Part.header);
}

class ForgeEmptyStateBody extends _SectionPart {
  const ForgeEmptyStateBody({super.key, super.child, super.semanticLabel})
      : super(kind: _SectionKind.emptyState, part: _Part.body);
}

class ForgeEmptyStateFooter extends _SectionPart {
  const ForgeEmptyStateFooter({super.key, super.child, super.semanticLabel})
      : super(kind: _SectionKind.emptyState, part: _Part.footer);
}

class ForgeErrorState extends _Section {
  const ForgeErrorState({
    super.key,
    required super.children,
    super.semanticLabel,
    ForgeAnnouncementPoliteness announcement =
        ForgeAnnouncementPoliteness.polite,
  }) : super(kind: _SectionKind.errorState, announcement: announcement);
}

class ForgeErrorStateHeader extends _SectionPart {
  const ForgeErrorStateHeader({super.key, super.child, super.semanticLabel})
      : super(kind: _SectionKind.errorState, part: _Part.header);
}

class ForgeErrorStateBody extends _SectionPart {
  const ForgeErrorStateBody({super.key, super.child, super.semanticLabel})
      : super(kind: _SectionKind.errorState, part: _Part.body);
}

class ForgeErrorStateFooter extends _SectionPart {
  const ForgeErrorStateFooter({super.key, super.child, super.semanticLabel})
      : super(kind: _SectionKind.errorState, part: _Part.footer);
}

class ForgeLoadingState extends _Section {
  const ForgeLoadingState({
    super.key,
    required super.children,
    super.semanticLabel,
    required super.label,
  }) : super(kind: _SectionKind.loadingState);
}

class ForgeLoadingStateHeader extends _SectionPart {
  const ForgeLoadingStateHeader({super.key, super.child, super.semanticLabel})
      : super(kind: _SectionKind.loadingState, part: _Part.header);
}

class ForgeLoadingStateBody extends _SectionPart {
  const ForgeLoadingStateBody({super.key, super.child, super.semanticLabel})
      : super(kind: _SectionKind.loadingState, part: _Part.body);
}

class ForgeLoadingStateFooter extends _SectionPart {
  const ForgeLoadingStateFooter({super.key, super.child, super.semanticLabel})
      : super(kind: _SectionKind.loadingState, part: _Part.footer);
}

class ForgeList extends _Section {
  const ForgeList({
    super.key,
    required super.children,
    super.semanticLabel,
    super.label,
  }) : super(kind: _SectionKind.list);
}

class ForgeListHeader extends _SectionPart {
  const ForgeListHeader({super.key, super.child, super.semanticLabel})
      : super(kind: _SectionKind.list, part: _Part.header);
}

class ForgeListFooter extends _SectionPart {
  const ForgeListFooter({super.key, super.child, super.semanticLabel})
      : super(kind: _SectionKind.list, part: _Part.footer);
}

class ForgeListBody extends _SectionPart {
  final List<ForgeListItem> items;
  const ForgeListBody({super.key, required this.items, super.semanticLabel})
      : super(kind: _SectionKind.list, part: _Part.body);
  @override
  Widget build(BuildContext context) {
    final scope = _SectionScope.of(context, _SectionKind.list),
        p = ForgeThemeTokens.of(context).palette;
    return Semantics(
        container: true,
        label: semanticLabel ?? scope.label,
        child: Padding(
            padding: EdgeInsetsDirectional.only(start: p.space3),
            child: ForgeStack(gap: ForgeSpace.s2, children: items)));
  }
}

class ForgeListItem extends StatelessWidget {
  final Widget child;
  final String? semanticLabel;
  const ForgeListItem({super.key, required this.child, this.semanticLabel});
  @override
  Widget build(BuildContext context) {
    _SectionScope.of(context, _SectionKind.list);
    return Semantics(
        container: true,
        label: semanticLabel,
        child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
          const ExcludeSemantics(child: Text('• ')),
          Expanded(child: child)
        ]));
  }
}
