import Statistic from "@/types/Statistic";
import withQuery from "@/utils/withQuery";
import apiInstance from "../apiInstance";

export async function viewCurrentCost({
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
        withQuery("/statistic/cost", { start, end: new Date().getTime() }),
    );

    return response.data;
}

export async function viewWeekCost({
    queryKey,
}: {
    queryKey: any;
}): Promise<number[]> {
    const [_key] = queryKey;

    const now = new Date();

    async function getCostInDay(day: number) {
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
            withQuery("/statistic/cost", { start, end }),
        );

        return response.data;
    }

    const costs = await Promise.all(
        Array(7)
            .fill("")
            .map((a, day) => getCostInDay(now.getDate() - day)),
    );

    return costs.map((cost) => cost.cost).reverse();
}
