import 'package:flutter/widgets.dart';
import '../theme/forge_theme_tokens.dart';
import '../types/component_capabilities.dart';
import '../types/primitives.dart';
import 'forge_layout.dart';
import 'forge_heading.dart';
import 'forge_page_header.dart';

class ForgeApplicationLayoutHeader extends StatelessWidget {
  final Widget child;
  const ForgeApplicationLayoutHeader({super.key, required this.child});
  @override
  Widget build(BuildContext context) => child;
}

class ForgeApplicationLayoutBody extends StatelessWidget {
  final Widget child;
  final String mainId;
  const ForgeApplicationLayoutBody(
      {super.key, required this.child, this.mainId = 'main-content'});
  @override
  Widget build(BuildContext context) {
    if (mainId.trim().isEmpty)
      throw ArgumentError('Application body requires a stable main identity.');
    return Semantics(
        container: true,
        explicitChildNodes: true,
        identifier: mainId,
        child: child);
  }
}

class ForgeApplicationLayoutFooter extends StatelessWidget {
  final Widget child;
  const ForgeApplicationLayoutFooter({super.key, required this.child});
  @override
  Widget build(BuildContext context) => child;
}

class ForgeApplicationLayoutTemplate extends StatefulWidget {
  final Widget child;
  final Widget? header, navigation, toolbar, footer;
  final String mainId;
  final ScrollController? scrollController;
  const ForgeApplicationLayoutTemplate(
      {super.key,
      required this.child,
      this.header,
      this.navigation,
      this.toolbar,
      this.footer,
      this.mainId = 'main-content',
      this.scrollController});
  @override
  State<ForgeApplicationLayoutTemplate> createState() => _ApplicationState();
}

class _ApplicationState extends State<ForgeApplicationLayoutTemplate> {
  final mainKey = GlobalKey(), navKey = GlobalKey();
  @override
  Widget build(BuildContext context) {
    final p = ForgeThemeTokens.of(context).palette;
    return SafeArea(
        child: Padding(
            padding: EdgeInsets.only(
                bottom: MediaQuery.viewInsetsOf(context).bottom),
            child: LayoutBuilder(builder: (context, c) {
              final content = SingleChildScrollView(
                  controller: widget.scrollController,
                  child: ForgeApplicationLayoutBody(
                      key: mainKey,
                      mainId: widget.mainId,
                      child: widget.child));
              final nav = widget.navigation == null
                  ? null
                  : KeyedSubtree(key: navKey, child: widget.navigation!);
              final wide =
                  c.hasBoundedWidth && c.maxWidth >= p.breakpointMobile;
              final central = wide && nav != null
                  ? Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                          SizedBox(
                              width: p.length32,
                              child: c.hasBoundedHeight
                                  ? SingleChildScrollView(child: nav)
                                  : nav),
                          Expanded(child: content)
                        ])
                  : Column(
                      mainAxisSize: MainAxisSize.min,
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                          if (nav != null) nav,
                          if (c.hasBoundedHeight)
                            Expanded(child: content)
                          else
                            content
                        ]);
              return Column(
                  mainAxisSize:
                      c.hasBoundedHeight ? MainAxisSize.max : MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    if (widget.header != null)
                      ForgeApplicationLayoutHeader(child: widget.header!),
                    if (widget.toolbar != null) widget.toolbar!,
                    if (c.hasBoundedHeight)
                      Expanded(child: central)
                    else
                      central,
                    if (widget.footer != null)
                      ForgeApplicationLayoutFooter(child: widget.footer!)
                  ]);
            })));
  }
}

class ForgeShowcasePageTemplate extends StatefulWidget {
  final Widget child;
  final Widget? title, navigation, toolbar;
  const ForgeShowcasePageTemplate(
      {super.key,
      required this.child,
      this.title,
      this.navigation,
      this.toolbar});
  @override
  State<ForgeShowcasePageTemplate> createState() => _ShowcasePageState();
}

class _ShowcasePageState extends State<ForgeShowcasePageTemplate> {
  final mainKey = GlobalKey(), navKey = GlobalKey();
  @override
  Widget build(BuildContext context) {
    final p = ForgeThemeTokens.of(context).palette;
    return ColoredBox(
        color: p.colorSurfaceDefault,
        child: ForgeStack(gap: ForgeSpace.s0, children: [
          if (widget.title != null || widget.toolbar != null)
            Padding(
                padding: EdgeInsets.all(p.length2),
                child: ForgeInline(
                    gap: ForgeSpace.s3,
                    justify: ForgeJustify.between,
                    children: [
                      if (widget.title != null)
                        ForgeHeading(
                            level: 1,
                            size: ForgeTextSize.xl,
                            child: widget.title),
                      if (widget.toolbar != null) widget.toolbar!
                    ])),
          LayoutBuilder(builder: (context, c) {
            final content =
                ForgeApplicationLayoutBody(key: mainKey, child: widget.child);
            final nav = widget.navigation == null
                ? null
                : KeyedSubtree(key: navKey, child: widget.navigation!);
            if (nav != null && c.maxWidth >= p.breakpointMobile)
              return Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SizedBox(
                        width: p.length28,
                        child: Padding(
                            padding: EdgeInsets.all(p.length2), child: nav)),
                    Expanded(child: content)
                  ]);
            return ForgeStack(
                gap: ForgeSpace.s0, children: [if (nav != null) nav, content]);
          })
        ]));
  }
}

