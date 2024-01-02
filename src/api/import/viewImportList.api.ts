import ImportBill, { ImportProductResponse } from "@/types/entity/ImportBill";
import apiInstance from "../apiInstance";
import Revision from "@/types/Revision";

export default async function viewImportList({
    queryKey,
}: {
    queryKey: any;
}): Promise<any> {
    const [_key] = queryKey;
    const response = await apiInstance.get("/import");

    const importList = response.data as Revision<
        ImportBill<ImportProductResponse>
    >[];

    return importList;
}
