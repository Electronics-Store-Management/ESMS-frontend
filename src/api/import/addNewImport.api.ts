import ImportBill, { ImportProduct } from "@/types/entity/ImportBill";
import apiInstance from "../apiInstance";

export default async function addNewImport(
    importBill: Omit<ImportBill<ImportProduct>, "id">,
) {
    const response = await apiInstance.post("/import", importBill, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
}
