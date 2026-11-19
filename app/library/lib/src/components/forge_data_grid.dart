import 'dart:ui' show SemanticsRole;
import 'package:flutter/widgets.dart';
import '../theme/forge_theme_tokens.dart';
import '../types/component_capabilities.dart';
import 'forge_button.dart';
import 'forge_layout.dart';
import 'internal/native_table.dart';

enum ForgeSortDirection { ascending, descending }

enum ForgeDataGridAlignment { start, center, end }

class ForgeDataGridSort {
  final String columnKey;
  final ForgeSortDirection direction;
  const ForgeDataGridSort({required this.columnKey, required this.direction});
}

class ForgeDataGridColumn<R> {
  final String key, header;
  final Widget Function(R row) renderCell;
  final bool sortable, rowHeader;
  final String? sortLabel;
  final ForgeDataGridAlignment align;
  const ForgeDataGridColumn(
      {required this.key,
      required this.header,
      required this.renderCell,
      this.sortable = false,
      this.rowHeader = false,
      this.sortLabel,
      this.align = ForgeDataGridAlignment.start});
}

abstract interface class ForgeDataGridPart {}

class ForgeDataGrid<R> extends StatelessWidget {
  final String label;
  final List<R> rows;
  final List<ForgeDataGridColumn<R>> columns;
  final String Function(R row) getRowKey;
  final List<ForgeDataGridPart> children;
  final ForgeDataGridSort? sort;
  final ValueChanged<ForgeDataGridSort>? onSortChange;
  final Widget? emptyContent;
  final bool fullWidth,
      showBorders,
      showColumnLines,
      showRowLines,
      rowAlternationEnabled;
  final ForgeSize size;
  const ForgeDataGrid(
      {super.key,
      required this.label,
      required this.rows,
      required this.columns,
      required this.getRowKey,
      required this.children,
      this.sort,
      this.onSortChange,
      this.emptyContent,
      this.fullWidth = true,
      this.showBorders = true,
      this.showColumnLines = false,
      this.showRowLines = true,
      this.rowAlternationEnabled = true,
      this.size = ForgeSize.md});
  @override
  Widget build(BuildContext context) {
    final keys = rows.map(getRowKey).toList(),
        columnKeys = columns.map((c) => c.key).toList();
    if (label.trim().isEmpty ||
        columns.isEmpty ||
        columnKeys.any((k) => k.trim().isEmpty) ||
        columnKeys.toSet().length != columnKeys.length ||
        columns.where((c) => c.rowHeader).length > 1 ||
        keys.any((k) => k.trim().isEmpty) ||
        keys.toSet().length != keys.length)
      throw ArgumentError('Invalid DataGrid keys, columns or label.');
    if (columns.any((c) =>
            c.sortable &&
            (c.sortLabel?.trim().isNotEmpty != true || onSortChange == null)) ||
        (sort != null &&
            !columns.any((c) => c.key == sort!.columnKey && c.sortable)))
      throw ArgumentError(
          'Sortable columns require labels, callback and a valid controlled sort.');
    final headers = children.whereType<ForgeDataGridHeader>().toList(),
        bodies = children.whereType<ForgeDataGridBody>().toList(),
        footers = children.whereType<ForgeDataGridFooter>().toList();
    if (headers.length > 1 ||
        bodies.length != 1 ||
        footers.length > 1 ||
        children.length != headers.length + bodies.length + footers.length)
      throw ArgumentError('DataGrid requires Body and unique canonical parts.');
    final rendered = bodies.single.rows ??
        [
          for (var i = 0; i < rows.length; i++)
            ForgeDataGridRow(rowKey: keys[i], cells: [
              for (final c in columns)
                ForgeDataGridCell(
                    rowKey: keys[i],
                    columnKey: c.key,
                    rowHeader: c.rowHeader,
                    child: c.renderCell(rows[i]))
            ])
        ];
    final renderedKeys = rendered.map((r) => r.rowKey).toList();
    if (renderedKeys.toSet().length != renderedKeys.length ||
        renderedKeys.any((k) => !keys.contains(k)))
      throw ArgumentError('Custom DataGrid rows must belong to its data.');
    final contract = _GridContract(
        label: label,
        columns: [
          for (final c in columns)
            _GridColumn(
                c.key, c.header, c.rowHeader, c.sortable, c.sortLabel, c.align)
        ],
        rowKeys: keys,
        sort: sort,
        onSortChange: onSortChange,
        size: size,
        showBorders: showBorders,
        showColumnLines: showColumnLines,
        showRowLines: showRowLines,
        rowAlternation: rowAlternationEnabled);
    final p = ForgeThemeTokens.of(context).palette;
    return _DataGridScope(
        contract: contract,
        child: ForgeStack(gap: ForgeSpace.s2, children: [
          LayoutBuilder(builder: (context, c) {
            final available =
                c.hasBoundedWidth ? c.maxWidth : p.layoutContainerNarrow;
            return SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: DecoratedBox(
                    decoration: BoxDecoration(
                        border: showBorders
                            ? Border.all(
                                color: p.colorBorderDefault,
                                width: p.borderWidthThin)
                            : null),
                    child: Semantics(
                        container: true,
                        label: label,
                        explicitChildNodes: true,
                        child: ForgeNativeTable(
                            minWidth: fullWidth ? available : 0,
                            minColumnWidth: p.length20,
                            direction: Directionality.of(context),
                            children: [
                              if (headers.isNotEmpty) headers.single,
                              ...rendered,
                              if (rendered.isEmpty && emptyContent != null)
                                ForgeNativeRow(children: [
                                  ForgeNativeCell(
                                      colSpan: columns.length,
                                      child: Semantics(
                                          container: true,
                                          role: SemanticsRole.cell,
                                          child: Padding(
                                              padding: EdgeInsets.all(p.space3),
                                              child: emptyContent)))
                                ])
                            ]))));
          }),
          if (footers.isNotEmpty) footers.single
        ]));
  }
}

