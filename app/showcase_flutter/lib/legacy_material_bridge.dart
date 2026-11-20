import 'package:flutter/material.dart';
import 'package:forge_ui/forge_ui.dart';

/// Temporary compatibility boundary for preview widgets not yet migrated away
/// from Material (TextField, DropdownButton, date/time and color pickers).
///
/// The Showcase application shell remains WidgetsApp; this adapter only
/// supplies inherited services required by existing components. Remove this
/// after the last Material-dependent ForgeUI component has been migrated.
class ForgePreviewLegacyMaterialBridge extends StatelessWidget {
  final ForgeThemeId theme;
  final Widget child;

  const ForgePreviewLegacyMaterialBridge({
    super.key,
    required this.theme,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    final base = ForgeThemeData.forId(theme);
    // Legacy widgets still read Theme.of; use the Forge palette and brand font,
    // never the legacy framework's typography.
    final themed = base.copyWith(
      textTheme: base.textTheme.apply(fontFamily: 'DM Sans'),
      primaryTextTheme: base.primaryTextTheme.apply(fontFamily: 'DM Sans'),
    );
    return Localizations(
      // DefaultMaterialLocalizations is English-only. Full locale parity is a
      // separate native-components migration gate, not a silent fallback.
      locale: const Locale('en'),
      delegates: const <LocalizationsDelegate<dynamic>>[
        DefaultWidgetsLocalizations.delegate,
        DefaultMaterialLocalizations.delegate,
      ],
      child: Theme(
        data: themed,
        child: Material(
          type: MaterialType.transparency,
          child: child,
        ),
      ),
    );
  }
}
