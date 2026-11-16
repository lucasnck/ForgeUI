import {
  DEFAULT_THEME,
  DEFAULT_THEME_STORAGE_KEY,
  themeInitializationScript,
  type ThemePreference,
} from "./theme";

export interface ThemeScriptProps {
  defaultTheme?: ThemePreference;
  storageKey?: string;
}

export function ThemeScript({
  defaultTheme = DEFAULT_THEME,
  storageKey = DEFAULT_THEME_STORAGE_KEY,
}: ThemeScriptProps) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: themeInitializationScript(storageKey, defaultTheme),
      }}
    />
  );
}
