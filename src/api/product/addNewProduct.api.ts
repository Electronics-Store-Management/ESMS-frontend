import apiInstance from "../apiInstance";

export default async function addNewProduct(product: NewProduct) {
    apiInstance.defaults.headers.common["Content-Type"] = "multipart/form-data";
    const response = await apiInstance.post("/product", product, {});
    apiInstance.defaults.headers.common["Content-Type"] = "application/json";

    return response.data;
}

export type NewProduct = {
    name: string;
    category?: string;
    price: number;
    unit: string;
    warrantyPeriod: number;
    photo?: File | null;
};
