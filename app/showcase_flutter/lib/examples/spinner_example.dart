import 'package:flutter/widgets.dart';
import 'package:forge_ui/forge_ui.dart';
import '../preview_settings.dart';

class ForgeSpinnerExample extends StatelessWidget {
  final ForgePreviewSettings settings;
  const ForgeSpinnerExample({super.key, required this.settings});
  @override
  Widget build(BuildContext context) => ForgeSpinner(
      size: settings.size,
      tone: settings.tone,
      animated: settings.animated,
      decorative: settings.decorative,
      label: settings.label);
}
