import '../types/primitives.dart';
import 'package:flutter/material.dart';
import '../generated/forge_icons.g.dart';
import '../theme/forge_theme_tokens.dart';

class ForgeIcon extends StatelessWidget {
  final ForgeIconName name;
  final ForgeIconSize? size;
  final String? label;
  final Color? color;
  const ForgeIcon(
      {super.key, required this.name, this.size, this.label, this.color});
  @override
  Widget build(BuildContext context) {
    final p = ForgeThemeTokens.of(context).palette;
    final dimension = switch (size) {
      ForgeIconSize.xs => p.length4,
      ForgeIconSize.sm => p.length5,
      ForgeIconSize.lg => p.length7,
      ForgeIconSize.xl => p.length8,
      ForgeIconSize.inherit =>
        DefaultTextStyle.of(context).style.fontSize ?? p.fontSizeMd,
      _ => p.length6
    };
    final effective = color ??
        IconTheme.of(context).color ??
        DefaultTextStyle.of(context).style.color ??
        p.colorTextDefault;
    final drawing = CustomPaint(
        size: Size.square(dimension),
        painter:
            _Vector(forgeIconGeometry[name]!, effective, p.iconStrokeWidth));
    return label == null
        ? ExcludeSemantics(child: drawing)
        : Semantics(
            image: true, label: label, child: ExcludeSemantics(child: drawing));
  }
}

class _Vector extends CustomPainter {
  final ForgeIconGeometry geometry;
  final Color color;
  final double stroke;
  const _Vector(this.geometry, this.color, this.stroke);
  @override
  void paint(Canvas canvas, Size size) {
    canvas.save();
    canvas.scale(size.width / 24, size.height / 24);
    final paint = Paint()
      ..color = color
      ..style = geometry.stroke ? PaintingStyle.stroke : PaintingStyle.fill
      ..strokeWidth = stroke
      ..strokeCap = StrokeCap.round
      ..strokeJoin = StrokeJoin.round;
    for (final path in geometry.paths) canvas.drawPath(path, paint);
    canvas.restore();
  }

  @override
  bool shouldRepaint(_Vector old) =>
      geometry != old.geometry || color != old.color || stroke != old.stroke;
}
