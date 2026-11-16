"use client";
import type { CSSProperties } from "react";
import { tokenGroups } from "./token-samples";
import { useTokenResourceExample } from "./useTokenResourceExample";
import styles from "./TokenResource.module.css";

export function TokenResourceExample() {
  const { rootRef, values } = useTokenResourceExample();

  return (
    <div ref={rootRef} className={styles.gallery}>
      {tokenGroups.map((group) => (
        <section key={group.kind} aria-labelledby={`tokens-${group.kind}`}>
          <h4 id={`tokens-${group.kind}`}>{group.title}</h4>
          <div className={styles.grid}>
            {group.tokens.map((token) => (
              <figure key={token} className={styles.sample}>
                <div className={styles.stage}>
                  <span
                    className={styles[group.kind]}
                    data-token={token}
                    data-property={group.property}
                    style={{ "--sample": `var(${token})` } as CSSProperties}
                  >
                    {group.kind === "typography"
                      ? "Children"
                      : group.kind === "shadow"
                        ? "Surface"
                        : null}
                  </span>
                </div>
                <figcaption>
                  <code>{token}</code>
                  <span>{values[token] ?? "—"}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
