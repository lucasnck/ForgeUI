import 'dart:convert';
import 'dart:ui' show SemanticsRole;
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../controllers/roving_focus_controller.dart';
import '../types/component_capabilities.dart';
import '../types/primitives.dart';
import '../theme/forge_theme_tokens.dart';
import 'forge_layout.dart';
import 'internal/native_table.dart';

class ForgeTreeGridNode<R> {
  final String key;
  final R item;
  final List<ForgeTreeGridNode<R>> children;
  ForgeTreeGridNode(
      {required this.key,
      required this.item,
      Iterable<ForgeTreeGridNode<R>> children = const []})
      : children = List.unmodifiable(children);
}

class ForgeTreeGridColumn<R> {
  final String key, header;
  final String Function(R row) getCellText;
  const ForgeTreeGridColumn(
      {required this.key, required this.header, required this.getCellText});
}

abstract interface class ForgeTreeGridPart {}

class ForgeTreeGrid<R> extends StatefulWidget {
  final String label;
  final List<ForgeTreeGridNode<R>> nodes;
  final List<ForgeTreeGridColumn<R>> columns;
  final String Function(R row) getNodeLabel;
  final List<ForgeTreeGridPart> children;
  final List<String>? expandedValue;
  final List<String> defaultExpandedValue;
  final ValueChanged<List<String>>? onExpandedValueChange;
  final ForgeNavigationDirection direction;
  final bool animated;
  const ForgeTreeGrid(
      {super.key,
      required this.label,
      required this.nodes,
      required this.columns,
      required this.getNodeLabel,
      required this.children,
      this.expandedValue,
      this.defaultExpandedValue = const [],
      this.onExpandedValueChange,
      this.direction = ForgeNavigationDirection.ltr,
      this.animated = true});
  @override
  State<ForgeTreeGrid<R>> createState() => _TreeGridState<R>();
}

class _TreeGridMeta {
  final String key, label;
  final String? parent;
  final int level;
  final bool branch;
  const _TreeGridMeta(
      this.key, this.label, this.parent, this.level, this.branch);
}

class _TreeGridColumnMeta {
  final String key, header;
  const _TreeGridColumnMeta(this.key, this.header);
}

abstract interface class _TreeGridOwner {
  List<_TreeGridMeta> get visible;
  List<_TreeGridColumnMeta> get columns;
  List<String> get expanded;
  ForgeRovingFocusController get focus;
  KeyEventResult handle(KeyEvent event, String rowKey, String columnKey);
  void toggle(String key);
}

String _address(String r, String c) => jsonEncode([r, c]);

