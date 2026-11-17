import 'package:flutter/material.dart';
import 'package:forge_ui/forge_ui.dart';
import 'feedback_contracts.dart';

/// Exercises real native owners/parts; the demo owns feedback/actions only.
class ForgeFeedbackCatalogExample extends StatefulWidget {
  final String slug;
  final Map<String, Object?> properties;
  const ForgeFeedbackCatalogExample({
    super.key,
    required this.slug,
    this.properties = const {},
  });

  @override
  State<ForgeFeedbackCatalogExample> createState() =>
      _ForgeFeedbackCatalogExampleState();
}

class _ForgeFeedbackCatalogExampleState
    extends State<ForgeFeedbackCatalogExample> {
  int actions = 0;
  String feedback = '';

  Map<String, Map<String, Object?>> get schema => feedbackContracts[widget.slug]!;
  String value(String name) =>
      (widget.properties[name] ?? schema[name]!['defaultValue']) as String;
  bool enabled(String name) =>
      (widget.properties[name] ?? schema[name]!['defaultValue']) as bool;

  ForgeAnnouncementPoliteness get announcement =>
      ForgeAnnouncementPoliteness.values.firstWhere(
        (kind) => kind.name == value('announcement'),
      );
  ForgeElevation get elevation => ForgeElevation.values.firstWhere(
        (kind) => kind.name == value('elevation'),
      );

  void record(String action) {
    setState(() {
      actions++;
      feedback = action;
    });
  }

  @override
  void didUpdateWidget(covariant ForgeFeedbackCatalogExample oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.slug != oldWidget.slug) {
      actions = 0;
      feedback = '';
    }
  }

  Widget action(String label) => ForgeButton(
        onPressed: () => record('Ação solicitada: $label'),
        child: Text(label),
      );

  Widget card() => ForgeCard(
        elevation: elevation,
        fullWidth: enabled('fullWidth'),
        children: [
          ForgeCardHeader(child: Text(value('titleText'))),
          ForgeCardBody(child: Text(value('bodyText'))),
          ForgeCardFooter(child: action(value('actionLabel'))),
        ],
      );

  Widget alert() => ForgeAlert(
        announcement: announcement,
        children: [
          ForgeAlertHeader(child: Text(value('titleText'))),
          ForgeAlertBody(child: Text(value('bodyText'))),
          ForgeAlertFooter(child: action(value('actionLabel'))),
        ],
      );

  Widget empty() => ForgeEmptyState(children: [
        ForgeEmptyStateHeader(child: Text(value('titleText'))),
        ForgeEmptyStateBody(child: Text(value('bodyText'))),
        if (enabled('showAction'))
          ForgeEmptyStateFooter(child: action(value('actionLabel'))),
      ]);

  Widget error() => ForgeErrorState(
        announcement: announcement,
        children: [
          ForgeErrorStateHeader(child: Text(value('titleText'))),
          ForgeErrorStateBody(child: Text(value('bodyText'))),
          ForgeErrorStateFooter(child: action(value('actionLabel'))),
        ],
      );

  Widget loading() => ForgeLoadingState(
        label: value('label'),
        children: [
          if (value('titleText').isNotEmpty)
            ForgeLoadingStateHeader(child: Text(value('titleText'))),
          ForgeLoadingStateBody(child: Text(value('bodyText'))),
        ],
      );

  @override
  Widget build(BuildContext context) {
    if (!validFeedbackProperties(widget.slug, widget.properties)) {
      throw ArgumentError.value(widget.properties, 'properties',
          'Invalid feedback composition properties');
    }
    final content = switch (widget.slug) {
      'card' => card(),
      'alert' => alert(),
      'empty-state' => empty(),
      'error-state' => error(),
      'loading-state' => loading(),
      _ => throw ArgumentError.value(widget.slug, 'slug'),
    };
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        content,
        const SizedBox(height: 12),
        Text('Ações: $actions'),
        if (feedback.isNotEmpty) Text(feedback),
      ],
    );
  }
}
