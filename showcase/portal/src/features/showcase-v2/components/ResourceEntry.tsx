"use client";
import { lazy, Suspense } from "react";
import { showcaseV2Resources } from "../model/showcase-v2-resources";
import { loadShowcaseV2Resource } from "../model/showcase-v2-resource-loaders";
import { useShowcaseV2Copy } from "../messages/useShowcaseV2Copy";
import { ResourceRenderer } from "./ResourceRenderer/ResourceRenderer";
const pages = Object.fromEntries(
  showcaseV2Resources.map((entry) => [
    entry.slug,
    lazy(async () => {
      const definition = await loadShowcaseV2Resource(entry.slug);

      return {
        default: function ResourcePage() {
          return <ResourceRenderer definition={definition} />;
        },
      };
    }),
  ]),
);

export function ShowcaseV2ResourceEntry({ slug }: { slug: string }) {
  const { copy } = useShowcaseV2Copy();
  const Page = Object.hasOwn(pages, slug) ? pages[slug] : null;

  return Page ? (
    <Suspense fallback={<p role="status">{copy.loading}</p>}>
      <Page key={slug} />
    </Suspense>
  ) : (
    <p>{copy.empty}</p>
  );
}
