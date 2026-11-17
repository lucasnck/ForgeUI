{{flutter_js}}
{{flutter_build_config}}

(() => {
  const buildId = new URL(document.currentScript?.src ?? document.baseURI).searchParams.get('build');
  if (/^[a-f0-9]{16}$/.test(buildId ?? '')) {
    for (const build of _flutter.buildConfig.builds) {
      if (build.mainJsPath) build.mainJsPath += '?build=' + buildId;
    }
  }
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      const scope = new URL('./', document.baseURI).href;
      return Promise.all(registrations.filter((registration) => registration.scope === scope)
        .map((registration) => registration.unregister()));
    }).catch(() => {});
  }
  const handlers = new Map();
  const requested = (window.location.hash ?? "").replace(/^#\/?/, "").split("/")[0];
  const component = ["button","spinner","button-group","label","link","icon","text","heading","field-hint","field-error","divider","visually-hidden","inline","stack","container","surface","simple-grid","aspect-ratio","badge","avatar","skeleton","progress","meter","input","textarea","checkbox","switch","radio","select","option","input-base","icon-button","progress-bar","slider","legend","input-group","input-addon","tag","masked-input","date-input","postal-code-input","tax-id-input","token-input","email-input","search-input","percentage-input","currency-input","currency-value","international-telephone-input","locale-selector","theme-selector","color-input","password-input","number-input","telephone-input","url-input","date-time-input","time-input","file-input","breadcrumb","pagination","tag-group","page-header","card","alert","empty-state","error-state","loading-state"].includes(requested) ? requested : "button";
  const notify = (type) => window.parent.postMessage(JSON.stringify({ type, component }), window.location.origin);
  window.forgePreview = {
    subscribe(callback) {
      if (handlers.has(callback)) return;
      const listener = (event) => {
        if (event.origin === window.location.origin && event.source === window.parent &&
            typeof event.data === 'string' && event.data.length <= 16384) callback(event.data);
      };
      handlers.set(callback, listener);
      window.addEventListener('message', listener);
    },
    unsubscribe(callback) {
      const listener = handlers.get(callback);
      if (listener) window.removeEventListener('message', listener);
      handlers.delete(callback);
    },
    ready() { notify('forge-ui:flutter-ready'); },
  };
  _flutter.loader.load({
    config: { canvasKitBaseUrl: new URL('canvaskit/', document.baseURI).href },
  }).catch((error) => {
    const message = document.createElement('p');
    message.setAttribute('role', 'alert');
    message.textContent = 'Não foi possível carregar o Flutter. Recarregue a prévia.';
    document.body.appendChild(message);
    notify('forge-ui:flutter-error');
    console.error('Forge Flutter bootstrap failed', error);
  });
})();