class _TreeGridState<R> extends State<ForgeTreeGrid<R>>
    implements _TreeGridOwner {
  @override
  final focus = ForgeRovingFocusController();
  final fallback = FocusNode();
  late List<String> local;
  final Map<String, ForgeTreeGridNode<R>> items = {};
  final Map<String, _TreeGridMeta> metadata = {};
  @override
  final List<_TreeGridMeta> visible = [];
  @override
  List<_TreeGridColumnMeta> get columns =>
      [for (final c in widget.columns) _TreeGridColumnMeta(c.key, c.header)];
  @override
  List<String> get expanded => widget.expandedValue ?? local;
  void collect() {
    final oldParents = {for (final m in metadata.values) m.key: m.parent};
    final oldAddress = focus.active;
    final held = oldAddress != null && focus.node(oldAddress).hasFocus;
    items.clear();
    metadata.clear();
    visible.clear();
    if (widget.label.trim().isEmpty ||
        widget.columns.isEmpty ||
        widget.columns
            .any((c) => c.key.trim().isEmpty || c.header.trim().isEmpty) ||
        widget.columns.map((c) => c.key).toSet().length !=
            widget.columns.length)
      throw ArgumentError('TreeGrid requires named unique columns.');
    void visit(List<ForgeTreeGridNode<R>> nodes, String? parent, int level,
        bool shown) {
      for (final node in nodes) {
        if (node.key.trim().isEmpty || items.containsKey(node.key))
          throw ArgumentError('TreeGrid keys must be unique and acyclic.');
        items[node.key] = node;
        final label = widget.getNodeLabel(node.item);
        if (label.trim().isEmpty)
          throw ArgumentError('TreeGrid requires node labels.');
        final meta = _TreeGridMeta(
            node.key, label, parent, level, node.children.isNotEmpty);
        metadata[node.key] = meta;
        if (shown) visible.add(meta);
        visit(node.children, node.key, level + 1,
            shown && expanded.contains(node.key));
      }
    }

    visit(widget.nodes, null, 1, true);
    focus.update([
      for (final row in visible)
        for (final column in columns)
          ForgeFocusItem(_address(row.key, column.key))
    ]);
    if (held) {
      final address = (jsonDecode(oldAddress) as List).cast<String>();
      var row = address[0];
      if (!visible.any((r) => r.key == row)) {
        String? ancestor = oldParents[row];
        while (ancestor != null && !visible.any((r) => r.key == ancestor))
          ancestor = oldParents[ancestor];
        if (ancestor != null && columns.any((c) => c.key == address[1])) {
          final id = _address(ancestor, address[1]);
          WidgetsBinding.instance.addPostFrameCallback((_) {
            if (mounted) focus.focus(id);
          });
        }
      }
    }
  }

  @override
  void initState() {
    super.initState();
    local = List.of(widget.defaultExpandedValue);
    collect();
  }

  @override
  void didUpdateWidget(covariant ForgeTreeGrid<R> old) {
    super.didUpdateWidget(old);
    collect();
  }

  @override
  void toggle(String key) {
    if (metadata[key]?.branch != true) return;
    final next = expanded.contains(key)
        ? expanded.where((v) => v != key).toList()
        : [...expanded, key];
    if (widget.expandedValue == null)
      setState(() {
        local = next;
        collect();
      });
    widget.onExpandedValueChange?.call(List.unmodifiable(next));
  }

  @override
  KeyEventResult handle(KeyEvent e, String rowKey, String columnKey) {
    if (e is! KeyDownEvent ||
        HardwareKeyboard.instance.isAltPressed ||
        HardwareKeyboard.instance.isMetaPressed ||
        HardwareKeyboard.instance.isShiftPressed) return KeyEventResult.ignored;
    var r = visible.indexWhere((n) => n.key == rowKey),
        c = columns.indexWhere((col) => col.key == columnKey);
    if (r < 0 || c < 0) return KeyEventResult.ignored;
    final ctrl = HardwareKeyboard.instance.isControlPressed, key = e.logicalKey;
    if (ctrl && key != LogicalKeyboardKey.home && key != LogicalKeyboardKey.end)
      return KeyEventResult.ignored;
    if (key == LogicalKeyboardKey.enter && c == 0 && metadata[rowKey]!.branch) {
      toggle(rowKey);
      return KeyEventResult.handled;
    }
    final horizontal =
        widget.direction == ForgeNavigationDirection.rtl ? -1 : 1;
    if (key == LogicalKeyboardKey.arrowDown) {
      r++;
    } else if (key == LogicalKeyboardKey.arrowUp) {
      r--;
    } else if (key == LogicalKeyboardKey.arrowRight) {
      c += horizontal;
    } else if (key == LogicalKeyboardKey.arrowLeft) {
      c -= horizontal;
    } else if (key == LogicalKeyboardKey.home) {
      if (ctrl) {
        r = 0;
      } else {
        c = 0;
      }
    } else if (key == LogicalKeyboardKey.end) {
      if (ctrl) {
        r = visible.length - 1;
      } else {
        c = columns.length - 1;
      }
    } else if (key == LogicalKeyboardKey.pageDown) {
      r += 10;
    } else if (key == LogicalKeyboardKey.pageUp) {
      r -= 10;
    } else {
      return KeyEventResult.ignored;
    }
    focus.focus(_address(visible[r.clamp(0, visible.length - 1)].key,
        columns[c.clamp(0, columns.length - 1)].key));
    return KeyEventResult.handled;
  }

  @override
  void dispose() {
    focus.dispose();
    fallback.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final headers = widget.children.whereType<ForgeTreeGridHeader>().toList(),
        bodies = widget.children.whereType<ForgeTreeGridBody>().toList(),
        footers = widget.children.whereType<ForgeTreeGridFooter>().toList();
    if (headers.length > 1 ||
        bodies.length != 1 ||
        footers.length > 1 ||
        widget.children.length !=
            headers.length + bodies.length + footers.length)
      throw ArgumentError('TreeGrid requires Body and canonical unique parts.');
    final rows = bodies.single.rows ??
        [
          for (final meta in visible)
            ForgeTreeGridRow(rowKey: meta.key, cells: [
              for (final col in widget.columns)
                ForgeTreeGridCell(
                    rowKey: meta.key,
                    columnKey: col.key,
                    text: col.getCellText(items[meta.key]!.item))
            ])
        ];
    if (rows.length != visible.length ||
        Iterable.generate(rows.length)
            .any((i) => rows[i].rowKey != visible[i].key))
      throw ArgumentError('TreeGrid rows must match visible keys in order.');
    final p = ForgeThemeTokens.of(context).palette;
    return _TreeGridScope(
        owner: this,
        child: Directionality(
            textDirection: widget.direction == ForgeNavigationDirection.rtl
                ? TextDirection.rtl
                : TextDirection.ltr,
            child: ForgeStack(gap: ForgeSpace.s2, children: [
              LayoutBuilder(
                  builder: (context, constraints) => SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      child: Focus(
                          focusNode: fallback,
                          skipTraversal: visible.isNotEmpty,
                          child: Semantics(
                              container: true,
                              label: widget.label,
                              explicitChildNodes: true,
                              child: ForgeNativeTable(
                                  minWidth: constraints.hasBoundedWidth
                                      ? constraints.maxWidth
                                      : p.layoutContainerNarrow,
                                  minColumnWidth: p.length20,
                                  direction: Directionality.of(context),
                                  children: [
                                    if (headers.isNotEmpty) headers.single,
                                    ...rows
                                  ]))))),
              if (footers.isNotEmpty) footers.single
            ])));
  }
}

