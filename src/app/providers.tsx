"use client";

import SEARCH_PARAMS from "@/constants/searchParams";
import TokenContext from "@/contexts/TokenContext";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import IToken from "@/types/Token";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { Toaster } from "react-hot-toast";
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

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            <QueryClientProvider client={queryClient}>
                {children}
                <Toaster position="bottom-right" />
            </QueryClientProvider>
        </TokenContext.Provider>
    );
}
