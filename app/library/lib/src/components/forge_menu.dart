import 'dart:ui' show SemanticsRole;
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../controllers/roving_focus_controller.dart';
import '../types/component_capabilities.dart';
import '../types/primitives.dart';
import 'forge_layout.dart';
import 'forge_button.dart';
import 'forge_popover.dart';

class ForgeMenu extends StatefulWidget {
  final String label;
  final List<Widget> children;
  final ValueChanged<String> onAction;
  final VoidCallback? onDismiss;
  final bool animated;
  const ForgeMenu(
      {super.key,
      required this.label,
      required this.children,
      required this.onAction,
      this.onDismiss,
      this.animated = true});
  @override
  State<ForgeMenu> createState() => _MenuState();
}

class _MenuState extends State<ForgeMenu> {
  final focus = ForgeRovingFocusController();
  final fallback = FocusNode();
  late ForgeMenuBody body;
  void update() {
    if (widget.label.trim().isEmpty)
      throw ArgumentError('Menu requires a label.');
    final bodies = widget.children.whereType<ForgeMenuBody>().toList();
    if (bodies.length != 1) throw ArgumentError('Menu requires Body.');
    body = bodies.single;
    focus.update([
      for (final i in body.items)
        ForgeFocusItem(i.value, text: i.label, disabled: i.disabled)
    ]);
  }

  @override
  void initState() {
    super.initState();
    update();
  }

  @override
  void didUpdateWidget(covariant ForgeMenu old) {
    super.didUpdateWidget(old);
    update();
  }

  void dismiss() {
    widget.onDismiss?.call();
    context
        .dependOnInheritedWidgetOfExactType<_DropdownScope>()
        ?.state
        .request(false);
  }

  void activateItem(String value) {
    if (!focus.enabled.any((i) => i.id == value)) return;
    widget.onAction(value);
    dismiss();
  }

  @override
  void dispose() {
    focus.dispose();
    fallback.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final parts = <_MenuPartKind, Widget>{};
    for (final child in widget.children) {
      if (child is! _MenuPart)
        throw ArgumentError('Menu accepts canonical parts only.');
      if (parts.containsKey(child.kind))
        throw ArgumentError('Duplicate Menu part.');
      parts[child.kind] = child;
    }
    return _MenuScope(
        state: this,
        child: Focus(
            onKeyEvent: (_, e) {
              if (e is KeyDownEvent &&
                  e.logicalKey == LogicalKeyboardKey.escape &&
                  (widget.onDismiss != null ||
                      context.dependOnInheritedWidgetOfExactType<
                              _DropdownScope>() !=
                          null)) {
                dismiss();
                return KeyEventResult.handled;
              }
              return focus.handle(e,
                  orientation: ForgeNavigationOrientation.vertical);
            },
            child: ForgeStack(gap: ForgeSpace.s2, children: [
              for (final p in _MenuPartKind.values)
                if (parts[p] != null) parts[p]!
            ])));
  }
}

class _MenuScope extends InheritedWidget {
  final _MenuState state;
  const _MenuScope({required this.state, required super.child});
  static _MenuState of(BuildContext c) {
    final s = c.dependOnInheritedWidgetOfExactType<_MenuScope>();
    if (s == null) throw StateError('Menu part requires Menu.');
    return s.state;
  }

  @override
  bool updateShouldNotify(_MenuScope old) => true;
}

enum _MenuPartKind { header, body, footer }

abstract class _MenuPart extends StatelessWidget {
  final _MenuPartKind kind;
  final Widget? child;
  const _MenuPart({super.key, required this.kind, this.child});
  @override
  Widget build(BuildContext context) {
    _MenuScope.of(context);
    return child ?? const SizedBox.shrink();
  }
}

class ForgeMenuHeader extends _MenuPart {
  const ForgeMenuHeader({super.key, super.child})
      : super(kind: _MenuPartKind.header);
}

class ForgeMenuFooter extends _MenuPart {
  const ForgeMenuFooter({super.key, super.child})
      : super(kind: _MenuPartKind.footer);
}

class ForgeMenuBody extends _MenuPart {
  final List<ForgeMenuItem> items;
  const ForgeMenuBody({super.key, required this.items})
      : super(kind: _MenuPartKind.body);
  @override
  Widget build(BuildContext context) {
    final s = _MenuScope.of(context);
    return Semantics(
        container: true,
        explicitChildNodes: true,
        role: SemanticsRole.menu,
        label: s.widget.label,
        child: Focus(
            focusNode: s.fallback,
            skipTraversal: s.focus.enabled.isNotEmpty,
            child: ForgeStack(gap: ForgeSpace.s0, children: items)));
  }
}

