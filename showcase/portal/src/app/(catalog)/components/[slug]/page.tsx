import { notFound } from "next/navigation";
import { findShowcaseV2Entry, showcaseV2Index } from "../../../../features/showcase-v2/model/showcase-v2-index";
import { ShowcaseV2Entry } from "../../../../features/showcase-v2/components/ShowcaseV2Entry";
export function generateStaticParams(){return showcaseV2Index.filter(e=>e.level!=="templates").map(e=>({slug:e.slug}));}
export default async function ComponentPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params; const entry=findShowcaseV2Entry(slug); if(!entry||entry.level==="templates") notFound();
 return <ShowcaseV2Entry slug={slug}/>;
}
