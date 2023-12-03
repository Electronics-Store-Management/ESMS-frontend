import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function useLoading() {
    const idRef = useRef<string>();

    return {
        closeLoading: () => {
            toast.remove(idRef.current);
        },
        openLoading: (message?: string) => {
            toast.remove(idRef.current);
            idRef.current = toast.loading(message || "Loading...");
        },
    };
}
