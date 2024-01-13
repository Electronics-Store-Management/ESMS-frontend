"use client";

import THEMES from "@/constants/themes";
import useClient from "@/hooks/useClient";
import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import { ThemeProvider, useTheme } from "next-themes";

export default function CustomThemeProvider({
    currentTheme,
    children,
}: ReactNodeChildren & { currentTheme: (typeof THEMES)[number] }) {
    const { systemTheme, setTheme } = useTheme();
    const isClient = useClient();

    if (currentTheme === "system") setTheme(systemTheme || "light");

    return <ThemeProvider>{children}</ThemeProvider>;
}