class _TreeGridScope extends InheritedWidget {
  final _TreeGridOwner owner;
  const _TreeGridScope({required this.owner, required super.child});
  static _TreeGridOwner of(BuildContext c) {
    final s = c.dependOnInheritedWidgetOfExactType<_TreeGridScope>();
    if (s == null) throw StateError('TreeGrid part requires TreeGrid.');
    return s.owner;
  }

  @override
  bool updateShouldNotify(_TreeGridScope old) => true;
}

class ForgeTreeGridHeader extends StatelessWidget implements ForgeTreeGridPart {
  final List<ForgeTreeGridColumnHeader>? columns;
  const ForgeTreeGridHeader({super.key, this.columns});
  @override
  Widget build(BuildContext context) {
    final g = _TreeGridScope.of(context),
        cells = columns ??
            [
              for (final c in _TreeGridScope.of(context).columns)
                ForgeTreeGridColumnHeader(columnKey: c.key, label: c.header)
            ];
    if (cells.length != g.columns.length ||
        Iterable.generate(cells.length)
            .any((i) => cells[i].columnKey != g.columns[i].key))
      throw ArgumentError('TreeGrid headers must match root column order.');
    return ForgeNativeRow(
        children: [for (final c in cells) ForgeNativeCell(child: c)]);
  }
}

class ForgeTreeGridBody implements ForgeTreeGridPart {
  final List<ForgeTreeGridRow>? rows;
  const ForgeTreeGridBody({this.rows});
}

class ForgeTreeGridFooter extends StatelessWidget implements ForgeTreeGridPart {
  final Widget child;
  const ForgeTreeGridFooter({super.key, required this.child});
  @override
  Widget build(BuildContext context) {
    _TreeGridScope.of(context);
    return child;
  }
}

