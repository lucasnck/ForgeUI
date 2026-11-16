"use client";

import NextLink from "next/link";
import { Input, Label } from "@forge-ui/web";
import { useState } from "react";
import { useShowcaseV2Navigation } from "./useShowcaseV2Navigation";
import styles from "./ShowcaseV2Navigation.module.css";

export function ShowcaseV2Navigation() {
  const { copy, groups, resourceGroups, overview } = useShowcaseV2Navigation();
  const [search,setSearch] = useState("");
  const match = (label:string) => label.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase());

  return (
    <nav className={styles.navigation} aria-label={copy.catalog}>
      <div className={styles.search}><Label htmlFor="forge-showcase-search">{copy.catalog}</Label><Input id="forge-showcase-search" type="search" placeholder="Buscar..." value={search} onChange={e => setSearch(e.target.value)} /></div>
      <NextLink href="/" aria-current={overview ? "page" : undefined}>
        {copy.overview}
      </NextLink>
      {groups.map((group) => (
        <div key={group.level} className={styles.group}>
          <h2>{group.title}</h2>
          <ul>
            {group.entries.filter(entry => match(entry.name)).map((entry) => (
              <li key={entry.slug}>
                <NextLink href={entry.href} aria-current={entry.current ? "page" : undefined}>
                  {entry.name}
                </NextLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className={styles.group}>
        <h2>{copy.resources}</h2>
        {resourceGroups.map((group) => (
          <div key={group.kind}>
            <h3>{group.title}</h3>
            <ul>
              {group.entries.filter(entry => match(entry.name)).map((entry) => (
                <li key={entry.slug}>
                  <NextLink href={entry.href} aria-current={entry.current ? "page" : undefined}>
                    {entry.name}
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.group}>
        <h2>{copy.flows}</h2>
        <NextLink href="/">{copy.demo} →</NextLink>
      </div>
    </nav>
  );
}
