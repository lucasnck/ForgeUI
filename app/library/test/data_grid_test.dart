import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';

Widget host(Widget child) => MaterialApp(
    theme: ForgeThemeData.light(),
    home: Scaffold(body: SizedBox(width: 500, child: child)));
void main() {
  testWidgets(
      'data grid renders source order and emits controlled sorting without mutating rows',
      (t) async {
    final sorts = <ForgeDataGridSort>[], rows = ['b', 'a'];
    await t.pumpWidget(host(ForgeDataGrid<String>(
        label: 'Records',
        rows: rows,
        getRowKey: (r) => r,
        columns: [
          ForgeDataGridColumn(
              key: 'name',
              header: 'Name',
              renderCell: (r) => Text(r),
              sortable: true,
              sortLabel: 'Sort names')
        ],
        sort: const ForgeDataGridSort(
            columnKey: 'name', direction: ForgeSortDirection.ascending),
        onSortChange: sorts.add,
        children: const [ForgeDataGridHeader(), ForgeDataGridBody()])));
    expect(t.getTopLeft(find.text('b')).dy,
        lessThan(t.getTopLeft(find.text('a')).dy));
    await t.tap(find.text('Name'));
    await t.pump();
    expect(sorts.single.direction, ForgeSortDirection.descending);
    expect(rows, ['b', 'a']);
    expect(t.takeException(), isNull);
  });
  testWidgets(
      'native table honors row and column spans and preserves cell actions',
      (t) async {
    var clicks = 0;
    await t.pumpWidget(host(ForgeDataGrid<int>(
        label: 'Spans',
        rows: const [1, 2],
        getRowKey: (r) => r.toString(),
        columns: [
          ForgeDataGridColumn(
              key: 'a', header: 'A', renderCell: (r) => Text('A$r')),
          ForgeDataGridColumn(
              key: 'b', header: 'B', renderCell: (r) => Text('B$r'))
        ],
        children: [
          const ForgeDataGridHeader(),
          ForgeDataGridBody(rows: [
            ForgeDataGridRow(rowKey: '1', cells: [
              ForgeDataGridCell(
                  rowKey: '1',
                  columnKey: 'a',
                  rowSpan: 2,
                  child: ForgeButton(
                      onPressed: () => clicks++,
                      child: const Text('Tall action'))),
              const ForgeDataGridCell(
                  rowKey: '1', columnKey: 'b', colSpan: 2, child: Text('Wide'))
            ]),
            const ForgeDataGridRow(rowKey: '2', cells: [
              ForgeDataGridCell(
                  rowKey: '2', columnKey: 'a', child: Text('Lower A')),
              ForgeDataGridCell(
                  rowKey: '2', columnKey: 'b', child: Text('Lower B'))
            ])
          ])
        ])));
    expect(t.getSize(find.text('Wide')).width, isPositive);
    await t.tap(find.text('Tall action'));
    await t.pump();
    expect(clicks, 1);
    expect(t.takeException(), isNull);
  });
  testWidgets(
      'grid empty content has a real spanning cell and footer remains independent',
      (t) async {
    await t.pumpWidget(host(ForgeDataGrid<String>(
        label: 'Empty',
        rows: const [],
        getRowKey: (r) => r,
        columns: [
          ForgeDataGridColumn(key: 'name', header: 'Name', renderCell: Text.new)
        ],
        emptyContent: const Text('Nothing yet'),
        children: const [
          ForgeDataGridHeader(),
          ForgeDataGridBody(),
          ForgeDataGridFooter(child: Text('Footer'))
        ])));
    expect(find.text('Nothing yet'), findsOneWidget);
    expect(find.text('Footer'), findsOneWidget);
    expect(t.takeException(), isNull);
  });
}
