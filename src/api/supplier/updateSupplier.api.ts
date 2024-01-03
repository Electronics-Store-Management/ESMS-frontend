import Supplier from "@/types/entity/Supplier";
import apiInstance from "../apiInstance";

export default async function updateSupplierAPI(supplier: Supplier) {
    const response = await apiInstance.put(
        `/supplier/${supplier.id}`,
        supplier,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    );

    return response.data;
}
