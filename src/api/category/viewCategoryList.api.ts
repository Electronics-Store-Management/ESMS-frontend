import Category from "@/types/entity/Category";
import apiInstance from "../apiInstance";

export default async function viewCategoryList({
    queryKey,
}: {
    queryKey: any;
}) {
    const [_key, name] = queryKey;
    const response = await apiInstance.get("/category", { params: { name } });

    const categories = response.data as Category[];

    return categories;
}

