import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';

Widget host(Widget child) => MaterialApp(
      theme: ForgeThemeData.light(),
      home: Scaffold(body: SizedBox(width: 350, child: child)),
    );

void main() {
  testWidgets('breadcrumb requires a current last item and valid destinations',
      (t) async {
    await t.pumpWidget(host(const ForgeBreadcrumb(label: 'Location', children: [
      ForgeBreadcrumbItem(href: '/home', child: Text('Home')),
      ForgeBreadcrumbItem(current: true, child: Text('Details')),
    ])));
    expect(t.takeException(), isNull);
    expect(find.text('Home'), findsOneWidget);
    expect(find.text('Details'), findsOneWidget);

    await t.pumpWidget(host(const ForgeBreadcrumb(label: 'Location', children: [
      ForgeBreadcrumbItem(current: true, child: Text('Bad')),
      ForgeBreadcrumbItem(href: '/home', child: Text('Home')),
    ])));
    expect(t.takeException(), isArgumentError);
  });

  testWidgets(
      'breadcrumb uses caller activation and current item stays passive',
      (t) async {
    var activations = 0;
    await t.pumpWidget(host(ForgeBreadcrumb(label: 'Location', children: [
      ForgeBreadcrumbItem(
        href: '/catalog',
        onActivate: () => activations++,
        child: const Text('Catalog'),
      ),
      const ForgeBreadcrumbItem(current: true, child: Text('Item')),
    ])));
    await t.tap(find.text('Catalog'));
    await t.pump();
    expect(activations, 1);
    expect(find.byType(ForgeLink), findsOneWidget);
    expect(t.takeException(), isNull);
  });

  testWidgets('pagination is controlled and ignores duplicate current requests',
      (t) async {
    final changes = <int>[];
    await t.pumpWidget(host(ForgePagination(
      label: 'Pages',
      page: 2,
      pageCount: 4,
      onPageChange: changes.add,
      children: const [
        ForgePaginationItem(page: 2, label: 'Page 2'),
        ForgePaginationEllipsis(),
        ForgePaginationItem(page: 3, label: 'Next page', child: Text('Next')),
      ],
    )));
    await t.tap(find.text('2'));
    await t.pump();
    expect(changes, isEmpty);
    await t.tap(find.text('Next'));
    await t.pump();
    expect(changes, [3]);
    expect(t.widget<ForgePagination>(find.byType(ForgePagination)).page, 2);
    expect(t.takeException(), isNull);
  });

  testWidgets('disabled page actions do not notify their owner or user handler',
      (t) async {
    final changes = <int>[];
    var handlerCalls = 0;
    await t.pumpWidget(host(ForgePagination(
      label: 'Pages',
      page: 1,
      pageCount: 2,
      disabled: true,
      onPageChange: changes.add,
      children: [
        ForgePaginationItem(
          page: 2,
          label: 'Next page',
          child: const Text('Next'),
          onPressed: () => handlerCalls++,
        ),
      ],
    )));
    await t.tap(find.text('Next'));
    await t.pump();
    expect(changes, isEmpty);
    expect(handlerCalls, 0);
    expect(t.takeException(), isNull);
  });

  testWidgets('pagination validates range and rejects foreign children',
      (t) async {
    await t.pumpWidget(host(ForgePagination(
      label: 'Pages',
      page: 0,
      pageCount: 3,
      onPageChange: (_) {},
      children: const [],
    )));
    expect(t.takeException(), isRangeError);
    await t.pumpWidget(host(ForgePagination(
      label: 'Pages',
      page: 1,
      pageCount: 3,
      onPageChange: (_) {},
      children: const [Text('Wrong')],
    )));
    expect(t.takeException(), isArgumentError);
  });

  testWidgets('pagination item cannot render outside a pagination owner',
      (t) async {
    await t
        .pumpWidget(host(const ForgePaginationItem(page: 1, label: 'Page 1')));
    expect(t.takeException(), isStateError);
  });

  testWidgets('brand checkbox resolves an existing portable color token',
      (t) async {
    await t.pumpWidget(host(const ForgeCheckbox(
      defaultChecked: true,
      semanticLabel: 'Agreed',
    )));
    expect(t.takeException(), isNull);
    expect(find.byType(ForgeCheckbox), findsOneWidget);
  });
}
