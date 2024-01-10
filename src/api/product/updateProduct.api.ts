import { Specification } from "@/types/entity/Product";
import apiInstance from "../apiInstance";

export default async function updateProductAPI(product: UpdatedProduct) {
    const response = await apiInstance.put(
        `/product/${product.id}`,
        { ...product, specifications: JSON.stringify(product.specifications) },
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    );

    return {
        ...response.data,
        photo: response.data.split(";").filter((v: any) => v),
    };
}

export type UpdatedProduct = {
    id: string;
    name: string;
    categoryId?: string;
    price: number;
    unit: string;
    warrantyPeriod: number;
    photo: File[];
    specifications: Specification[];
};
