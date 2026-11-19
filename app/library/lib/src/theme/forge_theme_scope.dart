import 'package:flutter/widgets.dart';

import 'forge_theme_tokens.dart';

/// A Forge-owned theme boundary. It does not create a Material theme or widgets.
///
/// While the native library is migrated, existing consumers may continue to use
/// ForgeThemeData in MaterialApp; ForgeThemeTokens.of prefers this scope when
/// both providers exist.
class ForgeThemeScope extends InheritedWidget {
  final ForgeThemeTokens tokens;

  const ForgeThemeScope({
    super.key,
    required this.tokens,
    required super.child,
  });

  factory ForgeThemeScope.forId({
    Key? key,
    required ForgeThemeId theme,
    required Widget child,
  }) =>
      ForgeThemeScope(
        key: key,
        tokens: ForgeThemeTokens.fromId(theme),
        child: child,
      );

  /// Return null when no Forge-owned scope is mounted; this allows a temporary
  /// compatibility fallback while legacy Material-based widgets are migrated.
  static ForgeThemeTokens? maybeOf(BuildContext context) =>
      context.dependOnInheritedWidgetOfExactType<ForgeThemeScope>()?.tokens;

  @override
  bool updateShouldNotify(covariant ForgeThemeScope oldWidget) {
    final previous = oldWidget.tokens;
    return tokens.id != previous.id ||
        tokens.palette != previous.palette ||
        tokens.shape != previous.shape ||
        tokens.useSystemContrast != previous.useSystemContrast;
  }
}
