"use client";
import { ThemeProvider } from "next-themes";
import { ReactNodeChildren } from "@/types/ReactNodeChildren";

export default function CustomThemeProvider({ children }: ReactNodeChildren) {
	return <ThemeProvider>{children}</ThemeProvider>;
}
