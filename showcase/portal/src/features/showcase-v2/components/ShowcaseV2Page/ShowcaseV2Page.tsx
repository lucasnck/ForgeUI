"use client";

import NextLink from "next/link";
import type { ReactNode } from "react";
import { ShowcasePageTemplate } from "@forge-ui/web";
import { showcaseV2Index, showcaseV2Href, showcaseV2Levels } from "../../model/showcase-v2-index";
import { useShowcaseV2Copy } from "../../messages/useShowcaseV2Copy";
import { ShowcaseV2Navigation } from "../ShowcaseV2Navigation/ShowcaseV2Navigation";
import { ShowcaseV2Preferences } from "../ShowcaseV2Preferences/ShowcaseV2Preferences";
import styles from "./ShowcaseV2Page.module.css";

import { showcaseV2Resources, showcaseV2ResourceHref } from "../../model/showcase-v2-resources";

interface ShowcaseV2LayoutProps {
  children: ReactNode;
}

export function ShowcaseV2Layout({ children }: ShowcaseV2LayoutProps) {
  const { copy } = useShowcaseV2Copy();

  return (
    <>
      <a className={styles.skip} href="#main-content">
        {copy.skip}
      </a>
      <ShowcasePageTemplate
        title={copy.title}
        navigation={<ShowcaseV2Navigation />}
        toolbar={<ShowcaseV2Preferences />}
      >
        {children}
      </ShowcasePageTemplate>
    </>
  );
}

export function ShowcaseV2Page() {
  const { copy } = useShowcaseV2Copy();

  return (
    <div className={styles.overview}>
      <header>
        <p className={styles.eyebrow}>{copy.migration}</p>
        <h2>{copy.catalog}</h2>
        <p>{copy.intro}</p>
      </header>
      {showcaseV2Levels.map((level) => (
        <section key={level} aria-labelledby={`group-${level}`}>
          <h3 id={`group-${level}`}>{copy[level]}</h3>
          <div className={styles.entries}>
            {showcaseV2Index
              .filter((entry) => entry.level === level)
              .map((entry) => (
                <NextLink key={entry.slug} href={showcaseV2Href(entry)}>
                  {entry.name}
                  <span aria-hidden="true"> →</span>
                </NextLink>
              ))}
          </div>
        </section>
      ))}
      <section aria-labelledby="resource-overview">
        <h3 id="resource-overview">{copy.resources}</h3>
        {(["hook", "style"] as const).map((kind) => (
          <div key={kind}>
            <h4>{kind === "hook" ? copy.hooks : copy.styles}</h4>
            <div className={styles.entries}>
              {showcaseV2Resources
                .filter((entry) => entry.kind === kind)
                .map((entry) => (
                  <NextLink key={entry.slug} href={showcaseV2ResourceHref(entry.slug)}>
                    {entry.name}
                    <span aria-hidden="true"> →</span>
                  </NextLink>
                ))}
            </div>
          </div>
        ))}
      </section>
      <section>
        <h3>{copy.flows}</h3>
        <NextLink href="/demos/records/home/">{copy.demo}</NextLink>
      </section>
    </div>
  );
}
