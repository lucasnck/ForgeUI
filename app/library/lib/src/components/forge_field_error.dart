import 'package:flutter/widgets.dart';
import 'forge_text.dart';
import '../types/primitives.dart';

class ForgeFieldError extends ForgeText {
  final bool announce;
  const ForgeFieldError(
      {super.key,
      super.text,
      super.child,
      this.announce = true,
      super.size = ForgeTextSize.sm,
      super.tone = ForgeTextTone.danger,
      super.weight = ForgeFontWeight.regular,
      super.semanticId,
      super.semanticLabel,
      super.descriptions});
  @override
  Widget build(BuildContext context) =>
      Semantics(liveRegion: announce, child: super.build(context));
}
