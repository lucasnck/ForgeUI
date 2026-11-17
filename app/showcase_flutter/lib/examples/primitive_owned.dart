import 'package:flutter/material.dart';
import 'package:forge_ui/forge_ui.dart';

class OwnedLabelExample extends StatefulWidget {
  final Widget Function(ForgeControlBinding) builder;
  const OwnedLabelExample({super.key, required this.builder});
  @override
  State<OwnedLabelExample> createState() => _LabelState();
}

class _LabelState extends State<OwnedLabelExample> {
  final binding = ForgeControlBinding(id: 'label-preview');
  @override
  void dispose() {
    binding.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        widget.builder(binding),
        ForgeInput(control: binding, semanticLabel: 'Campo do exemplo')
      ]);
}

class OwnedLinkExample extends StatefulWidget {
  final Widget Function(VoidCallback) builder;
  const OwnedLinkExample({super.key, required this.builder});
  @override
  State<OwnedLinkExample> createState() => _LinkState();
}

class _LinkState extends State<OwnedLinkExample> {
  int activations = 0;
  @override
  Widget build(BuildContext context) => Column(children: [
        widget.builder(() => setState(() => activations++)),
        Text('Ativações: $activations')
      ]);
}
