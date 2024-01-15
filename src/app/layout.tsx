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
    title: "ESMS",
    description: "Electronic Store Management System",
    generator: "Next.js",
    manifest: "/manifest.json",
    keywords: ["esms", "electronis", "store"],
    authors: [
        { name: "Bui Thi Hoang Giang" },
        { name: "Nguyen Khanh Huyen" },
        { name: "Nguyen Hoang Hy" },
    ],
    icons: [
        { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
        { rel: "icon", url: "icons/icon-128x128.png" },
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentTheme = cookies().get(COOKIE_NAME.THEME)
        ?.value as (typeof THEMES)[number];

    const fontSize = cookies().get(COOKIE_NAME.FONT_SIZE)?.value || "16";

    return (
        <html lang="en" style={{ fontSize: parseInt(fontSize, 10) }}>
            <head>
                <link rel="manifest" href="/manifest.json" />
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
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
