import ImportBill from "@/types/entity/ImportBill";
import apiInstance from "../apiInstance";

export default async function viewImportList({ queryKey }: { queryKey: any }) {
    const [_key] = queryKey;
    const response = await apiInstance.get("/import");

    const importList = response.data as ImportBill[];

    return importList;
}

