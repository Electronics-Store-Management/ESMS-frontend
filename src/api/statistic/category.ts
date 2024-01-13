import Statistic from "@/types/Statistic";
import withQuery from "@/utils/withQuery";
import apiInstance from "../apiInstance";

export async function viewWeekCategory({
    queryKey,
}: {
    queryKey: any;
}): Promise<
    {
        name: string;
        revenue?: number | null;
        cost?: number | null;
        quantity: number;
    }[]
> {
    const [_key] = queryKey;

    const now = new Date();

    async function getCategoryInDay() {
        const start = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() - 6,
            0,
            0,
            0,
        ).getTime();
        const end = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            23,
            59,
            59,
        ).getTime();

        const response = await apiInstance.get(
            withQuery("/statistic/category", { start, end }),
        );

        return response.data;
    }

    const categories = await getCategoryInDay();

    //@ts-ignore
    return categories.map((value) => Object.values(value).at(0));
}
