import 'package:flutter/widgets.dart';
import '../theme/forge_theme_tokens.dart';
import '../types/component_capabilities.dart';
import 'forge_button.dart';
import 'forge_layout.dart';

class ForgeCollapse extends StatefulWidget {
  final List<Widget> children;
  final bool? open;
  final bool defaultOpen, disabled, animated;
  final ValueChanged<bool>? onOpenChange;
  const ForgeCollapse(
      {super.key,
      required this.children,
      this.open,
      this.defaultOpen = false,
      this.disabled = false,
      this.animated = true,
      this.onOpenChange});
  @override
  State<ForgeCollapse> createState() => _CollapseState();
}

class _CollapseState extends State<ForgeCollapse> {
  late bool local;
  final trigger = FocusNode(), panel = FocusScopeNode();
  bool get expanded => widget.open ?? local;
  @override
  void initState() {
    super.initState();
    local = widget.defaultOpen;
  }

  void repair(bool before, bool after) {
    if (before && !after && panel.hasFocus) trigger.requestFocus();
  }

  @override
  void didUpdateWidget(covariant ForgeCollapse old) {
    super.didUpdateWidget(old);
    repair(old.open ?? local, expanded);
  }

  void toggle() {
    if (widget.disabled) return;
    final next = !expanded;
    if (widget.open == null) {
      repair(expanded, next);
      setState(() => local = next);
    }
    widget.onOpenChange?.call(next);
  }

  @override
  void dispose() {
    trigger.dispose();
    panel.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final parts = <_CollapsePartKind, Widget>{};
    for (final child in widget.children) {
      if (child is! _CollapsePart)
        throw ArgumentError(
            'Collapse accepts its Header, Body and Footer only.');
      if (parts.containsKey(child.kind))
        throw ArgumentError('Duplicate Collapse part.');
      parts[child.kind] = child;
    }
    if (!parts.containsKey(_CollapsePartKind.header) ||
        !parts.containsKey(_CollapsePartKind.body))
      throw ArgumentError('Collapse requires Header and Body.');
    final p = ForgeThemeTokens.of(context).palette;
    final duration = Duration(
        milliseconds: widget.animated &&
                !(MediaQuery.maybeOf(context)?.disableAnimations ?? false)
            ? p.motionNormal.round()
            : 0);
    return _CollapseScope(
        state: this,
        child: ForgeStack(gap: ForgeSpace.s0, children: [
          parts[_CollapsePartKind.header]!,
          _NativeDisclosureSize(
              duration: duration,
              child: Offstage(
                  offstage: !expanded,
                  child: TickerMode(
                      enabled: expanded,
                      child: ExcludeSemantics(
                          excluding: !expanded,
                          child: FocusScope(
                              node: panel,
                              skipTraversal: true,
                              child: ExcludeFocus(
                                  excluding: !expanded,
                                  child:
                                      ForgeStack(gap: ForgeSpace.s2, children: [
                                    parts[_CollapsePartKind.body]!,
                                    if (parts[_CollapsePartKind.footer] != null)
                                      parts[_CollapsePartKind.footer]!
                                  ])))))))
        ]));
  }
}

class _CollapseScope extends InheritedWidget {
  final _CollapseState state;
  const _CollapseScope({required this.state, required super.child});
  static _CollapseState of(BuildContext c) {
    final s = c.dependOnInheritedWidgetOfExactType<_CollapseScope>();
    if (s == null) throw StateError('Collapse part requires Collapse.');
    return s.state;
  }

  @override
  bool updateShouldNotify(_CollapseScope old) => true;
}

enum _CollapsePartKind { header, body, footer }

abstract class _CollapsePart extends StatelessWidget {
  final _CollapsePartKind kind;
  final Widget child;
  const _CollapsePart({super.key, required this.kind, required this.child});
  @override
  Widget build(BuildContext context) {
    _CollapseScope.of(context);
    return child;
  }
}

class ForgeCollapseHeader extends _CollapsePart {
  final bool disabled;
  final VoidCallback? onPressed;
  const ForgeCollapseHeader(
      {super.key, required super.child, this.disabled = false, this.onPressed})
      : super(kind: _CollapsePartKind.header);
  @override
  Widget build(BuildContext context) {
    final s = _CollapseScope.of(context);
    return Semantics(
        expanded: s.expanded,
        child: ForgeButton(
            onPressed: () {
              onPressed?.call();
              s.toggle();
            },
            disabled: disabled || s.widget.disabled,
            appearance: ForgeAppearance.ghost,
            focusNode: s.trigger,
            child: child));
  }
}

class ForgeCollapseBody extends _CollapsePart {
  const ForgeCollapseBody({super.key, required super.child})
      : super(kind: _CollapsePartKind.body);
}

class ForgeCollapseFooter extends _CollapsePart {
  const ForgeCollapseFooter({super.key, required super.child})
      : super(kind: _CollapsePartKind.footer);
}

class ForgeDisclosure extends StatelessWidget {
  final String label;
  final Widget child;
  final bool? open;
  final bool defaultOpen, disabled, animated;
  final ValueChanged<bool>? onOpenChange;
  const ForgeDisclosure(
      {super.key,
      required this.label,
      required this.child,
      this.open,
      this.defaultOpen = false,
      this.disabled = false,
      this.animated = true,
      this.onOpenChange});
  @override
  Widget build(BuildContext context) {
    if (label.trim().isEmpty)
      throw ArgumentError('Disclosure requires a visible label.');
    return ForgeCollapse(
        open: open,
        defaultOpen: defaultOpen,
        disabled: disabled,
        animated: animated,
        onOpenChange: onOpenChange,
        children: [
          ForgeCollapseHeader(child: Text(label)),
          ForgeCollapseBody(child: child)
        ]);
  }
}

