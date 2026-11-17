import 'dart:collection';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../controllers/roving_focus_controller.dart';
import '../types/component_capabilities.dart';
import '../types/primitives.dart';
import '../theme/forge_theme_tokens.dart';
import 'forge_button.dart';
import 'forge_layout.dart';

class ForgeTreeNode {
  final String key, label;
  final bool disabled;
  final List<ForgeTreeNode> children;
  ForgeTreeNode(
      {required this.key,
      required this.label,
      this.disabled = false,
      Iterable<ForgeTreeNode> children = const []})
      : children = List.unmodifiable(children);
}

typedef ForgeTreeNodeDescriptor = ForgeTreeNode;

class ForgeTree extends StatefulWidget {
  final String label;
  final List<ForgeTreeNode> nodes;
  final List<Widget> children;
  final ForgeProvided<String?>? value;
  final String? defaultValue;
  final ValueChanged<String?>? onValueChange;
  final List<String>? expandedValue;
  final List<String> defaultExpandedValue;
  final ValueChanged<List<String>>? onExpandedValueChange;
  final bool animated;
  const ForgeTree(
      {super.key,
      required this.label,
      required this.nodes,
      required this.children,
      this.value,
      this.defaultValue,
      this.onValueChange,
      this.expandedValue,
      this.defaultExpandedValue = const [],
      this.onExpandedValueChange,
      this.animated = true});
  @override
  State<ForgeTree> createState() => _TreeState();
}

class _TreeState extends State<ForgeTree> {
  final focus = ForgeRovingFocusController(), fallback = FocusNode();
  final Map<String, ForgeTreeNode> nodes = {};
  final Map<String, String?> parents = {};
  final Set<String> visible = {};
  String? local;
  late List<String> localExpanded;
  String? get selected => widget.value == null ? local : widget.value!.value;
  List<String> get expanded => widget.expandedValue ?? localExpanded;
  void index() {
    nodes.clear();
    parents.clear();
    visible.clear();
    final visiting = HashSet<ForgeTreeNode>.identity();
    void visit(List<ForgeTreeNode> items, String? parent, bool shown) {
      for (final node in items) {
        if (!visiting.add(node) ||
            node.key.trim().isEmpty ||
            node.label.trim().isEmpty ||
            nodes.containsKey(node.key))
          throw ArgumentError(
              'Tree nodes require acyclic unique keys and labels.');
        nodes[node.key] = node;
        parents[node.key] = parent;
        if (shown) visible.add(node.key);
        visit(node.children, node.key, shown && expanded.contains(node.key));
        visiting.remove(node);
      }
    }

    visit(widget.nodes, null, true);
    final before = focus.active;
    final held = before != null && focus.node(before).hasFocus;
    String? repair = before;
    while (repair != null && !visible.contains(repair))
      repair = parents[repair];
    focus.update([
      for (final n in nodes.values)
        ForgeFocusItem(n.key,
            text: n.label, disabled: n.disabled || !visible.contains(n.key))
    ], initialId: selected);
    if (held && repair != null && repair != before) {
      final id = repair;
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted && visible.contains(id)) focus.focus(id);
      });
    }
  }

  @override
  void initState() {
    super.initState();
    local = widget.defaultValue;
    localExpanded = List.of(widget.defaultExpandedValue);
    index();
  }

  @override
  void didUpdateWidget(covariant ForgeTree old) {
    super.didUpdateWidget(old);
    index();
  }

  void select(String key) {
    final n = nodes[key];
    if (n == null || n.disabled || selected == key) return;
    if (widget.value == null) setState(() => local = key);
    widget.onValueChange?.call(key);
  }

  void setExpanded(String key, bool value) {
    final n = nodes[key];
    if (n == null ||
        n.disabled ||
        n.children.isEmpty ||
        expanded.contains(key) == value) return;
    final next =
        value ? [...expanded, key] : expanded.where((v) => v != key).toList();
    if (widget.expandedValue == null)
      setState(() {
        localExpanded = next;
        index();
      });
    widget.onExpandedValueChange?.call(List.unmodifiable(next));
  }

  KeyEventResult key(KeyEvent event) {
    if (event is! KeyDownEvent ||
        HardwareKeyboard.instance.isAltPressed ||
        HardwareKeyboard.instance.isControlPressed ||
        HardwareKeyboard.instance.isMetaPressed) return KeyEventResult.ignored;
    final current = focus.active, node = nodes[current];
    if (node == null || node.disabled) return KeyEventResult.ignored;
    if (event.logicalKey == LogicalKeyboardKey.arrowRight) {
      if (node.children.isNotEmpty) {
        if (!expanded.contains(current)) {
          setExpanded(current!, true);
        } else {
          final first = node.children.where((n) => !n.disabled).firstOrNull;
          if (first != null) focus.focus(first.key);
        }
      }
      return KeyEventResult.handled;
    }
    if (event.logicalKey == LogicalKeyboardKey.arrowLeft) {
      if (node.children.isNotEmpty && expanded.contains(current)) {
        setExpanded(current!, false);
      } else {
        final parent = parents[current];
        if (parent != null && !nodes[parent]!.disabled) focus.focus(parent);
      }
      return KeyEventResult.handled;
    }
    return focus.handle(event,
        orientation: ForgeNavigationOrientation.vertical, loop: false);
  }

  @override
  void dispose() {
    focus.dispose();
    fallback.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (widget.label.trim().isEmpty)
      throw ArgumentError('Tree requires a name.');
    final parts = <_TreePartKind, Widget>{};
    for (final child in widget.children) {
      if (child is! _TreePart)
        throw ArgumentError('Tree accepts canonical parts only.');
      if (parts.containsKey(child.kind))
        throw ArgumentError('Duplicate Tree part.');
      parts[child.kind] = child;
    }
    if (!parts.containsKey(_TreePartKind.body))
      throw ArgumentError('Tree requires Body.');
    return _TreeScope(
        state: this,
        child: ForgeStack(gap: ForgeSpace.s2, children: [
          for (final kind in _TreePartKind.values)
            if (parts[kind] != null) parts[kind]!
        ]));
  }
}

