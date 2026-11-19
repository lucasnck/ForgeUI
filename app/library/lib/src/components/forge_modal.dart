import 'package:flutter/scheduler.dart' show SchedulerPhase;
import 'internal/forge_presence.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter/services.dart';
import 'package:flutter/gestures.dart';
import '../theme/forge_theme_tokens.dart';
import '../types/component_capabilities.dart';
import '../types/primitives.dart';
import 'forge_layout.dart';
import 'forge_heading.dart';
import 'forge_button.dart';
import 'forge_divider.dart';

enum ForgeModalDismissReason { escape, systemBack, outside, action }

class ForgeModalDismissContext {
  final ForgeModalDismissReason reason;
  bool _cancelled = false;
  ForgeModalDismissContext(this.reason);
  bool get cancelled => _cancelled;
  void cancel() {
    _cancelled = true;
  }
}

typedef ForgeModalDismissInterceptor = void Function(
    ForgeModalDismissContext event);

class _ModalStack extends ChangeNotifier {
  final List<_ModalState> entries = [];
  bool isTop(_ModalState s) => entries.lastOrNull == s;
  void open(_ModalState s) {
    entries.remove(s);
    entries.add(s);
    notifyListeners();
  }

  void close(_ModalState s) {
    if (entries.remove(s)) notifyListeners();
  }
}

final _modalStacks = Expando<_ModalStack>('Forge overlay modal stack');

class ForgeModal extends StatefulWidget {
  final List<Widget> children;
  final bool? open;
  final bool defaultOpen, closeOnOutsideClick, animated;
  final ValueChanged<bool>? onOpenChange;
  final FocusNode? initialFocusNode, returnFocusNode;
  final ForgeAnimationEffect animationEffect;
  final String? semanticLabel, description;
  final bool alert;
  final ForgeModalDismissInterceptor? onCancel;
  final VoidCallback? onClose;
  const ForgeModal(
      {super.key,
      required this.children,
      this.open,
      this.defaultOpen = false,
      this.closeOnOutsideClick = false,
      this.animated = true,
      this.onOpenChange,
      this.initialFocusNode,
      this.returnFocusNode,
      this.animationEffect = ForgeAnimationEffect.fade,
      this.semanticLabel,
      this.description,
      this.alert = false,
      this.onCancel,
      this.onClose});
  @override
  State<ForgeModal> createState() => _ModalState();
}

