import type { Metadata } from "next";
import "@forge-ui/web/styles";
import { ForgePreferencesProvider } from "../features/showcase-v2/preferences/ForgePreferences";
import type { ReactNode } from "react";
export const metadata: Metadata = {title:"Forge UI | Showcase V2",description:"Biblioteca de componentes e Design System Forge UI"};
export default function RootLayout({children}:{children:ReactNode}) { return <html lang="pt-BR" suppressHydrationWarning><body><ForgePreferencesProvider>{children}</ForgePreferencesProvider></body></html>; }
