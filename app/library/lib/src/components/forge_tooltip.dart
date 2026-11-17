import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../theme/forge_theme_tokens.dart';
import '../types/component_capabilities.dart';
import '../types/primitives.dart';
import 'forge_button.dart';
import 'forge_icon_button.dart';
import 'forge_layout.dart';
import 'internal/anchored_overlay.dart';

class ForgeTooltip extends StatefulWidget {
  final String content;
  final Widget child;
  final bool? open;
  final bool defaultOpen, animated;
  final ValueChanged<bool>? onOpenChange;
  const ForgeTooltip(
      {super.key,
      required this.content,
      required this.child,
      this.open,
      this.defaultOpen = false,
      this.animated = true,
      this.onOpenChange});
  @override
  State<ForgeTooltip> createState() => _TooltipState();
}

class _TooltipState extends State<ForgeTooltip> {
  late bool local;
  bool overTrigger = false,
      overSurface = false,
      focused = false,
      dismissed = false,
      pending = false;
  bool? requested;
  bool get opened => widget.open ?? local;
  bool get enabled => switch (widget.child) {
        ForgeButton b => !b.disabled && !b.loading,
        ForgeIconButton b => !b.disabled && !b.loading,
        _ => true
      };
  @override
  void initState() {
    super.initState();
    local = widget.defaultOpen;
  }

  @override
  void didUpdateWidget(covariant ForgeTooltip old) {
    super.didUpdateWidget(old);
    if (old.open != widget.open) requested = null;
  }

  void request(bool value) {
    if (value == opened) {
      requested = null;
      return;
    }
    if (requested == value) return;
    requested = value;
    if (widget.open == null) setState(() => local = value);
    widget.onOpenChange?.call(value);
  }

  void update() {
    if (pending) return;
    pending = true;
    scheduleMicrotask(() {
      pending = false;
      if (!mounted) return;
      if (!overTrigger && !overSurface && !focused) dismissed = false;
      request(enabled && !dismissed && (overTrigger || overSurface || focused));
    });
  }

  void dismiss() {
    dismissed = true;
    request(false);
  }

  @override
  Widget build(BuildContext context) {
    if (widget.content.trim().isEmpty)
      throw ArgumentError('Tooltip requires nonempty supplementary text.');
    final p = ForgeThemeTokens.of(context).palette;
    return Focus(
        canRequestFocus: false,
        onFocusChange: (v) {
          focused = v;
          update();
        },
        onKeyEvent: (_, e) {
          if (opened &&
              e is KeyDownEvent &&
              e.logicalKey == LogicalKeyboardKey.escape) {
            dismiss();
            return KeyEventResult.handled;
          }
          return KeyEventResult.ignored;
        },
        child: ForgeAnchoredOverlay(
            open: opened,
            maxWidth: p.layoutContainerNarrow,
            gap: p.space1,
            anchor: TapRegion(
                groupId: this,
                onTapOutside: (_) {
                  if (opened) dismiss();
                },
                child: MouseRegion(
                    onEnter: (_) {
                      overTrigger = true;
                      update();
                    },
                    onExit: (_) {
                      overTrigger = false;
                      update();
                    },
                    child: GestureDetector(
                        onLongPress: enabled
                            ? () {
                                dismissed = false;
                                request(true);
                              }
                            : null,
                        child: Semantics(
                            tooltip: opened ? widget.content : null,
                            child: widget.child)))),
            child: TapRegion(
                groupId: this,
                child: MouseRegion(
                    onEnter: (_) {
                      overSurface = true;
                      update();
                    },
                    onExit: (_) {
                      overSurface = false;
                      update();
                    },
                    child: ExcludeSemantics(
                        child: Material(
                            type: MaterialType.transparency,
                            child: ForgeSurface(
                                elevation: ForgeElevation.floating,
                                padding: ForgeSpace.s2,
                                child: Text(widget.content))))))));
  }
}
