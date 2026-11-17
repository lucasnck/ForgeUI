import 'package:flutter/material.dart';
import '../theme/forge_theme_tokens.dart';

class ForgeDivider extends StatelessWidget {
  final String? semanticLabel;
  const ForgeDivider({super.key, this.semanticLabel});
  @override
  Widget build(BuildContext context) {
    final p = ForgeThemeTokens.of(context).palette;
    return Semantics(
        label: semanticLabel,
        child: Divider(
            height: p.borderWidthThin,
            thickness: p.borderWidthThin,
            color: p.colorBorderDefault));
  }
}
