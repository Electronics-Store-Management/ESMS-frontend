import { ReadonlyURLSearchParams } from "next/navigation";

export default function withQuery(
    url: string,
    _queries: object,
    searchParams?: ReadonlyURLSearchParams,
): string {
    const queries = {
        ...Object.fromEntries(searchParams?.entries() || []),
        ..._queries,
    };

    const queryString = Object.entries(queries)
        .filter(([key, value]) => value)
        .map(([key, value]: [key: string, value: string | string[]]) =>
            value instanceof Array
                ? value.map((v) => `${key}=${v}`).join("&")
                : `${key}=${value}`,
        )
        .join("&");
    return `${url}?${queryString}`;
}

export function withoutQuery(
    url: string,
    _queries: string[],
    searchParams?: ReadonlyURLSearchParams,
): string {
    const queries = Object.fromEntries(searchParams?.entries?.() || []);

    const queryString = Object.entries(queries)
        .filter(([key, value]) => value && !_queries.includes(key))
        .map(([key, value]: [key: string, value: string | string[]]) =>
            value instanceof Array
                ? value.map((v) => `${key}=${v}`).join("&")
                : `${key}=${value}`,
        )
        .join("&");
    return `${url}?${queryString}`;
}
