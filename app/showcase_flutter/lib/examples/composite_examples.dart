import 'package:flutter/material.dart';
import 'package:forge_ui/forge_ui.dart';
import 'composite_contracts.dart';

/// The selected examples exercise public, caller-owned Flutter widgets.
/// No demo-local widget substitutes for a missing Forge capability.
class ForgeCompositeCatalogExample extends StatefulWidget {
  final String slug;
  final Map<String, Object?> properties;

  const ForgeCompositeCatalogExample({
    super.key,
    required this.slug,
    this.properties = const {},
  });

  @override
  State<ForgeCompositeCatalogExample> createState() =>
      _ForgeCompositeCatalogExampleState();
}

class _ForgeCompositeCatalogExampleState
    extends State<ForgeCompositeCatalogExample> {
  int page = 2;
  int events = 0;
  String feedback = '';
  final removedTagIds = <String>{};

  Map<String, Map<String, Object?>> get schema => compositeContracts[widget.slug]!;
  String text(String key) =>
      (widget.properties[key] ?? schema[key]!['defaultValue']) as String;
  bool flag(String key) =>
      (widget.properties[key] ?? schema[key]!['defaultValue']) as bool;
  int integer(String key) =>
      (widget.properties[key] ?? schema[key]!['defaultValue']) as int;

  void reset() {
    page = widget.slug == 'pagination' ? integer('page') : 2;
    events = 0;
    feedback = '';
    removedTagIds.clear();
  }

  @override
  void initState() {
    super.initState();
    reset();
  }

  @override
  void didUpdateWidget(covariant ForgeCompositeCatalogExample old) {
    super.didUpdateWidget(old);
    if (old.slug != widget.slug) {
      reset();
    } else if (widget.slug == 'pagination' &&
        (old.properties['page'] != widget.properties['page'] ||
            old.properties['pageCount'] != widget.properties['pageCount'])) {
      // Explicit consumer property edits are authoritative.
      page = integer('page');
    }
  }

  void logAction(String message) {
    setState(() {
      events++;
      feedback = message;
    });
  }

  Widget breadcrumb() => ForgeBreadcrumb(
        label: text('label'),
        children: [
          ForgeBreadcrumbItem(
            href: '/catalog',
            onActivate: () => logAction('Navegação solicitada: /catalog'),
            child: Text(text('ancestorLabel')),
          ),
          ForgeBreadcrumbItem(
            current: true,
            child: Text(text('currentLabel')),
          ),
        ],
      );

  Widget pagination() {
    final pageCount = integer('pageCount');
    return ForgePagination(
      label: text('label'),
      page: page,
      pageCount: pageCount,
      disabled: flag('disabled'),
      onPageChange: (next) => setState(() {
        page = next;
        events++;
        feedback = 'Página solicitada: $next';
      }),
      children: [
        for (var number = 1; number <= pageCount; number++)
          ForgePaginationItem(
            page: number,
            label: 'Página $number',
          ),
      ],
    );
  }

  Widget tagGroup() {
    const tags = ['flutter', 'accessibility', 'design-system'];
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        ForgeTagGroup(
          label: text('label'),
          fullWidth: flag('fullWidth'),
          items: [
            for (final id in tags)
              if (!removedTagIds.contains(id))
                ForgeTagGroupEntry(
                  id: id,
                  tag: ForgeTagConfiguration(
                    text: id == 'flutter' ? text('tagText') :
                        id == 'accessibility' ? 'Acessibilidade' : 'Design System',
                    removeLabel: id == 'flutter'
                        ? text('removeLabel') : 'Remover $id',
                    disabled: flag('disabled'),
                    onRemove: () => setState(() {
                      removedTagIds.add(id);
                      events++;
                      feedback = 'Remoção solicitada: $id';
                    }),
                  ),
                ),
          ],
        ),
        if (removedTagIds.isNotEmpty)
          ForgeButton(
            onPressed: () => setState(() {
              removedTagIds.clear();
              feedback = 'Tags restauradas';
            }),
            child: const Text('Restaurar tags'),
          ),
      ],
    );
  }

  Widget pageHeader() => ForgePageHeader(
        titleId: text('titleId'),
        pageTitle: Text(text('pageTitle')),
        description: text('description').isEmpty
            ? null : Text(text('description')),
        identity: const ForgeAvatar(label: 'Equipe Forge', initials: 'F'),
        breadcrumb: ForgeBreadcrumb(label: 'Localização', children: [
                ForgeBreadcrumbItem(
                    href: '/home',
                    onActivate: () => logAction('Página inicial solicitada'),
                    child: const Text('Início')),
                const ForgeBreadcrumbItem(
                    current: true, child: Text('Registros')),
              ]),
        actions: ForgeButtonGroup(label: 'Ações da página', children: [
                ForgeButton(
                    onPressed: () => logAction('Adicionar registro'),
                    child: const Text('Adicionar')),
              ]),
        divider: flag('divider'),
      );

  @override
  Widget build(BuildContext context) {
    if (!validCompositeProperties(widget.slug, widget.properties)) {
      throw ArgumentError.value(widget.properties, 'properties',
          'Invalid controlled composition properties');
    }
    final content = switch (widget.slug) {
      'breadcrumb' => breadcrumb(),
      'pagination' => pagination(),
      'tag-group' => tagGroup(),
      'page-header' => pageHeader(),
      _ => throw ArgumentError.value(widget.slug, 'slug'),
    };
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        content,
        const SizedBox(height: 12),
        Text('Alterações: $events'),
        if (feedback.isNotEmpty) Text(feedback),
      ],
    );
  }
}
