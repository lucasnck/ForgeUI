import '../generated/forge_tokens.g.dart';
import '../types/component_capabilities.dart';
import 'forge_native_action_recipe.dart';

// Private compatibility helper used by Select. Delegate to the same
// token-backed native recipe used by Button/IconButton; avoid duplicate
// palette definitions or visual defaults.
export 'forge_action_palette.dart'
    show ForgeActionColors, resolveForgeAppearance, forgeActionColors;

ForgeNativeActionRecipe forgeActionStyle(
  ForgeTokenSet p, {
  required ForgeSize size,
  required ForgeTone tone,
  required ForgeAppearance appearance,
  required ForgeShape shape,
  required bool reduceMotion,
}) => forgeNativeActionRecipe(
  p,
  size: size,
  tone: tone,
  appearance: appearance,
  shape: shape,
  reduceMotion: reduceMotion,
);
