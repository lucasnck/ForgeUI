"use client";

import { usePathname } from "next/navigation";
import { showcaseV2Index, showcaseV2Levels, showcaseV2Href } from "../../model/showcase-v2-index";
import { useShowcaseV2Copy } from "../../messages/useShowcaseV2Copy";

import { showcaseV2Resources, showcaseV2ResourceHref } from "../../model/showcase-v2-resources";

export function useShowcaseV2Navigation() {
  const pathname = usePathname().replace(/\/$/, "");
  const { copy } = useShowcaseV2Copy();
  const groups = showcaseV2Levels.map((level) => ({
    level,
    title: copy[level],
    entries: showcaseV2Index
      .filter((entry) => entry.level === level)
      .map((entry) => ({
        ...entry,
        href: showcaseV2Href(entry),
        current: pathname === showcaseV2Href(entry).replace(/\/$/, ""),
      })),
  }));
  const resourceGroups = (["hook", "style"] as const).map((kind) => ({
    kind,
    title: kind === "hook" ? copy.hooks : copy.styles,
    entries: showcaseV2Resources
      .filter((entry) => entry.kind === kind)
      .map((entry) => ({
        ...entry,
        href: showcaseV2ResourceHref(entry.slug),
        current: pathname === showcaseV2ResourceHref(entry.slug).replace(/\/$/, ""),
      })),
  }));

  return {
    copy,
    groups,
    resourceGroups,
    overview: pathname === "",
  };
}
