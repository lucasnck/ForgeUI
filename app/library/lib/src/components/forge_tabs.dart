import 'package:flutter/widgets.dart';
import '../theme/forge_theme_tokens.dart';
import '../types/primitives.dart';
import '../types/component_capabilities.dart';
import '../controllers/roving_focus_controller.dart';
import 'forge_button.dart';
import 'forge_layout.dart';

class ForgeTabs extends StatefulWidget {
  final List<Widget> children;
  final String label;
  final String? value, defaultValue;
  final ValueChanged<String>? onValueChange;
  final ForgeNavigationDirection direction;
  final bool animated;
  const ForgeTabs(
      {super.key,
      required this.children,
      required this.label,
      this.value,
      this.defaultValue,
      this.onValueChange,
      this.direction = ForgeNavigationDirection.ltr,
      this.animated = true});
  @override
  State<ForgeTabs> createState() => _TabsState();
}

class _TabsState extends State<ForgeTabs> {
  final focus = ForgeRovingFocusController();
  final Map<String, FocusScopeNode> panels = {};
  String? local, previous;
  late ForgeTabsHeader header;
  late ForgeTabsBody body;
  ForgeTabsFooter? footer;
  String? get selected {
    final v = widget.value ?? local;
    return header.tabs.any((t) => t.value == v && !t.disabled)
        ? v
        : header.tabs.where((t) => !t.disabled).firstOrNull?.value;
  }

  void collect() {
    if (widget.label.trim().isEmpty)
      throw ArgumentError('Tabs requires a nonempty label.');
    final heads = widget.children.whereType<ForgeTabsHeader>().toList(),
        bodies = widget.children.whereType<ForgeTabsBody>().toList(),
        feet = widget.children.whereType<ForgeTabsFooter>().toList();
    if (heads.length != 1 ||
        bodies.length != 1 ||
        feet.length > 1 ||
        widget.children.length != 2 + feet.length)
      throw ArgumentError(
          'Tabs requires exactly one Header, one Body, and at most one Footer.');
    header = heads.single;
    body = bodies.single;
    footer = feet.firstOrNull;
    final ids = header.tabs.map((t) => t.value).toList(),
        panelIds = body.panels.map((p) => p.value).toList();
    if (ids.any((v) => v.trim().isEmpty) ||
        ids.toSet().length != ids.length ||
        panelIds.toSet().length != panelIds.length ||
        ids.length != panelIds.length ||
        ids.any((v) => !panelIds.contains(v)))
      throw ArgumentError(
          'Every unique Tab requires exactly one matching TabPanel.');
    focus.update([
      for (final t in header.tabs) ForgeFocusItem(t.value, disabled: t.disabled)
    ], initialId: widget.value ?? local);
    for (final p in body.panels)
      panels.putIfAbsent(p.value, () => FocusScopeNode(debugLabel: p.value));
    for (final id
        in panels.keys.where((id) => !panelIds.contains(id)).toList()) {
      final removed = panels.remove(id)!;
      WidgetsBinding.instance.addPostFrameCallback((_) {
        removed.dispose();
      });
    }
  }

  @override
  void initState() {
    super.initState();
    local = widget.defaultValue;
    collect();
    previous = selected;
  }

  void repair(String? old, String? next) {
    if (old != next && panels[old]?.hasFocus == true) {
      if (next != null) {
        focus.focus(next);
        WidgetsBinding.instance.addPostFrameCallback((_) {
          if (mounted && selected == next) focus.focus(next);
        });
      } else
        FocusManager.instance.primaryFocus?.unfocus();
    }
  }

  @override
  void didUpdateWidget(covariant ForgeTabs old) {
    super.didUpdateWidget(old);
    final before = previous;
    collect();
    repair(before, selected);
    previous = selected;
  }

  void select(String value) {
    if (value == selected ||
        !header.tabs.any((t) => t.value == value && !t.disabled)) return;
    if (widget.value == null) {
      repair(selected, value);
      setState(() => local = value);
      previous = selected;
    }
    widget.onValueChange?.call(value);
  }