class ForgeTreeGridRow extends StatelessWidget {
  final String rowKey;
  final List<ForgeTreeGridCell> cells;
  const ForgeTreeGridRow(
      {super.key, required this.rowKey, required this.cells});
  @override
  Widget build(BuildContext context) {
    final g = _TreeGridScope.of(context);
    if (!g.visible.any((r) => r.key == rowKey) ||
        cells.length != g.columns.length ||
        Iterable.generate(cells.length).any((i) =>
            cells[i].rowKey != rowKey ||
            cells[i].columnKey != g.columns[i].key))
      throw ArgumentError(
          'TreeGridRow requires each ordered root column exactly once.');
    return ForgeNativeRow(children: [
      for (final c in cells)
        ForgeNativeCell(colSpan: c.colSpan, rowSpan: c.rowSpan, child: c)
    ]);
  }
}

class ForgeTreeGridColumnHeader extends StatelessWidget {
  final String columnKey, label;
  const ForgeTreeGridColumnHeader(
      {super.key, required this.columnKey, required this.label});
  @override
  Widget build(BuildContext context) {
    final g = _TreeGridScope.of(context),
        p = ForgeThemeTokens.of(context).palette;
    if (!g.columns.any((c) => c.key == columnKey))
      throw ArgumentError('Unknown TreeGrid header.');
    return Semantics(
        container: true,
        role: SemanticsRole.columnHeader,
        child: Padding(padding: EdgeInsets.all(p.space3), child: Text(label)));
  }
}

class ForgeTreeGridCell extends StatelessWidget {
  final String rowKey, columnKey, text;
  final int colSpan, rowSpan;
  const ForgeTreeGridCell(
      {super.key,
      required this.rowKey,
      required this.columnKey,
      required this.text,
      this.colSpan = 1,
      this.rowSpan = 1});
  @override
  Widget build(BuildContext context) {
    final g = _TreeGridScope.of(context),
        p = ForgeThemeTokens.of(context).palette;
    final row = g.visible.where((r) => r.key == rowKey).firstOrNull,
        column = g.columns.where((c) => c.key == columnKey).firstOrNull;
    if (row == null || column == null || colSpan < 1 || rowSpan < 1)
      throw ArgumentError(
          'TreeGridCell requires matching root identity and valid spans.');
    final first = g.columns.first.key == columnKey,
        branch = first && row.branch,
        id = _address(rowKey, columnKey),
        node = g.focus.node(_address(rowKey, columnKey));
    return Focus(
        focusNode: node,
        includeSemantics: false,
        onFocusChange: (v) {
          if (v) g.focus.focused(id);
        },
        onKeyEvent: (_, e) => g.handle(e, rowKey, columnKey),
        child: ListenableBuilder(
            listenable: node,
            builder: (context, _) => Semantics(
                container: true,
                role: SemanticsRole.cell,
                label: column.header,
                expanded: branch ? g.expanded.contains(rowKey) : null,
                onTap: () => g.focus.focus(id),
                onExpand: branch && !g.expanded.contains(rowKey)
                    ? () => g.toggle(rowKey)
                    : null,
                onCollapse: branch && g.expanded.contains(rowKey)
                    ? () => g.toggle(rowKey)
                    : null,
                child: GestureDetector(
                    behavior: HitTestBehavior.opaque,
                    onTapDown: (_) => g.focus.focus(id),
                    onTap: () => g.focus.focus(id),
                    onLongPress: branch ? () => g.toggle(rowKey) : null,
                    child: DecoratedBox(
                        decoration: BoxDecoration(
                            border: Border.all(
                                color: node.hasFocus
                                    ? p.colorFocusRing
                                    : p.colorBorderDefault,
                                width: node.hasFocus
                                    ? p.borderWidthFocus
                                    : p.borderWidthThin)),
                        child: Padding(
                            padding: EdgeInsetsDirectional.fromSTEB(
                                p.space3 +
                                    (first ? (row.level - 1) * p.space3 : 0),
                                p.space3,
                                p.space3,
                                p.space3),
                            child: Text(text)))))));
  }
}
