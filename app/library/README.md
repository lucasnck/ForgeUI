# Forge UI Flutter library

`pubspec.yaml` defines the reusable Flutter package. `lib/forge_ui.dart` exports `ForgeThemeData`, `ForgeThemeTokens`, the generated `ForgeTokens` and 221 public component constructor APIs (including canonical parts and aliases).

The generated token API is not hand-maintained. Run `npm run tokens:generate` from the Forge UI root. Themes preserve `light`, `dark`, `contrast`, `liquid-glass`; Flutter uses native widgets, so browser-only gradients/blur/media styles have documented platform fallbacks.

To verify with a Flutter SDK: `cd app/library && flutter pub get && flutter analyze && flutter test`.
To compile and register a preview in the single Next Showcase: `npm run build:flutter-preview` from root. The script performs Flutter analyzes/tests before building Flutter Web and only then writes the preview registry. Without Flutter SDK or a successful build, the Showcase truthfully displays an unavailable state.

Public visual enums: ForgeSize, ForgeTone, ForgeAppearance, ForgeShape, ForgeVariant and ForgeSpace. Button supports loadingLabel, disabled, fullWidth, native focus/name/tooltip and explicit appearance/variant; outlined remains a deprecated compatibility alias. Native shapes inherit ForgeThemeTokens.shape unless explicitly supplied. Pure style resolution stays internal.

The current tested Flutter Web build registers 68 previews. Full contract and native visual acceptance remain pending; see the [implementation report](../../docs/migration/FLUTTER-IMPLEMENTATION-REPORT.md).
