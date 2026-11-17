import 'package:flutter/widgets.dart';
import '../types/primitives.dart';
import '../types/component_capabilities.dart';
import '../controllers/roving_focus_controller.dart';
import 'forge_button.dart';
import 'forge_layout.dart';

class ForgeToolbar extends StatefulWidget {
  final String label;
  final List<ForgeToolbarItem> children;
  final ForgeNavigationDirection direction;
  final ForgeNavigationOrientation orientation;
  const ForgeToolbar(
      {super.key,
      required this.label,
      required this.children,
      this.direction = ForgeNavigationDirection.ltr,
      this.orientation = ForgeNavigationOrientation.horizontal});
  @override
  State<ForgeToolbar> createState() => _ToolbarState();
}

class _ToolbarState extends State<ForgeToolbar> {
  final focus = ForgeRovingFocusController();
  void update() {
    if (widget.label.trim().isEmpty || widget.children.length < 3)
      throw ArgumentError(
          'Toolbar requires a label and at least three controls.');
    focus.update([
      for (final item in widget.children)
        ForgeFocusItem(item.itemKey, disabled: item.disabled)
    ]);
  }

  @override
  void initState() {
    super.initState();
    update();
  }

  @override
  void didUpdateWidget(covariant ForgeToolbar old) {
    super.didUpdateWidget(old);
    update();
  }

  @override
  void dispose() {
    focus.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => _ToolbarScope(
      state: this,
      child: Directionality(
          textDirection: widget.direction == ForgeNavigationDirection.rtl
              ? TextDirection.rtl
              : TextDirection.ltr,
          child: Semantics(
              container: true,
              label: widget.label,
              child: Focus(
                  onKeyEvent: (_, e) => focus.handle(e,
                      direction: widget.direction,
                      orientation: widget.orientation,
                      typeahead: false),
                  child: widget.orientation ==
                          ForgeNavigationOrientation.horizontal
                      ? ForgeInline(
                          gap: ForgeSpace.s2, children: widget.children)
                      : ForgeStack(
                          gap: ForgeSpace.s2, children: widget.children)))));
}

class _ToolbarScope extends InheritedWidget {
  final _ToolbarState state;
  const _ToolbarScope({required this.state, required super.child});
  @override
  bool updateShouldNotify(_ToolbarScope old) => true;
}

class ForgeToolbarItem extends StatelessWidget {
  final String itemKey;
  final Widget child;
  final bool disabled;
  final VoidCallback? onPressed;
  final ForgeSize size;
  final ForgeTone tone;
  final ForgeAppearance appearance;
  const ForgeToolbarItem(
      {super.key,
      required this.itemKey,
      required this.child,
      this.disabled = false,
      this.onPressed,
      this.size = ForgeSize.md,
      this.tone = ForgeTone.brand,
      this.appearance = ForgeAppearance.ghost});
  @override
  Widget build(BuildContext context) {
    final s =
        context.dependOnInheritedWidgetOfExactType<_ToolbarScope>()?.state;
    if (s == null) throw StateError('ToolbarItem requires Toolbar.');
    return ForgeButton(
        focusNode: s.focus.node(itemKey),
        onFocusChange: (v) {
          if (v) s.focus.focused(itemKey);
        },
        onPressed: onPressed,
        disabled: disabled,
        size: size,
        tone: tone,
        appearance: appearance,
        child: child);
  }
}
