import type { ReactNode } from "react";
import { Heading } from "../../atoms/Heading";
import styles from "./ShowcasePageTemplate.module.css";

export interface ShowcasePageTemplateProps {
  title?: ReactNode;
  navigation?: ReactNode;
  toolbar?: ReactNode;
  children: ReactNode;
}

/** Structural DS Template. Preferences and navigation state belong to its callers. */
export function ShowcasePageTemplate({
  title,
  navigation,
  toolbar,
  children,
}: ShowcasePageTemplateProps) {
  return (
    <div className={styles.page}>
      {(title || toolbar) && (
        <header className={styles.header}>
          {title && (
            <Heading level={1} size="xl">
              {title}
            </Heading>
          )}
          {toolbar && <div className={styles.toolbar}>{toolbar}</div>}
        </header>
      )}
      <div className={styles.body}>
        {navigation && <aside className={styles.sidebar}>{navigation}</aside>}
        <main id="main-content" className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
}
