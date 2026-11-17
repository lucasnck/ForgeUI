import 'package:flutter/material.dart';
import 'forge_icon.dart';
import '../generated/forge_icons.g.dart';
import '../types/component_capabilities.dart';
import '../types/primitives.dart';
import '../theme/forge_theme_tokens.dart';
import '../theme/forge_primitive_style.dart';

class ForgeAvatar extends StatelessWidget {
  final String label;
  final String? src, initials;
  final bool decorative;
  final ForgeSize size;
  final ForgeShape shape;
  const ForgeAvatar(
      {super.key,
      required this.label,
      this.src,
      this.initials,
      this.decorative = false,
      this.size = ForgeSize.md,
      this.shape = ForgeShape.pill});
  @override
  Widget build(BuildContext context) {
    if (label.trim().isEmpty)
      throw ArgumentError('Avatar requires a nonblank label.');
    final p = ForgeThemeTokens.of(context).palette;
    final dimension =
        [p.length4, p.length5, p.length6, p.length7, p.length8][size.index];
    final fallback = Center(
        child: initials != null && initials!.isNotEmpty
            ? Text(initials!,
                style: TextStyle(
                    color: p.colorTextDefault, fontWeight: FontWeight.w500))
            : const ForgeIcon(
                name: ForgeIconName.user, size: ForgeIconSize.inherit));
    final content = ClipRRect(
        borderRadius: forgeRadius(p, shape),
        child: ColoredBox(
            color: p.colorSurfaceSubtle,
            child: SizedBox.square(
                dimension: dimension,
                child: src == null || src!.isEmpty
                    ? fallback
                    : Image.network(src!,
                        key: ValueKey(src),
                        fit: BoxFit.cover,
                        excludeFromSemantics: true,
                        errorBuilder: (context, error, stack) => fallback))));
    return decorative
        ? ExcludeSemantics(child: content)
        : Semantics(
            image: true, label: label, child: ExcludeSemantics(child: content));
  }
}
