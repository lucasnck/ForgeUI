import 'package:flutter/widgets.dart';

class ForgeAnchoredOverlay extends StatefulWidget {
  final Widget anchor, child;
  final bool open;
  final double maxWidth, gap;
  const ForgeAnchoredOverlay(
      {super.key,
      required this.anchor,
      required this.child,
      required this.open,
      this.maxWidth = 400,
      this.gap = 4});
  @override
  State<ForgeAnchoredOverlay> createState() => _AnchoredState();
}

class _AnchoredState extends State<ForgeAnchoredOverlay> {
  final controller = OverlayPortalController();
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) controller.show();
    });
  }

  @override
  Widget build(BuildContext context) => OverlayPortal.overlayChildLayoutBuilder(
      controller: controller,
      overlayChildBuilder: (context, info) {
        final bounds = MatrixUtils.transformRect(
            info.childPaintTransform, Offset.zero & info.childSize);
        final media = MediaQuery.maybeOf(context);
        final inset = media?.padding ?? EdgeInsets.zero;
        return Offstage(
            offstage: !widget.open,
            child: ExcludeFocus(
                excluding: !widget.open,
                child: ExcludeSemantics(
                    excluding: !widget.open,
                    child: CustomSingleChildLayout(
                        delegate: _AnchorLayout(bounds, inset, widget.maxWidth,
                            widget.gap, Directionality.of(context)),
                        child: widget.child))));
      },
      child: widget.anchor);
}

class _AnchorLayout extends SingleChildLayoutDelegate {
  final Rect anchor;
  final EdgeInsets inset;
  final double maxWidth, gap;
  final TextDirection direction;
  _AnchorLayout(
      this.anchor, this.inset, this.maxWidth, this.gap, this.direction);
  @override
  BoxConstraints getConstraintsForChild(BoxConstraints c) => BoxConstraints(
      maxWidth: (c.maxWidth - inset.horizontal).clamp(0, maxWidth),
      maxHeight: (c.maxHeight - inset.vertical).clamp(0, c.maxHeight));
  @override
  Offset getPositionForChild(Size size, Size child) {
    final x = (direction == TextDirection.rtl
            ? anchor.right - child.width
            : anchor.left)
        .clamp(
            inset.left,
            (size.width - inset.right - child.width)
                .clamp(inset.left, size.width));
    final below = anchor.bottom + gap;
    final above = anchor.top - gap - child.height;
    final y = (below + child.height <= size.height - inset.bottom
            ? below
            : above >= inset.top
                ? above
                : below)
        .clamp(
            inset.top,
            (size.height - inset.bottom - child.height)
                .clamp(inset.top, size.height));
    return Offset(x, y);
  }

  @override
  bool shouldRelayout(_AnchorLayout old) =>
      anchor != old.anchor ||
      inset != old.inset ||
      maxWidth != old.maxWidth ||
      gap != old.gap ||
      direction != old.direction;
}