class _TreeScope extends InheritedWidget {
  final _TreeState state;
  const _TreeScope({required this.state, required super.child});
  static _TreeState of(BuildContext c) {
    final s = c.dependOnInheritedWidgetOfExactType<_TreeScope>();
    if (s == null) throw StateError('Tree part requires Tree.');
    return s.state;
  }

  @override
  bool updateShouldNotify(_TreeScope old) => true;
}

enum _TreePartKind { header, body, footer }

abstract class _TreePart extends StatelessWidget {
  final _TreePartKind kind;
  final Widget? child;
  const _TreePart({super.key, required this.kind, this.child});
  @override
  Widget build(BuildContext context) {
    _TreeScope.of(context);
    return child ?? const SizedBox.shrink();
  }
}

class ForgeTreeHeader extends _TreePart {
  const ForgeTreeHeader({super.key, super.child})
      : super(kind: _TreePartKind.header);
}

class ForgeTreeFooter extends _TreePart {
  const ForgeTreeFooter({super.key, super.child})
      : super(kind: _TreePartKind.footer);
}

class ForgeTreeBody extends _TreePart {
  const ForgeTreeBody({super.key}) : super(kind: _TreePartKind.body);
  @override
  Widget build(BuildContext context) {
    final s = _TreeScope.of(context);
    return Semantics(
        container: true,
        label: s.widget.label,
        child: Focus(
            focusNode: s.fallback,
            skipTraversal: s.focus.enabled.isNotEmpty,
            onKeyEvent: (_, e) => s.key(e),
            child: Column(mainAxisSize: MainAxisSize.min, children: [
              for (var i = 0; i < s.widget.nodes.length; i++)
                ForgeTreeItem(
                    key: ValueKey(s.widget.nodes[i].key),
                    node: s.widget.nodes[i],
                    position: i + 1,
                    siblingCount: s.widget.nodes.length)
            ])));
  }
}

class ForgeTreeItem extends StatelessWidget {
  final ForgeTreeNode node;
  final int level, position, siblingCount;
  const ForgeTreeItem(
      {super.key,
      required this.node,
      this.level = 1,
      this.position = 1,
      this.siblingCount = 1});
  @override
  Widget build(BuildContext context) {
    final s = _TreeScope.of(context);
    if (!identical(s.nodes[node.key], node))
      throw ArgumentError('TreeItem node must belong to its nearest Tree.');
    final branch = node.children.isNotEmpty;
    return Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Semantics(
              selected: s.selected == node.key,
              expanded: branch ? s.expanded.contains(node.key) : null,
              child: ForgeButton(
                  focusNode: s.focus.node(node.key),
                  disabled: node.disabled,
                  fullWidth: true,
                  onFocusChange: (v) {
                    if (v) s.focus.focused(node.key);
                  },
                  onPressed: () {
                    s.select(node.key);
                    if (branch)
                      s.setExpanded(node.key, !s.expanded.contains(node.key));
                  },
                  appearance: s.selected == node.key
                      ? ForgeAppearance.soft
                      : ForgeAppearance.ghost,
                  tone: ForgeTone.neutral,
                  child: Align(
                      alignment: AlignmentDirectional.centerStart,
                      child: Text(node.label)))),
          if (branch)
            ForgeTreeGroup(
                parentKey: node.key, nodes: node.children, level: level + 1)
        ]);
  }
}

class ForgeTreeGroup extends StatelessWidget {
  final String parentKey;
  final List<ForgeTreeNode> nodes;
  final int level;
  const ForgeTreeGroup(
      {super.key,
      required this.parentKey,
      required this.nodes,
      required this.level});
  @override
  Widget build(BuildContext context) {
    final s = _TreeScope.of(context), open = s.expanded.contains(parentKey);
    if (!s.nodes.containsKey(parentKey) || level < 2)
      throw ArgumentError('TreeGroup requires a matching parent and level.');
    return Offstage(
        offstage: !open,
        child: ExcludeFocus(
            excluding: !open,
            child: Padding(
                padding: EdgeInsetsDirectional.only(
                    start: ForgeThemeTokens.of(context).palette.space3),
                child: Column(mainAxisSize: MainAxisSize.min, children: [
                  for (var i = 0; i < nodes.length; i++)
                    ForgeTreeItem(
                        key: ValueKey(nodes[i].key),
                        node: nodes[i],
                        level: level,
                        position: i + 1,
                        siblingCount: nodes.length)
                ]))));
  }
}
