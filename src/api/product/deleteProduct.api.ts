import apiInstance from "../apiInstance";

export default async function deleteProduct(id: string) {
    const response = await apiInstance.delete(`/product/${id}`);

    return response.data;
}
