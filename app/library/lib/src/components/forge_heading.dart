import 'package:flutter/material.dart';
import 'forge_text.dart';
import '../theme/forge_theme_tokens.dart';
import '../theme/forge_primitive_style.dart';
import '../types/primitives.dart';

class ForgeHeading extends ForgeText {
  final int level;
  const ForgeHeading(
      {super.key,
      required this.level,
      super.text,
      super.child,
      super.size,
      super.tone,
      super.weight,
      super.semanticId,
      super.semanticLabel,
      super.descriptions});
  @override
  TextStyle styleFor(BuildContext context) {
    if (level < 1 || level > 6)
      throw ArgumentError.value(level, 'level', 'Expected 1..6');
    final p = ForgeThemeTokens.of(context).palette;
    final sizes = [
      ForgeTextSize.xl4,
      ForgeTextSize.xl3,
      ForgeTextSize.xl2,
      ForgeTextSize.xl,
      ForgeTextSize.lg,
      ForgeTextSize.md
    ];
    return forgeTextStyle(p,
            size: size ?? sizes[level - 1],
            tone: tone,
            weight: weight ??
                (level <= 2 ? ForgeFontWeight.bold : ForgeFontWeight.semibold))
        .copyWith(
            height: level == 1
                ? p.lineHeightDisplay
                : level <= 3
                    ? p.lineHeightHeading
                    : level <= 5
                        ? p.lineHeightCompact
                        : p.lineHeightNormal,
            letterSpacing: level == 1
                ? p.letterSpacingDisplay
                : level <= 3
                    ? p.letterSpacingTight
                    : p.letterSpacingNormal);
  }

  @override
  Widget build(BuildContext context) =>
      Semantics(headingLevel: level, child: super.build(context));
}
