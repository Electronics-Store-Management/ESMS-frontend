import "@/themes/index";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import CustomThemeProvider from "./CustomThemeProvider";

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
	return (
		<html lang="en">
			<body className={inter.className}>
				<CustomThemeProvider>{children}</CustomThemeProvider>
			</body>
		</html>
	);
}
