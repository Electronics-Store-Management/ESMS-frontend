import Supplier from "@/types/entity/Supplier";
import apiInstance from "../apiInstance";
import { CONTENT_TYPE } from "@/constants/contentType";

export default async function addNewSupplier(supplier: NewSupplier) {
    const response = await apiInstance.post("/supplier", supplier, {
        headers: CONTENT_TYPE.formData,
    });

    return response.data;
}

export type NewSupplier = Omit<Supplier, "id">;