class _GridColumn {
  final String key, header;
  final bool rowHeader, sortable;
  final String? sortLabel;
  final ForgeDataGridAlignment align;
  const _GridColumn(this.key, this.header, this.rowHeader, this.sortable,
      this.sortLabel, this.align);
}

class _GridContract {
  final String label;
  final List<_GridColumn> columns;
  final List<String> rowKeys;
  final ForgeDataGridSort? sort;
  final ValueChanged<ForgeDataGridSort>? onSortChange;
  final ForgeSize size;
  final bool showBorders, showColumnLines, showRowLines, rowAlternation;
  const _GridContract(
      {required this.label,
      required this.columns,
      required this.rowKeys,
      this.sort,
      this.onSortChange,
      required this.size,
      required this.showBorders,
      required this.showColumnLines,
      required this.showRowLines,
      required this.rowAlternation});
  _GridColumn column(String key) =>
      columns.where((c) => c.key == key).firstOrNull ??
      (throw ArgumentError('Unknown grid column.'));
  void requestSort(String key) {
    if (!column(key).sortable) return;
    onSortChange?.call(ForgeDataGridSort(
        columnKey: key,
        direction: sort?.columnKey == key &&
                sort?.direction == ForgeSortDirection.ascending
            ? ForgeSortDirection.descending
            : ForgeSortDirection.ascending));
  }
}

class _DataGridScope extends InheritedWidget {
  final _GridContract contract;
  const _DataGridScope({required this.contract, required super.child});
  static _GridContract of(BuildContext c) {
    final s = c.dependOnInheritedWidgetOfExactType<_DataGridScope>();
    if (s == null) throw StateError('DataGrid part requires DataGrid.');
    return s.contract;
  }

  @override
  bool updateShouldNotify(_DataGridScope old) => true;
}

class ForgeDataGridHeader extends StatelessWidget implements ForgeDataGridPart {
  const ForgeDataGridHeader({super.key});
  @override
  Widget build(BuildContext context) {
    final g = _DataGridScope.of(context);
    return ForgeNativeRow(children: [
      for (final c in g.columns)
        ForgeNativeCell(
            child: ForgeDataGridColumnHeader(columnKey: c.key, label: c.header))
    ]);
  }
}

class ForgeDataGridBody implements ForgeDataGridPart {
  final List<ForgeDataGridRow>? rows;
  const ForgeDataGridBody({this.rows});
}

class ForgeDataGridFooter extends StatelessWidget implements ForgeDataGridPart {
  final Widget child;
  const ForgeDataGridFooter({super.key, required this.child});
  @override
  Widget build(BuildContext context) {
    _DataGridScope.of(context);
    return child;
  }
}