class _ModalState extends State<ForgeModal> {
  final portal = OverlayPortalController();
  final scope = FocusScopeNode(
      debugLabel: 'ForgeModal',
      traversalEdgeBehavior: TraversalEdgeBehavior.closedLoop);
  final surfaceKey = GlobalKey();
  late bool local;
  bool previous = false;
  FocusNode? priorFocus;
  _ModalStack? layers;
  int? outsidePointer;
  int revision = 0;
  bool needsInitialFocus = false;
  bool get opened => widget.open ?? local;
  @override
  void initState() {
    super.initState();
    local = widget.defaultOpen;
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final overlay = Overlay.of(context);
    final next = _modalStacks[overlay] ??= _ModalStack();
    if (layers != next) {
      layers?.removeListener(changed);
      layers?.close(this);
      layers = next;
      layers!.addListener(changed);
    }
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      if (!portal.isShowing) portal.show();
      sync();
    });
  }

  void changed() {
    if (mounted)
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted) setState(() {});
      });
  }

  @override
  void didUpdateWidget(covariant ForgeModal old) {
    super.didUpdateWidget(old);
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) sync();
    });
  }

  void sync() {
    if (previous == opened) return;
    previous = opened;
    final current = ++revision;
    if (opened) {
      needsInitialFocus = true;
      priorFocus = FocusManager.instance.primaryFocus;
      layers!.open(this);
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (!mounted || current != revision || !opened || !layers!.isTop(this))
          return;
        final initial = widget.initialFocusNode;
        if (initial != null) {
          initial.requestFocus();
        } else if (!scope.nextFocus()) {
          scope.requestFocus();
        }
      });
    } else {
      layers!.close(this);
      outsidePointer = null;
      final restore = widget.returnFocusNode ?? priorFocus;
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted &&
            current == revision &&
            !opened &&
            restore?.context != null &&
            restore!.canRequestFocus) restore.requestFocus();
      });
      final onClose = widget.onClose;
      if (onClose != null) {
        if (WidgetsBinding.instance.schedulerPhase ==
            SchedulerPhase.persistentCallbacks) {
          WidgetsBinding.instance.addPostFrameCallback((_) {
            if (mounted) onClose();
          });
        } else {
          onClose();
        }
      }
    }
  }

  void requestClose(ForgeModalDismissReason reason) {
    if (!opened || layers?.isTop(this) != true) return;
    final event = ForgeModalDismissContext(reason);
    widget.onCancel?.call(event);
    if (event.cancelled) return;
    if (widget.open == null) {
      setState(() => local = false);
      sync();
    }
    widget.onOpenChange?.call(false);
  }

  bool outside(Offset global) {
    final box = surfaceKey.currentContext?.findRenderObject() as RenderBox?;
    if (box == null || !box.hasSize) return false;
    return !(Offset.zero & box.size).contains(box.globalToLocal(global));
  }

  Widget surface(BuildContext context) {
    final parts = <_ModalPartKind, _ModalPart>{};
    for (final child in widget.children) {
      if (child is! _ModalPart)
        throw ArgumentError(
            'Modal accepts its canonical Header, Body and Footer only.');
      if (parts.containsKey(child.kind))
        throw ArgumentError('Duplicate Modal part.');
      parts[child.kind] = child;
    }
    if (!parts.containsKey(_ModalPartKind.body) ||
        ((widget.semanticLabel?.trim().isEmpty ?? true) &&
            !parts.containsKey(_ModalPartKind.header)))
      throw ArgumentError(
          'Modal requires Body and a nonempty accessible name.');
    if (widget.alert &&
        ((widget.description?.trim().isEmpty ?? true) ||
            widget.initialFocusNode == null))
      throw ArgumentError(
          'AlertDialog requires a description and explicit initial action focus.');
    final t = ForgeThemeTokens.of(context), p = t.palette;
    final title = parts[_ModalPartKind.header] is ForgeModalHeader
        ? (parts[_ModalPartKind.header] as ForgeModalHeader).title
        : null;
    final top = layers?.isTop(this) ?? false;
    if (opened && top && needsInitialFocus) {
      needsInitialFocus = false;
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (!mounted || !opened || layers?.isTop(this) != true) return;
        final target = widget.initialFocusNode;
        if (target != null) {
          target.requestFocus();
        } else if (!scope.nextFocus()) {
          scope.requestFocus();
        }
      });
    }

    return ForgePresence(
        visible: opened,
        animated: widget.animated,
        effect: ForgeAnimationEffect.fade,
        child: TickerMode(
            enabled: true,
            child: ExcludeFocus(
                excluding: !opened || !top,
                child: ExcludeSemantics(
                    excluding: !opened || !top,
                    child: BlockSemantics(
                        blocking: opened && top,
                        child: PopScope(
                            canPop: !opened,
                            onPopInvokedWithResult: (didPop, result) {
                              if (!didPop && top)
                                requestClose(
                                    ForgeModalDismissReason.systemBack);
                            },
                            child: Focus(
                                onKeyEvent: (_, event) {
                                  if (event is KeyDownEvent &&
                                      event.logicalKey ==
                                          LogicalKeyboardKey.escape &&
                                      top) {
                                    requestClose(
                                        ForgeModalDismissReason.escape);
                                    return KeyEventResult.handled;
                                  }
                                  return KeyEventResult.ignored;
                                },
                                child: Stack(fit: StackFit.expand, children: [
                                  Listener(
                                      behavior: HitTestBehavior.opaque,
                                      onPointerDown: (e) {
                                        if (e.buttons == kPrimaryButton &&
                                            widget.closeOnOutsideClick &&
                                            top &&
                                            outside(e.position))
                                          outsidePointer = e.pointer;
                                      },
                                      onPointerCancel: (e) {
                                        if (outsidePointer == e.pointer)
                                          outsidePointer = null;
                                      },
                                      onPointerUp: (e) {
                                        final match =
                                            outsidePointer == e.pointer;
                                        outsidePointer = null;
                                        if (match &&
                                            widget.closeOnOutsideClick &&
                                            outside(e.position))
                                          requestClose(
                                              ForgeModalDismissReason.outside);
                                      },
                                      child: ColoredBox(
                                          color: p.colorSurfaceInverse
                                              .withValues(
                                                  alpha: p.opacityPulse))),
                                  SafeArea(
                                      child: Padding(
                                          padding: EdgeInsets.fromLTRB(
                                              p.space2,
                                              p.space2,
                                              p.space2,
                                              p.space2 +
                                                  MediaQuery.viewInsetsOf(
                                                          context)
                                                      .bottom),
                                          child: Center(
                                              child: ConstrainedBox(
                                                  constraints: BoxConstraints(
                                                      maxWidth: p
                                                          .layoutContainerNarrow),
                                                  child: FocusScope(
                                                      node: scope,
                                                      skipTraversal: !opened,
                                                      child: Semantics(
                                                          container: true,
                                                          explicitChildNodes:
                                                              true,
                                                          scopesRoute: true,
                                                          namesRoute: true,
                                                          label: widget
                                                                  .semanticLabel ??
                                                              title,
                                                          child: Builder(
                                                              builder: (_) => ForgePresence(
                                                                  visible: opened,
                                                                  animated: widget.animated,
                                                                  effect: widget.animationEffect,
                                                                  child: SingleChildScrollView(
                                                                      child: ForgeSurface(
                                                                          key: surfaceKey,
                                                                          elevation: ForgeElevation.floating,
                                                                          padding: ForgeSpace.s0,
                                                                          gap: ForgeSpace.s0,
                                                                          child: _ModalScope(
                                                                              state: this,
                                                                              child: ForgeStack(gap: ForgeSpace.s0, children: [
                                                                                if (parts[_ModalPartKind.header] != null) parts[_ModalPartKind.header]!,
                                                                                if (widget.description != null) Padding(padding: EdgeInsets.all(p.space3), child: Text(widget.description!)),
                                                                                parts[_ModalPartKind.body]!,
                                                                                if (parts[_ModalPartKind.footer] != null) parts[_ModalPartKind.footer]!
                                                                              ]))))))))))))
                                ]))))))));
  }

  @override
  Widget build(BuildContext context) => OverlayPortal(
      controller: portal,
      overlayChildBuilder: surface,
      child: const SizedBox.shrink());
  @override
  void dispose() {
    revision++;
    layers?.removeListener(changed);
    layers?.close(this);
    if (opened) {
      final restore = widget.returnFocusNode ?? priorFocus;
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (restore?.context != null && restore!.canRequestFocus)
          restore.requestFocus();
      });
    }
    scope.dispose();
    super.dispose();
  }
}

