import { CONTENT_TYPE } from "@/constants/contentType";
import WarrantyBill, { WarrantyProduct } from "@/types/entity/WarrantyBill";
import apiInstance from "../apiInstance";

export default async function addNewWarrantyBill(
    warrantyBill: Omit<WarrantyBill<WarrantyProduct>, "id">,
) {
    

    const response = await apiInstance.post("/warranty", warrantyBill, {
        headers: CONTENT_TYPE.json,
    });

    return response.data;
}
