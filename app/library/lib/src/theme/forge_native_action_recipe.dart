import 'dart:math' as math;
import 'package:flutter/widgets.dart';
import '../generated/forge_tokens.g.dart';
import '../types/component_capabilities.dart';
import 'forge_action_palette.dart';

/// Forge-controlled presentation, matching the existing Web token recipe.
/// The 48dp interaction target is outside the visual surface, so mobile does
/// not silently replace Web height, spacing, radii, colors or font scales.
class ForgeNativeActionRecipe {
  final Color background;
  final Color foreground;
  final Color border;
  final double borderWidth;
  final double focusBorderWidth;
  final Color focusColor;
  final double radius;
  final double height;
  final EdgeInsetsGeometry padding;
  final TextStyle textStyle;
  final Duration duration;
  const ForgeNativeActionRecipe({
    required this.background,
    required this.foreground,
    required this.border,
    required this.borderWidth,
    required this.focusBorderWidth,
    required this.focusColor,
    required this.radius,
    required this.height,
    required this.padding,
    required this.textStyle,
    required this.duration,
  });

  Color backgroundFor({required bool hovered, required bool pressed}) =>
      hovered || pressed
          ? Color.from(
              alpha: background.a,
              red: background.r * .92,
              green: background.g * .92,
              blue: background.b * .92)
          : background;

  BoxDecoration decoration({
    required bool hovered,
    required bool pressed,
    required bool focused,
  }) =>
      BoxDecoration(
        color: backgroundFor(hovered: hovered, pressed: pressed),
        border: Border.all(
          color: focused ? focusColor : border,
          width: focused ? focusBorderWidth : borderWidth,
        ),
        borderRadius: BorderRadius.circular(radius),
      );
}

ForgeNativeActionRecipe forgeNativeActionRecipe(
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
    ForgeAppearance.outlined || ForgeAppearance.bordered =>
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
  return ForgeNativeActionRecipe(
    background: background,
    foreground: foreground,
    border: border,
    borderWidth: p.borderWidthThin,
    focusBorderWidth: p.borderWidthFocus,
    focusColor: p.colorFocusRing,
    radius: radius,
    height: p.number('--component-height-${size.name}'),
    padding: EdgeInsetsDirectional.fromSTEB(
      p.number('--component-padding-inline-${size.name}'),
      p.number('--component-padding-block-${size.name}'),
      p.number('--component-padding-inline-${size.name}'),
      p.number('--component-padding-block-${size.name}'),
    ),
    textStyle: TextStyle(
      fontSize: p.number('--font-size-${size.name}'),
      height: p.lineHeightNormal,
      fontWeight: FontWeight.values[
        (p.fontWeightSemibold ~/ 100 - 1).clamp(0, 8).toInt()
      ],
      color: foreground,
    ),
    duration: Duration(milliseconds: reduceMotion ? 0 : p.motionFast.round()),
  );
}

/// Interactive surface minimum; painted height remains the exact token value.
double forgeMobileActionTarget(double visualHeight) =>
    math.max(48.0, visualHeight);
