import TokenContext from "@/contexts/TokenContext";
import IToken from "@/types/Token";
import { useContext } from "react";
import useSWR from "swr";

export async function protectFetcher(
	url: string,
	method: "GET" | "POST" | "PUT" | "DELETE",
	body: any,
	token: IToken
) {
	const res = await fetch(url, {
		method,
		headers: {
			"Content-type": "application/json",
			authorization: `Bearer ${token.accessToken}`,
		},
		body: JSON.stringify(body),
	});

	return await res.json();
}

export default function useProtectedRoute(
	url: string,
	method: "GET" | "POST" | "PUT" | "DELETE",
	body: any
) {
	const { token } = useContext(TokenContext);

	const { data, error, isLoading } = useSWR(url, () =>
		protectFetcher(url, method, body, token || {})
	);

	return { data, error, isLoading };
}
