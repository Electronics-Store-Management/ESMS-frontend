import Supplier from "@/types/entity/Supplier";
import apiInstance from "../apiInstance";
import { CONTENT_TYPE } from "@/constants/contentType";

export default async function updateSupplierAPI(supplier: Supplier) {
    const response = await apiInstance.put(
        `/supplier/${supplier.id}`,
        supplier,
        {
            headers: CONTENT_TYPE.formData,
        },
    );

    return response.data;
}
