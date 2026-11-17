import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';

const labels = ForgeMapViewLabelsData(
    loading: 'Loading map',
    empty: 'Empty map',
    unavailable: 'Unavailable map',
    schematic: 'Schematic, no navigation');
ForgeMapScene scene(double lat) => ForgeMapScene(markers: [
      ForgeMapMarker(
          id: 'one',
          label: 'Marker one',
          coordinate: ForgeMapCoordinate(latitude: lat, longitude: 2),
          kind: ForgeMapMarkerKind.origin)
    ]);

class Handle implements ForgeMapRendererHandle {
  final ForgeMapViewport viewport;
  int updates = 0, destroys = 0, resizes = 0;
  bool throwUpdate = false;
  Handle(this.viewport);
  @override
  void update(ForgeMapScene scene) {
    updates++;
    if (throwUpdate) throw StateError('Engine failed');
    viewport.setContent(const Text('Native view'));
  }

  @override
  void resize(Size size) {
    resizes++;
  }

  @override
  void destroy() {
    destroys++;
  }
}

class Renderer implements ForgeMapRenderer {
  @override
  final String id;
  @override
  ForgeMapPresentation get presentation => ForgeMapPresentation.schematic;
  final completer = Completer<ForgeMapRendererHandle>();
  int mounts = 0;
  ForgeMapViewport? viewport;
  ForgeMapCancellationSignal? signal;
  Renderer(this.id);
  @override
  Future<ForgeMapRendererHandle> mount(ForgeMapViewport port,
      ForgeMapScene scene, ForgeMapCancellationSignal signal) {
    mounts++;
    viewport = port;
    this.signal = signal;
    return completer.future;
  }
}

Widget host(Widget child) => MaterialApp(
    theme: ForgeThemeData.light(),
    home: Scaffold(
        body:
            SingleChildScrollView(child: SizedBox(width: 400, child: child))));
void main() {
  test(
      'map geometry preserves canonical decoded coordinates and rejects invalid scenes',
      () {
    final points = decodeForgeMapPolyline(
        '_p~iF~ps|U_ulLnnqC_mqNvxq' + String.fromCharCode(96) + '@');
    expect(points.length, 3);
    expect(points.first.latitude, 38.5);
    expect(points.last.longitude, -126.453);
    expect(() => decodeForgeMapPolyline('~'), throwsArgumentError);
    expect(isForgeMapScene(scene(double.nan)), isFalse);
    expect(
        isForgeMapScene(ForgeMapScene(
            markers: scene(1).markers,
            camera: const ForgeMapFollowCamera('missing'))),
        isFalse);
    expect(
        isForgeMapScene(
            ForgeMapScene(markers: [...scene(1).markers, ...scene(1).markers])),
        isFalse);
  });
  testWidgets(
      'map cancels superseded mounts and destroys both late and accepted handles exactly once',
      (t) async {
    final first = Renderer('first'), second = Renderer('second');
    var renderer = first;
    late StateSetter update;
    await t.pumpWidget(host(StatefulBuilder(builder: (context, set) {
      update = set;
      return ForgeMapView(
          label: 'Map',
          description: 'Readable route',
          scene: scene(1),
          renderer: renderer,
          status: ForgeMapViewStatus.ready,
          labels: labels);
    })));
    await t.pump();
    expect(first.mounts, 1);
    update(() => renderer = second);
    await t.pump();
    await t.pump();
    expect(first.signal!.cancelled, isTrue);
    expect(first.viewport!.active, isFalse);
    final lateHandle = Handle(first.viewport!),
        current = Handle(second.viewport!);
    first.completer.complete(lateHandle);
    second.completer.complete(current);
    await t.pump();
    await t.pump();
    expect(lateHandle.destroys, 1);
    expect(current.updates, 1);
    expect(find.text('Native view'), findsOneWidget);
    await t.pumpWidget(host(const SizedBox()));
    await t.pump();
    expect(current.destroys, 1);
    expect(lateHandle.destroys, 1);
  });
  testWidgets('map validates before vendor mount and keeps readable fallback',
      (t) async {
    final renderer = Renderer('invalid');
    await t.pumpWidget(host(ForgeMapView(
        label: 'Map',
        description: 'Readable route',
        scene: scene(91),
        renderer: renderer,
        status: ForgeMapViewStatus.ready,
        labels: labels)));
    await t.pump();
    expect(renderer.mounts, 0);
    expect(find.text('Unavailable map'), findsOneWidget);
    expect(find.text('Readable route'), findsOneWidget);
  });
  testWidgets(
      'renderer failure reports once without implicit retry on unrelated scene updates',
      (t) async {
    final renderer = Renderer('engine'), errors = <Object>[];
    var currentScene = scene(1);
    late StateSetter update;
    await t.pumpWidget(host(StatefulBuilder(builder: (context, set) {
      update = set;
      return ForgeMapView(
          label: 'Map',
          description: 'Route',
          scene: currentScene,
          renderer: renderer,
          status: ForgeMapViewStatus.ready,
          labels: labels,
          onRendererError: errors.add);
    })));
    await t.pump();
    final handle = Handle(renderer.viewport!);
    renderer.completer.complete(handle);
    await t.pump();
    await t.pump();
    handle.throwUpdate = true;
    update(() => currentScene = scene(2));
    await t.pump();
    await t.pump();
    expect(errors.length, 1);
    expect(handle.destroys, 1);
    expect(find.text('Unavailable map'), findsOneWidget);
    update(() => currentScene = scene(3));
    await t.pump();
    expect(renderer.mounts, 1);
    expect(errors.length, 1);
  });
  testWidgets(
      'schematic renderer paints actual geometry and uses explicit non-navigation label',
      (t) async {
    await t.pumpWidget(host(ForgeMapView(
        label: 'Map',
        description: 'Marker one at the origin',
        scene: scene(1),
        renderer: const ForgeSchematicMapRenderer(),
        status: ForgeMapViewStatus.ready,
        labels: labels)));
    await t.pump();
    await t.pump();
    expect(find.text('Schematic, no navigation'), findsOneWidget);
    expect(find.text('Unavailable map'), findsNothing);
    expect(find.byType(CustomPaint), findsWidgets);
    expect(t.takeException(), isNull);
  });
  for (final initialUpdateFailure in [false, true]) {
    testWidgets(
        'initial renderer failure cleans cancellation once (update: $initialUpdateFailure)',
        (t) async {
      final renderer = Renderer('initial-error'), errors = <Object>[];
      await t.pumpWidget(host(ForgeMapView(
          label: 'Map',
          description: 'Route',
          scene: scene(1),
          renderer: renderer,
          status: ForgeMapViewStatus.ready,
          labels: labels,
          onRendererError: errors.add)));
      await t.pump();
      Handle? handle;
      if (initialUpdateFailure) {
        handle = Handle(renderer.viewport!)..throwUpdate = true;
        renderer.completer.complete(handle);
      } else {
        renderer.completer.completeError(StateError('Mount failed'));
      }
      await t.pump();
      await t.pump();
      expect(errors.length, 1);
      expect(renderer.signal!.cancelled, isTrue);
      if (handle != null) expect(handle.destroys, 1);
      await t.pumpWidget(host(const SizedBox()));
      await t.pump();
      expect(t.takeException(), isNull);
      if (handle != null) expect(handle.destroys, 1);
    });
  }
}
