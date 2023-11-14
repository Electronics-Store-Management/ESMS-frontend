"use client";

import TokenContext from "@/contexts/TokenContext";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import IToken from "@/types/Token";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function TokenProvider({ children }: ReactNodeChildren) {
	const pathname = usePathname();
	const [token, setToken] = useLocalStorage<IToken>("token", {
		accessToken: "",
		refreshToken: "",
	});

	useEffect(() => {
		if (!token.refreshToken && pathname !== "/signin") {
			redirect("/signin");
		}
	}, [token.accessToken, token.refreshToken, pathname]);

	return (
		<TokenContext.Provider value={{ token, setToken }}>
			{children}
		</TokenContext.Provider>
	);
}
