"use client";
import { Inline, Link } from "@forge-ui/web";
import type { ShowcaseV2RendererProps } from "../../model/showcase-v2.types";
import { showcaseV2Aggregate, showcaseV2Href } from "../../model/showcase-v2-index";
import { showcaseV2ControlOptions } from "../../model/showcase-v2-control-options";
import { useShowcaseV2Copy } from "../../messages/useShowcaseV2Copy";
import { ShowcaseV2Template } from "../ShowcaseV2Template/ShowcaseV2Template";
import { PropertyGrid } from "../PropertyGrid/PropertyGrid";
import { TechnicalGrid } from "../TechnicalGrid/TechnicalGrid";

export function ShowcaseV2Renderer({definition}:ShowcaseV2RendererProps) {
 const {copy}=useShowcaseV2Copy(); const aggregate=showcaseV2Aggregate(definition.slug);
 return <ShowcaseV2Template name={definition.name} description={definition.description}
   examples={definition.examples} properties={definition.properties}
   schema={showcaseV2ControlOptions[definition.name] ?? {}}
   links={<Inline gap="2">{aggregate&&<Link href={showcaseV2Href(aggregate)}>{copy.completeExample}: {aggregate.name} →</Link>}{definition.demoHref&&<Link href={definition.demoHref}>{copy.openDemo} →</Link>}</Inline>}
 ><PropertyGrid properties={definition.properties}/><TechnicalGrid definition={definition}/></ShowcaseV2Template>;
}
