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
            primaryTextTheme:
                theme.primaryTextTheme.apply(fontFamily: 'Roboto')),
        home: Scaffold(body: Builder(builder: (context) {
          final p = ForgeThemeTokens.of(context).palette;
          return Center(
              child: SingleChildScrollView(
                  child: Padding(
                      padding: EdgeInsets.all(p.space4),
                      child: switch (settings.component) {
                        'button' => ForgeButtonExample(
                            key: ValueKey(settings.scenario),
                            settings: settings),
                        'spinner' => ForgeSpinnerExample(settings: settings),
                        'button-group' =>
                          ForgeButtonGroupExample(settings: settings),
                        _ when inputContracts.containsKey(settings.component) =>
                          SizedBox(
                              width: 560,
                              child: ForgeInputCatalogExample(
                                  slug: settings.component,
                                  properties: settings.catalogProperties)),
                        _ when compositeContracts.containsKey(settings.component) =>
                          SizedBox(width: 560, child: ForgeCompositeCatalogExample(
                              slug: settings.component,
                              properties: settings.catalogProperties)),
                        _ when feedbackContracts.containsKey(settings.component) =>
                          SizedBox(
                            width: 560,
                            child: ForgeFeedbackCatalogExample(
                              slug: settings.component,
                              properties: settings.catalogProperties,
                            ),
                          ),
                        _
                            when primitiveContracts
                                .containsKey(settings.component) =>
                          SizedBox(
                              width: 560,
                              child: primitiveExample(settings.component,
                                  settings.catalogProperties)),
                        _ => const Text(
                            'Flutter preview unavailable for this component.'),
                      })));
        })));
  }
}