class _ModalScope extends InheritedWidget {
  final _ModalState state;
  const _ModalScope({required this.state, required super.child});
  static _ModalState of(BuildContext c) {
    final s = c.dependOnInheritedWidgetOfExactType<_ModalScope>();
    if (s == null) throw StateError('Modal part requires Modal.');
    return s.state;
  }

  @override
  bool updateShouldNotify(_ModalScope old) => true;
}

enum _ModalPartKind { header, body, footer }

abstract class _ModalPart extends StatelessWidget {
  final _ModalPartKind kind;
  const _ModalPart({super.key, required this.kind});
}

class ForgeModalHeader extends _ModalPart {
  final String title;
  final Widget? icon, child;
  final bool divider;
  const ForgeModalHeader(
      {super.key,
      required this.title,
      this.icon,
      this.child,
      this.divider = true})
      : super(kind: _ModalPartKind.header);
  @override
  Widget build(BuildContext context) {
    _ModalScope.of(context);
    if (title.trim().isEmpty)
      throw ArgumentError('ModalHeader requires a title.');
    final p = ForgeThemeTokens.of(context).palette;
    return Column(mainAxisSize: MainAxisSize.min, children: [
      Padding(
          padding: EdgeInsets.all(p.space3),
          child: ForgeInline(gap: ForgeSpace.s2, children: [
            if (icon != null) icon!,
            ForgeHeading(text: title, level: 2),
            if (child != null) child!
          ])),
      if (divider) const ForgeDivider()
    ]);
  }
}

class ForgeModalBody extends _ModalPart {
  final Widget child;
  const ForgeModalBody({super.key, required this.child})
      : super(kind: _ModalPartKind.body);
  @override
  Widget build(BuildContext context) {
    _ModalScope.of(context);
    return Padding(
        padding: EdgeInsets.all(ForgeThemeTokens.of(context).palette.space3),
        child: child);
  }
}

class ForgeModalFooter extends _ModalPart {
  final List<Widget> children;
  final bool divider;
  const ForgeModalFooter(
      {super.key, required this.children, this.divider = true})
      : super(kind: _ModalPartKind.footer);
  @override
  Widget build(BuildContext context) {
    _ModalScope.of(context);
    final p = ForgeThemeTokens.of(context).palette;
    return Column(mainAxisSize: MainAxisSize.min, children: [
      if (divider) const ForgeDivider(),
      Padding(
          padding: EdgeInsets.all(p.space3),
          child: ForgeInline(gap: ForgeSpace.s2, children: children))
    ]);
  }
}

