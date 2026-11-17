import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';

const labels = ForgeODataFilterLabels(
    field: 'Field',
    operator: 'Operator',
    value: 'Value',
    remove: 'Remove',
    addCondition: 'Add condition',
    addGroup: 'Add group',
    group: 'Group',
    and: 'And',
    or: 'Or',
    apply: 'Apply',
    clear: 'Clear',
    cancel: 'Cancel',
    all: 'All',
    yes: 'Yes',
    no: 'No',
    minimum: 'Minimum',
    maximum: 'Maximum',
    invalid: 'Invalid expression',
    unsupported: 'Unsupported simple expression',
    operatorLabels: {
      ForgeODataFilterOperator.eq: 'Equals',
      ForgeODataFilterOperator.ne: 'Not equal',
      ForgeODataFilterOperator.contains: 'Contains',
      ForgeODataFilterOperator.startswith: 'Starts with',
      ForgeODataFilterOperator.endswith: 'Ends with',
      ForgeODataFilterOperator.gt: 'Greater than',
      ForgeODataFilterOperator.ge: 'Greater or equal',
      ForgeODataFilterOperator.lt: 'Less than',
      ForgeODataFilterOperator.le: 'Less or equal',
      ForgeODataFilterOperator.between: 'Between',
      ForgeODataFilterOperator.inValues: 'In'
    });
const decimal = ForgeODataFilterField(
    id: 'amount',
    path: 'Amount',
    label: 'Amount',
    kind: ForgeODataFilterKind.decimal,
    precision: 40,
    scale: 4);
Widget host(Widget child) => MaterialApp(
    theme: ForgeThemeData.light(),
    home: Scaffold(
        body:
            SingleChildScrollView(child: SizedBox(width: 500, child: child))));
void main() {
  testWidgets(
      'simple exact-decimal editing and Apply emit the authoritative expression once',
      (t) async {
    ForgeODataFilterExpression value = ForgeODataFilterGroupData(
        id: 'root', operator: ForgeODataFilterConjunction.and);
    final filters = <String>[];
    await t.pumpWidget(host(StatefulBuilder(
        builder: (context, set) => ForgeODataFilter(
            mode: ForgeODataFilterMode.simple,
            fields: const [decimal],
            value: value,
            onValueChange: (v) => set(() => value = v),
            onApply: (v, f) => filters.add(f),
            labels: labels))));
    await t.enterText(find.byType(TextField), '9007199254740993.0100');
    await t.pump();
    await t.tap(find.text('Apply'));
    await t.pump();
    expect(filters, ["(Amount eq 9007199254740993.0100)"]);
  });
  testWidgets('invalid/incomplete range remains visible and blocks Apply',
      (t) async {
    ForgeODataFilterExpression value = createForgeODataFilterCondition(
        decimal, 'condition',
        operator: ForgeODataFilterOperator.between);
    var applies = 0;
    await t.pumpWidget(host(StatefulBuilder(
        builder: (context, set) => ForgeODataFilter(
            mode: ForgeODataFilterMode.advanced,
            fields: const [decimal],
            value: value,
            onValueChange: (v) => set(() => value = v),
            onApply: (v, f) => applies++,
            labels: labels))));
    await t.enterText(find.byType(TextField).first, '100.0000');
    await t.pump();
    await t.tap(find.text('Apply'));
    await t.pump();
    expect(applies, 0);
    expect(find.text('Invalid expression'), findsOneWidget);
    expect(t.widget<TextField>(find.byType(TextField).first).controller!.text,
        '100.0000');
  });
  testWidgets(
      'unsupported simple model is never flattened and clear retains root identity',
      (t) async {
    final changes = <ForgeODataFilterExpression>[];
    var cancelled = 0;
    final value = ForgeODataFilterGroupData(
        id: 'root', operator: ForgeODataFilterConjunction.or);
    await t.pumpWidget(host(ForgeODataFilter(
        mode: ForgeODataFilterMode.simple,
        fields: const [decimal],
        value: value,
        onValueChange: changes.add,
        onApply: (v, f) {},
        labels: labels,
        onCancel: () => cancelled++)));
    expect(find.text('Unsupported simple expression'), findsOneWidget);
    await t.tap(find.text('Clear'));
    await t.pump();
    final cleared = changes.single as ForgeODataFilterGroupData;
    expect(cleared.id, 'root');
    expect(cleared.operator, ForgeODataFilterConjunction.and);
    expect(cleared.children, isEmpty);
    await t.tap(find.text('Cancel'));
    await t.pump();
    expect(cancelled, 1);
    expect(find.text('Unsupported simple expression'),
        findsOneWidget); // controlled refusal
  });
  testWidgets('advanced add/remove preserves immutable parent expression',
      (t) async {
    final original = ForgeODataFilterGroupData(
        id: 'root', operator: ForgeODataFilterConjunction.and);
    ForgeODataFilterExpression value = original;
    await t.pumpWidget(host(StatefulBuilder(
        builder: (context, set) => ForgeODataFilter(
            mode: ForgeODataFilterMode.advanced,
            fields: const [decimal],
            value: value,
            onValueChange: (v) => set(() => value = v),
            onApply: (v, f) {},
            labels: labels))));
    await t.tap(find.text('Add condition'));
    await t.pump();
    expect((value as ForgeODataFilterGroupData).children.length, 1);
    expect(original.children, isEmpty);
    await t.tap(find.text('Remove'));
    await t.pump();
    expect((value as ForgeODataFilterGroupData).children, isEmpty);
  });
}
