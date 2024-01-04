import Statistic from "@/types/Statistic";
import withQuery from "@/utils/withQuery";
import apiInstance from "../apiInstance";

export async function viewCurrentRevenue({
    queryKey,
}: {
    queryKey: any;
}): Promise<Statistic> {
    const [_key] = queryKey;

    const now = new Date();

    const start = new Date(
        now.getFullYear(),
        now.getMonth() - 2,
        1,
        0,
        0,
        0,
    ).getTime();
    const end = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        1,
        0,
        0,
        0,
    ).getTime();

    const response = await apiInstance.get(
        withQuery("/statistic/revenue", { start, end: new Date().getTime() }),
    );

    return response.data;
}

export async function viewWeekRevenue({
    queryKey,
}: {
    queryKey: any;
}): Promise<number[]> {
    const [_key] = queryKey;

    const now = new Date();

    async function getRevenueInDay(day: number) {
        const start = new Date(
            now.getFullYear(),
            now.getMonth(),
            day,
            0,
            0,
            0,
        ).getTime();
        const end = new Date(
            now.getFullYear(),
            now.getMonth(),
            day,
            23,
            59,
            59,
        ).getTime();

        const response = await apiInstance.get(
            withQuery("/statistic/revenue", { start, end }),
        );

        return response.data;
    }

    const revenues = await Promise.all(
        Array(7)
            .fill("")
            .map((a, day) => getRevenueInDay(now.getDate() - day)),
    );

    return revenues.map((revenue) => revenue.revenue).reverse();
}