class ForgeAccordion extends StatefulWidget {
  final List<ForgeAccordionItem> children;
  final List<String>? value;
  final List<String> defaultValue;
  final ValueChanged<List<String>>? onValueChange;
  final bool multiple, collapsible, disabled, animated;
  final int level;
  const ForgeAccordion(
      {super.key,
      required this.children,
      this.value,
      this.defaultValue = const [],
      this.onValueChange,
      this.multiple = false,
      this.collapsible = true,
      this.disabled = false,
      this.animated = true,
      this.level = 2});
  @override
  State<ForgeAccordion> createState() => _AccordionState();
}

class _AccordionState extends State<ForgeAccordion> {
  late List<String> local;
  List<String> get current => (widget.value ?? local)
      .where((v) => widget.children.any((i) => i.value == v))
      .take(widget.multiple ? widget.children.length : 1)
      .toList();
  @override
  void initState() {
    super.initState();
    local = List.of(widget.defaultValue);
  }

  void change(String value, bool expanded) {
    if (widget.disabled ||
        widget.children.firstWhere((i) => i.value == value).disabled) return;
    final before = current;
    if (!expanded &&
        !widget.collapsible &&
        before.length == 1 &&
        before.contains(value)) return;
    final next = expanded
        ? (widget.multiple
            ? [...before.where((v) => v != value), value]
            : [value])
        : before.where((v) => v != value).toList();
    if (widget.value == null) setState(() => local = next);
    widget.onValueChange?.call(List.unmodifiable(next));
  }

  @override
  Widget build(BuildContext context) {
    final ids = widget.children.map((i) => i.value).toList();
    if (widget.level < 1 ||
        widget.level > 6 ||
        ids.any((v) => v.trim().isEmpty) ||
        ids.toSet().length != ids.length)
      throw ArgumentError('Invalid Accordion identities or heading level.');
    return _AccordionScope(
        state: this,
        child: ForgeStack(gap: ForgeSpace.s2, children: widget.children));
  }
}

class _AccordionScope extends InheritedWidget {
  final _AccordionState state;
  const _AccordionScope({required this.state, required super.child});
  static _AccordionState of(BuildContext c) {
    final s = c.dependOnInheritedWidgetOfExactType<_AccordionScope>();
    if (s == null) throw StateError('Accordion part requires Accordion.');
    return s.state;
  }

  @override
  bool updateShouldNotify(_AccordionScope old) => true;
}

class ForgeAccordionItem extends StatelessWidget {
  final String value;
  final bool disabled;
  final List<Widget> children;
  const ForgeAccordionItem(
      {super.key,
      required this.value,
      required this.children,
      this.disabled = false});
  @override
  Widget build(BuildContext context) {
    final s = _AccordionScope.of(context),
        parts = <_CollapsePartKind, Widget>{};
    for (final child in children) {
      if (child is! _AccordionPart)
        throw ArgumentError('AccordionItem accepts canonical parts only.');
      if (parts.containsKey(child.kind))
        throw ArgumentError('Duplicate Accordion part.');
      parts[child.kind] = child;
    }
    if (!parts.containsKey(_CollapsePartKind.header) ||
        !parts.containsKey(_CollapsePartKind.body))
      throw ArgumentError('AccordionItem requires Header and Body.');
    final header = parts[_CollapsePartKind.header] as ForgeAccordionHeader;
    return ForgeCollapse(
        open: s.current.contains(value),
        disabled: disabled || s.widget.disabled,
        animated: s.widget.animated,
        onOpenChange: (v) => s.change(value, v),
        children: [
          ForgeCollapseHeader(
              disabled: header.disabled,
              onPressed: header.onPressed,
              child:
                  Semantics(headingLevel: s.widget.level, child: header.child)),
          ForgeCollapseBody(child: parts[_CollapsePartKind.body]!),
          if (parts[_CollapsePartKind.footer] != null)
            ForgeCollapseFooter(child: parts[_CollapsePartKind.footer]!)
        ]);
  }
}

abstract class _AccordionPart extends StatelessWidget {
  final _CollapsePartKind kind;
  final Widget child;
  const _AccordionPart({super.key, required this.kind, required this.child});
  @override
  Widget build(BuildContext context) {
    _AccordionScope.of(context);
    return child;
  }
}

class ForgeAccordionHeader extends _AccordionPart {
  final bool disabled;
  final VoidCallback? onPressed;
  const ForgeAccordionHeader(
      {super.key, required super.child, this.disabled = false, this.onPressed})
      : super(kind: _CollapsePartKind.header);
}

class ForgeAccordionBody extends _AccordionPart {
  const ForgeAccordionBody({super.key, required super.child})
      : super(kind: _CollapsePartKind.body);
}

class ForgeAccordionFooter extends _AccordionPart {
  const ForgeAccordionFooter({super.key, required super.child})
      : super(kind: _CollapsePartKind.footer);
}

class _NativeDisclosureSize extends StatelessWidget {
  final Duration duration;
  final Widget child;
  const _NativeDisclosureSize({required this.duration, required this.child});
  @override
  Widget build(BuildContext context) => duration == Duration.zero
      ? child
      : AnimatedSize(
          duration: duration,
          alignment: AlignmentDirectional.topStart,
          child: child);
}
