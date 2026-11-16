export const applicationDemoScenarios = ["shell", "minimal", "header", "body", "footer"] as const;
export const showcaseDemoScenarios = ["catalog", "focused"] as const;
export type ApplicationDemoScenario = (typeof applicationDemoScenarios)[number];
export type ShowcaseDemoScenario = (typeof showcaseDemoScenarios)[number];