abstract class _PageTemplate extends StatelessWidget {
  final String titleId;
  final Widget pageTitle, child;
  final Widget? description, identity, breadcrumb, actions;
  final bool divider;
  const _PageTemplate(
      {super.key,
      required this.titleId,
      required this.pageTitle,
      required this.child,
      this.description,
      this.identity,
      this.breadcrumb,
      this.actions,
      this.divider = false});
  List<Widget> before() => const [];
  Widget content() => child;
  @override
  Widget build(BuildContext context) =>
      ForgeStack(padding: ForgeSpace.s3, gap: ForgeSpace.s3, children: [
        ForgePageHeader(
            titleId: titleId,
            pageTitle: pageTitle,
            description: description,
            identity: identity,
            breadcrumb: breadcrumb,
            actions: actions,
            divider: divider),
        ...before(),
        KeyedSubtree(key: const ValueKey('page-content'), child: content())
      ]);
}

class ForgeHomePageTemplate extends _PageTemplate {
  final Widget? quickActions, summary;
  const ForgeHomePageTemplate(
      {super.key,
      required super.titleId,
      required super.pageTitle,
      required super.child,
      super.description,
      super.identity,
      super.breadcrumb,
      super.actions,
      super.divider,
      this.quickActions,
      this.summary});
  @override
  List<Widget> before() =>
      [if (quickActions != null) quickActions!, if (summary != null) summary!];
}

class ForgeListPageTemplate extends _PageTemplate {
  final Widget? filters, pagination;
  const ForgeListPageTemplate(
      {super.key,
      required super.titleId,
      required super.pageTitle,
      required super.child,
      super.description,
      super.identity,
      super.breadcrumb,
      super.actions,
      super.divider,
      this.filters,
      this.pagination});
  @override
  Widget content() => _AdaptivePageColumns(
      aside: filters,
      leading: true,
      child: ForgeStack(
          gap: ForgeSpace.s2,
          children: [child, if (pagination != null) pagination!]));
}

class ForgeDetailPageTemplate extends _PageTemplate {
  final Widget? aside;
  const ForgeDetailPageTemplate(
      {super.key,
      required super.titleId,
      required super.pageTitle,
      required super.child,
      super.description,
      super.identity,
      super.breadcrumb,
      super.actions,
      super.divider,
      this.aside});
  @override
  Widget content() => _AdaptivePageColumns(aside: aside, child: child);
}

class ForgeFormPageTemplate extends _PageTemplate {
  final Widget? notice;
  const ForgeFormPageTemplate(
      {super.key,
      required super.titleId,
      required super.pageTitle,
      required super.child,
      super.description,
      super.identity,
      super.breadcrumb,
      super.actions,
      super.divider,
      this.notice});
  @override
  List<Widget> before() => [if (notice != null) notice!];
}

class _AdaptivePageColumns extends StatefulWidget {
  final Widget child;
  final Widget? aside;
  final bool leading;
  const _AdaptivePageColumns(
      {required this.child, this.aside, this.leading = false});
  @override
  State<_AdaptivePageColumns> createState() => _AdaptiveColumnsState();
}

class _AdaptiveColumnsState extends State<_AdaptivePageColumns> {
  final mainKey = GlobalKey(), asideKey = GlobalKey();
  @override
  Widget build(BuildContext context) => LayoutBuilder(builder: (context, c) {
        final p = ForgeThemeTokens.of(context).palette,
            content = KeyedSubtree(key: mainKey, child: widget.child);
        final aside = widget.aside == null
            ? null
            : KeyedSubtree(key: asideKey, child: widget.aside!);
        if (aside == null) return content;
        if (c.maxWidth >= p.breakpointMobile)
          return Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
            if (widget.leading) ...[
              SizedBox(width: p.length32, child: aside),
              SizedBox(width: p.space3)
            ],
            Expanded(child: content),
            if (!widget.leading) ...[
              SizedBox(width: p.space3),
              SizedBox(width: p.length32, child: aside)
            ]
          ]);
        return ForgeStack(gap: ForgeSpace.s3, children: [
          if (widget.leading) aside,
          content,
          if (!widget.leading) aside
        ]);
      });
}
