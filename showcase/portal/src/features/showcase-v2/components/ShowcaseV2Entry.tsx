"use client";

import { lazy, Suspense } from "react";
import { useShowcasePlatform } from "./useShowcasePlatform";
import { showcaseV2Index } from "../model/showcase-v2-index";
import { loadShowcaseV2Definition } from "../model/showcase-v2-loaders";
import { useShowcaseV2Copy } from "../messages/useShowcaseV2Copy";
import { ShowcaseV2Renderer, type ShowcasePlatformProps } from "./ShowcaseV2Renderer/ShowcaseV2Renderer";

const pages = Object.fromEntries(
  showcaseV2Index.map((entry) => [
    entry.slug,
    lazy(async () => {
      const definition = await loadShowcaseV2Definition(entry.slug);

      function DefinitionPage(props: ShowcasePlatformProps) {
        return <ShowcaseV2Renderer definition={definition} {...props} />;
      }

      return { default: DefinitionPage };
    }),
  ]),
);

interface ShowcaseV2EntryProps {
  slug: string;
}

export function ShowcaseV2Entry({ slug }: ShowcaseV2EntryProps) {
  const { copy } = useShowcaseV2Copy();
  const { platform, changePlatform } = useShowcasePlatform();
  const Page = Object.hasOwn(pages, slug) ? pages[slug] : null;
  if (!Page) return <p>{copy.empty}</p>;
  const panelId = "forge-platform-panel";
  return (
    <Suspense fallback={<p role="status">{copy.loading}</p>}>
      <Page key={slug} platform={platform} onPlatformChange={changePlatform} panelId={panelId} />
    </Suspense>
  );
}
