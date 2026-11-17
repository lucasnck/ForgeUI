"use client";
import { Inline, Link } from "@forge-ui/web";
import type { ShowcaseV2RendererProps } from "../../model/showcase-v2.types";
import { showcaseV2Aggregate, showcaseV2Href } from "../../model/showcase-v2-index";
import { showcaseV2ControlOptions } from "../../model/showcase-v2-control-options";
import { useShowcaseV2Copy } from "../../messages/useShowcaseV2Copy";
import { ShowcaseV2Template } from "../ShowcaseV2Template/ShowcaseV2Template";
import { PropertyGrid } from "../PropertyGrid/PropertyGrid";
import { TechnicalGrid } from "../TechnicalGrid/TechnicalGrid";
import type { ForgePlatform } from "../../model/forge-platforms";
import { PlatformSwitcher } from "../PlatformSwitcher/PlatformSwitcher";
import { FlutterComponentShowcase } from "../FlutterPreview/FlutterComponentShowcase";
export interface ShowcasePlatformProps {
 platform?: ForgePlatform;
 onPlatformChange?: (platform: ForgePlatform) => void;
 panelId?: string;
}

export function ShowcaseV2Renderer({definition, platform="react", onPlatformChange, panelId}:ShowcaseV2RendererProps & ShowcasePlatformProps) {
 const {copy}=useShowcaseV2Copy(); const aggregate=showcaseV2Aggregate(definition.slug);
 const platformControls = onPlatformChange && panelId ? <PlatformSwitcher value={platform} onChange={onPlatformChange} panelId={panelId}/> : undefined;
 if (platform === "flutter" && panelId) return <FlutterComponentShowcase definition={definition} platformControls={platformControls} panelId={panelId}/>;
 return <ShowcaseV2Template key={`react-${definition.slug}`} name={definition.name} description={definition.description}
   platformControls={platformControls} panelId={panelId} panelLabelledBy={panelId ? "forge-platform-react" : undefined}
   examples={definition.examples} properties={definition.properties}
   schema={showcaseV2ControlOptions[definition.name] ?? {}}
   links={<Inline gap="2">{aggregate&&<Link href={showcaseV2Href(aggregate)}>{copy.completeExample}: {aggregate.name} →</Link>}{definition.demoHref&&<Link href={definition.demoHref}>{copy.openDemo} →</Link>}</Inline>}
 ><PropertyGrid properties={definition.properties}/><TechnicalGrid definition={definition}/></ShowcaseV2Template>;
}
