import Product from "@/types/entity/Product";
import apiInstance from "../apiInstance";

export default async function viewDetailProduct({
    queryKey,
}: {
    queryKey: any;
}): Promise<Product> {
    const [_key, id] = queryKey;
    const response = await apiInstance.get(`/product/${id}`, {});

    return {
        ...response.data,
        specifications: JSON.parse(response.data.specifications) || [],
    };
}
