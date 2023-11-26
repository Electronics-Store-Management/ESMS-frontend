"use client";

import SEARCH_PARAMS from "@/constants/searchParams";
import TokenContext from "@/contexts/TokenContext";
import useClient from "@/hooks/useClient";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import IToken from "@/types/Token";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useDeepCompareEffect } from "react-use";

const queryClient = new QueryClient();

export default function TokenProvider({ children }: ReactNodeChildren) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [token, setToken, isTokenSet] = useLocalStorage<IToken>("token", {
        accessToken: "",
        refreshToken: "",
    });

    useDeepCompareEffect(() => {
        if (!isTokenSet) return;
        if (!token?.refreshToken && pathname !== "/signin") {
            redirect(
                `/signin?${SEARCH_PARAMS.redirectUri}=${encodeURI(pathname)}`,
            );
        }
        if (token?.refreshToken && pathname === "/signin") {
            redirect(
                decodeURI(
                    searchParams.get(SEARCH_PARAMS.redirectUri) || "/home",
                ),
            );
        }
    }, [token, isTokenSet, searchParams, pathname]);

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </TokenContext.Provider>
    );
}
