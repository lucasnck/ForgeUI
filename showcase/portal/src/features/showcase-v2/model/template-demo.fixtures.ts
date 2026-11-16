export interface TemplateDemoRecord {
  id: string;
  index: number;
  title: string;
  description: string;
}
export const templateDemoIds = Array.from({ length: 15 }, (_, index) => `item-${index + 1}`);

export function createTemplateDemoRecords(): TemplateDemoRecord[] {
  return templateDemoIds.slice(0, 10).map((id, index) => ({
    id,
    index: index + 1,
    title: `Title ${index + 1}`,
    description: `Description ${index + 1}`,
  }));
}

export const demoBase = "/demos/records";

export function templateDemoTransitionName(scope: string, entity: string, role: string): string {
  const encode = (value: string) =>
    Array.from(value, (character) => character.codePointAt(0)!.toString(16)).join("_");

  return "v2-" + [scope, entity, role].map(encode).join("-");
}
