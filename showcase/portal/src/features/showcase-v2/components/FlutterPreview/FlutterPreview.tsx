"use client";
import { useFlutterPreview } from "./useFlutterPreview";
import styles from "./FlutterPreview.module.css";

const defaults = {};
export function FlutterPreview({
  slug,
  properties = defaults,
}: {
  slug: string;
  properties?: object;
}) {
  const view = useFlutterPreview(slug, properties);
  if (!view.url)
    return (
      <div className={styles.unavailable} role="status">
        <h3>Prévia Flutter ainda indisponível</h3>
        <p>
          Este componente ainda não possui uma implementação Flutter compilada.
          A prévia React permanece disponível.
        </p>
      </div>
    );
  return (
    <div className={styles.container}>
      {view.status === "loading" && (
        <p role="status">Carregando a prévia Flutter…</p>
      )}
      {view.status === "error" && (
        <div className={styles.unavailable} role="alert">
          <p>Não foi possível iniciar a prévia Flutter.</p>
          <button type="button" onClick={view.retry}>
            Tentar novamente
          </button>
        </div>
      )}
      <iframe
        key={view.attempt}
        ref={view.frame}
        className={styles.frame}
        src={view.url}
        title={`Prévia Flutter — ${slug}`}
        sandbox="allow-scripts allow-same-origin"
        referrerPolicy="no-referrer"
        onLoad={view.send}
        onError={view.failed}
      />
      <a href={view.url} target="_blank" rel="noreferrer">
        Abrir prévia Flutter em outra aba
      </a>
    </div>
  );
}
