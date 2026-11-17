import 'dart:math' as math;
import 'package:flutter/rendering.dart';
import 'package:flutter/widgets.dart';

class ForgeNativeCell extends ParentDataWidget<ForgeNativeCellData> {
  final int colSpan, rowSpan;
  const ForgeNativeCell(
      {super.key, required super.child, this.colSpan = 1, this.rowSpan = 1});
  @override
  void applyParentData(RenderObject renderObject) {
    if (colSpan < 1 || rowSpan < 1)
      throw ArgumentError('Table spans must be positive.');
    final data = renderObject.parentData! as ForgeNativeCellData;
    if (data.colSpan != colSpan || data.rowSpan != rowSpan) {
      data.colSpan = colSpan;
      data.rowSpan = rowSpan;
      renderObject.parent?.markNeedsLayout();
    }
  }

  @override
  Type get debugTypicalAncestorWidgetClass => ForgeNativeRow;
}

class ForgeNativeCellData extends ContainerBoxParentData<RenderBox> {
  int colSpan = 1, rowSpan = 1, column = 0;
}

class ForgeNativeRowData extends ContainerBoxParentData<RenderBox> {}

class ForgeNativeRow extends MultiChildRenderObjectWidget {
  const ForgeNativeRow({super.key, required super.children});
  @override
  RenderObject createRenderObject(BuildContext context) => _NativeRowRender();
}

class ForgeNativeTable extends MultiChildRenderObjectWidget {
  final double minWidth, minColumnWidth;
  final TextDirection direction;
  const ForgeNativeTable(
      {super.key,
      required super.children,
      required this.minWidth,
      required this.minColumnWidth,
      required this.direction});
  @override
  RenderObject createRenderObject(BuildContext context) =>
      _NativeTableRender(minWidth, minColumnWidth, direction);
  @override
  void updateRenderObject(
      BuildContext context, covariant _NativeTableRender render) {
    render
      ..minWidth = minWidth
      ..minColumnWidth = minColumnWidth
      ..direction = direction
      ..markNeedsLayout();
  }
}

class _RowConstraints extends BoxConstraints {
  final List<double> widths, rowHeights;
  final int row;
  final bool finalPass;
  final TextDirection direction;
  _RowConstraints(
      {required double width,
      double? height,
      required this.widths,
      required this.rowHeights,
      required this.row,
      required this.finalPass,
      required this.direction})
      : super(
            minWidth: width,
            maxWidth: width,
            minHeight: height ?? 0,
            maxHeight: height ?? double.infinity);
  @override
  bool operator ==(Object other) =>
      other is _RowConstraints &&
      super == other &&
      identical(widths, other.widths) &&
      identical(rowHeights, other.rowHeights) &&
      row == other.row &&
      finalPass == other.finalPass &&
      direction == other.direction;
  @override
  int get hashCode => Object.hash(super.hashCode, identityHashCode(widths),
      identityHashCode(rowHeights), row, finalPass, direction);
}

class _NativeRowRender extends RenderBox
    with
        ContainerRenderObjectMixin<RenderBox, ForgeNativeCellData>,
        RenderBoxContainerDefaultsMixin<RenderBox, ForgeNativeCellData> {
  final Map<RenderBox, double> naturalHeights = {};
  List<double> widths = const [], rowHeights = const [];
  int row = 0;
  bool finalPass = false;
  TextDirection direction = TextDirection.ltr;
  @override
  void setupParentData(RenderBox child) {
    if (child.parentData is! ForgeNativeCellData)
      child.parentData = ForgeNativeCellData();
  }

  List<RenderBox> get cells {
    final out = <RenderBox>[];
    var c = firstChild;
    while (c != null) {
      out.add(c);
      c = childAfter(c);
    }
    return out;
  }

  double cellWidth(ForgeNativeCellData d) =>
      widths.skip(d.column).take(d.colSpan).fold(0, (a, b) => a + b);
  @override
  void performLayout() {
    final config = constraints as _RowConstraints;
    widths = config.widths;
    rowHeights = config.rowHeights;
    row = config.row;
    finalPass = config.finalPass;
    direction = config.direction;
    if (!finalPass) naturalHeights.clear();
    var height = 0.0;
    final fullWidth = widths.fold<double>(0, (a, b) => a + b);
    for (final c in cells) {
      final d = c.parentData! as ForgeNativeCellData, w = cellWidth(d);
      if (finalPass) {
        final h = rowHeights
            .skip(row)
            .take(d.rowSpan)
            .fold<double>(0, (a, b) => a + b);
        c.layout(BoxConstraints.tightFor(width: w, height: h),
            parentUsesSize: true);
      } else {
        c.layout(BoxConstraints.tightFor(width: w), parentUsesSize: true);
        naturalHeights[c] = c.size.height;
        if (d.rowSpan == 1) height = math.max(height, c.size.height);
      }
      final x = widths.take(d.column).fold<double>(0, (a, b) => a + b);
      d.offset =
          Offset(direction == TextDirection.rtl ? fullWidth - x - w : x, 0);
    }
    size = constraints
        .constrain(Size(fullWidth, finalPass ? rowHeights[row] : height));
  }

  @override
  void paint(PaintingContext context, Offset offset) =>
      defaultPaint(context, offset);
  @override
  bool hitTest(BoxHitTestResult result, {required Offset position}) {
    if (hitTestChildren(result, position: position)) {
      result.add(BoxHitTestEntry(this, position));
      return true;
    }
    return false;
  }

  @override
  bool hitTestChildren(BoxHitTestResult result, {required Offset position}) =>
      defaultHitTestChildren(result, position: position);
  @override
  void describeSemanticsConfiguration(SemanticsConfiguration config) {
    super.describeSemanticsConfiguration(config);
    config
      ..isSemanticBoundary = true
      ..explicitChildNodes = true
      ..role = SemanticsRole.row;
  }
}