class ForgeDataGridRow extends StatelessWidget {
  final String rowKey;
  final List<ForgeDataGridCell> cells;
  const ForgeDataGridRow(
      {super.key, required this.rowKey, required this.cells});
  @override
  Widget build(BuildContext context) {
    final g = _DataGridScope.of(context),
        keys = cells.map((c) => c.columnKey).toList();
    if (!g.rowKeys.contains(rowKey) ||
        cells.any((c) => c.rowKey != rowKey) ||
        keys.toSet().length != keys.length ||
        keys.length != g.columns.length ||
        keys.any((key) => !g.columns.any((c) => c.key == key)))
      throw ArgumentError('DataGridRow requires each registered column once.');
    return ForgeNativeRow(children: [
      for (final cell in cells)
        ForgeNativeCell(
            colSpan: cell.colSpan, rowSpan: cell.rowSpan, child: cell)
    ]);
  }
}

class ForgeDataGridCell extends StatelessWidget {
  final String rowKey, columnKey;
  final Widget? child;
  final bool? rowHeader;
  final int colSpan, rowSpan;
  const ForgeDataGridCell(
      {super.key,
      required this.rowKey,
      required this.columnKey,
      this.child,
      this.rowHeader,
      this.colSpan = 1,
      this.rowSpan = 1});
  @override
  Widget build(BuildContext context) {
    final g = _DataGridScope.of(context),
        c = g.column(columnKey),
        p = ForgeThemeTokens.of(context).palette;
    if (!g.rowKeys.contains(rowKey) ||
        (rowHeader != null && rowHeader != c.rowHeader) ||
        colSpan < 1 ||
        rowSpan < 1)
      throw ArgumentError('Invalid DataGridCell identity/header/spans.');
    final padding = p.number('--component-padding-inline-' + g.size.name);
    return Semantics(
        container: true,
        role: SemanticsRole.cell,
        label: c.header,
        child: DecoratedBox(
            decoration: BoxDecoration(
                color: g.rowAlternation && g.rowKeys.indexOf(rowKey).isOdd
                    ? p.colorSurfaceSubtle
                    : p.colorSurfaceDefault,
                border: Border(
                    bottom: g.showRowLines
                        ? BorderSide(
                            color: p.colorBorderDefault,
                            width: p.borderWidthThin)
                        : BorderSide.none,
                    right: g.showColumnLines
                        ? BorderSide(
                            color: p.colorBorderDefault,
                            width: p.borderWidthThin)
                        : BorderSide.none)),
            child: Padding(
                padding: EdgeInsets.all(padding),
                child: Align(
                    alignment: switch (c.align) {
                      ForgeDataGridAlignment.start =>
                        AlignmentDirectional.centerStart,
                      ForgeDataGridAlignment.center => Alignment.center,
                      ForgeDataGridAlignment.end =>
                        AlignmentDirectional.centerEnd
                    },
                    child: DefaultTextStyle.merge(
                        style: TextStyle(
                            fontSize: p.number('--font-size-' + g.size.name),
                            color: p.colorTextDefault),
                        child: child ?? const SizedBox.shrink())))));
  }
}

class ForgeDataGridColumnHeader extends StatelessWidget {
  final String columnKey, label;
  final int colSpan, rowSpan;
  const ForgeDataGridColumnHeader(
      {super.key,
      required this.columnKey,
      required this.label,
      this.colSpan = 1,
      this.rowSpan = 1});
  @override
  Widget build(BuildContext context) {
    final g = _DataGridScope.of(context),
        c = g.column(columnKey),
        p = ForgeThemeTokens.of(context).palette;
    if (colSpan < 1 || rowSpan < 1) throw ArgumentError('Invalid header span.');
    return Semantics(
        container: true,
        role: SemanticsRole.columnHeader,
        label: g.sort?.columnKey == columnKey ? g.sort!.direction.name : null,
        child: Padding(
            padding: EdgeInsets.all(p.space2),
            child: c.sortable
                ? ForgeButton(
                    onPressed: () => g.requestSort(columnKey),
                    appearance: ForgeAppearance.none,
                    semanticLabel: c.sortLabel,
                    child: Text(label))
                : Align(
                    alignment: AlignmentDirectional.centerStart,
                    child: Text(label))));
  }
}
