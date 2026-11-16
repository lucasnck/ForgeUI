import { notFound } from "next/navigation";
import { showcaseDemoScenarios } from "../../../../../../features/showcase-v2/model/template-demo-scenarios";
import { TemplateDemo } from "../../../../../../features/showcase-v2/components/TemplateDemos/TemplateDemo";
export const dynamicParams = false;

export function generateStaticParams() {
  return showcaseDemoScenarios.map((scenario) => ({ scenario }));
}

export default async function Page({ params }: { params: Promise<{ scenario: string }> }) {
  const { scenario } = await params;
  const selected = showcaseDemoScenarios.find((value) => value === scenario);
  if (!selected) notFound();
  return <TemplateDemo template="showcase" scenario={selected} />;
}
