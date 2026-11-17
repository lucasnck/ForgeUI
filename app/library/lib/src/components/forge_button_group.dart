import 'package:flutter/widgets.dart';
import '../theme/forge_theme_tokens.dart';
import '../types/component_capabilities.dart';

class ForgeButtonGroup extends StatelessWidget {
  final String label;
  final List<Widget> children;
  final ForgeSpace gap;
  final ForgeSpace? padding;
  final bool fullWidth;
  const ForgeButtonGroup(
      {super.key,
      required this.label,
      required this.children,
      this.gap = ForgeSpace.s2,
      this.padding,
      this.fullWidth = false});

  @override
  Widget build(BuildContext context) {
    if (label.trim().isEmpty)
      throw ArgumentError('ForgeButtonGroup requires a nonblank label.');
    final p = ForgeThemeTokens.of(context).palette;
    final spacing = p.number('--space-${gap.name.substring(1)}');
    Widget group = Wrap(
        spacing: spacing,
        runSpacing: spacing,
        crossAxisAlignment: WrapCrossAlignment.center,
        children: children);
    if (padding != null)
      group = Padding(
          padding:
              EdgeInsets.all(p.number('--space-${padding!.name.substring(1)}')),
          child: group);
    group = Semantics(
        container: true, explicitChildNodes: true, label: label, child: group);
    if (!fullWidth) return group;
    return LayoutBuilder(
        builder: (context, constraints) => SizedBox(
            width: constraints.hasBoundedWidth ? constraints.maxWidth : null,
            child: group));
  }
}
