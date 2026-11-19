import 'package:flutter/material.dart';
import '../generated/forge_tokens.g.dart';
import '../types/component_capabilities.dart';
import 'forge_theme_scope.dart';

enum ForgeThemeId { light, dark, contrast, liquidGlass }

/// The consumer selects/persists themes; this extension does not touch storage.
@immutable
class ForgeThemeTokens extends ThemeExtension<ForgeThemeTokens> {
  final ForgeThemeId id;
  final ForgeTokenSet palette;
  final bool useSystemContrast;
  final ForgeShape shape;

  const ForgeThemeTokens({
    required this.id,
    required this.palette,
    this.useSystemContrast = false,
    this.shape = ForgeShape.rounded,
  });

  static ForgeThemeTokens fromId(ForgeThemeId id) {
    return switch (id) {
      ForgeThemeId.light => const ForgeThemeTokens(
          id: ForgeThemeId.light, palette: ForgeTokens.light),
      ForgeThemeId.dark => const ForgeThemeTokens(
          id: ForgeThemeId.dark, palette: ForgeTokens.dark),
      ForgeThemeId.contrast => const ForgeThemeTokens(
          id: ForgeThemeId.contrast,
          palette: ForgeTokens.contrast,
          useSystemContrast: true),
      ForgeThemeId.liquidGlass => const ForgeThemeTokens(
          id: ForgeThemeId.liquidGlass, palette: ForgeTokens.liquidGlass),
    };
  }

  static ForgeThemeTokens of(BuildContext context) {
    // Prefer our own InheritedWidget; Material is a legacy compatibility path.
    final scoped = ForgeThemeScope.maybeOf(context);
    if (scoped != null) return scoped;
    final extension = Theme.of(context).extension<ForgeThemeTokens>();
    if (extension == null) {
      throw FlutterError(
          'ForgeThemeTokens requires a ForgeThemeScope ancestor (or the legacy ForgeThemeData Material adapter).');
    }
    return extension;
  }

  @override
  ForgeThemeTokens copyWith(
      {ForgeThemeId? id, bool? useSystemContrast, ForgeShape? shape}) {
    final base = id == null ? this : ForgeThemeTokens.fromId(id);
    return ForgeThemeTokens(
        id: base.id,
        palette: base.palette,
        useSystemContrast: useSystemContrast ?? this.useSystemContrast,
        shape: shape ?? this.shape);
  }

  ForgeThemeTokens withContrast(bool value) => ForgeThemeTokens(
      id: id, palette: palette, useSystemContrast: value, shape: shape);

  @override
  ForgeThemeTokens lerp(ThemeExtension<ForgeThemeTokens>? other, double t) {
    if (other is! ForgeThemeTokens) return this;
    // Tokens are discrete semantic values. Let Flutter animate paint colors via ThemeData.
    return t < 0.5 ? this : other;
  }
}
