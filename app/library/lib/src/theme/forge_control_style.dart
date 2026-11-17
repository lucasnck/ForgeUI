import 'package:flutter/material.dart';
import '../generated/forge_tokens.g.dart';
import '../types/component_capabilities.dart';

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

Color _feedback(Color color) => Color.from(
    alpha: color.a,
    red: color.r * .92,
    green: color.g * .92,
    blue: color.b * .92);

ButtonStyle forgeActionStyle(
  ForgeTokenSet p, {
  required ForgeSize size,
  required ForgeTone tone,
  required ForgeAppearance appearance,
  required ForgeShape shape,
  required bool reduceMotion,
}) {
  final colors = forgeActionColors(p, tone);
  final background = switch (appearance) {
    ForgeAppearance.solid => colors.background,
    ForgeAppearance.soft => colors.soft,
    ForgeAppearance.outlined ||
    ForgeAppearance.bordered =>
      p.colorSurfaceDefault,
    ForgeAppearance.ghost || ForgeAppearance.none => const Color(0x00000000),
  };
  final foreground =
      appearance == ForgeAppearance.solid ? colors.foreground : colors.accent;
  final border = switch (appearance) {
    ForgeAppearance.outlined || ForgeAppearance.bordered => switch (tone) {
        ForgeTone.sand ||
        ForgeTone.violet ||
        ForgeTone.forest ||
        ForgeTone.sky =>
          colors.accent,
        _ => p.colorBorderDefault,
      },
    _ => const Color(0x00000000),
  };
  final radius = switch (shape) {
    ForgeShape.square => p.zero,
    ForgeShape.rounded => p.radiusMd,
    ForgeShape.pill => p.radiusFull,
  };
  return ButtonStyle(
    minimumSize: WidgetStatePropertyAll(
        Size(p.zero, p.number('--component-height-${size.name}'))),
    padding: WidgetStatePropertyAll(EdgeInsets.symmetric(
        horizontal: p.number('--component-padding-inline-${size.name}'),
        vertical: p.number('--component-padding-block-${size.name}'))),
    textStyle: WidgetStatePropertyAll(TextStyle(
        fontSize: p.number('--font-size-${size.name}'),
        height: p.lineHeightNormal,
        fontWeight:
            FontWeight.values[(p.fontWeightSemibold ~/ 100 - 1).clamp(0, 8)])),
    foregroundColor: WidgetStatePropertyAll(foreground),
    backgroundColor: WidgetStateProperty.resolveWith((states) =>
        !states.contains(WidgetState.disabled) &&
                (states.contains(WidgetState.hovered) ||
                    states.contains(WidgetState.pressed))
            ? _feedback(background)
            : background),
    overlayColor: const WidgetStatePropertyAll(Color(0x00000000)),
    surfaceTintColor: const WidgetStatePropertyAll(Color(0x00000000)),
    elevation: WidgetStatePropertyAll(p.zero),
    side: WidgetStateProperty.resolveWith((states) => BorderSide(
        color: states.contains(WidgetState.focused) ? p.colorFocusRing : border,
        width: states.contains(WidgetState.focused)
            ? p.borderWidthFocus
            : p.borderWidthThin)),
    shape: WidgetStatePropertyAll(
        RoundedRectangleBorder(borderRadius: BorderRadius.circular(radius))),
    tapTargetSize: MaterialTapTargetSize.padded,
    visualDensity: VisualDensity.standard,
    animationDuration:
        Duration(milliseconds: reduceMotion ? 0 : p.motionFast.round()),
  );
}
