import 'package:flutter/material.dart';
import 'package:forge_ui/forge_ui.dart';
import '../preview_settings.dart';

class ForgeButtonExample extends StatefulWidget {
  final ForgePreviewSettings settings;
  const ForgeButtonExample({super.key, required this.settings});
  @override
  State<ForgeButtonExample> createState() => _ForgeButtonExampleState();
}

class _ForgeButtonExampleState extends State<ForgeButtonExample> {
  final focus = FocusNode();
  bool hasFocus = false;
  @override
  void dispose() {
    focus.dispose();
    super.dispose();
  }

  int presses = 0;
  String feedback = '';
  bool confirming = false;
  @override
  Widget build(BuildContext context) {
    final s = widget.settings, p = ForgeThemeTokens.of(context).palette;
    final hierarchy = s.scenario == 'crud-hierarchy';
    final primary = ForgeButton(
        onPressed: s.enabled ? () => setState(() => presses++) : null,
        focusNode: focus,
        autofocus: s.autofocus,
        onFocusChange: (value) {
          if (mounted) setState(() => hasFocus = value);
        },
        disabled: s.disabled,
        loading: s.loading,
        loadingLabel: s.loadingLabel?.isEmpty == true ? null : s.loadingLabel,
        semanticLabel:
            s.semanticLabel?.isEmpty == true ? null : s.semanticLabel,
        tooltip: s.tooltip?.isEmpty == true ? null : s.tooltip,
        size: s.size,
        tone: hierarchy ? ForgeTone.brand : s.tone ?? ForgeTone.brand,
        appearance: hierarchy ? ForgeAppearance.solid : s.appearance,
        shape: s.shape,
        variant: s.variant,
        fullWidth: s.fullWidth,
        // ignore: deprecated_member_use
        outlined: s.outlined,
        child: Text(s.child));
    return Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          if (!hierarchy)
            Align(alignment: AlignmentDirectional.center, child: primary)
          else
            ForgeButtonGroup(label: 'Ações do registro', children: [
              primary,
              ForgeButton(
                  onPressed: () =>
                      setState(() => feedback = 'Editar solicitado'),
                  tone: ForgeTone.sand,
                  appearance: ForgeAppearance.bordered,
                  child: const Text('Editar')),
              ForgeButton(
                  onPressed: () =>
                      setState(() => feedback = 'Voltar solicitado'),
                  tone: ForgeTone.neutral,
                  appearance: ForgeAppearance.ghost,
                  child: const Text('Voltar')),
              ForgeButton(
                  onPressed: () =>
                      setState(() => feedback = 'Nova tentativa solicitada'),
                  tone: ForgeTone.neutral,
                  appearance: ForgeAppearance.bordered,
                  child: const Text('Tentar novamente')),
              ForgeButton(
                  onPressed: () => setState(() => confirming = true),
                  tone: ForgeTone.neutral,
                  appearance: ForgeAppearance.ghost,
                  child: const Text('Revisar exclusão')),
            ]),
          SizedBox(height: p.space3),
          Text('Cliques: $presses', textAlign: TextAlign.center),
          Text('Foco: ${hasFocus ? 'sim' : 'não'}',
              textAlign: TextAlign.center),
          if (feedback.isNotEmpty) Text(feedback, textAlign: TextAlign.center),
          if (confirming)
            Padding(
                padding: EdgeInsets.only(top: p.space3),
                child: Column(mainAxisSize: MainAxisSize.min, children: [
                  const Text(
                      'Confirmar exclusão deste registro? Ação demonstrativa, sem alteração de dados.'),
                  ForgeButtonGroup(label: 'Confirmação de exclusão', children: [
                    ForgeButton(
                        onPressed: () => setState(() {
                              confirming = false;
                              feedback = 'Exclusão demonstrativa confirmada';
                            }),
                        tone: ForgeTone.danger,
                        child: const Text('Confirmar exclusão')),
                    ForgeButton(
                        onPressed: () => setState(() => confirming = false),
                        tone: ForgeTone.neutral,
                        appearance: ForgeAppearance.ghost,
                        child: const Text('Cancelar')),
                  ]),
                ])),
        ]);
  }
}