class _NativeTableRender extends RenderBox
    with
        ContainerRenderObjectMixin<RenderBox, ForgeNativeRowData>,
        RenderBoxContainerDefaultsMixin<RenderBox, ForgeNativeRowData> {
  double minWidth, minColumnWidth;
  TextDirection direction;
  _NativeTableRender(this.minWidth, this.minColumnWidth, this.direction);
  @override
  void setupParentData(RenderBox child) {
    if (child.parentData is! ForgeNativeRowData)
      child.parentData = ForgeNativeRowData();
  }

  List<_NativeRowRender> get rows {
    final out = <_NativeRowRender>[];
    var c = firstChild;
    while (c != null) {
      if (c is! _NativeRowRender)
        throw StateError('Native table accepts canonical row renderers.');
      out.add(c);
      c = childAfter(c);
    }
    return out;
  }

  @override
  void performLayout() {
    final all = rows, occupied = <int, Set<int>>{};
    var columns = 0, maxRows = all.length;
    for (var r = 0; r < all.length; r++) {
      var column = 0;
      for (final cell in all[r].cells) {
        final d = cell.parentData! as ForgeNativeCellData;
        while ((occupied[r] ?? const <int>{}).contains(column)) column++;
        while (List.generate(d.colSpan, (i) => column + i)
            .any((c) => (occupied[r] ?? const <int>{}).contains(c))) column++;
        d.column = column;
        for (var rr = r; rr < r + d.rowSpan; rr++) {
          final cells = occupied.putIfAbsent(rr, () => {});
          for (var cc = column; cc < column + d.colSpan; cc++) cells.add(cc);
        }
        column += d.colSpan;
        columns = math.max(columns, column);
        maxRows = math.max(maxRows, r + d.rowSpan);
      }
    }
    if (columns == 0) {
      size = constraints.constrain(Size(minWidth, 0));
      return;
    }
    final width = math.max(minWidth, columns * minColumnWidth),
        widths = List.filled(columns, width / columns),
        heights = List.filled(maxRows, 0.0);
    for (var i = 0; i < all.length; i++) {
      final row = all[i];
      row.layout(
          _RowConstraints(
              width: width,
              widths: widths,
              rowHeights: const [],
              row: i,
              finalPass: false,
              direction: direction),
          parentUsesSize: true);
      heights[i] = row.size.height;
    }
    for (var r = 0; r < all.length; r++)
      for (final cell in all[r].cells) {
        final d = cell.parentData! as ForgeNativeCellData;
        if (d.rowSpan > 1) {
          final total =
              heights.skip(r).take(d.rowSpan).fold<double>(0, (a, b) => a + b);
          final measured = all[r].naturalHeights[cell]!;
          if (measured > total) {
            final extra = (measured - total) / d.rowSpan;
            for (var rr = r; rr < r + d.rowSpan; rr++) heights[rr] += extra;
          }
        }
      }
    var y = 0.0;
    for (var r = 0; r < all.length; r++) {
      final row = all[r];
      row.layout(
          _RowConstraints(
              width: width,
              height: heights[r],
              widths: widths,
              rowHeights: heights,
              row: r,
              finalPass: true,
              direction: direction),
          parentUsesSize: true);
      (row.parentData! as ForgeNativeRowData).offset = Offset(0, y);
      y += heights[r];
    }
    size = constraints
        .constrain(Size(width, heights.fold<double>(0, (a, b) => a + b)));
  }

  @override
  void paint(PaintingContext context, Offset offset) =>
      defaultPaint(context, offset);
  @override
  bool hitTestChildren(BoxHitTestResult result, {required Offset position}) =>
      defaultHitTestChildren(result, position: position);
  @override
  void describeSemanticsConfiguration(SemanticsConfiguration config) {
    super.describeSemanticsConfiguration(config);
    config
      ..isSemanticBoundary = true
      ..explicitChildNodes = true
      ..role = SemanticsRole.table;
  }
}
