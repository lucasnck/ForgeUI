import 'package:flutter/widgets.dart';
import 'package:forge_ui/forge_ui.dart';
import '../preview_settings.dart';

class ForgeButtonGroupExample extends StatefulWidget {
  final ForgePreviewSettings settings;
  const ForgeButtonGroupExample({super.key, required this.settings});
  @override
  State<ForgeButtonGroupExample> createState() =>
      _ForgeButtonGroupExampleState();
}

class _ForgeButtonGroupExampleState extends State<ForgeButtonGroupExample> {
  int saves = 0, cancels = 0;
  @override
  Widget build(BuildContext context) {
    final s = widget.settings, p = ForgeThemeTokens.of(context).palette;
    return Column(mainAxisSize: MainAxisSize.min, children: [
      ForgeButtonGroup(
          label: s.label,
          gap: s.gap,
          padding: s.padding,
          fullWidth: s.fullWidth,
          children: [
            ForgeButton(
                onPressed: () => setState(() => saves++),
                child: const Text('Salvar')),
            ForgeButton(
                onPressed: () => setState(() => cancels++),
                tone: ForgeTone.neutral,
                appearance: ForgeAppearance.ghost,
                child: const Text('Cancelar')),
          ]),
      SizedBox(height: p.space3),
      Text('Salvar: $saves · Cancelar: $cancels'),
    ]);
  }
}
