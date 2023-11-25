"use client";

import SEARCH_PARAMS from "@/constants/searchParams";
import TokenContext from "@/contexts/TokenContext";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import IToken from "@/types/Token";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function TokenProvider({ children }: ReactNodeChildren) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [token, setToken] = useLocalStorage<IToken>("token", {
		accessToken: "",
		refreshToken: "",
	});

	useEffect(() => {
		if (!token) return;
		if (!token.refreshToken && pathname !== "/signin") {
			redirect(
				`/signin?${SEARCH_PARAMS.redirectUri}=${encodeURI(pathname)}`
			);
		}
		if (token.refreshToken && pathname === "/signin") {
			redirect(
				decodeURI(searchParams.get(SEARCH_PARAMS.redirectUri) || "/home")
			);
		}
	}, [token?.accessToken, token?.refreshToken, pathname]);

	return (
		<TokenContext.Provider value={{ token, setToken }}>
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		</TokenContext.Provider>
	);
}
