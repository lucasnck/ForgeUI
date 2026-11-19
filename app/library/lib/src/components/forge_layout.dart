import 'package:flutter/widgets.dart';
import 'package:flutter/rendering.dart';
import '../theme/forge_theme_tokens.dart';
import '../theme/forge_primitive_style.dart';
import '../types/component_capabilities.dart';
import '../types/primitives.dart';
import '../generated/forge_effects.g.dart';

List<Widget> _children(Widget? child, List<Widget> children) {
  if (child != null && children.isNotEmpty)
    throw ArgumentError('Supply child or children, not both.');
  return child == null ? children : [child];
}

class ForgeInline extends StatelessWidget {
  final List<Widget> children;
  final Widget? child;
  final bool wrap;
  final ForgeSpace? gap, padding;
  final ForgeAlign align;
  final ForgeJustify justify;
  const ForgeInline(
      {super.key,
      this.children = const [],
      this.child,
      this.wrap = true,
      this.gap,
      this.padding,
      this.align = ForgeAlign.center,
      this.justify = ForgeJustify.start});
  @override
  Widget build(BuildContext context) {
    final p = ForgeThemeTokens.of(context).palette;
    return Padding(
        padding: EdgeInsets.all(forgeSpace(p, padding)),
        child: _ForgeFlow(
            gap: forgeSpace(p, gap, fallback: p.space2),
            wrap: wrap,
            align: align,
            justify: justify,
            direction: Directionality.of(context),
            children: _children(child, children)));
  }
}

class ForgeStack extends StatelessWidget {
  final List<Widget> children;
  final Widget? child;
  final ForgeSpace? gap, padding;
  final ForgeAlign align;
  const ForgeStack(
      {super.key,
      this.children = const [],
      this.child,
      this.gap,
      this.padding,
      this.align = ForgeAlign.stretch});
  @override
  Widget build(BuildContext context) {
    final p = ForgeThemeTokens.of(context).palette,
        items = _children(child, children);
    return Padding(
        padding: EdgeInsets.all(forgeSpace(p, padding)),
        child: LayoutBuilder(
            builder: (context, c) => Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment:
                        align == ForgeAlign.stretch && !c.hasBoundedWidth
                            ? CrossAxisAlignment.start
                            : align == ForgeAlign.baseline
                                ? CrossAxisAlignment.start
                                : forgeCross(align),
                    children: [
                      for (var i = 0; i < items.length; i++) ...[
                        if (i > 0)
                          SizedBox(
                              height: forgeSpace(p, gap, fallback: p.space4)),
                        items[i]
                      ]
                    ])));
  }
}

class ForgeContainer extends StatelessWidget {
  final Widget? child;
  final List<Widget> children;
  final ForgeContainerSize size;
  final ForgeSpace? gap, padding;
  const ForgeContainer(
      {super.key,
      this.child,
      this.children = const [],
      this.size = ForgeContainerSize.wide,
      this.gap,
      this.padding});
  @override
  Widget build(BuildContext context) {
    final p = ForgeThemeTokens.of(context).palette;
    return LayoutBuilder(builder: (context, c) {
      final inset = forgeSpace(p, padding,
          fallback: c.maxWidth >= p.breakpointMobile
              ? p.layoutContainerPaddingWide
              : p.layoutContainerPadding);
      return Align(
          alignment: Alignment.topCenter,
          heightFactor: 1,
          child: ConstrainedBox(
              constraints: BoxConstraints(
                  maxWidth: size == ForgeContainerSize.wide
                      ? p.layoutContainerWide
                      : p.layoutContainerNarrow),
              child: SizedBox(
                  width: c.hasBoundedWidth ? double.infinity : null,
                  child: Padding(
                      padding: EdgeInsets.symmetric(horizontal: inset),
                      child:
                          child ?? ForgeStack(gap: gap, children: children)))));
    });
  }
}

class ForgeSurface extends StatelessWidget {
  final Widget? child;
  final List<Widget> children;
  final ForgeElevation elevation;
  final ForgeShape? shape;
  final ForgeSpace? gap, padding;
  final ForgeAlign align;
  const ForgeSurface(
      {super.key,
      this.child,
      this.children = const [],
      this.elevation = ForgeElevation.raised,
      this.shape,
      this.gap,
      this.padding,
      this.align = ForgeAlign.stretch});
  @override
  Widget build(BuildContext context) {
    final t = ForgeThemeTokens.of(context), p = t.palette;
    return DecoratedBox(
        decoration: BoxDecoration(
            color: p.colorSurfaceRaised,
            border: Border.all(
                color: p.colorBorderSubtle, width: p.borderWidthThin),
            borderRadius: forgeRadius(p, shape ?? t.shape),
            boxShadow: elevation == ForgeElevation.flat
                ? const []
                : forgeSurfaceShadows[t.id.name]![elevation.name]),
        child: ForgeStack(
            child: child,
            children: children,
            gap: gap,
            padding: padding,
            align: align));
  }
}

class ForgeSimpleGrid extends StatelessWidget {
  final ForgeResponsive<int> columns;
  final List<Widget> children;
  final ForgeSpace? gap, padding;
  const ForgeSimpleGrid(
      {super.key,
      required this.columns,
      this.children = const [],
      this.gap,
      this.padding});
  @override
  Widget build(BuildContext context) {
    for (final v in [columns.base, columns.mobile, columns.wide])
      if (v != null && (v < 1 || v > 4))
        throw ArgumentError('Grid columns must be 1..4.');
    final p = ForgeThemeTokens.of(context).palette;
    return Padding(
        padding: EdgeInsets.all(forgeSpace(p, padding)),
        child: LayoutBuilder(builder: (context, c) {
          final n =
              columns.resolve(c.maxWidth, p.breakpointMobile, p.breakpointWide);
          final spacing = forgeSpace(p, gap, fallback: p.space4);
          if (!c.hasBoundedWidth)
            throw FlutterError(
                'ForgeSimpleGrid requires a finite available width.');
          final width = ((c.maxWidth - spacing * (n - 1)) / n)
              .clamp(0, double.infinity)
              .toDouble();
          return Wrap(spacing: spacing, runSpacing: spacing, children: [
            for (final child in children) SizedBox(width: width, child: child)
          ]);
        }));
  }
}

