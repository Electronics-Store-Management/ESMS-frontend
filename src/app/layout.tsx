import "@/themes/index";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import CustomThemeProvider from "../components/CustomThemeProvider";
import TokenProvider from "./providers";
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
    const currentTheme = cookies().get(COOKIE_NAME.CURRENT_THEME)
        ?.value as (typeof THEMES)[number];

    return (
        <html lang="en">
            <body className={inter.className}>
                <TokenProvider>
                    <CustomThemeProvider currentTheme={currentTheme || "light"}>
                        {children}
                    </CustomThemeProvider>
                </TokenProvider>
            </body>
        </html>
    );
}
