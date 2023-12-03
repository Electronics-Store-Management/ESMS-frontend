import apiInstance from "../apiInstance";

export default async function updateProductAPI(product: UpdatedProduct) {
    apiInstance.defaults.headers.common["Content-Type"] = "multipart/form-data";
    const response = await apiInstance.put(`/product/${product.id}`, product, {});
    apiInstance.defaults.headers.common["Content-Type"] = "application/json";

    return response.data;
}

export type UpdatedProduct = {
    id: string;
    name: string;
    categoryId?: string;
    price: number;
    unit: string;
    warrantyPeriod: number;
    photo?: File | null;
};