class _ForgeFlow extends MultiChildRenderObjectWidget {
  final double gap;
  final bool wrap;
  final ForgeAlign align;
  final ForgeJustify justify;
  final TextDirection direction;
  const _ForgeFlow(
      {required this.gap,
      required this.wrap,
      required this.align,
      required this.justify,
      required this.direction,
      required super.children});
  @override
  _FlowRender createRenderObject(BuildContext context) =>
      _FlowRender(gap, wrap, align, justify, direction);
  @override
  void updateRenderObject(BuildContext context, _FlowRender renderObject) {
    renderObject
      ..gap = gap
      ..wrap = wrap
      ..align = align
      ..justify = justify
      ..direction = direction
      ..markNeedsLayout();
  }
}

class _FlowParentData extends ContainerBoxParentData<RenderBox> {}

class _FlowRender extends RenderBox
    with
        ContainerRenderObjectMixin<RenderBox, _FlowParentData>,
        RenderBoxContainerDefaultsMixin<RenderBox, _FlowParentData> {
  double gap;
  bool wrap;
  ForgeAlign align;
  ForgeJustify justify;
  TextDirection direction;
  _FlowRender(this.gap, this.wrap, this.align, this.justify, this.direction);
  @override
  void setupParentData(RenderBox child) {
    if (child.parentData is! _FlowParentData)
      child.parentData = _FlowParentData();
  }

  @override
  Size computeDryLayout(BoxConstraints c) {
    double x = 0, y = 0, h = 0, w = 0;
    RenderBox? child = firstChild;
    while (child != null) {
      final s = child.getDryLayout(c.loosen());
      if (wrap && x > 0 && x + gap + s.width > c.maxWidth) {
        y += h + gap;
        x = 0;
        h = 0;
      }
      x += (x == 0 ? 0 : gap) + s.width;
      h = h > s.height ? h : s.height;
      w = w > x ? w : x;
      child = (child.parentData! as _FlowParentData).nextSibling;
    }
    return c.constrain(Size(c.hasBoundedWidth ? c.maxWidth : w, y + h));
  }

  @override
  void performLayout() {
    final lines = <List<RenderBox>>[];
    var line = <RenderBox>[];
    double width = 0;
    RenderBox? child = firstChild;
    while (child != null) {
      child.layout(
          BoxConstraints(
              maxWidth: constraints.maxWidth, maxHeight: constraints.maxHeight),
          parentUsesSize: true);
      if (wrap &&
          line.isNotEmpty &&
          width + gap + child.size.width > constraints.maxWidth) {
        lines.add(line);
        line = [];
        width = 0;
      }
      width += (line.isEmpty ? 0 : gap) + child.size.width;
      line.add(child);
      child = (child.parentData! as _FlowParentData).nextSibling;
    }
    if (line.isNotEmpty) lines.add(line);
    final widths = lines
        .map((row) =>
            row.fold<double>(0, (s, c) => s + c.size.width) +
            gap * (row.length - 1))
        .toList();
    final available = constraints.hasBoundedWidth
        ? constraints.maxWidth
        : widths.fold<double>(0, (a, b) => a > b ? a : b);
    double y = 0;
    for (var i = 0; i < lines.length; i++) {
      final row = lines[i];
      double height = 0, ascent = 0, descent = 0;
      for (final c in row) {
        height = height > c.size.height ? height : c.size.height;
        final base =
            c.getDistanceToBaseline(TextBaseline.alphabetic, onlyReal: true) ??
                c.size.height;
        ascent = ascent > base ? ascent : base;
        descent =
            descent > c.size.height - base ? descent : c.size.height - base;
      }
      if (align == ForgeAlign.baseline) height = ascent + descent;
      final spare =
          (available - widths[i]).clamp(0, double.infinity).toDouble();
      double x = justify == ForgeJustify.end
          ? spare
          : justify == ForgeJustify.center
              ? spare / 2
              : 0;
      final actualGap = justify == ForgeJustify.between && row.length > 1
          ? gap + spare / (row.length - 1)
          : gap;
      for (final c in row) {
        if (align == ForgeAlign.stretch)
          c.layout(BoxConstraints.tightFor(width: c.size.width, height: height),
              parentUsesSize: true);
        final dy = switch (align) {
          ForgeAlign.end => height - c.size.height,
          ForgeAlign.center => (height - c.size.height) / 2,
          ForgeAlign.baseline => ascent -
              (c.getDistanceToBaseline(TextBaseline.alphabetic,
                      onlyReal: true) ??
                  c.size.height),
          _ => 0.0
        };
        (c.parentData! as _FlowParentData).offset = Offset(
            direction == TextDirection.rtl ? available - x - c.size.width : x,
            y + dy);
        x += c.size.width + actualGap;
      }
      y += height + (i == lines.length - 1 ? 0 : gap);
    }
    size = constraints.constrain(Size(available, y));
  }

  @override
  void paint(PaintingContext context, Offset offset) =>
      defaultPaint(context, offset);
  @override
  bool hitTestChildren(BoxHitTestResult result, {required Offset position}) =>
      defaultHitTestChildren(result, position: position);
}
