import 'dart:math' as math;
import 'package:flutter/widgets.dart';
import 'package:flutter/semantics.dart';
import '../types/map.dart';
import '../generated/forge_tokens.g.dart';
import '../theme/forge_theme_tokens.dart';

/// A geographic schematic only: no base-map, navigation, location access or ETA.
class ForgeSchematicMapRenderer implements ForgeMapRenderer {
  @override
  String get id => 'forge-schematic';
  @override
  ForgeMapPresentation get presentation => ForgeMapPresentation.schematic;
  const ForgeSchematicMapRenderer();
  @override
  Future<ForgeMapRendererHandle> mount(ForgeMapViewport viewport,
      ForgeMapScene scene, ForgeMapCancellationSignal signal) async {
    if (signal.cancelled) throw StateError('Cancelled map mount.');
    final handle = _SchematicHandle(viewport);
    handle.update(scene);
    return handle;
  }
}

class _Projection {
  final double latitude, longitude, span;
  const _Projection(this.latitude, this.longitude, this.span);
  Offset point(ForgeMapCoordinate point, Size size) => Offset(
      size.width / 2 + (point.longitude - longitude) / span * size.width,
      size.height / 2 - (point.latitude - latitude) / span * size.width);
}

class _SchematicHandle implements ForgeMapRendererHandle {
  final ForgeMapViewport viewport;
  ForgeMapScene? scene;
  _Projection? projection;
  bool destroyed = false;
  _SchematicHandle(this.viewport);
  _Projection fit(ForgeMapScene value) {
    final points = [
      for (final m in value.markers) m.coordinate,
      for (final r in value.routes) ...r.coordinates
    ];
    if (points.isEmpty) return const _Projection(0, 0, 360);
    var minLat = points.first.latitude,
        maxLat = minLat,
        minLon = points.first.longitude,
        maxLon = minLon;
    for (final p in points) {
      minLat = math.min(minLat, p.latitude);
      maxLat = math.max(maxLat, p.latitude);
      minLon = math.min(minLon, p.longitude);
      maxLon = math.max(maxLon, p.longitude);
    }
    final ratio = viewport.size.height > 0
        ? viewport.size.width / viewport.size.height
        : 1.0;
    return _Projection(
        (minLat + maxLat) / 2,
        (minLon + maxLon) / 2,
        math.max(
            .001, math.max(maxLon - minLon, (maxLat - minLat) * ratio) / .8));
  }

  @override
  void update(ForgeMapScene next) {
    if (destroyed) return;
    final previous = projection;
    projection = switch (next.camera) {
      ForgeMapFitCamera() => fit(next),
      ForgeMapFollowCamera camera => () {
          final p = next.markers
              .firstWhere((m) => m.id == camera.markerId)
              .coordinate;
          return _Projection(
              p.latitude, p.longitude, previous?.span ?? fit(next).span);
        }(),
      ForgeMapCenterCamera camera => _Projection(camera.coordinate.latitude,
          camera.coordinate.longitude, 360 / math.pow(2, camera.zoom)),
    };
    scene = next;
    render();
  }

  void render() {
    if (destroyed || scene == null || projection == null) return;
    viewport
        .setContent(_SchematicCanvas(scene: scene!, projection: projection!));
  }

  @override
  void resize(Size size) {
    if (destroyed) return;
    viewport.setSize(size);
    if (scene?.camera is ForgeMapFitCamera) {
      projection = fit(scene!);
    }
    render();
  }

  @override
  void destroy() {
    if (destroyed) return;
    destroyed = true;
    viewport.setContent(null);
    scene = null;
    projection = null;
  }
}

class _SchematicCanvas extends StatelessWidget {
  final ForgeMapScene scene;
  final _Projection projection;
  const _SchematicCanvas({required this.scene, required this.projection});
  @override
  Widget build(BuildContext context) => CustomPaint(
      painter: _SchematicPainter(
          scene,
          projection,
          ForgeThemeTokens.of(context).palette,
          Directionality.of(context),
          MediaQuery.textScalerOf(context)),
      child: const SizedBox.expand());
}

class _SchematicPainter extends CustomPainter {
  final ForgeMapScene scene;
  final _Projection projection;
  final ForgeTokenSet p;
  final TextDirection direction;
  final TextScaler scaler;
  const _SchematicPainter(
      this.scene, this.projection, this.p, this.direction, this.scaler);
  @override
  void paint(Canvas canvas, Size size) {
    canvas.save();
    canvas.clipRect(Offset.zero & size);
    canvas.drawRect(Offset.zero & size, Paint()..color = p.colorSurfaceSubtle);
    for (final route in scene.routes) {
      final path = Path();
      for (var i = 0; i < route.coordinates.length; i++) {
        final point = projection.point(route.coordinates[i], size);
        if (i == 0) {
          path.moveTo(point.dx, point.dy);
        } else {
          path.lineTo(point.dx, point.dy);
        }
      }
      canvas.drawPath(
          path,
          Paint()
            ..style = PaintingStyle.stroke
            ..strokeWidth = p.borderWidthThick
            ..color = switch (route.kind) {
              ForgeMapRouteKind.planned => p.colorActionInfoBackground,
              ForgeMapRouteKind.approach => p.colorActionWarningBackground,
              ForgeMapRouteKind.completed => p.colorActionSuccessBackground
            });
    }
    for (final marker in scene.markers) {
      final point = projection.point(marker.coordinate, size);
      final color = switch (marker.kind) {
        ForgeMapMarkerKind.origin => p.colorActionBrandBackground,
        ForgeMapMarkerKind.destination => p.colorActionSuccessBackground,
        ForgeMapMarkerKind.vehicle => p.colorActionInfoBackground,
        ForgeMapMarkerKind.waypoint => p.colorActionWarningBackground
      };
      canvas.drawCircle(point, p.length2, Paint()..color = color);
      canvas.drawCircle(
          point,
          p.length2,
          Paint()
            ..color = p.colorBorderDefault
            ..style = PaintingStyle.stroke
            ..strokeWidth = p.borderWidthThin);
      final text = TextPainter(
          text: TextSpan(
              text: marker.label,
              style:
                  TextStyle(fontSize: p.fontSizeSm, color: p.colorTextDefault)),
          textDirection: direction,
          textScaler: scaler)
        ..layout(maxWidth: math.max(0, size.width - point.dx - p.space3));
      text.paint(canvas, point + Offset(p.space3, -text.height / 2));
    }
    canvas.restore();
  }

  @override
  SemanticsBuilderCallback get semanticsBuilder => (size) => [
        for (final marker in scene.markers)
          if ((Offset.zero & size)
              .contains(projection.point(marker.coordinate, size)))
            CustomPainterSemantics(
                rect: Rect.fromCenter(
                        center: projection.point(marker.coordinate, size),
                        width: p.length8,
                        height: p.length8)
                    .intersect(Offset.zero & size),
                properties: SemanticsProperties(
                    label: marker.label, textDirection: direction))
      ];
  @override
  bool shouldRepaint(covariant _SchematicPainter old) =>
      !identical(scene, old.scene) ||
      projection != old.projection ||
      p != old.p ||
      direction != old.direction ||
      scaler != old.scaler;
}
