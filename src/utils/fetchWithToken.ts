import { cookies } from "next/headers";

export default async function fetchWithToken(
    input: RequestInfo,
    init?: RequestInit | undefined,
) {
    return await fetch(input, {
        headers: {
            Authorization: `Bearer ${
                cookies().get("accessToken")?.value || ""
            }`,
        },
        ...init,
    });
}
