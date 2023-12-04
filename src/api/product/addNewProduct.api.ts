import apiInstance from "../apiInstance";

export default async function addNewProduct(product: NewProduct) {
    const response = await apiInstance.post("/product", product, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
}

export type NewProduct = {
    name: string;
    categoryId?: string;
    price: number;
    unit: string;
    warrantyPeriod: number;
    photo?: File | null;
};
