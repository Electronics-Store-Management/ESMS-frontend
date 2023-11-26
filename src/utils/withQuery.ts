export default function withQuery(url: string, _queries: object): string {
    const oldQueryStr = url.split("?").at(1)?.split("&");
    const oldQueries = new Map();
    oldQueryStr?.forEach((element) => {
        const [key, value] = element.split("=");
        if (oldQueries.get(key) instanceof Array)
            oldQueries.set(key, [...oldQueries.get(key), value]);
        else if (oldQueries.has(key))
            oldQueries.set(key, [oldQueries.get(key), value]);
        else oldQueries.set(key, value);
    });

    const queries = { ...Object.fromEntries(oldQueries), ..._queries };

    const queryString = Object.entries(queries)
        .filter(([key, value]) => value)
        .map(([key, value]) =>
            value instanceof Array
                ? value.map((v) => `${key}=${v}`).join("&")
                : `${key}=${value}`,
        )
        .join("&");
    return `${url}?${queryString}`;
}
