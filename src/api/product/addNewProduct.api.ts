import { Specification } from "@/types/entity/Product";
import apiInstance from "../apiInstance";

export default async function addNewProduct(product: NewProduct) {
    const productForm = new FormData();
    Object.entries(product).forEach(([key, value]) =>
        value instanceof Array ? null : productForm.set(key, value.toString()),
    );
    productForm.delete("photo");
    productForm.delete("specifications");
    console.log({ product });
    productForm.set("specifications", JSON.stringify(product.specifications));
    product.photo.forEach((photo) => productForm.append("photo", photo));

    const response = await apiInstance.post("/product", productForm, {
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
    photo: File[];
    specifications: Specification[];
};