  @override
  void dispose() {
    focus.dispose();
    for (final p in panels.values) p.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => _TabsScope(
      state: this,
      child: Directionality(
          textDirection: widget.direction == ForgeNavigationDirection.rtl
              ? TextDirection.rtl
              : TextDirection.ltr,
          child: ForgeStack(
              gap: ForgeSpace.s2,
              children: [header, body, if (footer != null) footer!])));
}

class _TabsScope extends InheritedWidget {
  final _TabsState state;
  const _TabsScope({required this.state, required super.child});
  static _TabsState of(BuildContext c) {
    final s = c.dependOnInheritedWidgetOfExactType<_TabsScope>();
    if (s == null) throw StateError('Tabs part requires Tabs.');
    return s.state;
  }

  @override
  bool updateShouldNotify(_TabsScope old) => true;
}

class ForgeTabsHeader extends StatelessWidget {
  final List<ForgeTab> tabs;
  const ForgeTabsHeader({super.key, required this.tabs});
  @override
  Widget build(BuildContext context) {
    final s = _TabsScope.of(context);
    return Semantics(
        container: true,
        label: s.widget.label,
        child: Focus(
            onKeyEvent: (_, e) => s.focus
                .handle(e, direction: s.widget.direction, typeahead: false),
            child: ForgeInline(gap: ForgeSpace.s2, children: tabs)));
  }
}

class ForgeTabsBody extends StatelessWidget {
  final List<ForgeTabPanel> panels;
  const ForgeTabsBody({super.key, required this.panels});
  @override
  Widget build(BuildContext context) {
    _TabsScope.of(context);
    return Column(mainAxisSize: MainAxisSize.min, children: panels);
  }
}

class ForgeTabsFooter extends StatelessWidget {
  final Widget child;
  const ForgeTabsFooter({super.key, required this.child});
  @override
  Widget build(BuildContext context) {
    _TabsScope.of(context);
    return child;
  }
}

class ForgeTab extends StatelessWidget {
  final String value;
  final Widget child;
  final bool disabled, attached;
  final VoidCallback? onPressed;
  final ForgeSize size;
  final ForgeTone tone;
  final ForgeAppearance appearance;
  final ForgeShape shape;
  const ForgeTab(
      {super.key,
      required this.value,
      required this.child,
      this.disabled = false,
      this.attached = false,
      this.onPressed,
      this.size = ForgeSize.md,
      this.tone = ForgeTone.brand,
      this.appearance = ForgeAppearance.ghost,
      this.shape = ForgeShape.rounded});
  @override
  Widget build(BuildContext context) {
    final s = _TabsScope.of(context), selected = s.selected == value;
    return Semantics(
        selected: selected,
        child: ForgeButton(
            focusNode: s.focus.node(value),
            disabled: disabled,
            size: size,
            tone: tone,
            appearance: appearance,
            shape: shape,
            onFocusChange: (v) {
              if (v) s.focus.focused(value);
            },
            onPressed: () {
              onPressed?.call();
              s.select(value);
            },
            child: DecoratedBox(
                decoration: BoxDecoration(
                    border: Border(
                        bottom: BorderSide(
                            color: selected
                                ? ForgeThemeTokens.of(context)
                                    .palette
                                    .colorActionBrandBackground
                                : const Color(0x00000000),
                            width: attached ? 3 : 2))),
                child: child)));
  }
}

class ForgeTabPanel extends StatelessWidget {
  final String value;
  final Widget child;
  const ForgeTabPanel({super.key, required this.value, required this.child});
  @override
  Widget build(BuildContext context) {
    final s = _TabsScope.of(context), active = s.selected == value;
    return Offstage(
        offstage: !active,
        child: TickerMode(
            enabled: active,
            child: FocusScope(
                node: s.panels[value],
                skipTraversal: true,
                child: ExcludeFocus(
                    excluding: !active,
                    child: Semantics(container: true, child: child)))));
  }
}
