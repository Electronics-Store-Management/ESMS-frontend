import Product from "@/types/entity/Product";
import apiInstance from "../apiInstance";

export default async function viewProductList({ queryKey }: { queryKey: any }) {
    const [_key, name, category, price] = queryKey;
    const response = await apiInstance.get("/product", {
        params: { name, category, price },
    });

    const products = response.data as Product[];

    return products.map(({ category, ...values }) => ({
        category: category?.name,
        ...values,
    }));
}
