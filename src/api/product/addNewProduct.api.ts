import apiInstance from "../apiInstance";

export default async function addNewProduct(product: NewProduct) {
    const response = await apiInstance.post("/product", product, {});

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
