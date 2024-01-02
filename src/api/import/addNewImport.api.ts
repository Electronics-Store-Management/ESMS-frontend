import ImportBill from "@/types/entity/ImportBill";
import apiInstance from "../apiInstance";

export default async function addNewImport(importBill: Omit<ImportBill, "id">) {
    const response = await apiInstance.post("/import", importBill, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
}
