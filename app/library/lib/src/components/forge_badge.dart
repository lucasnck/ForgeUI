import 'package:flutter/widgets.dart';
import '../theme/forge_theme_tokens.dart';
import '../theme/forge_control_style.dart';
import '../theme/forge_primitive_style.dart';
import '../types/component_capabilities.dart';

class ForgeBadge extends StatelessWidget {
  final Widget? child;
  final String? text;
  final ForgeSize size;
  final ForgeTone tone;
  final ForgeAppearance appearance;
  final ForgeShape? shape;
  final bool fullWidth;
  const ForgeBadge(
      {super.key,
      this.child,
      this.text,
      this.size = ForgeSize.md,
      this.tone = ForgeTone.brand,
      this.appearance = ForgeAppearance.soft,
      this.shape,
      this.fullWidth = false});
  @override
  Widget build(BuildContext context) {
    final theme = ForgeThemeTokens.of(context),
        p = theme.palette,
        c = forgeActionColors(p, tone);
    final height =
        [p.length3, p.length4, p.length5, p.length6, p.length7][size.index];
    final inset =
        [p.length1, p.length1, p.length2, p.length2, p.length3][size.index];
    final outlined = appearance == ForgeAppearance.outlined ||
        appearance == ForgeAppearance.bordered;
    return LayoutBuilder(
        builder: (context, box) => Container(
            width: fullWidth && box.hasBoundedWidth ? box.maxWidth : null,
            constraints: BoxConstraints(minHeight: height),
            padding: EdgeInsets.symmetric(horizontal: inset),
            decoration: BoxDecoration(
                borderRadius: forgeRadius(p, shape ?? theme.shape),
                color: appearance == ForgeAppearance.solid
                    ? c.background
                    : appearance == ForgeAppearance.soft
                        ? c.soft
                        : outlined
                            ? p.colorSurfaceDefault
                            : const Color(0x00000000),
                border: Border.all(
                    width: p.borderWidthThin,
                    color: outlined
                        ? ([
                            ForgeTone.sand,
                            ForgeTone.violet,
                            ForgeTone.forest,
                            ForgeTone.sky
                          ].contains(tone)
                            ? c.accent
                            : p.colorBorderDefault)
                        : const Color(0x00000000))),
            child: DefaultTextStyle.merge(
                style: TextStyle(
                    fontSize: p.number('--font-size-${size.name}'),
                    color: appearance == ForgeAppearance.solid
                        ? c.foreground
                        : c.accent),
                child: child ?? Text(text ?? ''))));
  }
}
