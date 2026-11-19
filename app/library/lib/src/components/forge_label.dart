import 'package:flutter/widgets.dart';
import 'forge_text.dart';
import '../types/primitives.dart';

class ForgeLabel extends ForgeText {
  final ForgeControlBinding control;
  final bool required;
  const ForgeLabel(
      {super.key,
      required this.control,
      this.required = false,
      super.text,
      super.child,
      super.size = ForgeTextSize.md,
      super.tone = ForgeTextTone.defaultTone,
      super.weight = ForgeFontWeight.semibold,
      super.semanticId,
      super.semanticLabel,
      super.descriptions});
  @override
  Widget build(BuildContext context) => GestureDetector(
      onTap: control.focusNode.requestFocus,
      behavior: HitTestBehavior.translucent,
      child: Row(mainAxisSize: MainAxisSize.min, children: [
        Flexible(child: super.build(context)),
        if (required) const ExcludeSemantics(child: Text(' *'))
      ]));
}
