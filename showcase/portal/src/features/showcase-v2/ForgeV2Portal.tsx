"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Badge, Button, Heading, Input, Label, Link, Select, ShowcasePageTemplate, Text } from "@forge-ui/web";
import { previewEntries, resourceEntries, showcaseEntries, showcaseHref, showcaseLevels } from "./catalog";
import styles from "./ShowcaseV2Page.module.css";
import navStyles from "./ShowcaseV2Navigation.module.css";

type Theme = "light" | "dark" | "contrast" | "liquid-glass";

/** Adapted from PraticarFront ShowcaseV2Layout; original template is a public DS export. */
export function ForgeV2Shell({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  return <>
    <a className={styles.skip} href="#main-content">Ir para o conteúdo</a>
    <ShowcasePageTemplate
      title="Forge UI"
      navigation={<ForgeV2Navigation />}
      toolbar={<div>
        <Label htmlFor="forge-theme">Tema</Label>{" "}
        <Select id="forge-theme" aria-label="Tema" fullWidth={false} value={theme} onChange={(e) => setTheme(e.target.value as Theme)}>
          <option value="light">Claro</option><option value="dark">Escuro</option>
          <option value="contrast">Alto contraste</option><option value="liquid-glass">Liquid Glass</option>
        </Select>
      </div>}
    >{children}</ShowcasePageTemplate>
  </>;
}

function ForgeV2Navigation() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const matching = previewEntries.filter((e) => e.name.toLowerCase().includes(query.trim().toLowerCase()));
  return <nav className={navStyles.navigation} aria-label="Catálogo Forge UI">
    <Label htmlFor="forge-catalog-search">Buscar componentes</Label>
    <Input id="forge-catalog-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar no catálogo" />
    <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>Visão geral</Link>
    {showcaseLevels.map((level) => <div key={level} className={navStyles.group}>
      <h2>{level === "atoms" ? "Átomos" : level === "molecules" ? "Moléculas" : level === "organisms" ? "Organismos" : "Templates"}</h2>
      <ul>{matching.filter((e) => e.level === level).map((entry) => <li key={entry.slug}>
        <Link href={showcaseHref(entry.slug)} aria-current={pathname === showcaseHref(entry.slug) ? "page" : undefined}>{entry.name}</Link>
      </li>)}</ul>
    </div>)}
    <Text as="p" size="sm" tone="muted">{previewEntries.length} exemplos ativos • {showcaseEntries.length} páginas na origem</Text>
  </nav>;
}

/** Original ShowcaseV2Page overview composition, now branded Forge UI. */
export function ForgeV2Home() {
  return <div className={styles.overview}>
    <header>
      <Text as="p" className={styles.eyebrow}>BIBLIOTECA INDEPENDENTE</Text>
      <Heading level={2}>Forge UI — Showcase V2</Heading>
      <Text as="p" tone="muted">O catálogo original do PraticarFront, migrado por etapas. Os exemplos disponíveis usam componentes públicos reais de @forge-ui/web; entradas pendentes não são apresentadas como prontas.</Text>
      <Badge tone="warning" appearance="soft">Migração em andamento</Badge>
    </header>
    {showcaseLevels.map((level) => <section key={level} aria-labelledby={`group-${level}`}>
      <Heading level={3} id={`group-${level}`}>{level === "atoms" ? "Átomos" : level === "molecules" ? "Moléculas" : level === "organisms" ? "Organismos" : "Templates"}</Heading>
      <div className={styles.entries}>
        {previewEntries.filter((entry) => entry.level === level).map((entry) => <Link key={entry.slug} href={showcaseHref(entry.slug)}>{entry.name}<span aria-hidden="true"> →</span></Link>)}
      </div>
      <Text as="p" size="sm" tone="muted">{showcaseEntries.filter((x) => x.level === level && x.status === "preview").length} previews ativos de {showcaseEntries.filter((x) => x.level === level).length} páginas identificadas.</Text>
    </section>)}
    <section aria-labelledby="resource-overview">
      <Heading level={3} id="resource-overview">Hooks e estilos</Heading>
      <Text as="p" tone="muted">{resourceEntries.length} recursos catalogados na origem, ainda pendentes de migração de demonstrações.</Text>
    </section>
    <section>
      <Heading level={3}>Acompanhar a migração</Heading>
      <Text as="p" tone="muted">Arquivos de rastreabilidade: docs/migration/COMPONENT-MATRIX.md e docs/migration/STATUS.md. O Showcase V2 completo permanece como referência, sem duplicar implementações dentro do portal.</Text>
    </section>
  </div>;
}
