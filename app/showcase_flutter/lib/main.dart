import 'package:flutter/material.dart';
import 'package:forge_ui/forge_ui.dart';
import 'preview_bridge.dart';
import 'preview_settings.dart';
import 'examples/button_example.dart';
import 'examples/primitives_generated.dart';
import 'examples/inputs_generated.dart';
import 'examples/composite_examples.dart';
import 'examples/composite_contracts.dart';
import 'examples/feedback_examples.dart';
import 'examples/interactions_generated.dart';
import 'examples/interaction_contracts.dart';
import 'examples/form_catalog_contracts.dart';
import 'examples/form_catalog_examples.dart';
import 'examples/part_contracts.dart';
import 'examples/part_examples.dart';
import 'examples/advanced_contracts.dart';
import 'examples/advanced_examples.dart';
import 'examples/transient_contracts.dart';
import 'examples/transients_generated.dart';
import 'examples/collection_contracts.dart';
import 'examples/collections_generated.dart';
import 'examples/feedback_contracts.dart';
import 'examples/spinner_example.dart';
import 'examples/button_group_example.dart';

void main() => runApp(const ForgeFlutterPreview());

class ForgeFlutterPreview extends StatefulWidget {
  final void Function() Function(void Function(String)) connect;
  final String? initialComponent;
  const ForgeFlutterPreview(
      {super.key, this.connect = connectPreview, this.initialComponent});
  @override
  State<ForgeFlutterPreview> createState() => _ForgeFlutterPreviewState();
}

class _ForgeFlutterPreviewState extends State<ForgeFlutterPreview> {
  late ForgePreviewSettings settings;
  late String targetComponent;
  late void Function() disconnect;
  @override
  void initState() {
    super.initState();
    final requested =
        Uri.base.fragment.replaceFirst(RegExp(r'^/?'), '').split('/').first;
    targetComponent =
        widget.initialComponent ?? (requested.isEmpty ? 'button' : requested);
    settings = ForgePreviewSettings(
        component: targetComponent,
        label:
            targetComponent == 'button-group' ? 'Ações' : 'Carregando conteúdo',
        theme:
            ForgePreviewSettings.themeFor(Uri.base.queryParameters['theme']) ??
                ForgeThemeId.light);
    disconnect = widget.connect((message) {
      final next = ForgePreviewSettings.fromMessage(message);
      if (next != null && next.component == targetComponent && mounted)
        setState(() => settings = next);
    });
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) notifyPreviewReady();
    });
  }

  @override
  void dispose() {
    disconnect();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = ForgeThemeData.forId(settings.theme);
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Forge UI Flutter preview',
      theme: theme.copyWith(
        textTheme: theme.textTheme.apply(fontFamily: 'Roboto'),
        primaryTextTheme: theme.primaryTextTheme.apply(fontFamily: 'Roboto'),
      ),
      home: Scaffold(
        // Match the shared Showcase V2 card surface; use ForgeUI tokens in every theme.
        backgroundColor: ForgeThemeTokens.fromId(settings.theme).palette.colorSurfaceSubtle,
        body: Builder(
          builder: (context) {
            final p = ForgeThemeTokens.of(context).palette;
            return SingleChildScrollView(
              child: Align(
                alignment: AlignmentDirectional.topStart,
                child: Padding(
                  padding: EdgeInsets.all(p.space2),
                  child: ConstrainedBox(
                    // The React preview has no fixed 560dp cap; data grids and layout
                    // examples must be able to occupy the available width.
                    constraints: const BoxConstraints(),
                    child: switch (settings.component) {
                      'button' => ForgeButtonExample(
                          key: ValueKey(settings.scenario),
                          settings: settings),
                      'spinner' => ForgeSpinnerExample(settings: settings),
                      'button-group' =>
                        ForgeButtonGroupExample(settings: settings),
                      _ when partContracts.containsKey(settings.component) =>
                        ForgePartExample(
                                slug: settings.component,
                                properties: settings.catalogProperties),
                      _
                          when advancedContracts
                              .containsKey(settings.component) =>
                        ForgeAdvancedExample(
                                slug: settings.component,
                                properties: settings.catalogProperties),
                      _
                          when transientContracts
                              .containsKey(settings.component) =>
                        ForgeTransientExample(
                                slug: settings.component,
                                properties: settings.catalogProperties),
                      _
                          when collectionContracts
                              .containsKey(settings.component) =>
                        ForgeCollectionExample(
                                slug: settings.component,
                                properties: settings.catalogProperties),
                      _
                          when formCatalogContracts
                              .containsKey(settings.component) =>
                        ForgeFormCatalogExample(
                                slug: settings.component,
                                properties: settings.catalogProperties),
                      _
                          when interactionContracts
                              .containsKey(settings.component) =>
                        ForgeInteractionExample(
                                slug: settings.component,
                                properties: settings.catalogProperties),
                      _ when inputContracts.containsKey(settings.component) =>
                        ForgeInputCatalogExample(
                                slug: settings.component,
                                properties: settings.catalogProperties),
                      _
                          when compositeContracts
                              .containsKey(settings.component) =>
                        ForgeCompositeCatalogExample(
                                slug: settings.component,
                                properties: settings.catalogProperties),
                      _
                          when feedbackContracts
                              .containsKey(settings.component) =>
                        ForgeFeedbackCatalogExample(
                            slug: settings.component,
                            properties: settings.catalogProperties,
                          ),
                      _
                          when primitiveContracts
                              .containsKey(settings.component) =>
                        primitiveExample(settings.component,
                                settings.catalogProperties),
                      _ => const Text(
                          'Flutter preview unavailable for this component.'),
                    },
                  ),
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}
