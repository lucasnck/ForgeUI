import 'package:flutter/widgets.dart';
import '../theme/forge_theme_tokens.dart';
import '../types/component_capabilities.dart';
import '../types/map.dart';
import '../helpers/map_geometry.dart';
import 'forge_layout.dart';

class ForgeMapView extends StatefulWidget {
  final String label, description;
  final ForgeMapScene scene;
  final ForgeMapRenderer renderer;
  final ForgeMapViewStatus status;
  final ForgeMapViewLabelsData labels;
  final ValueChanged<Object>? onRendererError;
  final Widget? child;
  const ForgeMapView(
      {super.key,
      required this.label,
      required this.description,
      required this.scene,
      required this.renderer,
      required this.status,
      required this.labels,
      this.onRendererError,
      this.child});
  @override
  State<ForgeMapView> createState() => _MapState();
}

class _MapState extends State<ForgeMapView> {
  ForgeMapViewport? viewport;
  ForgeMapCancellationSignal? cancellation;
  ForgeMapRendererHandle? handle;
  final destroyed = Expando<bool>();
  final settled = Expando<bool>();
  int generation = 0, reported = -1;
  Size size = Size.zero;
  ForgeMapViewStatus nativeStatus = ForgeMapViewStatus.loading;
  bool get valid => isForgeMapScene(widget.scene);
  bool get empty => widget.scene.markers.isEmpty && widget.scene.routes.isEmpty;
  bool get enabled =>
      widget.status == ForgeMapViewStatus.ready && valid && !empty;
  ForgeMapViewStatus get effective => !valid
      ? ForgeMapViewStatus.unavailable
      : widget.status != ForgeMapViewStatus.ready
          ? widget.status
          : empty
              ? ForgeMapViewStatus.empty
              : nativeStatus;
  @override
  void initState() {
    super.initState();
    if (enabled) prepare();
  }

  void destroy(ForgeMapRendererHandle? h) {
    if (h == null || destroyed[h] == true) return;
    destroyed[h] = true;
    try {
      h.destroy();
    } catch (_) {
      /* Cleanup is best-effort, as in the source renderer resource. */
    }
  }

  void stop() {
    generation++;
    final signal = cancellation;
    signal?.cancel();
    if (signal != null && settled[signal] == true) signal.dispose();
    cancellation = null;
    final old = handle;
    handle = null;
    destroy(old);
    final previous = viewport;
    viewport = null;
    if (previous != null) {
      previous.deactivate();
      WidgetsBinding.instance.addPostFrameCallback((_) {
        previous.dispose();
      });
    }
  }

  void prepare() {
    stop();
    nativeStatus = ForgeMapViewStatus.loading;
    final current = generation;
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted && current == generation && enabled) launch(current);
    });
  }

  Future<void> launch(int current) async {
    final port = ForgeMapViewport(size: size),
        signal = ForgeMapCancellationSignal();
    viewport = port;
    cancellation = signal;
    if (mounted) setState(() {});
    try {
      final next = await widget.renderer.mount(port, widget.scene, signal);
      if (!mounted || current != generation || signal.cancelled) {
        destroy(next);
        return;
      }
      handle = next;
      try {
        next.update(widget.scene);
        nativeStatus = ForgeMapViewStatus.ready;
        if (mounted) setState(() {});
      } catch (error) {
        fail(error, current);
      }
    } catch (error) {
      if (mounted && current == generation && !signal.cancelled)
        fail(error, current);
    } finally {
      settled[signal] = true;
      if (signal.cancelled) {
        if (identical(cancellation, signal)) cancellation = null;
        signal.dispose();
      }
    }
  }

  void fail(Object error, int current) {
    if (!mounted || current != generation) return;
    cancellation?.cancel();
    destroy(handle);
    handle = null;
    viewport?.deactivate();
    nativeStatus = ForgeMapViewStatus.unavailable;
    setState(() {});
    if (reported != current) {
      reported = current;
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted && generation == current)
          widget.onRendererError?.call(error);
      });
    }
  }

  @override
  void didUpdateWidget(covariant ForgeMapView old) {
    super.didUpdateWidget(old);
    final oldEnabled = old.status == ForgeMapViewStatus.ready &&
        isForgeMapScene(old.scene) &&
        (old.scene.markers.isNotEmpty || old.scene.routes.isNotEmpty);
    if (!identical(old.renderer, widget.renderer) || oldEnabled != enabled) {
      if (enabled) {
        prepare();
      } else {
        stop();
        nativeStatus = ForgeMapViewStatus.loading;
      }
    } else if (enabled &&
        !identical(old.scene, widget.scene) &&
        handle != null) {
      try {
        handle!.update(widget.scene);
      } catch (error) {
        fail(error, generation);
      }
    }
  }

  void resize(Size next) {
    if (next == size) return;
    size = next;
    final current = generation;
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted || current != generation) return;
      viewport?.setSize(next);
      try {
        handle?.resize(next);
      } catch (error) {
        fail(error, current);
      }
    });
  }

  @override
  void dispose() {
    stop();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if ([
      widget.label,
      widget.description,
      widget.labels.loading,
      widget.labels.empty,
      widget.labels.unavailable,
      widget.labels.schematic
    ].any((v) => v.trim().isEmpty))
      throw ArgumentError(
          'MapView requires localized description and state labels.');
    final p = ForgeThemeTokens.of(context).palette,
        status = effective,
        port = viewport;
    return Semantics(
        container: true,
        label: widget.label,
        explicitChildNodes: true,
        child: ForgeStack(gap: ForgeSpace.s0, children: [
          Padding(
              padding: EdgeInsets.all(p.space4),
              child: Text(widget.description)),
          if (widget.renderer.presentation == ForgeMapPresentation.schematic)
            Padding(
                padding: EdgeInsets.all(p.space4),
                child: Text(widget.labels.schematic)),
          SizedBox(
              height: p.space16 * 5,
              child: LayoutBuilder(builder: (context, c) {
                resize(Size(
                    c.hasBoundedWidth ? c.maxWidth : p.layoutContainerNarrow,
                    c.maxHeight));
                return ExcludeSemantics(
                    excluding: status != ForgeMapViewStatus.ready,
                    child: IgnorePointer(
                        ignoring: status != ForgeMapViewStatus.ready,
                        child: Opacity(
                            opacity: status == ForgeMapViewStatus.ready ? 1 : 0,
                            child: port == null
                                ? const SizedBox.shrink()
                                : ValueListenableBuilder<Widget?>(
                                    valueListenable: port,
                                    builder: (context, view, _) =>
                                        view ?? const SizedBox.shrink()))));
              })),
          if (status != ForgeMapViewStatus.ready)
            Semantics(
                liveRegion: true,
                child: Padding(
                    padding: EdgeInsets.all(p.space4),
                    child: Text(widget.labels.forStatus(status)))),
          if (widget.child != null) widget.child!
        ]));
  }
}
