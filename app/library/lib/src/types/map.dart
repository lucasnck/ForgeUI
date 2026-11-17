import 'package:flutter/widgets.dart';

class ForgeMapCoordinate {
  final double latitude, longitude;
  const ForgeMapCoordinate({required this.latitude, required this.longitude});
}

enum ForgeMapMarkerKind { origin, destination, vehicle, waypoint }

enum ForgeMapRouteKind { planned, approach, completed }

class ForgeMapMarker {
  final String id, label;
  final ForgeMapCoordinate coordinate;
  final ForgeMapMarkerKind kind;
  const ForgeMapMarker(
      {required this.id,
      required this.label,
      required this.coordinate,
      required this.kind});
}

class ForgeMapRoute {
  final String id;
  final List<ForgeMapCoordinate> coordinates;
  final ForgeMapRouteKind kind;
  ForgeMapRoute(
      {required this.id,
      required Iterable<ForgeMapCoordinate> coordinates,
      required this.kind})
      : coordinates = List.unmodifiable(coordinates);
}

sealed class ForgeMapCamera {
  const ForgeMapCamera();
}

class ForgeMapFitCamera extends ForgeMapCamera {
  const ForgeMapFitCamera();
}

class ForgeMapFollowCamera extends ForgeMapCamera {
  final String markerId;
  const ForgeMapFollowCamera(this.markerId);
}

class ForgeMapCenterCamera extends ForgeMapCamera {
  final ForgeMapCoordinate coordinate;
  final double zoom;
  const ForgeMapCenterCamera({required this.coordinate, required this.zoom});
}

class ForgeMapScene {
  final List<ForgeMapMarker> markers;
  final List<ForgeMapRoute> routes;
  final ForgeMapCamera camera;
  ForgeMapScene(
      {Iterable<ForgeMapMarker> markers = const [],
      Iterable<ForgeMapRoute> routes = const [],
      this.camera = const ForgeMapFitCamera()})
      : markers = List.unmodifiable(markers),
        routes = List.unmodifiable(routes);
}

enum ForgeMapViewStatus { loading, ready, empty, unavailable }

enum ForgeMapPresentation { cartographic, schematic }

class ForgeMapViewLabelsData {
  final String loading, empty, unavailable, schematic;
  const ForgeMapViewLabelsData(
      {required this.loading,
      required this.empty,
      required this.unavailable,
      required this.schematic});
  String forStatus(ForgeMapViewStatus status) => switch (status) {
        ForgeMapViewStatus.loading => loading,
        ForgeMapViewStatus.empty => empty,
        ForgeMapViewStatus.unavailable => unavailable,
        _ => ''
      };
}

class ForgeMapCancellationSignal extends ChangeNotifier {
  bool _cancelled = false;
  bool get cancelled => _cancelled;
  void cancel() {
    if (_cancelled) return;
    _cancelled = true;
    notifyListeners();
  }
}

class ForgeMapViewport extends ValueNotifier<Widget?> {
  bool _active = true;
  Size _size;
  ForgeMapViewport({required Size size})
      : _size = size,
        super(null);
  Size get size => _size;
  bool get active => _active;
  void setContent(Widget? child) {
    if (_active) value = child;
  }

  void setSize(Size size) {
    if (_active) _size = size;
  }

  void deactivate() {
    if (!_active) return;
    _active = false;
    value = null;
  }
}

abstract interface class ForgeMapRendererHandle {
  void update(ForgeMapScene scene);
  void resize(Size size);
  void destroy();
}

abstract interface class ForgeMapRenderer {
  String get id;
  ForgeMapPresentation get presentation;
  Future<ForgeMapRendererHandle> mount(ForgeMapViewport viewport,
      ForgeMapScene scene, ForgeMapCancellationSignal signal);
}
