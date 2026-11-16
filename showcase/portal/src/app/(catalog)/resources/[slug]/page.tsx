import { notFound } from "next/navigation";
import { showcaseV2Resources } from "../../../../features/showcase-v2/model/showcase-v2-resources";
import { ShowcaseV2ResourceEntry } from "../../../../features/showcase-v2/components/ResourceEntry";
export function generateStaticParams(){return showcaseV2Resources.map(e=>({slug:e.slug}));}
export default async function ResourcePage({params}:{params:Promise<{slug:string}>}) {const {slug}=await params;const entry=showcaseV2Resources.find(e=>e.slug===slug);if(!entry)notFound();return <ShowcaseV2ResourceEntry slug={slug}/>;}
