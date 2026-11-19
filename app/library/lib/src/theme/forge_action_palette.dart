import 'package:flutter/widgets.dart';
import '../generated/forge_tokens.g.dart';
import '../types/component_capabilities.dart';

/// Shared Web/Flutter action precedence. Keep this independent of Material.
ForgeAppearance resolveForgeAppearance({
  ForgeAppearance? appearance,
  ForgeVariant? variant,
  bool? outlined,
}) =>
    appearance ??
    (variant != null
        ? switch (variant) {
            ForgeVariant.solid => ForgeAppearance.solid,
            ForgeVariant.soft => ForgeAppearance.soft,
            ForgeVariant.ghost => ForgeAppearance.ghost,
            ForgeVariant.outline => ForgeAppearance.outlined,
          }
        : outlined == true
            ? ForgeAppearance.outlined
            : ForgeAppearance.solid);

class ForgeActionColors {
  final Color background;
  final Color foreground;
  final Color soft;
  final Color accent;
  const ForgeActionColors(
      this.background, this.foreground, this.soft, this.accent);
}

ForgeActionColors forgeActionColors(ForgeTokenSet p, ForgeTone tone) {
  final background = tone == ForgeTone.inverse
      ? p.colorSurfaceInverse
      : p.color('--color-action-${tone.name}-background');
  final foreground = switch (tone) {
    ForgeTone.brand => p.colorActionBrandForeground,
    ForgeTone.sand => p.colorActionSandForeground,
    ForgeTone.inverse => p.colorTextInverse,
    _ => p.colorActionForeground,
  };
  final accent = switch (tone) {
    ForgeTone.sand => p.colorTextSand,
    ForgeTone.violet => p.colorTextViolet,
    ForgeTone.forest => p.colorTextForest,
    ForgeTone.sky => p.colorTextSky,
    _ => p.colorTextDefault,
  };
  return ForgeActionColors(
      background,
      foreground,
      tone == ForgeTone.sand ? p.colorSurfaceSand : p.colorSurfaceSubtle,
      accent);
}
