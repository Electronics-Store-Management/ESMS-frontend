import apiInstance from "../apiInstance";

export default async function updateProductAPI(product: UpdatedProduct) {
    const response = await apiInstance.put(`/product/${product.id}`, product, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

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
