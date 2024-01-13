import { CONTENT_TYPE } from "@/constants/contentType";
import SaleBill, { SaleProduct } from "@/types/entity/SaleBill";
import apiInstance from "../apiInstance";

export default async function addNewSaleBill(
    saleBill: Omit<SaleBill<SaleProduct>, "id">,
) {
    const response = await apiInstance.post("/sale", saleBill, {
        headers: CONTENT_TYPE.json,
    });

    return response.data;
}
