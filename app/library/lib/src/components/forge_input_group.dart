import 'package:flutter/widgets.dart';
import '../types/component_capabilities.dart';
import '../types/primitives.dart';
import '../theme/forge_theme_tokens.dart';
import '../theme/forge_primitive_style.dart';

class ForgeInputGroup extends StatelessWidget {
  final Widget child;
  final Widget? leading, trailing;
  final ForgeSpace gap, padding;
  final ForgeAlign align;
  final bool fullWidth;
  const ForgeInputGroup(
      {super.key,
      required this.child,
      this.leading,
      this.trailing,
      this.gap = ForgeSpace.s2,
      this.padding = ForgeSpace.s0,
      this.align = ForgeAlign.stretch,
      this.fullWidth = true});
  @override
  Widget build(BuildContext context) {
    final p = ForgeThemeTokens.of(context).palette;
    return Padding(
        padding: EdgeInsets.all(forgeSpace(p, padding)),
        child: LayoutBuilder(builder: (context, c) {
          final bounded = c.hasBoundedWidth;
          return Row(
              mainAxisSize:
                  fullWidth && bounded ? MainAxisSize.max : MainAxisSize.min,
              crossAxisAlignment: align == ForgeAlign.stretch
                  ? CrossAxisAlignment.center
                  : align == ForgeAlign.baseline
                      ? CrossAxisAlignment.baseline
                      : forgeCross(align),
              textBaseline:
                  align == ForgeAlign.baseline ? TextBaseline.alphabetic : null,
              children: [
                if (leading != null) ...[
                  leading!,
                  SizedBox(width: forgeSpace(p, gap))
                ],
                if (bounded)
                  Flexible(
                      fit: fullWidth ? FlexFit.tight : FlexFit.loose,
                      child: child)
                else
                  child,
                if (trailing != null) ...[
                  SizedBox(width: forgeSpace(p, gap)),
                  trailing!
                ],
              ]);
        }));
  }
}

class ForgeInputAddon extends StatelessWidget {
  final Widget? child;
  final String? text;
  const ForgeInputAddon({super.key, this.child, this.text});
  @override
  Widget build(BuildContext context) => child ?? Text(text ?? '');
}
