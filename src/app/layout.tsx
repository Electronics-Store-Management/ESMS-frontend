import "@/themes/index";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import CustomThemeProvider from "../components/CustomThemeProvider";
import GeneralProvider from "./providers";
import { cookies } from "next/headers";
import COOKIE_NAME from "@/constants/cookies";
import THEMES from "@/constants/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ESMS Web App",
    description: "Electronic Store Management System",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentTheme = cookies().get(COOKIE_NAME.THEME)
        ?.value as (typeof THEMES)[number];

    const fontSize = cookies().get(COOKIE_NAME.FONT_SIZE)?.value || "14";

    return (
        <html lang="en" style={{ fontSize: parseInt(fontSize, 10) }}>
            <body className={inter.className}>
                <GeneralProvider>
                    <CustomThemeProvider currentTheme={currentTheme || "light"}>
                        {children}
                    </CustomThemeProvider>
                </GeneralProvider>
            </body>
        </html>
    );
}
