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
  const component = ["button","spinner","button-group","label","link","icon","text","heading","field-hint","field-error","divider","visually-hidden","inline","stack","container","surface","simple-grid","aspect-ratio","badge","avatar","skeleton","progress","meter","input","textarea","checkbox","switch","radio","select","option","input-base","icon-button","progress-bar","slider","legend","input-group","input-addon","tag","masked-input","date-input","postal-code-input","tax-id-input","token-input","email-input","search-input","percentage-input","currency-input","currency-value","international-telephone-input","locale-selector","theme-selector","color-input","password-input","number-input","telephone-input","url-input","date-time-input","time-input","file-input","breadcrumb","pagination","tag-group","page-header","card","alert","empty-state","error-state","loading-state","choice-group","choice-group-header","choice-group-body","choice-group-footer","checkbox-group","checkbox-group-item","radio-group","radio-group-item","tabs","tabs-header","tabs-body","tabs-footer","tab","tab-panel","toolbar","toolbar-item","disclosure","collapse","collapse-header","collapse-body","collapse-footer","accordion","accordion-item","accordion-header","accordion-body","accordion-footer","list","list-header","list-body","list-footer","list-item","form","form-header","form-body","form-footer","form-field","form-field-header","form-field-body","form-field-footer","form-field-input","list-box","list-box-header","list-box-body","list-box-footer","list-box-item","autocomplete","autocomplete-header","autocomplete-body","autocomplete-footer","combobox","combobox-header","combobox-body","combobox-footer","popup-listbox","popup-listbox-item","menu","menu-header","menu-body","menu-footer","menu-item","dropdown-menu","navigation-menu","navigation-menu-header","navigation-menu-body","navigation-menu-footer","navigation-menu-item","navigation-menu-sublist","tree","tree-header","tree-body","tree-footer","tree-item","tree-group","stepper","stepper-header","stepper-body","stepper-footer","stepper-item","stepper-panel","modal","modal-header","modal-body","modal-footer","dialog","dialog-header","dialog-body","dialog-footer","dialog-close","alert-dialog","alert-dialog-header","alert-dialog-body","alert-dialog-footer","confirmation-modal","popover","popover-header","popover-body","popover-footer","tooltip","overlay-portal","toast-region","toast","toast-header","toast-body","toast-footer","data-grid","data-grid-header","data-grid-body","data-grid-row","data-grid-column-header","data-grid-cell","data-grid-footer","tree-grid","tree-grid-header","tree-grid-body","tree-grid-row","tree-grid-column-header","tree-grid-cell","tree-grid-footer","application-layout-template","application-layout-header","application-layout-body","application-layout-footer","showcase-page-template","home-page","list-page","detail-page","form-page","page-transition","shared-element","map-view","odata-filter","odata-filter-condition","odata-filter-group","odata-filter-value","card-header","card-body","card-footer","alert-header","alert-body","alert-footer","empty-state-header","empty-state-body","empty-state-footer","error-state-header","error-state-body","error-state-footer","loading-state-header","loading-state-body","loading-state-footer","breadcrumb-item","pagination-item","pagination-ellipsis","tag-group-item"].includes(requested) ? requested : "button";
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
