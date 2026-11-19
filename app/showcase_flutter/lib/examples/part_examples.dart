import 'package:flutter/material.dart';
import 'package:forge_ui/forge_ui.dart';
import 'part_contracts.dart';

class ForgePartExample extends StatefulWidget {
  final String slug;
  final Map<String, Object?> properties;
  const ForgePartExample(
      {super.key, required this.slug, this.properties = const {}});
  @override
  State<ForgePartExample> createState() => _PartState();
}

class _PartState extends State<ForgePartExample> {
  int actions = 0, page = 5;
  bool removed = false;
  String get family => partFamilies[widget.slug]!;
  String text(String k) =>
      (widget.properties[k] ?? partContracts[widget.slug]?[k]?['defaultValue'])
          as String;
  void act() {
    setState(() => actions++);
  }

  Widget action() =>
      ForgeButton(onPressed: act, child: Text(text('actionLabel')));
  Widget composition() => switch (family) {
        'card' => ForgeCard(children: [
            ForgeCardHeader(child: Text(text('titleText'))),
            ForgeCardBody(child: Text(text('bodyText'))),
            ForgeCardFooter(child: action())
          ]),
        'alert' => ForgeAlert(children: [
            ForgeAlertHeader(child: Text(text('titleText'))),
            ForgeAlertBody(child: Text(text('bodyText'))),
            ForgeAlertFooter(child: action())
          ]),
        'empty-state' => ForgeEmptyState(children: [
            ForgeEmptyStateHeader(child: Text(text('titleText'))),
            ForgeEmptyStateBody(child: Text(text('bodyText'))),
            ForgeEmptyStateFooter(child: action())
          ]),
        'error-state' => ForgeErrorState(children: [
            ForgeErrorStateHeader(child: Text(text('titleText'))),
            ForgeErrorStateBody(child: Text(text('bodyText'))),
            ForgeErrorStateFooter(child: action())
          ]),
        'loading-state' => ForgeLoadingState(label: text('label'), children: [
            ForgeLoadingStateHeader(child: Text(text('titleText'))),
            ForgeLoadingStateBody(child: Text(text('bodyText'))),
            ForgeLoadingStateFooter(child: action())
          ]),
        'breadcrumb' => ForgeBreadcrumb(label: text('label'), children: [
            ForgeBreadcrumbItem(
                href: '/catalog',
                onActivate: act,
                child: Text(text('actionLabel'))),
            ForgeBreadcrumbItem(current: true, child: Text(text('titleText')))
          ]),
        'pagination' => ForgePagination(
              label: text('label'),
              page: page,
              pageCount: 9,
              onPageChange: (p) => setState(() {
                    page = p;
                    actions++;
                  }),
              children: [
                const ForgePaginationItem(page: 1, label: 'Página 1'),
                if (page > 2) const ForgePaginationEllipsis(),
                if (page > 1 && page < 9)
                  ForgePaginationItem(page: page, label: 'Página $page'),
                if (page < 8) const ForgePaginationEllipsis(),
                const ForgePaginationItem(page: 9, label: 'Página 9')
              ]),
        'tag-group' => Column(children: [
            ForgeTagGroup(label: text('label'), items: [
              if (!removed)
                ForgeTagGroupEntry(
                    id: 'forge',
                    tag: ForgeTagConfiguration(
                        text: text('titleText'),
                        removeLabel: text('actionLabel'),
                        onRemove: () => setState(() {
                              removed = true;
                              actions++;
                            })))
            ]),
            if (removed)
              ForgeButton(
                  onPressed: () => setState(() => removed = false),
                  child: const Text('Restaurar tag'))
          ]),
        _ => throw StateError(family)
      };
  @override
  Widget build(BuildContext context) => Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [composition(), Text('Ações: $actions')]);
}
