import '../types/map.dart';

bool isForgeMapCoordinate(ForgeMapCoordinate p) =>
    p.latitude.isFinite &&
    p.longitude.isFinite &&
    p.latitude >= -90 &&
    p.latitude <= 90 &&
    p.longitude >= -180 &&
    p.longitude <= 180;
List<ForgeMapCoordinate> decodeForgeMapPolyline(String encoded,
    {int precision = 5}) {
  if (precision != 5 || encoded.length > 1000000)
    throw ArgumentError('Invalid map geometry.');
  var index = 0, latitude = 0, longitude = 0;
  final points = <ForgeMapCoordinate>[];
  int read() {
    var value = 0, factor = 1;
    for (var count = 0; count < 6; count++) {
      if (index >= encoded.length) throw ArgumentError('Invalid map geometry.');
      final chunk = encoded.codeUnitAt(index++) - 63;
      if (chunk < 0 || chunk > 63) throw ArgumentError('Invalid map geometry.');
      value += (chunk & 31) * factor;
      if (chunk < 32) return value.isOdd ? -((value ~/ 2) + 1) : value ~/ 2;
      factor *= 32;
    }
    throw ArgumentError('Invalid map geometry.');
  }

  while (index < encoded.length) {
    latitude += read();
    longitude += read();
    final point = ForgeMapCoordinate(
        latitude: latitude / 100000, longitude: longitude / 100000);
    if (!isForgeMapCoordinate(point) || points.length >= 100000)
      throw ArgumentError('Invalid map geometry.');
    points.add(point);
  }
  return List.unmodifiable(points);
}

bool isForgeMapScene(ForgeMapScene scene) {
  if (scene.markers.length > 10000 || scene.routes.length > 1000) return false;
  final markerIds = <String>{}, routeIds = <String>{};
  for (final m in scene.markers)
    if (m.id.trim().isEmpty ||
        !markerIds.add(m.id) ||
        m.label.trim().isEmpty ||
        !isForgeMapCoordinate(m.coordinate)) return false;
  var count = 0;
  for (final r in scene.routes) {
    if (r.id.trim().isEmpty ||
        !routeIds.add(r.id) ||
        r.coordinates.length < 2 ||
        r.coordinates.length > 100000 ||
        r.coordinates.any((p) => !isForgeMapCoordinate(p))) return false;
    count += r.coordinates.length;
    if (count > 100000) return false;
  }
  return switch (scene.camera) {
    ForgeMapFitCamera() => true,
    ForgeMapFollowCamera c => markerIds.contains(c.markerId),
    ForgeMapCenterCamera c => isForgeMapCoordinate(c.coordinate) &&
        c.zoom.isFinite &&
        c.zoom >= 0 &&
        c.zoom <= 24
  };
}