class ForgeMenuItem extends StatelessWidget {
  final String value, label;
  final bool disabled;
  final VoidCallback? onPressed;
  const ForgeMenuItem(
      {super.key,
      required this.value,
      required this.label,
      this.disabled = false,
      this.onPressed});
  @override
  Widget build(BuildContext context) {
    final s = _MenuScope.of(context);
    if (label.trim().isEmpty) throw ArgumentError('MenuItem requires a label.');
    return Semantics(
        role: SemanticsRole.menuItem,
        child: ForgeButton(
            focusNode: s.focus.node(value),
            onFocusChange: (v) {
              if (v) s.focus.focused(value);
            },
            onPressed: () {
              onPressed?.call();
              s.activateItem(value);
            },
            disabled: disabled,
            tone: ForgeTone.neutral,
            appearance: ForgeAppearance.ghost,
            fullWidth: true,
            child: Text(label)));
  }
}

class ForgeDropdownMenu extends StatefulWidget {
  final String label;
  final ForgeMenu child;
  final bool? open;
  final bool defaultOpen, disabled, animated;
  final ValueChanged<bool>? onOpenChange;
  final ForgePopoverTriggerBuilder? triggerBuilder;
  final ForgeAnimationEffect animationEffect;
  const ForgeDropdownMenu(
      {super.key,
      required this.label,
      required this.child,
      this.open,
      this.defaultOpen = false,
      this.disabled = false,
      this.animated = true,
      this.onOpenChange,
      this.triggerBuilder,
      this.animationEffect = ForgeAnimationEffect.fade});
  @override
  State<ForgeDropdownMenu> createState() => _DropdownState();
}

class _DropdownState extends State<ForgeDropdownMenu> {
  late bool local;
  final menuKey = GlobalKey<_MenuState>();
  bool last = false;
  bool get opened => widget.open ?? local;
  @override
  void initState() {
    super.initState();
    local = widget.defaultOpen;
  }

  void request(bool value) {
    if (value && widget.disabled) return;
    if (value == opened) return;
    if (widget.open == null) setState(() => local = value);
    widget.onOpenChange?.call(value);
  }

  void focusEdge([int attempt = 0]) {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted || !opened) return;
      final menu = menuKey.currentState;
      if (menu == null) {
        if (attempt < 2) focusEdge(attempt + 1);
        return;
      }
      final options = menu.focus.enabled;
      if (options.isNotEmpty)
        menu.focus.focus(last ? options.last.id : options.first.id);
    });
  }

  @override
  Widget build(BuildContext context) {
    final menu = widget.child;
    return _DropdownScope(
        state: this,
        child: Focus(
            onKeyEvent: (_, event) {
              if (event is KeyDownEvent &&
                  !widget.disabled &&
                  (event.logicalKey == LogicalKeyboardKey.arrowDown ||
                      event.logicalKey == LogicalKeyboardKey.arrowUp) &&
                  !opened) {
                last = event.logicalKey == LogicalKeyboardKey.arrowUp;
                request(true);
                focusEdge();
                return KeyEventResult.handled;
              }
              return KeyEventResult.ignored;
            },
            child: ForgePopover(
                open: opened,
                onOpenChange: request,
                triggerLabel: widget.label,
                label: widget.label,
                animated: widget.animated,
                animationEffect: widget.animationEffect,
                triggerBuilder: (context, trigger) =>
                    widget.triggerBuilder?.call(context, trigger) ??
                    ForgeButton(
                        focusNode: trigger.focusNode,
                        disabled: widget.disabled,
                        onPressed: trigger.onPressed,
                        child: Text(widget.label)),
                children: [
                  ForgePopoverBody(
                      child: ForgeMenu(
                          key: menuKey,
                          label: menu.label,
                          children: menu.children,
                          onAction: menu.onAction,
                          onDismiss: menu.onDismiss,
                          animated: menu.animated))
                ])));
  }
}

class _DropdownScope extends InheritedWidget {
  final _DropdownState state;
  const _DropdownScope({required this.state, required super.child});
  @override
  bool updateShouldNotify(_DropdownScope old) => true;
}
