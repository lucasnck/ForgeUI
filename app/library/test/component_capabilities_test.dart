import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';
import 'package:forge_ui/src/theme/forge_control_style.dart';

void main() {
  test('shared capabilities preserve Web values and alias precedence', () {
    expect(ForgeSize.values.map((v) => v.name), ['xs', 'sm', 'md', 'lg', 'xl']);
    expect(ForgeTone.values.length, 11);
    expect(ForgeAppearance.values.map((v) => v.name),
        ['solid', 'soft', 'outlined', 'bordered', 'ghost', 'none']);
    expect(ForgeSpace.values.length, 12);
    expect(resolveForgeAppearance(outlined: true), ForgeAppearance.outlined);
    expect(resolveForgeAppearance(variant: ForgeVariant.solid, outlined: true),
        ForgeAppearance.solid);
    expect(
        resolveForgeAppearance(
            appearance: ForgeAppearance.soft, variant: ForgeVariant.outline),
        ForgeAppearance.soft);
  });
  test('action colors follow Web semantic recipes in every theme', () {
    for (final theme in ForgeThemeId.values) {
      final p = ForgeThemeTokens.fromId(theme).palette;
      for (final tone in ForgeTone.values) {
        final colors = forgeActionColors(p, tone);
        final expected = tone == ForgeTone.inverse
            ? p.colorSurfaceInverse
            : p.color('--color-action-${tone.name}-background');
        expect(colors.background, expected);
        expect(
            colors.foreground,
            tone == ForgeTone.brand
                ? p.colorActionBrandForeground
                : tone == ForgeTone.sand
                    ? p.colorActionSandForeground
                    : tone == ForgeTone.inverse
                        ? p.colorTextInverse
                        : p.colorActionForeground);
      }
      for (final size in ForgeSize.values) {
        for (final appearance in ForgeAppearance.values) {
          final style = forgeActionStyle(p,
              size: size,
              tone: ForgeTone.sand,
              appearance: appearance,
              shape: ForgeShape.square,
              reduceMotion: true);
          expect(style.minimumSize!.resolve({})!.height,
              p.number('--component-height-${size.name}'));
          expect(style.animationDuration, Duration.zero);
          expect(style.tapTargetSize, MaterialTapTargetSize.padded);
          expect(
              style.backgroundColor!.resolve({}),
              switch (appearance) {
                ForgeAppearance.solid => p.colorActionSandBackground,
                ForgeAppearance.soft => p.colorSurfaceSand,
                ForgeAppearance.outlined ||
                ForgeAppearance.bordered =>
                  p.colorSurfaceDefault,
                _ => const Color(0x00000000),
              });
          expect(style.side!.resolve({WidgetState.focused})!.color,
              p.colorFocusRing);
        }
      }
    }
  });
  test('theme copies preserve inherited shape and contrast', () {
    final inherited = ForgeThemeTokens.fromId(ForgeThemeId.contrast)
        .copyWith(shape: ForgeShape.pill);
    expect(inherited.copyWith(id: ForgeThemeId.dark).shape, ForgeShape.pill);
    expect(inherited.withContrast(false).shape, ForgeShape.pill);
    final custom = ForgeThemeTokens(
        id: ForgeThemeId.light,
        palette: const ForgeTokenSet(colors: {}, numbers: {}));
    expect(custom.copyWith(shape: ForgeShape.square).palette,
        same(custom.palette));
    expect(inherited.useSystemContrast, isTrue);
  });
}
