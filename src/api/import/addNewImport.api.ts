import ImportBill from "@/types/entity/ImportBill";
import apiInstance from "../apiInstance";

export default async function addNewImport(importBill: ImportBill) {
    const response = await apiInstance.post("/import", importBill, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
}

