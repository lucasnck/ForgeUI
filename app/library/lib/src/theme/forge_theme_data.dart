import 'package:flutter/material.dart';
import 'forge_theme_tokens.dart';

/// Maps the generated Forge tokens to Material theme contracts.
/// Browser-only CSS recipes (blur, gradients, forced-colors, media rules) are not copied.
class ForgeThemeData {
  const ForgeThemeData._();

  static ThemeData light() => forId(ForgeThemeId.light);
  static ThemeData dark() => forId(ForgeThemeId.dark);
  static ThemeData contrast() => forId(ForgeThemeId.contrast);
  static ThemeData liquidGlass() => forId(ForgeThemeId.liquidGlass);

  static ThemeData forId(ForgeThemeId id) {
    final extension = ForgeThemeTokens.fromId(id);
    final p = extension.palette;
    final dark = id == ForgeThemeId.dark || id == ForgeThemeId.contrast;
    final scheme = ColorScheme(
      brightness: dark ? Brightness.dark : Brightness.light,
      primary: p.colorActionBrandBackground,
      onPrimary: p.colorActionBrandForeground,
      secondary: p.colorActionNeutralBackground,
      onSecondary: p.colorActionForeground,
      error: p.colorActionDangerBackground,
      onError: p.colorActionForeground,
      surface: p.colorSurfaceDefault,
      onSurface: p.colorTextDefault,
    );
    final typography = TextTheme(
      bodyLarge: TextStyle(fontSize: p.fontSizeMd, color: p.colorTextDefault),
      bodyMedium: TextStyle(fontSize: p.fontSizeSm, color: p.colorTextDefault),
      titleLarge: TextStyle(
          fontSize: p.fontSizeXl,
          color: p.colorTextDefault,
          fontWeight: FontWeight.w600),
    );
    return ThemeData(
      useMaterial3: true,
      colorScheme: scheme,
      brightness: scheme.brightness,
      scaffoldBackgroundColor: p.colorSurfacePage,
      textTheme: typography,
      extensions: <ThemeExtension<dynamic>>[extension],
      inputDecorationTheme: InputDecorationTheme(
        border:
            OutlineInputBorder(borderRadius: BorderRadius.circular(p.radiusMd)),
        focusedBorder: OutlineInputBorder(
          borderSide:
              BorderSide(color: p.colorFocusRing, width: p.borderWidthFocus),
          borderRadius: BorderRadius.circular(p.radiusMd),
        ),
      ),
      cardTheme: CardThemeData(
        color: p.colorSurfaceRaised,
        shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(p.radiusMd)),
      ),
    );
  }
}
