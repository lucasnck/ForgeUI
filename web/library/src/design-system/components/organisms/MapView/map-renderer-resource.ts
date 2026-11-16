import type { MapRenderer, MapRendererHandle, MapScene } from "../../../types/map";

type RendererSnapshot =
  | { readonly status: "loading" }
  | { readonly status: "ready" }
  | { readonly status: "unavailable"; readonly error: unknown };

const LOADING: RendererSnapshot = { status: "loading" };
const READY: RendererSnapshot = { status: "ready" };
const EMPTY_SCENE: MapScene = { markers: [], routes: [], camera: { kind: "fit" } };

export function createMapRendererResource(renderer: MapRenderer, enabled = true) {
  let snapshot = LOADING;
  let scene = EMPTY_SCENE;
  let handle: MapRendererHandle | null = null;
  let controller: AbortController | null = null;
  let generation = 0;
  const listeners = new Set<() => void>();

  const destroy = (previous: MapRendererHandle | null) => {
    if (!previous) return;

    try {
      previous.destroy();
    } catch {
      return;
    }
  };

  const emit = (next: RendererSnapshot) => {
    snapshot = next;
    listeners.forEach((listener) => listener());
  };

  const discardHandle = () => {
    const previous = handle;
    handle = null;
    destroy(previous);
  };

  const fail = (error: unknown) => {
    controller?.abort();
    discardHandle();
    emit({ status: "unavailable", error });
  };

  return {
    subscribe(listener: () => void) {
      listeners.add(listener);

      return () => {
        listeners.delete(listener);
      };
    },
    getSnapshot: () => snapshot,
    getServerSnapshot: () => LOADING,
    update(next: MapScene) {
      if (next === scene) return;
      scene = next;

      if (handle) {
        try {
          handle.update(next);
        } catch (error) {
          fail(error);
        }
      }
    },
    resize() {
      if (handle) {
        try {
          handle.resize();
        } catch (error) {
          fail(error);
        }
      }
    },
    start(container: HTMLElement) {
      if (!enabled) return () => {};

      const currentGeneration = ++generation;
      controller?.abort();
      discardHandle();
      const currentController = new AbortController();
      controller = currentController;
      emit(LOADING);
      void Promise.resolve()
        .then(() => {
          if (currentController.signal.aborted) return null;
          return renderer.mount(container, scene, currentController.signal);
        })
        .then((next) => {
          if (!next) return;

          if (currentController.signal.aborted || generation !== currentGeneration) {
            destroy(next);
            return;
          }

          handle = next;

          try {
            next.update(scene);
            emit(READY);
          } catch (error) {
            fail(error);
          }
        })
        .catch((error: unknown) => {
          if (!currentController.signal.aborted && generation === currentGeneration) fail(error);
        });

      return () => {
        if (generation !== currentGeneration) return;
        generation += 1;
        currentController.abort();
        discardHandle();
        scene = EMPTY_SCENE;
        emit(LOADING);
      };
    },
  };
}