class ForgeDialog extends ForgeModal {
  const ForgeDialog(
      {super.key,
      required super.children,
      super.open,
      super.defaultOpen,
      super.closeOnOutsideClick,
      super.animated,
      super.onOpenChange,
      super.initialFocusNode,
      super.returnFocusNode,
      super.animationEffect,
      super.semanticLabel,
      super.onCancel,
      super.onClose});
}

typedef ForgeDialogHeader = ForgeModalHeader;
typedef ForgeDialogBody = ForgeModalBody;
typedef ForgeDialogFooter = ForgeModalFooter;
typedef ForgeAlertDialogHeader = ForgeModalHeader;
typedef ForgeAlertDialogBody = ForgeModalBody;
typedef ForgeAlertDialogFooter = ForgeModalFooter;

class ForgeAlertDialog extends ForgeModal {
  const ForgeAlertDialog(
      {super.key,
      required super.children,
      required String description,
      required FocusNode initialFocusNode,
      super.open,
      super.defaultOpen,
      super.animated,
      super.onOpenChange,
      super.returnFocusNode,
      super.animationEffect,
      super.semanticLabel,
      super.onCancel,
      super.onClose})
      : super(
            alert: true,
            description: description,
            initialFocusNode: initialFocusNode);
}

class ForgeDialogClose extends StatelessWidget {
  final Widget child;
  final bool disabled;
  final VoidCallback? onPressed;
  final ForgeModalDismissInterceptor? onActivate;
  final FocusNode? focusNode;
  final String? semanticLabel;
  final ForgeSize size;
  final ForgeTone tone;
  final ForgeAppearance appearance;
  const ForgeDialogClose(
      {super.key,
      required this.child,
      this.disabled = false,
      this.onPressed,
      this.onActivate,
      this.focusNode,
      this.semanticLabel,
      this.size = ForgeSize.md,
      this.tone = ForgeTone.neutral,
      this.appearance = ForgeAppearance.ghost});
  @override
  Widget build(BuildContext context) {
    final s = _ModalScope.of(context);
    return ForgeButton(
        onPressed: () {
          final event =
              ForgeModalDismissContext(ForgeModalDismissReason.action);
          onActivate?.call(event);
          onPressed?.call();
          if (!event.cancelled) s.requestClose(ForgeModalDismissReason.action);
        },
        disabled: disabled,
        focusNode: focusNode,
        semanticLabel: semanticLabel,
        size: size,
        tone: tone,
        appearance: appearance,
        child: child);
  }
}

class ForgeConfirmationModal extends StatefulWidget {
  final String title, closeLabel, cancelLabel, confirmLabel;
  final Widget child;
  final VoidCallback onConfirm;
  final bool? open;
  final bool defaultOpen, loading, animated, closeOnOutsideClick;
  final String? loadingLabel;
  final ValueChanged<bool>? onOpenChange;
  final FocusNode? initialFocusNode, returnFocusNode;
  const ForgeConfirmationModal(
      {super.key,
      required this.title,
      required this.closeLabel,
      required this.cancelLabel,
      required this.confirmLabel,
      required this.child,
      required this.onConfirm,
      this.open,
      this.defaultOpen = false,
      this.loading = false,
      this.animated = true,
      this.closeOnOutsideClick = false,
      this.loadingLabel,
      this.onOpenChange,
      this.initialFocusNode,
      this.returnFocusNode});
  @override
  State<ForgeConfirmationModal> createState() => _ConfirmationState();
}

class _ConfirmationState extends State<ForgeConfirmationModal> {
  final cancel = FocusNode();
  @override
  void dispose() {
    cancel.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if ([
      widget.title,
      widget.closeLabel,
      widget.cancelLabel,
      widget.confirmLabel
    ].any((v) => v.trim().isEmpty))
      throw ArgumentError(
          'ConfirmationModal requires action labels and title.');
    return ForgeModal(
        open: widget.open,
        defaultOpen: widget.defaultOpen,
        onOpenChange: widget.onOpenChange,
        animated: widget.animated,
        closeOnOutsideClick: widget.closeOnOutsideClick,
        initialFocusNode: widget.initialFocusNode ?? cancel,
        returnFocusNode: widget.returnFocusNode,
        children: [
          ForgeModalHeader(
              title: widget.title,
              child: ForgeDialogClose(child: Text(widget.closeLabel))),
          ForgeModalBody(child: widget.child),
          ForgeModalFooter(children: [
            ForgeDialogClose(
                focusNode: cancel, child: Text(widget.cancelLabel)),
            ForgeButton(
                onPressed: widget.onConfirm,
                loading: widget.loading,
                loadingLabel: widget.loadingLabel,
                child: Text(widget.confirmLabel))
          ])
        ]);
  }
}
