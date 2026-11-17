import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../theme/forge_theme_tokens.dart';
import '../types/component_capabilities.dart';
import '../types/primitives.dart';
import 'forge_button.dart';
import 'forge_icon_button.dart';
import 'forge_layout.dart';
import 'forge_divider.dart';
import 'internal/anchored_overlay.dart';

class ForgePopoverTrigger {
  final FocusNode focusNode;
  final bool expanded;
  final VoidCallback onPressed;
  const ForgePopoverTrigger(
      {required this.focusNode,
      required this.expanded,
      required this.onPressed});
}

typedef ForgePopoverTriggerBuilder = Widget Function(
    BuildContext context, ForgePopoverTrigger trigger);

class ForgePopover extends StatefulWidget {
  final List<Widget> children;
  final String triggerLabel, label;
  final ForgePopoverTriggerBuilder? triggerBuilder;
  final bool? open;
  final bool defaultOpen, animated;
  final ValueChanged<bool>? onOpenChange;
  final ForgeAnimationEffect animationEffect;
  const ForgePopover(
      {super.key,
      required this.children,
      required this.triggerLabel,
      required this.label,
      this.triggerBuilder,
      this.open,
      this.defaultOpen = false,
      this.animated = true,
      this.onOpenChange,
      this.animationEffect = ForgeAnimationEffect.fade});
  @override
  State<ForgePopover> createState() => _PopoverState();
}

class _PopoverState extends State<ForgePopover> {
  late bool local;
  final trigger = FocusNode();
  final panel = FocusScopeNode();
  bool prior = false, restore = true;
  bool get opened => widget.open ?? local;
  @override
  void initState() {
    super.initState();
    local = widget.defaultOpen;
    prior = opened;
    if (opened) focusPanel();
  }

  void focusPanel([int attempt = 0]) {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted && opened) {
        if (panel.context == null) {
          if (attempt < 2) focusPanel(attempt + 1);
          return;
        }
        if (!panel.nextFocus()) panel.requestFocus();
      }
    });
  }

  void request(bool value, {bool restoreFocus = true}) {
    if (value == opened) return;
    restore = restoreFocus;
    if (widget.open == null) setState(() => local = value);
    widget.onOpenChange?.call(value);
    if (widget.open == null) sync();
  }

  void sync() {
    if (opened == prior) return;
    prior = opened;
    if (opened) {
      focusPanel();
    } else if (restore) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted && !opened && trigger.canRequestFocus)
          trigger.requestFocus();
      });
    }
  }

  @override
  void didUpdateWidget(covariant ForgePopover old) {
    super.didUpdateWidget(old);
    sync();
  }

  @override
  void dispose() {
    trigger.dispose();
    panel.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (widget.triggerLabel.trim().isEmpty || widget.label.trim().isEmpty)
      throw ArgumentError('Popover requires trigger and panel labels.');
    final parts = <_PopoverPartKind, Widget>{};
    for (final child in widget.children) {
      if (child is! _PopoverPart)
        throw ArgumentError('Popover accepts canonical parts only.');
      if (parts.containsKey(child.kind))
        throw ArgumentError('Duplicate Popover part.');
      parts[child.kind] = child;
    }
    if (!parts.containsKey(_PopoverPartKind.body))
      throw ArgumentError('Popover requires Body.');
    final binding = ForgePopoverTrigger(
        focusNode: trigger,
        expanded: opened,
        onPressed: () => request(!opened));
    final button = widget.triggerBuilder?.call(context, binding) ??
        ForgeButton(
            focusNode: trigger,
            onPressed: binding.onPressed,
            child: Text(widget.triggerLabel));
    if (button is! ForgeButton && button is! ForgeIconButton)
      throw ArgumentError(
          'Popover trigger builder must return ForgeButton or ForgeIconButton.');
    final p = ForgeThemeTokens.of(context).palette;
    return Focus(
        onKeyEvent: (_, e) {
          if (opened &&
              e is KeyDownEvent &&
              e.logicalKey == LogicalKeyboardKey.escape) {
            request(false);
            return KeyEventResult.handled;
          }
          return KeyEventResult.ignored;
        },
        child: ForgeAnchoredOverlay(
            open: opened,
            gap: p.space1,
            maxWidth: p.layoutContainerNarrow,
            anchor: TapRegion(
                groupId: this,
                onTapOutside: (_) {
                  if (opened) request(false, restoreFocus: false);
                },
                child: Semantics(expanded: opened, child: button)),
            child: TapRegion(
                groupId: this,
                child: FocusScope(
                    node: panel,
                    skipTraversal: !opened,
                    onFocusChange: (focused) {
                      if (!focused && opened && !trigger.hasFocus)
                        request(false, restoreFocus: false);
                    },
                    child: _PopoverScope(
                        state: this,
                        child: Semantics(
                            container: true,
                            label: widget.label,
                            child: Material(
                                type: MaterialType.transparency,
                                child: SingleChildScrollView(
                                    child: ForgeSurface(
                                        padding: ForgeSpace.s0,
                                        elevation: ForgeElevation.floating,
                                        child: ForgeStack(
                                            gap: ForgeSpace.s0,
                                            children: [
                                              for (final kind
                                                  in _PopoverPartKind.values)
                                                if (parts[kind] != null)
                                                  parts[kind]!
                                            ]))))))))));
  }
}

class _PopoverScope extends InheritedWidget {
  final _PopoverState state;
  const _PopoverScope({required this.state, required super.child});
  static _PopoverState of(BuildContext context) {
    final s = context.dependOnInheritedWidgetOfExactType<_PopoverScope>();
    if (s == null) throw StateError('Popover part requires Popover.');
    return s.state;
  }

  @override
  bool updateShouldNotify(_PopoverScope old) => true;
}

enum _PopoverPartKind { header, body, footer }

abstract class _PopoverPart extends StatelessWidget {
  final _PopoverPartKind kind;
  final Widget child;
  final bool divider;
  const _PopoverPart(
      {super.key,
      required this.kind,
      required this.child,
      this.divider = false});
  @override
  Widget build(BuildContext context) {
    _PopoverScope.of(context);
    final p = ForgeThemeTokens.of(context).palette;
    return Column(mainAxisSize: MainAxisSize.min, children: [
      if (kind == _PopoverPartKind.footer && divider) const ForgeDivider(),
      Padding(padding: EdgeInsets.all(p.space3), child: child),
      if (kind == _PopoverPartKind.header && divider) const ForgeDivider()
    ]);
  }
}

class ForgePopoverHeader extends _PopoverPart {
  const ForgePopoverHeader(
      {super.key, required super.child, super.divider = true})
      : super(kind: _PopoverPartKind.header);
}

class ForgePopoverBody extends _PopoverPart {
  const ForgePopoverBody({super.key, required super.child})
      : super(kind: _PopoverPartKind.body);
}

class ForgePopoverFooter extends _PopoverPart {
  const ForgePopoverFooter(
      {super.key, required super.child, super.divider = true})
      : super(kind: _PopoverPartKind.footer);
}
