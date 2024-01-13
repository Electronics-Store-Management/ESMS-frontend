"use client";

import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function GeneralProvider({ children }: ReactNodeChildren) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <Toaster position="bottom-right" />
        </QueryClientProvider>
    );
}
