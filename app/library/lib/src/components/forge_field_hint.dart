import 'forge_text.dart';
import '../types/primitives.dart';

class ForgeFieldHint extends ForgeText {
  const ForgeFieldHint(
      {super.key,
      super.text,
      super.child,
      super.size = ForgeTextSize.sm,
      super.tone = ForgeTextTone.muted,
      super.weight = ForgeFontWeight.regular,
      super.semanticId,
      super.semanticLabel,
      super.descriptions});
}
