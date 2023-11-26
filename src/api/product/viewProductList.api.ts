import Product from "@/types/entity/Product";
import apiInstance from "../apiInstance";
import ProductPreview from "@/types/entity/ProductPreview";

export default async function viewProductList({ queryKey }: { queryKey: any }) {
    const [_key, name, category] = queryKey;
    const response = await apiInstance.get("/product", {
        params: { name, category },
    });

    const products = response.data as Product[];

    return products.map(({ category, ...values }) => ({
        category: category?.name,
        ...values,
    }));
}
