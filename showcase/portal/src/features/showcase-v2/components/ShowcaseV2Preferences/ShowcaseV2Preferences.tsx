"use client";
import { LocaleSelector, ThemeSelector } from "@forge-ui/web";
import { useForgePreferences } from "../../preferences/ForgePreferences";
import { useShowcaseV2Copy } from "../../messages/useShowcaseV2Copy";
import styles from "./ShowcaseV2Preferences.module.css";
export function ShowcaseV2Preferences() {
 const {locale,theme,setLocale,setTheme} = useForgePreferences();
 const {copy} = useShowcaseV2Copy();
 return <div className={styles.preferences}>
  <LocaleSelector value={locale} onValueChange={setLocale} label={copy.language} options={[{value:"pt-BR",label:"Português"},{value:"en",label:"English"},{value:"es",label:"Español"}]} />
  <ThemeSelector value={theme} onValueChange={setTheme} label={copy.theme} options={[{value:"light",label:"Light"},{value:"dark",label:"Dark"},{value:"contrast",label:"Contrast"},{value:"liquid-glass",label:"Liquid glass"}]} />
 </div>;
}
