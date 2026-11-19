import 'package:flutter/widgets.dart';
import '../theme/forge_theme_tokens.dart';
import '../theme/forge_primitive_style.dart';
import '../types/primitives.dart';

class ForgeText extends StatelessWidget {
  final String? text;
  final Widget? child;
  final ForgeTextSize? size;
  final ForgeTextTone? tone;
  final ForgeFontWeight? weight;
  final ForgeTextSemanticRole semanticRole;
  final String? semanticLabel, semanticId;
  final List<ForgeDescriptionBinding> descriptions;
  const ForgeText(
      {super.key,
      this.text,
      this.child,
      this.size,
      this.tone,
      this.weight,
      this.semanticRole = ForgeTextSemanticRole.inline,
      this.semanticLabel,
      this.semanticId,
      this.descriptions = const []});
  TextStyle styleFor(BuildContext context) =>
      forgeTextStyle(ForgeThemeTokens.of(context).palette,
          size: size, tone: tone, weight: weight);
  @override
  Widget build(BuildContext context) {
    var style = styleFor(context);
    if (semanticRole == ForgeTextSemanticRole.strong && weight == null)
      style = style.copyWith(fontWeight: FontWeight.bold);
    Widget content = DefaultTextStyle.merge(
        style: style, child: child ?? Text(text ?? '', softWrap: true));
    if (semanticLabel != null) content = ExcludeSemantics(child: content);
    return Semantics(
        identifier: semanticId,
        label: semanticLabel,
        hint: descriptions.isEmpty
            ? null
            : descriptions.map((d) => d.text).join('\n'),
        child: content);
  }
}
