export const forgePlatforms = ["react", "flutter"] as const;
export type ForgePlatform = (typeof forgePlatforms)[number];
export const forgeThemeNames = ["light", "dark", "contrast", "liquid-glass"] as const;
export type ForgeThemeName = (typeof forgeThemeNames)[number];

export function isForgeThemeName(theme: string | undefined): theme is ForgeThemeName {
  return forgeThemeNames.some((name) => name === theme);
}
