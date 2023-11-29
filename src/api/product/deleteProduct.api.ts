import ProductPreview from "@/types/entity/ProductPreview";
import apiInstance from "../apiInstance";

export default async function deleteProductAPI(product?: ProductPreview) {
    if (!product?.id) throw new Error("Invalid product");

    const response = await apiInstance.delete(`/product/${product.id}`);

    return response.data;
}
