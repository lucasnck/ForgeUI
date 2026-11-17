import 'package:flutter/widgets.dart';

/// Scoped portal. Children retain inherited theme and ownership and are removed with the owner.
class ForgeOverlayPortal extends StatefulWidget {
  final List<Widget> children;
  final Widget anchor;
  const ForgeOverlayPortal(
      {super.key,
      required this.children,
      this.anchor = const SizedBox.shrink()});
  @override
  State<ForgeOverlayPortal> createState() => _PortalState();
}

class _PortalState extends State<ForgeOverlayPortal> {
  final controller = OverlayPortalController();
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) controller.show();
    });
  }

  @override
  Widget build(BuildContext context) => OverlayPortal(
      controller: controller,
      overlayChildBuilder: (context) => Stack(children: widget.children),
      child: widget.anchor);
}
